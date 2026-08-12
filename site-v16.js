(async()=>{
  const baseText=await (await fetch('site-v15.js?rev=20260812v16base',{cache:'no-store'})).text();
  const baseRun=(0,eval)(baseText);
  if(baseRun&&typeof baseRun.then==='function') await baseRun;

  const filename=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(filename==='contact.html'){location.replace('join.html#contact');return;}
  if(filename==='news.html'){location.replace('group.html#news');return;}

  const style=document.createElement('style');
  style.textContent=`
    /* v16 information architecture */
    .menu{gap:18px!important}
    .group-tabs-v16,.join-tabs-v16{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 22px}
    .group-tab-v16,.join-tab-v16{appearance:none;border:1px solid var(--line);background:#fff;color:#405969;border-radius:999px;min-height:40px;padding:0 15px;font-size:11px;font-weight:900;cursor:pointer}
    .group-tab-v16.active,.join-tab-v16.active{background:var(--navy);border-color:var(--navy);color:#fff}
    .group-panel-v16{display:none}.group-panel-v16.active{display:block}
    .group-news-v16{padding:6px 0 12px}.group-news-v16 .detail-section{padding:0!important;background:transparent!important}

    /* people / collaborators */
    #strategic-panel .people-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}
    .collab-card-v16{padding:22px!important;min-height:260px;display:flex;flex-direction:column}
    .collab-card-v16 h3{font-size:22px;margin:7px 0 7px}
    .collab-aff-v16{font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:#71838e;font-weight:850;margin-bottom:9px}
    .collab-card-v16 p{font-size:13px!important;line-height:1.62!important;color:var(--muted);margin-bottom:12px}
    .collab-tags-v16{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto;padding-top:4px}
    .collab-tags-v16 span{font-size:9.5px;font-weight:850;color:#356477;background:#f0f7f8;border:1px solid #dcebed;border-radius:999px;padding:5px 7px}
    .collab-role-v16{display:inline-flex;align-self:flex-start;font-size:10px;font-weight:900;color:#276474;background:#edf7f7;border:1px solid #d7e9e9;border-radius:999px;padding:6px 9px}
    .research-collab-list-v16{display:grid;gap:8px}
    .research-collab-v16{padding:10px 11px;border:1px solid #e3ebef;border-radius:12px;background:#fbfdfe}
    .research-collab-v16 b{display:block;color:var(--navy);font-size:12.5px}.research-collab-v16 span{display:block;margin-top:2px;color:#647985;font-size:10.5px;line-height:1.4}

    /* condensed research focus */
    #research .focus-grid{grid-template-columns:repeat(5,1fr)!important}
    #research .focus{min-width:0}
    #research .focus h4{font-size:16px;line-height:1.25}
    #research .focus p{font-size:11.5px;line-height:1.48}
    #research .focus .mini-art{height:92px}
    .focus-method-v16{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}
    .focus-method-v16 span{font-size:8.5px;font-weight:800;color:#527181;background:#f3f8f9;border:1px solid #e0eaed;border-radius:999px;padding:4px 6px}

    /* integrated contact in Join Us */
    #op-contact-v16 .contact-grid-v13{margin-top:2px}
    .join-contact-note-v16{margin:3px 0 17px;color:var(--muted);font-size:12px;line-height:1.55}

    @media(max-width:1180px){#research .focus-grid{grid-template-columns:repeat(3,1fr)!important}}
    @media(max-width:920px){#strategic-panel .people-cards{grid-template-columns:1fr}#research .focus-grid{grid-template-columns:repeat(2,1fr)!important}}
    @media(max-width:560px){#research .focus-grid{grid-template-columns:1fr!important}}
  `;
  document.head.appendChild(style);

  const escapeHtml=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  // 1) Top-level navigation: Contact -> Join Us, News -> Group subtab.
  const topPages=[
    ['index.html','HOME','홈'],['research.html','RESEARCH','연구'],['people.html','PEOPLE','구성원'],['publications.html','PUBLICATIONS','논문'],['ip.html','IP','IP'],['group.html','GROUP','그룹 운영'],['join.html','JOIN US','함께하기']
  ];
  const menu=document.querySelector('.menu');
  if(menu){
    menu.innerHTML=topPages.map(([href,en,ko])=>`<a href="${href}" class="${href===filename?'active-v13':''}"><span class="lang-ko">${ko}</span><span class="lang-en">${en}</span></a>`).join('');
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open-v13')));
  }

  // 2) GROUP page: operating principles + News as sub-tabs.
  const group=document.querySelector('#group-page-v13');
  const news=document.querySelector('#news-detail');
  if(group&&news&&!group.querySelector('.group-tabs-v16')){
    const shell=group.querySelector('.shell');
    const culturePanel=document.createElement('div');culturePanel.id='group-culture-v16';culturePanel.className='group-panel-v16 active';
    [...shell.childNodes].forEach(n=>culturePanel.appendChild(n));
    const newsPanel=document.createElement('div');newsPanel.id='group-news-v16';newsPanel.className='group-panel-v16 group-news-v16';
    const newsShell=news.querySelector('.shell');if(newsShell)newsPanel.append(...[...newsShell.childNodes]);
    news.remove();
    shell.innerHTML='';
    shell.insertAdjacentHTML('beforeend',`<div class="group-tabs-v16"><button class="group-tab-v16 active" data-group-target="group-culture-v16"><span class="lang-ko">운영 원칙</span><span class="lang-en">Operating Principles</span></button><button class="group-tab-v16" data-group-target="group-news-v16"><span class="lang-ko">소식</span><span class="lang-en">News & Activities</span></button></div>`);
    shell.append(culturePanel,newsPanel);
    const activateGroup=id=>{shell.querySelectorAll('.group-tab-v16').forEach(b=>b.classList.toggle('active',b.dataset.groupTarget===id));shell.querySelectorAll('.group-panel-v16').forEach(p=>p.classList.toggle('active',p.id===id));};
    shell.querySelectorAll('.group-tab-v16').forEach(b=>b.addEventListener('click',()=>activateGroup(b.dataset.groupTarget)));
    if(location.hash==='#news')activateGroup('group-news-v16');
  }
  // Research page should no longer carry a separate News snapshot.
  [...document.querySelectorAll('#research .news')].forEach(el=>el.remove());

  // 3) JOIN US page: merge Contact as a third sub-tab.
  const join=document.querySelector('#join-page-v13');
  const contact=document.querySelector('#contact-page-v13');
  if(join&&contact){
    const opp=join.querySelector('.opportunities-v11');
    const tabs=opp?.querySelector('.op-tabs-v11');
    if(opp&&tabs&&!opp.querySelector('#op-contact-v16')){
      const btn=document.createElement('button');btn.className='op-tab-v11';btn.dataset.optarget='op-contact-v16';btn.innerHTML='<span class="lang-ko">연락처</span><span class="lang-en">Contact</span>';
      tabs.appendChild(btn);
      const panel=document.createElement('div');panel.className='op-panel-v11';panel.id='op-contact-v16';
      panel.innerHTML='<div class="join-contact-note-v16"><span class="lang-ko">연구 참여와 공동연구 문의는 아래 연락처로 보내주세요. 공식 채용은 KRICT 공고와 기관 절차를 따릅니다.</span><span class="lang-en">For research-position and collaboration inquiries, please use the contact information below. Formal appointments follow KRICT recruitment procedures.</span></div>';
      const grid=contact.querySelector('.contact-grid-v13');if(grid)panel.appendChild(grid.cloneNode(true));
      opp.appendChild(panel);
      const activateJoin=id=>{opp.querySelectorAll('.op-tab-v11').forEach(b=>b.classList.toggle('active',b.dataset.optarget===id));opp.querySelectorAll('.op-panel-v11').forEach(p=>p.classList.toggle('active',p.id===id));};
      opp.querySelectorAll('.op-tab-v11').forEach(b=>b.addEventListener('click',()=>activateJoin(b.dataset.optarget)));
      if(location.hash==='#contact')activateJoin('op-contact-v16');
    }
    contact.remove();
  }

  // 4) PEOPLE: remove Academic/External tab, keep direct researchers, move Cheon to Key Collaborators.
  document.querySelector('#people-detail [data-tab="academic-panel"]')?.remove();
  document.querySelector('#academic-panel')?.remove();
  const strategicBtn=document.querySelector('#people-detail [data-tab="strategic-panel"]');
  if(strategicBtn)strategicBtn.innerHTML='<span class="lang-ko">핵심 협업자</span><span class="lang-en">Key Collaborators</span>';
  const peopleIntro=document.querySelector('#people-detail .section-title-row p');
  if(peopleIntro)peopleIntro.innerHTML='<span class="lang-ko">PI, 직접 지도 연구자와 핵심 협업자를 역할과 연구 interface에 따라 구분합니다.</span><span class="lang-en">The group is organized around the PI, directly mentored researchers and key collaborators, with roles defined by research interfaces.</span>';

  const researcherCards=[...document.querySelectorAll('#researchers-panel .people-card, #researchers-panel .people-card-real')];
  researcherCards.forEach(card=>{
    const name=card.querySelector('h3')?.textContent.trim()||'';
    if(/Seunghyun Cheon/.test(name)){card.remove();return;}
    if(/Jisoo Kim/.test(name)){
      const role=card.querySelector('.role-pill');if(role)role.innerHTML='<span class="lang-ko">핵심 / 직접 지도 · 공정모델 & 시스템 판단</span><span class="lang-en">Core / Directly mentored · Process Models & System Decisions</span>';
    }
    if(/Soo Won Son/.test(name)){
      const role=card.querySelector('.role-pill');if(role)role.innerHTML='<span class="lang-ko">핵심 / 직접 지도 · 장치물리 & 다중물리</span><span class="lang-en">Core / Directly mentored · Equipment Physics & Multiphysics</span>';
    }
  });

  // Verified/current collaborator framing is intentionally role-focused; current affiliations are stated only where supported.
  const collaborators=[
    {
      name:'Sun Choi', roleKo:'산업 공정전략 · 상용화', roleEn:'Industrial Process Strategy & Commercialization', affKo:'KRICT · 이산화탄소자원화전략연구단장', affEn:'KRICT · Head, CO₂ Resource Utilization Strategic Research Group',
      ko:'약 40년간 석유화학 공정기술 R&D를 수행하고 SK이노베이션과 한화토탈에너지스 연구소장을 역임한 산업 공정기술 전문가입니다. Global TOP의 전략·상용화 관점에서 공정개발, scale-up과 산업 적용 의사결정을 연결합니다.',
      en:'An industrial process-technology leader with roughly four decades of petrochemical R&D experience and former R&D leadership roles at SK Innovation and Hanwha TotalEnergies. He connects Global TOP strategy with process development, scale-up and commercialization decisions.',
      tags:['Industrial process R&D','Commercialization','Scale-up','CCU strategy','Global TOP']
    },
    {
      name:'Gibaek Lee', roleKo:'탄소중립전략', roleEn:'Carbon-Neutral Strategy', affKo:'KRICT · 탄소중립전략센터장', affEn:'KRICT · Director, Carbon Neutrality Strategy Center',
      ko:'탄소자원화·CCU 및 탄소중립 R&D 전략, LCA 기반 전주기 환경성 평가와 감축전략을 수행합니다. Global TOP 5세부 전략 영역에서 환경성·GHG·인증 관점의 판단기준을 연구·기술 전략과 연결합니다.',
      en:'Leads strategy for carbon utilization, CCU and carbon-neutral R&D together with life-cycle environmental assessment. Within Global TOP Subproject 5, he connects environmental/GHG/certification criteria to R&D and technology strategy.',
      tags:['Carbon-neutral strategy','LCA','GHG','Certification','CCU policy']
    },
    {
      name:'Kiwoong Kim, Ph.D.', roleKo:'저탄소 공정 · 반응분리', roleEn:'Low-Carbon Process & Reaction-Separation', affKo:'KRICT · 그린탄소연구센터 책임연구원', affEn:'KRICT · Principal Researcher, Green Carbon Research Center',
      ko:'공정 시스템과 반응분리기술을 기반으로 CO₂ 포집 및 저탄소 화학공정 개발을 수행합니다. Global TOP e-SAF 통합공정 연구에서는 원천기술·반응계와 공정설계·실증 사이의 핵심 협업 interface를 담당합니다.',
      en:'Works on process systems and reaction-separation technologies, including CO₂ capture and low-carbon chemical processes. In Global TOP e-SAF integration, he provides a key interface between source/reaction technologies and process design and demonstration.',
      tags:['Low-carbon process','CO₂ capture','Reaction-separation','Process systems','Scale-up']
    },
    {
      name:'Kyoungrok Kim', roleKo:'공정 상용화 · 플랜트 배치', roleEn:'Process Commercialization & Plant Deployment', affKo:'산업 공정개발 협업', affEn:'Industrial Process Development Collaboration',
      ko:'Group III 윤활기유 공정 등 산업 공정개발·상용화 경험을 바탕으로 process package, 장치·공정 구성과 scale-up 판단을 지원합니다. 수첨분해–탈납–수첨마무리와 같은 실제 refinery process의 상용화 경험이 중요한 협업 자산입니다.',
      en:'Brings industrial process-development and commercialization experience, including Group III lube-base-oil processes, to process-package, configuration and scale-up decisions. His refinery-process background includes hydrocracking, dewaxing and hydrofinishing routes.',
      tags:['Group III base oil','Hydroprocessing','Process package','Commercialization','Plant deployment']
    },
    {
      name:'Dowan Kim, Ph.D.', roleKo:'수첨공정 · 업그레이딩', roleEn:'Hydroprocessing & Upgrading', affKo:'산업 촉매·정유공정 협업', affEn:'Industrial Catalysis & Refinery-Process Collaboration',
      ko:'수첨처리·수첨분해와 연료·윤활기유 업그레이딩 관련 산업 기술개발 경험을 바탕으로 downstream 반응·촉매와 공정 시스템 사이의 판단을 지원합니다. e-SAF 후단 업그레이딩을 포함한 연료공정의 반응·공정 interface에 기여합니다.',
      en:'Brings industrial experience in hydrotreating/hydrocracking and fuel/lube-base-oil upgrading. He supports decisions at the reaction–process interface for downstream fuel processing, including e-SAF upgrading.',
      tags:['Hydroprocessing','Hydrocracking','Fuel upgrading','Refinery process','Downstream']
    },
    {
      name:'Seunghyun Cheon', roleKo:'공정설계 · 최적화', roleEn:'Process Design & Optimization', affKo:'Global TOP e-SAF 공동연구', affEn:'Global TOP e-SAF Collaboration',
      ko:'e-SAF 개념공정 설계, KPI 분석과 flowsheet 최적화를 수행합니다. 공정 대안의 성능을 비교하고 설계·최적화 결과를 통합공정 의사결정으로 연결하는 핵심 협업자입니다.',
      en:'Works on e-SAF conceptual process design, KPI analysis and flowsheet optimization, translating process alternatives and optimization results into integrated-process decisions.',
      tags:['e-SAF','Conceptual design','KPI','Flowsheet','Optimization']
    }
  ];

  const strategic=document.querySelector('#strategic-panel .people-cards');
  if(strategic){
    strategic.innerHTML=collaborators.map(c=>`<article class="people-card collab-card-v16"><span class="collab-role-v16"><span class="lang-ko">${escapeHtml(c.roleKo)}</span><span class="lang-en">${escapeHtml(c.roleEn)}</span></span><h3>${escapeHtml(c.name)}</h3><div class="collab-aff-v16"><span class="lang-ko">${escapeHtml(c.affKo)}</span><span class="lang-en">${escapeHtml(c.affEn)}</span></div><p><span class="lang-ko">${escapeHtml(c.ko)}</span><span class="lang-en">${escapeHtml(c.en)}</span></p><div class="collab-tags-v16">${c.tags.map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div></article>`).join('');
  }

  // 5) Research-page collaborator summary: same roles/order, compact format.
  const programBoxes=[...document.querySelectorAll('#research .programs')];
  const collabSummary=programBoxes.find(x=>/핵심 협업자|Key collaborators/i.test(x.textContent));
  if(collabSummary){
    const title=collabSummary.querySelector('.section-title-row');
    if(title)title.innerHTML='<div><div class="kicker"><span class="lang-ko">핵심 협업자</span><span class="lang-en">Key Collaborators</span></div><h3><span class="lang-ko">전략·원천기술·상용화 interface</span><span class="lang-en">Strategy, source-technology & commercialization interfaces</span></h3></div><a href="people.html"><span class="lang-ko">People →</span><span class="lang-en">People →</span></a>';
    let list=collabSummary.querySelector('.research-collab-list-v16');
    const old=title?.nextElementSibling;
    if(old&&!old.classList.contains('research-collab-list-v16'))old.remove();
    if(!list){list=document.createElement('div');list.className='research-collab-list-v16';collabSummary.appendChild(list)}
    const short=[
      ['Sun Choi','산업 공정전략 · 상용화 · scale-up','Industrial process strategy · commercialization · scale-up'],
      ['Gibaek Lee','탄소중립전략 · LCA/GHG · 인증','Carbon-neutral strategy · LCA/GHG · certification'],
      ['Kiwoong Kim','저탄소 공정 · CO₂ 포집 · 반응분리','Low-carbon process · CO₂ capture · reaction-separation'],
      ['Kyoungrok Kim','Group III base oil · 공정 상용화 · 플랜트 배치','Group III base oil · commercialization · plant deployment'],
      ['Dowan Kim','수첨공정 · hydrocracking · downstream upgrading','Hydroprocessing · hydrocracking · downstream upgrading'],
      ['Seunghyun Cheon','e-SAF 공정설계 · KPI · 최적화','e-SAF process design · KPI · optimization']
    ];
    list.innerHTML=short.map(x=>`<div class="research-collab-v16"><b>${x[0]}</b><span><span class="lang-ko">${x[1]}</span><span class="lang-en">${x[2]}</span></span></div>`).join('');
  }

  // Remove the institutional-logo network block from Research; collaborations are represented by people/interfaces instead.
  [...document.querySelectorAll('#research .collab')].forEach(el=>{if(/연구 네트워크|Research network|Current collaboration interfaces/i.test(el.textContent))el.remove()});

  // 6) Research focus: five broad, identity-consistent areas.
  const focusGrid=document.querySelector('#research .focus-grid');
  if(focusGrid){
    focusGrid.innerHTML=`
      <div class="focus"><div class="focus-num">01</div><h4><span class="lang-ko">장치–공정 시스템 모델링</span><span class="lang-en">Equipment–Process Systems Modeling</span></h4><p><span class="lang-ko">장치 물리, 성능맵과 엔지니어링 문서를 reduced/gray-box model 및 공정 시뮬레이션으로 연결합니다.</span><span class="lang-en">Translate equipment physics, performance maps and engineering documents into reduced/gray-box and process models.</span></p><div class="mini-art"><svg viewBox="0 0 170 100"><rect x="14" y="22" width="40" height="24" rx="5" fill="#dce9f4" stroke="#779dc2"/><rect x="14" y="58" width="40" height="24" rx="5" fill="#dce9f4" stroke="#779dc2"/><rect x="110" y="40" width="46" height="28" rx="6" fill="#dff0ec" stroke="#14a0a3"/><path d="M54 34H82V54H110M54 70H82V54" fill="none" stroke="#4d8fca" stroke-width="2.4"/><circle cx="82" cy="54" r="4" fill="#14a0a3"/></svg></div><div class="focus-method-v16"><span>Equipment map</span><span>ROM / gray-box</span><span>Aspen / HYSYS</span></div></div>
      <div class="focus"><div class="focus-num">02</div><h4><span class="lang-ko">동적 운전 해석</span><span class="lang-en">Dynamic Operation Analysis</span></h4><p><span class="lang-ko">부분부하, 기동·정지, 변동 원료·전원과 열화 조건에서 동특성, operability와 feasible operating envelope를 해석합니다.</span><span class="lang-en">Analyze dynamics, operability and feasible operating envelopes under part load, transitions, variable feeds/power and degradation.</span></p><div class="mini-art"><svg viewBox="0 0 170 100"><path d="M10 72 C28 62,34 38,52 46 S79 80,96 54 126 24,160 42" fill="none" stroke="#ef6192" stroke-width="2.5"/><path d="M10 65 C33 68,48 58,66 61 93 65,112 45,160 50" fill="none" stroke="#69b3d7" stroke-width="2.2"/><line x1="10" y1="82" x2="162" y2="82" stroke="#b2c4cf"/></svg></div><div class="focus-method-v16"><span>Dynamics</span><span>Part load</span><span>Startup / shutdown</span></div></div>
      <div class="focus"><div class="focus-num">03</div><h4><span class="lang-ko">최적화와 데이터 기반 의사결정</span><span class="lang-en">Optimization & Data-informed Decisions</span></h4><p><span class="lang-ko">물리·하이브리드 모델, 운전데이터와 AI/ML을 model update, 성능예측 및 다목적 최적화에 활용하여 실제 설계·운전 판단을 지원합니다.</span><span class="lang-en">Use physics/hybrid models, operating data and AI/ML for model update, performance prediction and multi-objective engineering decisions.</span></p><div class="mini-art"><svg viewBox="0 0 170 100"><circle cx="30" cy="28" r="5" fill="#7fd18e"/><circle cx="30" cy="50" r="5" fill="#7fd18e"/><circle cx="30" cy="72" r="5" fill="#7fd18e"/><circle cx="75" cy="34" r="5" fill="#73b0ff"/><circle cx="75" cy="66" r="5" fill="#73b0ff"/><path d="M35 28L70 34M35 50L70 34M35 50L70 66M35 72L70 66" stroke="#9fb7c5"/><polygon points="108,70 132,25 157,58 135,76" fill="#dfeaff" stroke="#5f95cc"/><circle cx="132" cy="25" r="4" fill="#14a0a3"/></svg></div><div class="focus-method-v16"><span>Hybrid model</span><span>AI / ML</span><span>Optimization</span></div></div>
      <div class="focus"><div class="focus-num">04</div><h4><span class="lang-ko">환경·경제성 및 기술평가</span><span class="lang-en">Environmental & Techno-Economic Assessment</span></h4><p><span class="lang-ko">LCA, TEA, CAPEX/OPEX, GHG 감축량과 기술성숙도·불확실성을 함께 평가하여 기술선택과 scale-up 판단의 근거를 만듭니다.</span><span class="lang-en">Integrate LCA, TEA, CAPEX/OPEX, GHG reduction, readiness and uncertainty to support technology selection and scale-up.</span></p><div class="mini-art"><svg viewBox="0 0 170 100"><circle cx="52" cy="50" r="27" fill="none" stroke="#4cae45" stroke-width="2.5"/><text x="52" y="54" text-anchor="middle" fill="#4cae45" font-weight="900" font-size="13">LCA</text><circle cx="118" cy="50" r="27" fill="none" stroke="#5688b7" stroke-width="2.5"/><text x="118" y="54" text-anchor="middle" fill="#5688b7" font-weight="900" font-size="13">TEA</text><path d="M79 50H91" stroke="#14a0a3" stroke-width="3"/></svg></div><div class="focus-method-v16"><span>LCA / GHG</span><span>TEA</span><span>CAPEX / OPEX</span></div></div>
      <div class="focus"><div class="focus-num">05</div><h4><span class="lang-ko">공정통합·스케일업·실증</span><span class="lang-en">Process Integration, Scale-up & Demonstration</span></h4><p><span class="lang-ko">e-SAF, e-CCU, 메탄올, FDCA, 수소·수전해 등을 testbed로 사용하여 원천기술을 end-to-end 공정 시스템과 실증·배치 의사결정으로 번역합니다.</span><span class="lang-en">Use e-SAF, e-CCU, methanol, FDCA and H₂/electrolysis as testbeds for end-to-end integration, demonstration and deployment decisions.</span></p><div class="mini-art"><svg viewBox="0 0 170 100"><rect x="12" y="54" width="25" height="28" rx="4" fill="#dce9f4" stroke="#779dc2"/><rect x="50" y="35" width="25" height="47" rx="4" fill="#dce9f4" stroke="#779dc2"/><rect x="88" y="45" width="25" height="37" rx="4" fill="#dce9f4" stroke="#779dc2"/><rect x="126" y="25" width="28" height="57" rx="4" fill="#dff0ec" stroke="#14a0a3"/><path d="M37 68H50M75 58H88M113 63H126" stroke="#4d8fca" stroke-width="2.5"/></svg></div><div class="focus-method-v16"><span>Integration</span><span>Scale-up</span><span>Demo data</span></div></div>`;
  }

  // Remove obsolete research-network wording anywhere else on Research.
  [...document.querySelectorAll('#research *')].forEach(el=>{if(el.children.length===0&&/Current collaboration interfaces|현재 공동연구 인터페이스|현재 협업 인터페이스/.test(el.textContent))el.closest('.collab')?.remove()});

  // Keep research summary aligned with the new five-area structure.
  const researchH2=document.querySelector('#research .section-title-row h2');
  if(researchH2)researchH2.innerHTML='<span class="lang-ko">다섯 개의 핵심 연구 영역</span><span class="lang-en">Five core research areas</span>';

  // Remove old standalone links to News/Contact from any residual navigation or cards.
  document.querySelectorAll('a[href="news.html"]').forEach(a=>a.setAttribute('href','group.html#news'));
  document.querySelectorAll('a[href="contact.html"]').forEach(a=>a.setAttribute('href','join.html#contact'));

  // Page metadata after merged information architecture.
  if(filename==='group.html')document.title='Group Culture & News | E2P Systems Group · Han Sol Jung';
  if(filename==='join.html')document.title='Join Us & Contact | E2P Systems Group · Han Sol Jung';
})();