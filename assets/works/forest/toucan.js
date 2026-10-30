// 투칸 비행(2026-10-15, Y 18:15 "투칸이 움직이는게 단순 점프가 아니라 날개 퍼덕거림을 구현해줘. 특히, 날아다닐 때의 과속과 감속을 잘 구현해야해.").
// 10-16 고침(Y 02:09 "천천히 퍼덕퍼덕 날갯짓이 보여야 한단 말이야. 어쩔때는 좌우 반전되는데 그 비쥬얼이 너무 어색해. 무슨 종이접기하는거같다고."):
//   - 날갯짓을 눈에 보이게 느리게(1초에 2.6~3번). 사인파가 아니라 내려치기는 빠르게(한 번의 42%), 들어 올리기는 느리게.
//     내려칠 때 몸이 뜨고 들어 올릴 때 조금 가라앉는다(뜨는 폭 = 몸 폭의 5%).
//   - 실제 투칸처럼 몇 번 퍼덕이고 날개를 편 채 미끄러지기를 되풀이한다(물결 비행). 떠날 때 4번, 그 뒤엔 2~3번씩.
//   - 좌우 반전을 가로 폭 0을 지나는 변형으로 그리지 않는다(종이접기처럼 보였다). 방향은 떠나기 전 웅크린 순간에 한 번에 정하고,
//     날던 중에는 바꾸지 않는다. 앉은 뒤 방향을 바꿔야 하면(restFace) 제자리에서 작게 뛰어 공중에서 돌아앉는다.
//   - 전체 속도를 낮춰(최고 초당 150~560px) 날갯짓이 여러 번 보이게 한다.
// 라이브 랜딩 투칸(char-toucan.svg)을 그대로 인라인으로 넣고, 그 안의 날개 그룹(g.wing)을 경첩 기준으로 돌린다.
//   경첩과 각도 문법은 라이브 랜딩 index.html setWing(0 = 접음, -100 = 활짝)을 따른다.
// 움직임은 미리 그린 경로가 아니라 속도를 가진 물리로 푼다. 그래서 날던 중에 도착점이 바뀌어도(다음 단계, 움직이는 가지) 속도가 끊기지 않는다.
//   1) 웅크리기 110ms: 몸을 낮추고 넓힌다
//   2) 박차기(가속): 큰 추력, 강한 날갯짓 4번(3Hz)
//   3) 순항: 날개를 편 채 미끄러지다 2~3번 퍼덕이기를 되풀이. 오를 때 머리를 들고 내릴 때 숙인다
//   4) 감속: 남은 거리로 정해지는 제동 곡선 v = √(2·b·거리). 제동이 추력보다 약해서 감속 구간이 가속보다 길다.
//      제동하는 동안 날개를 활짝 펴 공기를 받으며 천천히 떨고(1.6Hz), 머리를 든다
//   5) 닿기 직전 날개를 접고, 발이 닿으면 몸이 한 번 눌렸다 돌아온다
//   경로: 옆으로 날 때 위로 볼록한 호, 짧은 비행은 옆으로 한 번 휘고 긴 비행은 S자(Y 19:00 "이리저리, 대신 과하지 않게").
// 10-19 고침(Y 08:30 "투칸이 가끔가다가 이렇게 안절부절 못하고 하늘을 떠다닐 때가 있어. 내가 의도한 투칸의 동작은, 일반적으로는 앉아있다가
//   왔다갔다 움직이는거거든. 지금처럼 애매하게 떠있는건 없도록 해줘."): 앉을 자리(그루터기)는 마우스 고개 돌림과 스크롤에 따라 화면에서 움직인다.
//   전에는 도착점이 움직이는 것을 몰라서, 움직이는 자리를 뒤쫓으며 작은 날갯짓으로 떠 있었다(마우스를 계속 움직이면 끝없이).
//   이제 도착점의 속도를 재어 그만큼 함께 움직이며(도착점 기준으로 날고), 닿았는지도 도착점에 대한 상대 속도로 본다.
//   그래도 한 번의 비행이 정한 시간을 넘으면 마지막 몇 픽셀은 짧게 끌어당겨 반드시 앉힌다. 공중에 머무는 상태는 없다.
// 사용: const f = mountToucan(imgEl)  // <img src=".../char-toucan.svg"> 를 같은 클래스의 인라인 SVG 로 바꾼다
//       f.place(x, y)                  // 바로 그 자리(px, translate)
//       f.place(x, y, face)            // 바로 그 자리에 이 방향으로(1 = 그림 그대로 왼쪽, -1 = 오른쪽). 다른 투칸에게서 넘겨받을 때 방향이 툭 뒤집히지 않게(10-19)
//       f.to(x, y, { fly: true, face }) // 이번 비행만 앉은 뒤 이 방향으로 돌아앉는다(restFace 대신). 다른 투칸에게 넘겨줄 때 방향을 맞춘다(10-19)
//       f.busy                         // 날거나, 내려앉아 돌아앉는 중(넘겨줄 때는 이것이 끝난 뒤에)
//       f.to(x, y, { fly: true })      // 날아서 간다. fly 없이 to 를 부르면 날고 있을 땐 도착점만 옮기고, 앉아 있을 땐 그 자리로 붙는다
//       mountToucan(img, { restFace: 1 }) // 앉으면 늘 이 방향을 본다(1 = 그림 그대로 왼쪽, -1 = 오른쪽). 없으면 날아온 방향 그대로 앉는다
//       f.flying, f.crouching         // 날고 있나, 떠나기 전 웅크리는 중인가(아직 발이 가지에 있다)
// 10-20 가만히 동작(Y 01:31 "두더지 동작 늘린거 아주 칭찬할게. 너무 귀엽다. 투칸도 그만큼 다양화 해서 가만히 둬도 계속 움직이게 해줬으면 좋겠어.
//   입을 열렸다가 닫는 동작은 이미 있는 것 같던데. 아주 가끔 혀를 낼름거리는 것도 있었던 것 같은데, 이 혀를 낼름거리는건 너에게 맡길테니 다시 만들어줘.
//   이걸 포함해서 투칸도 두더지처럼 다양한 동작을 자동으로 자연스럽게 하도록 만들어줘."):
//   그림은 새로 그리지 않는다. 정지 SVG 의 면 15개를 라이브 생성기(landing/index.html toucanModel)의 면 순서와 맞춰 정점 이름(부리 끝, 정수리, 목, 꼬리 끝 …)을
//   되찾고 머리와 꼬리를 정점 단위로 굽힌다. 머리 정점은 목 축을 돌고, 목 둘레 정점은 무게만큼만 돌아서 머리와 몸을 잇는 면(목, 흰 멱)이 늘어날 뿐
//   이음새가 벌어지지 않는다(면을 떼어 돌리지 않는다). 아랫부리(입 벌림)와 혀, 눈, 편지는 머리를 따라간다.
//   앉아 있을 때만(날거나, 웅크리거나, 돌아앉는 중이 아닐 때) 1.8~4.4초마다 하나씩(깜빡 뒤는 1.2~2.8초), 같은 것을 잇지 않고, 큰 동작(돌아보기, 기지개,
//   털기, 깡충)은 연달아 하지 않는다. 가만히 동작은 초당 30장으로 그린다(날기와 클릭 뻐끔은 60장).
//     깜빡(가끔 두 번), 뻐끔(입을 작게 한두 번, 라이브 idleBeak 그대로), 딱딱(부리를 빠르게 두 번), 낼름(새로: 입을 살짝 벌리면 입가에서 혀가 톡 나와
//     좌우로 두 번 날름이며 들락이고, 쏙 들어간 뒤 입맛을 다시듯 고개를 짧게 떤다. 넷에 하나쯤은 한 번 더 짧게), 둘러보기(고개를 들었다가 조금 숙였다가),
//     기지개(날개를 반쯤 들어 떨다 접고 꼬리를 든다), 몸 털기(빠르게 떨다 잦아듦), 꼬리 까딱(한두 번), 기웃(몸을 앞으로 숙여 아래를 본다),
//     깡충(제자리 두 번), 돌아보기(작게 뛰어 뒤를 보고 다시 뛰어 돌아앉는다).
//   편지를 물고 있으면(letter) 입을 크게 벌리는 뻐끔과 딱딱은 하지 않고 '고쳐 물기'(고개를 들며 입을 살짝 벌려 편지를 톡 띄웠다 다시 문다)와
//     '내밀기'(앞으로 숙여 편지를 살랑 흔든다)를 한다. 낼름은 입을 3도만 벌린다(혀는 입가에서 나와 부리 끝의 편지에 닿지 않는다).
//   그리기: 동작하는 동안만 requestAnimationFrame, 사이는 setTimeout. 두더지와 같은 잠: 입력(스크롤, 휠, 마우스, 키, 터치)과 날기가 20초 없으면
//     다음 동작을 잡지 않고, 입력이 오면 바로 깬다. 화면 밖, 탭 숨김, 투칸이 안 보일 때(옅기 0)는 건너뛴다. 움직임 줄이기면 가만히 동작이 없다.
// 10-20 편지(Y 01:31 "기존 랜딩에는 '투칸의 편지'라는게 있었어. 히어로에 있는 투칸의 입에 편지를 물려서, 투칸을 클릭하면 그 편지가 뜨도록 해줘."):
//   letter 를 켜면 부리 끝에 다각형 봉투를 문다. 봉투는 몸보다 뒤(두 부리 사이 가운데 면)에 그려 부리 옆면이 봉투 윗모서리를 덮는다.
//   투칸 위에 투명한 단추(키보드로도 닿는다, '투칸의 편지 열기')를 띄우고 마우스를 올리면 라이브처럼 '투칸의 편지' 제목이 뜬다.
//   누르면 라이브처럼 한 번 뻐끔하며(부리 0 → 26도 두 번, 날개 한 번) 편지를 놓고, 놓은 자리에서 대화상자가 커진다(shared/letter.js).
//   닫으면 다시 문다(봉투가 부리 끝에서 톡 커지며 입을 한 번 다문다).
// 사용(덧붙임): mountToucan(img, { idle: false })  // 가만히 동작 끄기(기본은 켬)
//              mountToucan(img, { letter: true })  // 편지를 문다. f.letter = 지금 물고 있나
//              f.act(이름), f.dispose()            // 시안 확인용 동작 바로 하기(주소에 ?tcdbg 면 window.__tcs 에 모인다), 치우기
const SVG_URL = new URL("../char-toucan.svg", import.meta.url).href;
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a, b, t) => { const x = clamp((t - a) / (b - a)); return x * x * (3 - 2 * x); };
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (cur, want, rate, dt) => cur + (want - cur) * (1 - Math.exp(-rate * dt));   // 프레임률에 무관한 지수 접근
const sine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;   // 부드럽게 떠나 부드럽게 닿는 곡선
// 한 번의 날갯짓(u = 0..1). 0 = 날개를 다 든 자리(-100). 내려치기 0~.42 는 빠르게, 들어 올리기 .42~1 은 느리게.
// lift = 몸이 뜨는 정도(내려칠 때 +, 들어 올릴 때 조금 -)
function stroke(u) {
  if (u < .42) { const k = u / .42; return { a: lerp(-100, -4, sine(k)), lift: Math.sin(Math.PI * k) }; }
  const k = (u - .42) / .58;
  return { a: lerp(-4, -100, sine(k)), lift: -.35 * Math.sin(Math.PI * k) };
}
let svgText = null;
const getSvg = () => (svgText ||= fetch(SVG_URL).then((r) => r.text()));
const outCubic = (t) => 1 - Math.pow(1 - clamp(t), 3);
const inCubic = (t) => Math.pow(clamp(t), 3);
const inOut = (t) => sine(clamp(t));
const outBack = (t) => { const c = 1.7, u = clamp(t) - 1; return 1 + (c + 1) * u * u * u + c * u * u; };
const rnd = (a, b) => a + Math.random() * (b - a);
const NS = "http://www.w3.org/2000/svg";

// ── 정점 이름(10-20) ──
// 라이브 생성기 toucanModel 의 면 15개(정점 이름 = 생성기 그대로). 정지 SVG 는 같은 순서로 그렸고, 아랫부리 면(2, 7)과 날개 면(11, 12)만 묶음으로 옮겨 있다
const FACES = [
  ["beakUpper", "crown", "beakGoldBottom", "beakLower"], ["beakTipTop", "beakUpper", "beakLower", "beakTipBottom"],
  ["beakTipBottom", "beakLower", "beakGoldBottom", "beakRoot", "beakChin", "beakUnder", "beakBend"], ["crown", "beakRoot", "beakGoldBottom"],
  ["crown", "headTop", "headBack", "headWing", "neckTop", "faceBottom", "faceTop"], ["crown", "faceTop", "faceBottom", "beakRoot"],
  ["beakRoot", "faceBottom", "neckTop", "bodyNexus", "frontMid", "throatFrontBottom", "beakThroat"], ["beakRoot", "beakThroat", "beakChin"],
  ["neckTop", "headWing", "wingStart", "bodyNexus"], ["throatFrontBottom", "frontMid", "bodyFrontBottom"],
  ["frontMid", "bodyNexus", "wingStart", "headWing", "tailBackRoot", "tailRoot", "bodyTail", "bodyBottom", "bodyFrontBottom"],
  ["wingStart", "headWing", "wingOuterTop", "wingOuter"], ["wingStart", "wingOuter", "bodyOuter", "tailBackRoot", "tailRoot"],
  ["tailRoot", "bodyTail", "tailInner", "tailTip"], ["tailRoot", "tailBackRoot", "tailRear", "tailTip"],
];
const MAIN = [0, 1, 3, 4, 5, 6, 8, 9, 10, 13, 14], LOWER = [2, 7];   // 몸 묶음 면 순서, 아랫부리 묶음 면 순서
// 머리 무게: 1 = 머리와 함께 다 돈다, 사이 값 = 그만큼만(목, 흰 멱이 늘어난다), 없음 = 몸에 붙어 있다. 날개 면의 정점(headWing 등)은 0 으로 두어 날개를 건드리지 않는다
const HEAD_W = { beakTipTop: 1, beakUpper: 1, beakLower: 1, beakTipBottom: 1, beakBend: 1, beakUnder: 1, beakChin: 1, beakGoldBottom: 1, crown: 1, beakRoot: 1,
  faceTop: 1, headTop: 1, faceBottom: .92, headBack: .85, beakThroat: .85, neckTop: .45, bodyNexus: .12, throatFrontBottom: .1 };
const TAIL_W = { tailInner: 1, tailTip: 1, tailRear: 1, bodyTail: .25 };   // 꼬리 = 꼬리 뿌리(tailRoot)를 돈다
// 2D 변환 [a b c d e f](SVG matrix): x' = a x + c y + e, y' = b x + d y + f
const mul = (A, B) => [A[0] * B[0] + A[2] * B[1], A[1] * B[0] + A[3] * B[1], A[0] * B[2] + A[2] * B[3], A[1] * B[2] + A[3] * B[3], A[0] * B[4] + A[2] * B[5] + A[4], A[1] * B[4] + A[3] * B[5] + A[5]];
const rotM = (deg, px, py) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [c, s, -s, c, px - c * px + s * py, py - s * px - c * py]; };
const scaleAt = (kx, ky, cx, cy) => [kx, 0, 0, ky, cx - kx * cx, cy - ky * cy];
const ap = (M, p) => [M[0] * p[0] + M[2] * p[1] + M[4], M[1] * p[0] + M[3] * p[1] + M[5]];
const mstr = (M) => `matrix(${M.map((v) => v.toFixed(4)).join(" ")})`;

// ── 편지(10-20): 투칸 그림체의 봉투. 테두리 없는 면, 빛은 왼쪽 위. 원점 = 문 자리(봉투 오른쪽 위 모서리, 부리 안에 들어가 가려진다) ──
const ENV = [
  [[[-150, 0], [0, 0], [0, 100], [-150, 100]], "#eadcbb"],   // 바탕
  [[[-150, 0], [-75, 50], [-150, 100]], "#e4d4ae"],           // 왼쪽 날개
  [[[0, 0], [0, 100], [-75, 50]], "#d8c49b"],                 // 오른쪽 날개(그늘)
  [[[-150, 100], [-75, 50], [0, 100]], "#f0e5c9"],            // 아래 날개
  [[[-150, 0], [0, 0], [-75, 58]], "#f7efda"],                // 덮개(빛을 받는다)
];
const SEAL = { c: [-75, 58], r: 12, a: "#2f6b46", b: "#3d8256" };   // 밀랍 = 숲 초록(브랜드 악센트)
const GRIP = [118, 392], GRIP_ROT = -28;   // 문 자리(아랫부리 끝 안쪽)와 봉투가 처진 각도
const LETTER_FOCUS = [-62, 52];            // 대화상자가 커져 나오는 자리(봉투 가운데쯤, 봉투 좌표)

// ── 가만히 동작(10-20). init(a, 편지 물었나) 가 길이(dur)와 변주를 정하고, pose(a, t, P, B, A, api) 가 그 순간의 자세를 준다 ──
// P = 그림 안 자세(head + = 부리를 든다, mouth = 입 벌림, tail + = 꼬리를 든다, blink 0~1, tk 혀 길이 0~1, trot 혀 까딱, lx ly lr = 편지 흔들림)
// B = 몸(rot - = 앞으로 숙임, sx sy 눌림, bob 뜀 px, wing 날개 각도). A = 몸 폭의 5%(px). 모든 동작은 0 에서 떠나 0 으로 돌아온다
const bl = (x) => (x < 0 || x > 0.2 ? 0 : x < 0.06 ? x / 0.06 : x < 0.09 ? 1 : 1 - (x - 0.09) / 0.11);   // 깜빡 한 번(0.2초)
const holdEnv = (t, a, i, o) => (t < i ? inOut(t / i) : t < i + a.h ? 1 : 1 - inOut((t - i - a.h) / o));
const ACTS = {
  blink: { w: 3, free: 1, hold: 1, init: (a) => { a.two = Math.random() < 0.3; a.dur = a.two ? 0.46 : 0.22; },
    pose: (a, t, P) => { P.blink = bl(t) + (a.two ? bl(t - 0.25) : 0); } },
  peek: { w: 2.2, free: 1, init: (a) => { a.n = Math.random() < 0.45 ? 2 : 1; a.dur = 0.36 * a.n + 0.06; },
    pose: (a, t, P) => { const u = clamp(t / (0.36 * a.n)); P.mouth = 16 * (1 - Math.cos(2 * Math.PI * a.n * u)) / 2; P.head = 2.5 * Math.sin(Math.PI * clamp(t / a.dur)); } },
  clack: { w: 0.6, free: 1, init: (a) => { a.dur = 0.5; },
    pose: (a, t, P) => { P.mouth = t < 0.455 ? 11 * Math.max(0, Math.sin(2 * Math.PI * 4.4 * t)) : 0; P.head = 1.5 * Math.sin(Math.PI * clamp(t / 0.5)); } },
  lick: { w: 1, free: 1, hold: 1, init: (a, H) => { a.amp = H ? 3 : 7; a.two = Math.random() < 0.28; a.dur = a.two ? 1.42 : 1.02; },
    pose: (a, t, P) => {
      P.mouth = a.amp * (outCubic(t / 0.1) - smooth(0.7, 0.86, t));
      let k = 0, r = 0;
      if (t > 0.06 && t < 0.2) k = outBack((t - 0.06) / 0.14);
      else if (t >= 0.2 && t < 0.58) { const x = t - 0.2; k = 1 - 0.16 * (1 - Math.cos(2 * Math.PI * 2.6 * x)) / 2; r = 12 * Math.sin(2 * Math.PI * 2.6 * x) * Math.sin(Math.PI * x / 0.38); }
      else if (t >= 0.58 && t < 0.74) k = 1 - inCubic((t - 0.58) / 0.16);
      P.head = 2.5 * Math.sin(Math.PI * clamp(t / 0.86));
      if (t > 0.86 && t < 1.02) P.head += 1.6 * Math.sin(2 * Math.PI * 7 * (t - 0.86)) * Math.exp(-5 * (t - 0.86));
      if (a.two && t > 1.06) {
        const x = t - 1.06;
        P.mouth += a.amp * 0.8 * Math.sin(Math.PI * clamp(x / 0.32));
        k = x < 0.09 ? 0.85 * outBack(x / 0.09) : 0.85 * (1 - inCubic((x - 0.09) / 0.16));
        r = -8 * Math.sin(Math.PI * clamp(x / 0.25));
      }
      P.tk = Math.max(0, k); P.trot = r;
    } },
  look: { w: 1.8, free: 1, hold: 1, init: (a) => { a.dir = Math.random() < 0.62 ? 1 : -1; a.h = rnd(0.45, 0.85); a.bt = Math.random() < 0.45 ? rnd(0.35, 0.3 + a.h) : -1; a.dur = 0.3 + a.h + 0.28 + 0.22 + 0.34; },
    pose: (a, t, P) => {
      const t1 = 0.3, t2 = t1 + a.h, t3 = t2 + 0.28, t4 = t3 + 0.22;
      const h = t < t1 ? 6.5 * outCubic(t / t1) : t < t2 ? 6.5 + 1.1 * Math.sin(2 * Math.PI * 1.6 * (t - t1)) * Math.sin(Math.PI * (t - t1) / a.h)
        : t < t3 ? lerp(6.5, -3, inOut((t - t2) / 0.28)) : t < t4 ? -3 : -3 * (1 - inOut((t - t4) / 0.34));
      P.head = h * a.dir; P.tail = -0.25 * h * a.dir;
      if (a.bt > 0) P.blink = bl(t - a.bt);
    } },
  stretch: { w: 0.9, free: 1, hold: 1, big: 1, init: (a) => { a.dur = 1.4; },
    pose: (a, t, P, B) => {
      B.wing = t < 0.42 ? -48 * outCubic(t / 0.42) : t < 0.9 ? -48 + 3.5 * Math.sin(2 * Math.PI * 6 * (t - 0.42)) * Math.sin(Math.PI * (t - 0.42) / 0.48) : -48 * (1 - inOut((t - 0.9) / 0.46));
      const env = Math.sin(Math.PI * clamp(t / 1.36));
      B.rot = -3 * env; B.sy = 1 - 0.022 * env; B.sx = 1 + 0.012 * env; P.tail = 8 * env; P.head = 2 * env;
    } },
  shake: { w: 0.7, free: 1, hold: 1, big: 1, init: (a) => { a.dur = 0.9; },
    pose: (a, t, P, B) => {
      if (t < 0.1) { B.sy = 1 - 0.04 * Math.sin(Math.PI * t / 0.1); return; }
      const x = t - 0.1, e = Math.exp(-3.6 * x), f = e * Math.sin(2 * Math.PI * 7.5 * x);
      B.rot = 4.2 * f; B.sy = 1 + 0.03 * e * Math.sin(2 * Math.PI * 7.5 * x + 1.2); B.wing = -12 * Math.abs(f);
      P.head = -3.2 * f; P.tail = 5 * f; P.lr = 7 * f;
    } },
  tail: { w: 1.5, free: 1, hold: 1, init: (a) => { a.n = Math.random() < 0.38 ? 2 : 1; a.dur = 0.34 * a.n + 0.12; },
    pose: (a, t, P, B) => {
      let v = 0;
      for (let i = 0; i < a.n; i++) { const x = t - i * 0.34; if (x >= 0) v += x < 0.1 ? 11 * outCubic(x / 0.1) : 11 * Math.exp(-7 * (x - 0.1)) * Math.cos(2 * Math.PI * 1.7 * (x - 0.1)); }
      P.tail = v * (1 - smooth(a.dur - 0.08, a.dur, t)); B.rot = -0.08 * P.tail;
    } },
  peer: { w: 0.9, free: 1, hold: 1, init: (a) => { a.h = rnd(0.45, 0.9); a.bt = Math.random() < 0.4 ? 0.3 + a.h * 0.7 : -1; a.dur = 0.3 + a.h + 0.36; },
    pose: (a, t, P, B) => { const env = holdEnv(t, a, 0.3, 0.36); B.rot = -5 * env; P.head = -4.5 * env; P.tail = 5 * env; if (a.bt > 0) P.blink = bl(t - a.bt); } },
  hop: { w: 0.5, free: 1, hold: 1, big: 1, init: (a) => { a.dur = 0.66; },
    pose: (a, t, P, B, A) => {
      for (const s0 of [0, 0.3]) {
        const x = t - s0;
        if (x >= 0 && x < 0.2) B.bob = -A * 1.4 * Math.sin(Math.PI * x / 0.2);
        else if (x >= 0.2 && x < 0.32) { const k = (x - 0.2) / 0.12; B.sy = 1 - 0.07 * Math.sin(Math.PI * k); B.sx = 1 + 0.04 * Math.sin(Math.PI * k); }
      }
      P.tail = 4 * Math.sin(Math.PI * clamp(t / 0.66)); P.lr = 5 * Math.sin(2 * Math.PI * 3 * t) * (1 - clamp(t / 0.66));
    } },
  lookBack: { w: 0.55, free: 1, hold: 1, big: 1, init: (a) => { a.stay = rnd(0.8, 1.5); a.dur = 1.04 + a.stay; a.flips = 0; a.bt = Math.random() < 0.5 ? 0.52 + a.stay * 0.5 : -1; },
    pose: (a, t, P, B, A, api) => {
      const hopAt = (x) => {   // 작은 뜀 0.52초: 앞 0.3초 = 뜀(꼭대기에서 돈다, 가로 폭 0 을 지나는 뒤집기 없이), 뒤 = 내려앉으며 한 번 눌림
        if (x < 0 || x > 0.52) return;
        if (x < 0.3) B.bob = -A * 2.1 * Math.sin(Math.PI * x / 0.3);
        else { const k = (x - 0.3) / 0.22, sq = 0.09 * Math.exp(-5 * k) * Math.cos(k * Math.PI * 2.4); B.sy = 1 - sq; B.sx = 1 + sq * 0.6; }
      };
      hopAt(t); hopAt(t - 0.52 - a.stay);
      if (a.flips === 0 && t >= 0.15) { a.flips = 1; api.flip(); }
      if (a.flips === 1 && t >= 0.67 + a.stay) { a.flips = 2; api.flip(); }
      if (t > 0.52 && t < 0.52 + a.stay) P.head = 4 * Math.sin(Math.PI * (t - 0.52) / a.stay);
      if (a.bt > 0) P.blink = bl(t - a.bt);
    } },
  regrip: { w: 1.4, hold: 1, init: (a) => { a.dur = 0.82; },
    pose: (a, t, P) => {
      P.head = t < 0.16 ? 7 * outCubic(t / 0.16) : t < 0.3 ? 7 : 7 * (1 - inOut((t - 0.3) / 0.32));
      if (t > 0.13 && t < 0.36) P.mouth = 13 * Math.sin(Math.PI * (t - 0.13) / 0.23);
      const x = (t - 0.15) / 0.22;
      if (x > 0 && x < 1) { P.ly = -16 * Math.sin(Math.PI * x); P.lr = 12 * Math.sin(Math.PI * x); }
      else if (x >= 1) P.lr = 5 * Math.exp(-8 * (t - 0.37)) * Math.cos(2 * Math.PI * 3 * (t - 0.37)) * (1 - smooth(a.dur - 0.1, a.dur, t));
    } },
  present: { w: 0.8, hold: 1, init: (a) => { a.h = rnd(0.5, 0.8); a.dur = 0.3 + a.h + 0.36; },
    pose: (a, t, P, B) => {
      const env = holdEnv(t, a, 0.3, 0.36);
      B.rot = -4 * env; P.head = -3 * env; P.lr = 7 * Math.sin(2 * Math.PI * 3.2 * t) * env; P.ly = 3 * Math.sin(2 * Math.PI * 3.2 * t + 1) * env;
    } },
};
const BIG = (k) => !!(ACTS[k] && ACTS[k].big);
const SLEEP = 20000;                                   // 입력이 이만큼 없으면 가만히 동작도 쉰다(두더지, 첫 화면 숲과 같은 20초)
const WAKE_ON = ["scroll", "wheel", "pointerdown", "pointermove", "keydown", "touchstart"];
const DBG = typeof location !== "undefined" && /[?&]tcdbg\b/.test(location.search);
let letterIsOpen = false, cssIn = false;
const HIT_CSS = `
.tc-hit { position: absolute; left: 0; top: 0; margin: 0; padding: 0; border: 0; border-radius: 14px; background: transparent; cursor: pointer; pointer-events: auto;
  -webkit-tap-highlight-color: transparent; }
.tc-hit[hidden], .tc-tip[hidden] { display: none; }
.tc-hit:focus-visible { outline: 2px solid rgba(255, 255, 255, .92); outline-offset: 2px; box-shadow: 0 0 0 5px rgba(8, 20, 14, .32); }
.tc-tip { position: absolute; left: 0; top: 0; pointer-events: none; white-space: nowrap; color: #fff;
  font-family: var(--font, system-ui, sans-serif); font-size: 14px; font-weight: 650; line-height: 1.2; letter-spacing: -.01em;
  text-shadow: 0 0 2px rgba(8, 20, 14, .9), 0 1px 3px rgba(8, 20, 14, .72), 0 2px 14px rgba(8, 20, 14, .5);
  opacity: 0; translate: 0 4px; transition: opacity .14s ease, translate .18s cubic-bezier(.2, .8, .2, 1); }
.tc-hit:hover + .tc-tip, .tc-hit:focus-visible + .tc-tip { opacity: 1; translate: 0 0; }
@media (hover: none) { .tc-tip { display: none; } }
@media (prefers-reduced-motion: reduce) { .tc-tip { transition: none; translate: none; } }
`;
if (typeof document !== "undefined") document.addEventListener("tc-letter", (e) => { letterIsOpen = !!(e.detail && e.detail.open); });

// 글은 페이지의 짝(index.html #tk-i18n, window.TK.t)에서 이 페이지 언어 쪽을 읽는다. 짝이 없으면(시안처럼 페이지 몫이 없을 때) 한국어 원문
const T = (k, fb) => (window.TK && window.TK.t && window.TK.t(k)) || fb;
export function mountToucan(img, { rest = null, restFace = rest, idle = true, letter = false } = {}) {
  const el = document.createElement("span");
  el.className = `${img.className} tc-fly`;
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = "display:block;aspect-ratio:820.8/660.4;transform-origin:50% 100%;will-change:transform";
  img.replaceWith(el);
  let wing = null, hinge = [646.62, 428.51], wingDeg = 0;
  const setWing = (deg) => { wingDeg = deg; if (wing) wing.setAttribute("transform", `rotate(${deg.toFixed(1)} ${hinge[0]} ${hinge[1]})`); };
  getSvg().then((txt) => {
    el.innerHTML = txt.replace(/<!--[\s\S]*?-->/g, "");
    const svg = el.querySelector("svg");
    svg.style.cssText = "display:block;width:100%;height:100%;overflow:visible";
    wing = svg.querySelector("g.wing");
    const m = wing && /rotate\(\s*[-\d.]+\s+([-\d.]+)\s+([-\d.]+)\)/.exec(wing.getAttribute("transform") || "");
    if (m) hinge = [+m[1], +m[2]];
    setWing(wingDeg);
    rig = buildRig(svg);
    applyRig(true);
  });

  let pos = { x: 0, y: 0 }, vel = { x: 0, y: 0 }, target = { x: 0, y: 0 }, placed = false;
  let face = restFace === -1 ? -1 : 1, rot = 0, sx = 1, sy = 1, bob = 0, wingCur = 0;
  let fl = null, settle = null, raf = 0, lastTs = 0, landFace = null;
  let tv = { x: 0, y: 0 }, tPrev = null;   // 도착점의 화면 속도(px/s). 그루터기가 카메라를 따라 화면에서 움직이는 만큼
  // ── 10-20: 정점 틀, 가만히 동작, 편지 ──
  const IDLE = idle !== false && !RM, wantLetter = !!letter;
  let rig = null, rigKey = "", rigEase = false;
  const rp = { head: 0, mouth: 0, tail: 0, blink: 0, tk: 0, trot: 0, lx: 0, ly: 0, lr: 0, ls: 1, lo: wantLetter ? 1 : 0 };   // 지금 그림 안 자세
  let act = null, lastAct = "", lastBig = false, idleT = 0, lastInput = performance.now(), onScreen = true, dead = false, lost = 0;
  let holding = wantLetter, talk = null, lpop = null, pendingOpen = null;
  const asleep = () => performance.now() - lastInput > SLEEP;
  const neutral = () => ({ head: 0, mouth: 0, tail: 0, blink: 0, tk: 0, trot: 0, lx: 0, ly: 0, lr: 0, ls: 1, lo: holding ? 1 : 0 });
  function buildRig(svg) {
    const g = svg.querySelector(":scope > g");
    if (!g) return null;
    const polys = (p) => [...p.children].filter((n) => n.localName === "polygon");
    const lowerG = g.querySelector(":scope > g.lower-beak");
    const main = polys(g), lower = lowerG ? polys(lowerG) : [];
    const tongue = lowerG && lowerG.querySelector(":scope > g.tongue"), eye = g.querySelector(":scope > circle");
    if (main.length !== MAIN.length || lower.length !== LOWER.length || !tongue || !eye) return null;   // 그림이 바뀌었으면 정점 동작 없이(날개만) 둔다
    const V = {}, faces = [];
    const take = (pel, fi, low) => {
      const pts = pel.getAttribute("points").trim().split(/\s+/).map((q) => q.split(",").map(Number)), keys = FACES[fi];
      if (pts.length !== keys.length) return false;
      keys.forEach((k, i) => { if (!V[k]) V[k] = pts[i]; });
      faces.push({ el: pel, keys, low });
      return true;
    };
    if (!main.every((pel, i) => take(pel, MAIN[i], false)) || !lower.every((pel, i) => take(pel, LOWER[i], true))) return null;
    const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    // 혀 자리(라이브 생성기 tongue 그대로): 윗부리와 아랫부리 이음선의 입가 쪽 20% 지점에서, 이음선에 수직인 아래를 부리 끝 쪽으로 22도 기울여 늘어진다
    const sdx = V.beakGoldBottom[0] - V.beakLower[0], sdy = V.beakGoldBottom[1] - V.beakLower[1], sl = Math.hypot(sdx, sdy);
    const TG = { root: mix(V.beakGoldBottom, V.beakLower, 0.2), u: [sdx / sl, sdy / sl], n: [-sdy / sl, sdx / sl], lean: 22 };
    let letterG = null;
    if (wantLetter) {   // 몸 묶음의 맨 앞(= 맨 뒤에 그려짐): 부리 옆면이 봉투의 문 모서리를 덮는다
      letterG = document.createElementNS(NS, "g");
      letterG.setAttribute("class", "tc-letter");
      const pt = (q) => q.map((v) => v.toFixed(1)).join(",");
      for (const [pts, c] of ENV) {
        const p = document.createElementNS(NS, "polygon");
        p.setAttribute("points", pts.map(pt).join(" ")); p.setAttribute("fill", c); p.setAttribute("stroke", c); p.setAttribute("stroke-width", ".8"); p.setAttribute("stroke-linejoin", "round");
        letterG.appendChild(p);
      }
      const sv = [], N = 7;
      for (let i = 0; i < N; i++) { const t = -Math.PI / 2 + i / N * Math.PI * 2; sv.push([SEAL.c[0] + Math.cos(t) * SEAL.r, SEAL.c[1] + Math.sin(t) * SEAL.r]); }
      const s1 = document.createElementNS(NS, "polygon"); s1.setAttribute("points", sv.map(pt).join(" ")); s1.setAttribute("fill", SEAL.a);
      const s2 = document.createElementNS(NS, "polygon"); s2.setAttribute("points", [sv[5], sv[6], sv[0], SEAL.c].map(pt).join(" ")); s2.setAttribute("fill", SEAL.b);
      letterG.append(s1, s2);
      g.insertBefore(letterG, g.firstChild);
    }
    return { V, moving: faces.filter((f) => f.low || f.keys.some((k) => HEAD_W[k] || TAIL_W[k])), tongue, eye, eyeC: [+eye.getAttribute("cx"), +eye.getAttribute("cy")],
      TG, neck: [V.neckTop[0] + 6, V.neckTop[1] - 22], letterG };
  }
  const tongueM = (k, deg) => {   // 라이브 tongueTf: 로컬 x = 이음선 방향, 로컬 y = 늘어지는 방향. k 0(숨김)~1, 뿌리를 축으로 자란다
    const T = rig.TG, a = (T.lean + deg) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), kk = Math.max(0.001, k);
    const v = [T.n[0] * c - T.n[1] * s, T.n[0] * s + T.n[1] * c];
    return [T.u[0] * kk, T.u[1] * kk, v[0] * kk, v[1] * kk, T.root[0], T.root[1]];
  };
  // 그림 안 자세를 면에 쓴다. 같은 자세면 다시 쓰지 않는다(가만히 있을 때는 아무것도 쓰지 않는다)
  function applyRig(force) {
    if (!rig) return;
    const key = `${rp.head.toFixed(2)},${rp.mouth.toFixed(2)},${rp.tail.toFixed(2)},${rp.blink.toFixed(3)},${rp.tk.toFixed(3)},${rp.trot.toFixed(1)},${rp.lx.toFixed(1)},${rp.ly.toFixed(1)},${rp.lr.toFixed(2)},${rp.ls.toFixed(3)},${rp.lo.toFixed(3)}`;
    if (!force && key === rigKey) return;
    rigKey = key;
    const { V, neck } = rig, Hm = new Map(), Tm = new Map();
    const hm = (w) => { let M = Hm.get(w); if (!M) Hm.set(w, M = rotM(rp.head * w, neck[0], neck[1])); return M; };
    const tm = (w) => { let M = Tm.get(w); if (!M) Tm.set(w, M = rotM(-rp.tail * w, V.tailRoot[0], V.tailRoot[1])); return M; };
    const Mo = rotM(-rp.mouth, V.beakRoot[0], V.beakRoot[1]);   // 입 벌림: 아랫부리를 부리 뿌리에서 돌린다(라이브 setBeak 와 같은 부호)
    for (const f of rig.moving) {
      let s = "";
      for (const k of f.keys) {
        let p = V[k];
        if (f.low) p = ap(Mo, p);
        const wh = HEAD_W[k], wt = TAIL_W[k];
        if (wh) p = ap(hm(wh), p);
        if (wt) p = ap(tm(wt), p);
        s += (s ? " " : "") + p[0].toFixed(2) + "," + p[1].toFixed(2);
      }
      if (s !== f.last) { f.last = s; f.el.setAttribute("points", s); }
    }
    const H = hm(1);
    setA(rig.tongue, "transform", mstr(mul(H, mul(Mo, tongueM(rp.tk, rp.trot)))));
    setA(rig.eye, "transform", mstr(mul(H, scaleAt(1, 1 - 0.9 * clamp(rp.blink), rig.eyeC[0], rig.eyeC[1]))));
    if (rig.letterG) {
      const L = mul(H, mul([1, 0, 0, 1, GRIP[0] + rp.lx, GRIP[1] + rp.ly], mul(rotM(GRIP_ROT + rp.lr, 0, 0), scaleAt(rp.ls, rp.ls, -36, 10))));
      setA(rig.letterG, "transform", mstr(L));
      setA(rig.letterG, "opacity", clamp(rp.lo).toFixed(3));
      const disp = rp.lo < 0.005 ? "none" : "";
      if (rig.letterG.style.display !== disp) rig.letterG.style.display = disp;
    }
  }
  const setA = (n, k, v) => { if (n.getAttribute(k) !== v) n.setAttribute(k, v); };
  // 그 순간의 그림 안 자세와 몸(가만히 동작, 클릭 뻐끔, 편지 놓기와 다시 물기). 날거나 내려앉는 중이면 동작을 거두고 자세만 제자리로 돌린다
  function poseFrame(dt, A) {
    if (act && (fl || settle)) cancelAct();
    const P = neutral();
    let B = null;
    if (act) {
      act.t += dt;
      B = { rot: 0, sx: 1, sy: 1, bob: 0, wing: 0 };
      ACTS[act.k].pose(act, act.t, P, B, A, api);
      if (act.t >= act.dur) { lastBig = BIG(act.k); act = null; Object.assign(P, neutral()); B = { rot: 0, sx: 1, sy: 1, bob: 0, wing: 0 }; schedule(false); }
    }
    if (talk) {   // 라이브 chatter: 0.9초 동안 입을 두 번 벌렸다 다물고(0 → 26 → 0 → 26 → 0) 날개를 한 번 파닥인다. 첫 벌림에 편지를 놓는다
      talk.t += dt;
      const u = clamp(talk.t / (RM ? 0.01 : 0.9));
      P.mouth = 26 * (1 - Math.cos(4 * Math.PI * u)) / 2; P.head = 3 * Math.sin(Math.PI * u);
      if (!fl && !settle) { B = B || { rot: 0, sx: 1, sy: 1, bob: 0, wing: 0 }; B.wing = -100 * (1 - Math.cos(2 * Math.PI * u)) / 2; }
      if (!talk.released && u > 0.12) { talk.released = true; releaseLetter(); }
      if (u >= 1) { talk = null; Object.assign(P, neutral()); if (!fl && !settle) B = { rot: 0, sx: 1, sy: 1, bob: 0, wing: 0 }; }
    }
    if (lpop) {
      lpop.t += dt;
      const u = clamp(lpop.t / lpop.dur);
      if (lpop.out) { P.lo = 1 - u; P.ly += 16 * u; P.lr += 8 * u; }
      else { P.ls = 0.55 + 0.45 * outBack(u); P.lo = clamp(u * 3); if (!talk) P.mouth = Math.max(P.mouth, 10 * Math.sin(Math.PI * u)); }
      if (u >= 1) { lpop = null; Object.assign(P, { ls: 1, lo: holding ? 1 : 0 }); }
    }
    if (act || talk || lpop || B) { Object.assign(rp, P); rigEase = false; }
    else if (rigEase) {   // 동작이 거둬졌다: 0.15초 남짓에 제자리로
      let far = false;
      for (const k in P) { rp[k] = ease(rp[k], P[k], 22, dt); if (Math.abs(rp[k] - P[k]) > 0.01) far = true; }
      if (!far) { Object.assign(rp, P); rigEase = false; }
    }
    if (B && !fl && !settle) {
      rot = B.rot; sx = B.sx; sy = B.sy; bob = B.bob;
      if (Math.abs(B.wing - wingCur) > 0.05 || (B.wing === 0 && wingCur !== 0)) { wingCur = B.wing; setWing(wingCur); }
    }
  }
  function cancelAct() { if (act) { lastBig = BIG(act.k); act = null; rigEase = true; schedule(false); } }
  function pickAct() {
    const keys = Object.keys(ACTS).filter((k) => {
      const D = ACTS[k];
      return k !== lastAct && (holding ? D.hold : D.free) && !(D.big && lastBig);
    });
    let sum = 0; for (const k of keys) sum += ACTS[k].w;
    let r = Math.random() * sum;
    for (const k of keys) { r -= ACTS[k].w; if (r <= 0) return k; }
    return keys[0] || "blink";
  }
  function startAct(k) {
    const a = { k, t: 0, dur: 1 };
    ACTS[k].init(a, holding);
    act = a; lastAct = k; rigEase = false;
    kick();
  }
  const shown = () => (el.checkVisibility ? el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : +getComputedStyle(el).opacity > 0.02);
  function schedule(first) {
    clearTimeout(idleT); idleT = 0;
    if (!IDLE || dead) return;
    idleT = setTimeout(tryAct, first ? rnd(1000, 2200) : lastAct === "blink" ? rnd(1200, 2800) : rnd(1800, 4400));
  }
  function tryAct() {
    idleT = 0;
    if (dead) return;
    if (!el.isConnected) { if (++lost > 3) dispose(); else schedule(false); return; }   // 시안을 바꿔 투칸이 빠졌다(잠깐 옮기는 중일 수 있어 몇 번 본다)
    lost = 0;
    if (hit) { visAt = 0; syncHit(); }                // 숲이 쉬어 자리를 다시 그리지 않는 동안에도 단추의 보임을 맞춘다
    if (asleep()) return;                              // 잠: 다음 입력(wake)까지 쉬기 동작도 없다
    if (fl || settle || act || talk || lpop || !placed || letterIsOpen || document.hidden || !onScreen || !rig || !shown()) { schedule(false); return; }
    startAct(pickAct());
  }
  function wake() {
    const was = asleep();
    lastInput = performance.now();
    if (was && !dead && !idleT && !act) schedule(true);
  }
  // ── 편지: 투명 단추와 제목(투칸 상자 바로 뒤 형제. 투칸의 빛 거르개가 제목과 포커스 테두리에 묻지 않게) ──
  let hit = null, tip = null, hitPar = null, hitOff = [0, 0], hitSz = [0, 0], hitVis = null, visAt = 0, lastCls = null, ro = null, mo = null;
  function ensureHit() {
    if (!wantLetter || hit || !el.parentNode) return;
    if (!cssIn) { cssIn = true; const st = document.createElement("style"); st.textContent = HIT_CSS; document.head.appendChild(st); }
    hit = document.createElement("button");
    hit.type = "button"; hit.className = "tc-hit";
    hit.setAttribute("aria-label", T("tc-open", "투칸의 편지 열기")); hit.setAttribute("aria-haspopup", "dialog");
    tip = document.createElement("span"); tip.className = "tc-tip"; tip.setAttribute("aria-hidden", "true"); tip.textContent = T("tc-tip", "투칸의 편지");
    hit.addEventListener("click", onLetterClick);
    ro = new ResizeObserver(() => { hitSz = [el.offsetWidth, el.offsetHeight]; placeHit(); });
    ro.observe(el);
    // 투칸이나 문서의 보임 표지(on, tv-handed 등)가 바뀌면 바로 다시 본다: 숨은 투칸의 단추에 Tab 이 닿지 않게
    mo = new MutationObserver(() => checkHitVis());
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    rehome();
  }
  function checkHitVis() {
    if (!hit) return;
    visAt = performance.now();
    const v = onScreen && shown();
    if (v !== hitVis) { hitVis = v; hit.hidden = tip.hidden = !v; }
  }
  function rehome() {   // 투칸이 다른 부모로 옮겨지거나(한 숲: 문서 맨 위 층) 층(z)이 바뀌면 단추와 제목도 따라간다
    const par = el.parentNode;
    if (!par) return;
    if (hit.parentNode !== par || hit.previousSibling !== el) { el.after(hit); hit.after(tip); }
    hitPar = par;
    const cs = getComputedStyle(el), abs = cs.position === "absolute" || cs.position === "fixed";
    hit.style.position = tip.style.position = cs.position === "fixed" ? "fixed" : "absolute";
    hitOff = abs ? [0, 0] : [el.offsetLeft, el.offsetTop];
    hit.style.zIndex = tip.style.zIndex = cs.zIndex === "auto" ? "" : cs.zIndex;
    hitSz = [el.offsetWidth, el.offsetHeight];
  }
  let hitKey = "";
  function placeHit() {   // 바뀐 것이 있을 때만 쓴다(숲이 그릴 때마다 불린다)
    if (!hit) return;
    const x = pos.x + hitOff[0], y = pos.y + bob + hitOff[1];
    const key = `${x.toFixed(1)},${y.toFixed(1)},${hitSz[0].toFixed(1)},${hitSz[1].toFixed(1)}`;
    if (key === hitKey) return;
    hitKey = key;
    hit.style.width = hitSz[0].toFixed(1) + "px"; hit.style.height = hitSz[1].toFixed(1) + "px";
    hit.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    tip.style.transform = `translate(${(x + hitSz[0] / 2).toFixed(1)}px, ${(y - 2).toFixed(1)}px) translate(-50%, -100%)`;
  }
  function syncHit() {
    if (!hit) { ensureHit(); if (!hit) return; }
    if (el.parentNode !== hitPar || el.className !== lastCls) { lastCls = el.className; rehome(); visAt = 0; }
    if (performance.now() - visAt > 250) checkHitVis();
    placeHit();
  }
  function letterPoint() {   // 편지(없으면 투칸 가운데)의 화면 자리: 대화상자가 여기서 커진다
    const g = rig && rig.letterG;
    if (g && holding) {
      const svg = g.ownerSVGElement, M = g.getScreenCTM && g.getScreenCTM();
      if (svg && M) { const p = new DOMPoint(LETTER_FOCUS[0], LETTER_FOCUS[1]).matrixTransform(M); return { x: p.x, y: p.y }; }
    }
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width * 0.3, y: r.top + r.height * 0.5 };
  }
  function onLetterClick() {
    if (letterIsOpen || pendingOpen) return;
    wake();
    const from = letterPoint();
    const open = () => {
      pendingOpen = null;
      // 라이브: 편지 = 페이지의 창업자 편지 팝업(index.html #modal-founder, 다섯 언어). 팝업이 tc-letter 를 보내 투칸이 편지를 놓고 다시 문다.
      // from(편지 자리)은 시안의 커지는 대화상자(shared/letter.js)용이라 쓰지 않는다
      if (window.TK && window.TK.openModal) window.TK.openModal("founder", hit); else onLetterEvent({ detail: { open: false } });   // 팝업이 없으면 편지를 다시 문다
    };
    if (RM || !rig) { holding = false; Object.assign(rp, neutral()); applyRig(true); open(); return; }
    pendingOpen = open;
    if (act && act.k !== "lookBack") { lastBig = BIG(act.k); act = null; }   // 돌아보기는 끝까지(끊으면 뒤를 본 채로 남는다). 뻐끔은 그 위에 얹힌다
    talk = { t: 0, released: !holding };
    if (!holding) { pendingOpen = null; open(); }
    kick();
  }
  function releaseLetter() {   // 뻐끔하며 편지를 놓는다: 봉투가 살짝 떨어지며 옅어지고, 그 자리에서 대화상자가 커진다
    if (holding) { holding = false; lpop = { t: 0, dur: 0.16, out: true }; }
    if (pendingOpen) pendingOpen();
  }
  function onLetterEvent(e) {   // 편지를 닫으면 다시 문다(봉투가 부리 끝에서 톡 커지며 입을 한 번 다문다)
    if (!wantLetter || dead || (e.detail && e.detail.open) || holding) return;
    holding = true;
    if (RM || !rig) { Object.assign(rp, neutral()); applyRig(true); return; }
    lpop = { t: 0, dur: 0.36, out: false };
    kick();
  }
  if (wantLetter) document.addEventListener("tc-letter", onLetterEvent);
  const io = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((es) => { onScreen = es[es.length - 1].isIntersecting; checkHitVis(); }, { threshold: 0 }) : null;
  if (io) io.observe(el);
  const onVis = () => { if (!document.hidden && !idleT && !act && !asleep()) schedule(false); };
  if (IDLE) { for (const e of WAKE_ON) addEventListener(e, wake, { passive: true }); document.addEventListener("visibilitychange", onVis); schedule(true); }
  function dispose() {
    if (dead) return;
    dead = true; clearTimeout(idleT); cancelAnimationFrame(raf); raf = 0;
    if (io) io.disconnect(); if (ro) ro.disconnect(); if (mo) mo.disconnect();
    for (const e of WAKE_ON) removeEventListener(e, wake);
    document.removeEventListener("visibilitychange", onVis); document.removeEventListener("tc-letter", onLetterEvent);
    if (hit) { hit.remove(); tip.remove(); }
  }
  const api = { flip() { face = -face; } };

  let lastTf = "";
  function render() {
    const tf = `translate(${pos.x.toFixed(1)}px, ${(pos.y + bob).toFixed(1)}px) rotate(${(rot * face).toFixed(2)}deg) scale(${(face * sx).toFixed(3)}, ${sy.toFixed(3)})`;
    if (tf !== lastTf) { lastTf = tf; el.style.transform = tf; }   // 10-20: 같은 자리면 다시 쓰지 않는다(숲이 그릴 때마다 부모가 자리를 준다)
    if (wantLetter && placed) syncHit();
  }
  // 바로 그 자리(날던 중이면 비행을 끝내고 그 자리에 둔다: 화면 밖에서 날아 들어올 출발점을 잡을 때 쓴다)
  function place(x, y, f) {
    pos = { x, y }; target = { x, y }; vel = { x: 0, y: 0 }; placed = true;
    if (f === 1 || f === -1) face = f;
    if (fl || settle) { fl = null; settle = null; bob = 0; rot = 0; sx = sy = 1; wingCur = 0; setWing(0); }
    if (act) { act = null; bob = 0; rot = 0; sx = sy = 1; wingCur = 0; setWing(0); Object.assign(rp, neutral()); applyRig(); schedule(false); }
    render();
  }

  function to(x, y, { fly = false, face: lf = null } = {}) {
    target = { x, y };
    if (fly) landFace = lf === 1 || lf === -1 ? lf : null;
    if (!placed) { place(x, y); return; }
    const d = Math.hypot(x - pos.x, y - pos.y);
    if (fly && !RM && d > 3) {
      lastInput = performance.now();   // 10-20: 날기도 깨우는 입력(잠든 사이 날아가 앉았으면 앉은 뒤 다시 가만히 동작을 한다)
      if (!idleT && !act && IDLE && !dead) schedule(false);
      cancelAct();
      // 비행 한 번의 성격은 떠날 때 남은 거리로 정한다: 멀수록 빠르게(그래도 날갯짓이 여러 번 보이게 느리게). 추력은 제동보다 세다
      const vmax = clamp(d * 1.15, 150, 560);
      const fresh = !fl;   // 앉아 있다 떠나면 웅크렸다 박찬다. 날던 중이면 속도를 그대로 이어 간다
      // 방향은 웅크린 순간에 한 번에 정한다(옆으로 뚜렷이 갈 때만). 날던 중에는 바꾸지 않는다
      if (fresh) { const dx = x - pos.x, dy = y - pos.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * .5) face = dx > 0 ? -1 : 1; }
      // 경로가 한 줄로 곧지 않게(Y 19:00): 가는 줄의 옆으로 한 번 휘거나(짧은 비행), S자(긴 비행). 휘는 쪽(n0)은 떠날 때의 줄 기준
      const lobes = d > 280 ? 2 : 1;
      fl = { t0: fresh ? performance.now() : fl.t0, crouch: fresh ? 110 : 0, launched: !fresh, open: fresh ? 0 : fl.open,
        mode: fresh ? "flap" : fl.mode, beats: fresh ? 4 : fl.beats, cyc: fresh ? 0 : fl.cyc, hz: fresh ? 3 : fl.hz, glideT: fresh ? 0 : fl.glideT,
        d0: Math.max(d, 1), vmax, thrust: vmax * 3.4, brake: vmax * 1.5, S: { ...pos }, n0: { x: -(y - pos.y) / d, y: (x - pos.x) / d },
        lift: clamp(d * .3, 14, 120) * Math.abs(x - pos.x) / d,
        lobes, side: Math.random() < .5 ? -1 : 1, wAmp: lobes === 1 ? clamp(d * .16, 8, 40) : clamp(d * .1, 20, 56),
        // 비행 시간 상한(ms): 거리를 최고 속도로 나눈 시간의 2.2배에 웅크리기와 여유 0.9초, 길어도 2.6초. 340px 비행이면 약 2.6초(보통은 1.5초 안팎에 닿는다)
        // 날던 중에 도착점이 바뀌면 상한을 새로 주지 않고 1.2초만 더 준다(자리를 이리저리 바꾸며 오래 떠 있지 않게)
        maxT: fresh ? Math.min(2600, 110 + (d / vmax) * 2200 + 900) : Math.max(fl.maxT, performance.now() - fl.t0 + 1200), fin: false };
      if (fresh) { tv = { x: 0, y: 0 }; tPrev = null; }
      settle = null;
      kick();
    } else if (!fl) { pos = { x, y }; render(); }
  }

  function step(dt) {
    const T = target, dx = T.x - pos.x, dy = T.y - pos.y, dist = Math.hypot(dx, dy);
    // 길 따라가기: 떠난 자리 S 에서 도착점 T 로 가는 줄에 옆 휨(한 번 또는 S자)과 위로 볼록한 호를 얹은 길을 두고,
    // 지금 자리를 그 줄에 비춰 본 진행 비율 p 보다 조금 앞(q)의 길 위 점을 겨냥한다. q 가 1 이면 겨냥점 = 도착점
    const Lx = T.x - fl.S.x, Ly = T.y - fl.S.y, LL = Lx * Lx + Ly * Ly || 1;
    const p = clamp(((pos.x - fl.S.x) * Lx + (pos.y - fl.S.y) * Ly) / LL), q = Math.min(1, p + .14);
    // 휨은 양 끝에서 기울기까지 0이 되게(sin² 꼴) 두어, 떠날 때와 내려앉을 때는 줄을 따라 곧게 든다(끝에서 지나쳤다 되돌아오지 않게)
    const env = Math.sin(Math.PI * q);
    const wander = fl.wAmp * fl.side * (fl.lobes === 1 ? env * env : Math.sin(2 * Math.PI * q) * env * 1.3);
    const ax = fl.S.x + Lx * q + fl.n0.x * wander, ay = fl.S.y + Ly * q + fl.n0.y * wander - fl.lift * Math.sin(Math.PI * q);
    const adx = ax - pos.x, ady = ay - pos.y, ad = Math.hypot(adx, ady) || 1;
    // 원하는 속력: 최고 속도와 제동 곡선 중 작은 것(남은 거리에서 b 로 멈출 수 있는 속력)
    const want = Math.min(fl.vmax, Math.sqrt(2 * fl.brake * .85 * Math.max(0, dist - .5)));   // 제동은 한계보다 조금 일찍 건다(여유 15%)
    // 도착점이 움직이면 그 속도(tv)를 더해 함께 움직인다: 제동 곡선은 도착점에 대한 상대 속도에 건다
    let axl = (adx / ad * want + tv.x - vel.x) * 28, ayl = (ady / ad * want + tv.y - vel.y) * 28;   // 이득이 낮으면 속도가 제동 곡선보다 늦게 줄어 도착점을 지나친다
    const speed = Math.hypot(vel.x, vel.y);
    // 힘을 진행 방향(가속, 제동)과 옆 방향(방향 틀기)으로 나눠 따로 자른다. 하나로 자르면 휘어 들어올 때 방향 틀기가
    // 브레이크 몫을 먹어 도착점을 지나친다. 진행 방향은 +면 추력 한계, -면 제동 한계
    let along;
    if (speed > 1) {
      const ux = vel.x / speed, uy = vel.y / speed;
      along = axl * ux + ayl * uy;
      let px = axl - along * ux, py = ayl - along * uy;
      const a2 = clamp(along, -fl.brake * 1.25, fl.thrust), pm = Math.hypot(px, py), plim = fl.thrust * .8;
      if (pm > plim) { px *= plim / pm; py *= plim / pm; }
      axl = a2 * ux + px; ayl = a2 * uy + py;
    } else {
      along = Math.hypot(axl, ayl);
      const am = along;
      if (am > fl.thrust) { axl *= fl.thrust / am; ayl *= fl.thrust / am; }
    }
    vel.x += axl * dt; vel.y += ayl * dt;
    pos.x += vel.x * dt; pos.y += vel.y * dt;
    return { dist, along: along / fl.thrust, speed: Math.hypot(vel.x, vel.y), rel: Math.hypot(vel.x - tv.x, vel.y - tv.y) };
  }

  function kick() { if (!raf && !dead) { lastTs = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(ts) {
    raf = 0;
    if (dead) return;
    // 10-20: 앉아서 하는 가만히 동작만 그릴 때는 초당 30장으로 그린다(작고 느린 움직임이라 눈에 차이가 적고, 숲이 쉬는 동안 쪽 전체를 초당 60장 다시 합성하지 않는다)
    if (!fl && !settle && !talk && !lpop && (act || rigEase) && ts - lastTs < 29) { raf = requestAnimationFrame(frame); return; }
    const dt = Math.min(.04, Math.max(0, (ts - lastTs) / 1000)); lastTs = ts;
    const A = (el.offsetWidth || 50) * .05;   // 날갯짓에 몸이 뜨는 폭 = 몸 폭의 5%
    if (fl && dt > 0) {   // 도착점 속도: 프레임마다의 이동을 부드럽게(숲이 초당 30장만 그릴 때도 고르게)
      if (tPrev) {
        const ix = (target.x - tPrev.x) / dt, iy = (target.y - tPrev.y) / dt, im = Math.hypot(ix, iy), k = im > 1500 ? 1500 / im : 1;
        tv.x = ease(tv.x, ix * k, 10, dt); tv.y = ease(tv.y, iy * k, 10, dt);
      }
      tPrev = { ...target };
    }
    if (fl) {
      const e = ts - fl.t0;
      if (!fl.launched && e < fl.crouch) {                  // 1) 웅크리기(날개를 들 준비)
        const k = smooth(0, 1, e / fl.crouch);
        sy = 1 - .1 * k; sx = 1 + .07 * k; wingCur = -30 * k; setWing(wingCur);
        bob = ease(bob, 0, 30, dt); rot = ease(rot, 0, 20, dt);   // 10-20: 가만히 동작(뜀, 숙임) 중에 떠나면 그 자세에서 부드럽게 웅크린다
        // 웅크리는 동안에도 발은 가지 위: 화면에서 움직이는 자리를 따라간다(도착점의 움직임으로 어림, 떠난 자리도 함께)
        pos.x += tv.x * dt; pos.y += tv.y * dt; fl.S.x += tv.x * dt; fl.S.y += tv.y * dt; render();
      } else {
        fl.launched = true;
        // 4ms 이하로 쪼개 적분한다(빠른 비행에서도 도착점을 지나치지 않게)
        // 마지막 몇 픽셀(14px 안)과 시간 넘김은 물리 대신 자리로 끌어당긴다(움직이는 자리 곁에서 지나쳤다 되돌아오며 떠 있지 않게)
        const d0 = Math.hypot(target.x - pos.x, target.y - pos.y);
        if (!fl.fin && fl.launched && (e > fl.maxT || d0 < 14)) { fl.fin = true; fl.finT = ts; }
        let s = null; const n = Math.max(1, Math.ceil(dt / .004));
        if (!fl.fin) for (let i = 0; i < n; i++) s = step(dt / n);
        else s = { dist: d0, along: 0, speed: Math.hypot(tv.x, tv.y), rel: 0 };
        const effort = clamp(s.along * 1.4, 0, 1);              // 박차는 정도
        const braking = clamp(-s.along * 1.6, 0, 1);            // 제동하는 정도
        const near = 1 - smooth(5, 24, s.dist);                 // 닿기 직전
        if (fl.fin) {   // 자리의 움직임만큼 함께 가고(tv), 남은 틈을 지수로 메운다(약 0.1초)
          pos.x += tv.x * dt; pos.y += tv.y * dt;
          const k = 1 - Math.exp(-dt * 22); pos.x += (target.x - pos.x) * k; pos.y += (target.y - pos.y) * k; vel = { ...tv };
        }
        fl.open = ease(fl.open, braking > .2 ? 1 : 0, 7, dt);
        // 날개: 제동 중이면 활짝 편 채 천천히 떨고, 아니면 퍼덕이기와 미끄러지기를 번갈아
        let want, liftNow = 0, rate = 40;
        if (fl.open > .5) {
          fl.cyc += dt * 1.6;
          want = -94 + 8 * Math.sin(fl.cyc * Math.PI * 2); liftNow = .25 * Math.sin(fl.cyc * Math.PI * 2); rate = 14;
        } else if (fl.mode === "glide") {
          fl.glideT -= dt;
          want = -66; rate = 10;                               // 날개를 편 채 미끄러진다
          if (fl.glideT <= 0) { fl.mode = "flap"; fl.cyc = 0; fl.beats = 2 + (Math.random() < .5 ? 1 : 0); fl.hz = 2.6; }
        } else {
          const prev = fl.cyc;
          fl.cyc += dt * fl.hz;
          if (Math.floor(fl.cyc) > Math.floor(prev)) {          // 한 번 다 쳤다
            fl.beats -= 1;
            const brakeDist = (s.speed * s.speed) / (2 * fl.brake);
            if (fl.beats <= 0) {
              if (s.speed > fl.vmax * .5 && s.dist > brakeDist * 1.3 + 40) { fl.mode = "glide"; fl.glideT = .32 + Math.random() * .22; }
              else fl.beats = 2;
            }
          }
          const st = stroke(fl.cyc % 1); want = st.a; liftNow = st.lift;
        }
        wingCur = ease(wingCur, want, rate, dt);
        setWing(wingCur * (1 - near));
        bob = ease(bob, -A * liftNow * (1 - near) * smooth(8, 60, s.speed), 30, dt);
        // 몸: 진행 방향으로 살짝 기울고(오를 때 머리를 들고), 제동 때 머리를 든다. 박차면 진행 방향으로 조금 늘어난다
        const climb = clamp(-vel.y / (s.speed + 1e-3), -1, 1) * smooth(20, 120, s.speed);
        rot = ease(rot, climb * 7 + fl.open * 10 * (1 - near), 10, dt);
        const stt = effort * smooth(30, 200, s.speed);
        sy = ease(sy, 1 + .05 * stt, 18, dt); sx = ease(sx, 1 - .035 * stt, 18, dt);
        const dNow = Math.hypot(target.x - pos.x, target.y - pos.y);
        if ((dNow < 2.5 && s.rel < 40) || (fl.fin && (dNow < 1.5 || ts - fl.finT > 240))) {
          fl = null; pos = { ...target }; vel = { x: 0, y: 0 }; bob = 0; wingCur = 0; setWing(0);
          const want = landFace != null ? landFace : restFace;
          settle = { t0: ts, want, turn: want != null && face !== want };
        }
      }
    }
    if (!fl && settle) {                                       // 5) 착지: 한 번 눌렸다 돌아온다. 돌아앉아야 하면 작게 뛰어 공중에서 돈다
      const k = clamp((ts - settle.t0) / (settle.turn ? 520 : 320));
      if (settle.turn) {
        const j = clamp(k / .55);                              // 앞 55% = 작은 뜀, 꼭대기에서 방향이 바뀐다
        bob = -A * 2.2 * Math.sin(Math.PI * j);
        if (j >= .5 && face !== settle.want) face = settle.want;
        const kk = clamp((k - .55) / .45);
        const sq = .09 * Math.exp(-5 * kk) * Math.cos(kk * Math.PI * 2.4) * (k > .55 ? 1 : 0);
        sy = 1 - sq; sx = 1 + sq * .6;
      } else {
        const sq = .11 * Math.exp(-5 * k) * Math.cos(k * Math.PI * 2.4);
        sy = 1 - sq; sx = 1 + sq * .6;
      }
      rot = ease(rot, 0, 16, dt);
      if (k >= 1) { settle = null; sx = sy = 1; rot = 0; bob = 0; }
    }
    if (!fl) poseFrame(dt, A);   // 10-20: 앉아 있을 때의 동작(날 때는 그림 안 자세만 제자리로)
    else if (rigEase || talk || lpop) poseFrame(dt, A);
    render();
    applyRig();
    if (fl || settle || act || talk || lpop || rigEase) raf = requestAnimationFrame(frame);
  }

  const out = { el, place, to, get flying() { return !!fl; }, get crouching() { return !!fl && !fl.launched; }, get busy() { return !!fl || !!settle; },
    get letter() { return holding; }, dispose,
    setLetter(on) { if (!wantLetter || !!on === holding || talk) return; holding = !!on; lpop = null; if (act) { act = null; schedule(false); } Object.assign(rp, neutral()); applyRig(true); },
    act(k) { if (ACTS[k] && !fl && !settle && !talk && rig) { if (act) { if (act.k === "lookBack" && act.flips === 1) face = -face; act = null; } wake(); startAct(k); } },   // 시안 확인용
    get state() { return { act: act && act.k, holding, asleep: asleep(), onScreen, rig: !!rig, face, talk: !!talk }; } };
  if (DBG) { out.debugPose = (p) => { act = null; Object.assign(rp, neutral(), p || {}); applyRig(true); }; (window.__tcs ||= []).push(out); }
  return out;
}
