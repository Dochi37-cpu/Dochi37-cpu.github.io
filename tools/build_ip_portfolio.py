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
    for card in data['cards']:
        assert card['parents'] and all(1 <= n <= 23 for n in card['parents'])
    return data

def render_record(item):
    stage = STAGES[item['stage']]
    country = COUNTRIES[item['jurisdiction']]
    attrs = {'parent': str(item['parent']), 'jurisdiction': item['jurisdiction'],
             'application': item['application'], 'publication': item['publication'],
             'aliases': '|'.join(item['aliases']), 'stage': item['stage'],
             'event-date': item['event_date']}
    attributes = ' '.join(f'data-{k}="{escape(v, quote=True)}"' for k, v in attrs.items())
    note = ''
    if item.get('allowance'):
        value = item['allowance']
        note = '<p class="ip-record-note">' + bilingual(value['note_ko'], value['note_en']) + '</p>'
    aliases = ''
    if item['aliases']:
        aliases = '<small>' + bilingual('관련 공개번호: ', 'Related publications: ') + escape(' · '.join(item['aliases'])) + '</small>'
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
    rows = re.findall(r'<tr\b[^>]*>\s*<td(?: role="cell")? class="no">([\s\S]*?)</tr>', table.group(1))
    assert len(rows) == 23, 'preserve all 23 domestic rows'
    items_by_parent = {}
    for item in data['records']:
        items_by_parent.setdefault(item['parent'], []).append(item)
    rendered_rows = []
    domestic_stages = {}
    for number, tail in enumerate(rows, 1):
        row = '<td class="no">' + tail
        assert re.match(rf'<td class="no">{number}</td>', row), 'domestic order changed'
        row = re.sub(r'<!-- linked:start -->[\s\S]*?<!-- linked:end -->', '', row)
        row = re.sub(r' role="cell"', '', row)
        cells = re.findall(r'<td\b[^>]*>[\s\S]*?</td>', row)
        assert len(cells) == 5, 'domestic registry column contract changed'
        domestic_stages[number] = 'granted' if '>Granted</span>' in cells[3] else 'published'
        if number in data['unresolved_domestic_rows'] + [11]:
            cells[1] = re.sub(r'<a class="ip-domestic-source"[^>]*>([\s\S]*?)</a>', r'\1', cells[1])
        cell = cells[-1]
        group = items_by_parent.get(number, [])
        if group:
            extra = '<div class="ip-related"><h4>' + bilingual('해외 권리화·국제공개', 'International records') + '</h4><ul class="ip-rights">' + ''.join(map(render_record, group)) + '</ul></div>'
            cell = cell[:-5] + '<!-- linked:start -->' + extra + '<!-- linked:end --></td>'
        # Link domestic identifiers without changing their visible text/attributes.
        if number not in data['unresolved_domestic_rows'] + [11] and 'class="ip-domestic-source"' not in cells[1]:
            raw = re.sub(r'<[^>]+>', ' ', cells[1])
            match = re.search(r'KR\s*10-(\d{7})', raw)
            if match and 'Reg.' in raw:
                publication = 'KR10' + match.group(1) + 'B1'
                # The existing Ni-V grant is retained even if a mirror has not indexed it.
            else:
                match = re.search(r'Pub\.\s*KR\s*10-(\d{4})-(\d+)', raw)
                publication = 'KR' + match.group(1) + match.group(2).zfill(7) + 'A' if match else None
            if publication:
                cells[1] = re.sub(r'(<td\b[^>]*>)([\s\S]*)(</td>)',
                    lambda m: m[1] + f'<a class="ip-domestic-source" href="https://patents.google.com/patent/{publication}/ko">' + m[2] + '</a>' + m[3], cells[1])
        cells[-1] = cell
        cells = [c.replace('<td ', '<td role="cell" ', 1) for c in cells]
        rendered_rows.append(f'<tr role="row" id="patent-{number}" class="anchor-target">' + ''.join(cells) + '</tr>')
    grants = sum(x['stage'] == 'granted' for x in data['records'])
    other = sum(x['stage'] in ('published','allowed') for x in data['records'])
    pct = sum(x['stage'] == 'pct_published' for x in data['records'])
    metrics = [(sum(s=='granted' for s in domestic_stages.values()),'국내 등록','KR grants'), (sum(s=='published' for s in domestic_stages.values()),'국내 공개','KR publications'),
               (grants,'해외 등록','International grants'), (other,'해외 공개·등록결정','International publications / allowance'),
               (pct,'PCT 국제공개','PCT publications')]
    metric_html = ''.join(f'<div class="ip-metric"><strong>{n}</strong><span>{bilingual(ko,en)}</span></div>' for n,ko,en in metrics)
    cards = []
    for card in data['cards']:
        stages = {domestic_stages[n] for n in card['parents']}
        ko,en = ('한국 등록·공개','KR · Granted / published') if len(stages)>1 else (('한국 등록','KR · Granted') if 'granted' in stages else ('한국 공개','KR · Published'))
        badges = ['<span class="ip-badge">'+bilingual(ko,en)+'</span>']
        related = [x for x in data['records'] if x['parent'] in card['parents']]
        seen = set()
        for item in related:
            label = (item['jurisdiction'], item['stage'])
            if label in seen:
                continue
            seen.add(label)
            ko,en = COUNTRIES[label[0]]; sk,se=STAGES[label[1]]
            if label[0] == 'WO':
                ko,en,sk,se = '', '', 'PCT 국제공개', 'PCT publication'
            badges.append(f'<span class="ip-badge {item["stage"]}">{bilingual(ko+" "+sk if ko else sk,en+" · "+se if en else se)}</span>')
        links = ''.join(f'<a href="#patent-{n}">{bilingual("특허 "+str(n),"Record "+str(n))}</a>' for n in card['parents'])
        cards.append(f'<article class="family-card" id="{card["id"]}"><div class="eyebrow">{bilingual(card["application_ko"],card["application_en"])}</div><h3>{bilingual(card["ko"],card["en"])}</h3><p>{bilingual(card["description_ko"],card["description_en"])}</p><div class="ip-badges">'+''.join(badges)+f'</div><div class="ip-card-links">{links}</div></article>')
    main = f'''<main id="main-content">
  <section class="page-hero"><div class="shell">
    <div class="eyebrow">{bilingual('지식재산','INTELLECTUAL PROPERTY')}</div>
    <h1>{bilingual('산업 적용을 위한 국내외 특허 포트폴리오','Patents for Industrial Applications')}</h1>
    <p>{bilingual('열에너지·탄소전환·수소 기술의 산업 적용을 위해 축적한 PI의 선행·공동연구 특허를 소개합니다. 각 발명의 국내 기록과 해외 권리화 이력을 함께 확인할 수 있습니다.','Explore the PI’s prior and collaborative patents for industrial applications in thermal energy, carbon conversion and hydrogen. Each invention connects domestic records with its international patent history.')}</p>
    <div class="page-nav"><a href="#families">{bilingual('기술별 대표 특허','Selected portfolios')}</a><a href="#registry">{bilingual('국내외 통합 목록','Integrated registry')}</a><a href="#status">{bilingual('성과 귀속·수록 기준','Attribution & scope')}</a></div>
    <div class="ip-metrics">{metric_html}</div>
    <p class="ip-count-note">{bilingual('국내 23개 기록을 기준으로 연결한 공개 실적입니다. 국가·지역별 출원 1건을 한 번만 세며, PCT는 해외 등록과 구분합니다.','Public records linked to 23 domestic entries. Each national/regional application is counted once; PCT publications are separate from international grants.')} <time datetime="{data['checked_on']}">{data['checked_on']}</time></p>
  </div></section>
  <section class="section alt anchor-target" id="families"><div class="shell">
    <div class="section-head"><div><div class="eyebrow">{bilingual('기술별 대표 특허','SELECTED PATENT PORTFOLIOS')}</div><h2>{bilingual('기술의 용도와 국내외 권리화 현황을 함께 봅니다.','Industrial relevance and international patent history.')}</h2></div><p>{bilingual('관심 기술에서 해당 발명의 국내외 상세 기록으로 바로 이동할 수 있습니다. 수소·수전해 분야는 서로 다른 발명으로 구성된 기술 포트폴리오입니다.','Follow each technology to its linked domestic and international records. The hydrogen/electrolysis portfolio contains distinct inventions.')}</p></div>
    <div class="family-grid">{''.join(cards)}</div>
  </div></section>
  <section class="section anchor-target" id="registry"><div class="shell">
    <div class="section-head"><div><div class="eyebrow">{bilingual('국내외 특허 통합 목록','DOMESTIC & INTERNATIONAL PATENTS')}</div><h2>{bilingual('하나의 발명, 연결된 국내외 기록.','One invention, connected patent records.')}</h2></div><p>{bilingual('각 발명의 국내 등록·공개 이력과 해외 권리화 기록을 함께 확인할 수 있습니다. 대표 카드의 특허 번호를 누르면 해당 항목으로 이동합니다.','Explore each invention’s domestic and international patent history. Record links in the selected portfolios lead directly to the relevant entry.')}</p></div>
    <div class="registry-wrap" role="region" aria-label="Domestic and international patents" tabindex="0">
    <table class="registry-table ip-table" role="table"><caption>{bilingual('국내 23개 항목과 연결된 국내외 특허 기록','23 domestic entries with linked international patent records')}</caption>
    <thead role="rowgroup"><tr role="row"><th scope="col">{bilingual('번호','No.')}</th><th scope="col">{bilingual('국내 식별자','Domestic identifiers')}</th><th scope="col">{bilingual('발명의 명칭','Invention')}</th><th scope="col">{bilingual('국내 이력','Domestic record')}</th><th scope="col">{bilingual('기술 분야·해외 연결','Application & international records')}</th></tr></thead>
    <tbody role="rowgroup">{''.join(rendered_rows)}</tbody></table></div>
  </div></section>
  <section class="section alt anchor-target" id="status"><div class="shell ip-attribution">
    <div class="eyebrow">{bilingual('성과 귀속·수록 기준','ATTRIBUTION & SCOPE')}</div>
    <h2>{bilingual('연구 경험과 발명 기여를 명확하게 기록합니다.','Clear attribution of research and invention.')}</h2>
    <p>{bilingual('이 페이지는 PI가 발명자로 참여한 선행·공동연구의 공개 기록입니다. 특허권자는 각 공보에 기재된 기관·기업이며, 기존 성과를 P2E 창출 성과나 P2E 소유 권리로 소급 표시하지 않습니다. P2E에서 새로 창출한 성과는 공개 가능한 시점에 구분해 표시합니다.','These are public records of prior and collaborative inventions in which the PI participated. Patent owners are the institutions/companies named in each publication. Prior records are not relabeled as P2E-originated or P2E-owned IP; new P2E outputs will be identified when publicly available.')}</p>
    <p>{bilingual('등록·공개는 확인된 공보 이력을 뜻합니다. 공개 출원이 현재 심사 중임을 뜻하지 않으며, 등록 이력이 현재 권리의 유효성이나 실시권을 보장하지 않습니다. EP는 유럽 지역 절차 1건으로 계산하고 개별 국가의 유효화는 별도로 집계하지 않습니다.','Grant/publication labels describe documented publication history, not current pendency, enforceability or licensing rights. EP is counted as one regional procedure; individual national validations are not counted.')}</p>
    <div id="principle" class="anchor-target"><p>{bilingual('공개된 자료만 연결하며, 공개 전 출원과 내부 발명 정보는 수록하지 않습니다. PCT 국제공개는 국가별 등록과 구분하고, 동일 출원의 공개·등록 번호는 중복 집계하지 않습니다.','Only public material is linked. Unpublished applications and internal invention information are excluded. PCT international publications are separate from national grants, and publication/grant numbers for the same application are not counted twice.')}</p></div>
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
