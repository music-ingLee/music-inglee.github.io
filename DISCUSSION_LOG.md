# DISCUSSION LOG — music-inglee.github.io

> 날짜별 작업/대화 로그. 전역 `/recap`이 `## YYYY-MM-DD` 헤딩으로 스캔함.
> "무엇을 했는지"의 상세는 `git log`에 있음.

## 2026-07-01 (Wednesday)

연구실 지원 소개글을 계기로 About을 개편하고, 사이트 전반의 타이포·레이아웃·성능을 다듬은 긴 세션.

- **About 소개글 교체** — 연구실 지원 에세이(이끔음/leading tone 화두)를 사이트 톤(평서체 `~다`)으로 옮겨 반영. 여는 질문을 pull-quote로 강조. (`09884e2`, `5dddcbe`, `f698604`)
- **CV 타이포·위계 정리** — 글자 스타일 6→3종, 회색 4→2, 이름 700→600, 연도 tabular. Collectives 2열. (`afe2f9e`)
- **굵기·회색 정리** — 섹션/링크 룰 굵게(2px), 행 구분선은 얇게. `--line-2` 토큰 정의(누락 버그). Works의 `--faint` 텍스트를 `--muted`로 통일. (`f698604`, `d701634`)
- **레이아웃 반복** — rail 220→140px, 좌측정렬+광폭(1760) 실험했다가 **가운데정렬 maxw 1400 + nav를 `.nav__inner`로 본문폭에 정렬**로 안정화. 사진 강제 높이맞춤(object-fit cover)은 얼굴 확대 참사라 폐기, 자연 비율로 복귀. (`caabbc0`→`da89faa`)
- **이름 변경** — studyForest → "studyForest (현 Mangrove)". (`b8d345a`)
- **성능** — 이미지/영상 치수 지정(reflow 제거), CSS 캐시버전 관리. **nav의 `backdrop-filter: blur` 제거로 스크롤 렉 대폭 개선**(상단 invert-band 효과는 유지 — 사용자가 아끼는 효과). (`3518fbd`, `068e0f0`)
- **nav** — 브랜드 "music_ing Lee" → `#top` 링크(맨 위로). 활성 밑줄이 맨 위에서 안 지워지던 버그 수정(밴드에 걸린 섹션 없으면 비활성). (`24c19ec`, `068e0f0`)
- **Works 제목 호버** — 연락처 이메일과 동일한 "밑줄→채움+흰글씨" 와이프 효과로 통일. (`7f78550`)
- **CV 설명 줄바꿈** — 긴 회색 설명이 연도 열 침범 → `padding-right`로 연도 공간 확보. (`714a1d6`)
- **CV 인쇄본(cv.pdf)** — 웹에 맞춰 리프레시(2열 Collectives, tabular). 태그라인은 "Psychology & Music Informatics, SNU"만 남김. **SNU 엠블럼 우측 상단 추가**. Chrome 헤드리스로 재생성. (`ba5e2e9`, `b1d0e89`)
- **About 사진 배치** — pull-quote를 전폭 첫 행으로, 사진을 첫 문단과 정렬 → 이후 **float(우측)로 전환**: 1·2문단은 사진 옆을 감싸고 3·4문단은 전폭으로 흐르게. (`fe0aed0`, 진행 중)

- **CV 엠블럼 재배치** — SNU CI를 헤더 텍스트 블록 높이(이름 top ~ 태그라인 bottom)에 스트레치, `object-fit: contain`으로 비율 유지. (`3afc8de`)
- **About 문구 수정** — "인공지능과 인간의 자연지능이 …" → "인공지능 **연구**와 인간의 자연지능 **연구**가 서로를 비추며 **함께** 발전해 왔다"로, 대상이 아니라 두 연구분야가 함께 발전한다는 의미로.

- **Focus 갱신(웹+CV)** — 항목을 Cognitive Psychology · Music Informatics · Science of Learning · Computational Neuroscience · Philosophy of Mind로. CV는 "Science of Learning" 뒤 강제 줄바꿈(3+2)으로 "Mind만 줄바꿈" 문제 해결.
- **CV 링크** — 연락처의 github.com/music-ingLee(→GitHub 프로필), music-inglee.github.io(→홈페이지)를 클릭 가능한 `<a>`로(회색 유지). PDF에도 링크 주석 반영.

- **CV 태그라인 교체** — Education과 중복인 "Psychology & Music Informatics, SNU"를 연구 지향 한 줄로: "Music cognitive neuroscience × music informatics — toward personalized music generation." (`5c08a24`)
- **Honors 추가(웹+CV)** — "Top Project — Computer Programming · Dept. of CSE, SNU · studyForest · 2026.06". 수업 단위 최우수 프로젝트 인정 → Honors 범주 적합, 범위 명시해 과장 방지. Hanjae 아래·Best Undergrad Research 위 배치.

- **em dash 제거 + 태그라인 한 줄** — 사용자가 em dash 싫어함(선호 기억됨). 태그라인 em dash→쉼표, 폰트 10→9pt + `nowrap`으로 한 줄에 맞춤. Honors "Top Project" 제목 em dash→가운뎃점(`·`). (`683cc4d`)

**미완/다음:** float 전환 후 사진 높이가 2문단 끝에 정확히 떨어지는지 실사용 확인. 남은 em dash 2곳(뮤지킹 `(Neo)Soul —`, 브라우저 `<title>`) 교체 여부 사용자 확인 대기. 태그라인 대안 문구(A/B/C)도 대기. 남은 렉이 있으면 invert-band를 영상 구간에서만 잠깐 끄는 절충 카드.

## 2026-07-15 (Wednesday)

폰트·자간 전면 정리 세션 (thinket.ai 디자인 작업 중 파생).

- **한글 웹폰트 실제 로드** — 한글 위주 사이트인데 라틴 전용 Inter만 로드하고 있었음(스택의 Pretendard는 로컬 설치자에게만 존재하는 유령 이름 → OS별 폴백 복권 + Windows 맑은 고딕 faux bold). **Pretendard Variable을 jsdelivr CDN(dynamic subset)으로 로드**하고 스택을 `Inter → Pretendard Variable → …`로 재배열(라틴=Inter, 한글=Pretendard). index.html·cv.html 동일 적용.
- **"자간 넓은 대문자 레이블" 전폐** — 사용자 표현으로 "너무 Claude스러운" 패턴. `text-transform: uppercase` + 양수 letter-spacing 조합을 사이트 전체에서 제거: `.rail`, `.nav__links`, `.lex__label`, `.def__key`, `.work__kind`, `.label-eyebrow`(한글 "라이브/작가의 말/전체 버전"에 0.18em 트래킹이 걸려 있었음), figcaption, CV `.label`. 레이블 위계는 굵기(700)·크기·초록으로만. 소문자 전환분은 크기 소폭 상향(예: nav 0.76→0.85rem, def key 0.74→0.85rem)으로 광학 보정.
- **잔여 양수 자간 0으로** — hero aka/meta, lexicon by, work no(→tabular-nums), context/spec, lightbox close, footer의 0.01~0.04em 제거.
- **한글 디스플레이 음수 자간 완화** — Inter 기준 값이 한글에 걸리던 곳: hero name −0.045→−0.02em, section title −0.035→−0.02em, pullquote −0.03→−0.015em, CV name −0.03→−0.015em. 라틴 전용(lexicon word "musicking", work titles, contact 이메일)은 유지.
- **죽은 규칙 삭제** — HTML에서 미사용이던 `.eyebrow`, `.hero__eyebrow` 제거.
- **cv.pdf 재생성** — 헤드리스 Chrome, 한 장 유지 확인. DESIGN.md Type 항목을 새 타이포 규칙으로 갱신.
- **광학 좌측 정렬(optical margin alignment)** — 사용자 지적: 큰 제목과 위 레일 레이블의 시작점이 미세하게 안 맞음. 원인은 첫 글리프의 좌측 사이드 베어링(잉크가 글리프 박스보다 안쪽에서 시작). 2x 렌더로 실측: 이윤태 +6px, musicking +4px, 섹션 제목 ±0.5~1.5px(글리프별 상이: 소 0.021em · 이 0.042em · 작 0 · 연 0.031em). 보정: hero `-0.04em`, lexicon word `-0.045em`, 섹션 제목은 **#about/#cv/#works/#contact별 개별 nudge**, contact 이메일 `-0.023em`, work 제목 `-0.012em`, CV 이름 `-0.03em`. 재측정으로 전 쌍 0.5 CSS px 이내 확인. cv.pdf 재생성.

## 2026-08-08 (Friday)

daily-todo가 쓰는 폰트 자산을 이 페이지에도 그대로 옮겨, 두 프로젝트가 한 목소리를 내게 한 세션.

- **라틴 서체 교체: Inter → Jost** — daily-todo(`src/fonts/Jost-var.ttf`, SIL OFL)가 쓰는 오픈소스 Futura 후계 가변폰트를 `assets/fonts/`로 복사해 **번들**. Google Fonts의 Inter CDN 링크는 index.html·cv.html에서 제거. 한글은 그대로 Pretendard Variable(jsdelivr) 담당 — Jost에 한글 글리프가 없어 글자 단위로 자동 폴백된다. 스택: `Jost → Futura → Avenir Next → Century Gothic → Pretendard Variable → …`
- **woff2 변환** — fontTools로 가변 TTF(135KB) → woff2(50KB). `woff2-variations` 우선, 원본 TTF는 폴백. `<link rel=preload>`로 선로딩. Google Fonts 왕복이 사라져 외부 폰트 요청은 Pretendard 하나만 남음.
- **라틴 디스플레이 자간 완화** — Jost는 볼이 정원(正圓)이라 Inter의 그로테스크보다 훨씬 일찍 충돌한다. lexicon word −0.045→−0.02em, work 제목 −0.035→−0.015em, contact 이메일 −0.04→−0.015em. 한글 슬롯(hero name, 섹션 제목)은 Pretendard가 그리므로 손대지 않음.
- **광학 좌측 정렬 재측정** — 7/15의 보정값은 Inter의 사이드 베어링 기준이라 무효. fontTools로 Jost를 wght=800에 인스턴싱해 실측: `m` 0.0548em · `d`/`S` 0.031em · `q` 0.031em. 각각 lexicon word `-0.055em`, work 제목 `-0.03em`, contact 이메일 `-0.031em`로 교체.
- **cv.pdf 재생성** — 헤드리스 Chrome, 한 장 유지 확인. DESIGN.md Type 항목 갱신. styles.css 캐시버전 v45→v46.
- **cv.html 화면 렌더 고정(폰트 교체와 무관한 기존 버그)** — 전체화면으로 열어보니 좌우 여백 0에 창 너비만큼 늘어남. `@page { size: A4; margin: 14mm 16mm }`는 인쇄에만 적용되고 브라우저 창에는 아무 말도 하지 않는데, 화면용 폭 규칙이 처음부터 없었다(`git show HEAD:cv.html`로 대조 확인 — 회귀 아님). `@media screen`으로 A4(210×297mm)를 같은 여백과 함께 재진술해 회색 바탕 위 종이 한 장으로 렌더. 인쇄 경로는 손대지 않았고 PDF 한 장 유지 확인.
- **소개 3·4문단 재구성** — 연구실 지원 에세이 원문(존댓말)을 사이트 평서체로 되살리며 압축을 풂. 되살린 것: Transformer가 LLM의 초석이 됐다는 구체 예시, 심층신경망, "음악신경과학의 진전 → 음악정보학의 발전" 방향 진술, 신경과학 "전반". **여는 문장에서 `믿는다`를 뗌** — 신경망·Transformer 계보는 사실인데 판단과 한 문장에 뭉개져 사실은 약해 보이고 판단은 근거 없이 세 보였다. 믿음은 진짜 판단인 곳("음악정보학도 같은 길을 따르리라")에만 남김. **개인별 맞춤형 생성이라는 비전 문장 삭제** — 자기선언 어투가 걸린다는 사용자 판단. **컴퓨터 은유 한 문장 추가** — `그러려면` 사슬 *뒤*에 붙여 `그러려면 → 그래서 → 위해서다` 추진력을 끊지 않게 함(사슬 한가운데 끼우면 글이 겉돈다는 게 이 문단의 핵심 교훈). 마지막 문장의 탐구 범위를 **음악 생성 모델 → 음악정보학 전반**으로 확장(사슬이 이미 생성보다 넓어 앞부분 수정 불필요). 영문 `music generation model` → 한글 `음악 생성 모델`.
- **Works 대표작 두 개 전면 갱신** — 사이트가 두 프로젝트의 반년 전 상태에 멈춰 있었다. 링크 실측으로 시작: 걸려 있던 studyForest 실행 링크 두 개가 **둘 다 죽어 있었다**(`studyforest-ucmb` 404, `studyforest-java` 503) — 대표작의 유일한 실행 경로가 끊긴 상태.
  - **001 studyForest (현 Mangrove) → Thinket (구 studyForest)** — 실행 메뉴를 `thinket.ai/app?demo=1`(가입 없이 데모)과 `thinket.ai`(초대제 비공개 베타)로 교체, 둘 다 200 실측. 1문단에 하이라이트→분기(닻) 한 대목 추가. 2문단은 Render 배포 서술을 걷어내고 "수업 과제 → 제품" 계보로 다시 씀(Python 검증 → Java 재구현으로 구조 확정 → Thinket 개명·자체 도메인, FastAPI+PostgreSQL+무빌드 바닐라 JS, 서버 부담 생성). Java 재구현과 최우수 프로젝트 포스터는 그대로 남김 — 수상 명의가 studyForest라 제목의 괄호가 그 다리 역할.
  - **002 daily-todo → 맨날 (Maennal), Featured 승격** — GitHub 링크 한 줄 + 기능 나열 3줄이던 항목을 001과 같은 급의 2문단 split으로. 링크는 `maennal.com`. 기능 목록 대신 `DESIGN_PHILOSOPHY.md`의 무게중심을 옮김: 모든 투두 앱이 파는 미래 관리의 반대편에 선 과거 기록, 불변 규칙(지울 수 없고 더할 수만 있으며 더한 것은 옅게 남는다), 계획표가 아니라 초상화인 달력. 2문단은 바우하우스 도형 문법(도형=상태 · 색=고유색 · 채움=등급)과 스택(React/Vite → Electron macOS + 웹 PWA, iCloud JSON·MD 양방향 미러링).
- **맨날 달력 스크린샷 확보** — 003 영상·001 포스터 사이에서 002만 이미지가 없었다. iCloud 미러 JSON 135개를 headless Chrome의 localStorage에 주입하고 vite dev를 띄워 `기록` 탭을 2x로 캡처(`assets/maennal-calendar.png`). **7월을 고름** — 8월은 8일치뿐이라 도형 문법이 한 달의 구성으로 안 읽힌다. 프레임에서 뺀 것: 하단 이벤트 목록(개인 여행 라벨), `+ 일정` 버튼, 직전 클릭이 남긴 화살표 호버. 클립 폭은 `.calendar-grid` 박스보다 좌우 14px 넓게 — 도형이 셀 박스를 넘쳐서 첫 캡처 때 토요일 열이 잘렸다.
- **CSS** — `.work__split--wide`(40rem+320px → 34rem+420px, 정사각에 가까운 스크린샷은 세로 포스터보다 폭이 필요), `.work__poster--still`(figure 마진 리셋 + 검은 배경 제거), 포스터 캡션 호버 초록을 `a.work__poster`로 좁힘(클릭 약속을 하지 않는 figure가 초록으로 물들던 것). 캐시버전 v46→v47.
- **CV(웹+PDF)** — Honors의 수상 명의는 studyForest 그대로 두되 `(now Thinket)` 병기. Projects 두 줄을 `Thinket (formerly studyForest)`·`맨날 Maennal (formerly daily-todo)`로 바꾸고 라이브 URL을 링크로(회색 유지, `.entry .sub a { color: inherit }`). cv.pdf 재생성, 한 장 유지 확인.
- **작업 파트 레이아웃 최적화 — 고정 px 트랙 폐기, 측도(measure) 토큰 도입** — 사용자 지적("전체화면에서 사진과 글이 Align 되어 보이지 않는다, 좁히면 더 심각하다"). 실측으로 원인 두 가지를 분리했다.
  - **결함 1 (버그): 미디어 트랙이 절대 안 줄어든다.** `.work__split`이 `40rem + 320px`라 미디어 폭은 1920→761px 내내 320/420px 붙박이였고, **줄어드는 건 글자뿐**이었다. 001 본문 46자/줄 → 860px에서 10자/줄, **002는 40px 폭 2.9자/줄에 높이 4165px**. 브레이크포인트가 760px 하나뿐이라 760~1300px 전 구간이 무방비.
  - **결함 2 (배치): 세로 넘침.** 1440에서 001은 글 277px인데 포스터 482px(+205 넘침), 002 +107, 003 +92. 세 항목 모두 미디어가 글 아래로 흘러 왼쪽이 비었다.
  - **처방 — 가로비가 배치를 정한다(운영자 선택).** 세로형(001 포스터, 0.71)은 `.work__stack`으로 글 아래 전폭 배치하되 **폭을 측도에 맞춰** 글과 좌우 변을 공유. 320→550px로 커졌고 넘침 개념 자체가 사라졌다. 가로형(002 달력 1.19, 003 영상 1.34)만 좌우 유지. **세로 포스터를 짧은 두 문단 옆에 두면 높이를 맞출 방법이 원리적으로 없다** — 글 높이 277px에 맞추려면 포스터가 196px 폭이 되어 읽을 수 없다.
  - **처방 — 두 트랙 다 `fr`.** `minmax(0,1.4fr) minmax(0,1fr)`. 좁힐 때 글과 이미지가 함께 양보한다. 002 넘침 +107→+86(1920), +3(1280).
  - **처방 — 붕괴는 컨테이너 쿼리로.** `.work__main { container-type: inline-size }` + `@container (max-width: 46rem)`. 뷰포트가 아니라 **그 항목 자신의 폭**을 보므로 레일·거터가 어떻게 바뀌든 항상 제때 접힌다. 접힌 뒤 미디어도 측도로 제한 — 가로 스틸이 전폭으로 커지면 글을 압도한다. 760px 미디어쿼리는 컨테이너 쿼리 미지원 브라우저용 폴백으로만 남김. `container-type`이 절대배치의 컨테이닝 블록을 바꾸는 점 때문에 실행 메뉴(`.work__launch`)와 용어 툴팁(`.gloss__panel`)을 렌더로 검증 — 둘 다 `position: relative` 조상을 이미 갖고 있어 무사.
  - **처방 — 측도 토큰 `--measure: 34.4em`(=40자).** Pretendard 한글 글리프는 크기와 무관하게 **0.86em 고정폭**이고 `em`은 사용처의 font-size로 풀리므로, **토큰 하나가 16px 작업 본문과 23px About 리드에 같은 40자 리듬**을 준다. `.work__desc`의 `52ch`(라틴 기준이라 한글엔 무의미)와 `.lede`의 `56ch`를 대체. **About은 `#about .lede { max-width: none }`이 범인**이었다 — 사진 옆 문단은 37자인데 전폭 문단만 54자로 달렸다. 결과: 980~1920px 전 구간에서 모든 본문이 40자/줄로 고정.
  - 캐시버전 v47→v48. DESIGN.md에 Measure·Works·Reflow 항목 추가.
- **통일성 재수정 + 두 프로젝트의 디자인 자산 도입** — 앞선 "가로비가 배치를 정한다"는 001만 스택, 002는 좌우가 되어 **화면상 통일성을 깼다**(사용자 지적). 규칙이 일관돼도 눈이 읽는 건 "항목마다 같은 템플릿"이라는 것. 세 안(셋 다 좌우 자연비 / 셋 다 좌우 높이통일 / 셋 다 스택)을 실제 렌더로 비교하고, 축을 **폭 통일 → 높이 통일**로 뒤집어 해결했다.
  - **`--plate-h` 도입.** 모든 판이 같은 높이(`clamp(15rem, 26vw, 23rem)`)로 서고, 각자의 `--ratio`가 폭을 정하며, 열의 **오른쪽 변에 정렬**된다. 001 카드덱 294 · 002 달력 438 · 003 영상 492 — 폭은 달라도 높이 368로 같고 right가 1392로 일치. 넘침 +43/+91/+115. 폭을 맞추면 001 아래에 200px 공백이 생기는데, 높이를 맞추면 셋이 한 선반 위 물건으로 읽힌다. 그리드는 `minmax(0,1fr) auto`.
  - **`.work__poster*` 계열을 `.plate`로 통합.** 포스터·달력·영상이 쓰던 세 갈래 규칙을 하나로. `.work__plate-cap`은 `width:0; min-width:100%`로 **고유폭 기여를 0으로** 만든다 — 안 그러면 001의 긴 포스터 링크 한 줄이 auto 트랙을 밀어내 판만 16px 왼쪽으로 밀렸다(실측 후 수정).
  - **아이콘 도입.** `thinket-logo.svg`(세 그루 나무)와 맨날 `pwa-192x192.svg`(바우하우스 앱 아이콘)를 `assets/`로 옮겨 각 항목 kind 줄에 32px로. 002는 자체 배경이 있는 앱 아이콘이라 그 크기에서 앱으로 읽힌다.
  - **Thinket 카드뉴스 뷰어.** `venture/marketing/002_thinket/ko-{light,dark}/card-1..9.png`(1080×1350) 18장을 `assets/cardnews/{light,dark}/01..09.png`로(2.4MB, 첫 장만 lazy 로드되고 나머지는 열 때 이웃 장을 미리 데움). 001의 판이 **덱**이 된다 — 뒤에 종이 두 겹이 겹친 모서리, 좌하단에 「9장 펼쳐 보기 ↗」. 누르면 라이트박스 리더: ←/→ 버튼과 방향키, `1 / 9` 카운터, **라이트/다크 토글**, Esc 닫기, 순환 이동. 배경은 기존 영상 라이트박스(0.94)보다 어둡게(0.975) — 아홉 장을 머무는 화면이라서.
  - **포스터의 자리.** 001의 판이 덱으로 바뀌면서 포스터 썸네일은 캡션 링크로 내려갔다. 판 크기에서 포스터 글씨는 어차피 안 읽혔고 클릭 목적지가 PDF라 손실이 작다고 판단 — 되돌리길 원하면 판을 포스터로 되돌리고 덱을 캡션 링크로 바꿀 수 있다.
  - 캐시버전 styles v48→v49, script v10→v11.
- **정렬 3종 수리 (운영자 지적)** — ① 카드뉴스 캡션이 판에 붙어 지저분함 ② 글과 사진 사이가 여전히 안 맞음 ③ About이 사진과 안 어우러지고 수직 기둥이 됨.
  - **② 진범은 `1fr` 트랙이었다.** `minmax(0,1fr) auto`에서 글은 550px(측도)에서 멈추는데 트랙은 900px까지 늘어나, 판이 오른쪽 끝에 매달리며 **가운데 300px 구멍**이 생겼다. 판을 오른쪽 변에 맞추려던 게 오히려 글에서 떼어놓은 것. 트랙을 `minmax(0, var(--measure)) auto` + `justify-content: start`로 바꿔 **글 바로 옆(틈 45px)에** 붙였다. 부수 효과로 세 항목의 판 **왼쪽 변이 일직선**으로 맞는다(오른쪽 변은 어긋나지만, 구멍보다 훨씬 덜 눈에 띈다 — 운영자가 "높낮이는 못 맞춰도 괜찮다"고 풀어준 제약).
  - `--plate-h` 23rem→18.5rem. 가장 넓은 비(003 영상 1.34)가 측도 옆 잔여 폭에 들어가야 하므로. 바닥 차이도 같이 좁아졌다: 001 **−30**(글이 더 김) · 002 +18 · 003 +90.
  - **① 캡션.** 판 뒤 종이 겹침을 대각선(+6/+12 x·y)에서 **가로로만**(+6/+12 x) 바꿈 — 아래로도 밀려 있어 판 밑에 자잘한 모서리 두 개가 삐져나오고 캡션을 압박했다. 캡션은 `width:0` 강제를 풀고 `min-width:100%; max-width:22rem`으로 — 판이 236px로 좁아져서 포스터 링크가 세 줄로 깨지던 것을 한 줄로.
  - **③ About의 범인은 내가 넣은 measure 캡이었다.** 캡 799px, 사진 좌변 784px → 사진 아래 문단이 옆 문단보다 **15px밖에 안 넓어져서** 감싸 흐름이 죽고 직사각형이 됐다(예전엔 1084까지 벌어져 300px 차이). `--measure-wide: 41em`(48자)를 따로 두어 사진 옆 39자 / 아래 48자, **167px 단차**로 복원. 교훈: float 안의 텍스트는 그리드 칸과 달리 여유가 있어야 감긴다 — 측도 하나로 전부 덮으려던 게 과했다.
  - 캐시버전 v49→v50. (429px에서 `.gloss__panel` 툴팁이 화면 밖으로 나가지만 `overflow-x: clip`이 잡고 있고 직전 배포본과 동일 — 이번 변경과 무관한 기존 사안, 좁은 폰에서 툴팁 일부가 잘리는 건 별건으로 남김.)
