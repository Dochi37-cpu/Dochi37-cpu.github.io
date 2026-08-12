#!/usr/bin/env python3
"""Update canonical site URLs after a GitHub Pages or custom-domain migration."""
from __future__ import annotations

import argparse
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
OLD_URL = "https://dochi37-cpu.github.io"
TEXT_SUFFIXES = {'.html', '.xml', '.txt', '.md'}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', required=True, help='New absolute HTTPS base URL, without a trailing slash')
    parser.add_argument('--write-cname', action='store_true', help='Write the hostname to CNAME')
    args = parser.parse_args()

    new_url = args.url.rstrip('/')
    parsed = urlparse(new_url)
    if parsed.scheme != 'https' or not parsed.netloc or parsed.path not in ('', '/'):
        parser.error('--url must be an HTTPS origin such as https://e2p.krict.re.kr')

    changed = []
    for path in ROOT.rglob('*'):
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        if any(part in {'.git'} for part in path.parts):
            continue
        text = path.read_text(encoding='utf-8')
        updated = text.replace(OLD_URL, new_url)
        if updated != text:
            path.write_text(updated, encoding='utf-8')
            changed.append(path.relative_to(ROOT))

    if args.write_cname:
        (ROOT / 'CNAME').write_text(parsed.netloc + '\n', encoding='utf-8')
        changed.append(Path('CNAME'))

    print(f'Updated {len(changed)} files to {new_url}')
    for path in changed:
        print(f'  - {path}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
