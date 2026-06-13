# PROGRESS — 작업 진행 로그

> 다음 세션에서 이어서 작업할 때 이 파일부터 읽으면 됨.
> "무엇을 했는지"는 `git log`에 상세히 있음. 이 파일은 **현재 상태 · 규칙 · 결정 · 다음 할 일**.
> 마지막 업데이트: 2026-06-13

## 무엇인가
이윤태 개인 포트폴리오 사이트 `music-inglee.github.io`. MoMA 스타일(흰/검 + 초록 포인트).
디자인 명세는 `DESIGN.md` 참조.

## 파일 구조
- `index.html` — 웹 페이지
- `cv.html` — 인쇄/PDF용 이력서. **CV 내용(Education/Skills/Collectives 등)은 index.html과 동기화 유지**
- `styles.css`, `script.js`
- `assets/` — profile.jpg, synaesthesia.mp4(+poster), cv.pdf

## 배포 · 캐시 규칙 (중요)
- 배포 = `git push` → main → GitHub Pages 빌드(~1–2분)
- HTML은 GitHub가 **10분 캐시**함 → push 후 바로 보려면 `Cmd+Shift+R`(하드 리프레시). `?fresh=N`도 우회용.
- **CSS/JS 바꿀 때마다 index.html의 버전 쿼리를 올려야 함** (안 그러면 옛 스타일이 캐시에 묶임 — 초반에 크게 데임).
  - 현재: `styles.css?v=28`, `script.js?v=8`

## 핵심 인터랙션 — "파쇄기(shredder)"
- 화면 최상단 고정 반전 띠 `.invert-band`: `backdrop-filter: invert(1)`, **height 200px**, **z-index 60(= nav 위)** → nav 배너도 검정으로 반전됨(사용자 필수 요구).
- 아래 가장자리는 다단계 ease 그라데이션 마스크로 페이드(마하 밴드 흰 선 방지).
- **프로필 사진**: 반전 대상에서 제외(`.figure__media` z61). 대신 뷰포트 고정 검정 그라데이션 `.figure__shade`로 위에서부터 점진 어두워짐(script.js가 위치 갱신). nav 라인에서 clip → nav 밑으로 들어가는 것처럼.
- 사진 caption(이름)은 박스 밖에 두어 본문 텍스트처럼 반전됨.
- sticky 섹션 헤더는 `top:216px`(띠 아래)에 고정 → 굵은 제목이 그라데이션에 안 잘림.
- About 문단: 스크롤 "리딩 포커스" — 화면 42% 라인에 가장 가까운 `.lede.active`만 진하게.
- nav 하단 hairline 제거(반전 시 흰 선으로 보여서).

## 확정된 카피/라벨
- 동아리·밴드 묶음 = **Collectives** (Affiliations/Bands & Clubs에서 변경)
- Education = SNU 한 항목 + 두 전공: `B.A. Psychology · Main Major` / `B.E. Music Informatics · Student Design Major` (날짜 없음)
- Skills(웹) = `Max·MSP·Jitter` (가운뎃점; 태그 구분자가 `/`라서). cv.html은 `Max/MSP/Jitter` 유지.
- Hero: "음악을 즐겨 듣고, 부르고, 만들고, 연구합니다."
- Manifesto에 Influences: *(Neo)Soul* — D'Angelo, Stevie Wonder, Prince, DeBarge, Donny Hathaway.

## 작업 성향 메모 (사용자)
디테일에 예민함(픽셀/지각적 이슈까지). 미니멀·정제 선호, 격식체 라벨 싫어함. 부작용 생기면 기능을 버리지 말고 구조(z-index/clip)로 해결. 라벨 등은 선택지 제시 선호.

## Works 001 — studyForest 실행 메뉴 (2026-06-13, ComP extra challenge 연계)
- 배경: studyForest 백엔드를 Java로 전면 재구현(코드는 별도 repo `music-ingLee/studyForest`,
  로컬 `~/Desktop/SNU/4thYear/Spring/CoreComp/fromScratch/webapp-java/`). 이 사이트는 그 두 배포본을 노출.
- 배포본 2개:
  - Python(원본·FastAPI): https://studyforest-ucmb.onrender.com
  - Java(OOP 재구현·Docker on Render): https://studyforest-java.onrender.com
- Works 001 제목을 **호버 드롭다운 메뉴**로 변경 (`.work__title--menu` / `.work__trigger` / `.work__launch`):
  제목에 호버(또는 focus, 모바일은 탭)하면 Python·Java 두 버전 선택지가 펼쳐짐. 순수 CSS(:hover + :focus-within),
  `.work__launch::before`로 갭 브리지(커서 이동 중 닫힘 방지). 그 아래 줄에 로컬용 `docker run ...` 명령(복사용 code).
- ⚠️ GHCR 이미지(`ghcr.io/music-inglee/studyforest-java`)는 repo가 private이라 **패키지도 private** →
  외부인이 `docker run`하면 권한 에러. 공개하려면 GitHub 패키지 settings에서 visibility를 Public으로(미완, 선택).
- 커밋: `f0ca006`(링크 추가) → `0136545`(호버 메뉴 1차) → 리터치(MoMA화). styles.css `?v=25→26→27`.
- 메뉴 디자인 규칙(리터치 후): 항목 사이 **검정 구분선 금지**(여백으로만 구분). 패널은 그림자 없이 **얇은 1px 검정 프레임 하나**.
  호버 시 항목 라벨에 **초록 밑줄 wipe**(`a > span` background-size 0→100%, nav/제목과 동일 모티프) + 우측 초록 `↗`.
  초록은 채움(fill) 금지, 선으로만. 라벨은 `<span>`으로 감싸야 밑줄이 small 제외하고 라벨에만 걸림.
- 카피 톤(2026-06-13 정정): "강의에서 배운 자료구조" 같은 **수업 과제 톤 금지**. 설계 철학으로 쓸 것 —
  분기 vs 선형 불일치 / 외재 인지(머릿속→화면) / 자료구조가 모델 맥락을 지배(path_to_root만 전송).
  원천: `CoreComp/fromScratch`의 `LLM_학습_병목_문제의식.md`, `studyForest_paper_draft_ko.md`, finalPoster/finalReport.
  dangling 안내문("제목에 마우스 올리면…") 삭제 — 호버하면 자연히 발견됨. styles `?v=27→28`(`.work__hint` 제거).
- **`docker run` 줄 삭제 (2026-06-13)**: 사용자가 "한 줄 공개 실행"을 요청한 적 없음 — "render·docker 환경 모두 구동"을
  최대해석해 덧붙인 스코프 초과였음. "Docker로 구동"은 라이브 Java 데모(Docker on Render)로 이미 참·증명됨.
  → 그 줄 제거 = **GHCR 공개 결정 자체가 소멸**(이미지는 private 유지, 모순 없음). 두 라이브 데모만 노출.
- **studyForest 카피 최종 (2026-06-13, 직관성 강화)**: 현학적 표현 걷어냄.
  도입은 **일반 사고**로 시작("사고는 한 줄로 흐르지 않는다" → 여러 갈래로 뻗음). specific한 "물음이 물음을 부른다"식·"갈래를 친다"식 표현 폐기(가독성 저해).
  → LLM 학습 환경의 **선형 스크롤 UI가 분기하는 사고와 "맞물리지 못한다(align)"**로 연결. em dash 전면 제거. 끝: "학습자가 보고 고르는 것"(user-controllable context).

## Works 003 — Synaesthesia 카피 (2026-06-13, MoMA 톤 재작성)
- 기존: "조성을 고정한 채 확률 로직으로…" 단문 → **미술관 작품 라벨 온도**로 재조직(사용자 의도 부연 받아 Claude가 조직).
- 담은 내용: ① 노트 등장 타이밍 = **확률 로직**, duration·velocity = **무선화 로직**(심리·통계의 random 용어; 사용자 전공 맥락) → '즉흥성'을 알고리즘으로 구현
  ② 악기 4대, 음색마다 떠오르는 공감각 색을 `lcd`로 실제 매핑·시각화 ③ 성부 텍스처가 빗방울 인상 → "이 공감각 또한 고요한 바탕에 퍼지는 파동으로 **치환**했다"(공감각=감각 간 치환이라 어휘가 정확) → 로직 구현하자 lcd에 실제 비 내리는 장면
  ④ "최소한의 틀이 허락하는 즉흥"에서 미적 쾌감. em dash 없음.
- ⚠️ 카피 규칙(2026-06-13 정정): "확률 로직/무선화 로직/duration/velocity" 같은 **공학 용어 그대로 노출**(전문성). 추상적 비유("감각에 닿고")·유치한 직설("정말로 비가 내렸다") 금지. "고정된 조성 위에서"·"완전한 우연이 아니라" 같은 군더더기 삭제.
- **최종 재구성(2026-06-13)**: "lcd에 실제로 비가 내리는 듯한 장면" 문장 삭제(유치). 피드백("방법 중심 → 왜 시작했나 + 어떤 경험을 주고 싶었나 추가") 반영해 **동기→발전→방법→창발** 아크로 재작성, 2단락:
  ① 재즈 즉흥=천재성 통념 + 인간성=불완전성(드럼 타격의 미세차) → 무선화·확률 로직으로 통념을 분해 시도 → 방법(확률·무선화 로직) → 전면 무선화=혼돈이라 조성·악기 4대로 틀 부여 → 틀 안의 무선화에서 독창성·미적 쾌감 **창발**.
  ② 공감각 시각화(음색→색 lcd 매핑, 빗방울 인상→파동 치환). 작품 의도 전문은 `TaPoEMusic1/progress_log.md`.
- 작품 의도 원본 로그는 `~/Desktop/SNU/4thYear/Spring/TaPoEMusic1/progress_log.md`에 별도 기록.
- **의도 명시 + 인라인 호버 (2026-06-13)**: 피드백("프로젝트 의도를 명시하라") 반영. 본문은 거의 그대로, 한 문장만 교체 — "통념을 분해해본 시도다" → **"인간성에 대한 예술 철학을 확률과 무선화 로직으로 실험해본 시도다"**.
  - **"인간성에 대한 예술 철학" = 인라인 호버 트리거**(`.gloss`/`.gloss__panel`). 호버/포커스/탭 시 철학 패널: 예술=가장 이상화된 자기표현 → 음악이 미분화된 심리까지 → 그 극단이 즉흥의 '불완전성' → **이번 학기 작업은 그 믿음을 시험하며 '인간성이란 무엇인가'를 다시 묻고 정교화한 과정**.
  - 모티프 재사용: studyForest 런치메뉴와 동일한 **그림자 없는 1px `--rule` 프레임 + 보이지 않는 브리지 + 초록 밑줄 wipe**. 차이=본문 용어라 평소 1px 밑줄 상시(호버 시 2px). 순수 CSS.
- **작업별 출처 작은 글씨(`.work__context`)**: 제목 아래 faint·0.78rem. daily-todo=`개인 작업`, Synaesthesia=`서울대학교 음악대학 작곡과 · 전자음악 이론 및 실습 1`, studyForest=세 수업(컴퓨팅 핵심: 컴퓨터로 사고하기 / 컴퓨터프로그래밍 / 고급학습심리학) 줄바꿈.
- styles `?v=28→29`.
- **statement 재작성 (2026-06-13)**: 첫 문장 "재즈의 즉흥은 천재성으로 찬미된다…" 통째 폐기. **천재성 프레임이 "즉흥조차 알고리즘으로 환원된다"는 곡해를 낳음**(사용자 지적). 대신 **"무엇이 인간을 인간이게 하는가"** 물음으로 시작 → 즉흥=탐구의 *현장*, 불완전성=인간다움의 단면 → 실험 → 창발. 핵심=인간다움 탐구 *여정*.
- **MoMA 라벨화 (2026-06-13, 사진 레퍼런스: 미술관 벽 네임플레이트)**: 사용자 결정 — ① 레이아웃=**노트형**(본문 statement는 노출 유지, 호버는 작은 라벨 노트만 + 타이포만 미술관화) ② **캡션 스펙 라인 도입**(`.work__spec`, 매체·재료·규격) ③ **QR 없음**.
  - `.work__spec`: 제목/수업 아래 매체·규격 한 줄(0.76rem, muted). studyForest=웹앱·Python,Java·가변크기 / daily-todo=데스크톱·Electron,Vite·가변크기 / Synaesthesia=사운드·LED 영상·4 악기·가변 길이. ⚠️ **연도는 우측 `work__year`에 이미 있어 스펙에서 생략**(중복 회피) — 라벨식으로 한 줄에 합치려면 우측 연도 접고 통합 예정.
  - **공용 `.label-eyebrow`**: 호버 패널 상단에 tracked 소문자캡 + 하단 헤어라인(caption/statement 구분선 모사). gloss="작가의 말", studyForest 런처="라이브". 런처 eyebrow는 항목과 좌측 정렬(padding 1.2rem) + 헤어라인 full-width.
  - gloss 패널 여백/줄간격 상향(padding 1.1/1.25rem, line-height 1.72)으로 라벨 호흡. studyForest 런처는 **기능(Python/Java 선택) 유지 + 타이포만 리스킨**.
  - styles `?v=29→30`.

## 다음 / 열린 아이디어
- (없음 — 필요 시 여기에 추가)
- 파쇄기 높이(200px)·sticky 헤더 위치(216px) 균형이 아직 어색하면 재조정 여지.
- 영상(Synaesthesia)도 파쇄기에서 색 반전됨 — 그로테스크하면 사진처럼 제외 처리 가능.
