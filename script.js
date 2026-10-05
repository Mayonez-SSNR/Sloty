const $=s=>document.querySelector(s),R=n=>Math.random()*n|0,fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
const DEF={db:{},sv:0,m:1000,d:0,rep:0,sp:0,w:0,bw:0,jps:0,lk:0,pb:0,rb:0,cl:0,own:[],rl:0,bj:0,won:0,lost:0,pool:500,bonus:0,mach:0};
let S;try{S={...DEF,...JSON.parse(localStorage.getItem('cts')||'{}')}}catch(e){S={...DEF}}
S.db={...(S.db||{})};S.own=[...S.own];S.q=[...(S.q||[])];if(!Object.keys(S.db).length&&S.d>0)S.db.st=S.d;
const save=()=>{try{window.U&&localStorage.setItem('cts_'+window.U,JSON.stringify(S))}catch(e){}};
let AC;function beep(f,d=.1,t='sine'){try{AC=AC||new AudioContext();const o=AC.createOscillator(),g=AC.createGain();o.type=t;o.frequency.value=f;g.gain.value=.04;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d)}catch(e){}}
function toast(t){const e=$('#ts');e.textContent=t;e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display='none',2200)}
function conf(n){for(let k=0;k<n;k++){const e=document.createElement('i');e.textContent=['🪙','✨','💰','⭐'][R(4)];e.style.cssText=`left:${R(100)}vw;animation-duration:${1+Math.random()*2}s`;document.body.append(e);setTimeout(()=>e.remove(),3200)}}
const RK=[[0,'Rookie'],[25,'Regular'],[100,'High Roller'],[300,'VIP'],[800,'Whale'],[2000,'Legend'],[5000,'Mogul']];
const rank=()=>RK.filter(r=>S.rep>=r[0]).pop()[1];
const ITEMS=[['🚲','Vintage Bike',1500,1],['🚗','Used Sedan',12000,8],['🏎️','Sports Car',90000,60],['🏠','Beach House',400000,260],['🛥️','Yacht',1500000,900],['✈️','Private Jet',8000000,4500],['🏝️','Private Island',50000000,28000],['⌚','Luxury Watch',6000,4],['👔','Designer Suit',25000,15],['🐴','Racehorse',250000,180],['💍','Diamond Ring',150000,100],['🍷','Vineyard',900000,600],['🏙️','Skyline Penthouse',3000000,2000],['🚁','Helicopter',4000000,3000],['🏰','Castle',20000000,12000],['🚀','Space Yacht',100000000,60000]];
const worth=()=>S.m+(S.sv||0)-S.d+S.own.reduce((a,i)=>a+ITEMS[i][2],0),inc=()=>S.own.reduce((a,i)=>a+ITEMS[i][3],0);
const limit=()=>1000+2000*S.cl+S.rep*20;
let dv=S.m;
function tw(){const a=dv,b=S.m,t0=performance.now();cancelAnimationFrame(tw.f);const f=n=>{const k=Math.min(1,(n-t0)/600);dv=a+(b-a)*k;const e=$('#cs');if(e)e.textContent=fmt(dv);if(k<1)tw.f=requestAnimationFrame(f)};tw.f=requestAnimationFrame(f)}
const f0=n=>Math.round(n).toLocaleString('en-US');
function hd(){const nx=RK.find(r=>r[0]>S.rep),cu=RK.filter(r=>r[0]<=S.rep).pop(),pc=nx?(S.rep-cu[0])/(nx[0]-cu[0])*100:100,qn=QS.filter(q=>!S.q.includes(q.id)&&q.get()>=q.goal).length;
$('#hd').innerHTML=`${cur!='home'?'<button onclick="go(\'home\')">☰ Menu</button>':''}<span>Cash <b class=m id=cs>${fmt(dv)}</b></span><span>Debt <b class=d>${fmt(S.d)}</b></span><span>Net worth <b>${fmt(worth())}</b></span>${qn?`<button class="go pls" onclick="go('quests')">📜 ${qn} ready</button>`:''}<div class=rb><div class=rbt><span>${rank()} · ${S.rep} rep</span><span>${nx?'Next: '+nx[1]+' at '+nx[0]:'Max rank'}</span></div><div class=bar><span class=fl style="width:${pc}%"></span></div></div>`;tw();const j=$('#jp');if(j)j.textContent=fmt(S.pool);save()}
function res(net,bet){S.w+=net>0;S.bw=Math.max(S.bw,net);net>0?S.won+=net:S.lost-=net;void bet}
function addRep(n){const o=rank();S.rep+=n;if(rank()!=o){toast('🏆 New rank: '+rank());conf(30)}MA.forEach(m=>{if(S.rep>=m.rep&&S.rep-n<m.rep&&m.rep)toast('🔓 Unlocked '+m.n)})}
let bet=50,busy=0,auto=0,cur='slots';
function setBet(v){bet=Math.max(1,Math.floor(+v||1));const e=$('#bi');if(e)e.value=bet}
const betUI=(extra='')=>`<div class=row><input id=bi type=number min=1 value=${bet} oninput="setBet(this.value)"><button onclick="setBet(bet/2)">½</button><button onclick="setBet(bet*2)">×2</button><button onclick="setBet(S.m)">MAX</button>${extra}</div>`;
/* ---------- SLOTS ---------- */
const W=[26,22,18,14,10,7,3],P=[6,10,15,25,50,120,0];
const nice=x=>{const e=Math.pow(10,Math.floor(Math.log10(x))-1);return Math.max(1,Math.round(Math.round(x/e)*e))},rr=i=>i?Math.round(4*Math.pow(i,1.85)):0,mn=(b,i)=>nice(b*Math.pow(1.3,i));
const TH=[['Fruit Frenzy','#f5c542','🍒 🍋 🍊 🍇 🔔 💎 7️⃣'],['Lucky Dragon','#ef4444','🧧 🏮 🐟 🪭 🐲 💰 🐉'],['Diamond Deluxe','#38bdf8','💍 👑 🍀 🎲 🔔 💎 7️⃣'],['Wild West','#d97706','🌵 🤠 🐎 🥃 ⭐ 🪙 🐂'],['Candy Land','#f472b6','🍬 🍭 🍩 🍪 🍫 🧁 🎂'],['Ocean Deep','#0ea5e9','🐚 🦀 🐠 🐙 🦈 🐋 🔱'],['Pharaoh’s Gold','#f59e0b','🪲 🐍 🏺 👁️ 🔱 🗿 🌞'],['Jungle Safari','#65a30d','🦒 🐘 🦓 🦁 🐅 🦍 🐊'],['Pirate’s Bounty','#14b8a6','⚓ 🦜 🗺️ 🧭 🪙 💎 🏴‍☠️'],['Arctic Frost','#7dd3fc','❄️ ⛄ 🐧 🧊 🐻‍❄️ 🏔️ 💠'],['Samurai Spirit','#dc2626','🎴 🌸 🍙 🏯 ⛩️ 🗡️ 🐉'],['Magic Forest','#22c55e','🍄 🦋 🌿 🦉 🧚 🔮 🦄'],['Neon Galaxy','#e879f9','🌙 🪐 ☄️ 🚀 👽 🌌 ⭐'],['Haunted Manor','#a855f7','🕯️ 🦇 🕷️ 🎃 👻 🧛 💀'],['Rock Star','#f97316','🎸 🥁 🎤 🎹 🎧 🎺 🤘'],['Space Mission','#6366f1','🛰️ 🌍 🌕 🛸 🧑‍🚀 ☀️ 🚀'],['Aztec Treasure','#ca8a04','🗿 🌽 🦅 🐆 🏺 🔥 🌞'],['Mythic Olympus','#facc15','⚡ 🏛️ 🦉 🔱 🍇 🏺 👑'],['Cyber City','#06b6d4','🤖 💾 🔋 🧬 🕹️ 💿 🌐'],['Viking Saga','#94a3b8','🛡️ ⚔️ 🪓 🍺 🐺 ⛵ 🔨'],['Gold Rush','#eab308','🪨 ⛏️ 🚂 🔦 🪙 💎 🏆'],['Royal Court','#c084fc','🏰 🛡️ 🦢 🍷 👸 🤴 👑'],['Tropical Paradise','#fb923c','🥥 🍍 🌺 🏝️ 🦩 🍹 🌴'],['Wizard’s Tower','#8b5cf6','📜 🧪 🔮 🪄 🦉 🧙 🐲'],['Steampunk','#b45309','🕰️ ⚙️ 🧭 🎩 🔭 🚂 🎈'],['Monte Carlo','#fde68a','🥂 🎩 🛥️ 🍾 🏎️ 💎 💶'],['Dragon Throne','#b91c1c','🐉 🔥 🥚 🗡️ 🏰 👑 🌋'],['Cosmic Fortune','#38bdf8','🌠 🔭 ⏳ 🌀 🪬 🔮 ♾️'],['Platinum Elite','#e5e7eb','💳 🥃 ⌚ 🛩️ 💼 🏆 💎'],['Vegas Royale','#fde047','♠️ ♥️ ♦️ ♣️ 🎩 💰 🎰']];
const MA=TH.map((t,i)=>({n:t[0],y:t[1],s:t[2].split(' '),rep:rr(i),min:mn(10,i)}));
const lvSel=(fn,cur,name,min)=>`<div class=row><select onchange="${fn}(+this.value)">${Array.from({length:30},(_,i)=>{const lk=S.rep<rr(i);return`<option value=${i} ${i==cur?'selected':''}>${lk?'🔒 ':''}Lv ${i+1} · ${name(i)} — ${lk?'needs '+f0(rr(i))+' rep':'min '+fmt(min(i))}</option>`}).join('')}</select></div>`;
const pick=()=>{let t=R(100),a=0;for(let i=0;i<7;i++){a+=W[i];if(t<a)return i}return 0};
const roll=()=>[pick(),pick(),pick()];
const pay=(r,b)=>r[0]==r[1]&&r[1]==r[2]?(r[0]==6?0:b*P[r[0]]):r[0]==r[1]||r[1]==r[2]?b:0;
function slots(){const M=MA[S.mach];$('#mn').innerHTML=`<div class=card>${lvSel('mach',S.mach,i=>MA[i].n,i=>MA[i].min)}</div>
<div class="cab" id=cab style="--a:${M.y}"><h2>${M.n}</h2><div class=jp>JACKPOT <b id=jp></b></div><div class=reels>${[0,1,2].map(i=>`<div class=reel id=r${i}>${[0,1,2].map(j=>`<div class=c id=c${i}${j}>${M.s[pick()]}</div>`).join('')}</div>`).join('')}<div class=line></div></div><div class=msg id=msg>Good luck!</div>
${betUI(`<button class=go id=sb onclick="spin()">SPIN</button><button class=red onclick="allin()">ALL IN</button><button id=ab class="${auto?'on':''}" onclick="auto=!auto;this.classList.toggle('on');auto&&spin()">AUTO</button>`)}
<div class=tag>3 in a row pays big · any pair refunds your bet · 3×${M.s[6]} (or a lucky roll) hits the JACKPOT · Space = spin</div></div>
<div class=card id=lowcash style="display:none">💸 You're out of chips — visit the <b>Bank</b> for a loan.</div>`;hd();low()}
const low=()=>{const e=$('#lowcash');if(e)e.style.display=S.m<MA[S.mach].min?'block':'none'};
function mach(i){if(busy)return;if(S.rep<MA[i].rep)return toast('Need '+MA[i].rep+' reputation');S.mach=i;setBet(Math.max(bet,MA[i].min));slots()}
function allin(){setBet(S.m);spin()}
function spin(){if(cur!='slots'||busy)return;const M=MA[S.mach],b=Math.floor(bet);
if(b<M.min){auto=0;return toast('Min bet '+fmt(M.min))}if(b>S.m){auto=0;low();return toast('Not enough cash')}
busy=1;S.m-=b;S.pool+=b*.05;accrue();S.sp++;let r=roll(),jack=Math.random()<.004+.0004*S.lk;
if(jack)r=[6,6,6];else if(pay(r,b)==0&&Math.random()<.05*S.lk)r=roll();
if(r[0]==6&&r[1]==6&&r[2]==6)jack=1;
let w=jack?Math.max(S.pool,50*b):pay(r,b);if(w>b)w=b+(w-b)*(1+.05*S.pb);
hd();$('#msg').textContent='';$('#msg').className='msg';$('#cab').className='cab';$('#sb').disabled=1;
const iv=[0,1,2].map(i=>{$('#r'+i).classList.add('sp');return setInterval(()=>{for(let j=0;j<3;j++)$('#c'+i+j).textContent=M.s[R(7)];beep(300+i*80,.03,'square')},80)});
[0,1,2].forEach(i=>setTimeout(()=>{clearInterval(iv[i]);$('#r'+i).classList.remove('sp');$('#c'+i+'0').textContent=M.s[R(7)];$('#c'+i+'1').textContent=M.s[r[i]];$('#c'+i+'2').textContent=M.s[R(7)];beep(500+i*120,.12)},700+i*400));
setTimeout(()=>{S.m+=w;const net=w-b;res(net,b);addRep(MA.indexOf(M)+1+S.rb);const m=$('#msg'),c=$('#cab');
if(jack){S.jps++;S.pool=500;m.textContent='💎 JACKPOT!!! +'+fmt(w);m.className='msg win';c.classList.add('j');conf(120);[600,800,1000,1300].forEach((f,k)=>setTimeout(()=>beep(f,.25,'triangle'),k*150))}
else if(w>b){m.textContent='WIN +'+fmt(net);m.className='msg win';c.classList.add('w');conf(w>=b*8?70:25);beep(880,.3,'triangle')}
else{m.textContent=w?'Money back':'No luck…';m.className='msg lose';c.classList.add('l');beep(150,.3,'sawtooth')}
busy=0;$('#sb').disabled=0;hd();low();if(auto&&S.m>=M.min)setTimeout(spin,700);else auto=0},2100)}
/* ---------- ROULETTE ---------- */
const RED=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],RT=Array.from({length:30},(_,i)=>{const k=i%4,b=[{max:36,z:1},{max:36,z:2},{max:12,z:1},{max:36,z:1,vip:1}][k];return{...b,n:['European','American','Mini','VIP'][k]+' table',rep:rr(i),min:mn(1,i)*(k==3?5:1)}});
const EU=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const AMO=[0,28,9,26,30,11,7,20,32,17,5,22,34,15,3,24,36,13,1,37,27,10,25,29,12,8,19,31,18,6,21,33,16,4,23,35,14,2],MNO=[0,7,2,9,5,12,3,10,6,1,8,4,11];RT.forEach((t,i)=>t.o=[EU,AMO,MNO,EU][i%4]);
let RB={},wr=0,bang=0,rtI=0;
function wsvg(T){const o=T.o,N=o.length,st=2*Math.PI/N,c=130,pt=(r,a)=>`${(c+r*Math.sin(a)).toFixed(1)},${(c-r*Math.cos(a)).toFixed(1)}`;let g='';
o.forEach((n,i)=>{const a=(i-.5)*st,b=(i+.5)*st,col=n==0||n==37?'#17944f':RED.includes(n)?'#c8202f':'#151515';
g+=`<path d="M${pt(60,a)}L${pt(100,a)}A100 100 0 0 1 ${pt(100,b)}L${pt(60,b)}A60 60 0 0 0 ${pt(60,a)}Z" fill="${col}" stroke="#d4a017" stroke-width="1"/><text x="${c}" y="${c-88}" transform="rotate(${(i*360/N).toFixed(1)} ${c} ${c})" fill="#fff" font-size="${N>20?9:11}" font-weight="700" text-anchor="middle" font-family="Georgia">${n==37?'00':n}</text>`});
return `<svg viewBox="0 0 260 260" width=260 height=260><defs><radialGradient id=wd><stop offset=".85" stop-color="#6b3f12"/><stop offset="1" stop-color="#2d1706"/></radialGradient><radialGradient id=hb><stop offset="0" stop-color="#8a5a14"/><stop offset="1" stop-color="#3a2208"/></radialGradient></defs><circle cx=130 cy=130 r=128 fill="url(#wd)"/><circle cx=130 cy=130 r=104 fill="#2a1608" stroke="#d4a017" stroke-width="3"/>${g}<circle cx=130 cy=130 r=60 fill="url(#hb)" stroke="#d4a017" stroke-width="3"/><path d="M130 76V184M76 130H184" stroke="#f7d96b" stroke-width="5"/></svg>`}
const hit=(k,n,T)=>{const mx=T.max;if(k=='n'+n)return(mx==12?11:36)*(T.vip?1.1:1);if(n==0||n>mx)return 0;const h=mx/2,r=RED.includes(n);
return k=='red'?r&&2:k=='black'?!r&&2:k=='odd'?n%2==1&&2:k=='even'?n%2==0&&2:k=='low'?n<=h&&2:k=='high'?n>h&&2:k=='d1'?n<=12&&3:k=='d2'?n>12&&n<=24&&3:k=='d3'?n>24&&3:0};
const rsum=()=>Object.values(RB).reduce((a,b)=>a+b,0),rwin=n=>Object.entries(RB).reduce((a,[k,v])=>a+v*(hit(k,n,RT[rtI])||((n==0&&RT[rtI].z==1&&k[0]!='n'&&k[0]!='d')?.5:0)),0);
const cell=(k,l,c,st)=>`<div class="${c||''}" ${st?`style="${st}"`:''} onclick="place('${k}')">${l}${RB[k]?`<span class=ch>${RB[k]}</span>`:''}</div>`;
function rtab(){const T=RT[rtI],cols=T.max/3,nums=[],big=T.max==36;for(let r=3;r>=1;r--)for(let c=0;c<cols;c++){const n=c*3+r;nums.push(cell('n'+n,n,RED.includes(n)?'rd':'bk'))}
const zs=T.z==2?cell('n0',0,'gz',`grid-column:1/${cols/2+1}`)+cell('n37','00','gz',`grid-column:${cols/2+1}/${cols+1}`):cell('n0',0,'gz',`grid-column:1/${cols+1}`);
$('#tbl').innerHTML=`<div class=tb style="grid-template-columns:repeat(${cols},1fr)">${zs}${nums.join('')}</div><div class=ob>${(big?cell('d1','1st 12')+cell('d2','2nd 12')+cell('d3','3rd 12'):'')+cell('low',big?'1-18':'1-6')+cell('even','Even')+cell('red','Red','rd')+cell('black','Black','bk')+cell('odd','Odd')+cell('high',big?'19-36':'7-12')}</div>`;$('#tot').textContent='Total bet: '+fmt(rsum())}
function roul(){const T=RT[rtI];wr=0;bang=0;$('#mn').innerHTML=`<div class=card>${lvSel('rtbl',rtI,i=>RT[i].n,i=>RT[i].min)}</div>
<div class=gf><span class="cr a">❖</span><span class="cr b">❖</span><span class="cr c">❖</span><span class="cr d">❖</span><div class="card felt in" style=text-align:center><h2>🎡 ${T.n} Roulette</h2><div class=wrap><div class=wh id=wh>${wsvg(T)}</div><div class=bo id=bo><div class=ba id=ba></div></div><div class=rn id=rn>?</div></div><div class=msg id=msg>Place your bets</div><div id=tbl></div><div class=tag id=tot></div>${betUI('<button class=go onclick="rspin()">SPIN</button><button class=red onclick="setBet(S.m-rsum())">ALL IN chip</button><button onclick="RB={};rtab()">Clear</button>')}<div class=tag>Bet amount = chip size · straight ${T.max==12?'10:1':'35:1'}${T.vip?' (+10% VIP)':''} · dozens 2:1 · even-money 1:1${T.z==2?' · 0 and 00 beat all outside bets':''} · 0 returns half of outside bets (La Partage)</div></div></div>`;rtab();hd()}
function rtbl(i){if(busy)return;if(S.rep<RT[i].rep)return toast('Need '+RT[i].rep+' reputation');rtI=i;RB={};setBet(Math.max(bet,RT[i].min));roul()}
function place(k){if(busy)return;const c=Math.floor(bet);if(c<RT[rtI].min)return toast('Min chip '+fmt(RT[rtI].min));if(rsum()+c>S.m)return toast('Not enough cash');RB[k]=(RB[k]||0)+c;beep(600,.04);rtab()}
function rspin(){if(busy)return;const T=RT[rtI],t=rsum();if(!t)return toast('Place a bet first');busy=1;S.m-=t;accrue();hd();
const pk=()=>T.o[R(T.o.length)];let n=pk(),w=rwin(n);if(!w&&Math.random()<.03*S.lk){n=pk();w=rwin(n)}if(w>t)w=t+(w-t)*(1+.05*S.pb);
const i=T.o.indexOf(n);wr+=720+R(360);const tg=((i*360/T.o.length+wr)%360+360)%360,df=((bang-tg)%360+360)%360;bang=bang-df-1440;
$('#msg').textContent='';$('#rn').textContent='…';$('#ba').style.top='15px';$('#wh').style.transform=`rotate(${wr}deg)`;$('#bo').style.transform=`rotate(${bang}deg)`;
setTimeout(()=>$('#ba').style.top='50px',3100);const tk=setInterval(()=>beep(200+R(300),.03,'square'),170);
setTimeout(()=>{clearInterval(tk);S.m+=w;S.rl++;S.sp++;res(w-t,t);addRep(2+S.rb);$('#rn').textContent=n==37?'00':n;const m=$('#msg');
m.innerHTML=`<span style="color:${n&&n!=37?RED.includes(n)?'#ff6b78':'#fff':'#4de28a'}">${n==37?'00':n}</span> — ${w>t?'WIN +'+fmt(w-t):w?'Partial '+fmt(w):'House wins'}`;m.className='msg '+(w>t?'win':'lose');
if(w>t){conf(40);beep(880,.3,'triangle')}else beep(150,.3,'sawtooth');RB={};busy=0;hd();rtab()},4400)}
/* ---------- HORSE RACING ---------- */
const HN=['Mad Max','Hammertime','Smooth Operator','Il Predestinato','Honey Badger','Checo','The Iceman','The Professor','Magic','El Nano','Schumi','Mr. Monaco'];let HR=null;
function newRace(){const n=[...HN].sort(()=>Math.random()-.5).slice(0,6),s=n.map(()=>1+Math.random()*4),t=s.reduce((a,b)=>a+b);HR={pick:-1,h:n.map((nm,i)=>({nm,p:s[i]/t,o:Math.max(1.5,Math.round(8.8/(s[i]/t))/10)}))}}
function race(){if(!HR)newRace();$('#mn').innerHTML=`<div class="card felt" style=text-align:center><h2>🏁 Grand Prix de Madring</h2>${lvSel('trk',hl,i=>'Circuit',i=>mn(5,i))}<div class=tag>Tap a car to back it · each shows win chance % and payout odds</div><div class=trk>${HR.h.map((h,i)=>`<div class="ln ${HR.pick==i?'pk':''}" onclick="pickH(${i})"><span class=hn>${i+1}. ${h.nm} · ${(h.p*100).toFixed(0)}% · ${h.o.toFixed(1)}x</span><span class=hs id=hs${i}>🏎️</span></div>`).join('')}</div><div class=msg id=msg>${HR.pick<0?'Pick your driver':'Backing '+HR.h[HR.pick].nm}</div>${betUI('<button class=go onclick="run()">LIGHTS OUT</button><button class=red onclick="setBet(S.m);run()">ALL IN</button>')}</div>`;hd()}
function pickH(i){if(busy)return;if(HR.done)newRace();HR.pick=i;race()}
function run(){if(busy)return;if(HR.done||HR.pick<0)return toast('Pick a car first');const b=Math.floor(bet);if(b<1||b>S.m)return toast('Invalid bet');if(b<mn(5,hl))return toast('Min bet '+fmt(mn(5,hl)));busy=1;HR.done=1;S.m-=b;S.sp++;S.hr=(S.hr||0)+1;accrue();hd();
let w=0,x=Math.random(),a=0;HR.h.forEach((h,i)=>{a+=h.p;if(x>=a-h.p&&x<a)w=i});if(w!=HR.pick&&Math.random()<.03*S.lk)w=HR.pick;
const T=HR.h.map((_,i)=>i==w?9:9.6+Math.random()*2.6),t0=performance.now();$('#msg').textContent='Lights out!';document.querySelectorAll('.hs').forEach(e=>e.classList.add('go'));
const f=now=>{const t=(now-t0)/1000;HR.h.forEach((_,i)=>{const q=t>=T[i]?1:Math.max(0,Math.min(.97,t/T[i]+.05*Math.sin(t*3+i*2)*(1-t/T[i])));$('#hs'+i).style.left=`calc(${q*100}% - ${q*40}px)`});if(Math.random()<.2)beep(120+R(60),.04,'square');
t<Math.max(...T)+.3?requestAnimationFrame(f):fin(w,b)};requestAnimationFrame(f)}
function fin(w,b){const h=HR.h[w],m=$('#msg');let pw=0;if(w==HR.pick){pw=b+(b*h.o-b)*(1+.05*S.pb);S.m+=pw;m.textContent=`🏆 ${h.nm} wins! +${fmt(pw-b)}`;m.className='msg win';conf(60);beep(880,.3,'triangle')}
else{m.textContent=`${h.nm} wins — you lose ${fmt(b)}`;m.className='msg lose';beep(150,.3,'sawtooth')}res(pw-b,b);addRep(2+S.rb);busy=0;hd()}
/* ---------- BLACKJACK (solo + 2-player online) ---------- */
const ME=Math.random().toString(36).slice(2,8);let host=1,grp=null,online=0,code='',settled=-1;
let B={r:0,ph:'bet',dl:[],ps:[{id:ME,nm:'You',bt:0,h:[],s:''}],t:0,dk:[]};
const val=h=>{let t=0,a=0;h.forEach(c=>{let v=c.r>10?10:c.r;if(c.r==1){a++;v=11}t+=v});while(t>21&&a--)t-=10;return t};
const mkdk=()=>{const d=[];for(let s=0;s<4;s++)for(let r=1;r<14;r++)d.push({r,s});return d.sort(()=>Math.random()-.5)};
const draw=()=>{if(!B.dk||!B.dk.length)B.dk=mkdk();return B.dk.pop()};
function deal(){B.dk=mkdk();B.ph='play';B.dl=[draw(),draw()];B.ps.forEach(p=>{p.h=[draw(),draw()];p.s=''});B.t=-1;nxt()}
function nxt(){B.t++;while(B.t<B.ps.length&&val(B.ps[B.t].h)>=21){B.ps[B.t].s='done';B.t++}if(B.t>=B.ps.length){while(val(B.dl)<17)B.dl.push(draw());B.ph='end'}}
function hostAct(id,a,v){const p=B.ps.find(x=>x.id==id);
if(a=='join'){if(!p&&B.ps.length<4&&B.ph=='bet')B.ps.push({id,nm:v||'Guest',bt:0,h:[],s:''})}else if(!p)return;
else if(a=='bet'&&B.ph=='bet'){p.bt=v;if(B.ps.every(x=>x.bt>0))deal()}
else if(a=='hit'&&B.ph=='play'&&B.ps[B.t]==p){p.h.push(draw());if(val(p.h)>=21){p.s='done';nxt()}}
else if(a=='stand'&&B.ph=='play'&&B.ps[B.t]==p){p.s='done';nxt()}
else if(a=='new'&&B.ph=='end'){B.r++;B.ph='bet';B.dl=[];B.ps.forEach(x=>{x.bt=0;x.h=[];x.s=''});B.t=0}
sync()}
function sync(){if(grp)em({t:'st',s:{...B,dk:null}});bjr();chk()}
const send=(a,v)=>host?hostAct(ME,a,v):grp&&em({t:'act',id:ME,a,v});
function chk(){if(B.ph!='end'||settled==B.r)return;settled=B.r;const p=B.ps.find(x=>x.id==ME);if(!p||!p.bt)return;
const pt=val(p.h),dt=val(B.dl),nat=p.h.length==2&&pt==21,b=p.bt;let net=pt>21?-b:dt>21||pt>dt?(nat?b*1.5:b)*(1+.05*S.pb):pt==dt?0:-b;
if(net>0&&dt==21&&B.dl.length==2&&!nat)net=0;S.m+=b+net;S.bj++;S.sp++;res(net,b);addRep(2+S.rb);hd();
if(net>0){conf(40);beep(880,.3,'triangle')}else if(net<0)beep(150,.3,'sawtooth');setTimeout(()=>toast(net>0?'🎉 You win '+fmt(net):net<0?'You lose '+fmt(-net):'Push'),300);}
const cd=(c,h)=>h?'<div class="cd h">?</div>':`<div class="cd ${c.s%2?'r':''}">${c.r==1?'A':c.r==11?'J':c.r==12?'Q':c.r==13?'K':c.r}${'♠♥♣♦'[c.s]}</div>`;
function bjr(){if(cur!='bj'||!$('#bjb'))return;const me=B.ps.find(x=>x.id==ME),play=B.ph=='play',mine=play&&B.ps[B.t]==me;
$('#dl').innerHTML=`<div class=hand>${B.dl.map((c,i)=>cd(c,play&&i==1)).join('')}</div><div class=tag>Dealer ${B.dl.length?play?'':val(B.dl):''}</div>`;
$('#pl').innerHTML=B.ps.map((p,i)=>`<div style="${play&&B.t==i?'outline:2px solid var(--gold)':''}"><b>${p.id==ME?'You':p.nm}</b> · bet ${p.bt?fmt(p.bt):'—'}<div class=hand>${p.h.map(c=>cd(c)).join('')}</div>${p.h.length?'Total '+val(p.h)+(val(p.h)>21?' BUST':''):''}</div>`).join('');
$('#bjb').innerHTML=B.ph=='bet'?(me&&me.bt?'<span class=tag>Waiting for other player…</span>':betUI('<button class=go onclick="bjbet()">DEAL</button><button class=red onclick="setBet(S.m);bjbet()">ALL IN</button>')):play?`<button class=go ${mine?'':'disabled'} onclick="send('hit')">HIT</button><button ${mine?'':'disabled'} onclick="send('stand')">STAND</button>${mine?'':'<span class=tag>Waiting…</span>'}`:(host?'<button class=go onclick="send(\'new\')">NEXT ROUND</button>':'<span class=tag>Host starts next round</span>');
$('#ol').textContent=online?(host?'Table code: '+code+' — share the page link + this code':'Connected to table '+code):'Solo vs dealer'}
let hl=0,bl=0;function trk(i){if(busy)return;if(S.rep<rr(i)){toast('Need '+rr(i)+' rep');return race()}hl=i;setBet(Math.max(bet,mn(5,i)));race()}
function btb(i){if(S.rep<rr(i)){toast('Need '+rr(i)+' rep');return bj()}bl=i;setBet(Math.max(bet,mn(5,i)));bj()}
function bjbet(){const b=Math.floor(bet);if(b<1||b>S.m)return toast('Invalid bet');if(b<mn(5,bl))return toast('Min bet '+fmt(mn(5,bl)));send('bet',b)}
function bj(){$('#mn').innerHTML=`<div class="card felt" style=text-align:center><h2>🃏 Blackjack</h2>${lvSel('btb',bl,i=>'Table',i=>mn(5,i))}<div class=tag id=ol></div><div id=dl></div><div class=pl id=pl></div><div id=bjb class=row></div><div class=tag>Blackjack pays 3:2 · dealer stands on 17</div><div class=chat><div id=cl></div><div class=row><input id=ci placeholder='Table chat (this room only)…' style='flex:1;width:auto' onkeydown="event.key=='Enter'&&sendC()"><button class=go onclick=sendC()>Send</button></div></div></div>
<div class=card><h2>👥 Multiplayer table (up to 4)</h2><div class=row><button onclick="mk()">Create table</button><input id=cj placeholder="Code" style="width:90px"><button onclick="jn()">Join table</button><button onclick="solo()">Back to solo</button></div><div class=tag>Both players open this page link (any PC/network), one creates a table, the other enters the code. Each player uses their own cash.</div></div>`;hd();bjr()}
const em=d=>Promise.resolve(grp.emit('bj',d)).catch(e=>toast('Send failed: '+((e&&e.code)||e)));
async function link(c){try{if(typeof claude=='undefined'){toast('Online play only works on the live link, not the downloaded file');return 0}
const r=await claude.use('room');if(!r){toast('Rooms unavailable — open the live link while signed in to Claude');return 0}
const h=m=>{const d=m.data;if(!d||m.sameTab)return;if(d.t=='cm')return addC(d.n,d.x);if(host){if(d.t=='act')hostAct(d.id,d.a,d.v)}else if(d.t=='st'){B=d.s;bjr();chk()}};
try{grp=await r.join('bj-'+c);grp.on('bj',h)}catch(e){grp={emit:(t,d)=>r.emit(t,{...d,c}),on:(t,f)=>r.on(t,m=>{if(m.data&&m.data.c==c)f(m)}),leave(){}};grp.on('bj',h)}
return 1}catch(e){toast('Could not connect: '+((e&&e.code)||e));return 0}}
async function mk(){code=String(1000+R(9000));if(!await link(code))return;online=1;host=1;settled=-1;B={r:0,ph:'bet',dl:[],ps:[{id:ME,nm:S.nm||'Host',bt:0,h:[],s:''}],t:0,dk:[]};sync()}
async function jn(){const c=$('#cj').value.trim();if(!c)return;if(!await link(c))return;code=c;online=1;host=0;B={r:0,ph:'bet',dl:[],ps:[],t:0};settled=-1;em({t:'act',id:ME,a:'join',v:S.nm||'Guest'});bjr();toast('Joined — waiting for host')}
function solo(){if(grp){try{grp.leave()}catch(e){}}grp=null;online=0;host=1;settled=-1;B={r:0,ph:'bet',dl:[],ps:[{id:ME,nm:'You',bt:0,h:[],s:''}],t:0,dk:[]};bj()}
/* ---------- BANK / SHOP / STATS ---------- */
const BK=[{k:'st',n:'🏦 True Stein Bank',d:'Reliable all-rounder: 20% fee, 0.3% interest per spin.',fee:.2,r:.003,cap:()=>limit(),rep:0},
{k:'ln',n:'🦈 Lenny’s Quick Cash',d:'Huge limit, no questions — but 50% fee and 1% interest per spin.',fee:.5,r:.01,cap:()=>limit()*3,rep:0},
{k:'cu',n:'🤝 Gambler’s Credit Union',d:'Cheap: 5% fee, 0.15% per spin. Small limit, needs 50 rep.',fee:.05,r:.0015,cap:()=>limit()*.5,rep:50},
{k:'of',n:'🏝️ Offshore Vault',d:'0% fee, 0.2% per spin, big limit — needs 200 rep and only one loan at a time.',fee:0,r:.002,cap:()=>limit()*2,rep:200,one:1}];
const sumd=()=>S.d=Object.values(S.db).reduce((a,b)=>a+b,0);
function accrue(){BK.forEach(b=>{if(S.db[b.k]>0)S.db[b.k]*=1+b.r});S.sv=(S.sv||0)*1.004;sumd()}
function bank(){sumd();$('#mn').innerHTML=`<div class=card><h2>Banks</h2><p class=tag>Total debt: <b style="color:#ff7a85">${fmt(S.d)}</b> · interest is charged every spin, round and race. Enter an amount, then choose a bank.</p><div class=row><input id=ln type=number placeholder="Amount" value=1000></div>${BK.map(b=>{const dt=S.db[b.k]||0;return`<div class=it><div><b>${b.n}</b><small>${b.d}</small><small>Owed ${fmt(dt)} · limit ${fmt(b.cap())}</small></div><div class=row>${S.rep<b.rep?'<span class=tag>🔒 '+b.rep+' rep</span>':`<button class=go onclick="borrow('${b.k}')">Borrow</button><button onclick="repay('${b.k}')">Repay</button>`}</div></div>`}).join('')}
<div class=it><div><b>🔐 Vault Savings</b><small>Earns 0.4% every spin/round/race. 3% withdrawal fee.</small><small>Saved ${fmt(S.sv||0)}</small></div><div class=row><button class=go onclick="sav(1)">Deposit</button><button onclick="sav(0)">Withdraw</button></div></div></div>
<div class=card><h2>🎁 Daily bonus</h2><button class=go onclick="daily()">Claim ${fmt(5000+S.rep*50)}</button> <span class=tag>once every 24h</span></div>`;hd()}
const amt=()=>Math.floor(+$('#ln').value);
function borrow(k){const b=BK.find(x=>x.k==k),a=amt();if(!(a>0))return;if(b.one&&S.db[k]>0)return toast('Repay this bank first');const f=Math.round(a*(1+b.fee));if((S.db[k]||0)+f>b.cap())return toast('Over this bank’s limit');S.m+=a;S.db[k]=(S.db[k]||0)+f;toast('Borrowed '+fmt(a)+' — owe '+fmt(f));bank()}
function repay(k){const p=Math.min(amt(),S.db[k]||0,S.m);if(!(p>0))return toast('Nothing to repay');S.m-=p;S.db[k]-=p;if(S.db[k]<1)S.db[k]=0;bank()}
function sav(d){const a=amt();if(!(a>0))return;if(d){if(a>S.m)return toast('Not enough cash');S.m-=a;S.sv=(S.sv||0)+a}else{const w=Math.min(a,S.sv||0);S.sv-=w;S.m+=w*.97}bank()}
function daily(){if(Date.now()-S.bonus<864e5)return toast('Come back later');S.bonus=Date.now();S.m+=5000+S.rep*50;conf(30);bank()}
const QG=[['Spin or play {n} rounds',()=>S.sp,[25,100,500,2000,10000]],['Win {n} rounds',()=>S.w,[10,50,250,1000]],['Play {n} roulette spins',()=>S.rl,[10,50,200]],['Run {n} Grand Prix races',()=>S.hr||0,[5,25,100]],['Play {n} blackjack hands',()=>S.bj,[5,25,100]],['Hit {n} jackpot(s)',()=>S.jps,[1,3,10]],['Win {n} in a single round',()=>S.bw,[1000,50000,1000000],1],['Own {n} luxury item(s)',()=>S.own.length,[1,4,8,16]],['Reach a net worth of {n}',worth,[10000,100000,1000000,10000000],1]];
const QS=[];QG.forEach((g,gi)=>g[2].forEach((n,t)=>QS.push({id:gi+'.'+t,t:g[0].replace('{n}',g[3]?fmt(n):f0(n)),get:g[1],goal:n,rep:10+t*15+gi,cash:(10+t*15)*200})));
function quests(){const k=q=>S.q.includes(q.id)?2:q.get()>=q.goal?0:1;$('#mn').innerHTML=`<div class=card><h2>📜 Quests</h2><p class=tag>Finish quests to earn reputation and cash. ${S.q.length}/${QS.length} done.</p>${QS.slice().sort((a,b)=>k(a)-k(b)).map(q=>{const v=Math.min(q.get(),q.goal),ok=v>=q.goal,cl=S.q.includes(q.id);return`<div class="it q ${cl?'cl':''}"><div style=flex:1><b>${q.t}</b><small>Reward: +${q.rep} rep · ${fmt(q.cash)}</small><div class=bar><span class=fl style="width:${v/q.goal*100}%"></span></div><small>${f0(v)} / ${f0(q.goal)}</small></div>${cl?'<span class=win>✔ Done</span>':`<button class="${ok?'go':''}" ${ok?'':'disabled'} onclick="claimQ('${q.id}')">Claim</button>`}</div>`}).join('')}</div>`;hd()}
function claimQ(id){const q=QS.find(x=>x.id==id);if(S.q.includes(id)||q.get()<q.goal)return;S.q.push(id);S.m+=q.cash;addRep(q.rep);conf(50);beep(880,.3,'triangle');quests()}
function shop(){const o=[['Net worth',fmt(worth())],['Rank',rank()+' ('+S.rep+' rep)'],['Rounds played',f0(S.sp)],['Wins',f0(S.w)],['Biggest win',fmt(S.bw)],['Jackpots',S.jps],['Roulette spins',S.rl],['Blackjack hands',S.bj],['Horse races',S.hr||0],['Total won',fmt(S.won)],['Total lost',fmt(S.lost)],['Passive income',fmt(inc())+' /10s']];
$('#mn').innerHTML=`<div class=card><h2>👤 Profile</h2><div class=sg>${o.map(r=>`<div class=sc><small>${r[0]}</small><b>${r[1]}</b></div>`).join('')}</div></div><div class=card><h2>💎 Luxury Store</h2><div class=tag>Owned items pay passive income every 10s and add to your net worth.</div>${ITEMS.map((t,i)=>[t,i]).sort((a,b)=>a[0][2]-b[0][2]).map(([t,i])=>`<div class=it><div>${t[0]} <b>${t[1]}</b><small>+${fmt(t[3])} / 10s</small></div>${S.own.includes(i)?'<span class=win>OWNED</span>':`<button ${S.m<t[2]?'disabled':''} onclick="buy(${i})">${fmt(t[2])}</button>`}</div>`).join('')}</div><div class=row><button class=red onclick="if(confirm('Reset all progress?')){S={...DEF,own:[],db:{},q:[]};save();go('home')}">Reset game</button></div>`;hd()}
function buy(i){if(S.m<ITEMS[i][2])return;S.m-=ITEMS[i][2];S.own.push(i);conf(40);beep(700,.2,'triangle');toast('Bought '+ITEMS[i][1]+'!');shop()}
const unl=()=>MA.filter((m,i)=>S.rep>=rr(i)).length;
function home(){const u=unl(),G=[['slots','🎰','Slots','30 themed machines with a progressive jackpot'],['roul','🎡','Roulette','30 tables · real wheel, real ball'],['race','🐎','Horse Racing','30 tracks · back your favourite'],['bj','🃏','Blackjack','Solo or 2-player online'],['bank','🏦','Banks','Loans, savings & daily bonus'],['quests','📜','Quests','Earn reputation and cash'],['shop','💎','Shop & Profile','Luxury items and your stats']];
$('#mn').innerHTML=`<div class=hero><h2>The High-Roller Lounge</h2><p>${rank()} · ${u}/30 levels unlocked</p></div><div class=gm>${G.map((g,i)=>`<div class="tile g${i+1}" style="--d:${i*.07}s" onclick="go('${g[0]}')"><div class=ti>${g[1]}</div><h3>${g[2]}</h3><p>${g[3]}</p>${i<4?`<div class=bar><span class=fl style="width:${u/30*100}%"></span></div><small>${u}/30 levels open</small>`:''}</div>`).join('')}</div>`;hd()}
const T={home,slots,roul,race,bj,bank,quests,shop};
function go(t){if(busy)return toast('Wait for the round to finish');cur=t;auto=0;scrollTo({top:0});const m=$('#mn');m.classList.remove('pg');void m.offsetWidth;m.classList.add('pg');T[t]()}
function showWarn(){if($('.ov'))return;const o=document.createElement('div');o.className='ov';o.innerHTML='<div class=wb><div style="font-size:46px">⚠️</div><h2>Play responsibly</h2><p>Gambling can be addictive and harmful. Casino de Madring is a free game with pretend money — you cannot win or lose real money here. If gambling is causing problems for you or someone you know, please reach out to a local support service. 18+ only. Take regular breaks.</p><button class=go onclick="this.closest(\'.ov\').remove()">I understand</button></div>';document.body.append(o)}
for(let k=0;k<18;k++){const e=document.createElement('div'),z=3+R(6);e.className='pp';e.style.cssText=`left:${R(100)}vw;width:${z}px;height:${z}px;animation-duration:${8+R(14)}s;animation-delay:-${R(20)}s`;document.body.append(e)}
document.addEventListener('mousemove',e=>{const t=e.target.closest&&e.target.closest('.tile');if(!t)return;const r=t.getBoundingClientRect();t.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*10+'deg');t.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*10+'deg')});
document.addEventListener('mouseout',e=>{const t=e.target.closest&&e.target.closest('.tile');if(t){t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')}});
setInterval(showWarn,18e5);
addEventListener('keydown',e=>{if(e.code=='Space'&&cur=='slots'&&e.target.tagName!='INPUT'){e.preventDefault();spin()}});
setInterval(()=>{if(S.own.length){S.m+=inc();hd()}},10000);

const PT=['rb','cl','pb','lk'],PL={rb:'Rep bonus',cl:'Credit limit',pb:'Payout bonus',lk:'Luck'},pv=i=>1+(i>>2);
function perk(){S.rb=S.cl=S.pb=S.lk=0;S.own.forEach(i=>S[PT[i%4]]+=pv(i))}perk();
function applyAc(){document.documentElement.style.setProperty('--gold',S.ac||'#e8c26a')}applyAc();
function pop(t,b,bt='Nice!'){const o=document.createElement('div');o.className='ov';o.innerHTML=`<div class=wb><h2>${t}</h2>${b}<button class=go onclick="this.closest('.ov').remove()">${bt}</button></div>`;document.body.append(o)}
const AH=[['🥉','First Spin',()=>S.sp>=1],['🎰','Spin Doctor',()=>S.sp>=100],['💎','Jackpot!',()=>S.jps>=1],['🎡','Roulette Pro',()=>S.rl>=50],['🃏','Card Shark',()=>S.bj>=25],['🏁','Pole Sitter',()=>(S.hr||0)>=25],['💰','Millionaire',()=>worth()>=1e6],['🏆','Big Win',()=>S.bw>=100000],['🚗','Collector',()=>S.own.length>=5],['👑','Legend',()=>S.rep>=2000],['🔥','Hot Streak',()=>S.w>=250],['🏝️','Tycoon',()=>S.own.length>=12]];
function chA(){if(!window.U)return;S.ach=S.ach||[];AH.forEach((a,i)=>{if(!S.ach.includes(i)&&a[2]()){S.ach.push(i);pop('🏆 Trophy unlocked',`<div style=font-size:72px>${a[0]}</div><h3>${a[1]}</h3>`);conf(40);beep(990,.3,'triangle')}})}setInterval(chA,3000);
function fly(net){if(!net)return;const w=net>0,n=Math.min(16,4+Math.abs(net)/Math.max(1,bet)|0),c=$('#cs'),r=c?c.getBoundingClientRect():{left:innerWidth/2,top:10},f=document.createElement('div');
f.className='ft '+(w?'w':'l');f.textContent=(w?'+':'−')+fmt(Math.abs(net));f.style.cssText='left:50%;top:38%';document.body.append(f);setTimeout(()=>f.remove(),1900);
for(let k=0;k<n;k++){const e=document.createElement('div'),sx=innerWidth/2+R(140)-70,sy=innerHeight*.5+R(60);e.className='fc';e.style.cssText=w?`left:${sx}px;top:${sy}px;--tx:${r.left-sx}px;--ty:${r.top-sy}px;animation:fw .9s ${k*.06}s ease-in both`:`left:${r.left+R(60)}px;top:${r.top}px;--tx:${R(160)-80}px;--ty:${innerHeight*.5}px;animation:fl 1s ${k*.05}s ease-in both`;document.body.append(e);setTimeout(()=>e.remove(),2200)}}
function res(net,b){S.w+=net>0;S.bw=Math.max(S.bw,net);net>0?S.won+=net:S.lost-=net;fly(net);if(net>0&&net>=b*10)pop('💰 BIG WIN',`<div class=big>+${fmt(net)}</div>`,'Collect');chA()}
const _hd=hd;hd=function(){_hd();$('#hd').insertAdjacentHTML('afterbegin',`<span class=pf onclick="go('profile')">${S.av||'😎'} ${S.nm||'Player'}</span>`)};
function shop(){$('#mn').innerHTML=`<div class=card><h2>💎 Luxury Store & Perks</h2><div class=tag>Every item pays passive income and gives a permanent perk. Active: Luck ${S.lk} · Payout +${S.pb*5}% · Rep +${S.rb}/round · Credit +${fmt(S.cl*2000)}</div>${ITEMS.map((t,i)=>[t,i]).sort((a,b)=>a[0][2]-b[0][2]).map(([t,i])=>`<div class=it><div>${t[0]} <b>${t[1]}</b><small>+${fmt(t[3])} / 10s · ${PL[PT[i%4]]} ${pv(i)}</small></div>${S.own.includes(i)?'<span class=win>OWNED</span>':`<button ${S.m<t[2]?'disabled':''} onclick="buy(${i})">${fmt(t[2])}</button>`}</div>`).join('')}</div>`;hd()}
function buy(i){if(S.m<ITEMS[i][2])return;S.m-=ITEMS[i][2];S.own.push(i);perk();conf(40);beep(700,.2,'triangle');pop('🛍️ Purchased',`<div style=font-size:72px>${ITEMS[i][0]}</div><h3>${ITEMS[i][1]}</h3><p>Perk: ${PL[PT[i%4]]} ${pv(i)}</p>`);chA();shop()}
const AV=['😎','🤠','🦊','👑','🐲','🎩','💎','🦁'],AK=['#e8c26a','#38bdf8','#f472b6','#4ade80','#c084fc','#fb923c'];
function profile(){const o=[['Net worth',fmt(worth())],['Rank',rank()],['Rounds',f0(S.sp)],['Wins',f0(S.w)],['Biggest win',fmt(S.bw)],['Jackpots',S.jps],['Won',fmt(S.won)],['Lost',fmt(S.lost)],['Trophies',(S.ach||[]).length+'/'+AH.length]];
$('#mn').innerHTML=`<div class=card style=text-align:center><h2>👤 Profile</h2><div class=row><div class=avb>${S.av||'😎'}</div></div><div class=row><input value="${S.nm||'Player'}" maxlength=14 oninput="S.nm=this.value;save()"></div><div class=row>${AV.map(a=>`<button onclick="S.av='${a}';profile()">${a}</button>`).join('')}</div><div class=row>${AK.map(c=>`<button style="background:${c};width:34px;height:34px;padding:0" onclick="S.ac='${c}';applyAc();profile()"></button>`).join('')}</div><div class=sg>${o.map(r=>`<div class=sc><small>${r[0]}</small><b>${r[1]}</b></div>`).join('')}</div><div class=row><button class=red onclick="if(confirm('Reset all progress?')){S={...DEF,own:[],db:{},q:[]};perk();save();go('home')}">Reset game</button></div></div>`;hd()}
function trophy(){$('#mn').innerHTML=`<div class=card><h2>🏆 Trophy Room</h2><div class=sg>${AH.map((a,i)=>`<div class="tr ${(S.ach||[]).includes(i)?'':'lk'}"><span>${a[0]}</span><b>${a[1]}</b></div>`).join('')}</div></div>`;hd()}
function home(){const u=unl(),G=[['slots','🎰','Slots','30 machines · progressive jackpot'],['roul','🎡','Roulette','Drop chips on the table'],['race','🐎','Horses','30 tracks'],['bj','🃏','Blackjack','Solo or 2-player + chat'],['bank','🏦','Banks','Loans & savings'],['quests','📜','Quests','Rep and cash'],['shop','💎','Store & Perks','Items with perks'],['trophy','🏆','Trophies','Achievements'],['profile','👤','Profile','Avatar & colors']];
$('#mn').innerHTML=`<div class=hero><h2>The High-Roller Lounge</h2><p>${S.av||'😎'} ${S.nm||'Player'} · ${rank()} · ${u}/30 levels</p></div><div class=gm>${G.map((g,i)=>`<div class="tile g${i+1}" style="--d:${i*.05}s" onclick="go('${g[0]}')"><div class=ti>${g[1]}</div><h3>${g[2]}</h3><p>${g[3]}</p></div>`).join('')}</div>`;hd()}
const _rt=rtab;rtab=function(){_rt();$('#tbl').insertAdjacentHTML('beforeend',`<div class=row>${[1,5,25,100].map(v=>`<button onclick="setBet(${v}*RT[rtI].min)">Chip ×${v}</button>`).join('')}</div>`)};
let CH=[];const esc=x=>String(x).replace(/[<>&]/g,'');
function rC(){const l=$('#cl');if(l){l.innerHTML=CH.map(c=>`<div class="cmsg ${c[2]?'me':''}"><b>${esc(c[0])}</b> ${esc(c[1])}</div>`).join('');l.scrollTop=1e9}}
function addC(n,x,me){CH.push([n,x,me]);if(CH.length>60)CH.shift();rC()}
function sendC(){const i=$('#ci'),x=i.value.trim().slice(0,200);if(!x)return;if(!online)return toast('Create or join a table to chat');i.value='';const n=S.nm||'Player';addC(n,x,1);em({t:'cm',n,x})}
const _bj=bj;bj=function(){_bj();rC()};
Object.assign(T,{home,shop,profile,trophy,bj});chA();
/* ---- MINES ---- */
let MN=null;const mul=m=>{let x=.97;for(let i=0;i<m.k;i++)x*=(25-i)/(25-m.n-i);return x};
function mines(){const m=MN||{};$('#mn').innerHTML=`<div class="card felt" style=text-align:center><h2>💣 Monaco Mines</h2><div class=tag>Reveal gems, dodge mines, cash out any time. More mines = bigger multipliers.</div><div class=row>Mines <select id=mc ${m.on?'disabled':''}>${[1,3,5,10,15].map(n=>`<option ${n==(m.n||3)?'selected':''}>${n}</option>`).join('')}</select></div><div class=mg>${Array.from({length:25},(_,i)=>`<button class="mt ${m.r&&m.r[i]?m.b[i]?'bm':'gm2':''}" onclick="mpick(${i})">${m.r&&m.r[i]?m.b[i]?'💣':'💎':''}</button>`).join('')}</div><div class=msg id=msg>${m.on?'×'+mul(m).toFixed(2)+' · next gem ×'+(mul({...m,k:m.k+1})).toFixed(2):m.msg||'Place your bet'}</div>${m.on?`<button class=go onclick="mcash()">CASH OUT ${fmt(m.bt*mul(m))}</button>`:betUI('<button class=go onclick="mstart()">START</button>')}</div>`;hd()}
function mstart(){const b=Math.floor(bet),n=+$('#mc').value;if(b<1||b>S.m)return toast('Invalid bet');S.m-=b;accrue();const bm=Array(25).fill(0);let k=0;while(k<n){const i=R(25);if(!bm[i]){bm[i]=1;k++}}MN={on:1,n,bt:b,b:bm,r:[],k:0};mines()}
function mpick(i){const m=MN;if(!m||!m.on||m.r[i])return;m.r[i]=1;if(m.b[i]){m.on=0;m.r=m.b.map(()=>1);m.msg='💥 Boom — you lose '+fmt(m.bt);S.sp++;res(-m.bt,m.bt);addRep(2+S.rb);beep(150,.4,'sawtooth')}else{m.k++;beep(600+m.k*40,.1,'triangle');if(m.k==25-m.n)return mcash()}mines()}
function mcash(){const m=MN;if(!m||!m.on||!m.k)return toast('Reveal a gem first');m.on=0;let w=m.bt*mul(m);w=m.bt+(w-m.bt)*(1+.05*S.pb);S.m+=w;S.sp++;m.r=m.b.map(()=>1);m.msg='💰 Cashed out +'+fmt(w-m.bt);res(w-m.bt,m.bt);addRep(2+S.rb);conf(40);beep(880,.3,'triangle');mines()}
/* ---- BACCARAT ---- */
const bvl=h=>h.reduce((a,c)=>a+(c.r>9?0:c.r),0)%10;let BC={p:[],b:[],msg:'Choose a side and deal',side:''};
function bacc(){const h=(x,l)=>`<div><b>${l}</b> ${x.length?bvl(x):''}<div class=hand>${x.map(c=>cd(c)).join('')}</div></div>`;$('#mn').innerHTML=`<div class="card felt" style=text-align:center><h2>🎴 Baccarat Royale</h2><div class=pl>${h(BC.p,'Player')}${h(BC.b,'Banker')}</div><div class=msg id=msg>${BC.msg}</div><div class=tag>Player 1:1 · Banker 0.95:1 · Tie 8:1</div>${betUI('<button class=go onclick="bdeal(\'p\')">PLAYER</button><button class=go onclick="bdeal(\'b\')">BANKER</button><button onclick="bdeal(\'t\')">TIE</button>')}</div>`;hd()}
function bdeal(side){if(busy)return;const b=Math.floor(bet);if(b<1||b>S.m)return toast('Invalid bet');busy=1;S.m-=b;accrue();hd();const dk=mkdk(),d=()=>dk.pop(),p=[d(),d()],k=[d(),d()];let p3=-1;
if(bvl(p)<8&&bvl(k)<8){if(bvl(p)<=5){p.push(d());p3=p[2].r>9?0:p[2].r}const v=bvl(k),t=p3<0?v<=5:v<=2||v==3&&p3!=8||v==4&&p3>=2&&p3<=7||v==5&&p3>=4&&p3<=7||v==6&&(p3==6||p3==7);if(t)k.push(d())}
const seq=[[1,0],[1,1],[2,0],[2,1],[3,0],[3,1]].filter(([n,w])=>(w?k:p).length>=n);BC={p:[],b:[],msg:'…',side};bacc();
seq.forEach(([n,w],i)=>setTimeout(()=>{(w?BC.b:BC.p).push((w?k:p)[n-1]);beep(500,.05);bacc();$('#msg').textContent='…'},500*(i+1)));
setTimeout(()=>{const a=bvl(p),c=bvl(k),r=a>c?'p':c>a?'b':'t';let w=0;if(side==r)w=b*(r=='p'?2:r=='b'?1.95:9);else if(r=='t'&&side!='t')w=b;if(w>b)w=b+(w-b)*(1+.05*S.pb);S.m+=w;S.sp++;busy=0;res(w-b,b);addRep(2+S.rb);BC.msg=(r=='t'?'Tie':r=='p'?'Player wins':'Banker wins')+` ${a}–${c} · `+(w>b?'You win +'+fmt(w-b):w==b?'Push':'You lose '+fmt(b));bacc();$('#msg').className='msg '+(w>b?'win':'lose');if(w>b){conf(40);beep(880,.3,'triangle')}else if(w<b)beep(150,.3,'sawtooth')},500*(seq.length+2))}
/* ---- HOME ---- */
function home(){const u=unl(),G=[['slots','🎰','Slots','30 themed machines'],['roul','🎡','Roulette','Chips on the felt'],['bj','🃏','Blackjack','Multiplayer & chat'],['bacc','🎴','Baccarat','Punto Banco'],['mines','💣','Mines','Gems or bombs'],['race','🏎️','F1 Grand Prix','30 circuits'],['bank','🏦','Banque','Loans & vault'],['quests','📜','Quests','Rep & cash'],['shop','💎','Boutique','Items with perks'],['trophy','🏆','Trophies','Achievements'],['profile','👤','Profile','Make it yours'],['crash','🚀','Crash','Cash out in time'],['bar','🍸','Le Bar','Drinks… and consequences'],['msg','✉️','Messages','Chat with accounts']];
$('#mn').innerHTML=`<div class=hero><div class=sc2>Bienvenue</div><h2 style="font-size:clamp(18px,4vw,28px);margin:0">Casino de Madring</h2><div class=orn></div><p>${S.av||'😎'} ${S.nm||'Player'} · ${rank()} · ${u}/30 levels</p></div><div class=tk><span>${'⚜ MONTE-CARLO ✦ SOIRÉE DE GALA ✦ FAITES VOS JEUX ✦ RIEN NE VA PLUS ✦ '.repeat(8)}</span></div><div class=gm>${G.map((g,i)=>`<div class="tile g${i%9+1}" style="--d:${i*.06}s" onclick="go('${g[0]}')"><div class=ti>${g[1]}</div><h3>${g[2]}</h3><p>${g[3]}</p></div>`).join('')}</div>`;hd()}
/* ---- BLACKJACK MULTIPLAYER (robust sync) ---- */
async function link(c){try{if(typeof claude=='undefined'){toast('Online play only works on the published link');return 0}const r=await claude.use('room');if(!r){toast('Open the published link while signed in to Claude');return 0}
grp=await r.join('cdm-'+c);grp.on('bj',m=>{const d=m.data;if(!d||m.sameTab)return;if(d.t=='cm')return addC(d.n,d.x);if(host){if(d.t=='act')hostAct(d.id,d.a,d.v)}else if(d.t=='st'&&d.c==code){B=d.s;bjr();chk()}},e=>toast('Room error: '+e.code));grp.onPeers(()=>bjr());grp.onConnection(()=>bjr());return 1}catch(e){toast(e&&e.code=='not_permitted'?'Not allowed — ask the owner for Contributor access':'Could not connect: '+((e&&e.code)||e));return 0}}
function sync(){if(grp)em({t:'st',c:code,s:{...B,dk:null}});bjr();chk()}
setInterval(()=>{if(!online||!grp)return;if(host)em({t:'st',c:code,s:{...B,dk:null}});else if(!B.ps.some(p=>p.id==ME))em({t:'act',id:ME,a:'join',v:S.nm||'Guest'})},1500);
const _bjr=bjr;bjr=function(){_bjr();const e=$('#ol');if(e&&online&&grp)e.textContent+=(grp.connected()?' · 🟢 live':' · 🔴 reconnecting')+' · '+B.ps.length+'/4 seated'};
Object.assign(T,{home,mines,bacc});


/* ---- ACCOUNTS ---- */
const UK='cdm_users',SK='cdm_sess',gu=()=>{try{return JSON.parse(localStorage.getItem(UK)||'{}')}catch(e){return{}}};
async function hs(p,salt){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=0;for(const c of salt+p)h=(h*31+c.charCodeAt(0))|0;return'f'+h}}
function loadU(u){window.U=u;let d={};try{d=JSON.parse(localStorage.getItem('cts_'+u)||'{}')}catch(e){}S={...DEF,...d};S.db={...(S.db||{})};S.own=[...S.own];S.q=[...(S.q||[])];if(u!='guest'&&!d.nm)S.nm=u;perk();applyAc();dv=S.m}
function enter(u){loadU(u);const a=$('#auth');a&&a.remove();CH=[];dmInit();go('home');showWarn()}
const amsg=t=>{$('#am').textContent=t};
async function doAuth(reg){const u=$('#au').value.trim().toLowerCase(),p=$('#ap').value,us=gu();if(!/^[a-z0-9_]{3,14}$/.test(u))return amsg('Username: 3-14 letters, numbers or _');if(p.length<4)return amsg('Password needs 4+ characters');
if(reg){if(us[u])return amsg('That name is taken');const s=Math.random().toString(36).slice(2);us[u]={s,h:await hs(p,s)};if(Object.keys(us).length==1&&localStorage.getItem('cts'))localStorage.setItem('cts_'+u,localStorage.getItem('cts'));localStorage.setItem(UK,JSON.stringify(us))}
else if(!us[u]||us[u].h!=await hs(p,us[u].s))return amsg('Wrong username or password');
try{$('#ar').checked?localStorage.setItem(SK,u):sessionStorage.setItem(SK,u)}catch(e){}enter(u)}
function guestIn(){try{sessionStorage.setItem(SK,'guest')}catch(e){}enter('guest')}
function logout(){save();try{localStorage.removeItem(SK);sessionStorage.removeItem(SK)}catch(e){}location.reload()}
function authUI(){const o=document.createElement('div');o.className='ov';o.id='auth';o.innerHTML=`<div class=wb style="max-width:380px;width:100%"><div class=sc2 style="font-size:56px">Bienvenue</div><h3 style="margin:0">Casino de Madring</h3><div class=orn></div><input id=au placeholder=Username autocomplete=username style="width:100%;margin:5px 0"><input id=ap type=password placeholder=Password autocomplete=current-password onkeydown="event.key=='Enter'&&doAuth(0)" style="width:100%;margin:5px 0"><label class=tag><input id=ar type=checkbox checked style="width:auto"> Remember me on this device</label><div class=msg id=am style="font-size:14px;min-height:22px;color:#ff7a85"></div><div class=row><button class=go onclick="doAuth(0)">Log in</button><button onclick="doAuth(1)">Register</button></div><button onclick="guestIn()">Continue as guest</button><p class=tag>Accounts are saved on this device only.</p></div>`;document.body.append(o)}
const _pr=profile;profile=function(){_pr();$('#mn .card').insertAdjacentHTML('beforeend',`<div class=row><button onclick=logout()>Log out (${window.U})</button></div>`)};Object.assign(T,{profile});
function boot(){const u=localStorage.getItem(SK)||sessionStorage.getItem(SK);u&&(u=='guest'||gu()[u])?enter(u):authUI()}

/* ---- CRASH ---- */
let CR=null;
function crash(){const c=CR||{};$('#mn').innerHTML=`<div class="card felt" style=text-align:center><h2>🚀 Crash</h2><svg viewBox="0 0 300 150" style="width:100%;max-width:420px;background:#0007;border-radius:14px"><polyline id=cp fill=none stroke="#d4af37" stroke-width=3 points="${(c.pts||[]).join(' ')}"/></svg><div class="big ${c.cl||''}" id=cm>${c.on?(c.m||1).toFixed(2)+'×':c.msg||'1.00×'}</div><div class=tag>Cash out before it crashes. Auto cash-out is the number on the left.</div>${betUI(`<input id=ca type=number step=.1 value=${c.au||2} style="width:80px"><button class=go onclick="${c.on?'ccash()':'cstart()'}">${c.on?'CASH OUT':'LAUNCH'}</button>`)}</div>`;hd()}
function cstart(){if(busy)return;const b=Math.floor(bet);if(b<1||b>S.m)return toast('Invalid bet');busy=1;S.m-=b;accrue();S.sp++;hd();CR={on:1,b,cp:Math.max(1,.97/(1-Math.random())),au:+$('#ca').value||0,t0:performance.now(),pts:[],m:1};crash();loopC()}
function loopC(){const c=CR;if(!c||!c.on)return;const t=(performance.now()-c.t0)/1000,m=Math.exp(.1*t+.012*t*t);if(m>=c.cp)return cend(0,c.cp);if(c.au>1&&m>=c.au)return cend(1,c.au);c.m=m;c.pts.push(`${Math.min(295,t*16).toFixed(1)},${(145-Math.min(140,Math.log(m)*50)).toFixed(1)}`);const e=$('#cm'),p=$('#cp');if(e)e.textContent=m.toFixed(2)+'×';if(p)p.setAttribute('points',c.pts.join(' '));requestAnimationFrame(loopC)}
const ccash=()=>CR&&CR.on&&cend(1,CR.m||1);
function cend(w,m){const c=CR;c.on=0;busy=0;if(w){let x=c.b*m;x=c.b+(x-c.b)*(1+.05*S.pb);S.m+=x;res(x-c.b,c.b);c.msg='💰 Cashed out at '+m.toFixed(2)+'× +'+fmt(x-c.b);c.cl='win';conf(40);beep(880,.3,'triangle')}else{res(-c.b,c.b);c.msg='💥 Crashed at '+m.toFixed(2)+'×';c.cl='lose';beep(150,.4,'sawtooth')}addRep(2+S.rb);if(cur=='crash')crash();else hd()}
/* ---- BAR / DRUNK ---- */
let DR=0;const DK=[['🍸','Martini',120,1],['🥂','Champagne',250,1],['🥃','Whisky',150,1.2],['🍹','Mojito',100,.8],['🍷','Vintage Red',400,1.5],['💧','Water',0,-2]];
function drunk(n){DR=Math.max(0,Math.min(12,DR+n));document.body.classList.toggle('dr',DR>=1);document.body.style.setProperty('--dr',DR);document.body.style.setProperty('--bl',DR>=4?(DR-3)*.2+'px':'0px')}
setInterval(()=>drunk(-.05),5000);
document.addEventListener('mousemove',e=>{document.querySelectorAll('button:not(.nodg)').forEach(b=>{if(DR<3||b.closest('.ov')){if(b.style.translate)b.style.translate='';return}const r=b.getBoundingClientRect(),dx=r.left+r.width/2-e.clientX,dy=r.top+r.height/2-e.clientY,d=Math.hypot(dx,dy)||1,lim=50+DR*9;b.style.translate=d<lim?`${dx/d*(Math.min(DR*10,110)*(1-d/lim)+8)+(Math.random()-.5)*DR*2}px ${dy/d*(Math.min(DR*10,110)*(1-d/lim)+8)+(Math.random()-.5)*DR*2}px`:''})});
function bar(){$('#mn').innerHTML=`<div class=card><h2>🍸 Le Bar</h2><p class=tag>Drunk level ${DR.toFixed(1)} / 12. A few drinks and the buttons start dodging your mouse; it gets worse with every glass. Water sobers you up.</p>${DK.map((d,i)=>`<div class=it><div>${d[0]} <b>${d[1]}</b></div><button class="${d[2]?'':'nodg'}" onclick="drink(${i})">${d[2]?fmt(d[2]):'Free'}</button></div>`).join('')}</div>`;hd()}
function drink(i){const d=DK[i];if(S.m<d[2])return toast('Not enough cash');S.m-=d[2];drunk(d[3]);addRep(1);toast(d[3]>0?['Santé! 🥂','Cheers!','*hic*'][R(3)]:'Refreshing 💧');bar()}
/* ---- MESSAGES ---- */
const DMK='cdm_dm',gm=()=>{try{return JSON.parse(localStorage.getItem(DMK)||'[]')}catch(e){return[]}};let DMT='';
function dmAdd(m){const a=gm();if(a.some(x=>x.id==m.id))return;a.push(m);try{localStorage.setItem(DMK,JSON.stringify(a.slice(-300)))}catch(e){}if(cur=='msg')msgs()}
async function dmInit(){try{if(typeof claude=='undefined')return;const r=await claude.use('room');if(r)r.on('dm',m=>{const d=m.data;if(d&&d.t==window.U&&!m.sameTab&&window.U!='guest')dmAdd(d)})}catch(e){}}
function msgs(){if(window.U=='guest'){$('#mn').innerHTML='<div class=card><h2>✉️ Messages</h2><p>Log in with an account to send messages.</p></div>';return hd()}
const me=window.U,us=Object.keys(gu()).filter(u=>u!=me),v=($('#mi')||{}).value||'',th=gm().filter(m=>m.f==me&&m.t==DMT||m.t==me&&m.f==DMT);
$('#mn').innerHTML=`<div class=card><h2>✉️ Messages</h2><div class=row><input list=ul placeholder="Send to username" value="${esc(DMT)}" style="width:170px" onchange="DMT=this.value.trim().toLowerCase();msgs()"><datalist id=ul>${us.map(u=>`<option>${u}</option>`).join('')}</datalist></div><div class=chat><div id=cl2 style="height:200px;overflow:auto;font-size:14px">${th.map(m=>`<div class="cmsg ${m.f==me?'me':''}"><b>${esc(m.f)}</b> ${esc(m.x)}</div>`).join('')||'<span class=tag>No messages yet</span>'}</div><div class=row><input id=mi value="${esc(v)}" style="flex:1;width:auto" onkeydown="event.key=='Enter'&&dmSend()"><button class=go onclick=dmSend()>Send</button></div></div><p class=tag>Delivered instantly to accounts on this device, and live to people who are online.</p></div>`;const l=$('#cl2');l&&(l.scrollTop=1e9);hd()}
async function dmSend(){const x=$('#mi').value.trim().slice(0,300);if(!x||!DMT)return toast('Pick a recipient and type a message');const m={id:Math.random().toString(36).slice(2),f:window.U,t:DMT,x,ts:Date.now()};$('#mi').value='';dmAdd(m);try{const r=await claude.use('room');r&&r.emit('dm',m)}catch(e){}msgs()}
addEventListener('storage',e=>{if(e.key==DMK&&cur=='msg')msgs()});
Object.assign(T,{crash,bar,msg:msgs});
boot();
