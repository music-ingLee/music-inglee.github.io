/* 녹색 오선 · the staff is the one motif: the name's five lines, a melody written anew
   on every visit, and, beside the reading, a score of the work and life in which each
   note's height is the thread it belongs to. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  // Bravura's G clef (SMuFL, SIL OFL 1.1), in staff spaces, origin on the G line
  // Bravura's time-signature 4 (timeSig4, U+E084), in font units: 250 = one staff space, centred on its baseline
  const TIME4 = 'M362 -74V140C362 148 361 157 350 157C341 157 336 155 330 148L235 33C231 28 226 22 226 10V-74H91C171 -6 331 221 334 232C334 234 335 235 335 237C335 245 328 251 320 251C311 251 270 249 252 249C234 249 189 251 181 251C172 251 158 248 158 232C158 108 60 -31 30 -73L24 -81C24 -82 23 -83 23 -84C21 -88 20 -92 20 -95C20 -105 28 -112 40 -112H226V-175C226 -202 204 -210 186 -210C170 -210 163 -219 163 -229C163 -239 167 -250 182 -250H395C405 -250 415 -243 415 -229C415 -215 403 -209 393 -209C383 -209 362 -203 362 -171V-112H435C445 -112 450 -105 450 -93C450 -81 446 -74 435 -74Z';
  const GCLEF = 'M1.504 -1.66C1.496 -1.708 1.504 -1.712 1.528 -1.736C1.592 -1.796 1.676 -1.88 1.752 -1.964C2.088 -2.332 2.288 -2.808 2.288 -3.26C2.288 -3.608 2.192 -3.952 2.028 -4.192C1.968 -4.28 1.864 -4.392 1.82 -4.392C1.764 -4.392 1.64 -4.288 1.56 -4.2C1.264 -3.872 1.168 -3.372 1.168 -2.956C1.168 -2.724 1.196 -2.464 1.224 -2.3C1.232 -2.252 1.236 -2.244 1.188 -2.204C0.932 -1.992 0.656 -1.748 0.448 -1.492C0.172 -1.148 0 -0.776 0 -0.348C0 0.348 0.476 1.008 1.456 1.008C1.548 1.008 1.652 1 1.732 0.984C1.776 0.976 1.784 0.972 1.792 1.02C1.84 1.288 1.9 1.636 1.9 1.824C1.9 2.416 1.5 2.488 1.264 2.488C1.048 2.488 0.944 2.424 0.944 2.372C0.944 2.344 0.98 2.332 1.072 2.304C1.196 2.268 1.34 2.16 1.34 1.928C1.34 1.708 1.2 1.52 0.956 1.52C0.688 1.52 0.528 1.732 0.528 1.98C0.528 2.24 0.684 2.632 1.288 2.632C1.556 2.632 2.076 2.512 2.076 1.832C2.076 1.604 2.004 1.224 1.96 0.976C1.952 0.928 1.956 0.932 2.012 0.908C2.416 0.748 2.684 0.408 2.684 -0.044C2.684 -0.556 2.308 -1.008 1.72 -1.008C1.616 -1.008 1.616 -1.008 1.604 -1.08ZM1.88 -3.772C2.012 -3.772 2.12 -3.664 2.12 -3.444C2.12 -3.168 1.988 -2.912 1.676 -2.6C1.612 -2.536 1.516 -2.444 1.424 -2.364C1.396 -2.34 1.38 -2.344 1.372 -2.396C1.356 -2.5 1.348 -2.636 1.348 -2.764C1.348 -3.388 1.636 -3.772 1.88 -3.772ZM1.444 -1.048C1.456 -0.972 1.456 -0.976 1.384 -0.952C1.032 -0.832 0.804 -0.516 0.804 -0.176C0.804 0.184 0.992 0.44 1.264 0.532C1.296 0.544 1.344 0.556 1.372 0.556C1.404 0.556 1.42 0.536 1.42 0.512C1.42 0.484 1.388 0.472 1.36 0.46C1.192 0.388 1.072 0.216 1.072 0.032C1.072 -0.196 1.228 -0.368 1.472 -0.436C1.536 -0.452 1.544 -0.448 1.552 -0.404L1.752 0.788C1.76 0.832 1.756 0.832 1.696 0.844C1.632 0.856 1.552 0.864 1.472 0.864C0.772 0.864 0.32 0.476 0.32 -0.08C0.32 -0.316 0.36 -0.632 0.692 -1.008C0.932 -1.276 1.116 -1.424 1.304 -1.576C1.344 -1.608 1.352 -1.604 1.36 -1.56ZM1.72 -0.412C1.712 -0.46 1.716 -0.472 1.764 -0.468C2.088 -0.44 2.356 -0.168 2.356 0.184C2.356 0.436 2.204 0.64 1.98 0.752C1.932 0.776 1.924 0.776 1.916 0.728Z';

  /* ---------- pitch ---------- */
  // C major, C4 to A5. Staff step 0 is E4, the bottom line; F5, the top line, is step 8.
  const SCALE = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81];
  const stepOf = (m) => SCALE.indexOf(m) - 2;
  const midiOf = (p) => SCALE[p + 2];
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const snap = (m) => SCALE.reduce((best, n) => (Math.abs(n - m) < Math.abs(best - m) ? n : best), SCALE[0]);
  // Krumhansl & Kessler (1982), major-key probe-tone ratings for the diatonic degrees
  const KK = { 0: 6.35, 2: 3.48, 4: 4.38, 5: 4.09, 7: 5.19, 9: 3.66, 11: 2.88 };

  function mulberry32(a) {
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- the melody: periods ----------
     Music is written a period at a time: two phrases that belong together. The first
     (antecedent) walks a chord progression and stops, half open, on V. The second
     (consequent) answers with the first phrase's opening intervals and closes on I,
     through re or ti, with a sixth beneath, held for the last half bar. Periods return
     as A, A′, B, A′: A′ opens with A's motif, B moves higher and starts away from home.
     A phrase is four bars of 4/4, eight chords of two beats: an opening that sets out
     the key, then four or five chords that approach the cadence. The answer repeats the
     question's opening (B's answer comes home instead), so the two halves of a period
     are heard as a pair, and every phrase and period begins on a downbeat.
     Each chord holds two or three notes in a rhythm that fills its two beats. Each note is weighed by how
     stable it sounds in the key (Krumhansl & Kessler), how close it is to the last
     note, whether it belongs to the chord (more so on the chord's first note), how
     near it stays to the middle of the voice, and, after a leap, a turn back. */
  const CHORDS = {
    I: { root: 0, pcs: [0, 4, 7] }, ii: { root: 2, pcs: [2, 5, 9] }, iii: { root: 4, pcs: [4, 7, 11] },
    IV: { root: 5, pcs: [5, 9, 0] }, V: { root: 7, pcs: [7, 11, 2] }, vi: { root: 9, pcs: [9, 0, 4] },
  };
  const OPEN = [['I', 'V', 'vi', 'IV'], ['I', 'IV', 'I', 'V'], ['I', 'vi', 'IV', 'V'], ['I', 'iii', 'IV', 'V'], ['I', 'IV', 'vi', 'V']];
  const OPEN_B = [['vi', 'iii', 'IV', 'I'], ['IV', 'V', 'iii', 'vi'], ['ii', 'V', 'iii', 'vi'], ['vi', 'IV', 'ii', 'iii']];
  const ANTE = [['I', 'IV', 'ii', 'V'], ['I', 'vi', 'IV', 'V'], ['vi', 'IV', 'I', 'V'], ['I', 'iii', 'vi', 'V'], ['IV', 'I', 'ii', 'V'], ['I', 'vi', 'ii', 'IV', 'V']];
  const ANTE_B = [['vi', 'iii', 'IV', 'V'], ['IV', 'iii', 'ii', 'V'], ['ii', 'vi', 'IV', 'V'], ['vi', 'ii', 'iii', 'IV', 'V']];
  const CONS = [['I', 'IV', 'V', 'I'], ['vi', 'ii', 'V', 'I'], ['IV', 'ii', 'V', 'I'], ['I', 'vi', 'ii', 'V', 'I'], ['iii', 'vi', 'ii', 'V', 'I']];
  const RHY = { 2: [[1, 1], [1.5, 0.5], [1, 1], [0.5, 1.5]], 3: [[1, 0.5, 0.5], [0.5, 0.5, 1], [0.5, 1, 0.5]] };   // each fills two beats
  const bassOf = (root) => (root >= 7 ? 36 : 48) + root;

  function melody(seed) {
    const rnd = mulberry32(seed);
    const one = (a) => a[Math.floor(rnd() * a.length)];
    let prev = 72, prevInt = 0, center = 70, theme = null, form = 0;
    const queue = [];

    function pick(chord, strong, only) {
      const ws = SCALE.map((n) => {
        const inChord = chord.pcs.includes(n % 12);
        if (Math.abs(n - prev) > 9 || (only && !inChord)) return [n, 0];
        let w = Math.pow(KK[n % 12], 1.3) * Math.exp(-Math.abs(n - prev) / 2.4) * Math.exp(-Math.pow((n - center) / 7, 2));
        w *= inChord ? (strong ? 3 : 1.8) : (strong ? 0.35 : 1);
        if (n === prev) w *= 0.3;
        if (Math.abs(prevInt) >= 5 && Math.sign(n - prev) === Math.sign(prevInt)) w *= 0.35;
        return [n, w];
      });
      let r = rnd() * ws.reduce((a, [, w]) => a + w, 0);
      for (const [n, w] of ws) if ((r -= w) <= 0) return n;
      return 67;
    }
    const motifOf = (evs) => evs.slice(0, 4).map((e, i, a) => (i ? e.m - a[i - 1].m : 0));

    function phrase(prog, echo, close) {
      const out = [];
      prog.forEach((name, ci) => {
        const chord = CHORDS[name];
        const last = ci === prog.length - 1;
        const rhythm = last ? [2] : one(RHY[rnd() < 0.55 ? 3 : 2]);
        rhythm.forEach((dur, k) => {
          const idx = out.length;
          let m;
          if (last && close === 'full') m = Math.abs(prev - 72) <= Math.abs(prev - 60) ? 72 : 60;   // home
          else if (last) m = pick(chord, true, true);                                              // rest on a tone of V
          else if (close === 'full' && ci === prog.length - 2 && k === rhythm.length - 1) m = prev > 72 ? 74 : 71;
          else if (echo && idx > 0 && idx < echo.length) m = snap(prev + echo[idx]);
          else if (prev % 12 === 11 && chord.pcs.includes(0) && rnd() < 0.9) m = prev + 1;       // ti leads to do
          else m = pick(chord, k === 0, false);
          out.push({
            m, dur,
            bass: k === 0 ? bassOf(chord.root) : null,
            dyad: last && close === 'full' ? 64 : null,
            end: last && close === 'full',
            half: last && close === 'half',
          });
          prevInt = m - prev; prev = m;
        });
      });
      return out;
    }
    // an opening and a way to the cadence, eight chords in all (a five-chord way takes three
    // of the opening), never the same chord twice across the seam
    const join = (open, ends) => {
      let end, head;
      do { end = one(ends); head = open.slice(0, 8 - end.length); } while (end[0] === head[head.length - 1]);
      return [...head, ...end];
    };
    function period() {
      const kind = ['A', 'A2', 'B', 'A2'][form++ % 4];
      center = kind === 'B' ? 74 : 70;
      const open = one(kind === 'B' ? OPEN_B : OPEN);
      const ante = phrase(join(open, kind === 'B' ? ANTE_B : ANTE), kind === 'A2' ? theme : null, 'half');
      if (kind === 'A') theme = motifOf(ante);
      center = 70;
      const cons = phrase(join(kind === 'B' ? one(OPEN) : open, CONS), rnd() < 0.85 ? motifOf(ante) : null, 'full');
      return [...ante, ...cons];
    }
    return {
      rnd,
      period,
      later(evs) { queue.unshift(...evs); },
      next() { if (!queue.length) queue.push(...period()); return queue.shift(); },
    };
  }

  const seed = ((Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0);
  const gen = melody(seed);
  const first = gen.period();
  const cut = first.findIndex((e) => e.half) + 1;
  const opening = first.slice(0, cut);   // the question, played first when the sound comes on
  gen.later(first.slice(cut));           // the answer follows

  /* ---------- sound: the spike voice, a soft low root ---------- */
  let ctx = null, master = null;
  function audio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      // iPhones mute web audio under the silent switch unless the page says it plays media
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.createDynamicsCompressor()).connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function voice(m, { type, cutoff, peak, decay }, when) {
    const t = ctx.currentTime + 0.02 + when;
    const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    o.type = type;
    o.frequency.value = hz(m);
    f.type = 'lowpass';
    f.frequency.value = cutoff;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    o.connect(f).connect(g).connect(master);
    o.start(t);
    o.stop(t + decay + 0.05);
  }
  const pluck = (m, vel = 1, when = 0) => audio() && voice(m, { type: 'triangle', cutoff: 2400, peak: 0.16 * vel, decay: 0.55 }, when);
  const low = (m, vel = 1, when = 0) => audio() && voice(m, { type: 'sine', cutoff: 900, peak: 0.13 * vel, decay: 1.7 }, when);
  function sound(ev, vel, when = 0) {
    pluck(ev.m, vel, when);
    if (ev.bass) low(ev.bass, vel, when);
    if (ev.dyad) pluck(ev.dyad, vel * 0.5, when);
  }

  /* ---------- the score: work and life on five threads ---------- */
  const THREADS = ['음악', '인지심리학', '계산신경과학', '심리철학', '학습과학']; // bottom → top
  const COMPETITION = 'https://snuc.snu.ac.kr/20989/';
  // th: the threads it belongs to (one → on that line, two neighbours → the space between).
  // y: the measure (a year), or 'pickup' for the anacrusis before the first barline.
  const ITEMS = [
    { id: 'hanjae', y: 'pickup', t: '한재공익재단 전액 장학생', d: '2021 입학부터 졸업까지', th: null, honor: true, note: '등록금 전액과 매달 100만 원의 생활비. 모든 것에 앞서 들어오는 못갖춘마디', href: '#cv' },
    { id: 'jame', y: 2021, t: 'JAME', d: '2021.03 – 2023.02', th: [0], note: '인문대 밴드 · 보컬 · 19대 회장', href: '#cv' },
    { id: 'bcsc', y: 2022, t: 'BCSC 학부생 연구 1등상', d: '2022.02', th: [2, 3], honor: true, note: '신경미학: 아름다움과 숭고가 함께 쓰는 미적 판단의 핵심 신경망, DMN (fMRI · DCM 설계)', href: '#cv' },
    { id: 'rgorhythm', y: 2022, t: 'Rgorhythm', d: '2022.03 – 지금', th: [0], note: '심리학과 밴드를 만들었다 · 보컬', href: '#cv' },
    { id: 'soundream', y: 2022, t: 'Soundream', d: '2022.09 – 2023.02', th: [0], note: '작곡 동아리', href: '#cv' },
    { id: 'tripleh', y: 2023, t: 'Triple H', d: '2023.03 – 2026.02', th: [0], note: '보컬·힙합 동아리 · 보컬', href: '#cv' },
    { id: 'aerg', y: 2023, t: 'AERG', d: '2023.03 – 2023.08', th: [0], note: '미술대학 연극회 · 음향팀', href: '#cv' },
    { id: 'talk', y: 2023, t: '“테크놀로지와 음악의 새로운 만남”', d: '2023.06', th: [0], note: '음악미학연구회 제74회 세미나 발표', href: '#cv' },
    { id: 'major', y: 2023, t: '음악정보학 학생설계전공 개설', d: '2023.03 신청 · 2023.09 진입', th: [0], note: '심리학 주전공에 더해, 음악정보학을 스스로 설계한 전공으로 열었다', href: '#cv' },
    { id: 'bab', y: 2025, t: 'BAB', d: '2025.09 – 2026.08', th: [0], note: '학부대학 어쿠스틱 밴드 · 보컬', href: '#cv' },
    { id: 'connectome', y: 2025, t: 'SNU Connectome Lab', d: '2025.12 – 2026.02', th: [2], note: '학부 연구 인턴', href: '#cv' },
    { id: 'maennal', y: 2025, t: '맨날', d: '2025.12 –', th: [1], note: '인지심리학에서 온 생각: 오늘 할 일을 적고, 하루를 도형 하나로 남기는 앱', href: '#maennal', img: 'assets/maennal-icon.svg', bg: '#201c15', fit: 'meet' },
    { id: 'thinket', y: 2026, t: 'Thinket', d: '2026.01 –', th: [4], note: '대화를 질문들의 숲으로 세우는 LLM 학습 도구', href: '#thinket', img: 'assets/thinket-icon.svg', bg: '#0f1411', fit: 'meet' },
    { id: 'teld', y: 2026, t: '학부생 독립연구 · SNU TELD Lab', d: '2026.05 – 2026.12', th: [4], honor: true, note: '소크라테스식 AI로 배울 때 사회적 실재감이 인지적 이탈을 줄이는가 · 700만 원 지원', href: '#cv' },
    { id: 'synaesthesia', y: 2026, t: 'Synaesthesia', d: '2026 봄', th: [0], note: '확률과 무선화 로직의 즉흥, 음색을 색과 파동으로', href: '#synaesthesia', img: 'assets/synaesthesia-poster.jpg', bg: '#000', fit: 'slice' },
    { id: 'topproject', y: 2026, t: '컴퓨터프로그래밍 최우수 프로젝트', d: '2026.06', th: [4], honor: true, note: 'studyForest(현 Thinket) · 컴퓨터공학부', href: '#cv' },
    { id: 'mubl', y: 2026, t: 'KAIST Music and Brain Lab', d: '2026.07 – 2026.08', th: [0, 1], note: '학부 연구 인턴 · 음역의 경계에서 선율 기대', href: '#cv' },
    { id: 'ismi', y: 2026, t: '학생자율세미나 ISMI', d: '2026.08 – 2026.12', th: [2, 3], note: '기계 지능을 여러 학문으로 읽는 세미나를 공동 개설 · 50만 원 지원', href: '#cv' },
    { id: 'grandprize', y: 2026, t: '서울대학교 컴퓨팅 경진대회 대상', d: '2026.10', th: [4], honor: true, note: '제5회 · studyForest(현 Thinket)', href: COMPETITION, out: true },
  ];
  const SERVICE = { id: 'service', y: 2024, t: '대한민국 공군', d: '2023.10.30 – 2025.07.29', note: '병역 · 21개월의 쉼표', href: '#cv', rest: true };
  const BY_ID = new Map([...ITEMS, SERVICE].map((it) => [it.id, it]));
  const stepFor = (it) => (it.rest ? 4 : !it.th ? 10 : it.th.length === 1 ? it.th[0] * 2 : it.th[0] * 2 + 1);
  const pitchFor = (it) => midiOf(Math.min(stepFor(it), 10));



  /* ---------- the score beside the reading ---------- */
  const W = 800, S = 16, TOP = 92, MID = TOP + 2 * S, BOT = TOP + 4 * S;
  const ROOT_X = 54, FAN_END = 104, CLEF_X = FAN_END + 8, TIME_X = CLEF_X + 3.2 * S, X0 = TIME_X + 2.6 * S, X1 = W - 98;
  const lineY = (i) => TOP + (4 - i) * S;
  const stepY = (p) => BOT - (p * S) / 2;
  const fanD = (i, xEnd) => `M${ROOT_X} ${MID} C ${ROOT_X + 30} ${MID} ${FAN_END - 30} ${lineY(i)} ${FAN_END} ${lineY(i)} L ${xEnd} ${lineY(i)}`;

  const svg = $('#scoreSvg');
  const card = $('#card');
  const stage = $('.score__stage');
  const hl = [];
  const labels = [];
  const noteEls = new Map();

  function buildScore() {
    svg.setAttribute('viewBox', `0 0 ${W} ${BOT + 54}`);
    const defs = el('defs', {}, svg);
    THREADS.forEach((_, i) => el('path', { class: 'st-line', d: fanD(i, X1) }, svg));
    hl.push(el('path', { class: 'st-hl' }, svg), el('path', { class: 'st-hl' }, svg));
    el('circle', { class: 'st-root', cx: ROOT_X, cy: MID, r: 3.6 }, svg);
    el('text', { class: 'st-rootlabel', x: ROOT_X - 9, y: MID + 4.5, 'text-anchor': 'end' }, svg).textContent = '이윤태';

    // treble clef and an engraved 4/4 (Bravura outlines)
    el('path', { class: 'st-clef', d: GCLEF, transform: `translate(${CLEF_X} ${lineY(1)}) scale(${S})` }, svg);
    [MID - S, MID + S].forEach((cy) => {
      el('path', { class: 'st-time', d: TIME4, transform: `translate(${TIME_X - (20 * S) / 250} ${cy}) scale(${S / 250} ${-S / 250})` }, svg);
    });

    THREADS.forEach((name, i) => {
      const t = el('text', { class: 'st-label', x: X1 + 12, y: lineY(i) + 4.5 }, svg);
      t.textContent = name;
      labels.push(t);
    });

    // the pickup, then one measure a year; each as wide as what happened in it
    const segs = ['pickup', 2021, 2022, 2023, 2024, 2025, 2026];
    const room = (it) => (it.img ? 1.8 : 1);
    // military service rests from late 2023 to mid 2025: a slot at the end of 2023, all of 2024, a slot at the start of 2025
    const restRoom = (y) => (y === 2023 || y === 2025 ? 1 : 0);
    const units = segs.map((y) => (y === 2024 ? 1.4 : ITEMS.filter((it) => it.y === y).reduce((a, it) => a + room(it), 0) + (y === 'pickup' ? 0.4 : 0.9) + restRoom(y)));
    const unit = (X1 - X0) / units.reduce((a, b) => a + b, 0);
    let x = X0, restFrom = 0, restTo = 0;
    segs.forEach((y, k) => {
      const w = units[k] * unit;
      if (y !== 'pickup') el('text', { class: 'st-year', x: x + w / 2, y: BOT + 36, 'text-anchor': 'middle' }, svg).textContent = y;
      el('line', { class: 'st-bar', x1: x + w, y1: TOP, x2: x + w, y2: BOT }, svg);
      let cur = x + unit * (y === 'pickup' ? 0.2 : 0.45);
      if (y === 2025) { restTo = cur + unit * 0.7; cur += unit; }
      ITEMS.filter((it) => it.y === y).forEach((it) => {
        drawNote(it, cur + (room(it) * unit) / 2, defs);
        cur += room(it) * unit;
      });
      if (y === 2023) restFrom = cur + unit * 0.3;
      x += w;
    });
    drawRest(restFrom, restTo);
  }

  function hitGroup(item) {
    const g = el('g', { class: 'nt', tabindex: 0, role: 'button', 'aria-label': `${item.t}, ${item.d}` }, svg);
    g.dataset.id = item.id;
    noteEls.set(item.id, { g, item });
    return g;
  }

  function drawNote(it, cx, defs) {
    const p = stepFor(it), cy = stepY(p);
    it.cx = cx;
    const g = hitGroup(it);
    const big = !!it.img;
    const rx = big ? 17 : 7.9, ry = big ? 12.6 : 5.8;
    const up = p < 4;
    if (p >= 10) el('line', { class: 'st-ledger', x1: cx - rx - 5, x2: cx + rx + 5, y1: stepY(10), y2: stepY(10) }, g);
    const sx = up ? cx + rx * 0.86 : cx - rx * 0.86;
    el('line', { class: 'nt__stem', x1: sx, y1: up ? cy - 1 : cy + 1, x2: sx, y2: up ? cy - 3.5 * S : cy + 3.5 * S }, g);
    const rot = `rotate(-20 ${cx} ${cy})`;
    if (big) {
      const clip = el('clipPath', { id: `clip-${it.id}` }, defs);
      el('ellipse', { cx, cy, rx, ry, transform: rot }, clip);
      el('ellipse', { cx, cy, rx, ry, transform: rot, fill: it.bg }, g);
      const pad = it.fit === 'meet' ? 2.5 : 0;
      el('image', {
        href: it.img, x: cx - rx + pad, y: cy - ry + pad, width: (rx - pad) * 2, height: (ry - pad) * 2,
        preserveAspectRatio: `xMidYMid ${it.fit}`, 'clip-path': `url(#clip-${it.id})`,
      }, g);
      el('ellipse', { class: 'nt__ring', cx, cy, rx, ry, transform: rot }, g);
    } else {
      el('ellipse', { class: 'nt__head', cx, cy, rx, ry, transform: rot }, g);
    }
    if (it.honor) {
      // the accent goes on the notehead's side, away from the stem
      const ay = up ? cy + ry + 9 : cy - ry - 9;
      el('polyline', { class: 'nt__accent', points: `${cx - 6},${ay - 3.2} ${cx + 6},${ay} ${cx - 6},${ay + 3.2}` }, g);
    }
    el('circle', { class: 'nt__hit', cx, cy: up ? cy - 12 : cy + 12, r: 17 }, g);
    bind(g, it, pitchFor(it));
  }

  // one long rest over the barlines: 2023.10.30 to 2025.07.29
  function drawRest(x0, x1) {
    const g = hitGroup(SERVICE);
    SERVICE.cx = (x0 + x1) / 2;
    el('rect', { class: 'st-rest', x: x0, y: MID - 4, width: x1 - x0, height: 8 }, g);
    el('rect', { class: 'st-rest', x: x0 - 0.8, y: lineY(3), width: 1.6, height: lineY(1) - lineY(3) }, g);
    el('rect', { class: 'st-rest', x: x1 - 0.8, y: lineY(3), width: 1.6, height: lineY(1) - lineY(3) }, g);
    el('text', { class: 'st-restnum', x: SERVICE.cx, y: TOP - 10, 'text-anchor': 'middle' }, g).textContent = '21';
    el('rect', { class: 'nt__hit', x: x0 - 4, y: TOP - 24, width: x1 - x0 + 8, height: BOT - TOP + 30 }, g);
    bind(g, SERVICE, null);
  }

  /* ---------- lighting a path: root to note, like Thinket's path to root ---------- */
  let pinned = false, reading = null;
  function light(id) {
    const entry = id && noteEls.get(id);
    noteEls.forEach(({ g }) => g.classList.toggle('is-on', !!entry && g === entry.g));
    $$('[data-note]').forEach((n) => n.classList.toggle('is-on', !!id && n.dataset.note === id));
    labels.forEach((l) => l.classList.remove('is-on'));
    hl.forEach((h) => h.classList.remove('is-on'));
    if (entry && entry.item.th) {
      entry.item.th.forEach((t, k) => {
        hl[k].setAttribute('d', fanD(t, entry.item.cx));
        hl[k].classList.add('is-on');
        labels[t].classList.add('is-on');
      });
    }
  }
  function lightThread(t) {
    noteEls.forEach(({ g }) => g.classList.remove('is-on'));
    labels.forEach((l, i) => l.classList.toggle('is-on', i === t));
    hl[1].classList.remove('is-on');
    hl[0].setAttribute('d', fanD(t, X1));
    hl[0].classList.add('is-on');
  }

  function showCard(item, g) {
    const threads = item.th ? item.th.map((i) => THREADS[i]).join(' · ') : '';
    card.innerHTML = `<b></b><span class="card__meta"></span><p></p>${item.href ? '<a></a>' : ''}`;
    card.querySelector('b').textContent = item.t;
    card.querySelector('.card__meta').textContent = threads ? `${item.d} · ${threads}` : item.d;
    card.querySelector('p').textContent = item.note;
    if (item.href) {
      const a = card.querySelector('a');
      a.href = item.href;
      a.textContent = item.out ? '대회 페이지 ↗' : '본문에서 보기';
      if (item.out) { a.target = '_blank'; a.rel = 'noopener'; }
    }
    card.hidden = false;
    const sb = stage.getBoundingClientRect(), nb = g.getBoundingClientRect();
    const cw = card.offsetWidth, ch = card.offsetHeight;
    let left = nb.left + nb.width / 2 - sb.left - cw / 2;
    left = Math.max(8, Math.min(left, sb.width - cw - 8));
    // above the note when the window has room for it under the nav, else below
    const roomAbove = nb.top - ch - 12 > 76;
    card.style.left = `${left}px`;
    card.style.top = `${roomAbove ? nb.top - sb.top - ch - 10 : nb.bottom - sb.top + 10}px`;
  }
  function hideCard() { card.hidden = true; }

  let soundOn = false;
  function bind(g, item, m) {
    const enter = () => { if (!pinned) { light(item.id); showCard(item, g); if (soundOn && !armed && m) pluck(m, 0.8); } };
    const leave = () => { if (!pinned) { hideCard(); light(reading); } };
    g.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') enter(); });
    g.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') leave(); });
    g.addEventListener('focus', enter);
    g.addEventListener('blur', leave);
    g.addEventListener('click', () => {
      if (m) pluck(m, 0.9);
      pinned = false; light(item.id); showCard(item, g); pinned = true;
    });
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); g.dispatchEvent(new Event('click')); } });
  }
  document.addEventListener('pointerdown', (e) => {
    if (pinned && !e.target.closest('.nt') && !e.target.closest('.card')) { pinned = false; hideCard(); light(reading); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { pinned = false; hideCard(); light(reading); } });

  /* reading position lights the note of what is being read. The reading line sits a little
     above the middle of what shows below the top (the nav, and the score where it stays there) */
  let readIO = null;
  function watchReading(top) {
    if (readIO) readIO.disconnect();
    const room = Math.max(0, innerHeight - top);
    readIO = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const was = reading;
        reading = e.target.dataset.note;
        if (!pinned && card.hidden) light(reading);
        if (reading !== was) follow(reading);
      });
    }, { rootMargin: `-${Math.round(top + room * 0.46)}px 0px -${Math.round(room * 0.5)}px 0px` });
    $$('[data-note], #about').forEach((n) => readIO.observe(n));
  }

  /* on a narrow screen the score is wider than the window: it slides to the note being read */
  const scroller = $('.score__scroll');
  function follow(id) {
    if (scroller.scrollWidth <= scroller.clientWidth + 1) return;
    const entry = id && noteEls.get(id);
    if (!entry) { scroller.scrollTo({ left: 0, behavior: reduce ? 'auto' : 'smooth' }); return; }   // back at the start: the root
    const k = svg.getBoundingClientRect().width / W;
    const x = svg.getBoundingClientRect().left - scroller.getBoundingClientRect().left + scroller.scrollLeft + entry.item.cx * k;
    scroller.scrollTo({ left: Math.max(0, x - scroller.clientWidth / 2), behavior: reduce ? 'auto' : 'smooth' });
  }

  /* the four fields in the prose light their threads */
  function bindFields() {
    $$('.field').forEach((f) => {
      const t = +f.dataset.thread;
      const on = () => { if (!pinned) { hideCard(); lightThread(t); } };
      const off = () => { if (!pinned) light(reading); };
      f.addEventListener('pointerenter', on);
      f.addEventListener('pointerleave', off);
      f.addEventListener('focus', on);
      f.addEventListener('blur', off);
      // where the score stays at the top, a tap lights the thread there instead of jumping to it
      f.addEventListener('click', (e) => { if (!wideEnough.matches) { e.preventDefault(); hideCard(); lightThread(t); } });
    });
  }

  /* ---------- playing it: a fixed beat, and ornaments that grow with the scroll ----------
     The melody keeps time on its own: a beat is always BEAT ms, so a phrase lasts as
     long as it lasts whatever the reader does. Scrolling does not hurry it; it fills
     the space between two melody notes, the way a player decorates a repeat. A gentle
     scroll adds eighth-note passing and neighbour tones; a quick one, running
     sixteenths. Each ornament figure leaves the current note and arrives one step
     beside the next one, circling with neighbour tones when there is time to spare.
     Notes are scheduled on the audio clock, a little ahead, so the beat stays even. */
  const BEAT = 0.52, SUB = BEAT / 4;            // seconds
  const soundBtn = $('#sound');
  const strip = $('#strip');
  function stripLines() {
    strip.replaceChildren();
    for (let i = 0; i < 5; i++) el('line', { x1: 0, x2: '100%', y1: 6 + i * 5, y2: 6 + i * 5 }, strip);
  }
  // everything written on the strip enters at the right edge and drifts left as it fades
  function drift(g) {
    const w = strip.clientWidth, travel = reduce ? 0 : -w * 0.78;
    g.animate([{ transform: 'translateX(0)', opacity: 1 }, { transform: `translateX(${travel}px)`, opacity: 0 }],
      { duration: reduce ? 1400 : 9000, easing: 'linear', fill: 'forwards' }).onfinish = () => g.remove();
  }
  // a note as it is written: hollow for a half, dotted for a dotted value, a stem (down from
  // the middle line up, up below it) and a flag for each eighth or sixteenth
  function stripNote(m, small, dur) {
    const w = strip.clientWidth;
    const p = stepOf(m), y = 26 - p * 2.5, x = w - 14;
    const g = el('g', { class: small ? 'sn sn--orn' : 'sn' }, strip);
    if (p <= -2) el('line', { x1: x - 6, x2: x + 6, y1: 31, y2: 31 }, g);
    if (p >= 10) el('line', { x1: x - 6, x2: x + 6, y1: 1, y2: 1 }, g);
    const rx = small ? 2.3 : 3.4, ry = small ? 1.7 : 2.5;
    const head = el('ellipse', { cx: x, cy: y, rx, ry, transform: `rotate(-20 ${x} ${y})` }, g);
    if (dur >= 2) head.setAttribute('class', 'open');
    if (dur === 1.5) el('circle', { class: 'dot', cx: x + rx + 2.4, cy: p % 2 ? y : y - 2.5, r: 0.9 }, g);   // a dot sits in a space
    const up = p < 4, side = up ? 1 : -1, len = small ? 9 : 13;
    const sx = x + side * (rx - 0.5), y0 = y - side * 0.6, tip = y - side * len;
    el('line', { class: 'stem', x1: sx, x2: sx, y1: y0, y2: tip }, g);
    const flags = dur <= 0.25 ? 2 : dur <= 0.5 ? 1 : 0;
    for (let i = 0; i < flags; i++) {
      const fy = tip + side * i * 3.2;
      el('path', { class: 'flag', d: `M${sx} ${fy}c0.4 ${side * 2.6} 4 ${side * 3.2} 3.6 ${side * 7}` }, g);
    }
    drift(g);
  }
  function stripBar() {
    const x = strip.clientWidth - 23;
    const g = el('g', {}, strip);
    el('line', { class: 'bar', x1: x, x2: x, y1: 6, y2: 26 }, g);
    drift(g);
  }
  const at = (t) => Math.max(0, t - ctx.currentTime - 0.02);   // audio time → the offset pluck() takes
  const show = (t, fn) => setTimeout(fn, Math.max(0, (t - ctx.currentTime) * 1000));

  // how busy the reader is: scrolled pixels, fading by half every 350 ms
  let energy = 0, eAt = performance.now();
  function busy() {
    const now = performance.now();
    energy *= Math.pow(0.5, (now - eAt) / 350);
    eAt = now;
    return energy;
  }
  addEventListener('scroll', (() => {
    let lastY = scrollY;
    return () => {
      const dy = Math.abs(scrollY - lastY);
      lastY = scrollY;
      if (soundOn && dy) energy = busy() + dy;
    };
  })(), { passive: true });
  const level = () => { const e = busy(); return e < 40 ? 0 : e < 220 ? 1 : 2; };   // none · eighths · sixteenths

  // a figure of `slots` scale steps from m that lands one step beside n
  function figure(m, n, slots) {
    if (slots <= 0) return [];
    const im = SCALE.indexOf(m), inx = SCALE.indexOf(n);
    const way = Math.sign(inx - im) || 1;            // a repeated note is decorated from above
    const target = Math.max(0, Math.min(SCALE.length - 1, inx - way));
    const out = [];
    let i = im;
    for (let k = 1; k <= slots; k++) {
      const left = slots - k + 1, gap = target - i;
      let move;
      if (Math.abs(gap) > left) move = Math.sign(gap) * Math.min(2, Math.ceil(Math.abs(gap) / left));
      else if (Math.abs(gap) === left) move = Math.sign(gap);
      else move = k % 2 ? -(Math.sign(gap) || way) : (Math.sign(gap) || way);   // time to spare: circle
      i = Math.max(0, Math.min(SCALE.length - 1, i + move));
      out.push(SCALE[i]);
    }
    return out;
  }

  let timer = 0, cur = null, nxt = null, tCur = 0, slot = 1, fig8 = [], fig16 = [], pending = [];
  let beat = 0;   // where the music stands in the bar (beats since it began)
  const nextMain = () => (pending.length ? pending.shift() : gen.next());
  function begin(ev, t) {
    cur = ev; tCur = t; slot = 1;
    nxt = nextMain();
    const room = ev.end ? 0 : ev.dur;               // a closing note is left undecorated
    fig8 = figure(ev.m, nxt.m, Math.round(2 * room) - 1);
    fig16 = figure(ev.m, nxt.m, Math.round(4 * room) - 1);
    sound(ev, 0.75, at(t));
    const downbeat = beat % 4 === 0;
    beat += ev.dur;
    show(t, () => { if (downbeat) stripBar(); stripNote(ev.m, false, ev.dur); });
  }
  function schedule() {
    if (!soundOn) return;
    const horizon = ctx.currentTime + 0.12;
    for (;;) {
      const end = tCur + cur.dur * BEAT;
      const tSlot = tCur + slot * SUB;
      if (slot < Math.round(4 * cur.dur) && tSlot < end - 1e-4) {
        if (tSlot > horizon) break;
        const lv = cur.end ? 0 : level();
        const eighth = slot % 2 === 0;
        let m = null;
        if (lv === 2) m = fig16[slot - 1];
        else if (lv === 1 && eighth) m = fig8[slot / 2 - 1];
        if (m != null) {
          pluck(m, eighth ? 0.5 : 0.4, at(tSlot));
          show(tSlot, () => stripNote(m, true, lv === 2 ? 0.25 : 0.5));
        }
        slot++;
      } else {
        if (end > horizon) break;
        // the next melody note sounds on its beat; if the tab fell behind, pick up now
        begin(nxt, Math.max(end, ctx.currentTime + 0.03));
      }
    }
    timer = setTimeout(schedule, 25);
  }

  /* the sound is on by default. Browsers let audio start only after a click, tap or
     key, so until that first touch the switch is armed: it reads as on, its dot
     breathes, and the music begins at the first click, tap or key anywhere on the page
     (Space and the arrow keys included). Scrolling with a wheel does not count. */
  let armed = false, live = false;   // live: the music has sounded at least once
  function arm() {
    armed = true;
    soundOn = true;
    soundBtn.setAttribute('aria-pressed', 'true');
    $('.sound__label', soundBtn).textContent = '소리 끄기';
    document.documentElement.classList.add('sound-armed');
    // A finger's pointerdown, or a touch that becomes a scroll, does not let a page sound,
    // so every press tries, and the music begins only once the audio is really running.
    // (Before, the first touch on a phone used up the switch while the audio stayed locked.)
    const go = (e) => {
      if (!armed || (e.target.closest && e.target.closest('#sound')) || !audio()) return;
      const src = ctx.createBufferSource();   // older iPhones open the audio only when something plays inside the touch
      src.buffer = ctx.createBuffer(1, 1, 22050);
      src.connect(ctx.destination);
      src.start(0);
      if (ctx.state === 'running') setSound(true);
      else ctx.resume().then(() => { if (armed && ctx.state === 'running') setSound(true); }).catch(() => {});
    };
    ['pointerdown', 'mousedown', 'keydown', 'touchend', 'click'].forEach((t) => addEventListener(t, go, { passive: true, capture: true }));
    // if this browser lets the page sound without a touch (a site allowed to autoplay), play at once
    const policy = navigator.getAutoplayPolicy ? navigator.getAutoplayPolicy('audiocontext') : null;
    if (policy === 'disallowed' || !audio()) return;
    if (ctx.state === 'running') setSound(true);
    else ctx.resume().then(() => { if (armed && ctx.state === 'running') setSound(true); }).catch(() => {});
  }
  function setSound(on, lead = 0.08) {
    armed = false;
    document.documentElement.classList.remove('sound-armed');
    soundOn = on;
    soundBtn.setAttribute('aria-pressed', String(on));
    $('.sound__label', soundBtn).textContent = on ? '소리 끄기' : '소리 켜기';
    document.documentElement.classList.toggle('sound-on', on);
    clearTimeout(timer);
    if (!on) return;
    if (!audio()) return;
    live = true;
    document.documentElement.classList.add('sound-live');
    stripLines();
    // the opening question first; the answer follows
    if (!cur) {
      pending = opening.slice();
      begin(nextMain(), ctx.currentTime + lead);
    } else {
      begin(nxt, ctx.currentTime + lead);
    }
    schedule();
  }
  soundBtn.addEventListener('click', () => setSound(armed ? false : !soundOn));
  arm();
  // leaving the tab pauses the music; coming back picks it up again
  document.addEventListener('visibilitychange', () => {
    if (!ctx || !soundOn || armed || !cur) return;
    if (document.hidden) { clearTimeout(timer); ctx.suspend(); }
    else ctx.resume().then(() => { clearTimeout(timer); begin(nxt, ctx.currentTime + 0.08); schedule(); }).catch(() => {});
  });


  /* ---------- the turn ----------
     As the page scrolls, a fixed layer carries the hero's name onto the score's root
     label and its five straight lines into the fanned staff. The score rides up with the
     intro beside it, so the two arrive together: the turn ends the moment the score
     panel reaches its resting place, and the layer hands over to it. The clef, time
     signature and notes arrive as the lines settle. Scroll position alone sets every
     frame, so scrolling back plays it backwards. */
  const html = document.documentElement;
  const wideEnough = matchMedia('(min-width: 1000px)');
  const morphLines = $('#morphLines'), morphScore = $('#morphScore'), morphName = $('#morphName');
  const heroName = $('.hero__name'), heroLines = $$('.hero__staff i'), heroText = $$('.hero__aka, .hero__role, .hero__meta');
  const VB_W = W, VB_H = BOT + 54;
  let paths = [], fades = [], rootLabel = null, turnOn = false;

  // narrow screens keep the score at the top, so it drops the empty air above the staff
  // and tells the page how tall it stands (anchors land below it)
  const panelEl = $('.score');
  function fitScore() {
    placePlates();
    svg.setAttribute('viewBox', wideEnough.matches ? `0 0 ${W} ${BOT + 54}` : `0 50 ${W} ${BOT + 44 - 50}`);
    html.style.setProperty('--score-h', wideEnough.matches ? '0px' : `${panelEl.offsetHeight}px`);
    watchReading(wideEnough.matches ? 0 : parseFloat(getComputedStyle(panelEl).top) + panelEl.offsetHeight);
  }
  new ResizeObserver(fitScore).observe(panelEl);

  /* the four field pictures: under the score beside the intro on wide screens, at the end of
     the intro on phones. A picture and its field word light each other (the pictures are
     fields too, so the line lights as well); a press opens the picture large. On wide
     screens they wait until the score has landed and step away once the intro is read. */
  const plates = $('.plates'), aboutEl = $('#about');
  function placePlates() {
    if (!plates) return;
    if (wideEnough.matches) { if (plates.parentNode !== panelEl) $('.score__cap').after(plates); }
    else if (plates.parentNode !== aboutEl) $('.define', aboutEl).before(plates);
  }
  if (plates) {
    const all = $$('.plate', plates);
    const glow = (t) => {
      plates.classList.toggle('has-on', t != null);
      all.forEach((p) => p.classList.toggle('is-on', t != null && p.dataset.thread === t));
    };
    $$('.field').forEach((f) => {
      f.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') glow(f.dataset.thread); });
      f.addEventListener('pointerleave', () => glow(null));
    });
    const lb = document.createElement('dialog');
    lb.className = 'lb';
    lb.innerHTML = '<figure><img alt=""><figcaption><b></b><span class="lb__t"></span><span class="lb__n"></span><small></small></figcaption></figure><button class="lb__x" type="button" aria-label="닫기">×</button>';
    document.body.append(lb);
    all.forEach((p) => p.addEventListener('click', (e) => {
      if (!lb.showModal) return;   // no dialog support: the link opens the picture itself
      e.preventDefault();
      const img = $('img', lb);
      img.src = p.getAttribute('href');
      img.alt = p.dataset.title;
      $('b', lb).textContent = $('.plate__cap b', p).textContent;
      $('.lb__t', lb).textContent = p.dataset.title;
      $('.lb__n', lb).textContent = p.dataset.caption;
      $('small', lb).textContent = p.dataset.credit;
      lb.showModal();
    }));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lb__x')) lb.close(); });
    const away = () => {
      const landed = panelEl.getBoundingClientRect().top <= (parseFloat(getComputedStyle(panelEl).top) || 0) + 0.5;
      html.classList.toggle('plates-away', wideEnough.matches && ((turnOn && !landed) || aboutEl.getBoundingClientRect().bottom < innerHeight * 0.42));
    };
    addEventListener('scroll', () => requestAnimationFrame(away), { passive: true });
    addEventListener('resize', away);
    away();
  }

  function setupTurn() {
    fitScore();
    turnOn = wideEnough.matches && !reduce;
    html.classList.toggle('morph-on', turnOn);
    if (!turnOn) { html.classList.remove('morph-run'); return; }
    morphScore.setAttribute('viewBox', `0 0 ${VB_W} ${VB_H}`);
    morphScore.setAttribute('width', VB_W);
    morphScore.setAttribute('height', VB_H);
    morphScore.innerHTML = svg.innerHTML;
    $$('.nt', morphScore).forEach((g) => g.removeAttribute('tabindex'));
    rootLabel = $('.st-rootlabel', morphScore);
    fades = [...morphScore.children].filter((n) => !n.matches('defs, .st-rootlabel, .st-line, .st-hl'));
    morphLines.replaceChildren();
    paths = THREADS.map(() => el('path', {}, morphLines));
    morphName.style.fontSize = getComputedStyle(heroName).fontSize;
    turn();
  }

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const mix = (a, b, t) => a + (b - a) * t;
  // the score's line i in viewBox units: root, two fan handles, fan end, line end
  const scorePts = (i) => [[ROOT_X, MID], [ROOT_X + 30, MID], [FAN_END - 30, lineY(i)], [FAN_END, lineY(i)], [X1, lineY(i)]];

  function turn() {
    if (!turnOn) return;
    const s = scrollY, vh = innerHeight, vw = innerWidth;
    // the rest of the hero steps aside first, so the name travels alone
    heroText.forEach((n) => { n.style.opacity = 1 - clamp01(s / (0.2 * vh)); });
    html.classList.toggle('morph-away', s > 0);

    // the score as it is now (rising with the intro) and where it will rest: the panel's sticky top
    const panel = $('.score'), pr = panel.getBoundingClientRect(), sr = svg.getBoundingClientRect();
    const rest = parseFloat(getComputedStyle(panel).top) || 0;
    const landed = pr.top <= rest + 0.5;
    if (s <= 0 || landed) { html.classList.remove('morph-run'); return; }
    html.classList.add('morph-run');

    // the turn takes exactly the scroll the panel needs to land (its top now, plus what has been
    // scrolled, less its rest). Linear: both ends already move with the page, and an eased
    // curve would make the name dip before it rises
    const R = { x: sr.left, y: sr.top, k: sr.width / VB_W };
    const p = clamp01(s / (s + pr.top - rest)), f = clamp01((p - 0.6) / 0.4);
    morphScore.style.transform = `translate(${R.x}px, ${R.y}px) scale(${R.k})`;
    fades.forEach((n) => { n.style.opacity = f; });

    // the five lines: straight hero lines (top to bottom on the page) into the fanned staff
    const toScreen = ([x, y]) => [R.x + x * R.k, R.y + y * R.k];
    THREADS.forEach((_, i) => {
      const target = scorePts(i).map(toScreen);
      const r = heroLines[4 - i].getBoundingClientRect();
      const y = r.top + r.height / 2, x0 = r.left, x1 = Math.min(r.right, vw);
      const from = [[x0, y], [x0, y], [x0, y], [x0, y], [x1, y]];
      const pts = from.map((pt, j) => [mix(pt[0], target[j][0], p), mix(pt[1], target[j][1], p)]);
      const [P0, P1, P2, P3, P4] = pts;
      paths[i].setAttribute('d', `M${P0[0]} ${P0[1]} C ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${P3[0]} ${P3[1]} L ${P4[0]} ${P4[1]}`);
      paths[i].style.strokeWidth = `${mix(r.height, 1.3 * R.k, p)}px`;
    });

    // the name: from the hero onto the score's root label
    const hb = heroName.getBoundingClientRect();
    const tb = rootLabel.getBoundingClientRect();
    const k = mix(hb.width, tb.width, p) / hb.width;
    const cx = mix(hb.left, tb.left, p), cy = mix(hb.top + hb.height / 2, tb.top + tb.height / 2, p);
    morphName.style.transform = `translate(${cx}px, ${cy - (hb.height * k) / 2}px) scale(${k})`;
  }
  let raf = 0;
  const queue = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; turn(); }); };
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', () => { setupTurn(); });
  wideEnough.addEventListener('change', setupTurn);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(setupTurn);

  /* hovering a work or a CV row lights it and its note, as reading does */
  $$('[data-note]').forEach((n) => {
    n.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || pinned) return;
      light(n.dataset.note);
      const it = BY_ID.get(n.dataset.note);
      if (soundOn && !armed && it && !it.rest) pluck(pitchFor(it), 0.6);
    });
    n.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !pinned) light(reading); });
  });

  /* the hero's five lines are strings: the nearest one answers the pointer, a click
     plucks it (E G B D F from the bottom) and, being a click, lets the music begin */
  const strings = $$('.hero__staff i'), STRING_MIDI = [77, 74, 71, 67, 64];   // top line first
  const nearest = (y) => strings.reduce((best, l, i) => {
    const r = l.getBoundingClientRect(), dist = Math.abs(r.top + r.height / 2 - y);
    return dist < best.d ? { i, d: dist } : best;
  }, { i: 0, d: Infinity }).i;
  const staffBox = $('.hero__staff');
  staffBox.addEventListener('pointermove', (e) => { const i = nearest(e.clientY); strings.forEach((l, k) => l.classList.toggle('is-near', k === i)); });
  staffBox.addEventListener('pointerleave', () => strings.forEach((l) => l.classList.remove('is-near')));
  staffBox.addEventListener('click', (e) => {
    const i = nearest(e.clientY), l = strings[i];
    if (armed) setSound(true);
    pluck(STRING_MIDI[i], 1);
    l.classList.remove('is-plucked'); void l.offsetWidth; l.classList.add('is-plucked');
  });

  /* ---------- small things ---------- */
  // the scrollbar floats on the page instead of standing in a gutter of its own, so it sits
  // on white and on the black footer alike (touch screens keep their own floating bar)
  if (matchMedia('(pointer: fine)').matches) {
    const rail = document.createElement('div'), thumb = document.createElement('div');
    rail.className = 'rail'; thumb.className = 'rail__thumb';
    rail.setAttribute('aria-hidden', 'true');
    rail.append(thumb); document.body.append(rail);
    html.classList.add('own-scrollbar');
    let idle = 0;
    const place = () => {
      const vh = innerHeight, dh = html.scrollHeight;
      const h = Math.max(40, (vh * vh) / dh);
      rail.hidden = dh <= vh + 1;
      thumb.style.height = `${h}px`;
      thumb.style.transform = `translateY(${(scrollY / Math.max(1, dh - vh)) * (vh - h)}px)`;
    };
    const wake = () => {
      place();
      rail.classList.add('is-awake');
      clearTimeout(idle);
      idle = setTimeout(() => rail.classList.remove('is-awake'), 1200);
    };
    addEventListener('scroll', wake, { passive: true });
    addEventListener('resize', place);
    new ResizeObserver(place).observe(document.body);
    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      thumb.setPointerCapture(e.pointerId);
      rail.classList.add('is-held');
      const y0 = e.clientY, s0 = scrollY;
      const k = (html.scrollHeight - innerHeight) / (innerHeight - thumb.offsetHeight);
      const move = (ev) => scrollTo({ top: s0 + (ev.clientY - y0) * k, behavior: 'instant' });
      thumb.addEventListener('pointermove', move);
      thumb.addEventListener('pointerup', () => { thumb.removeEventListener('pointermove', move); rail.classList.remove('is-held'); }, { once: true });
    });
    place();
  }
  // Synaesthesia's plate plays its loop while the pointer rests on it
  $$('.work__plate--media').forEach((a) => {
    const v = $('video', a);
    a.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || reduce) return;
      if (!v.src) v.src = v.dataset.src;
      v.play().then(() => a.classList.add('is-playing')).catch(() => {});
    });
    a.addEventListener('pointerleave', () => { v.pause(); a.classList.remove('is-playing'); });
  });

  // entrances: the parts of each block rise once as they arrive
  const parts = $$('.block > *');
  parts.forEach((p) => p.classList.add('rise'));
  const riseIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); riseIO.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  parts.forEach((p, i) => { p.style.transitionDelay = `${(i % 4) * 70}ms`; riseIO.observe(p); });

  buildScore();
  setupTurn();
  bindFields();
})();
