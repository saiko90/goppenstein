/* Photos & plans – galerie, visionneuse avec zoom, plans intégrés aux fiches */
(function(){
  var SRC={
    gi:{name:'goppenstein.info',url:'https://goppenstein.info/bergwerke/blei-und-zinkbergwerk/'},
    bk:{name:'Bergknappe n° 107 (2005), H.-R. Rüegg',url:'https://www.bergbau-gr.ch/wordpress/wp-content/uploads/bk/bk_107.pdf'},
    ae:{name:'Atelier Eisen',url:'http://blog.ateliereisen.ch/?p=1240'}
  };
  // cat : plan | terrain | archive ; lvl : general | bas | 1800 ; step : index d’étape d’itinéraire
  var P=[
    {id:'1VdCGDfmL90RS4htfo7PN6xyvAUY-0L7L',t:'Plan d’ensemble 2021',c:'Tous les vestiges relevés en 2021, du fond de vallée jusqu’à Schönbühl.',cat:'plan',lvl:'general',src:'gi',hero:true},
    {id:'1-gDqk_boZh1ofhovo_Ogk8AXmuh51dTk',t:'Le Lötschental et sa zone de minerai',c:'Carte d’ensemble de la vallée, de Goppenstein au Grundsee.',cat:'plan',lvl:'general',src:'bk'},
    {id:'1f4Kpc1UAml4gGnFt1CotQsgAuxPjaj9U',t:'Galeries du Rotenberg, Martinsgruben et Stockgraben',c:'Situation des galeries autour de Goppenstein, avec la géologie.',cat:'plan',lvl:'bas',src:'bk'},
    {id:'1TlOwy_8yufWKyNzeeAEv9ni7FQppXGT-',t:'Époque Tiebel, 1897 – 1907',c:'Zone exploitée autour de 1300 m, usine et téléphérique depuis la galerie Dahl.',cat:'plan',lvl:'bas',src:'gi'},
    {id:'1RZepwud_cOIy36jmTeTKC19rdeyeUm7G',t:'Époque Schurter & Eberhard, 1939 – 1948',c:'Travaux autour des galeries Tiebel et Dahl, petit téléphérique vers la route.',cat:'plan',lvl:'bas',src:'gi'},
    {id:'1GiNyPyh_XjRBBQsFiWw-7MGvzXCf2WYW',t:'Plan de la Martinsstollen (≈ 1180 m)',c:'Galerie rectiligne avec ancien captage d’eau à l’entrée, filons secondaires argentifères.',cat:'plan',lvl:'bas',src:'bk'},
    {id:'1uFk6oSozPuYofQ9mnImifAjXpuFN8LCU',t:'Époque Dionisotti, 1946 – 1953',c:'Exploitation de 1300 à 1800 m, téléphérique de 600 m vers l’usine.',cat:'plan',lvl:'1800',src:'gi'},
    {id:'1q3je_UbCtObjU815HOr_6hEGm-PAeUaa',t:'Plan de la mine, ère Dionisotti',c:'Plan dessiné de mémoire : galeries 1820 à 1873 m, cheminées, baraques, pont suspendu, gare du téléphérique.',cat:'plan',lvl:'1800',src:'ae',step:4},
    {id:'14h4co8Xy900TUl6vVK3J_zYc0MzBoWld',t:'Coupe A-A du Rotberg',c:'Coupe verticale des galeries de 1820 à 1873 m, avec cheminées et puits.',cat:'plan',lvl:'1800',src:'ae'},
    {id:'1abYCg2QWPxZUGLpa49LBorVSnpXFBuTP',t:'Plan de la galerie de 1820 m',c:'Éboulement près de l’entrée, puits vers le bas, venue d’eau, boisage, puits avec échelle vers le haut, minéraux d’argent au fond.',cat:'plan',lvl:'1800',src:'bk',step:6},
    {id:'1E5yyVlBjBlI9doh54XIQFCqRRR1T08wE',t:'Gare supérieure du téléphérique',c:'La station à 1820 m, d’où partait le minerai vers l’usine.',cat:'terrain',lvl:'1800',src:'ae',step:5},
    {id:'107WKswMJJZMtzbEk-6Wqq_meN3imaVUh',t:'Vue vers la station depuis le terril',c:'Une cinquantaine de mètres au-dessus de la galerie principale, un autre tunnel équipé de rails évacuait les déblais.',cat:'terrain',lvl:'1800',src:'ae'},
    {id:'1_XbtWGv7mRE0vyzOnB287dGDBntZTKlv',t:'La zone d’abattage',c:'Au niveau de la galerie de 1820 m : plateformes de travail encore chargées de pierres.',cat:'terrain',lvl:'1800',src:'ae',step:6},
    {id:'13LFLVlbGJY-abMumZfz7nxTpRMFS8rp7',t:'Plateformes dans la tranchée',c:'La tranchée d’exploitation d’environ 50 m, reliée à d’autres galeries.',cat:'terrain',lvl:'1800',src:'ae'},
    {id:'1U8zgXXPVrqm7fEcmaFPUqJOsfNUvgp8R',t:'Wagonnets et conduite d’air',c:'Wagonnets abandonnés et conduite d’air comprimé qui monte depuis l’usine.',cat:'terrain',lvl:'1800',src:'ae'},
    {id:'1aCYmDvK9NsaZj-suv8OamTeGC5zGJGXK',t:'Échelle près d’une goulotte',c:'Accès à la dernière zone d’exploitation, probablement la moins productive.',cat:'terrain',lvl:'1800',src:'ae'},
    {id:'12IW0FDfY53dmn9c0p9tKyLJCJO2VaXoM',t:'L’usine de traitement aujourd’hui',c:'Les restes de l’installation Dionisotti au fond de la vallée.',cat:'terrain',lvl:'bas',src:'ae'},
    {id:'1UZRK0LtCSMtt9ylqCJ_u4OF1sOKnlh25',t:'Usine Tiebel en 1902',c:'L’installation de traitement en pleine période d’exploitation.',cat:'archive',lvl:'bas',src:'bk'},
    {id:'110RACss0zlPhX8uMjjUHe8SbKjXncGeE',t:'Usine Tiebel en ruine, 1927',c:'Vingt ans après l’arrêt, l’usine est déjà laissée à l’abandon.',cat:'archive',lvl:'bas',src:'bk'},
    {id:'1972hobW-LL-Jrp1KsuEvy2DrMGodv5is',t:'Usine Dionisotti en 1975',c:'L’installation des années 1950, vingt ans après l’arrêt.',cat:'archive',lvl:'bas',src:'bk'},
    {id:'1tTIcsdSNFVQXvPbCSLj0OPfK2g99H4vL',t:'« Le Géant du Valais », 1942',c:'Bloc de charbon de 10 tonnes de la mine de Chandoline. Joseph Dionisotti pose à gauche.',cat:'archive',lvl:'general',src:'bk'}
  ];
  function url(p,w){return 'https://lh3.googleusercontent.com/d/'+p.id+'=w'+(w||1600);}
  var CATS=[['all','Tout'],['plan','Plans'],['terrain','Sur le terrain'],['archive','Archives']];
  var LV={general:'Vue d’ensemble',bas:'Fond de vallée','1800':'Niveau 1800'};

  var css=`
.ph-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:14px}
.ph-tile{position:relative;padding:0;border:1px solid var(--line);border-radius:6px;overflow:hidden;background:var(--surface);cursor:zoom-in;aspect-ratio:4/3;display:block;width:100%}
.ph-tile img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.ph-tile.plan img{object-fit:contain;background:#fff}
.ph-tile:hover img{transform:scale(1.04)}
.ph-tile span{position:absolute;left:0;right:0;bottom:0;padding:18px 8px 6px;font:600 .9rem/1.2 var(--font-head);color:#fff;text-align:left;background:linear-gradient(transparent,rgba(0,0,0,.72))}
.ph-tile.hide{display:none}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{border:1px solid var(--ink);background:transparent;color:var(--ink);border-radius:999px;padding:7px 13px;font:600 .95rem/1 var(--font-head);cursor:pointer}
.chip[aria-pressed="true"]{background:var(--ink);color:var(--bg)}
.chip small{opacity:.7;margin-left:4px}
.ph-strip{display:flex;gap:8px;overflow-x:auto;padding:4px 0 8px;scroll-snap-type:x mandatory}
.ph-strip .ph-tile{flex:0 0 150px;scroll-snap-align:start}
.ph-hero{margin:14px 0 6px}
.ph-hero .ph-tile{aspect-ratio:auto}
.ph-hero .ph-tile img{height:auto;max-height:60vh;object-fit:contain}
.ph-label{font:600 .95rem var(--font-head);color:var(--muted);margin:10px 0 2px}
.step-ph{display:flex;gap:8px;margin:.2rem 0 .8rem}
.step-ph .ph-tile{flex:0 0 120px}
#lb{position:fixed;inset:0;z-index:3000;background:#0d0f11;color:#e9ecee;display:none;flex-direction:column;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}
#lb.open{display:flex;animation:lbin .25s ease-out}
@keyframes lbin{from{opacity:0}}
@media (prefers-reduced-motion:reduce){#lb.open{animation:none}.ph-tile img{transition:none}}
#lb .stage{flex:1;position:relative;overflow:hidden;touch-action:none;cursor:grab}
#lb .stage img{position:absolute;left:50%;top:50%;max-width:100%;max-height:100%;transform-origin:center;user-select:none;-webkit-user-drag:none;will-change:transform}
#lb .bar{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 12px}
#lb .bar b{font:700 1.15rem var(--font-head)}
#lb .count{font:600 .95rem var(--font-head);opacity:.75}
#lb button{appearance:none;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.08);color:#fff;border-radius:4px;padding:9px 13px;font:600 1rem/1 var(--font-head);cursor:pointer}
#lb .cap{padding:8px 14px 14px;font-size:.95rem;line-height:1.4;max-width:70ch}
#lb .cap a{color:#f0a070}
#lb .nav{position:absolute;top:50%;transform:translateY(-50%);z-index:2;font-size:1.6rem;padding:14px 12px}
#lb .prev{left:8px}#lb .next{right:8px}
@media (max-width:620px){#lb .nav{display:none}}
.ph-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;margin-top:8px}
.ph-dl{font-size:.9rem;color:var(--muted)}
`;
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  function tile(p,i,extra){
    var b=document.createElement('button');b.className='ph-tile '+p.cat+(extra?' '+extra:'');b.type='button';
    b.setAttribute('aria-label','Agrandir : '+p.t);
    b.innerHTML='<img loading="lazy" crossorigin="anonymous" alt="'+p.t.replace(/"/g,'&quot;')+'" src="'+url(p,p.hero?1600:500)+'"><span>'+p.t+'</span>';
    b.addEventListener('click',function(){openLb(i);});
    return b;
  }

  // ---------- Section Photos ----------
  var sec=document.createElement('section');sec.id='photos';
  sec.innerHTML='<h2>Photos & plans</h2><p>'+P.length+' documents : plans, photos de terrain récentes et archives. Touche une image pour l’ouvrir en grand, pince pour zoomer, glisse pour passer à la suivante.</p>'+
    '<div class="ph-tools"><div class="chips" role="group" aria-label="Filtrer"></div><button class="btn ghost small" id="phCache">Garder hors ligne</button></div><p class="ph-dl" id="phDl"></p><div class="ph-grid"></div>';
  var srcSec=document.getElementById('sources');srcSec.parentNode.insertBefore(sec,srcSec);
  var nav=document.querySelector('nav.top .wrap');var a=document.createElement('a');a.href='#photos';a.textContent='Photos';
  nav.insertBefore(a,nav.querySelector('a[href="#histoire"]'));
  var grid=sec.querySelector('.ph-grid'),chips=sec.querySelector('.chips');
  var tiles=P.map(function(p,i){var t=tile(p,i);grid.appendChild(t);return t;});
  CATS.forEach(function(c,k){
    var n=c[0]==='all'?P.length:P.filter(function(p){return p.cat===c[0];}).length;
    var b=document.createElement('button');b.className='chip';b.type='button';b.setAttribute('aria-pressed',k===0?'true':'false');
    b.innerHTML=c[1]+'<small>'+n+'</small>';
    b.addEventListener('click',function(){
      chips.querySelectorAll('.chip').forEach(function(x){x.setAttribute('aria-pressed','false');});b.setAttribute('aria-pressed','true');
      tiles.forEach(function(t,i){t.classList.toggle('hide',c[0]!=='all'&&P[i].cat!==c[0]);});
    });
    chips.appendChild(b);
  });

  // ---------- Plans dans les fiches de niveaux ----------
  var niv=document.getElementById('niveaux');
  var heroI=P.findIndex(function(p){return p.hero;});
  var hero=document.createElement('div');hero.className='ph-hero';hero.appendChild(tile(P[heroI],heroI));
  niv.querySelector('p').after(hero);
  function strip(where,lvl){
    var box=document.getElementById(where);if(!box)return;
    var items=P.map(function(p,i){return [p,i];}).filter(function(x){return x[0].lvl===lvl&&!x[0].hero;});
    if(!items.length)return;
    var lab=document.createElement('div');lab.className='ph-label';lab.textContent='Plans et photos de ce niveau ('+items.length+')';
    var s=document.createElement('div');s.className='ph-strip';
    items.sort(function(a,b){return (a[0].cat==='plan'?0:1)-(b[0].cat==='plan'?0:1);}).forEach(function(x){s.appendChild(tile(x[0],x[1]));});
    box.appendChild(lab);box.appendChild(s);
  }
  strip('lvl-bas','bas');strip('lvl-1800','1800');

  // ---------- Photos dans l’itinéraire ----------
  function stepPhotos(){
    var any=false;
    P.forEach(function(p,i){
      if(p.step==null)return;var li=document.getElementById('step-'+p.step);if(!li)return;any=true;
      var box=li.querySelector('.step-ph');
      if(!box){box=document.createElement('div');box.className='step-ph';li.insertBefore(box,li.querySelector('.step-actions'));}
      box.appendChild(tile(p,i));
    });
    return any;
  }
  if(!stepPhotos()){var tries=0,iv=setInterval(function(){if(stepPhotos()||++tries>20)clearInterval(iv);},150);}

  // ---------- Visionneuse ----------
  var lb=document.createElement('div');lb.id='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Visionneuse');
  lb.innerHTML='<div class="bar"><span class="count"></span><b></b><button type="button" class="close">Fermer</button></div>'+
    '<div class="stage"><button type="button" class="nav prev" aria-label="Précédente">‹</button><img alt="" crossorigin="anonymous"><button type="button" class="nav next" aria-label="Suivante">›</button></div>'+
    '<div class="cap"></div>';
  document.body.appendChild(lb);
  var stage=lb.querySelector('.stage'),img=stage.querySelector('img'),cur=0,lastFocus=null;
  var s=1,tx=0,ty=0;
  function apply(){img.style.transform='translate(-50%,-50%) translate('+tx+'px,'+ty+'px) scale('+s+')';}
  function reset(){s=1;tx=0;ty=0;apply();}
  function show(i){
    cur=(i+P.length)%P.length;var p=P[cur],so=SRC[p.src];
    img.src=url(p,2000);img.alt=p.t;reset();
    lb.querySelector('.bar b').textContent=p.t;
    lb.querySelector('.count').textContent=(cur+1)+' / '+P.length;
    lb.querySelector('.cap').innerHTML=p.c+'<br><small>'+LV[p.lvl]+' · Source : <a href="'+so.url+'" target="_blank" rel="noopener">'+so.name+'</a></small>';
    [cur-1,cur+1].forEach(function(k){var q=P[(k+P.length)%P.length];var im=new Image();im.crossOrigin='anonymous';im.src=url(q,2000);});
  }
  function openLb(i){lastFocus=document.activeElement;show(i);lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('.close').focus();}
  function closeLb(){lb.classList.remove('open');document.body.style.overflow='';if(lastFocus)lastFocus.focus();}
  lb.querySelector('.close').addEventListener('click',closeLb);
  lb.querySelector('.prev').addEventListener('click',function(){show(cur-1);});
  lb.querySelector('.next').addEventListener('click',function(){show(cur+1);});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')closeLb();else if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1);
  });
  // Gestes : pincer pour zoomer, glisser pour déplacer ou changer d’image, double-tap pour zoomer
  var pts={},startDist=0,startS=1,startX=0,startY=0,startTx=0,startTy=0,moved=false,lastTap=0;
  function dist(){var v=Object.values(pts);return Math.hypot(v[0].x-v[1].x,v[0].y-v[1].y);}
  stage.addEventListener('pointerdown',function(e){
    if(e.target.closest('.nav'))return;
    stage.setPointerCapture(e.pointerId);pts[e.pointerId]={x:e.clientX,y:e.clientY};
    if(Object.keys(pts).length===2){startDist=dist();startS=s;}
    else{startX=e.clientX;startY=e.clientY;startTx=tx;startTy=ty;moved=false;}
  });
  stage.addEventListener('pointermove',function(e){
    if(!pts[e.pointerId])return;pts[e.pointerId]={x:e.clientX,y:e.clientY};
    var n=Object.keys(pts).length;
    if(n===2){s=Math.max(1,Math.min(6,startS*dist()/startDist));apply();moved=true;}
    else if(n===1){var dx=e.clientX-startX,dy=e.clientY-startY;if(Math.abs(dx)+Math.abs(dy)>6)moved=true;
      if(s>1){tx=startTx+dx;ty=startTy+dy;apply();}else{tx=dx;apply();}}
  });
  function up(e){
    var n=Object.keys(pts).length;delete pts[e.pointerId];
    if(n===1&&s===1){
      var dx=e.clientX-startX;
      if(Math.abs(dx)>60){show(cur+(dx<0?1:-1));return;}
      tx=0;apply();
      if(!moved){var now=Date.now();if(now-lastTap<300){s=2.5;apply();}lastTap=now;}
    }else if(n===1&&!moved){var now2=Date.now();if(now2-lastTap<300){reset();}lastTap=now2;}
    if(Object.keys(pts).length===1){var k=Object.keys(pts)[0];startX=pts[k].x;startY=pts[k].y;startTx=tx;startTy=ty;}
  }
  stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  stage.addEventListener('wheel',function(e){e.preventDefault();s=Math.max(1,Math.min(6,s*(e.deltaY<0?1.15:0.87)));if(s===1){tx=0;ty=0;}apply();},{passive:false});

  // ---------- Hors ligne ----------
  var dl=document.getElementById('phDl');
  document.getElementById('phCache').addEventListener('click',function(){
    var btn=this,done=0,total=0;btn.disabled=true;dl.textContent='Téléchargement : 0 %';
    var urls=[];P.forEach(function(p){urls.push(url(p,2000),url(p,500));});
    if(P[heroI])urls.push(url(P[heroI],1600));
    total=urls.length;
    var q=urls.slice(),errs=0;
    function next(){
      var u=q.shift();if(!u)return;
      fetch(u,{mode:'cors'}).then(function(r){if(!r.ok)errs++;}).catch(function(){errs++;}).then(function(){
        done++;dl.textContent='Téléchargement : '+Math.round(done/total*100)+' %';
        if(done===total){btn.disabled=false;dl.textContent=errs?('Terminé avec '+errs+' échec(s). Réessaie avec du réseau.'):'Toutes les images sont gardées sur ce téléphone pour samedi.';}
        else next();
      });
    }
    next();next();next();
  });
})();
