#!/usr/bin/env python3
"""Validate the static E2P website using only the Python standard library."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.glob('*.html'))
RETIRED_REFERENCES = (
    'site-v19.css', 'site-v19.js', 'inner-v19.css', 'research-v19.css',
    'data-v19.css', 'prerender.css', 'site-v8.js', 'site-v9.js',
    'site-v10.js', 'site-v11.js', 'site-v12.js', 'site-v13.js',
    'site-v14.js', 'site-v15.js', 'site-v16.js', 'site-v17.js', 'site-v18.js',
)
SENSITIVE_PATTERNS = (
    r'출원\s*[·/]?\s*비공개',
    r'pre-publication filing number',
)


class Parser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: list[str] = []
        self.refs: list[tuple[str, str]] = []
        self.title_count = 0
        self.canonical_count = 0
        self.has_main = False
        self.html_lang = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == 'html': self.html_lang = values.get('lang')
        if tag == 'title': self.title_count += 1
        if tag == 'main': self.has_main = True
        if values.get('id'): self.ids.append(values['id'])
        if tag in ('a', 'link') and values.get('href'):
            self.refs.append(('href', values['href']))
        if tag in ('img', 'script') and values.get('src'):
            self.refs.append(('src', values['src']))
        if tag == 'link' and values.get('rel') == 'canonical':
            self.canonical_count += 1


def local_target(value: str) -> Path | None:
    if value.startswith(('#', 'mailto:', 'tel:', 'javascript:', 'data:')):
        return None
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc:
        return None
    clean = parsed.path
    if not clean:
        return None
    return ROOT / clean


def main() -> int:
    errors: list[str] = []
    if not HTML_FILES:
        errors.append('No root HTML files found.')

    for path in HTML_FILES:
        text = path.read_text(encoding='utf-8')
        parser = Parser()
        try:
            parser.feed(text)
        except Exception as exc:
            errors.append(f'{path.name}: HTML parser error: {exc}')
            continue

        if parser.title_count != 1:
            errors.append(f'{path.name}: expected one <title>, found {parser.title_count}.')
        if parser.canonical_count != 1:
            errors.append(f'{path.name}: expected one canonical link, found {parser.canonical_count}.')
        if not parser.has_main:
            errors.append(f'{path.name}: missing <main>.')
        if parser.html_lang not in ('ko', 'en'):
            errors.append(f'{path.name}: missing valid html lang attribute.')

        duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
        if duplicates:
            errors.append(f'{path.name}: duplicate IDs: {duplicates}.')

        for kind, ref in parser.refs:
            target = local_target(ref)
            if target is not None and not target.exists():
                errors.append(f'{path.name}: broken local {kind}={ref!r}.')

        for retired in RETIRED_REFERENCES:
            if retired in text:
                errors.append(f'{path.name}: retired asset reference remains: {retired}.')

        for pattern in SENSITIVE_PATTERNS:
            if re.search(pattern, text, flags=re.IGNORECASE):
                errors.append(f'{path.name}: sensitive pre-publication pattern found: {pattern}.')

    required = [
        ROOT / 'assets/site.css', ROOT / 'assets/components.css', ROOT / 'assets/responsive.css',
        ROOT / 'assets/site.js', ROOT / 'robots.txt',
        ROOT / 'sitemap.xml', ROOT / 'llms.txt', ROOT / '.nojekyll',
    ]
    for path in required:
        if not path.exists():
            errors.append(f'Missing required file: {path.relative_to(ROOT)}.')

    if errors:
        print('Site validation failed:', file=sys.stderr)
        for error in errors:
            print(f'  - {error}', file=sys.stderr)
        return 1

    print(f'Validated {len(HTML_FILES)} HTML files with no blocking errors.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
