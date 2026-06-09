// ---- nav: hairline appears after scrolling ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- portrait blurs as it enters the top inversion band ----
// (the photo is kept un-inverted; blurring it in the band stops it from
//  looking like the effect is broken there)
const band = document.querySelector('.invert-band');
const figure = document.querySelector('.figure');
const reduceBlur = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let figTick = false;
const updateFigBlur = () => {
  figTick = false;
  if (!figure || !band) return;
  const bandH = band.getBoundingClientRect().height;
  if (!bandH) { figure.style.filter = ''; return; }   // band off (reduced motion)
  const top = figure.getBoundingClientRect().top;
  let t = 1 - top / bandH;                 // 0 at band bottom → 1 at viewport top
  t = Math.min(1, Math.max(0, t));
  figure.style.filter = t > 0 ? `blur(${(t * 6).toFixed(2)}px)` : '';
};
const reqFigBlur = () => { if (!figTick) { figTick = true; requestAnimationFrame(updateFigBlur); } };
if (!reduceBlur) {
  window.addEventListener('scroll', reqFigBlur, { passive: true });
  window.addEventListener('resize', reqFigBlur, { passive: true });
  updateFigBlur();
}

// ---- About: emphasize the paragraph nearest the reading line ----
const aboutLedes = [...document.querySelectorAll('#about .lede')];
if (aboutLedes.length) {
  let ledeTick = false;
  const updateLede = () => {
    ledeTick = false;
    const focusY = window.innerHeight * 0.42;
    let best = null, bestDist = Infinity;
    for (const p of aboutLedes) {
      const r = p.getBoundingClientRect();
      const d = focusY < r.top ? r.top - focusY
              : focusY > r.bottom ? focusY - r.bottom : 0;
      if (d < bestDist) { bestDist = d; best = p; }
    }
    aboutLedes.forEach(p => p.classList.toggle('active', p === best));
  };
  const reqLede = () => { if (!ledeTick) { ledeTick = true; requestAnimationFrame(updateLede); } };
  window.addEventListener('scroll', reqLede, { passive: true });
  window.addEventListener('resize', reqLede, { passive: true });
  updateLede();
}

// ---- scroll reveal (subtle fade-up) ----
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');
if (reduce) {
  reveals.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach(el => io.observe(el));
}

// ---- active nav link tracking ----
const links = [...document.querySelectorAll('.nav__links a')];
const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
const sections = [...document.querySelectorAll('main section[id]')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      byId.get(e.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));
