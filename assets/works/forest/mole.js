// 두더지 움직임(2026-10-19). Y 22:54 "두더지가 스크롤 내림에 따라 위치만 변하고 동작이 없어서 아쉬워. 전에 투칸이 나올때는 생동감넘쳐서
//   보는 맛이 있었는데. 두더지도 나름 동작을 만들어서 스크롤 내림에 따라 동작 달라지도록 구현해달라고. 적어도 투칸 만큼의 생동감이 있으면 좋겠어."
// 라이브 두더지(char-mole.svg = 4_Design/41_Concepts/2026_09_26_landing_characters/mole-polygon-generator.html 의 첫 그림)를 인라인으로 넣고
// 생성기의 관절 문법 그대로 움직인다. 그림은 새로 그리지 않는다.
//   앞발 둘 = 먼 앞발(rear-paw, 경첩 383 657)과 가까운 앞발(front-paw, 경첩 539 701)이 각자의 경첩에서 돈다.
//     생성기 '파기' = 가까운 앞발 +18도, 먼 앞발은 그 -0.65배. + 는 발끝이 앞(그림의 왼쪽)으로 간다.
//   코(snout, 경첩 367 628)는 코 아래에서 들린다(생성기 킁킁). + 가 코를 든다.
//   몸 전체는 그림 안의 한 묶음(rig)으로 발 자리(695 920)나 뒷발(900 905)을 축으로 기운다. + 가 머리를 든다.
//   좌우는 바깥 상자의 scaleX(방향)로만 바꾼다. 기울기와 발 각도는 그림 안에서 주므로 어느 쪽을 보든 같은 뜻이다.
// 움직임은 미리 그린 경로가 아니라 부모가 매 스크롤 프레임에 주는 발 자리(walkTo)에서 나온다(자리는 그대로 따른다. 길 끝보다 뒤처지지 않는다).
//   걷기: 걸음은 시간이 아니라 간 거리에 묶인다(보폭 = 몸 폭의 절반). 천천히 내리면 천천히 걷고, 빨리 내리면 종종걸음(초당 7걸음에서 멈추고
//         더 빠르면 몸을 길게 늘이고 숙인다). 걸음마다 몸이 두 번 들썩이고 코가 따라 끄덕인다. 빠르게 달리면 두 걸음에 한 번 뒷발에서 흙이 튄다.
//         내려가는 길에서는 코를 숙이고 올라가는 길에서는 든다(비탈처럼). 빨라지면 앞으로 숙이고 느려지면 뒤로 젖힌다.
//   떠나기와 멈추기: 출발 때 잠깐 웅크렸다 나가고, 멈출 때 앞으로 쏠렸다가 두어 번 흔들리며 가라앉는다(덜 감쇠한 용수철).
//   돌아서기: 가던 길을 되돌아가면(스크롤을 거꾸로) 제자리에서 웅크렸다 작게 뛰어 공중 꼭대기에서 돌아서고, 내려앉으며 한 번 눌린다.
//             가로 폭 0을 지나는 뒤집기를 그리지 않는다(투칸 10-16 Y "종이접기하는거같다고"와 같은 까닭). 걷는 도중 굽이에서는 돌지 않는다.
//   쉬기: 멈추고 0.7초에서 1.4초 뒤부터 1.6초에서 3.8초마다 하나씩(같은 것을 두 번 잇지 않는다). 쉬는 동안은 숨을 쉰다(CSS, 아주 작게).
//         킁킁(코를 세 번 들썩), 일어서기(뒷발로 서서 코를 들고 킁킁, 앞발은 가슴에), 흙 파기(앞발을 번갈아 빠르게, 흙 조각이 뒤로),
//         몸 털기(빠르게 떨다 잦아듦), 뒤돌아보기(작게 뛰어 돌아섰다가 다시 돌아섬).
//   솟기(emerge)와 들어가기(burrow): 땅 줄(발 자리 높이) 아래는 잘려 보이지 않는다. 솟을 때는 흙이 터지고 앞발로 헤치며 튕기듯 올라와
//         한 번 털고, 들어갈 때는 코를 박고 앞발로 파다가 흙을 뒤로 던지며 가라앉는다. 중간에 반대를 부르면 그 높이에서 되돌린다.
//   흙 조각 = 작은 갈색 다각형(세 면이나 네 면), 한 번에 몇 개, 0.5초 남짓 날다 땅 줄에 닿으면 사라진다.
// 쓰는 법(좌표는 부모 좌표 px. 발 자리 = 몸무게가 실리는 그림 아래쪽 한 점, 그림 폭의 55%, 높이의 98%):
//   const m = mountMole(imgEl, { hidden, face })   // <img src="/L/char-mole.svg"> 를 같은 클래스의 움직이는 두더지로 바꾼다.
//                                                 // 폭은 부모 CSS 가 상자(또는 이 요소)에 준다(높이 = 폭 × 594/1019). hidden = 처음엔 땅속에
//   m.place(x, y, face)        바로 그 자리(face 1 = 그림 그대로 왼쪽을 본다, -1 = 오른쪽)
//   m.walkTo(x, y)             매 스크롤 프레임마다. 걸음, 기울기, 방향, 돌아서기가 여기서 나온다
//   m.walkTo(x, y, ox, oy)     걸음은 (x, y) 좌표(예: 지도)에서 재고, 그리는 자리는 (x + ox, y + oy). 두더지를 화면에 붙인 층(position fixed)에 두고
//                              ox, oy = 지도의 화면 자리를 주면, 스크롤 동안 화면 높이가 브라우저(컴포지터) 몫이라 스크립트가 한 장 늦어도 위아래로 떨지 않는다(10-20)
//   m.emerge(), m.burrow()     Promise(끝나면 풀린다). emerge({ pit: false }) = 이번에는 구덩이를 파지 않는다(흙더미 같은 굴이 이미 그려진 자리)
//   m.emerge({ peek: 0.5 })    빼꼼(10-20 03:50 장면, Y "아주 멀리에 두더지가 머리를 빼꼼하고 있는거야"): 몸의 그만큼만(0..1) 굴 밖으로 내밀고
//                              머리를 조금 든 채 머문다. 쉬기 동작은 킁킁, 일어서 둘러보기, 흙 파기, 몸 털기만(작게 뛰어 돌아서기는 굴 속이라 하지 않는다).
//                              그림자는 그리지 않는다(땅 위에 선 것이 아니라서)
//   mountMole(img, { pitIn })  구덩이를 두더지 층이 아니라 이 요소(예: 지도) 안에, 걸음 좌표 그대로 둔다(10-20 Y "구덩이가 생성되는 위치가 불안정해.
//                              구덩이 생성되는 동안에 스크롤하면 더욱이나"): 두더지 층이 화면에 붙어 있으면 땅에 있어야 할 구덩이를 스크립트가 매 장 옮겨야 해서
//                              스크롤보다 한 장 늦게 따라와 휠 한 번 거리만큼 튀었다. 지도 안에 두면 브라우저가 스크롤과 함께 옮긴다
//   m.setOffset(ox, oy)        그리는 자리의 덧셈만 바꾸고 바로 그린다(두더지 층을 화면에 붙임과 지도 안 사이로 바꿀 때 한 장도 엇나가지 않게)
//   m.walkTo(x, y, ox, oy, true) 마지막 인자 chase = 그 자리까지 한 번에 붙지 않고 달려가 따라붙는다(구덩이에서 솟은 뒤 앞서간 길 끝으로)
//   m.dropPit()                남은 구덩이를 빨리 잦아들게 한다(길 그림이 구덩이 위로 걷혀 올라갔을 때), m.pit = 남은 구덩이 자리(없으면 null)
//   m.show(), m.hide()         움직임 없이 바로
//   m.turnTo(face)             그쪽으로 돌아선다(작게 뛰며)
//   m.setNight(bool)           밤: 조금 어둡고 오른쪽 위에 달빛 테두리(투칸 밤과 같은 문법), 흙 조각도 어둡게
//   m.el, m.visible, m.busy    요소, 땅 위에 보이는가, 솟거나 들어가거나 돌아서는 중인가
//   m.dispose()
// 움직임 줄이기: 걷기와 쉬기 동작 없이 서 있고(방향만 바뀐다), 솟기와 들어가기는 바로 보이고 사라진다. 화면 밖이거나 창이 숨으면 쉬기를 멈춘다.
// 그리기: 움직이는 동안만 requestAnimationFrame. 가만히 쉴 때는 그리지 않고(숨은 CSS 애니메이션), 다음 쉬기 동작은 타이머가 깨운다.
// 잠(10-19 세션): 입력(스크롤, 휠, 마우스, 키, 터치, walkTo, place, emerge)이 20초 없으면 쉬기 동작과 숨을 멈춘다(heroes/h1/forest.js 쉬기와 같은 20초).
//   끝 장면에서 맨 아래에 머문 동안 쉬기 동작과 숨이 끝없이 돌아 CPU 를 썼다(1440 맨 아래 30초 40.6%). 입력이 오면 바로 깬다.
const SVG_URL = new URL("../char-mole.svg", import.meta.url).href;
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NS = "http://www.w3.org/2000/svg";
const VB = { x: 135, y: 338, w: 1019, h: 594 };          // char-mole.svg viewBox
const AR = VB.h / VB.w;
const FOOT = { x: 695, y: 920 };                           // 발 자리(앞발 끝과 뒷발 사이, 땅 줄)
const HIND = { x: 900, y: 905 };                           // 일어설 때의 축(뒷발)
const HINGE = { front: [539, 701], rear: [383, 657], snout: [367, 628] };
const AX = (FOOT.x - VB.x) / VB.w, AY = (FOOT.y - VB.y) / VB.h;   // 발 자리의 그림 안 비율
const PAWS_AT = { x: (470 - VB.x) / VB.w, y: (900 - VB.y) / VB.h }; // 앞발 끝(흙을 파는 자리)
const HINDFOOT_AT = { x: (900 - VB.x) / VB.w, y: (900 - VB.y) / VB.h };
const DIRT = ["#6b4a2e", "#8a6440", "#4e3520", "#a5794c"];
// 색에 CSS filter brightness(b) saturate(s) 를 건 것과 같은 색(흙 조각의 밤빛을 filter 없이 칠하려고, 맨 위 CSS 설명)
export function toneHex(hex, b, s) {
  const [r, g, bl] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) * b);
  const m = [[0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s], [0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s], [0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s]];
  return "#" + m.map((row) => Math.round(Math.min(255, Math.max(0, row[0] * r + row[1] * g + row[2] * bl))).toString(16).padStart(2, "0")).join("");
}
const DIRT_NIGHT = DIRT.map((c) => toneHex(c, 0.62, 0.8));
// 그림 상자 안의 발 자리(비율)와 높이/폭: 부모가 두더지가 차지할 화면 자리를 셀 때(예: 장면이 굴 자리를 고를 때 판에 가리지 않게)
export const MOLE_FOOT = { x: (FOOT.x - VB.x) / VB.w, y: (FOOT.y - VB.y) / VB.h, ar: VB.h / VB.w };
// 다각형 흙 조각 한 개(작은 svg). 점은 상자 비율(0..100)
export function chipSvg(pts, fill) {
  return `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}"/></svg>`;
}
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, t) => { const x = clamp((t - a) / (b - a)); return x * x * (3 - 2 * x); };
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (cur, want, rate, dt) => cur + (want - cur) * (1 - Math.exp(-rate * dt));   // 프레임률에 무관한 지수 접근
const outBack = (t) => { const c = 1.7, u = t - 1; return 1 + (c + 1) * u * u * u + c * u * u; };
const rnd = (a, b) => a + Math.random() * (b - a);

const CSS = `
.mole-fly { display: block; position: relative; width: 100%; aspect-ratio: 1019 / 594; transform-origin: 0 0; will-change: transform; pointer-events: none; transition: none !important; animation: none !important; }
.mole-fly > .mole-clip { position: absolute; overflow: hidden; pointer-events: none; }
.mole-fly .mole-body { position: absolute; will-change: transform; }
.mole-fly .mole-breath, .mole-fly .mole-body svg { display: block; width: 100%; height: 100%; overflow: visible; }
.mole-fly .mole-breath { will-change: transform; }
/* 조각 층(10-20): 먼 앞발, 몸, 가까운 앞발, 코, 눈을 저마다 제 층(svg 하나씩)에 두고 관절은 CSS 회전(합성만)으로 돌린다. 전에는 한 svg 안의
   관절 속성을 매 장 바꿔 두더지를 매 장 새로 칠했다(쉬기 동작과 솟기, 들어가기 내내. 장면 스크롤 CPU 약 15포인트).
   그림자와 밤빛(그리고 부모가 주는 빛 --mole-tone, 예: 해 질 녘)은 움직이는 층이 아니라 그 안의 그림(svg)에 건다. 움직이는 층에 filter 를 걸면
   크롬이 그 층을 따로 떼어 매 장 합성해야 해서 macOS 의 가벼운 화면 합성(CoreAnimation 겹층)이 통째로 꺼지고 화면 전체를 매 장 다시 그렸다.
   달빛 테두리는 몸에만 건다(조각마다 걸면 몸 위에 겹친 앞발과 코 둘레에 안쪽 선이 생긴다) */
.mole-fly .mole-rig, .mole-fly .mole-part { position: absolute; left: 0; top: 0; width: 100%; height: 100%; will-change: transform; }
.mole-fly .mole-rig { transform-origin: 0 0; }
.mole-fly .mole-part > svg { display: block; width: 100%; height: 100%; overflow: visible; filter: var(--mole-tone,) drop-shadow(0 1px 1.5px rgba(24, 53, 37, .24)); }
.mole-fly .mole-part.mp-eye > svg { filter: var(--mole-tone,); }
.mole-fly.mole-idle .mole-breath { animation: mole-breathe 1.9s ease-in-out infinite; }
@keyframes mole-breathe { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.012, 1.024); } }
.mole-fly > .mole-shadow { position: absolute; border-radius: 50%; pointer-events: none; background: radial-gradient(closest-side, rgba(12, 22, 16, .34), rgba(12, 22, 16, 0)); will-change: transform, opacity; }
/* 흙 조각: 다각형은 clip-path 가 아니라 작은 svg 로 칠한다(clip-path 를 건 움직이는 층도 위와 같은 까닭으로 가벼운 합성을 끈다). 밤빛은 칠할 때 색으로(chip) */
.mole-fly .mole-chip { position: absolute; left: 0; top: 0; will-change: transform, opacity; }
.mole-fly .mole-chip svg { display: block; width: 100%; height: 100%; overflow: visible; }
.mole-fly.mole-night .mole-part > svg { filter: var(--mole-tone,) brightness(.78) saturate(.9); }
.mole-fly.mole-night .mole-part.mp-body > svg { filter: var(--mole-tone,) brightness(.78) saturate(.9) drop-shadow(1.2px -1.4px 0 rgba(196, 214, 255, .55)) drop-shadow(0 0 10px rgba(150, 180, 240, .18)); }
.mole-pit { position: absolute; left: 0; top: 0; width: 0; height: 0; pointer-events: none; }
:is(.mole-fly, .mole-pit) > .mole-hole { position: absolute; border-radius: 50%; pointer-events: none; opacity: 0; background: radial-gradient(closest-side, #1f140b 62%, rgba(31, 20, 11, 0)); }
:is(.mole-fly, .mole-pit) > .mole-rim { position: absolute; left: 0; top: 0; width: 0; height: 0; pointer-events: none; opacity: 0; }
:is(.mole-fly, .mole-pit) > .mole-rim i { position: absolute; display: block; }
:is(.mole-fly, .mole-pit).mole-night > :is(.mole-hole, .mole-rim) { filter: brightness(.6); }
.mole-fly.mole-night > .mole-shadow { background: radial-gradient(closest-side, rgba(0, 0, 0, .42), rgba(0, 0, 0, 0)); }
@media (prefers-reduced-motion: reduce) { .mole-fly.mole-idle .mole-breath { animation: none; } }
`;
let cssIn = false, svgText = null;
const getSvg = () => (svgText ||= fetch(SVG_URL).then((r) => r.text()));

// 덜 감쇠한 용수철(멈출 때 흔들림, 눌림). x 는 목표에서 벗어난 값, kick 으로 속도를 준다
function spring(w, z) {
  const s = { x: 0, v: 0, to: 0 };
  s.step = (dt) => {
    for (let t = dt; t > 1e-6; t -= 1 / 120) {
      const h = Math.min(t, 1 / 120), a = w * w * (s.to - s.x) - 2 * z * w * s.v;
      s.v += a * h; s.x += s.v * h;
    }
  };
  s.still = () => Math.abs(s.x - s.to) < 0.002 && Math.abs(s.v) < 0.02;
  return s;
}

export function mountMole(img, { hidden = false, face: face0 = 1, hole: useHole = true, pitIn = null } = {}) {
  if (!cssIn) { cssIn = true; const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st); }
  const el = document.createElement("span");
  el.className = `${img.className || ""} mole-fly`.trim();
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `<span class="mole-shadow"></span><span class="mole-hole"></span><span class="mole-clip"><span class="mole-body"><span class="mole-breath"></span></span><span class="mole-chips"></span></span><span class="mole-rim"><i></i><i></i><i></i></span>`;
  img.replaceWith(el);
  const shadow = el.querySelector(".mole-shadow"), clipEl = el.querySelector(".mole-clip"), body = el.querySelector(".mole-body");
  const breath = el.querySelector(".mole-breath"), chipsEl = el.querySelector(".mole-chips");
  const holeEl = el.querySelector(".mole-hole"), rimEl = el.querySelector(".mole-rim");
  if (!useHole) { holeEl.remove(); rimEl.remove(); }
  // 구덩이를 바깥 층(지도)에: 묶음 하나를 걸음 좌표의 구덩이 자리에 두고, 안의 구멍과 흙 둘레는 두더지 상자와 같은 치수(발 자리 ax, ay 기준)
  let pitBox = null;
  if (useHole && pitIn) { pitBox = document.createElement("span"); pitBox.className = "mole-pit"; pitBox.setAttribute("aria-hidden", "true"); pitBox.append(holeEl, rimEl); pitIn.appendChild(pitBox); }
  let rig = null, fp = null, rp = null, sn = null;
  getSvg().then((txt) => {
    if (dead) return;
    const tpl = document.createElement("template");
    tpl.innerHTML = txt.replace(/<!--[\s\S]*?-->/g, "");
    const src = tpl.content.querySelector("svg");
    // 모든 조각을 한 묶음(rig, 몸의 기울기가 눈과 발까지 함께 움직인다) 안에 그림 차례대로: 먼 앞발, 몸, 가까운 앞발, 코, 눈
    rig = document.createElement("span"); rig.className = "mole-rig";
    const part = (cls, node) => {
      const box = document.createElement("span"); box.className = "mole-part " + cls;
      const svg = document.createElementNS(NS, "svg");
      for (const a of ["viewBox", "shape-rendering"]) if (src.getAttribute(a)) svg.setAttribute(a, src.getAttribute(a));
      svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("aria-hidden", "true");
      if (node) { const g = node.cloneNode(true); g.removeAttribute("transform"); g.removeAttribute("style"); svg.appendChild(g); }
      box.appendChild(svg); rig.appendChild(box);
      return box;
    };
    rp = part("mp-rear", src.querySelector('[data-part="rear-paw"]'));
    part("mp-body", src.querySelector('[data-part="body"]'));
    fp = part("mp-front", src.querySelector('[data-part="front-paw"]'));
    sn = part("mp-snout", src.querySelector('[data-part="snout"]'));
    part("mp-eye", src.querySelector(":scope > circle"));
    breath.replaceChildren(rig);
    origins();
    render();
  });

  // ── 크기: 폭은 부모 CSS 가 준다. 자른 상자(땅 줄 위만 보인다)와 그림자, 흙 조각 자리를 폭에 맞춘다 ──
  // 같은 값을 다시 쓰지 않는다(10-20): 그림 안 관절(svg 속성)은 값을 다시 쓰기만 해도 두더지 층을 새로 칠한다. 자리만 옮길 때(setOffset)는 층 이동뿐이게.
  // 크기가 바뀌면(geom) 상자 스타일을 새로 쓰므로 그 몫은 잊는다
  const last = {};
  const put = (k, v, fn) => { if (last[k] !== v) { last[k] = v; fn(v); } };
  let W = 0, H = 0, ax = 0, ay = 0, CX = 0, CY = 0;   // CX CY = 자른 상자 안에서 이 요소 왼쪽 위의 자리
  function geom() {
    const w = el.offsetWidth || 64;
    if (Math.abs(w - W) < 0.5) return;
    W = w; H = W * AR; ax = W * AX; ay = H * AY; CX = W * 1.2; CY = H * 1.6;
    clipEl.style.cssText = `left:${-CX}px;top:${-CY}px;width:${W * 3.4}px;height:${CY + ay}px`;
    body.style.cssText = `left:${CX}px;top:${CY}px;width:${W}px;height:${H}px;transform-origin:${ax}px ${ay}px`;
    delete last.body; delete last.vis; delete last.sho; delete last.sht; delete last.rig;
    origins();
    breath.style.transformOrigin = `${ax}px ${ay}px`;
    chipsEl.style.cssText = `position:absolute;left:${CX}px;top:${CY}px;width:0;height:0`;
    shadow.style.cssText = `left:${ax - W * .34}px;top:${ay - H * .07}px;width:${W * .68}px;height:${H * .14}px`;
    if (useHole) {
      // 굴: 발 자리에 납작한 어두운 구멍, 앞쪽 양옆과 가운데에 흙 둘레 세 덩이(두세 면 다각형, 흙 조각과 같은 색)
      holeEl.style.cssText = `left:${ax - W * .3}px;top:${ay - H * .085}px;width:${W * .6}px;height:${H * .17}px`;
      const rim = [[-0.36, 0.05, 0.2, "#6b4a2e", "0% 100%,30% 15%,72% 0%,100% 100%"], [0.2, 0.06, 0.22, "#8a6440", "0% 100%,22% 8%,64% 22%,100% 100%"], [-0.08, 0.075, 0.16, "#4e3520", "0% 100%,48% 0%,100% 100%"]];
      [...rimEl.children].forEach((e, i) => { const [dx, dy, w, c, poly] = rim[i]; e.style.cssText = `left:${ax + dx * W}px;top:${ay + dy * H - w * W * .42}px;width:${w * W}px;height:${w * W * .42}px;background:${c};clip-path:polygon(${poly})`; });
    }
  }
  // 그림 좌표(viewBox) → 상자 안 px. 관절 축은 크기마다 다시 둔다
  const px = (x, y) => [((x - VB.x) / VB.w * W).toFixed(2), ((y - VB.y) / VB.h * H).toFixed(2)];
  function origins() {
    if (!rig || !W) return;
    for (const [e, h] of [[fp, HINGE.front], [rp, HINGE.rear], [sn, HINGE.snout]]) { const [x, y] = px(h[0], h[1]); e.style.transformOrigin = `${x}px ${y}px`; }
  }
  geom();
  const ro = new ResizeObserver(() => { geom(); render(); });
  ro.observe(el);

  // ── 상태 ──
  let pos = { x: 0, y: 0 }, target = { x: 0, y: 0 }, placed = false, off = { x: 0, y: 0 };
  let face = face0 === -1 ? -1 : 1;
  let vel = { x: 0, y: 0 }, speed = 0, accel = 0, lastSpeed = 0, lastMove = -1e9, moving = false;
  let travel = null, revAcc = 0;          // 마지막으로 가던 쪽(단위 벡터), 거꾸로 가는 시간 누적
  let phase = 0, gaitW = 0, stepCount = 0;
  let sink = hidden ? 1.08 : 0, gone = !!hidden; // sink = 땅속으로 들어간 정도(몸 높이 배), gone = 다 들어가 감춤
  let hop = null, act = null, dig = null, lastAct = "", idleT = 0;
  let peekS = 0;   // 빼꼼일 때 머무는 땅속 깊이(몸 높이 배, 0 = 다 나옴)
  let holeA = 0, holeHold = 0, holeAt = null;   // 굴의 옅기(솟기와 들어가기 때 1, 끝나고 조금 뒤 잦아든다), 굴 자리(부모 좌표: 두더지가 걸어가도 굴은 그 자리에)
  let holeFast = false, pitDrawnAt = null, chasing = false;   // 빨리 잦아들기, 바깥 구덩이 묶음을 마지막으로 놓은 자리, 달려가 따라붙는 중
  // 지금 자세(그림 안 각도, 몸의 들썩임과 눌림)
  let pf = 0, pr = 0, sa = 0, rear = 0, bob = 0, sx = 1, sy = 1;
  const lean = spring(11, 0.42);          // 몸 기울기(도). 목표는 매 프레임 준다
  const sq = spring(17, 0.34);            // 눌림(sy = 1 + x)
  const chips = [];
  let night = false, onScreen = true, raf = 0, lastTs = 0, dead = false;
  const SLEEP = 20000;
  let lastInput = performance.now();
  const asleep = () => performance.now() - lastInput > SLEEP;

  function render() {
    if (!W) geom();
    put("el", `translate(${(pos.x + off.x - ax).toFixed(1)}px, ${(pos.y + off.y - ay).toFixed(1)}px)`, (v) => { el.style.transform = v; });
    const syv = sy * (1 + sq.x), sxv = sx * (1 - sq.x * 0.55);
    const hopY = hop ? hop.y : 0;
    put("body", `translate(0px, ${(bob + hopY + sink * H).toFixed(2)}px) scale(${(face * sxv).toFixed(4)}, ${syv.toFixed(4)})`, (v) => { body.style.transform = v; });
    put("vis", gone ? "hidden" : "", (v) => { body.style.visibility = v; });
    if (rig) {
      // 묶음: 발 자리를 축으로 lean, 뒷발을 축으로 rear(그림 안 rotate(각 x y) 두 번과 같은 셈)
      const [fx, fy] = px(FOOT.x, FOOT.y), [hx, hy] = px(HIND.x, HIND.y);
      put("rig", `translate(${fx}px, ${fy}px) rotate(${lean.x.toFixed(2)}deg) translate(${-fx}px, ${-fy}px) translate(${hx}px, ${hy}px) rotate(${rear.toFixed(2)}deg) translate(${-hx}px, ${-hy}px)`, (v) => { rig.style.transform = v; });
      put("fp", `rotate(${pf.toFixed(2)}deg)`, (v) => { fp.style.transform = v; });
      put("rp", `rotate(${pr.toFixed(2)}deg)`, (v) => { rp.style.transform = v; });
      put("sn", `rotate(${sa.toFixed(2)}deg)`, (v) => { sn.style.transform = v; });
    }
    // 그림자: 땅 위에 있을수록 진하고, 뛰거나 일어서면 작고 옅다
    if (useHole) {
      holeEl.style.opacity = rimEl.style.opacity = holeA.toFixed(3);
      if (pitBox) {   // 바깥 층: 구덩이 자리가 바뀔 때만 옮긴다(스크롤은 브라우저 몫)
        if (holeAt && (!pitDrawnAt || pitDrawnAt.x !== holeAt.x || pitDrawnAt.y !== holeAt.y)) { pitDrawnAt = { ...holeAt }; pitBox.style.transform = `translate(${(holeAt.x - ax).toFixed(1)}px, ${(holeAt.y - ay).toFixed(1)}px)`; }
      } else {
        const hx = holeAt ? holeAt.x - pos.x : 0, hy = holeAt ? holeAt.y - pos.y : 0;
        holeEl.style.transform = rimEl.style.transform = `translate(${hx.toFixed(1)}px, ${hy.toFixed(1)}px)`;
      }
    }
    const up = gone || peekS > 0 ? 0 : clamp(1 - sink), air = clamp(-(hopY + bob) / (H * 0.25));
    put("sho", (up * (1 - air * 0.55)).toFixed(3), (v) => { shadow.style.opacity = v; });
    put("sht", `scale(${(up * (1 - air * 0.35) * (1 - rear / 90)).toFixed(3)}, ${(1 - air * 0.3).toFixed(3)})`, (v) => { shadow.style.transform = v; });
    for (const c of chips) {
      c.el.style.transform = `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px) rotate(${c.r.toFixed(0)}deg)`;
      c.el.style.opacity = (1 - smooth(0.6, 1, c.age / c.life)).toFixed(3);
    }
  }

  // ── 흙 조각: 그림 안 비율 자리(fx, fy)에서, 그림 기준(왼쪽이 앞) 속도로. 화면에서는 방향(face)을 곱한다 ──
  function chip(fx, fy, vxl, vyl) {
    if (chips.length > 16 || RM) return;
    const e = document.createElement("span");
    e.className = "mole-chip";
    const s = W * rnd(0.035, 0.07), n = Math.random() < 0.5 ? 3 : 4, pts = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + rnd(-0.4, 0.4), r = rnd(0.62, 1); pts.push([(50 + Math.cos(a) * 50 * r).toFixed(0), (50 + Math.sin(a) * 50 * r).toFixed(0)]); }
    const pal = night ? DIRT_NIGHT : DIRT;
    e.style.cssText = `width:${s.toFixed(1)}px;height:${(s * rnd(0.75, 1.1)).toFixed(1)}px`;
    e.innerHTML = chipSvg(pts, pal[(Math.random() * pal.length) | 0]);
    chipsEl.appendChild(e);
    const lx = fx * W, ly = fy * H, k = W / 84;
    chips.push({ el: e, x: ax + face * (lx - ax) - s / 2, y: ly - s / 2, vx: face * vxl * k, vy: vyl * k, r: rnd(0, 360), vr: rnd(-540, 540), age: 0, life: rnd(0.45, 0.75) });
  }
  function stepChips(dt) {
    const g = 1300 * (W / 84);
    for (let i = chips.length - 1; i >= 0; i--) {
      const c = chips[i];
      c.age += dt; c.vy += g * dt; c.x += c.vx * dt; c.y += c.vy * dt; c.r += c.vr * dt;
      if (c.age >= c.life || (c.vy > 0 && c.y > ay + 2)) { c.el.remove(); chips.splice(i, 1); }
    }
  }
  function clearChips() { for (const c of chips) c.el.remove(); chips.length = 0; }

  // ── 돌아서기: 웅크림(25%) → 작게 뜀(꼭대기에서 방향이 바뀐다) → 내려앉으며 눌림 ──
  function startHop(to, dur = 0.32) {
    if (RM) { face = to; render(); return; }
    if (hop) { hop.to = to; return; }
    hop = { t: 0, dur, to, y: 0, flipped: false, landed: false };
    kick();
  }
  function stepHop(dt, P) {
    hop.t += dt;
    const u = hop.t / hop.dur;
    P.pf += -8; P.pr += 6;                                 // 뛰는 동안 앞발은 가슴 쪽으로
    if (u < 0.25) { P.sq += -0.12 * smooth(0, 1, u / 0.25); hop.y = 0; }   // 웅크림
    else if (u < 0.9) {
      const k = (u - 0.25) / 0.65;
      hop.y = -H * 0.19 * Math.sin(Math.PI * k);
      if (k < 0.35) P.sq += 0.07;                            // 박차며 조금 늘어난다
      if (!hop.flipped && k >= 0.5) { hop.flipped = true; face = hop.to; }
    } else {
      if (!hop.flipped) { hop.flipped = true; face = hop.to; }
      hop.y = 0;
      if (!hop.landed) { hop.landed = true; sq.v -= 1.5; }  // 내려앉으며 눌림
    }
    if (u >= 1) hop = null;
  }

  // ── 쉬기 동작 ──
  const ACTS = { sniff: [1.35, 0.3], rearUp: [2.1, 0.22], dig: [1.15, 0.2], shake: [0.62, 0.12], lookBack: [1.35, 0.16] };
  function pickAct() {
    const keys = Object.keys(ACTS).filter((k) => k !== lastAct && !(peekS > 0 && k === "lookBack"));
    let sum = 0; for (const k of keys) sum += ACTS[k][1];
    let r = Math.random() * sum;
    for (const k of keys) { r -= ACTS[k][1]; if (r <= 0) return k; }
    return keys[0];
  }
  function schedule(first) {
    clearTimeout(idleT);
    if (RM || dead) return;
    idleT = setTimeout(() => {
      if (dead) return;
      if (asleep()) { el.classList.remove("mole-idle"); return; }   // 잠: 다음 입력(wake)까지 쉬기 동작도 숨도 없다
      if (moving || hop || dig || gone || act) { schedule(false); return; }
      if (document.hidden || !onScreen) { schedule(false); return; }
      const k = pickAct();
      lastAct = k;
      act = { k, t: 0, dur: ACTS[k][0], flips: 0 };
      el.classList.remove("mole-idle");
      kick();
    }, first ? rnd(500, 1000) : rnd(900, 2400));
  }
  // 동작의 자세(목표): t = 동작 시작부터 초
  function actPose(a, P) {
    const t = a.t, d = a.dur, u = t / d;
    if (a.k === "sniff") {
      // 코를 세 번 들썩(각 0.13초에 9도 올렸다 2도 아래로), 그동안 머리를 조금 든다
      for (const c of [0.12, 0.38, 0.64, 0.86]) { const x = (t - c) / 0.12; if (x > 0 && x < 1) P.sa += 14 * Math.sin(Math.PI * x) - 1.5 * Math.sin(Math.PI * 2 * x); }
      const env = Math.sin(Math.PI * clamp(u));
      P.lean += 5 * env; P.rear += 6 * env; P.sq += 0.02 * env;
    } else if (a.k === "rearUp") {
      // 뒷발로 선다(0.28초에 튕기듯 24도), 선 채 코를 두 번 킁킁, 앞발은 가슴에, 내려오며 눌림
      const upK = t < 0.28 ? outBack(t / 0.28) : t < d - 0.42 ? 1 : 1 - smooth(0, 1, (t - (d - 0.42)) / 0.42);
      P.rear += 30 * upK; P.pf += -16 * upK; P.pr += 12 * upK;
      for (const c of [0.5, 0.86, 1.2]) { const x = (t - c) / 0.13; if (x > 0 && x < 1) P.sa += 13 * Math.sin(Math.PI * x); }
      P.lean += 3 * Math.sin((t - 0.3) * 4.6) * upK;    // 서서 앞뒤로 둘러본다
      if (!a.landed && t > d - 0.06) { a.landed = true; sq.v -= 1.1; }
    } else if (a.k === "dig") {
      // 앞발을 번갈아 빠르게, 코를 숙이고, 흙을 뒤로 던진다
      const env = smooth(0, 0.12, t) * (1 - smooth(d - 0.18, d, t)), w = Math.PI * 2 * 7.5;
      P.pf += 17 * Math.sin(w * t) * env; P.pr += -13 * Math.sin(w * t + 0.7) * env; P.lean += -6 * env;
      P.bob += 0.012 * H * Math.sin(w * 2 * t) * env;
      a.cd = (a.cd || 0) - (a.dt || 0);
      if (env > 0.5 && a.cd <= 0) { a.cd = 0.1; chip(PAWS_AT.x, PAWS_AT.y, rnd(140, 260), rnd(-230, -130)); if (Math.random() < 0.5) chip(PAWS_AT.x + 0.05, PAWS_AT.y, rnd(90, 200), rnd(-200, -110)); }
    } else if (a.k === "shake") {
      const f = Math.exp(-4.5 * t) * Math.sin(Math.PI * 2 * 10.5 * t);
      P.lean += 9 * f; P.sq += 0.04 * Math.exp(-4.5 * t) * Math.sin(Math.PI * 2 * 10.5 * t + 1.2); P.sa += -5 * f; P.pf += 6 * f; P.pr += -5 * f;
    } else if (a.k === "lookBack") {
      if (a.flips === 0 && t > 0.05) { a.flips = 1; startHop(-face, 0.3); }
      if (a.flips === 1 && t > 0.85) { a.flips = 2; startHop(-face, 0.3); }
      if (t > 0.35 && t < 0.8) { const x = (t - 0.4) / 0.14; if (x > 0 && x < 1) P.sa += 8 * Math.sin(Math.PI * x); }
    }
  }

  // ── 솟기와 들어가기 ──
  function emerge(o) {
    wake();
    peekS = o && o.peek ? clamp(1 - o.peek, 0, 0.9) : 0;
    if (dig && dig.k === "up") { dig.s.to = peekS; return dig.p; }
    if (dig) dig.done();
    gone = false;
    if (RM) { sink = peekS; render(); schedule(true); return Promise.resolve(); }
    let done; const p = new Promise((r) => { done = r; });
    dig = { k: "up", t: 0, p, s: spring(15, 0.48), done: () => done(), burst: false, shook: false, noPit: !!(o && o.pit === false) };
    dig.s.x = Math.max(sink, peekS + 0.15); dig.s.to = peekS;
    kick();
    return p;
  }
  function burrow(o) {
    if (dig && dig.k === "down") return dig.p;
    if (dig) dig.done();
    if (gone) return Promise.resolve();
    if (RM) { sink = 1.08; gone = true; render(); return Promise.resolve(); }
    let done; const p = new Promise((r) => { done = r; });
    dig = { k: "down", t: 0, p, from: sink, done: () => done(), cd: 0, noPit: !!(o && o.pit === false) };
    act = null; clearTimeout(idleT); el.classList.remove("mole-idle");
    kick();
    return p;
  }
  function stepDig(dt, P) {
    dig.t += dt;
    const t = dig.t;
    if (dig.k === "up") {
      if (!dig.burst) { dig.burst = true; for (let i = 0; i < 7; i++) { const a = rnd(-160, -20) * Math.PI / 180, s = rnd(150, 270); chip(AX + rnd(-0.12, 0.12), AY, Math.cos(a) * s, Math.sin(a) * s); } }
      dig.s.step(dt); sink = Math.max(peekS - 0.25, dig.s.x);
      const env = 1 - smooth(0.25, 0.6, t), w = Math.PI * 2 * 8;
      P.pf += 16 * Math.sin(w * t) * env; P.pr += -12 * Math.sin(w * t + 0.8) * env; P.lean += 8 * env;   // 코를 들고 헤치며 올라온다
      if (t > 0.62 && !dig.shook) { dig.shook = true; act = { k: "shake", t: 0, dur: 0.55, flips: 0 }; }
      if (t > 0.55 && dig.s.still()) { sink = peekS; const d = dig; dig = null; d.done(); schedule(true); }
    } else {
      // 0 ~ 0.3초: 코를 박고 앞발로 판다 / 0.3 ~ 0.78초: 파면서 가라앉는다 / 흙은 뒤로
      const w = Math.PI * 2 * 8.5;
      P.pf += 17 * Math.sin(w * t); P.pr += -13 * Math.sin(w * t + 0.7); P.lean += -16 * smooth(0, 0.18, t) - 6 * smooth(0.3, 0.7, t);
      dig.cd -= dt;
      if (dig.cd <= 0 && t < 0.72) { dig.cd = 0.065; chip(PAWS_AT.x, PAWS_AT.y, rnd(150, 280), rnd(-260, -140)); }
      sink = lerp(dig.from, 1.08, Math.pow(smooth(0.28, 0.78, t), 1.6));
      if (t >= 0.8) { sink = 1.08; gone = true; const d = dig; dig = null; d.done(); }
    }
  }

  // ── 한 프레임 ──
  function kick() { if (!raf && !dead && !RM) { lastTs = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(ts) {
    raf = 0;
    if (dead) return;
    const dt = Math.min(0.05, Math.max(0.001, (ts - lastTs) / 1000)); lastTs = ts;
    const now = ts / 1000;
    // 자리: 부모가 준 발 자리를 그대로 따른다. 속도는 그 움직임에서 잰다(한 프레임에 몸 폭 4배 넘게 뛰면 순간 이동으로 보고 걸음에 넣지 않는다)
    let dx = target.x - pos.x, dy = target.y - pos.y, dist = Math.hypot(dx, dy);
    const jump = !chasing && dist > Math.max(W * 4, 240);
    if (chasing) {   // 달려가 따라붙기: 한 장에 초당 900px 까지만(걸음은 실제로 간 만큼에서 나온다)
      const st = 900 * dt;
      if (dist <= st) { pos = { ...target }; chasing = false; }
      else { const k = st / dist; dx *= k; dy *= k; dist = st; pos = { x: pos.x + dx, y: pos.y + dy }; }
    } else pos = { ...target };
    const ix = jump ? 0 : dx / dt, iy = jump ? 0 : dy / dt;
    vel.x = ease(vel.x, ix, 14, dt); vel.y = ease(vel.y, iy, 14, dt);
    speed = Math.hypot(vel.x, vel.y);
    accel = ease(accel, (speed - lastSpeed) / dt, 8, dt); lastSpeed = speed;
    if (speed > 18 && !jump && !gone) lastMove = now;
    if (gone && !jump && dist > 0.5) { if (Math.abs(dx) > 1.2) face = dx > 0 ? -1 : 1; travel = { x: dx / dist, y: dy / dist }; }
    const wasMoving = moving;
    moving = now - lastMove < 0.14;
    // 출발과 멈춤
    if (moving && !wasMoving) {
      el.classList.remove("mole-idle");
      clearTimeout(idleT);
      act = null;
      sq.v -= 0.9;                                          // 웅크렸다 나간다
      const ux = vel.x / (speed || 1), uy = vel.y / (speed || 1);
      let want = face;
      if (travel && ux * travel.x + uy * travel.y < -0.35) want = -face;      // 지난번과 거꾸로 간다: 돌아선다
      else if (Math.abs(vel.x) > speed * 0.3) want = vel.x > 0 ? -1 : 1;     // 옆으로 뚜렷이 간다: 그쪽을 본다
      if (want !== face && !gone) startHop(want); else if (gone) face = want;
      travel = { x: ux, y: uy };
    } else if (!moving && wasMoving) {
      lean.v -= 55 * clamp(lastSpeed / 300, 0.35, 1.4);      // 멈추며 앞으로 쏠렸다 되돌아온다
      sq.v += 0.5;
      if (!gone) schedule(true);
    } else if (moving && speed > 25) {
      const ux = vel.x / speed, uy = vel.y / speed, dd = ux * travel.x + uy * travel.y;
      if (dd < -0.35) { revAcc += dt; if (revAcc > 0.06) { revAcc = 0; travel = { x: ux, y: uy }; if (!gone) startHop(-face); } }
      else { revAcc = 0; travel.x = ease(travel.x, ux, 4, dt); travel.y = ease(travel.y, uy, 4, dt); const n = Math.hypot(travel.x, travel.y) || 1; travel.x /= n; travel.y /= n; }
    }
    // 자세 목표
    const P = { pf: 0, pr: 0, sa: 0, rear: 0, lean: 0, bob: 0, sq: 0 };
    const fast = smooth(60, 1100, speed);
    // 걷기(돌아서거나 솟거나 들어가는 중에는 걷지 않는다)
    const walking = moving && !hop && !dig && !gone;
    gaitW = ease(gaitW, walking ? 1 : 0, walking ? 12 : 7, dt);
    if (walking) {
      const stride = W * 0.5;
      const dph = Math.min(jump ? 0 : dist / stride, 7 * dt);
      const before = Math.floor(phase * 2);
      phase += dph;
      if (Math.floor(phase * 2) > before) { stepCount++; if (fast > 0.55 && stepCount % 2 === 0) chip(HINDFOOT_AT.x, HINDFOOT_AT.y, rnd(120, 220), rnd(-170, -90)); }
    }
    if (gaitW > 0.001) {
      const s = Math.sin(Math.PI * 2 * phase), A = lerp(10, 17, fast) * gaitW;
      P.pf += A * s; P.pr += -0.75 * A * Math.sin(Math.PI * 2 * phase + 0.35);
      P.bob += -H * lerp(0.03, 0.06, fast) * Math.abs(s) * gaitW;
      P.lean += 1.8 * Math.sin(Math.PI * 2 * phase + 1.2) * gaitW;   // 뒤뚱
      P.sa += 2.6 * Math.sin(Math.PI * 4 * phase + 1) * gaitW;
      // 비탈(내려가면 코를 숙이고 올라가면 든다)과 빠르기에 따른 숙임, 빨라지면 숙이고 느려지면 젖힌다
      const slope = clamp(Math.atan2(-vel.y, Math.abs(vel.x) + 1e-3) * 180 / Math.PI, -10, 10);
      P.lean += (slope * 0.8 - 5 * fast - clamp(accel / 160, -5, 5)) * gaitW;
    }
    sx = ease(sx, 1 + 0.07 * fast * gaitW, 10, dt); sy = ease(sy, 1 - 0.05 * fast * gaitW, 10, dt);
    if (peekS > 0 && !gone && !(dig && dig.k === "down")) { P.lean += 9; P.pf += -10; P.pr += 6; }   // 빼꼼: 머리를 조금 들고 앞발은 굴 가장자리에
    if (act) { act.dt = dt; act.t += dt; actPose(act, P); if (act.t >= act.dur) { act = null; if (!moving && !gone) schedule(false); } }
    if (dig) stepDig(dt, P);
    if (hop) stepHop(dt, P);
    // 자세를 목표로(발은 빠르게, 코와 일어서기는 조금 느리게)
    pf = ease(pf, P.pf, 32, dt); pr = ease(pr, P.pr, 32, dt); sa = ease(sa, P.sa, 26, dt);
    rear = ease(rear, P.rear, 18, dt); bob = ease(bob, P.bob, 30, dt);
    lean.to = P.lean; lean.step(dt);
    sq.to = P.sq; sq.step(dt);
    stepChips(dt);
    // 굴: 솟거나 들어가는 동안 나타나고, 끝난 뒤 0.5초 머물렀다 0.6초에 걸쳐 잦아든다
    if (dig && !dig.noPit) { if (!holeAt || holeA < 0.02) { holeAt = { ...pos }; holeFast = false; } holeA = ease(holeA, 1, 18, dt); holeHold = 0.5; }
    else if (holeA > 0) { holeHold -= dt; if (holeHold <= 0 || holeFast) holeA = Math.max(0, holeA - dt / (holeFast ? 0.15 : 0.6)); if (holeA <= 0) holeAt = null; }
    render();
    // 가만히 있는 자세(빼꼼이면 앞발을 가장자리에 둔 자세)에 닿았으면 그리기를 멈춘다
    const pk = peekS > 0 && !gone, rpf = pk ? -10 : 0, rpr = pk ? 6 : 0;
    const settling = !lean.still() || !sq.still() || Math.abs(pf - rpf) + Math.abs(pr - rpr) + Math.abs(sa) + Math.abs(rear) + Math.abs(bob) > 0.05 || gaitW > 0.002;
    if (moving || hop || act || dig || chips.length || settling || holeA > 0 || chasing) raf = requestAnimationFrame(frame);
    else if (!gone && !RM && !asleep()) el.classList.add("mole-idle");     // 가만히: 숨만 쉰다(CSS). 잠들었으면 숨도 멈춘다
  }

  const io = new IntersectionObserver((es) => { onScreen = es[0].isIntersecting; }, { threshold: 0 });
  io.observe(el);
  // 깨우기: 잠들어 있었으면 쉬기 동작을 다시 잡는다(가만히 있는 두더지만. 걷거나 솟는 중이면 frame 이 맡는다)
  function wake() {
    const was = asleep();
    lastInput = performance.now();
    if (was && !dead && !gone && !moving && !dig && !hop && !act) { if (!RM) el.classList.add("mole-idle"); schedule(true); }
  }
  const WAKE_ON = ["scroll", "wheel", "pointerdown", "pointermove", "keydown", "touchstart"];
  for (const e of WAKE_ON) addEventListener(e, wake, { passive: true });
  const onVis = () => { if (!document.hidden && !moving && !gone) schedule(false); };
  document.addEventListener("visibilitychange", onVis);
  render();
  if (!gone) schedule(true);

  return {
    el,
    place(x, y, f, ox, oy) {
      wake();
      if (ox != null) off = { x: ox, y: oy };
      pos = { x, y }; target = { x, y }; vel = { x: 0, y: 0 }; speed = 0; placed = true;
      if (f === 1 || f === -1) face = f;
      render();
    },
    walkTo(x, y, ox, oy, chase) {
      if (!placed) { this.place(x, y, undefined, ox, oy); return; }
      if (chase && !RM) chasing = true;
      const offCh = ox != null && (ox !== off.x || oy !== off.y);
      if (ox != null) off = { x: ox, y: oy };
      if (x === target.x && y === target.y) { if (offCh && !raf) render(); return; }   // 자리는 그대로, 그리는 자리만 옮겨졌다(길 끝에 멈춰 있는 동안 스크롤)
      wake();
      target = { x, y };
      if (RM) {
        const dx = x - pos.x;
        if (Math.abs(dx) > 1.5) face = dx > 0 ? -1 : 1;
        pos = { x, y }; render(); return;
      }
      kick();
    },
    emerge, burrow,
    // 시안 확인용: 관절 자세를 바로 준다(옛 한 svg 판과 새 조각 층 판이 같은 자세에서 같은 그림인지 견줄 때)
    _pose(o) { if (o.lean != null) lean.x = o.lean; if (o.rear != null) rear = o.rear; if (o.pf != null) pf = o.pf; if (o.pr != null) pr = o.pr; if (o.sa != null) sa = o.sa; render(); },
    setOffset(ox, oy) { off = { x: ox, y: oy }; render(); },
    dropPit() { if (holeA > 0) { holeHold = 0; holeFast = true; kick(); } },
    get pit() { return holeA > 0.01 ? holeAt : null; },
    show() { if (dig) { const d = dig; dig = null; d.done(); } gone = false; sink = 0; render(); schedule(true); },
    hide() { if (dig) { const d = dig; dig = null; d.done(); } act = null; clearTimeout(idleT); clearChips(); gone = true; sink = 1.08; el.classList.remove("mole-idle"); render(); },
    turnTo(f) { if ((f === 1 || f === -1) && f !== face) startHop(f); },
    setNight(v) { if (!!v !== night) { night = !!v; el.classList.toggle("mole-night", night); if (pitBox) pitBox.classList.toggle("mole-night", night); } },
    get visible() { return !gone && sink < 1; },
    get busy() { return !!(dig || hop); },
    get face() { return face; },
    get state() { return { act: act ? act.k : null, moving, hop: !!hop, dig: dig ? dig.k : null, face, sink: +sink.toFixed(3) }; },   // 시안 확인용
    dispose() {
      dead = true; cancelAnimationFrame(raf); clearTimeout(idleT); io.disconnect(); ro.disconnect();
      for (const e of WAKE_ON) removeEventListener(e, wake);
      document.removeEventListener("visibilitychange", onVis); clearChips(); if (pitBox) pitBox.remove();
    },
  };
}
