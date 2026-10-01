const pages=[...document.querySelectorAll('.page')];
const menu=document.querySelector('.dropdown');
const btn=document.getElementById('justiceBtn');

function showPage(id){
  if(!document.getElementById(id)) id='accueil';
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  history.replaceState(null,'','#'+id);
  window.scrollTo({top:0,behavior:'smooth'});
  menu.classList.remove('open');
}
document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',()=>showPage(el.dataset.page)));
btn.addEventListener('click',e=>{e.stopPropagation();menu.classList.toggle('open')});
document.addEventListener('click',()=>menu.classList.remove('open'));

const search=document.getElementById('articleSearch');
if(search){
  const cards=[...document.querySelectorAll('.article-card')];
  const counter=document.getElementById('resultCount');
  search.addEventListener('input',()=>{
    const q=search.value.trim().toLowerCase();
    let n=0;
    cards.forEach(card=>{
      const ok=!q || card.dataset.search.includes(q);
      card.style.display=ok?'block':'none';
      if(ok)n++;
    });
    counter.textContent=n+' article'+(n>1?'s':'');
    document.querySelectorAll('.chapter').forEach(ch=>{
      const visible=[...ch.querySelectorAll('.article-card')].some(c=>c.style.display!=='none');
      ch.style.display=visible?'block':'none';
    });
  });
}
const initial=location.hash.replace('#','');
if(initial) showPage(initial);
