(async()=>{
  const baseText=await (await fetch('site-v12.js?rev=20260811v13base',{cache:'no-store'})).text();
  const baseRun=(0,eval)(baseText);
  if(baseRun&&typeof baseRun.then==='function') await baseRun;

  const style=document.createElement('style');
  style.textContent=`
    body{min-height:100vh}.mp-hidden-v13{display:none!important}.site-page-v13{display:none}.site-page-v13.active{display:block}
    .menu{gap:14px!important;font-size:12px!important}.menu a{position:relative;padding:10px 0!important}.menu a.active-v13{color:var(--teal)}.menu a.active-v13:after{content:"";position:absolute;left:0;right:0;bottom:2px;height:2px;border-radius:2px;background:linear-gradient(90deg,var(--teal),#91d85c)}
    .mobile-nav-btn-v13{display:none;appearance:none;border:1px solid var(--line);background:#fff;color:var(--navy);border-radius:10px;width:42px;height:42px;font-size:20px;cursor:pointer;font-weight:900}
    .page-mast-v13{padding:56px 0 30px;background:linear-gradient(135deg,#0b2a49,#125b71);color:#fff;border-bottom:1px solid rgba(255,255,255,.08)}.page-mast-v13 .kicker{color:#82e5dd}.page-mast-v13 h1{font-size:clamp(36px,4vw,58px);max-width:900px}.page-mast-v13 p{max-width:850px;color:#d5e7ed;font-size:17px;line-height:1.65}.page-mast-v13 .crumb{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#a8ced7;margin-bottom:12px;font-weight:900}
    .home-directory-v13{padding:38px 0 64px;background:#fff;border-top:1px solid #e0e9ed}.home-directory-grid-v13{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.home-link-v13{padding:16px 15px;border:1px solid var(--line);border-radius:15px;background:linear-gradient(145deg,#fff,#f7fafc);transition:.18s ease}.home-link-v13:hover{transform:translateY(-2px);border-color:#afd8d8;box-shadow:0 10px 24px rgba(12,35,64,.06)}.home-link-v13 .n{font-size:9px;font-weight:950;color:var(--teal);letter-spacing:.09em}.home-link-v13 b{display:block;color:var(--navy);font-size:15px;margin:6px 0 4px}.home-link-v13 span{display:block;color:var(--muted);font-size:10.5px;line-height:1.4}
    .research-framework-v13{padding:62px 0;background:linear-gradient(120deg,#0b2948,#104b64);color:#fff}.research-framework-v13 .methodology-map{margin-top:0}.research-framework-v13 .principles-grid{margin-bottom:0}.research-framework-v13 .rf-head{display:flex;justify-content:space-between;gap:24px;align-items:end;margin-bottom:18px}.research-framework-v13 .rf-head p{max-width:720px;margin:0;color:#cfe2e9;font-size:13px;line-height:1.6}
    .culture-page-v13{padding:66px 0;background:#f4f8fb}.culture-intro-v13{display:grid;grid-template-columns:1fr .8fr;gap:18px;margin-bottom:20px}.culture-hero-v13{padding:28px;border-radius:22px;background:linear-gradient(140deg,#0e3153,#146171);color:#fff}.culture-hero-v13 h2{color:#fff}.culture-hero-v13 p{color:#d5e7ed;font-size:15px}.culture-aside-v13{padding:25px;border:1px solid var(--line);border-radius:22px;background:#fff}.culture-aside-v13 h3{font-size:20px}.culture-aside-v13 p{font-size:13px;color:var(--muted)}.culture-principles-v13{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:16px}.culture-principle-v13{padding:14px;border:1px solid rgba(255,255,255,.16);border-radius:13px;background:rgba(255,255,255,.07)}.culture-principle-v13 b{display:block;font-size:12px}.culture-principle-v13 span{display:block;color:#cce0e7;font-size:10px;line-height:1.4;margin-top:3px}.culture-source-v13{background:#fff;border:1px solid var(--line);border-radius:20px;padding:26px;margin-bottom:18px}.culture-source-v13 h3{font-size:26px}.culture-source-v13>p{color:var(--muted);font-size:14px}.culture-source-v13 .promise-grid{margin-top:17px}
    .join-page-v13,.contact-page-v13{padding:66px 0;background:#f4f8fb}.join-shell-v13{background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px;box-shadow:0 8px 26px rgba(12,35,64,.04)}.join-page-v13 .opportunities-v11{margin-top:0;padding-top:0;border-top:0}
    .contact-grid-v13{display:grid;grid-template-columns:.9fr 1.1fr;gap:18px}.contact-card-v13{background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px}.contact-card-v13.primary{background:linear-gradient(145deg,#0d3153,#145f72);color:#fff;border:0}.contact-card-v13.primary p{color:#d5e7ed}.contact-name-v13{font-size:31px;font-weight:950;letter-spacing:-.04em;margin:10px 0 5px}.contact-role-v13{font-size:13px;color:#d3e6ed;line-height:1.5}.contact-detail-v13{display:grid;gap:10px;margin-top:22px}.contact-row-v13{padding:12px 13px;border-radius:12px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.10)}.contact-row-v13 small{display:block;color:#91dedb;font-size:9px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.contact-row-v13 a,.contact-row-v13 span{display:block;margin-top:3px;color:#fff;font-size:13px;font-weight:800}.contact-links-v13{display:grid;gap:9px;margin-top:15px}.contact-links-v13 a{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 13px;border:1px solid #dce7eb;border-radius:12px;background:#fbfdfe;color:#2b5368;font-size:12px;font-weight:850}.contact-note-v13{margin-top:16px;padding:13px 14px;border-left:3px solid var(--teal);background:#f6fbfb;border-radius:0 12px 12px 0;color:#5c7280;font-size:11px;line-height:1.5}
    footer{margin-top:auto}
    @media(max-width:1180px){.menu{gap:10px!important;font-size:11px!important}.home-directory-grid-v13{grid-template-columns:repeat(3,1fr)}}
    @media(max-width:920px){.mobile-nav-btn-v13{display:grid;place-items:center}.menu{display:none!important;position:absolute;top:76px;left:18px;right:18px;background:#fff;border:1px solid var(--line);border-radius:16px;padding:12px 18px;box-shadow:0 18px 42px rgba(12,35,64,.14);flex-direction:column;align-items:stretch!important;gap:1px!important;white-space:normal!important}.menu.open-v13{display:flex!important}.menu a{padding:9px 4px!important}.menu a.active-v13:after{display:none}.nav{position:relative}.culture-intro-v13,.contact-grid-v13{grid-template-columns:1fr}.culture-principles-v13{grid-template-columns:1fr 1fr}.research-framework-v13 .rf-head{display:block}.research-framework-v13 .rf-head p{margin-top:8px}}
    @media(max-width:600px){.home-directory-grid-v13,.culture-principles-v13{grid-template-columns:1fr}.page-mast-v13{padding:42px 0 24px}}
  `;
  document.head.appendChild(style);

  const main=document.querySelector('main');
  if(!main) return;

  // Move the detailed translation framework out of HOME and into RESEARCH.
  const heroShell=document.querySelector('#home .shell');
  const methodology=heroShell?.querySelector('.methodology-map');
  const principles=heroShell?.querySelector('.principles-grid');
  if(methodology&&principles&&!document.querySelector('#research-framework-v13')){
    const rf=document.createElement('section');rf.id='research-framework-v13';rf.className='research-framework-v13';
    rf.innerHTML='<div class="shell"><div class="rf-head"><div><div class="kicker"><span class="lang-ko">연구 방법론</span><span class="lang-en">Research Methodology</span></div><h2><span class="lang-ko">Technology Translation Framework</span><span class="lang-en">Technology Translation Framework</span></h2></div><p><span class="lang-ko">원천기술과 응용 도메인에서 출발하여 장치 현실, 공정·운전 모델, 검증·평가를 거쳐 engineering decision으로 연결하는 공통 프레임워크입니다.</span><span class="lang-en">A common framework that starts from source technologies and application domains, then moves through equipment reality, process/operation models and validation toward engineering decisions.</span></p></div></div>';
    const shell=rf.querySelector('.shell');shell.appendChild(methodology);shell.appendChild(principles);
    const research=document.querySelector('#research');if(research)research.insertAdjacentElement('beforebegin',rf);else main.appendChild(rf);
  }

  // Create a concise directory at the bottom of the HOME view.
  if(!document.querySelector('#home-directory-v13')){
    const directory=document.createElement('section');directory.id='home-directory-v13';directory.className='home-directory-v13';
    directory.innerHTML=`<div class="shell"><div class="section-title-row"><div><div class="kicker"><span class="lang-ko">연구그룹 둘러보기</span><span class="lang-en">Explore the Group</span></div><h3><span class="lang-ko">상세 내용은 각 페이지에서 확인할 수 있습니다.</span><span class="lang-en">Detailed content is organized into dedicated pages.</span></h3></div></div><div class="home-directory-grid-v13"><a class="home-link-v13" href="research.html"><div class="n">01</div><b><span class="lang-ko">연구</span><span class="lang-en">Research</span></b><span>questions · methodology · programs</span></a><a class="home-link-v13" href="people.html"><div class="n">02</div><b><span class="lang-ko">구성원</span><span class="lang-en">People</span></b><span>PI · researchers · collaborators</span></a><a class="home-link-v13" href="publications.html"><div class="n">03</div><b><span class="lang-ko">논문</span><span class="lang-en">Publications</span></b><span>peer-reviewed research record</span></a><a class="home-link-v13" href="ip.html"><div class="n">04</div><b>IP</b><span>families · technology clusters · registry</span></a><a class="home-link-v13" href="group.html"><div class="n">05</div><b><span class="lang-ko">그룹 운영</span><span class="lang-en">Group Culture</span></b><span>mentoring · ownership · independence</span></a><a class="home-link-v13" href="join.html"><div class="n">06</div><b><span class="lang-ko">함께하기</span><span class="lang-en">Join Us</span></b><span>positions · collaboration</span></a></div></div>`;
    const identity=document.querySelector('#research-identity-v12');if(identity)identity.insertAdjacentElement('afterend',directory);else document.querySelector('#home')?.insertAdjacentElement('afterend',directory);
  }

  // Split GROUP CULTURE from JOIN US. Mentoring and operating model belong to group culture.
  const oldJoin=document.querySelector('#join');
  const joinCard=oldJoin?.querySelector('.white-card');
  const sourceTwoCol=joinCard?.querySelector('.two-col');
  const mentoringSource=sourceTwoCol?.firstElementChild?.cloneNode(true);
  const operatingSource=joinCard?.querySelector('.operating-model-v12')?.cloneNode(true);
  const opportunitiesSource=joinCard?.querySelector('.opportunities-v11')?.cloneNode(true);

  if(!document.querySelector('#group-page-v13')){
    const group=document.createElement('section');group.id='group-page-v13';group.className='culture-page-v13';
    group.innerHTML=`<div class="shell"><div class="culture-intro-v13"><article class="culture-hero-v13"><div class="kicker"><span class="lang-ko">연구그룹 운영</span><span class="lang-en">Research Group Culture</span></div><h2><span class="lang-ko">좋은 연구자는 과제의 보조인력이 아니라, 자기 질문과 판단 기준을 소유한 연구자입니다.</span><span class="lang-en">A strong researcher is not project support, but an owner of questions and engineering judgment.</span></h2><p><span class="lang-ko">그룹 운영의 목적은 연구자를 빠르게 기존 업무에 투입하는 것이 아니라, source of truth를 재현하고 검증한 뒤 하나의 research interface를 독립적으로 소유하도록 만드는 것입니다.</span><span class="lang-en">The operating goal is not rapid task assignment. Researchers first reproduce and challenge the source of truth, then progressively own a research interface and make independent technical decisions.</span></p><div class="culture-principles-v13"><div class="culture-principle-v13"><b>Ownership</b><span><span class="lang-ko">자기 연구질문과 기술 경계를 소유</span><span class="lang-en">Own a question and technical boundary</span></span></div><div class="culture-principle-v13"><b>Rigor</b><span><span class="lang-ko">재현·독립 계산·오류 발견을 중시</span><span class="lang-en">Reproduction, recalculation and error discovery</span></span></div><div class="culture-principle-v13"><b>Fair Credit</b><span><span class="lang-ko">실제 기여에 따른 저자·발명자권</span><span class="lang-en">Authorship and inventorship by contribution</span></span></div><div class="culture-principle-v13"><b>Independence</b><span><span class="lang-ko">다음 분석과 다음 질문을 스스로 정의</span><span class="lang-en">Define the next analysis and question</span></span></div></div></article><aside class="culture-aside-v13"><div class="kicker"><span class="lang-ko">왜 별도 페이지인가</span><span class="lang-en">Why a separate page?</span></div><h3><span class="lang-ko">채용 정보와 연구지도 철학은 다른 정보입니다.</span><span class="lang-en">Recruiting information and mentoring philosophy serve different purposes.</span></h3><p><span class="lang-ko">Join Us는 현재 가능한 제도와 공동연구 경로를 안내합니다. 이 페이지는 구성원이 어떤 방식으로 연구 ownership과 독립성을 획득하는지 설명합니다.</span><span class="lang-en">Join Us describes available appointment and collaboration routes. This page explains how researchers develop ownership, rigor and independence after joining the group.</span></p></aside></div><div class="culture-source-v13" id="mentoring-source-v13"></div><div id="operating-source-v13"></div></div>`;
    const m=group.querySelector('#mentoring-source-v13');
    if(mentoringSource){m.appendChild(mentoringSource);const k=m.querySelector('.kicker');if(k)k.remove();const h=m.querySelector('h2');if(h)h.innerHTML='<span class="lang-ko">연구지도 원칙</span><span class="lang-en">Research Training & Mentoring Principles</span>';}else{m.innerHTML='<h3><span class="lang-ko">연구지도 원칙</span><span class="lang-en">Research Training & Mentoring Principles</span></h3>'}
    const o=group.querySelector('#operating-source-v13');if(operatingSource)o.replaceWith(operatingSource);else o.remove();
    main.appendChild(group);
  }

  if(!document.querySelector('#join-page-v13')){
    const join=document.createElement('section');join.id='join-page-v13';join.className='join-page-v13';
    join.innerHTML=`<div class="shell"><div class="page-mast-inline-v13"><div class="kicker"><span class="lang-ko">함께하기</span><span class="lang-en">Join Us</span></div><h2><span class="lang-ko">연구자 모집과 공동연구 기회</span><span class="lang-en">Research Positions & Collaboration</span></h2><p class="muted"><span class="lang-ko">현재 가능한 KRICT 제도와 협력 경로를 안내합니다. 연구지도 원칙과 그룹 운영 방식은 ‘그룹 운영’ 페이지에서 별도로 확인할 수 있습니다.</span><span class="lang-en">This page describes KRICT appointment routes and collaboration opportunities. Mentoring principles and the research operating model are documented separately under Group Culture.</span></p></div><div class="join-shell-v13" id="join-source-v13"></div></div>`;
    const target=join.querySelector('#join-source-v13');
    if(opportunitiesSource){
      opportunitiesSource.querySelector('[data-optarget="op-contact-v11"]')?.remove();
      opportunitiesSource.querySelector('#op-contact-v11')?.remove();
      target.appendChild(opportunitiesSource);
    }
    main.appendChild(join);
  }

  if(!document.querySelector('#contact-page-v13')){
    const contact=document.createElement('section');contact.id='contact-page-v13';contact.className='contact-page-v13';
    contact.innerHTML=`<div class="shell"><div class="contact-grid-v13"><article class="contact-card-v13 primary"><div class="kicker" style="color:#89e8e0"><span class="lang-ko">연락처</span><span class="lang-en">Contact</span></div><div class="contact-name-v13">Han Sol Jung · 정한솔</div><div class="contact-role-v13"><span class="lang-ko">선임연구원 · 한국화학연구원 화학공정솔루션연구센터<br>Equipment-to-Process Systems Group</span><span class="lang-en">Senior Researcher · Chemical Process Solution Research Center, KRICT<br>Equipment-to-Process Systems Group</span></div><div class="contact-detail-v13"><div class="contact-row-v13"><small>Email</small><a href="mailto:hsjung@krict.re.kr">hsjung@krict.re.kr</a></div><div class="contact-row-v13"><small>Research Identity</small><span>Technology Translation & Engineering Decision-Making</span></div><div class="contact-row-v13"><small>Location</small><span><span class="lang-ko">한국화학연구원 · 대전</span><span class="lang-en">KRICT · Daejeon, Republic of Korea</span></span></div></div></article><article class="contact-card-v13"><div class="kicker"><span class="lang-ko">연구 및 협력 문의</span><span class="lang-en">Research & Collaboration Inquiry</span></div><h2><span class="lang-ko">명확한 연구질문과 interface가 있는 협력을 환영합니다.</span><span class="lang-en">Collaboration starts with a clear research question and interface.</span></h2><p class="muted"><span class="lang-ko">연구 참여 문의 시 간단한 CV/연구배경, 관심 연구주제와 가능한 시작 시점을 함께 보내주시면 좋습니다. 공동연구 문의에는 대상 기술·장치, 가용 데이터, 필요한 engineering decision을 알려주시면 논의를 빠르게 시작할 수 있습니다.</span><span class="lang-en">For research-position inquiries, a short CV/background, topics of interest and possible start timing are helpful. For collaboration inquiries, please describe the technology/equipment, available evidence and the engineering decision to be addressed.</span></p><div class="contact-links-v13"><a href="mailto:hsjung@krict.re.kr"><span>Email · hsjung@krict.re.kr</span><b>↗</b></a><a href="https://www.linkedin.com/in/han-sol-jung-9278b9273/" target="_blank" rel="noopener"><span>LinkedIn</span><b>↗</b></a><a href="https://www.krict.re.kr/kor/sub02_01_06.do" target="_blank" rel="noopener"><span><span class="lang-ko">KRICT 화학공정솔루션연구센터</span><span class="lang-en">KRICT Chemical Process Solution Research Center</span></span><b>↗</b></a><a href="https://www.krict.re.kr/recruit/hrn/Hrn_0101/01/list" target="_blank" rel="noopener"><span><span class="lang-ko">KRICT 채용정보</span><span class="lang-en">KRICT Recruitment</span></span><b>↗</b></a></div><div class="contact-note-v13"><span class="lang-ko">공식 채용은 한국화학연구원 공고와 기관 절차를 따릅니다. 이 이메일은 연구 적합성, 공동연구 가능성 및 공고 전 사전 문의를 위한 연락처입니다.</span><span class="lang-en">Formal appointments follow KRICT recruitment notices and institutional procedures. The email above is for research-fit, collaboration and pre-announcement inquiries.</span></div></article></div></div>`;
    main.appendChild(contact);
  }

  // Remove the old mixed-purpose JOIN section after extracting its content.
  oldJoin?.remove();

  // Rebind cloned Join Us tabs.
  document.querySelectorAll('#join-page-v13 .op-tab-v11').forEach(btn=>btn.addEventListener('click',()=>{const root=btn.closest('.opportunities-v11');root.querySelectorAll('.op-tab-v11').forEach(b=>b.classList.remove('active'));root.querySelectorAll('.op-panel-v11').forEach(p=>p.classList.remove('active'));btn.classList.add('active');root.querySelector('#'+btn.dataset.optarget)?.classList.add('active')}));

  // Build conventional top navigation with dedicated pages.
  const pages=[
    ['index.html','HOME','홈'],['research.html','RESEARCH','연구'],['people.html','PEOPLE','구성원'],['publications.html','PUBLICATIONS','논문'],['ip.html','IP','IP'],['group.html','GROUP','그룹 운영'],['news.html','NEWS','소식'],['join.html','JOIN US','함께하기'],['contact.html','CONTACT','연락처']
  ];
  const menu=document.querySelector('.menu');
  if(menu){menu.innerHTML=pages.map(([href,en,ko])=>`<a href="${href}"><span class="lang-ko">${ko}</span><span class="lang-en">${en}</span></a>`).join('')}
  const brand=document.querySelector('.brand');if(brand)brand.href='index.html';
  const nav=document.querySelector('.nav');
  if(nav&&!nav.querySelector('.mobile-nav-btn-v13')){const mb=document.createElement('button');mb.type='button';mb.className='mobile-nav-btn-v13';mb.setAttribute('aria-label','Toggle navigation');mb.textContent='≡';nav.insertBefore(mb,menu);mb.addEventListener('click',()=>menu?.classList.toggle('open-v13'));}
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open-v13')));

  // Rewrite old in-page navigation to the appropriate dedicated page.
  const anchorMap={'#top':'index.html','#home':'index.html','#research':'research.html','#research-questions-v12':'research.html','#research-framework-v13':'research.html','#krict-programs':'research.html','#people-detail':'people.html','#publications-detail':'publications.html','#ip-detail':'ip.html','#news-detail':'news.html','#join':'join.html','#join-page-v13':'join.html'};
  document.querySelectorAll('a[href^="#"]').forEach(a=>{const h=a.getAttribute('href');if(anchorMap[h])a.setAttribute('href',anchorMap[h])});

  // True multi-page presentation: each URL shows only its own content.
  const filename=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const current=(filename===''?'index.html':filename);
  const visible={
    'index.html':['home','research-identity-v12','home-directory-v13'],
    'research.html':['research-framework-v13','research','research-questions-v12','krict-programs'],
    'people.html':['people-detail'],
    'publications.html':['publications-detail'],
    'ip.html':['ip-detail'],
    'group.html':['group-page-v13'],
    'news.html':['news-detail'],
    'join.html':['join-page-v13'],
    'contact.html':['contact-page-v13']
  }[current]||['home','research-identity-v12','home-directory-v13'];
  document.querySelectorAll('main > section').forEach(sec=>{if(!visible.includes(sec.id))sec.classList.add('mp-hidden-v13');else sec.classList.remove('mp-hidden-v13')});
  menu?.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active-v13')});

  // Page-specific mastheads and metadata, without duplicating HOME's hero.
  const meta={
    'research.html':['연구','Research','Technology translation from equipment reality to engineering decisions.','Technology translation from equipment reality to engineering decisions.'],
    'people.html':['구성원','People','연구팀, PI, 핵심 협업자와 연구 네트워크','Researchers, PI, key collaborators and the collaboration network.'],
    'publications.html':['논문','Publications','연구 질문의 진화를 보여주는 peer-reviewed publication record','Peer-reviewed publications tracing the evolution of the group’s research questions.'],
    'ip.html':['지식재산','Intellectual Property','원천 아이디어가 공학 시스템으로 구체화되는 기술 전환의 기록','A record of technology translation from original concepts to engineering systems.'],
    'group.html':['그룹 운영','Group Culture','연구지도 원칙, ownership, 연구 품질과 독립성의 운영 모델','Mentoring principles and the operating model for ownership, rigor and research independence.'],
    'news.html':['소식','News & Media','강연, 연구소식과 대외 활동','Talks, research news and external activities.'],
    'join.html':['함께하기','Join Us','KRICT 제도 내 연구자 모집과 공동연구 기회','Research positions and collaboration opportunities through KRICT programs.'],
    'contact.html':['연락처','Contact','연구 참여 및 공동연구 문의','Research-position and collaboration inquiries.']
  }[current];
  if(meta){
    const first=document.querySelector('main > section:not(.mp-hidden-v13)');
    if(first&&first.id!=='home') first.insertAdjacentHTML('beforebegin',`<section class="page-mast-v13" id="page-mast-v13"><div class="shell"><div class="crumb">E2P SYSTEMS GROUP · KRICT</div><div class="kicker"><span class="lang-ko">${meta[0]}</span><span class="lang-en">${meta[1]}</span></div><h1><span class="lang-ko">${meta[0]}</span><span class="lang-en">${meta[1]}</span></h1><p><span class="lang-ko">${meta[2]}</span><span class="lang-en">${meta[3]}</span></p></div></section>`);
    document.title=`${meta[1]} | E2P Systems Group · Han Sol Jung`;
  }else document.title='E2P Systems Group | Han Sol Jung · KRICT';

  window.scrollTo(0,0);
})();