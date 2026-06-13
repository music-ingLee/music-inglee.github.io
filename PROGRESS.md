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
  - 현재: `styles.css?v=26`, `script.js?v=8`

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
- 커밋: `f0ca006`(링크 추가) → `0136545`(호버 메뉴). styles.css 변경에 맞춰 `?v=25→26` 올림.

## 다음 / 열린 아이디어
- (없음 — 필요 시 여기에 추가)
- 파쇄기 높이(200px)·sticky 헤더 위치(216px) 균형이 아직 어색하면 재조정 여지.
- 영상(Synaesthesia)도 파쇄기에서 색 반전됨 — 그로테스크하면 사진처럼 제외 처리 가능.
