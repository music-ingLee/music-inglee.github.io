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
