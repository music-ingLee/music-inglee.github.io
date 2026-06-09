// ---- nav: hairline appears after scrolling ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- scroll-depth inversion: top of screen darkens the further you scroll ----
const root = document.documentElement;
const reduceMo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let invTicking = false;
const updateInvert = () => {
  invTicking = false;
  if (reduceMo) return;
  const max = root.scrollHeight - window.innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  root.style.setProperty('--inv', p.toFixed(3));
};
const requestInvert = () => {
  if (!invTicking) { invTicking = true; requestAnimationFrame(updateInvert); }
};
if (!reduceMo) {
  window.addEventListener('scroll', requestInvert, { passive: true });
  window.addEventListener('resize', requestInvert, { passive: true });
  updateInvert();
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
