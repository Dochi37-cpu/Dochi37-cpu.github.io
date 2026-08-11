(async()=>{
  const baseText=await (await fetch('site-v9.js?rev=20260811v10base',{cache:'no-store'})).text();
  const baseRun=(0,eval)(baseText);
  if(baseRun&&typeof baseRun.then==='function') await baseRun;

  const style=document.createElement('style');
  style.textContent=`
  .method-step{position:relative;transition:.2s ease}
  .method-step.interface-step{opacity:.64;border-style:dashed}
  .method-step.core-focus{border:2px solid rgba(126,224,216,.82)!important;background:linear-gradient(145deg,rgba(126,224,216,.12),rgba(255,255,255,.07))!important;box-shadow:0 0 0 1px rgba(153,217,57,.18),0 10px 24px rgba(0,0,0,.12)}
  .method-step.core-focus:before{content:'CORE';position:absolute;right:9px;top:8px;font-size:7.5px;letter-spacing:.11em;font-weight:950;color:#082c43;background:#8be5dc;border-radius:999px;padding:3px 6px}
  .principle .picon{background:linear-gradient(145deg,rgba(126,224,216,.16),rgba(153,217,57,.08));overflow:hidden}
  .principle .picon svg{width:22px;height:22px;stroke:#91ebe3;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
  .hero-philosophy{background:linear-gradient(150deg,rgba(255,255,255,.09),rgba(255,255,255,.045))!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 22px 60px rgba(0,0,0,.12)}
  .hero-philosophy svg{filter:drop-shadow(0 18px 30px rgba(0,0,0,.10))}
  .institution-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-top:12px}
  .inst-logo-card{display:flex;align-items:center;gap:12px;min-height:82px;padding:12px 14px;border:1px solid var(--line);border-radius:15px;background:linear-gradient(145deg,#fff,#f7fafc)}
  .inst-mark{width:50px;height:50px;flex:0 0 50px;border-radius:14px;display:grid;place-items:center;font-size:13px;font-weight:950;letter-spacing:-.04em;color:#fff;box-shadow:0 6px 16px rgba(12,35,64,.10)}
  .inst-mark.krict{background:linear-gradient(145deg,#147da2,#14a0a3)}.inst-mark.kmou{background:linear-gradient(145deg,#063f7b,#2871ac)}.inst-mark.sook{background:linear-gradient(145deg,#283f8f,#6654b5)}.inst-mark.uos{background:linear-gradient(145deg,#166447,#31966a)}.inst-mark.postech{background:linear-gradient(145deg,#a93434,#da5959)}.inst-mark.jnu{background:linear-gradient(145deg,#1d5a91,#488abb)}
  .inst-logo-card b{display:block;font-size:13px;color:var(--navy);line-height:1.25}.inst-logo-card span{display:block;font-size:10.5px;color:var(--muted);line-height:1.35;margin-top:3px}
  .professional-activities{display:grid;grid-template-columns:1fr 1.22fr;gap:16px}
  .professional-card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:22px}
  .professional-card h4{font-size:18px;color:var(--navy);margin-bottom:12px}.service-item,.talk-item{padding:11px 0;border-bottom:1px solid #edf2f4}.service-item:last-child,.talk-item:last-child{border-bottom:0}.service-item b,.talk-item b{display:block;font-size:14px;line-height:1.35}.service-item span,.talk-item span{display:block;font-size:12px;color:var(--muted);line-height:1.45;margin-top:3px}.talk-meta{font-size:9.5px!important;color:var(--teal)!important;font-weight:900;letter-spacing:.07em;text-transform:uppercase;margin-bottom:3px!important}.member-tags{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.member-tag{font-size:10px;font-weight:850;color:#355a6f;background:#f1f7f8;border:1px solid #dcebed;border-radius:999px;padding:6px 8px}
  .ownership-mini{display:grid;grid-template-columns:1fr 1fr;gap:14px}.ownership-group{padding:17px;border:1px solid var(--line);border-radius:15px;background:#fbfdfe}.ownership-group h4{margin:0 0 10px;font-size:16px}.ownership-person{padding:9px 0;border-bottom:1px solid #e7eef2;font-size:13px;color:#435866}.ownership-person:last-child{border-bottom:0}.ownership-person b{display:block;color:var(--navy);font-size:14px}.ownership-person span{display:block;color:var(--muted);font-size:11px;margin-top:2px}.ownership-note{margin-top:12px;padding:10px 12px;border-radius:11px;background:#f1f8f8;border-left:3px solid var(--teal);font-size:11px;color:#587080}
  @media(max-width:900px){.institution-grid,.professional-activities,.ownership-mini{grid-template-columns:1fr 1fr}}
  @media(max-width:600px){.institution-grid,.professional-activities,.ownership-mini{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  // 1. Publication metric: keep the neutral peer-reviewed label only.
  const firstHeroStat=document.querySelector('.hero-stats .stat:nth-child(1) span');
  if(firstHeroStat) firstHeroStat.innerHTML='<span class="lang-ko">Peer-reviewed 논문</span><span class="lang-en">Peer-reviewed papers</span>';

  // 2. Translation framework: source technology is an interface; equipment-to-decision is the current core.
  const methodSteps=[...document.querySelectorAll('.methodology-grid .method-step')];
  methodSteps.forEach((step,i)=>step.classList.add(i===0?'interface-step':'core-focus'));

  // 3. Replace unexplained E/V/A/D initials with self-explanatory visual icons.
  const icons=[
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/><path d="M4 4.5h13M4 20h16"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4"/></svg>',
    '<svg viewBox="0 0 24 24"><path d="M4 18V7h8M12 7l-3-3M12 7L9 10M8 18h12M17 15l3 3-3 3"/></svg>'
  ];
  document.querySelectorAll('.principle .picon').forEach((el,i)=>{if(icons[i])el.innerHTML=icons[i]});

  // 4. Redesign the philosophy visual for readability and a stronger decision-oriented story.
  const philosophySvg=document.querySelector('.hero-philosophy svg');
  if(philosophySvg){
    philosophySvg.setAttribute('viewBox','0 0 820 520');
    philosophySvg.innerHTML=`<defs>
      <linearGradient id="coreStroke" x1="0" x2="1"><stop offset="0" stop-color="#7ee0d8"/><stop offset="1" stop-color="#99d939"/></linearGradient>
      <linearGradient id="coreFill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#194e70"/><stop offset="1" stop-color="#143655"/></linearGradient>
      <filter id="softGlow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#78dcd5"/></marker>
    </defs>
    <rect x="34" y="30" width="752" height="454" rx="28" fill="rgba(6,29,52,.22)" stroke="rgba(255,255,255,.10)"/>
    <g opacity=".16" stroke="#b8dce5" stroke-width="1"><path d="M60 100H760M60 180H760M60 260H760M60 340H760M60 420H760"/><path d="M120 55V465M250 55V465M380 55V465M510 55V465M640 55V465"/></g>
    <rect x="180" y="55" width="460" height="66" rx="22" fill="rgba(8,34,61,.88)" stroke="url(#coreStroke)" stroke-width="2.5" filter="url(#softGlow)"/>
    <text x="410" y="82" text-anchor="middle" fill="#86e7df" font-size="13" font-weight="900" letter-spacing="2">EQUIPMENT-TO-PROCESS SYSTEMS</text>
    <text x="410" y="106" text-anchor="middle" fill="#fff" font-size="21" font-weight="900">Equipment-aware Process Systems</text>

    <g transform="translate(58,158)"><rect width="158" height="160" rx="22" fill="url(#coreFill)" stroke="#81d9d4" stroke-width="2"/><circle cx="30" cy="31" r="15" fill="rgba(126,224,216,.16)" stroke="#7ee0d8"/><path d="M24 31h12M30 25v12" stroke="#8be9e1" stroke-width="2"/><text x="54" y="29" fill="#86e7df" font-size="10" font-weight="900">01</text><text x="79" y="65" text-anchor="middle" fill="#fff" font-size="17" font-weight="900" class="lang-ko">장치 현실</text><text x="79" y="65" text-anchor="middle" fill="#fff" font-size="15" font-weight="900" class="lang-en">Equipment Reality</text><text x="79" y="91" text-anchor="middle" fill="#cde2ea" font-size="10.5">performance map</text><text x="79" y="110" text-anchor="middle" fill="#cde2ea" font-size="10.5">transport · non-ideality</text><text x="79" y="129" text-anchor="middle" fill="#cde2ea" font-size="10.5">operating constraints</text></g>
    <path d="M221 238H252" stroke="#79dcd5" stroke-width="3" marker-end="url(#arr)"/>
    <g transform="translate(256,158)"><rect width="158" height="160" rx="22" fill="url(#coreFill)" stroke="#88e4dc" stroke-width="2.8"/><circle cx="30" cy="31" r="15" fill="rgba(126,224,216,.18)" stroke="#7ee0d8"/><path d="M22 35c4-9 12-9 16 0M23 28h14" stroke="#8be9e1" stroke-width="2" fill="none"/><text x="54" y="29" fill="#86e7df" font-size="10" font-weight="900">02</text><text x="79" y="65" text-anchor="middle" fill="#fff" font-size="17" font-weight="900" class="lang-ko">공정 시스템 모델</text><text x="79" y="65" text-anchor="middle" fill="#fff" font-size="14" font-weight="900" class="lang-en">Process System Model</text><text x="79" y="91" text-anchor="middle" fill="#cde2ea" font-size="10.5">flowsheet · BOP</text><text x="79" y="110" text-anchor="middle" fill="#cde2ea" font-size="10.5">steady / dynamic model</text><text x="79" y="129" text-anchor="middle" fill="#cde2ea" font-size="10.5">hybrid / reduced model</text></g>
    <path d="M419 238H450" stroke="#79dcd5" stroke-width="3" marker-end="url(#arr)"/>
    <g transform="translate(454,158)"><rect width="158" height="160" rx="22" fill="url(#coreFill)" stroke="#92dfb0" stroke-width="2.8"/><circle cx="30" cy="31" r="15" fill="rgba(153,217,57,.14)" stroke="#99d939"/><path d="M22 31l5 5 10-11" stroke="#b5eb73" stroke-width="2" fill="none"/><text x="54" y="29" fill="#aee86c" font-size="10" font-weight="900">03</text><text x="79" y="65" text-anchor="middle" fill="#fff" font-size="17" font-weight="900" class="lang-ko">검증과 운전</text><text x="79" y="65" text-anchor="middle" fill="#fff" font-size="15" font-weight="900" class="lang-en">Validation & Operation</text><text x="79" y="91" text-anchor="middle" fill="#cde2ea" font-size="10.5">design documents</text><text x="79" y="110" text-anchor="middle" fill="#cde2ea" font-size="10.5">plant / demo data</text><text x="79" y="129" text-anchor="middle" fill="#cde2ea" font-size="10.5">operating envelope</text></g>
    <path d="M617 238H648" stroke="#79dcd5" stroke-width="3" marker-end="url(#arr)"/>
    <g transform="translate(652,158)"><rect width="110" height="160" rx="22" fill="rgba(16,58,70,.82)" stroke="#a4e566" stroke-width="2.8"/><circle cx="28" cy="31" r="15" fill="rgba(153,217,57,.15)" stroke="#99d939"/><path d="M21 34l7-9 7 9M28 25v18" stroke="#b5eb73" stroke-width="2" fill="none"/><text x="51" y="29" fill="#aee86c" font-size="10" font-weight="900">04</text><text x="55" y="65" text-anchor="middle" fill="#fff" font-size="16" font-weight="900" class="lang-ko">공학적 결정</text><text x="55" y="65" text-anchor="middle" fill="#fff" font-size="13" font-weight="900" class="lang-en">Engineering Decisions</text><text x="55" y="92" text-anchor="middle" fill="#cde2ea" font-size="9.5">design basis</text><text x="55" y="110" text-anchor="middle" fill="#cde2ea" font-size="9.5">optimization</text><text x="55" y="128" text-anchor="middle" fill="#cde2ea" font-size="9.5">scale-up</text><text x="55" y="146" text-anchor="middle" fill="#cde2ea" font-size="9.5">deployment</text></g>

    <path d="M708 333 C700 402,168 412,132 335" fill="none" stroke="rgba(126,224,216,.55)" stroke-width="2" stroke-dasharray="7 7" marker-end="url(#arr)"/>
    <text x="410" y="397" text-anchor="middle" fill="#bcd7e1" font-size="10.5" letter-spacing="1"><tspan class="lang-ko">실증 피드백으로 모델 경계와 설계 기준을 반복 갱신</tspan><tspan class="lang-en">Demonstration feedback continuously updates model boundaries and design basis</tspan></text>
    <g transform="translate(85,427)"><rect width="140" height="36" rx="18" fill="rgba(126,224,216,.10)" stroke="rgba(126,224,216,.28)"/><text x="70" y="23" text-anchor="middle" fill="#e5f3f5" font-size="11">Performance</text></g>
    <g transform="translate(255,427)"><rect width="140" height="36" rx="18" fill="rgba(126,224,216,.10)" stroke="rgba(126,224,216,.28)"/><text x="70" y="23" text-anchor="middle" fill="#e5f3f5" font-size="11">Sustainability</text></g>
    <g transform="translate(425,427)"><rect width="140" height="36" rx="18" fill="rgba(153,217,57,.10)" stroke="rgba(153,217,57,.28)"/><text x="70" y="23" text-anchor="middle" fill="#e5f3f5" font-size="11">Economic Value</text></g>
    <g transform="translate(595,427)"><rect width="140" height="36" rx="18" fill="rgba(153,217,57,.10)" stroke="rgba(153,217,57,.28)"/><text x="70" y="23" text-anchor="middle" fill="#e5f3f5" font-size="11">Scale-up</text></g>`;
  }

  // 5. Main-page people snapshot: direct group vs. key collaborators, with no project-researcher bucket.
  const ownership=[...document.querySelectorAll('.white-card')].find(x=>/Ownership-based team/i.test(x.textContent));
  if(ownership){
    ownership.innerHTML=`<div class="section-title-row"><div><div class="kicker"><span class="lang-ko">현재 구성원</span><span class="lang-en">Current people</span></div><h3><span class="lang-ko">Ownership 기반 연구팀</span><span class="lang-en">Ownership-based research team</span></h3></div><a href="#people-detail"><span class="lang-ko">People 자세히 보기 →</span><span class="lang-en">Open People →</span></a></div><div class="ownership-mini"><div class="ownership-group"><h4><span class="lang-ko">핵심 / 직접 지도</span><span class="lang-en">Core / directly mentored</span></h4><div class="ownership-person"><b>Han Sol Jung</b><span>equipment-to-process integration · operability · engineering decisions</span></div><div class="ownership-person"><b>Jisoo Kim</b><span><span class="lang-ko">공정모델 · LCA/TEA · 시스템 의사결정</span><span class="lang-en">process models · LCA/TEA · system decisions</span></span></div><div class="ownership-person"><b>Soo Won Son</b><span><span class="lang-ko">장치물리 · COMSOL 다중물리 · 운전성</span><span class="lang-en">equipment physics · COMSOL multiphysics · operability</span></span></div></div><div class="ownership-group"><h4><span class="lang-ko">핵심 협업자</span><span class="lang-en">Key collaborators</span></h4><div class="ownership-person"><b>Seunghyun Cheon</b><span><span class="lang-ko">e-SAF 공정설계 · KPI · 최적화</span><span class="lang-en">e-SAF process design · KPI · optimization</span></span></div><div class="ownership-person"><b>Sun Choi</b><span><span class="lang-ko">전략 · 상용화 · 산업 공정기술</span><span class="lang-en">strategy · commercialization · industrial process technology</span></span></div><div class="ownership-person"><b>Giwoong Kim, Ph.D.</b><span><span class="lang-ko">실증 연계 공정설계 · 장기 협업 인터페이스</span><span class="lang-en">demonstration-facing process design · long-horizon collaboration</span></span></div></div></div><div class="ownership-note"><span class="lang-ko">구성원 표기는 고용형태가 아니라 연구 ownership, 직접 지도 관계와 협업 인터페이스를 기준으로 구분합니다.</span><span class="lang-en">People are grouped by research ownership, direct mentoring and collaboration interface rather than employment category.</span></div>`;
  }

  // Detailed people placement.
  const personCards=[...document.querySelectorAll('#people-detail .people-card-real')];
  const soo=personCards.find(c=>c.querySelector('h3')?.textContent.trim()==='Soo Won Son');
  if(soo){
    const rp=soo.querySelector('.role-pill'); if(rp)rp.innerHTML='<span class="lang-ko">핵심 / 직접 지도 · 장치물리 & 다중물리</span><span class="lang-en">Core / Directly mentored · Equipment & Multiphysics</span>';
    const p=soo.querySelector('p'); if(p)p.innerHTML='<span class="lang-ko">COMSOL 기반 FT 반응기·장치 해석, 운전 조건–성능–제약의 관계, 실제 장치 데이터와 공정모델의 연결을 담당합니다. 실제 공정 운전 경험을 바탕으로 모델의 물리적 현실성을 검토합니다.</span><span class="lang-en">Works on COMSOL-based FT reactor/equipment analysis, operating-condition–performance–constraint relationships, and translation of equipment data into process models. Previous process-operation experience supports physical-realism reviews.</span>';
  }
  const cheon=personCards.find(c=>c.querySelector('h3')?.textContent.trim()==='Seunghyun Cheon');
  const strategic=document.querySelector('#strategic-panel .people-cards');
  if(cheon){
    const rp=cheon.querySelector('.role-pill'); if(rp)rp.innerHTML='<span class="lang-ko">핵심 협업자 · 공정설계 & 최적화</span><span class="lang-en">Key Collaborator · Process Design & Optimization</span>';
    const p=cheon.querySelector('p'); if(p)p.innerHTML='<span class="lang-ko">Global TOP e-SAF 연구에서 개념설계, KPI 분석과 flowsheet 최적화를 수행하며, 협업 연구의 공정설계 근거와 논문화에 기여합니다.</span><span class="lang-en">Contributes e-SAF conceptual design, KPI analysis and flowsheet optimization in the collaborative Global TOP program, translating process-design evidence into joint publications.</span>';
    if(strategic&&cheon.parentElement!==strategic){cheon.remove();strategic.insertBefore(cheon,strategic.children[2]||null)}
  }
  document.querySelectorAll('#people-detail .tab-btn').forEach(btn=>{
    const key=(btn.dataset.target||btn.dataset.tab||btn.getAttribute('aria-controls')||'')+' '+btn.textContent;
    if(/strategic/i.test(key))btn.innerHTML='<span class="lang-ko">핵심 협업자</span><span class="lang-en">Key Collaborators</span>';
  });
  document.querySelectorAll('#people-detail .role-pill').forEach(x=>{if(/Project researcher/i.test(x.textContent))x.textContent=x.textContent.replace(/Project researcher\s*·?\s*/i,'')});

  // 6. Bilingual collaboration network with logo-style institutional marks.
  const collab=[...document.querySelectorAll('.collab')].find(x=>/Research network|Current collaboration interfaces/i.test(x.textContent));
  if(collab){
    const title=collab.querySelector('.section-title-row');
    if(title)title.innerHTML='<div><div class="kicker"><span class="lang-ko">연구 네트워크</span><span class="lang-en">Research network</span></div><h3><span class="lang-ko">현재 공동연구 인터페이스</span><span class="lang-en">Current collaboration interfaces</span></h3></div>';
    const logos=collab.querySelector('.logos');
    if(logos){logos.className='institution-grid';logos.removeAttribute('style');logos.innerHTML=`<div class="inst-logo-card"><div class="inst-mark krict">KRICT</div><div><b><span class="lang-ko">한국화학연구원</span><span class="lang-en">Korea Research Institute of Chemical Technology</span></b><span><span class="lang-ko">공정·실증 연구 거점</span><span class="lang-en">Process & demonstration hub</span></span></div></div><div class="inst-logo-card"><div class="inst-mark kmou">KMOU</div><div><b><span class="lang-ko">국립한국해양대학교</span><span class="lang-en">Korea Maritime & Ocean University</span></b><span><span class="lang-ko">펌프·압축기 성능맵 / 장치</span><span class="lang-en">Equipment performance maps</span></span></div></div><div class="inst-logo-card"><div class="inst-mark sook">SMWU</div><div><b><span class="lang-ko">숙명여자대학교</span><span class="lang-en">Sookmyung Women's University</span></b><span><span class="lang-ko">메탄올 촉매 성능·반응속도</span><span class="lang-en">Methanol catalyst & kinetics</span></span></div></div><div class="inst-logo-card"><div class="inst-mark uos">UOS</div><div><b><span class="lang-ko">서울시립대학교</span><span class="lang-en">University of Seoul</span></b><span><span class="lang-ko">AI 기반 e-CCU 공정 최적화</span><span class="lang-en">AI-based e-CCU optimization</span></span></div></div><div class="inst-logo-card"><div class="inst-mark postech">POSTECH</div><div><b><span class="lang-ko">포항공과대학교</span><span class="lang-en">POSTECH</span></b><span><span class="lang-ko">LCA · TEA · 시스템 평가</span><span class="lang-en">LCA · TEA · system assessment</span></span></div></div><div class="inst-logo-card"><div class="inst-mark jnu">JNU</div><div><b><span class="lang-ko">전남대학교</span><span class="lang-en">Chonnam National University</span></b><span><span class="lang-ko">FDCA 원천기술 / 공정시스템화</span><span class="lang-en">FDCA source technology / systemization</span></span></div></div>`}
  }

  // 7. Professional service, memberships and selected talks.
  const piMain=document.querySelector('#pi-panel .pi-main')||document.querySelector('#people-detail .pi-main');
  if(piMain&&!piMain.querySelector('.professional-activities')){
    const activities=document.createElement('div');activities.className='professional-activities';
    activities.innerHTML=`<article class="professional-card"><div class="kicker"><span class="lang-ko">전문 활동</span><span class="lang-en">Professional service</span></div><h4><span class="lang-ko">평가·학회 활동</span><span class="lang-en">Evaluation & memberships</span></h4><div class="service-item"><b><span class="lang-ko">신용보증기금(KODIT) 녹색인증 평가위원 · 2026–</span><span class="lang-en">Green Certification Evaluation Committee Member, KODIT · 2026–</span></b><span><span class="lang-ko">녹색기술 인증 및 인증 유효기간 연장 평가</span><span class="lang-en">Green-technology certification and validity-extension reviews</span></span></div><div class="service-item"><b><span class="lang-ko">전문학회 회원</span><span class="lang-en">Professional society memberships</span></b><div class="member-tags"><span class="member-tag"><span class="lang-ko">대한기계학회 · 종신회원</span><span class="lang-en">KSME · Lifetime Member</span></span><span class="member-tag"><span class="lang-ko">한국화학공학회 · 정회원</span><span class="lang-en">KIChE · Regular Member</span></span><span class="member-tag"><span class="lang-ko">대한설비공학회 · 정회원</span><span class="lang-en">SAREK · Regular Member</span></span></div></div></article><article class="professional-card"><div class="kicker"><span class="lang-ko">주요 강연 및 발표</span><span class="lang-en">Selected talks & lectures</span></div><h4><span class="lang-ko">시스템 엔지니어링과 탄소중립 기술</span><span class="lang-en">Systems engineering & carbon-neutral technologies</span></h4><div class="talk-item"><span class="talk-meta">2026.06 · STEM / Career Outreach · KRICT</span><b><span class="lang-ko">한국화학연구원 방문견학 프로그램 — 탄소중립 연구와 연구자의 진로</span><span class="lang-en">KRICT Visit Program — Carbon-neutral research and research careers</span></b></div><div class="talk-item"><span class="talk-meta">2026.03 · Graduate Seminar · Chungnam National University</span><b><span class="lang-ko">지속가능한 에너지 솔루션을 위한 시스템 엔지니어링: 실험실 규모에서 실증 플랜트까지</span><span class="lang-en">Systems Engineering for Sustainable Energy Solutions: From Laboratory Scale to Demonstration Plant</span></b></div><div class="talk-item"><span class="talk-meta">2025.05 · University Seminar · Sookmyung Women's University</span><b><span class="lang-ko">조선해양 분야에서의 탄소중립 전환: 수소 생산·운송·활용</span><span class="lang-en">Transition to Carbon Neutrality in the Marine Sector: Hydrogen Production, Transportation and Utilization</span></b></div><div class="talk-item"><span class="talk-meta">2023.10 · Conference Presentation · KIChE Fall Meeting</span><b><span class="lang-ko">선박용 e-메탄올 연료 합성 공정 개발 타당성 분석</span><span class="lang-en">Feasibility Analysis of an e-Methanol Fuel Synthesis Process for Marine Applications</span></b></div><div class="talk-item"><span class="talk-meta">2023.05 · International Forum · German-African Green Hydrogen Forum</span><b>Green hydrogen production, transportation and utilization in the marine sector</b></div></article>`;
    const arc=piMain.querySelector('.research-arc');if(arc)piMain.insertBefore(activities,arc);else piMain.appendChild(activities);
  }

  // 8. Refine IP language: technology-translation narrative rather than counting language.
  const ip=document.querySelector('#ip-detail');
  if(ip){
    const manifesto=ip.querySelector('.ip-manifesto h3');
    if(manifesto)manifesto.innerHTML='<span class="lang-ko">지식재산을 원천 아이디어가 공학 시스템으로 구체화되는 기술 전환의 기록으로 봅니다.</span><span class="lang-en">We treat intellectual property as a record of technology translation from original concepts to engineering systems.</span>';
    const featuredHeader=ip.querySelector('#ip-featured-panel .ip-panel-header h3');
    if(featuredHeader)featuredHeader.innerHTML='<span class="lang-ko">핵심 기술이 연구 결과에서 장치·공정 시스템으로 구체화되고 국제 권리로 확장되는 경로를 제시합니다.</span><span class="lang-en">Selected families trace how research outcomes are translated into equipment/process systems and extended across jurisdictions.</span>';
  }

  // Keep a neutral, professional site description.
  document.title='Han Sol Jung Research Group | Equipment-to-Process Systems';
})();