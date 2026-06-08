// ==== Data ====
const ZAR = n => 'R' + n.toLocaleString('en-ZA');
const WA = 'https://wa.me/27620176707';

const springSizes = [
  { id:'sp-1', label:'Bachelor / 1 Bedroom Apartment — PROMO (Save R500)', price:750 },
  { id:'sp-2', label:'2 Bedroom Home — PROMO (Save R500)', price:950 },
  { id:'sp-3', label:'3 Bedroom Home — PROMO (Save R500)', price:1150 },
  { id:'sp-4', label:'4 Bedroom Home — PROMO (Save R500)', price:1450 },
];
const deepSizes = [
  { id:'dp-1', label:'Bachelor / 1 Bedroom Apartment', price:1550 },
  { id:'dp-2', label:'2 Bedroom Home', price:1850 },
  { id:'dp-3', label:'3 Bedroom Home', price:2150 },
  { id:'dp-4', label:'4 Bedroom Home', price:2550 },
];
const springAddons = [
  { id:'Kitchen Deep Refresh', label:'Kitchen Deep Refresh', price:650 },
  { id:'Lounge & Dining Area', label:'Lounge & Dining Area', price:650 },
  { id:'Window Cleaning', label:'Window Cleaning (from)', price:550 },
  { id:'Tile & Floor Cleaning', label:'Tile & Floor Cleaning (from)', price:700 },
];
const deepAddons = [
  { id:'Oven Deep Cleaning', label:'Oven Deep Cleaning', price:950 },
  { id:'Fridge Cleaning', label:'Fridge Cleaning', price:880 },
  { id:'Inside Cupboards & Drawers', label:'Inside Cupboards & Drawers', price:950 },
  { id:'Wall Washing', label:'Wall Washing (from)', price:1050 },
  { id:'Full House Sanitizing', label:'Full House Sanitizing (from)', price:1150 },
];
const extraServices = [
  { id:'Yard Cleaning', label:'Yard Cleaning (from)', price:950 },
  { id:'Grass Cutting', label:'Grass Cutting (from)', price:900 },
  { id:'Leaf Removal', label:'Leaf Removal (from)', price:850 },
  { id:'Garage Cleaning', label:'Garage Cleaning (from)', price:900 },
  { id:'Pressure Washing', label:'Pressure Washing (from)', price:1050 },
  { id:'Rubbish Removal', label:'Rubbish Removal (from)', price:1000 },
  { id:'Outdoor Furniture Cleaning', label:'Outdoor Furniture Cleaning (from)', price:650 },
];
const windowsBinPlans = [
  { id:'wb-1m', label:'Monthly — R400 / month', price:400 },
  { id:'wb-3m', label:'3 Months — R375 / month (billed R1,125)', price:1125 },
  { id:'wb-1y', label:'1 Year — R325 / month (billed R3,900)', price:3900 },
];
const PAINTING_RATE = 35;
const carWashPackages = [
  { id:'Basic Wash', label:'Basic Wash — Exterior hand wash, wheels, tire shine, windows', price:150 },
  { id:'Standard Wash', label:'Standard Wash — Basic + foam wash, interior vacuum, dashboard wipe, door jambs', price:250 },
  { id:'Premium Wash', label:'Premium Wash — Standard + interior deep clean, seats & carpets shampoo, leather conditioner, air freshener', price:400 },
  { id:'Deluxe Detail', label:'Deluxe Detail — Premium + full interior detailing, engine bay clean, headlight restoration, paint protection wax', price:650 },
];
const petPackages = [
  { id:'Daily Drop-In', label:'Daily Drop-In — Feeding, fresh water, potty breaks, playtime, home check & update (per visit)', price:250 },
  { id:'Home & Pet Care', label:'Home & Pet Care — Drop-in + mail, plants, bins, lights, photo updates (per day)', price:450 },
  { id:'Premium Care', label:'Premium Care — Home & Pet Care + extra playtime, priority updates (per day)', price:650 },
];
const reviews = [
  { text:"Absolutely stellar service from JR's team! They handled a deep clean on my 3-bedroom house in Sea Point flawlessly. The oven looks brand new.", name:'Sarah M.', area:'Sea Point' },
  { text:'Highly recommend their mobile car wash. They arrived right on time at my complex in Century City and did an incredible Deluxe Detail. Super convenient!', name:'Thabo S.', area:'Century City' },
  { text:'Leaving my golden retriever behind is always tough, but the daily drop-in pet sitting package gave me complete peace of mind while away. Loved the photo updates!', name:'Emily v.d. Merwe', area:'Constantia' },
  { text:'Affordable, professional, and trustworthy workers. They did a spring clean and grass cutting for my property in Durbanville. Excellent pricing structure.', name:'Johan L.', area:'Durbanville' },
  { text:'The booking calculator on the site is brilliant. I knew exactly what I was paying for my apartment cleaning in Green Point. Will definitely use them monthly.', name:'Nicole K.', area:'Green Point' },
];
const team = [
  { src:'assets/jrs-team-hero.png', name:"JR's Cleaning Team", role:"Cape Town's Trusted Cleaning Crew" },
  { src:'assets/jrs-team-reed.png', name:'Reed', role:'Senior Cleaning Specialist' },
  { src:'assets/jrs-team-sweeper.png', name:'Maria', role:'Home Cleaning Specialist' },
  { src:'assets/jrs-team-painter.png', name:'Daniel', role:'Painting & Touch-Ups' },
  { src:'assets/jrs-team-bin.png', name:'Sipho', role:'Exterior & Bin Cleaning Pro' },
];

// ==== State ====
const state = {
  tab:'home',
  homeType:'', homeSize:'', bathrooms:0,
  comboType:'', windowsPlan:'', paintingM2:0,
  addons:new Set(),
  carPkg:'', petPkg:'',
};

// ==== Init ====
document.getElementById('year').textContent = new Date().getFullYear();

// Tabs
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    state.tab = t.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('hidden', p.dataset.panel !== state.tab));
  });
});

// Render reviews
document.getElementById('reviewsGrid').innerHTML = reviews.map(r => `
  <div class="card review">
    <div class="stars">★★★★★</div>
    <p>"${r.text}"</p>
    <div class="who">
      <div class="avatar">${r.name[0]}</div>
      <div><div class="name">${r.name}</div><div class="area">📍 ${r.area}</div></div>
    </div>
  </div>`).join('');

// Render team carousel
const track = document.getElementById('teamTrack');
track.innerHTML = team.map((m,i) => `
  <div class="car-slide">
    <div class="team-card">
      <div class="team-img"><img src="${m.src}" alt="${m.name} — ${m.role}" loading="${i===0?'eager':'lazy'}" /></div>
      <div class="team-info"><div class="n">${m.name}</div><div class="r">${m.role}</div></div>
    </div>
  </div>`).join('');

// Carousel: continuous autoplay using transform; loop by appending clones
function setupCarousel(){
  const viewport = track.parentElement;
  // duplicate slides for seamless loop
  track.innerHTML += track.innerHTML;
  let pos = 0, paused = false;
  function slideWidth(){ const s = track.querySelector('.car-slide'); return s.getBoundingClientRect().width + 16; }
  function step(){
    if(!paused){
      pos += 0.6;
      const maxScroll = slideWidth() * (team.length);
      if(pos >= maxScroll) pos -= maxScroll;
      track.style.transform = `translateX(-${pos}px)`;
    }
    requestAnimationFrame(step);
  }
  viewport.addEventListener('mouseenter', () => paused = true);
  viewport.addEventListener('mouseleave', () => paused = false);
  document.querySelector('.car-btn.prev').addEventListener('click', () => pos = Math.max(0, pos - slideWidth()));
  document.querySelector('.car-btn.next').addEventListener('click', () => pos += slideWidth());
  step();
}
setupCarousel();

// ==== Home tab UI ====
function radioCard(name, value, sel){ return `<label class="opt-card${sel?' selected':''}"><input type="radio" name="${name}" value="${value}" ${sel?'checked':''}/>`; }

function renderHomeSizes(){
  const sizes = state.homeType === 'deep' ? deepSizes : springSizes;
  document.getElementById('homeSizeList').innerHTML = sizes.map(s => `
    <label class="opt-row ${state.homeSize===s.id?'selected':''}">
      <input type="radio" name="homeSize" value="${s.id}" ${state.homeSize===s.id?'checked':''}/>
      <span class="label">${s.label}</span><span class="price">${ZAR(s.price)}</span>
    </label>`).join('');
  document.querySelectorAll('input[name="homeSize"]').forEach(r => {
    r.addEventListener('click', () => {
      if(state.homeSize === r.value){ state.homeSize=''; r.checked=false; }
      else state.homeSize = r.value;
      renderHomeSizes(); recompute();
    });
  });
}
function renderAddons(){
  document.getElementById('pkgAddonTitle').textContent = state.homeType==='deep' ? 'Deep Cleaning Add-ons' : 'Spring Cleaning Add-ons';
  const pkg = state.homeType==='deep' ? deepAddons : springAddons;
  const render = (items, el) => {
    el.innerHTML = items.map(a => `
      <label class="opt-row ${state.addons.has(a.id)?'selected':''}">
        <input type="checkbox" data-id="${a.id}" ${state.addons.has(a.id)?'checked':''}/>
        <span class="label">${a.label}</span><span class="price">+${ZAR(a.price)}</span>
      </label>`).join('');
    el.querySelectorAll('input[type="checkbox"]').forEach(c => {
      c.addEventListener('change', () => {
        const id = c.dataset.id;
        if(state.addons.has(id)) state.addons.delete(id); else state.addons.add(id);
        c.parentElement.classList.toggle('selected', state.addons.has(id));
        recompute();
      });
    });
  };
  render(pkg, document.getElementById('pkgAddonList'));
  render(extraServices, document.getElementById('extraAddonList'));
}
function renderWindowsPlans(){
  document.getElementById('windowsPlanList').innerHTML = windowsBinPlans.map(p => `
    <label class="opt-row ${state.windowsPlan===p.id?'selected':''}">
      <input type="radio" name="winPlan" value="${p.id}" ${state.windowsPlan===p.id?'checked':''}/>
      <span class="label">${p.label}</span><span class="price">${ZAR(p.price)}</span>
    </label>`).join('');
  document.querySelectorAll('input[name="winPlan"]').forEach(r => {
    r.addEventListener('click', () => {
      if(state.windowsPlan === r.value){ state.windowsPlan=''; r.checked=false; }
      else state.windowsPlan = r.value;
      renderWindowsPlans(); recompute();
    });
  });
}

// Home type radios
document.querySelectorAll('input[name="homeType"]').forEach(r => {
  r.addEventListener('click', () => {
    if(state.homeType === r.value){ state.homeType=''; r.checked=false; }
    else state.homeType = r.value;
    state.homeSize = '';
    document.querySelectorAll('label.opt-card').forEach(l => {
      const inp = l.querySelector('input[name="homeType"]');
      if(inp) l.classList.toggle('selected', inp.checked);
    });
    renderHomeSizes(); renderAddons(); recompute();
  });
});
// Combo radios
document.querySelectorAll('input[name="comboType"]').forEach(r => {
  r.addEventListener('click', () => {
    if(state.comboType === r.value){ state.comboType=''; r.checked=false; state.windowsPlan=''; state.paintingM2=0; document.getElementById('paintM2').value=''; }
    else state.comboType = r.value;
    document.querySelectorAll('label.opt-card').forEach(l => {
      const inp = l.querySelector('input[name="comboType"]');
      if(inp) l.classList.toggle('selected', inp.checked);
    });
    document.getElementById('windowsPlanWrap').classList.toggle('hidden', state.comboType !== 'windows');
    document.getElementById('paintingWrap').classList.toggle('hidden', state.comboType !== 'painting');
    renderWindowsPlans(); recompute();
  });
});
document.getElementById('paintM2').addEventListener('input', e => {
  state.paintingM2 = Math.max(0, Math.min(2000, Number(e.target.value)||0));
  document.getElementById('paintTotal').textContent = ZAR(state.paintingM2 * PAINTING_RATE);
  recompute();
});

// Bathrooms
document.getElementById('bathMinus').addEventListener('click', () => { state.bathrooms = Math.max(0, state.bathrooms-1); document.getElementById('bathCount').textContent = state.bathrooms; recompute(); });
document.getElementById('bathPlus').addEventListener('click', () => { state.bathrooms = Math.min(20, state.bathrooms+1); document.getElementById('bathCount').textContent = state.bathrooms; recompute(); });

// Car / Pet lists
function renderCar(){
  document.getElementById('carList').innerHTML = carWashPackages.map(c => `
    <label class="opt-card ${state.carPkg===c.id?'selected':''}" style="border-radius:14px">
      <input type="radio" name="carPkg" value="${c.id}" ${state.carPkg===c.id?'checked':''}/>
      <div style="flex:1"><div class="opt-title" style="font-weight:500;font-size:.9rem">${c.label}</div></div>
      <div class="price" style="color:var(--primary);font-weight:700;white-space:nowrap">From ${ZAR(c.price)}</div>
    </label>`).join('');
  document.querySelectorAll('input[name="carPkg"]').forEach(r => {
    r.addEventListener('click', () => {
      if(state.carPkg === r.value){ state.carPkg=''; r.checked=false; }
      else state.carPkg = r.value;
      renderCar(); recompute();
    });
  });
}
function renderPet(){
  document.getElementById('petList').innerHTML = petPackages.map(p => `
    <label class="opt-card ${state.petPkg===p.id?'selected':''}" style="border-radius:14px">
      <input type="radio" name="petPkg" value="${p.id}" ${state.petPkg===p.id?'checked':''}/>
      <div style="flex:1"><div class="opt-title" style="font-weight:500;font-size:.9rem">${p.label}</div></div>
      <div class="price" style="color:var(--primary);font-weight:700;white-space:nowrap">From ${ZAR(p.price)}</div>
    </label>`).join('');
  document.querySelectorAll('input[name="petPkg"]').forEach(r => {
    r.addEventListener('click', () => {
      if(state.petPkg === r.value){ state.petPkg=''; r.checked=false; }
      else state.petPkg = r.value;
      document.getElementById('petChecklist').classList.toggle('hidden', !state.petPkg);
      renderPet(); recompute();
    });
  });
}

// Initial renders
renderHomeSizes(); renderAddons(); renderWindowsPlans(); renderCar(); renderPet();

// ==== Quote computation ====
function computeLines(){
  const items = [];
  const sizes = state.homeType==='deep'?deepSizes:springSizes;
  const sizeItem = sizes.find(s => s.id === state.homeSize);
  if(sizeItem){
    const name = state.homeType==='spring' ? 'Spring Cleaning' : 'Deep Cleaning';
    items.push({ label:`${name} — ${sizeItem.label}`, price:sizeItem.price });
  }
  if(state.bathrooms > 0) items.push({ label:`Bathroom Cleaning × ${state.bathrooms}`, price:state.bathrooms*580 });
  if(state.comboType==='painting' && state.paintingM2 > 0) items.push({ label:`Interior & Exterior Painting × ${state.paintingM2} m²`, price:state.paintingM2*PAINTING_RATE });
  if(state.comboType==='windows' && state.windowsPlan){
    const p = windowsBinPlans.find(x => x.id === state.windowsPlan);
    if(p) items.push({ label:`Windows & Bin Combo — ${p.label}`, price:p.price });
  }
  const pkg = state.homeType==='deep'?deepAddons:springAddons;
  [...pkg, ...extraServices].forEach(a => { if(state.addons.has(a.id)) items.push({ label:a.label, price:a.price }); });
  const car = carWashPackages.find(c => c.id === state.carPkg);
  if(car) items.push({ label:`Car Wash — ${car.id} (from)`, price:car.price });
  const pet = petPackages.find(p => p.id === state.petPkg);
  if(pet) items.push({ label:`Pet Care — ${pet.id} (from)`, price:pet.price });
  return items;
}

function recompute(){
  const items = computeLines();
  const total = items.reduce((s,i)=>s+i.price,0);
  const ul = document.getElementById('quoteList');
  ul.innerHTML = items.length === 0
    ? '<li class="muted small">Select a service to see your live quote.</li>'
    : items.map(i => `<li><span>${i.label}</span><span>${ZAR(i.price)}</span></li>`).join('');
  document.getElementById('quoteTotal').textContent = ZAR(total);
  validateForm(total);
}

// ==== Booking form ====
['bName','bAddr','bDate'].forEach(id => document.getElementById(id).addEventListener('input', () => validateForm()));

function validateForm(total){
  const t = total ?? computeLines().reduce((s,i)=>s+i.price,0);
  const ok = document.getElementById('bName').value.trim() && document.getElementById('bAddr').value.trim() && document.getElementById('bDate').value.trim() && t > 0;
  document.getElementById('bookBtn').disabled = !ok;
}

document.getElementById('bookBtn').addEventListener('click', () => {
  const items = computeLines();
  const total = items.reduce((s,i)=>s+i.price,0);
  const name = document.getElementById('bName').value.trim();
  const addr = document.getElementById('bAddr').value.trim();
  const dt = document.getElementById('bDate').value.trim();
  const notes = document.getElementById('bNotes').value.trim();
  const lines = [
    "*New Booking Request — JR's Home Cleaning*",
    '',
    `*Name:* ${name}`,
    `*Area / Address:* ${addr}`,
    `*Preferred Date & Time:* ${dt}`,
    '',
    '*Selected Services:*',
    ...items.map(i => `• ${i.label} — ${ZAR(i.price)}`),
    '',
    `*Estimated Total: ${ZAR(total)}*`,
    notes ? `\n*Notes:* ${notes}` : '',
  ].filter(Boolean);
  window.open(`${WA}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
});

recompute();
