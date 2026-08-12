(async()=>{
  const baseText=await (await fetch('site-v17.js?rev=20260812v18base',{cache:'no-store'})).text();
  const baseRun=(0,eval)(baseText);
  if(baseRun&&typeof baseRun.then==='function') await baseRun;

  // The newly supplied unpublished KRICT application fills the previously unresolved domestic IP slot.
  // Remove the generic pending placeholder rather than increasing the portfolio count.
  const tbody=document.querySelector('#ip-registry-panel tbody');
  if(tbody){
    [...tbody.querySelectorAll('tr')].forEach(tr=>{
      if(tr.dataset.ipdomain==='pending'||/Pending upload|원문 공보 업로드 대기|portfolio count 23 반영용 placeholder/i.test(tr.textContent||''))tr.remove();
    });
    const rows=[...tbody.querySelectorAll('tr')];
    rows.forEach((tr,i)=>{const first=tr.querySelector('td');if(first)first.textContent=String(i+1)});
  }
  document.querySelectorAll('#ip-detail .ip-stat b,#ip-detail .ip-metric b,.hero-stats .stat b,.pi-metric b,.impact-card b').forEach(b=>{if(b.textContent.trim()==='24')b.textContent='23'});
  [...document.querySelectorAll('#ip-detail *')].forEach(el=>{
    if(el.children.length===0&&/22\+1|22 documents \+ 1 pending|22개 공보 \+ 1건 pending/i.test(el.textContent||'')){
      el.textContent=(el.textContent||'').replace(/22\+1/g,'23').replace(/22 documents \+ 1 pending/gi,'23 domestic IP records').replace(/22개 공보 \+ 1건 pending/g,'국내 IP 23건');
    }
  });
})();