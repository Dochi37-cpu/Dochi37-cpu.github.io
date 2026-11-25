#!/usr/bin/env python3
"""Render the bilingual static IP page from existing KR rows and verified links."""
import argparse
import json
import re
from datetime import date
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAGES = {'granted': ('등록공보', 'Granted'), 'published': ('공개', 'Published'),
          'allowed': ('등록결정 안내', 'Allowance notice'),
          'pct_published': ('PCT 국제공개', 'PCT publication')}
COUNTRIES = {'US': ('미국', 'US'), 'JP': ('일본', 'Japan'), 'CN': ('중국', 'China'),
             'EP': ('유럽', 'Europe'), 'WO': ('WIPO', 'WIPO')}

def bilingual(ko, en):
    return f'<span class="lang-ko">{escape(ko)}</span><span class="lang-en">{escape(en)}</span>'

def load_data(root=ROOT):
    data = json.loads((root / 'data/ip-portfolio.json').read_text(encoding='utf-8'))
    seen = set()
    publications = set()
    for item in data['records']:
        assert 1 <= item['parent'] <= 23, 'unknown domestic parent'
        assert item['stage'] in STAGES and item['jurisdiction'] in COUNTRIES
        assert (item['jurisdiction'] == 'WO') == (item['stage'] == 'pct_published')
        assert item['publication'].startswith(item['jurisdiction'])
        if item['stage'] == 'granted':
            assert re.search(r'B[12]?$', item['publication']), 'grant requires a grant publication'
        else:
            assert re.search(r'A\d?$', item['publication']), 'publication kind required'
        assert date.fromisoformat(item['event_date']) <= date.fromisoformat(data['checked_on'])
        application = (item['jurisdiction'], re.sub(r'[^\w]', '', item['application']))
        assert application not in seen, 'duplicate jurisdiction/application'
        seen.add(application)
        for number in [item['publication'], *item['aliases']]:
            assert number not in publications, 'publication counted twice'
            publications.add(number)
        for field in ('publication_url', 'evidence_url'):
            assert item[field].startswith('https://'), 'public source required'
    for publication, url in data.get('domestic_source_overrides', {}).items():
        assert re.fullmatch(r'KR[0-9]+[AB][0-9]?', publication), 'invalid domestic source identifier'
        assert re.fullmatch(r'https://doi\.org/10\.8080/10[0-9]{11}', url), 'invalid KIPRIS permanent link'
    for card in data['cards']:
        assert card['parents'] and all(1 <= n <= 23 for n in card['parents'])
        assert set(card.get('member_titles', {})) <= {str(n) for n in card['parents']}
        assert set(card.get('legacy_anchors', {})) <= {str(n) for n in card['parents']}
    transferred_parents = set()
    for transfer in data.get('technology_transfers', []):
        assert 1 <= transfer['parent'] <= 23 and transfer['parent'] not in transferred_parents
        assert transfer['recipient_ko'] and transfer['recipient_en']
        assert transfer['reference_url'].startswith('https://')
        date.fromisoformat(transfer['confirmed_on'])
        transferred_parents.add(transfer['parent'])
    return data

def render_badges(parents, domestic_stages, records):
    stages = {domestic_stages[n] for n in parents}
    ko,en = ('한국 등록 또는 공개','Korean grants or publications') if len(stages)>1 else (('한국 등록','KR grant') if 'granted' in stages else ('한국 공개','KR publication'))
    badges = ['<span class="ip-badge">'+bilingual(ko,en)+'</span>']
    seen = set()
    for item in records:
        if item['parent'] not in parents:
            continue
        label = (item['jurisdiction'], item['stage'])
        if label in seen:
            continue
        seen.add(label)
        ko,en = COUNTRIES[label[0]]; sk,se=STAGES[label[1]]
        if label[0] == 'WO':
            ko,en,sk,se = '', '', 'PCT 국제공개', 'PCT publication'
        badges.append(f'<span class="ip-badge {item["stage"]}">{bilingual(ko+" "+sk if ko else sk,en+": "+se if en else se)}</span>')
    return '<div class="ip-badges">'+''.join(badges)+'</div>'

def transfer_label(transfer):
    return bilingual('기술이전: '+transfer['recipient_ko'], 'Technology transfer: '+transfer['recipient_en'])

def render_record(item):
    stage = STAGES[item['stage']]
    country = COUNTRIES[item['jurisdiction']]
    attrs = {'parent': str(item['parent']), 'jurisdiction': item['jurisdiction'],
             'application': item['application'], 'publication': item['publication'],
             'aliases': '|'.join(item['aliases']), 'stage': item['stage'],
             'event-date': item['event_date']}
    attributes = ' '.join(f'data-{k}="{escape(v, quote=True)}"' for k, v in attrs.items())
    note = ''
    value = item.get('allowance', {})
    if value.get('note_ko') and value.get('note_en'):
        note = '<p class="ip-record-note">' + bilingual(value['note_ko'], value['note_en']) + '</p>'
    aliases = ''
    if item['aliases']:
        aliases = '<small>' + bilingual('관련 공개번호: ', 'Related publications: ') + escape(', '.join(item['aliases'])) + '</small>'
    return (f'<li class="ip-linked-record" {attributes}>'
            f'<div class="ip-right-heading"><b>{bilingual(*country)}</b>'
            f'<span class="ip-stage {item["stage"]}">{bilingual(*stage)}</span></div>'
            f'<a class="ip-publication" href="{escape(item["publication_url"], quote=True)}">{escape(item["publication"])}</a>'
            f'<small>{bilingual("출원: ", "Application: ")}{escape(item["application"])}</small>'
            f'<small>{bilingual("공보 발행: ", "Publication: ")}<time datetime="{item["event_date"]}">{item["event_date"]}</time></small>'
            f'{aliases}<a class="ip-source" href="{escape(item["evidence_url"], quote=True)}">{bilingual("근거 공보", "Source record")}</a>{note}</li>')

def render(source, data):
    old_main = source.split('<main id="main-content">', 1)[1].split('</main>', 1)[0]
    table = re.search(r'<table\b[^>]*class="registry-table[^\"]*"[^>]*>([\s\S]*?)</table>', old_main)
    if not table:
        raise ValueError('existing domestic registry is required')
    rows = re.findall(r'(<tr\b[^>]*>)\s*<td(?: role="cell")? class="no">([\s\S]*?)</tr>', table.group(1))
    assert len(rows) == 23, 'preserve all 23 domestic rows'
    items_by_parent = {}
    for item in data['records']:
        items_by_parent.setdefault(item['parent'], []).append(item)
    rendered_rows = []
    domestic_stages = {}
    domestic_titles = {}
    domestic_anchors = {}
    transfers_by_parent = {item['parent']: item for item in data.get('technology_transfers', [])}
    for number, (opening, tail) in enumerate(rows, 1):
        # Keep existing bookmarks attached to their invention when display numbers change.
        match = re.search(r'\bid="([^"]+)"', opening)
        row_anchor = match[1] if match else f'patent-{number}'
        assert re.fullmatch(r'patent-[1-9][0-9]*', row_anchor), 'invalid domestic anchor'
        assert row_anchor not in domestic_anchors.values(), 'duplicate domestic anchor'
        domestic_anchors[number] = row_anchor
        row = '<td class="no">' + tail
        assert re.match(rf'<td class="no">{number}</td>', row), 'domestic order changed'
        row = re.sub(r'<!-- linked:start -->[\s\S]*?<!-- linked:end -->', '', row)
        row = re.sub(r'<!-- transfer:start -->[\s\S]*?<!-- transfer:end -->', '', row)
        row = re.sub(r' role="cell"', '', row)
        cells = re.findall(r'<td\b[^>]*>[\s\S]*?</td>', row)
        assert len(cells) == 5, 'domestic registry column contract changed'
        domestic_stages[number] = 'granted' if '>Granted</span>' in cells[3] else 'published'
        domestic_titles[number] = re.sub(r'^<td\b[^>]*>|</td>$', '', cells[2])
        # Resolve domestic links independently of unresolved international families.
        cells[1] = re.sub(r'<a class="ip-domestic-source"[^>]*>([\s\S]*?)</a>', r'\1', cells[1])
        cell = cells[-1]
        group = items_by_parent.get(number, [])
        if group:
            extra = '<div class="ip-related"><h4>' + bilingual('해외 권리화·국제공개', 'International records') + '</h4><ul class="ip-rights">' + ''.join(map(render_record, group)) + '</ul></div>'
            cell = cell[:-5] + '<!-- linked:start -->' + extra + '<!-- linked:end --></td>'
        if number in transfers_by_parent:
            transfer = transfers_by_parent[number]
            extra = f'<div class="ip-transfer-record" data-transfer-parent="{number}">'+transfer_label(transfer)+'</div>'
            cell = cell[:-5] + '<!-- transfer:start -->' + extra + '<!-- transfer:end --></td>'
        # Use verified KIPRIS permanent links when the grant/publication mirror is unavailable.
        # Keys are publication identifiers so links stay with inventions after renumbering.
        raw = re.sub(r'<[^>]+>', ' ', cells[1])
        match = re.search(r'KR\s*10-(\d{7})', raw)
        if match and 'Reg.' in raw:
            publication = 'KR10' + match.group(1) + 'B1'
        else:
            match = re.search(r'Pub\.\s*KR\s*10-(\d{4})-(\d+)', raw)
            publication = 'KR' + match.group(1) + match.group(2).zfill(7) + 'A' if match else None
        assert publication, 'domestic identifier required for source link'
        source_url = data.get('domestic_source_overrides', {}).get(
            publication, f'https://patents.google.com/patent/{publication}/ko')
        cells[1] = re.sub(r'(<td\b[^>]*>)([\s\S]*)(</td>)',
            lambda m: m[1] + f'<a class="ip-domestic-source" href="{escape(source_url, quote=True)}">' + m[2] + '</a>' + m[3], cells[1])
        cells[-1] = cell
        cells = [c.replace('<td ', '<td role="cell" ', 1) for c in cells]
        rendered_rows.append(f'<tr role="row" id="{row_anchor}" class="anchor-target">' + ''.join(cells) + '</tr>')
    grants = sum(x['stage'] == 'granted' for x in data['records'])
    other = sum(x['stage'] in ('published','allowed') for x in data['records'])
    pct = sum(x['stage'] == 'pct_published' for x in data['records'])
    metrics = [(sum(s=='granted' for s in domestic_stages.values()),'국내 등록','KR grants'), (sum(s=='published' for s in domestic_stages.values()),'국내 공개','KR publications'),
               (grants,'해외 등록','International grants'), (other,'해외 공개 또는 등록결정','International publications / allowance'),
               (pct,'PCT 국제공개','PCT publications')]
    metric_html = ''.join(f'<div class="ip-metric"><strong>{n}</strong><span>{bilingual(ko,en)}</span></div>' for n,ko,en in metrics)
    cards = []
    for card in data['cards']:
        members = []
        for number in card['parents']:
            title = card.get('member_titles', {}).get(str(number))
            title_html = bilingual(title['ko'],title['en']) if title else domestic_titles[number]
            legacy_id = card.get('legacy_anchors', {}).get(str(number))
            anchor = f' id="{escape(legacy_id,quote=True)}"' if legacy_id else ''
            members.append(f'<li class="ip-portfolio-invention anchor-target"{anchor}><a class="ip-invention-link" href="#{domestic_anchors[number]}"><span class="ip-invention-number">{bilingual("특허 "+str(number),"Record "+str(number))}</span>{title_html}</a>'+render_badges([number],domestic_stages,data['records'])+'</li>')
        cards.append(f'<article class="family-card" id="{card["id"]}"><div class="eyebrow">{bilingual(card["application_ko"],card["application_en"])}</div><h3>{bilingual(card["ko"],card["en"])}</h3><p>{bilingual(card["description_ko"],card["description_en"])}</p><ul class="ip-portfolio-inventions">'+''.join(members)+'</ul></article>')
    main = f'''<main id="main-content">
  <section class="page-hero"><div class="shell">
    <h1>{bilingual('국내외 특허','Patent portfolio')}</h1>
    <p>{bilingual('정한솔 선임연구원이 이전 연구와 공동연구에서 발명자로 참여한 특허입니다. 국내 특허를 기준으로 해외 공보를 함께 모았습니다.','Patents naming Han Sol Jung as an inventor in prior and collaborative research. Korean records are paired with their corresponding international publications.')}</p>
    <div class="page-nav"><a href="#families">{bilingual('기술 분야별 특허','Technology areas')}</a><a href="#registry">{bilingual('특허 전체 목록','Full patent list')}</a></div>
    <div class="ip-metrics">{metric_html}</div>
    <p class="ip-count-note">{bilingual('국가나 지역별로 같은 출원은 한 번만 셉니다. PCT 국제공개는 해외 등록에 포함하지 않습니다.','Each application is counted once per jurisdiction. PCT publications are counted separately from overseas grants.')} {bilingual('해외 기록 확인일: ', 'International records checked: ')}<time datetime="{data['checked_on']}">{data['checked_on']}</time></p>
  </div></section>
  <section class="section alt anchor-target" id="families"><div class="shell">
    <div class="section-head"><div><h2>{bilingual('기술 분야별 특허','Patents by technology area')}</h2></div></div>
    <div class="family-grid">{''.join(cards)}</div>
  </div></section>
  <section class="section anchor-target" id="registry"><div class="shell">
    <div class="section-head"><div><h2>{bilingual('특허 전체 목록','Full patent list')}</h2></div></div>
    <div class="registry-wrap" role="region" aria-label="Domestic and international patents" tabindex="0">
    <table class="registry-table ip-table" role="table"><caption>{bilingual(f'국내 발명 {len(rendered_rows)}건과 관련 해외 기록', f'{len(rendered_rows)} Korean inventions and their international records')}</caption>
    <thead role="rowgroup"><tr role="row"><th scope="col">{bilingual('번호','No.')}</th><th scope="col">{bilingual('국내 식별자','Domestic identifiers')}</th><th scope="col">{bilingual('발명의 명칭','Invention')}</th><th scope="col">{bilingual('국내 이력','Domestic record')}</th><th scope="col">{bilingual('해외 기록·기술이전','International records & technology transfer')}</th></tr></thead>
    <tbody role="rowgroup">{''.join(rendered_rows)}</tbody></table></div>
  </div></section>
</main>'''
    result = source.replace('<main id="main-content">'+old_main+'</main>', main)
    result = re.sub(r'<body([^>]*)>', lambda m: '<body'+m[1]+('' if 'class=' in m[1] else ' class="ip-page"')+'>', result, count=1)
    if 'href="assets/ip-portfolio.css"' not in result:
        result = result.replace('  <meta property="og:title"', '  <link rel="stylesheet" href="assets/ip-portfolio.css">\n  <meta property="og:title"', 1)
    desc='Domestic and international patent records associated with Han Sol Jung: industrial applications, grant publications and linked patent families.'
    result = re.sub(r'(<meta (?:name="description"|property="og:description") content=")[^"]*(")', lambda m:m[1]+desc+m[2], result)
    return result

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    try:
        data=load_data()
        path=ROOT/'ip.html'; source=path.read_text(encoding='utf-8')
        output=render(source,data)
        if args.check:
            if output != source:
                raise ValueError('ip.html differs from portfolio source; run tools/build_ip_portfolio.py')
            print('IP portfolio sources, counts, links and static rendering: PASS')
        else:
            path.write_text(output,encoding='utf-8')
            print('Rendered 23 domestic entries with',len(data['records']),'international records')
    except (ValueError,AssertionError,KeyError,OSError) as error:
        parser.exit(1,str(error)+'\n')

if __name__ == '__main__':
    main()
