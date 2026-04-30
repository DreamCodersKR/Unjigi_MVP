# 운지기 (運知己) — MVP

> 화물차 운전자를 위한 AI 안전 동반자 PWA  
> _DreamCoders 자매 프로덕트 · 2026년 5월 4주 스프린트 MVP_

---

## 우리가 만드는 것

매년 590명이 졸음운전으로 사망. 화물기사 42만명이 핵심 위험군.  
도공 라운지 54개 + 졸음쉼터 244개를 통합 안내하고, AI 음성 동반자가 운전 중 핸즈프리로 휴식을 권유하는 **한국 최초의 화물차 전용 안전 솔루션**.

### 핵심 기능 3개

| | 무엇을 함 |
|---|---|
| **F1** | 졸음 위험 예측 — DTG 운행기록 → LSTM이 향후 30분 졸음 위험도 0~100% 예측 |
| **F2** | 라운지·쉼터 통합 지도 — 도공 298개 시설 위치·시설·자리(시뮬) |
| **F3** | 음성 AI 동반자 ⭐ — Claude API + Web Speech, 운전 중 핸즈프리 대화 |

---

## 🚀 영일이 클론 후 셋업 가이드 (10분)

### 사전 준비 (한 번만)

```bash
# Node 20 LTS + pnpm 8 (없으면)
brew install node@20
npm install -g pnpm@8

# Python 3.11 (없으면)
brew install python@3.11

# 버전 확인
node --version && pnpm --version && python3.11 --version
```

### 1. 클론 + 의존성 설치

```bash
# 클론
gh repo clone DreamCodersKR/Unjigi_MVP
cd Unjigi_MVP

# Frontend 의존성 (~2분)
pnpm install

# Backend 의존성 (~5분, PyTorch 다운로드 큼)
cd backend
python3.11 -m venv .venv
source .venv/bin/activate    # Win: .venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### 2. 환경변수 설정

Yoon이 카톡 DM으로 보낸 값을 두 파일에 작성:

```bash
cp .env.example frontend/.env.local
cp .env.example backend/.env
```

각 파일 열어서 빈 값 채우기 (값은 카톡 DM 참조):
- `VITE_NAVER_MAPS_CLIENT_ID`
- `NAVER_MAPS_CLIENT_SECRET`
- `ANTHROPIC_API_KEY`
- `KMA_API_KEY`
- `DATA_GO_KR_KEY`

### 3. 동작 확인

**터미널 1 — Frontend**:
```bash
pnpm --filter frontend dev
# → http://localhost:5173 (Vite 기본 화면 보이면 OK)
```

**터미널 2 — Backend**:
```bash
cd backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000/health → {"status":"ok"}
# → http://localhost:8000/docs (Swagger UI)
```

### 4. VS Code 추천 확장

- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- Python (ms-python.python)
- Pylance (ms-python.vscode-pylance)
- Error Lens (usernamehw.errorlens)

---

## 📦 설치된 라이브러리

### Frontend (`frontend/package.json`)

#### Core
- **react 19** + react-dom — UI 라이브러리 (React 19 with Concurrent Features)
- **vite 8** + @vitejs/plugin-react — 번들러·dev 서버
- **typescript 6** + typescript-eslint — 타입 시스템

#### UI / 스타일
- **tailwindcss 4** + @tailwindcss/vite — 유틸리티 CSS (v4, vite plugin 방식)
- **shadcn** + radix-ui — UI 컴포넌트 라이브러리 (Radix UI primitives 기반)
- **class-variance-authority** + clsx + tailwind-merge — 조건부 클래스 헬퍼
- **lucide-react** — 아이콘 (Truck, Trees, Mic 등)
- **@fontsource-variable/geist** — Geist 폰트 (Vercel 디자인)
- **tw-animate-css** — Tailwind 애니메이션

#### 라우팅·상태·서버
- **react-router-dom v6** — 클라이언트 사이드 라우팅
- **@tanstack/react-query v5** — 서버 상태 관리 (API fetch·캐싱)
- **zustand** — 클라이언트 상태 관리 (운행 상태 등)

#### 지도
- **@types/navermaps** — Naver Maps SDK 타입 정의

#### PWA
- **vite-plugin-pwa** — Service Worker + manifest 자동 생성

### Backend (`backend/requirements.txt`)

```
fastapi==0.115.0          # Python 웹 프레임워크
uvicorn[standard]==0.32.0 # ASGI 서버
pydantic==2.9.2           # 타입 안전 스키마
python-dotenv==1.0.1      # .env 파일 로드
anthropic==0.39.0         # Claude API SDK
httpx==0.27.2             # async HTTP 클라이언트 (기상청·NCP 호출)
pandas==2.2.3             # DTG 데이터 처리
torch==2.5.1              # PyTorch (LSTM 추론)
```

---

## 📂 폴더 구조

```
Unjigi_MVP/
├── frontend/              # Vite + React 19 PWA
│   ├── src/
│   │   ├── routes/        # 페이지 (Dashboard·Map·Companion·Settings 등)
│   │   ├── components/    # 재사용 컴포넌트
│   │   │   └── ui/        # shadcn/ui 컴포넌트
│   │   ├── hooks/         # useSpeechAPI·useGeolocation 등
│   │   ├── stores/        # Zustand (tripStore·userStore)
│   │   ├── lib/           # api.ts·utils.ts·constants.ts
│   │   └── types/         # 공통 TypeScript 타입
│   ├── public/
│   │   ├── manifest.webmanifest   # PWA 매니페스트
│   │   └── icons/
│   ├── vite.config.ts     # Tailwind v4 plugin + alias 설정
│   ├── components.json    # shadcn/ui 설정
│   └── tsconfig.app.json  # @/* alias
├── backend/               # FastAPI
│   ├── app/
│   │   ├── main.py        # FastAPI 엔트리·CORS
│   │   ├── routers/       # /api/lounges·/predict·/companion/chat
│   │   ├── services/      # LSTM 추론·Claude 호출 로직
│   │   ├── models/        # 학습 가중치(.pt) + 모델 클래스
│   │   ├── data/          # lounges.json·mock_demo.json
│   │   └── schemas.py     # Pydantic 모델
│   ├── .venv/             # Python 가상환경 (gitignore)
│   └── requirements.txt
├── ml-training/           # Colab 노트북 (Yoon만 만짐)
│   └── lstm_drowsiness.ipynb
├── docs/                  # API 명세·시연 시나리오
├── .env.example           # 5개 API 키 placeholder
├── pnpm-workspace.yaml
└── package.json           # 모노레포 루트 (pnpm workspace)
```

---

## 4주 마일스톤 (5/4 → 5/29)

| 주차 | 기간 | 핵심 |
|---|---|---|
| **W1** | 5/4 ~ 5/10 | 모노레포 셋업 + F2 라운지 지도 MVP |
| **W2** | 5/11 ~ 5/17 | F1 졸음 대시보드 + LSTM 통합 |
| **W3** | 5/18 ~ 5/24 | F3 음성 AI 동반자 ⭐ |
| **W4** | 5/25 ~ 5/29 | 시연 안정화 + 데모 영상 + 1차 외부 검증 제출 |

> 5/29 (금) 17:00 = 1차 외부 검증 제출 마감.

---

## 분담

| 누가 | 무엇 |
|---|---|
| **Yoon** (리드) | 아키텍처 설계 · 주간 미션 명세 · 코드 리뷰 · 인프라 셋업 · ML 학습(Colab LSTM) |
| **영일** (개발) | F1·F2·F3 풀스택 개발 · 백엔드 통합 · 데모 영상 제작 · 시연 안정화 |

---

## 🔧 워크플로우

### 소통
- **카톡 단톡방** = 메인 (데일리 스탠드업 3줄 / 일상 / 머지 알림)
- **카톡 DM** = 민감 정보 (.env 키, 개인 사정)
- **Google Meet** = 회의실 외 비대면 화상 (필요 시)
- **전화** = 의사결정·기획 컨텍스트 헷갈림 시

### 회의
- **매주 월요일 13:00** 회의실 (대면, 30~60분)
- 어젠다: 지난 주 한 일 / test → master 코드 리뷰 / 이번 주 미션 / 막힘·이슈

### 위클리 미션
- Yoon이 매주 월 회의 직전 카톡 단톡방에 5~10줄로 분배
- 영일이는 미션 보고 자율 진행

---

## 🌳 브랜치 전략 (3-브랜치 · PR 안 만듦)

```
master  ← 프로덕션 (Vercel 자동 배포) ── 매주 월 회의에서 Yoon이 머지
   ↑
test    ← 스테이징 (Railway 자동 배포)
   ↑
dev     ← 영일이 작업 브랜치 (자유 push)
```

### 일상 워크플로우

1. 🌅 **시작** — 카톡 단톡방 데일리 스탠드업 3줄
2. 💻 **작업** — `dev` 브랜치에서 자유 push
3. 🔄 **테스트** — 작업 단위 끝나면 `dev → test` 머지 + 카톡에 한 줄 알림
4. ⏰ **주간 리뷰** — 월 13시 회의에서 Yoon이 검증 후 `test → master` 머지

### 막힘 룰

- 코드·라이브러리·일반 문제 → 자체 해결 (공식 문서, Stack Overflow)
- 의사결정·기획·운지기 도메인 → **Yoon에게 전화** (작은 거라도 OK)

---

## 🎯 개발 우선순위 룰 (절대 흔들리지 않음)

1. **시연 안정성** (mock 모드 + Service Worker) — 시연 중 멈추는 게 최악
2. **F2 + F3 동작** — "앱이 만들어졌다"는 인상
3. **F1 LSTM 통합** — 안 되면 룰베이스 백업 전환
4. **UI 폴리시 + 데모 영상 임팩트** — 1·2·3 끝나야

---

## 코딩 컨벤션 (요약)

- **TypeScript strict** 모드 — `any` 금지 (필요하면 `unknown` + 타입 가드)
- **함수형 React** — 클래스 컴포넌트 X, hooks 우선
- **shadcn/ui** 컴포넌트 우선 사용 (`pnpm dlx shadcn@latest add <component>`)
- **Tailwind 모바일 우선** — 기본 모바일, `md:` `lg:`로 데스크톱 확장
- **운전 중 안전** — 폰트 크기 ≥ `text-base`, 버튼 ≥ `h-12 w-12`, 운전 중 input 텍스트 X (음성 우선)
- **Conventional Commits** — `feat(map): add LoungeMarker` 형식 (강제 X, 권장)

---

## 🛠 자주 막히는 포인트

| 증상 | 해결 |
|---|---|
| `pnpm: command not found` | `npm install -g pnpm@8` |
| `Module not found: '@/components/ui/...'` | `pnpm install` 한 번 더, vite.config.ts의 alias 확인 |
| Tailwind 클래스 안 먹힘 | src/index.css의 `@import "tailwindcss"` 첫 줄 확인 |
| shadcn 컴포넌트 추가 시 에러 | `pnpm dlx shadcn@latest add <component>` (shadcn-ui 아님) |
| CORS error (5173 → 8000) | `backend/app/main.py` CORS 설정 확인 |
| Naver Maps 키 에러 | `.env.local` 키값 + NCP 콘솔에서 도메인 등록 확인 |
| Service Worker 캐시 꼬임 | DevTools → Application → Clear storage |

---

## 비즈니스 모델 (참고)

- **타겟**: 화물차 운전자 (42만명) + 운송회사 안전관리자
- **가격**: 인당 월 5,900원 단일가 (B2B 우선)
- **시장 규모**: 잠재 연 297억 (B2B + 보험사 제휴 시 600억+)
- **차별화**: 한국 최초 화물차 전용 통합 안전 솔루션 (도공 앱·ETAS·카카오내비 모두 일반용)

---

## 4주 끝난 후 (1차 통과 시)

- 6~7월: 멘토링 + F4 가족 안심 알림 + F5 사고 핫스팟 추가
- 7월: 2차 라이브 데모 + 시상식
- 9월: DreamCoders 법인 설립 → 운지기 정식 사업화 트랙

---

## 라이선스

DreamCoders 자산. 외부 공유·복제 금지. 사업화 시점에 별도 검토.
