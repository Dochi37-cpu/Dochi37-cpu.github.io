(async()=>{
  const baseText=await (await fetch('site-v16.js?rev=20260812v17base',{cache:'no-store'})).text();
  const baseRun=(0,eval)(baseText);
  if(baseRun&&typeof baseRun.then==='function') await baseRun;

  const filename=(location.pathname.split('/').pop()||'index.html').toLowerCase();

  const style=document.createElement('style');
  style.textContent=`
    .brand-logo-v17{width:168px;height:auto;display:block}.brand-text-v17{display:none!important}
    .collab-card-v16 .collab-aff-v16{font-size:10.5px}.collab-link-v17{display:inline-flex;margin-top:9px;font-size:10px;font-weight:850;color:var(--teal);text-decoration:none}.collab-link-v17:hover{text-decoration:underline}
    .ip-unpublished-v17{background:#fff9eb!important}.ip-stage.confidential-v17{background:#fff3c8;color:#8a6515}.ip-note-v17{font-size:10px;color:#7a6a3e;margin-top:4px}
  `;
  document.head.appendChild(style);

  // Logo in header.
  const brand=document.querySelector('.brand');
  if(brand){
    brand.innerHTML='<img class="brand-logo-v17" src="assets/e2p-logo.svg" alt="E2P Systems Group">';
    brand.href='index.html';
  }

  // Remove entrepreneurship / startup-history material from People page.
  document.querySelectorAll('.venture-section-v11').forEach(el=>el.remove());
  [...document.querySelectorAll('#people-detail *')].forEach(el=>{
    if(el.children.length===0&&/Entrepreneurship|창업|SucSeed|AVALVE/i.test(el.textContent||'')){
      const parent=el.closest('.professional-card,.white-card,.bio-block');
      if(parent&&/Entrepreneurship|창업|SucSeed|AVALVE/i.test(parent.textContent||''))parent.remove();
    }
  });

  // Rebuild key collaborators with corrected KRICT / Global TOP affiliations.
  const collaborators=[
    {
      name:'Sun Choi', roleKo:'산업 공정전략 · 상용화', roleEn:'Industrial Process Strategy & Commercialization',
      affKo:'KRICT · Global TOP 5세부', affEn:'KRICT · Global TOP Subproject 5',
      ko:'석유화학 공정기술 R&D와 산업 연구조직 리더십 경험을 바탕으로 Global TOP 전략·상용화 관점에서 공정개발, scale-up과 산업 적용 의사결정을 연결합니다.',
      en:'Brings long-standing petrochemical process R&D and industrial research-leadership experience to Global TOP, connecting process development, scale-up and commercialization decisions.',
      tags:['Global TOP 5','Industrial process R&D','Commercialization','Scale-up','CCU strategy']
    },
    {
      name:'Gibaek Lee', roleKo:'탄소중립전략', roleEn:'Carbon-Neutral Strategy',
      affKo:'KRICT · 탄소중립전략센터장 · Global TOP 5세부', affEn:'KRICT · Director, Carbon Neutrality Strategy Center · Global TOP Subproject 5',
      ko:'탄소자원화·CCU 및 탄소중립 R&D 전략, LCA 기반 전주기 환경성 평가와 GHG 감축전략을 수행합니다. Global TOP 5세부에서 환경성·인증·감축전략을 기술전략과 연결합니다.',
      en:'Leads carbon-utilization and carbon-neutral R&D strategy together with life-cycle environmental assessment and GHG-reduction methodology, linking environmental and certification criteria to Global TOP technology strategy.',
      tags:['Global TOP 5','Carbon-neutral strategy','LCA','GHG','Certification']
    },
    {
      name:'Kiwoong Kim, Ph.D.', roleKo:'저탄소 공정 · 반응분리', roleEn:'Low-Carbon Process & Reaction-Separation',
      affKo:'KRICT · 그린탄소연구센터 · Global TOP 5세부', affEn:'KRICT · Green Carbon Research Center · Global TOP Subproject 5',
      ko:'공정 시스템과 반응분리기술을 기반으로 CO₂ 포집 및 저탄소 화학공정 개발을 수행합니다. Global TOP e-SAF 통합공정 연구에서는 원천기술·반응계와 공정설계·실증 사이의 핵심 interface를 담당합니다.',
      en:'Works on process systems and reaction-separation technologies, including CO₂ capture and low-carbon chemical processes. In Global TOP e-SAF integration, he provides a key interface between source/reaction technologies and process design and demonstration.',
      tags:['Global TOP 5','Low-carbon process','CO₂ capture','Reaction-separation','Process systems']
    },
    {
      name:'Kyoungrok Kim', roleKo:'공정 상용화 · 플랜트 배치', roleEn:'Process Commercialization & Plant Deployment',
      affKo:'KRICT · SK 출신 · Global TOP 5세부', affEn:'KRICT · Former SK · Global TOP Subproject 5',
      ko:'SK에서의 산업 공정개발·상용화 경험을 바탕으로 process package, 공정 구성과 scale-up 판단을 지원합니다. Group III 윤활기유 및 refinery hydroprocessing 경험은 실제 플랜트 상용화 관점의 핵심 협업 자산입니다.',
      en:'Brings industrial process-development and commercialization experience from SK to process-package, configuration and scale-up decisions. His Group III lube-base-oil and refinery hydroprocessing background adds a plant-commercialization perspective.',
      tags:['Global TOP 5','Former SK','Group III base oil','Hydroprocessing','Commercialization'],
      url:'https://koreascientists.kr/prizes/scientists/yearly/?boardId=bbs_0000000000000046&mode=view&cntId=2224&category=&pageIdx=1198'
    },
    {
      name:'Dowan Kim, Ph.D.', roleKo:'수첨공정 · 업그레이딩', roleEn:'Hydroprocessing & Upgrading',
      affKo:'KRICT · SK 출신 · Global TOP 5세부', affEn:'KRICT · Former SK · Global TOP Subproject 5',
      ko:'SK에서의 정유·촉매 공정기술 경험을 바탕으로 수첨처리·수첨분해와 연료·윤활기유 업그레이딩 영역을 지원합니다. e-SAF 후단 업그레이딩을 포함한 downstream 반응·공정 interface에 기여합니다.',
      en:'Brings SK refinery/catalysis process experience in hydrotreating, hydrocracking and fuel/lube-base-oil upgrading, supporting downstream reaction–process interfaces including e-SAF upgrading.',
      tags:['Global TOP 5','Former SK','Hydroprocessing','Hydrocracking','Fuel upgrading'],
      url:'https://www.linkedin.com/in/%EA%B9%80%EB%8F%84%EC%99%84-dowoan-kim-a2564946/'
    },
    {
      name:'Seunghyun Cheon', roleKo:'공정설계 · 최적화', roleEn:'Process Design & Optimization',
      affKo:'KRICT · 석사후연구원 · Global TOP 5세부', affEn:'KRICT · Post-master Researcher · Global TOP Subproject 5',
      ko:'e-SAF 개념공정 설계, KPI 분석과 flowsheet 최적화를 수행합니다. 공정 대안의 성능을 비교하고 설계·최적화 결과를 통합공정 의사결정으로 연결합니다.',
      en:'Works on e-SAF conceptual process design, KPI analysis and flowsheet optimization, translating process alternatives and optimization results into integrated-process decisions.',
      tags:['Global TOP 5','Post-master Researcher','e-SAF','KPI','Optimization']
    },
    {
      name:'Seungjun Baek, Ph.D.', roleKo:'반응기 설계 · 다중물리', roleEn:'Reactor Design & Multiphysics',
      affKo:'KRICT · 화학공정솔루션연구센터 · Global TOP 1세부', affEn:'KRICT · Chemical Process Solution Research Center · Global TOP Subproject 1',
      ko:'반응기 설계와 다중물리 해석을 중심으로 Global TOP 1세부의 반응기 개발을 수행합니다. E2P 연구에서는 고해상도 반응기·장치 결과를 공정 수준 모델과 scale-up 판단으로 연결하는 핵심 협업자입니다.',
      en:'Works on reactor design and multiphysics within Global TOP Subproject 1. For E2P, he provides the high-fidelity reactor/equipment side of the interface needed for process-level modeling and scale-up decisions.',
      tags:['Global TOP 1','Reactor design','Multiphysics','Scale-up','Equipment–process interface']
    },
    {
      name:'Kyungmin Lee, Ph.D.', roleKo:'디지털 트윈 · 동적 실증', roleEn:'Digital Twin & Dynamic Demonstration',
      affKo:'KRICT · 화학공정솔루션연구센터 · KRICT 기본사업', affEn:'KRICT · Chemical Process Solution Research Center · KRICT Basic Program',
      ko:'KRICT 기본사업에서 디지털 전환 기반 탄소중립 화학공정 실증과 동적 모델링을 함께 수행합니다. Physical Twin–Digital Twin 연계와 실증 데이터 기반 model update의 핵심 협업 interface입니다.',
      en:'Collaborates on the KRICT basic program for DX-enabled carbon-neutral process demonstration, with interfaces in dynamic modeling, Physical Twin–Digital Twin integration and demonstration-data-driven model update.',
      tags:['KRICT Basic Program','Digital twin','Dynamic model','Demonstration','Model update']
    },
    {
      name:'Yongtae Kim, Ph.D.', roleKo:'Global TOP 1세부 총괄 · 원천기술', roleEn:'Global TOP Subproject 1 Lead · Source Technology',
      affKo:'KRICT · CO₂에너지연구센터 · Global TOP 1세부 총괄', affEn:'KRICT · CO₂ Energy Research Center · Lead, Global TOP Subproject 1',
      ko:'Global TOP 1세부 총괄 책임자로 CO₂ 전환 원천기술과 반응기 개발을 총괄합니다. E2P 연구그룹에는 원천기술 성능·반응계 요구사항을 제공하고, 이를 실제 공정과 실증 시스템으로 번역하는 상위 협업 interface를 형성합니다.',
      en:'Leads Global TOP Subproject 1 on CO₂-conversion source technologies and reactor development. He provides the upstream source-technology and reaction-system interface that E2P translates into process and demonstration systems.',
      tags:['Global TOP 1 Lead','CO₂ conversion','Source technology','Reactor program','Technology translation']
    },
    {
      name:'Joongjin Han, Ph.D.', roleKo:'실증 · 스케일업', roleEn:'Demonstration & Scale-up',
      affKo:'KRICT · 탄소중립화학공정실증센터장 · Global TOP 5세부', affEn:'KRICT · Director, Carbon-Neutral Chemical Process Demonstration Center · Global TOP Subproject 5',
      ko:'탄소중립 화학공정의 실증 인프라와 scale-up을 담당합니다. Global TOP 5세부에서 2단계 실증이 본격화될수록 공정 모델, 장치 데이터와 실증 운전 사이를 연결하는 핵심 협업 역할이 커집니다.',
      en:'Leads demonstration infrastructure and scale-up for carbon-neutral chemical processes. His role becomes increasingly central in Global TOP Phase 2, connecting process models and equipment data with demonstration operation.',
      tags:['Global TOP 5','Demonstration','Scale-up','Pilot / plant data','Phase 2']
    }
  ];

  const strategic=document.querySelector('#strategic-panel .people-cards');
  if(strategic){
    strategic.innerHTML=collaborators.map(c=>`<article class="people-card collab-card-v16"><span class="collab-role-v16"><span class="lang-ko">${c.roleKo}</span><span class="lang-en">${c.roleEn}</span></span><h3>${c.name}</h3><div class="collab-aff-v16"><span class="lang-ko">${c.affKo}</span><span class="lang-en">${c.affEn}</span></div><p><span class="lang-ko">${c.ko}</span><span class="lang-en">${c.en}</span></p><div class="collab-tags-v16">${c.tags.map(t=>`<span>${t}</span>`).join('')}</div>${c.url?`<a class="collab-link-v17" href="${c.url}" target="_blank" rel="noopener">Profile / source ↗</a>`:''}</article>`).join('');
  }

  // Research compact collaborator summary mirrors the corrected affiliations.
  const programBoxes=[...document.querySelectorAll('#research .programs')];
  const collabSummary=programBoxes.find(x=>/핵심 협업자|Key collaborators/i.test(x.textContent));
  if(collabSummary){
    const list=collabSummary.querySelector('.research-collab-list-v16');
    if(list){
      const short=[
        ['Sun Choi','KRICT · Global TOP 5 · 산업 공정전략/상용화','KRICT · Global TOP 5 · industrial process strategy/commercialization'],
        ['Gibaek Lee','KRICT · Global TOP 5 · 탄소중립전략/LCA/GHG/인증','KRICT · Global TOP 5 · carbon-neutral strategy/LCA/GHG/certification'],
        ['Kiwoong Kim','KRICT · Global TOP 5 · 저탄소 공정/반응분리','KRICT · Global TOP 5 · low-carbon process/reaction-separation'],
        ['Kyoungrok Kim','KRICT · SK 출신 · Global TOP 5 · 공정 상용화','KRICT · Former SK · Global TOP 5 · commercialization'],
        ['Dowan Kim','KRICT · SK 출신 · Global TOP 5 · 수첨공정/업그레이딩','KRICT · Former SK · Global TOP 5 · hydroprocessing/upgrading'],
        ['Seunghyun Cheon','KRICT · 석사후연구원 · Global TOP 5 · e-SAF 설계/최적화','KRICT · Post-master Researcher · Global TOP 5 · e-SAF design/optimization'],
        ['Seungjun Baek','KRICT · Global TOP 1 · 반응기 설계/다중물리','KRICT · Global TOP 1 · reactor design/multiphysics'],
        ['Kyungmin Lee','KRICT 기본사업 · 디지털 트윈/동적 실증','KRICT Basic Program · digital twin/dynamic demonstration'],
        ['Yongtae Kim','KRICT · Global TOP 1 총괄 · CO₂ 원천기술','KRICT · Lead, Global TOP 1 · CO₂ source technology'],
        ['Joongjin Han','KRICT · Global TOP 5 · 실증/scale-up','KRICT · Global TOP 5 · demonstration/scale-up']
      ];
      list.innerHTML=short.map(x=>`<div class="research-collab-v16"><b>${x[0]}</b><span><span class="lang-ko">${x[1]}</span><span class="lang-en">${x[2]}</span></span></div>`).join('');
    }
  }

  // Add the unpublished KRICT patent application provided by the PI.
  const tbody=document.querySelector('#ip-registry-panel tbody');
  if(tbody&&!tbody.querySelector('[data-ip-v17="cesium"]')){
    const tr=document.createElement('tr');
    tr.className='ip-unpublished-v17';tr.dataset.ipdomain='functional';tr.dataset.ipV17='cesium';
    tr.innerHTML=`<td>24</td><td><div class="pubno">10-2026-0101862</div></td><td><span class="lang-ko">바이폴라막 전기투석 장치를 이용한 세슘의 선택적 회수방법</span><span class="lang-en">Selective cesium recovery using a bipolar-membrane electrodialysis device</span></td><td><span class="ip-stage confidential-v17"><span class="lang-ko">출원 · 비공개</span><span class="lang-en">Filed · Unpublished</span></span></td><td><div class="ip-domain"><span class="lang-ko">분리 / 전기화학 시스템</span><span class="lang-en">Separation / Electrochemical Systems</span></div></td><td><div class="ip-note-mini"><span class="lang-ko">KRICT 출원 · 공개 전 단계</span><span class="lang-en">KRICT filing · pre-publication stage</span></div><div class="ip-note-v17"><span class="lang-ko">※ PI가 제공한 출원정보를 기준으로 표기</span><span class="lang-en">※ Listed from filing information provided by the PI</span></div></td>`;
    tbody.appendChild(tr);
  }
  // Update registry headline metric from 23 to 24 while preserving other metrics.
  document.querySelectorAll('#ip-detail .ip-stat b,#ip-detail .ip-metric b').forEach(b=>{if(b.textContent.trim()==='23')b.textContent='24'});
  document.querySelectorAll('.hero-stats .stat b,.pi-metric b,.impact-card b').forEach(b=>{if(b.textContent.trim()==='23')b.textContent='24'});
  [...document.querySelectorAll('#ip-detail *')].forEach(el=>{if(el.children.length===0&&/portfolio count 23|국내 특허 기록 23|23개/.test(el.textContent||''))el.textContent=(el.textContent||'').replace(/23/g,'24')});

  if(filename==='people.html')document.title='People | E2P Systems Group · KRICT';
  if(filename==='ip.html')document.title='IP | E2P Systems Group · KRICT';
})();