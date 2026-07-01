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

**미완/다음:** float 전환 후 사진 높이가 2문단 끝에 정확히 떨어지는지 실사용 확인. 태그라인 대안 문구(A/B/C) 제시함 — 사용자 선택 시 교체. 남은 렉이 있으면 invert-band를 영상 구간에서만 잠깐 끄는 절충 카드.
