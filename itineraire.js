/* Itinéraire ludique – injecte section, styles, lien de nav et source */
(function(){
  var css=`/* ===== Itinéraire ===== */
.trail{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:28px;align-items:start}
@media (max-width:820px){.trail{grid-template-columns:1fr;gap:0}}
.trail-fig{margin:0;position:sticky;top:calc(env(safe-area-inset-top,0px) + 58px);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px 12px 8px;z-index:5}
@media (max-width:820px){.trail-fig{padding:8px}}
.trail-fig svg{display:block;width:100%;height:auto;max-height:42vh}
.trail-head{display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:2px 4px 8px}
.trail-head b{font:700 1.3rem var(--font-head)}
.score{font:700 1.1rem var(--font-head);color:var(--rust);white-space:nowrap}
.meter{height:6px;background:var(--line);border-radius:3px;overflow:hidden;margin:0 4px 6px}
.meter i{display:block;height:100%;width:0;background:var(--rust);transition:width .6s cubic-bezier(.2,.8,.2,1)}
.prof-ground{fill:var(--bg)}
.prof-line{fill:none;stroke:var(--lead);stroke-width:5;stroke-linejoin:round;stroke-dasharray:3 12;stroke-linecap:round}
.prof-done{fill:none;stroke:var(--rust);stroke-width:9;stroke-linejoin:round;stroke-linecap:round;transition:stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1)}
.prof-grid{stroke:var(--line);stroke-width:1}
.prof-lbl{font:500 26px var(--font-body);fill:var(--muted)}
.cp circle.base{fill:var(--surface);stroke:var(--ink);stroke-width:4;transition:fill .3s}
.cp.done circle.base{fill:var(--rust);stroke:var(--rust)}
.cp.danger circle.base{stroke:var(--danger)}
.cp text{font:700 26px var(--font-head);fill:var(--ink);text-anchor:middle;dominant-baseline:central;pointer-events:none}
.cp.done text{fill:#fff}
.cp{cursor:pointer}
.cp .ring{fill:none;stroke:var(--rust);stroke-width:3;opacity:0}
.cp.pop .ring{animation:ring .9s ease-out}
@keyframes ring{0%{opacity:.9;r:22px}100%{opacity:0;r:70px}}
.cp.danger .halo{fill:var(--danger);opacity:.18;animation:halo 2.2s ease-in-out infinite}
@keyframes halo{50%{opacity:.04}}
#hiker{transition:transform .9s cubic-bezier(.3,.7,.2,1)}
#hiker .pulse{fill:var(--lichen);opacity:.35;animation:halo 1.6s ease-in-out infinite}
#hiker .dot{fill:var(--lichen);stroke:#fff;stroke-width:3}
#hiker text{font:700 26px var(--font-head);fill:var(--ink);text-anchor:middle}
@media (prefers-reduced-motion:reduce){#hiker,.prof-done,.meter i{transition:none}.cp.pop .ring,.cp.danger .halo,#hiker .pulse{animation:none}}
.live{font-size:.85rem;color:var(--muted);padding:0 4px}
.live b{color:var(--lichen)}
ol.steps{list-style:none;margin:0;padding:0}
ol.steps li{position:relative;padding:22px 0 22px 58px;border-bottom:1px solid var(--line);min-height:40vh;display:flex;flex-direction:column;justify-content:center}
@media (max-width:820px){ol.steps li{min-height:auto;padding:26px 0 26px 54px}}
ol.steps li:last-child{border-bottom:0}
ol.steps .n{position:absolute;left:0;top:24px;width:42px;height:42px;border-radius:50%;border:3px solid var(--ink);display:grid;place-items:center;font:700 1.2rem var(--font-head);background:var(--surface);transition:background .3s,color .3s,border-color .3s}
ol.steps li.done .n{background:var(--rust);border-color:var(--rust);color:#fff}
ol.steps li.active .n{box-shadow:0 0 0 5px color-mix(in srgb,var(--lichen) 45%,transparent)}
ol.steps .alt{font:700 1rem var(--font-head);color:var(--rust)}
ol.steps h3{margin:.15rem 0 .35rem}
ol.steps p{margin:.2rem 0 .7rem}
ol.steps .tip{font-size:.92rem;color:var(--muted);border-left:3px solid var(--lichen);padding-left:10px;margin:.3rem 0 .8rem}
ol.steps li.danger .n{border-color:var(--danger)}
ol.steps .warn{background:color-mix(in srgb,var(--danger) 12%,var(--surface));border:1px solid var(--danger);border-radius:6px;padding:10px 12px;margin:.3rem 0 .8rem;font-size:.95rem}
ol.steps .warn b{color:var(--danger)}
.step-actions{display:flex;gap:8px;flex-wrap:wrap}
.btn.small{padding:8px 11px;font-size:.95rem}
li.done .btn-check{background:var(--rust);border-color:var(--rust);color:#fff}
.finale{display:none;margin-top:18px;border:2px solid var(--rust);border-radius:8px;padding:18px;background:var(--surface)}
.finale.show{display:block;animation:rise .7s cubic-bezier(.2,.8,.2,1)}
@keyframes rise{from{opacity:0;transform:translateY(14px)}}
.finale h3{margin:0 0 .3rem;font-size:1.8rem}
#confetti{position:fixed;inset:0;pointer-events:none;z-index:2000}
`;
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var html=`<section id="itineraire">
  <h2>Itinéraire jusqu’à la station</h2>
  <p>D’après le récit Hikr d’ABoehlen (septembre 2019, cotation T5-) et le relevé 2021 de goppenstein.info. Valide chaque étape en route : la trace se colore et votre point avance sur le profil. Avec le GPS actif, il suit votre altitude réelle.</p>
  <div class="trail">
    <figure class="trail-fig" aria-label="Profil de la montée">
      <div class="trail-head"><b id="stepTitle">Départ</b><span class="score" id="score">0 / 7</span></div>
      <div class="meter" aria-hidden="true"><i id="meter"></i></div>
      <svg id="profile" viewBox="0 0 1000 440" role="img" aria-label="Profil altimétrique schématique de Goppenstein à la station du téléphérique"></svg>
      <div class="live" id="liveAlt">Profil schématique, altitudes approximatives sauf départ.</div>
    </figure>
    <div>
      <ol class="steps" id="steps"></ol>
      <div class="finale" id="finale" role="status">
        <h3>Salle d’abattage atteinte</h3>
        <p>Sept étapes validées. Signez le livre de cabane de la station, et prenez une photo pour l’app.</p>
        <button class="btn ghost small" id="resetSteps">Remettre l’itinéraire à zéro</button>
      </div>
    </div>
  </div>
</section>`;
  var carte=document.getElementById('carte');
  var tmp=document.createElement('div');tmp.innerHTML=html;carte.parentNode.insertBefore(tmp.firstElementChild,carte);
  var nav=document.querySelector('nav.top .wrap');
  var a=document.createElement('a');a.href='#itineraire';a.textContent='Itinéraire';nav.insertBefore(a,nav.firstChild);
  var note=document.querySelector('.hero .note');
  if(note)note.innerHTML='<a href="#itineraire">Commence par l’itinéraire</a>, il valide les étapes une à une. '+note.innerHTML;
  var src=document.querySelector('ul.src');
  if(src){var li=document.createElement('li');li.innerHTML='<a href="http://blog.ateliereisen.ch/?p=1240" target="_blank" rel="noopener">Atelier Eisen – plan des installations</a><br>Plan recommandé par l’auteur du récit Hikr pour se représenter les galeries souterraines, invisibles depuis l’extérieur.';src.insertBefore(li,src.children[4]||null);}
})();
(function(){
  var STEPS=[
    {alt:1216,approx:false,title:'Felsheim, le départ caché',text:'La montée part juste à côté de l’auberge Felsheim, près de la gare. Peu de gens la connaissent encore. Premier obstacle : un mur à franchir par des barreaux métalliques.',tip:'Marque ce point dans la carte : c’est ton repère pour la descente.'},
    {alt:1420,approx:true,title:'Le chemin des mineurs',text:'Très raide d’un bout à l’autre. C’est l’ancien accès des ouvriers, qui le montaient jusqu’à trois fois par jour sous Dionisotti. Pas de balisage officiel, mais quelques marques blanc-bleu-blanc. Bois mort à enjamber.',tip:'Si tu perds la trace, cherche les marques peintes plutôt que de tirer droit.'},
    {alt:1610,approx:true,title:'L’embranchement',text:'Un peu au-dessus de 1600 m, le sentier de l’Alti Pochi part à gauche. Toi, tu continues tout droit. La trace reste lisible, avec quelques passages exposés.',tip:'Bon endroit pour une pause et un premier check de la neige plus haut.'},
    {alt:1790,approx:true,title:'Les baraques Dionisotti',text:'La trace s’arrête net. Fondations et tas de bois : c’est tout ce qui reste des logements des ouvriers. De là, première vue sur la station du téléphérique.',tip:'Le spot photo pour la station avec la vallée en arrière-plan.'},
    {alt:1795,approx:true,danger:true,title:'Le ravin',text:'Un ravin très raide sépare les baraques de la station. Les restes du pont suspendu pourrissent dans la pente. Peu d’eau, mais du gravier fin très glissant : l’auteur Hikr est passé à quatre pattes.',warn:'<b>Point de décision.</b> Avec neige ou gel, demi-tour ici. Sinon, pose une main courante pour Yannick.'},
    {alt:1805,approx:true,title:'La station du téléphérique',text:'Au rez-de-chaussée, la grande roue de renvoi et des restes de câbles. Pour l’étage, traverse le bâtiment et remonte la pente derrière. Table, lits et livre de cabane, entretenus par des bénévoles.',tip:'Signe le livre de cabane.'},
    {alt:1820,approx:true,danger:true,title:'La vire et la salle',text:'De l’étage, la voie du téléphérique continue sur une vire taillée à l’explosif dans la paroi. Puis une galerie basse qui s’ouvre sur une salle d’abattage d’environ 50 m de haut, avec des galeries en bois perchées. Effondré après une centaine de mètres.',warn:'<b>Corde obligatoire.</b> Hikr a renoncé faute d’accès sûr à la vire. Ne marche pas sur le rail, ne touche pas aux boisages.'}
  ];
  var KEY='goppenstein-trail-v1';
  var done={};try{done=JSON.parse(localStorage.getItem(KEY))||{};}catch(e){}
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(done));}catch(e){}}
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Profil SVG ----
  var svg=document.getElementById('profile'), NS='http://www.w3.org/2000/svg';
  var X0=150,X1=950,AMIN=1150,AMAX=1880,Y0=405,Y1=70;
  function yA(a){return Y0-(a-AMIN)/(AMAX-AMIN)*(Y0-Y1);}
  var xs=[X0,290,440,610,700,820,X1];
  var pts=STEPS.map(function(s,i){return [xs[i],yA(s.alt)];});
  function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
  [1200,1400,1600,1800].forEach(function(a){
    svg.appendChild(el('line',{x1:X0-10,x2:X1+20,y1:yA(a),y2:yA(a),class:'prof-grid'}));
    var t=el('text',{x:0,y:yA(a)+9,class:'prof-lbl'});t.textContent=a+' m';svg.appendChild(t);
  });
  var d='M'+pts.map(function(p){return p[0]+','+p[1];}).join(' L');
  svg.appendChild(el('path',{d:d+' L'+X1+','+(Y0+40)+' L'+X0+','+(Y0+40)+' Z',class:'prof-ground'}));
  svg.appendChild(el('path',{d:d,class:'prof-line'}));
  var doneP=el('path',{d:d,class:'prof-done'});svg.appendChild(doneP);
  var total=doneP.getTotalLength();
  var segLen=[0];for(var i=1;i<pts.length;i++){segLen.push(segLen[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));}
  var scale=total/segLen[segLen.length-1];
  doneP.style.strokeDasharray=total;doneP.style.strokeDashoffset=total;

  var cps=STEPS.map(function(s,i){
    var g=el('g',{class:'cp'+(s.danger?' danger':''),tabindex:0,role:'button','aria-label':'Étape '+(i+1)+' : '+s.title});
    if(s.danger)g.appendChild(el('circle',{class:'halo',cx:pts[i][0],cy:pts[i][1],r:44}));
    g.appendChild(el('circle',{class:'ring',cx:pts[i][0],cy:pts[i][1],r:22}));
    g.appendChild(el('circle',{class:'base',cx:pts[i][0],cy:pts[i][1],r:23}));
    var t=el('text',{x:pts[i][0],y:pts[i][1]});t.textContent=i+1;g.appendChild(t);
    function go(){document.getElementById('step-'+i).scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});}
    g.addEventListener('click',go);g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});
    svg.appendChild(g);return g;
  });
  var hiker=el('g',{id:'hiker'});
  hiker.appendChild(el('circle',{class:'pulse',cx:0,cy:0,r:30}));
  hiker.appendChild(el('circle',{class:'dot',cx:0,cy:0,r:14}));
  var ht=el('text',{x:0,y:-38});ht.textContent='M + Y';hiker.appendChild(ht);
  svg.appendChild(hiker);
  function placeHiker(f){ // f = position continue 0..6
    f=Math.max(0,Math.min(STEPS.length-1,f));var i=Math.floor(f),r=f-i,j=Math.min(i+1,pts.length-1);
    var x=pts[i][0]+(pts[j][0]-pts[i][0])*r,y=pts[i][1]+(pts[j][1]-pts[i][1])*r;
    hiker.setAttribute('transform','translate('+x+','+y+')');
  }

  // ---- Étapes ----
  var ol=document.getElementById('steps');
  STEPS.forEach(function(s,i){
    var li=document.createElement('li');li.id='step-'+i;li.dataset.i=i;if(s.danger)li.classList.add('danger');
    li.innerHTML='<span class="n">'+(i+1)+'</span><div class="alt">'+(s.approx?'≈ ':'')+s.alt+' m</div><h3>'+s.title+'</h3><p>'+s.text+'</p>'+
      (s.tip?'<p class="tip">'+s.tip+'</p>':'')+(s.warn?'<div class="warn">'+s.warn+'</div>':'')+
      '<div class="step-actions"><button class="btn small btn-check" data-check="'+i+'"></button></div>';
    ol.appendChild(li);
  });
  var title=document.getElementById('stepTitle'),score=document.getElementById('score'),meter=document.getElementById('meter'),finale=document.getElementById('finale');
  function render(popIndex){
    var n=0,maxDone=-1;
    STEPS.forEach(function(s,i){
      var on=!!done[i];if(on){n++;maxDone=Math.max(maxDone,i);}
      cps[i].classList.toggle('done',on);
      var li=document.getElementById('step-'+i);li.classList.toggle('done',on);
      li.querySelector('.btn-check').textContent=on?'Validé ✓':'J’y suis';
    });
    score.textContent=n+' / '+STEPS.length;
    meter.style.width=(n/STEPS.length*100)+'%';
    var len=maxDone<0?0:segLen[maxDone]*scale;
    doneP.style.strokeDashoffset=total-len;
    finale.classList.toggle('show',n===STEPS.length);
    if(popIndex!=null&&done[popIndex]){var c=cps[popIndex];c.classList.remove('pop');void c.getBBox();c.classList.add('pop');}
    return n;
  }
  ol.addEventListener('click',function(e){
    var b=e.target.closest('[data-check]');if(!b)return;
    var i=+b.dataset.check;done[i]=!done[i];persist();
    var n=render(i);
    if(done[i]){placeHiker(i);if(n===STEPS.length)confetti();}
  });
  document.getElementById('resetSteps').addEventListener('click',function(){done={};persist();render();placeHiker(0);});

  // Scroll : le point suit l’étape lue
  var gpsAlt=null;
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(!en.isIntersecting)return;var i=+en.target.dataset.i;
        document.querySelectorAll('ol.steps li').forEach(function(l){l.classList.toggle('active',l===en.target);});
        title.textContent=(i+1)+'. '+STEPS[i].title;
        if(gpsAlt==null)placeHiker(i);
      });
    },{rootMargin:'-45% 0px -45% 0px'});
    document.querySelectorAll('ol.steps li').forEach(function(l){io.observe(l);});
  }

  // GPS : le point suit l’altitude réelle
  document.addEventListener('gop-alt',function(e){
    var a=e.detail.alt;if(a==null||isNaN(a))return;gpsAlt=a;
    var f=0;for(var i=0;i<STEPS.length-1;i++){var a0=STEPS[i].alt,a1=STEPS[i+1].alt;if(a>=a1){f=i+1;continue;}if(a>a0){f=i+(a-a0)/(a1-a0);}break;}
    placeHiker(f);
    document.getElementById('liveAlt').innerHTML='GPS actif : <b>'+Math.round(a)+' m</b>. Le point suit ton altitude.';
  });

  // Confettis couleur minerai, une seule fois à la fin
  function confetti(){
    if(reduce)return;
    var cv=document.createElement('canvas');cv.id='confetti';document.body.appendChild(cv);
    var ctx=cv.getContext('2d'),W=cv.width=innerWidth,H=cv.height=innerHeight;
    var cols=['#9c4a1e','#6b7682','#b9c26a','#d07a45','#e9ecee'],P=[];
    for(var k=0;k<140;k++)P.push({x:W/2,y:H*0.35,vx:(Math.random()-.5)*14,vy:-Math.random()*13-4,s:4+Math.random()*6,c:cols[k%cols.length],r:Math.random()*6});
    var t0=performance.now();
    (function f(t){ctx.clearRect(0,0,W,H);P.forEach(function(p){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=.1;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.66);ctx.restore();});
      if(t-t0<2600)requestAnimationFrame(f);else cv.remove();})(t0);
  }

  render();placeHiker(0);
  // Entrée : la trace se dessine une fois au chargement
  if(!reduce){var full=total;doneP.style.transition='none';doneP.style.strokeDashoffset=full;requestAnimationFrame(function(){doneP.style.transition='';render();});}
})();
