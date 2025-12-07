const scenes = {
  s1: document.getElementById('s1'),
  s2: document.getElementById('s2'),
  s3: document.getElementById('s3'),
  s4: document.getElementById('s4'),
  s5: document.getElementById('s5'),
  s6: document.getElementById('s6')
}

const subs = {
  s1: document.getElementById('sub1'),
  s2: document.getElementById('sub2'),
  s3: document.getElementById('sub3'),
  s4: document.getElementById('sub4'),
  s5: document.getElementById('sub5'),
  s6: document.getElementById('sub6')
}

function show(id){
  Object.values(scenes).forEach(s=>s.classList.remove('active'));
  scenes[id].classList.add('active');
}

function playVideo(id){
  // pause all stock videos first
  document.querySelectorAll('.stock-video').forEach(v=>{ try{ v.pause(); v.currentTime=0 }catch(e){} });
  const v = document.getElementById(id);
  if(v && v.play){ v.currentTime = 0; v.play().catch(()=>{}); }
}

function stopAllVideos(){ document.querySelectorAll('.stock-video').forEach(v=>{ try{ v.pause(); v.currentTime=0 }catch(e){} }); }

const sleep = ms => new Promise(r=>setTimeout(r,ms));

async function scene1(){
  show('s1');
  playVideo('v_s1_left');
  playVideo('v_s1_right');
  // create icons multiplying
  const iconsArea = document.getElementById('iconsArea');
  iconsArea.innerHTML = '';
  // use refined SVG defs from hidden object
  const iconsRef = document.getElementById('iconsRef');
  const baseIds = ['icon-bag','icon-rupee','icon-ques'];
  let count = 0;
  const id = setInterval(()=>{
    if(count>18) return; // cap
    const el = document.createElement('div');
    el.className='icon-item';
    // insert inline SVG from iconsRef via <use> referencing symbol id
    const svgWrap = document.createElement('div');
    svgWrap.innerHTML = `<svg width="56" height="56"><use href="#${baseIds[count%baseIds.length]}"/></svg>`;
    el.appendChild(svgWrap);
    const x = 20 + Math.random()*60;
    const y = 10 + Math.random()*70;
    el.style.left = x+'%'; el.style.top = y+'%';
    iconsArea.appendChild(el);
    count++;
  },250);
  // animate Rohan wiping forehead (simple transform)
  const rohan = document.querySelector('.big-rohan object');
  setTimeout(()=>{ if(rohan) rohan.style.transform='translateY(-6px) rotate(-4deg)'; },1200);
  await sleep(5000);
  clearInterval(id);
}

async function scene2(){
  show('s2');
  playVideo('v_s2');
  // Drop logo animation handled by CSS; simulate crushing icons by fading them
  const iconItems = document.querySelectorAll('.icon-item');
  iconItems.forEach((it,i)=>setTimeout(()=>it.style.opacity=0, i*30));
  await sleep(500);
  // transition to clean screen
  await sleep(4500);
}

async function scene3(){
  show('s3');
  playVideo('v_s3');
  // type 'Samsung S24'
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  const q = 'Samsung S24';
  input.textContent = '';
  for(let i=0;i<=q.length;i++){
    input.textContent = q.slice(0,i);
    await sleep(90 + Math.random()*30);
  }
  // click
  btn.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:300});
  await sleep(5000 - 1000); // total scene 5s
}

async function scene4(){
  show('s4');
  playVideo('v_s4');
  const rows = document.querySelectorAll('#compareList .row');
  // initial prices
  const prices = [79999,82499,80999];
  rows.forEach((r,i)=>{ r.querySelector('.price').textContent = '₹' + prices[i].toLocaleString() });
  await sleep(600);
  // coupons and card slide in - animate price drops
  for(let step=0; step<3; step++){
    await sleep(700);
    prices[0] -= Math.floor(Math.random()*800 + 200);
    prices[1] -= Math.floor(Math.random()*600 + 150);
    prices[2] -= Math.floor(Math.random()*400 + 100);
    rows.forEach((r,i)=>{ r.querySelector('.price').textContent = '₹' + prices[i].toLocaleString() });
    // slide in coupon/card visuals into each row
    rows.forEach((r,i)=>{
      const offers = r.querySelector('.offers');
      const c = document.createElement('div');
      c.className='offer-icon';
      c.innerHTML = `<svg width="36" height="36"><use href="#icon-coupon"/></svg>`;
      c.style.transform = 'translateX(80px)';
      c.style.opacity = '0';
      offers.appendChild(c);
      requestAnimationFrame(()=>{ c.style.transition='transform .6s ease,opacity .6s ease'; c.style.transform='translateX(0)'; c.style.opacity='1' });
    });
  }
  await sleep(2200 - 600);
}

async function scene5(){
  show('s5');
  playVideo('v_s5');
  // set final prices and highlight lowest
  const final = [79999,81499,75999];
  const rows = document.querySelectorAll('.result-row');
  rows[0].textContent = '₹' + final[0].toLocaleString();
  rows[1].textContent = '₹' + final[1].toLocaleString();
  rows[2].textContent = '₹' + final[2].toLocaleString();
  // highlight lowest
  rows[2].classList.add('pop');
  rows[2].animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:600});
  await sleep(4000);
}

async function scene6(){
  show('s6');
  playVideo('v_s6');
  const download = document.querySelector('.download');
  // pulse the button
  download.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:800,iterations:4});
  await sleep(4000 - 1000);
}

async function runAll(){
  await scene1();
  await scene2();
  await scene3();
  await scene4();
  await scene5();
  await scene6();
}

// Kick off when ready
window.addEventListener('load',()=>{ setTimeout(()=>runAll(),200); });

