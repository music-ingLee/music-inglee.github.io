// ---- nav: hairline appears after scrolling ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- portrait darkens (not inverts) as it enters the top band ----
// the photo is excluded from the invert band; a viewport-locked black
// gradient shade darkens it top-down, matching the band's fade.
const band = document.querySelector('.invert-band');
const media = document.querySelector('.figure__media');
const shade = media && media.querySelector('.figure__shade');
let figTick = false;
const updateShade = () => {
  figTick = false;
  if (!media) return;
  const mediaTop = media.getBoundingClientRect().top;
  // clip the part of the photo that would cover the (inverted) nav
  const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
  media.style.clipPath = `inset(${Math.max(0, navBottom - mediaTop)}px 0 0 0)`;
  if (!band || !shade) return;
  const bandH = band.getBoundingClientRect().height;
  if (!bandH) { shade.style.height = '0'; return; }   // band off (reduced motion)
  shade.style.top = (-mediaTop) + 'px';               // lock the shade to the viewport top…
  shade.style.height = bandH + 'px';                  // …spanning exactly the band
};
const reqShade = () => { if (!figTick) { figTick = true; requestAnimationFrame(updateShade); } };
window.addEventListener('scroll', reqShade, { passive: true });
window.addEventListener('resize', reqShade, { passive: true });
updateShade();

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
// track which sections are inside the reading band; when none are (e.g. back
// at the very top over the hero), no nav link should stay highlighted
const inBand = new Set();
const spy = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) inBand.add(e.target.id);
    else inBand.delete(e.target.id);
  });
  links.forEach(a => a.classList.remove('active'));
  const current = sections.find(s => inBand.has(s.id));
  if (current) byId.get(current.id)?.classList.add('active');
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

// ---- lightbox: full-length screening room ----
document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
  const box = document.getElementById(trigger.dataset.lightbox);
  if (!box) return;
  const video = box.querySelector('.lightbox__video');
  const closeBtn = box.querySelector('.lightbox__close');
  let lastFocus = null;

  const open = () => {
    lastFocus = trigger;
    if (video && !video.src && video.dataset.src) video.src = video.dataset.src;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => box.classList.add('open'));
    closeBtn?.focus();
    if (video) video.play().catch(() => {});
  };
  const close = () => {
    box.classList.remove('open');
    if (video) video.pause();
    document.body.style.overflow = '';
    const done = () => { box.hidden = true; box.removeEventListener('transitionend', done); };
    if (reduce) done(); else box.addEventListener('transitionend', done);
    lastFocus?.focus();
  };

  trigger.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !box.hidden) close();
  });
});
