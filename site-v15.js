(async()=>{
  const baseText=await (await fetch('site-v13.js?rev=20260811v15base',{cache:'no-store'})).text();
  const baseRun=(0,eval)(baseText);
  if(baseRun&&typeof baseRun.then==='function') await baseRun;

  const style=document.createElement('style');
  style.textContent=`
    .culture-intro-v13{grid-template-columns:1fr!important}
    .culture-aside-v13{display:none!important}
    #home-directory-v13 .section-title-row{margin-bottom:12px}
    #home-directory-v13 .section-title-row h3{display:none!important}
    #join-page-v13>.shell>.page-mast-inline-v13>p{display:none!important}
  `;
  document.head.appendChild(style);

  // Remove copy that explained the website structure rather than the research group itself.
  const groupAside=document.querySelector('#group-page-v13 .culture-aside-v13');
  if(groupAside) groupAside.remove();

  const homeDirectoryHeading=document.querySelector('#home-directory-v13 .section-title-row h3');
  if(homeDirectoryHeading) homeDirectoryHeading.remove();

  const joinMeta=document.querySelector('#join-page-v13>.shell>.page-mast-inline-v13>p');
  if(joinMeta) joinMeta.remove();

  // Replace residual page-architecture wording with public-facing research language where needed.
  const groupMast=document.querySelector('#page-mast-v13 p');
  const filename=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  if(filename==='group.html'&&groupMast){
    groupMast.innerHTML='<span class="lang-ko">연구 ownership, 기술적 엄밀성, 공정한 credit과 독립성을 연구그룹의 운영 원칙으로 삼습니다.</span><span class="lang-en">Research ownership, technical rigor, fair credit and independence are the operating principles of the group.</span>';
  }
  if(filename==='join.html'&&groupMast){
    groupMast.innerHTML='<span class="lang-ko">KRICT 제도 내 연구자 모집과 장치–공정–데이터–의사결정 interface의 공동연구 기회를 안내합니다.</span><span class="lang-en">Research opportunities through KRICT programs and collaborations across equipment, process, data and engineering-decision interfaces.</span>';
  }

  document.title=document.title.replace('Group Culture','Research Group').replace('Join Us |','Join Us |');
})();