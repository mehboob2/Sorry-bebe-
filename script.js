const screens=[...document.querySelectorAll('.screen')];let current=0;
function show(n){screens[current].classList.remove('active');current=n;screens[current].classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
function next(){show(Math.min(current+1,screens.length-1))}
const notes=document.getElementById('notes');['Sorry jaan 🥺','Maaf kar do 💙','I’m sorry 🫶🏻','Love you 💋'].forEach(t=>{let d=document.createElement('div');d.className='sticky';d.textContent=t;notes.appendChild(d)});
const total=10;let idx=1;const photo=document.getElementById('photo'),counter=document.getElementById('counter'),dots=document.getElementById('dots');
for(let i=1;i<=total;i++){let d=document.createElement('span');d.className='dot'+(i===1?' on':'');dots.appendChild(d)}
function setPhoto(n){idx=n<1?total:n>total?1:n;photo.style.transform='scale(.96)';photo.style.opacity='.25';setTimeout(()=>{photo.src=`rm${idx}.jpg`;counter.textContent=`${idx} / ${total}`;[...dots.children].forEach((d,i)=>d.classList.toggle('on',i===idx-1));photo.style.transform='scale(1)';photo.style.opacity='1'},120)}
document.getElementById('nextPhoto').onclick=()=>setPhoto(idx+1);document.getElementById('nextBtn').onclick=()=>setPhoto(idx+1);document.getElementById('prev').onclick=()=>setPhoto(idx-1);
let sx=0;document.getElementById('photoWrap').addEventListener('touchstart',e=>sx=e.changedTouches[0].screenX,{passive:true});document.getElementById('photoWrap').addEventListener('touchend',e=>{let dx=e.changedTouches[0].screenX-sx;if(Math.abs(dx)>45)setPhoto(idx+(dx<0?1:-1))},{passive:true});
function startRain(){show(3);let start=Date.now();const timer=setInterval(()=>{for(let i=0;i<4;i++){let p=document.createElement('div');p.className='particle';p.textContent=['💙','💋','💙','❤️'][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+'vw';p.style.fontSize=(16+Math.random()*22)+'px';p.style.animationDuration=(3+Math.random()*4)+'s';p.style.setProperty('--drift',(Math.random()*180-90)+'px');p.style.setProperty('--rot',(Math.random()*360-180)+'deg');document.body.appendChild(p);setTimeout(()=>p.remove(),8000)}if(Date.now()-start>10000){clearInterval(timer);setTimeout(next,700)}},150)}
function openGift(){document.getElementById('gift').classList.add('open');document.getElementById('tap').style.display='none';setTimeout(()=>document.getElementById('giftLetter').classList.add('show'),350)}

/* Reliable mobile/GitHub Pages music */
const loveSong = new Audio('love.mp3');
loveSong.loop = true;
loveSong.preload = 'auto';

function updateMusicUI() {
  const btn = document.getElementById('musicBtn');
  const status = document.getElementById('musicStatus');
  if (!btn || !status) return;
  if (!loveSong.paused) {
    btn.innerHTML = '🎵 Our Song is Playing <span>❚❚</span>';
    status.textContent = 'Playing just for you 💙';
  } else {
    btn.innerHTML = '🎵 Play Our Song <span>▶</span>';
    status.textContent = 'Tap once to start the song 💙';
  }
}

async function toggleMusic() {
  try {
    if (loveSong.paused) {
      await loveSong.play();
    } else {
      loveSong.pause();
    }
    updateMusicUI();
  } catch (err) {
    const status = document.getElementById('musicStatus');
    if (status) status.textContent = 'Check that love.mp3 is in the repository root. 🎵';
    console.error(err);
  }
}

loveSong.addEventListener('play', updateMusicUI);
loveSong.addEventListener('pause', updateMusicUI);
loveSong.addEventListener('error', () => {
  const status = document.getElementById('musicStatus');
  if (status) status.textContent = 'love.mp3 nahi mili. Filename exactly love.mp3 hona chahiye.';
});
