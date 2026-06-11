# 운지기 W3-8 시연 검증 리포트

**일시**: 2026-06-11
**브랜치**: `dev`
**구동**: mock 모드 (`VITE_USE_MOCK=true`, 백엔드 미기동)
**도구**: Playwright 1.60.0 (chromium headless) + Node.js 단위 스크립트

---

## 1. 요약 표

### E2E 테스트 (Playwright)

| TC | 명세(작업#) | 기대 | 판정 | 스크린샷 | 비고 |
|---|---|---|---|---|---|
| TC1 | 작업4 — 하단탭바 | 탭 4개 렌더, 지도 active(오렌지), 콘솔 에러 0 | **FAIL** | TC1.png | 탭 렌더·active 스타일 **PASS**. 단, `dbping()` API 호출이 mock 모드에도 실행 → `ERR_CONNECTION_REFUSED` + `Failed to fetch` pageerror 2건 |
| TC2 | 작업4 — 비활성 탭 | 기록·가족·설정 클릭 시 "준비 중인 기능입니다" alert, URL 변화 없음 | **PASS** | TC2.png | alert 텍스트 정확, URL 유지 확인 |
| TC3 | 작업4 — 지도 네비 | 지도 탭 → `/map` URL 이동, 컨테이너 렌더 | **PASS** | TC3.png | URL `/map` 이동 확인. 지도 타일은 키 없어 미로드(헤드리스 한계 — 아래 명시) |
| TC4 | 작업1 — 운행 시작 | `/start-trip` → "운행 시작" → `/risk` 이동 | **PASS** | TC4.png | ConfirmWindow 없이 바로 이동, URL `/risk` 확인 |
| TC5 | 작업1·3 — /risk | score 47 / L2, RiskFactors 2행(이모지), 영문 type 미노출 | **PASS** | TC5.png | `47`, `L2`, `90분 연속 운행 중이에요`, `야간 운행` 모두 노출. `long_drive`·`night_time` 영문 미노출 확인 |
| TC6 | 작업7 — 음성 호출 | 홈·/risk 각각 버튼 존재, 클릭 시 graceful 처리 | **PASS** | TC6_home.png, TC6_risk.png | `.unjigi-call__button` 두 화면 모두 존재. 클릭 후 crash 없음. STT 미지원 시 `error` state 전환(graceful). 실제 음성 검증 불가(헤드리스 한계) |
| TC7 | 작업2 — 휴게소 디버그 | "MVP"·"20초"·"디버그" 0건 | **PASS** | TC7.png | 3종 문자열 모두 미노출 확인 |
| TC8 | 작업5 — 운행요약 | 실데이터 기반 시간·점수, 하드코딩 "5시간 32분"·"420km" 미노출 | **PASS** | TC8.png | `운행 시간`, `운행 완료` 모달 표시. tripStartedAt 기반 실경과 시간 계산. 하드코딩 값 미노출 확인 |
| TC9 | 작업6 — /test-tts | 페이지 렌더, 버튼 ≥1 | **PASS** | TC9.png | 버튼 5개 이상 확인. 콘솔 에러 0 |
| TC10 | 전역 안정성 | 전 라우트 콘솔 에러 0 | **FAIL** | TC10_*.png | `/` 4건(dbping), `/map` 3건(dbping + Naver 401). 그 외 4개 라우트 에러 0 |

**E2E 소계: 8 PASS / 2 FAIL**

---

### 단위 / 정적 검사

| ID | 대상 | 기대 | 판정 | 비고 |
|---|---|---|---|---|
| U1 | `classifyUserIntent` 9케이스 | 전원 정확 분류 | **PASS** | 9/9 케이스 정확 — 상세 아래 |
| U2 | `mock_demo.json` | 총 30개, 6종 각 5개 | **PASS** | 30개, intent 6종 각 5개 확인 |
| C1 | `useRestAreaDetection.ts` setTimeout | `5 * 60 * 1000` (5분) | **PASS** | L15: `}, 5 * 60 * 1000);` 확인 |
| C2 | `WakeWordToggle.tsx` dead code | import 0건 → 삭제 권고 | **PASS (dead code 확인)** | 전체 src에서 import 0건 — 삭제 권고 |

**단위 소계: 4 PASS / 0 FAIL**

---

### U1 상세 (classifyUserIntent 9케이스)

| 입력 | 기대 | 실제 | 판정 |
|---|---|---|---|
| 안녕하세요 기사님 | user_greeting | user_greeting | PASS |
| 졸려 죽겠어 | user_greeting | user_greeting | PASS |
| 근처 휴게소 어디야 | user_lounge_query | user_lounge_query | PASS |
| 샤워할 데 있어? | user_lounge_query | user_lounge_query | PASS |
| 지금 날씨 어때? | user_weather_query | user_weather_query | PASS |
| 안개 꼈어 앞이 안보여 | user_weather_query | user_weather_query | PASS |
| 사고났어 도와줘 | user_emergency | user_emergency | PASS |
| 119 불러줘 | user_emergency | user_emergency | PASS |
| 그냥 뭐 | user_greeting(기본값) | user_greeting | PASS |

---

## 2. 콘솔 / 예외 로그 (페이지별)

### TC1 / TC10 — `/` (홈)
```
[console.error] Failed to load resource: net::ERR_CONNECTION_REFUSED
[console.error] Failed to load resource: net::ERR_CONNECTION_REFUSED
[pageerror] Failed to fetch
[pageerror] Failed to fetch
```
원인: `Home.tsx`의 `dbping()` 호출 → `VITE_USE_MOCK=true`임에도 `http://localhost:8000/` 백엔드 API 실제 호출.

### TC10 — `/map`
```
[console.error] Failed to load resource: net::ERR_CONNECTION_REFUSED  (×2)
[console.error] Failed to load resource: the server responded with a status of 401 (Unauthorized)
```
원인:
- ERR_CONNECTION_REFUSED: 백엔드 API 호출 (같은 경로)
- 401: Naver Maps 지도 스크립트 로드 시 `dummy` Client ID → Naver CDN 인증 실패

### 그 외 라우트 (`/start-trip`, `/test-tts`, `/risk`, `/rest-area`)
에러 없음 (0건)

---

## 3. 발견 이슈

### P1 — 폴리시 (시연 영향 있음)

#### [P1-1] `dbping()` mock 모드 미처리 — `src/routes/Home.tsx`
- **현상**: `VITE_USE_MOCK=true` 설정 무관하게 `useEffect(() => { dbping(); }, [])` 실행 → 백엔드 미기동 시 `Failed to fetch` pageerror 발생
- **영향**: TC1, TC10(`/`) FAIL. 시연 중 콘솔에 에러 노출.
- **권고 수정**:
  ```tsx
  // Home.tsx — dbping을 mock 모드에서 skip
  useEffect(() => {
    if (import.meta.env.VITE_USE_MOCK !== "true") {
      dbping();
    }
  }, []);
  ```

#### [P1-2] `/map` Naver Maps 401 — mock 모드 + dummy 키
- **현상**: `VITE_NAVER_MAPS_CLIENT_ID=dummy`로 Naver Maps 스크립트 로드 시 401 반환
- **영향**: TC10(`/map`) 콘솔 에러. 지도 타일 미표시.
- **권고**: 시연 환경에서 실제 Naver Maps 키 사용. 또는 mock 모드 시 지도 컴포넌트 로드 자체를 skip 처리.

---

### P2 — 정리 권고 (시연 비차단)

#### [P2-1] `RiskFactors.tsx` 이모지 매핑 불완전
- **현상**: `FACTOR_LABELS`가 `long_drive`, `night_time` 2종만 정의. 다른 factor type 진입 시 아이콘 컬럼에 영문 type 코드 그대로 노출 (`?? factor.type`).
- **현재 mock_risk.json**: 2종만 사용하므로 현재 시연에서는 미노출 (TC5 PASS).
- **잠재 버그**: 추후 `high_speed`, `fatigue` 등 신규 factor 추가 시 영문 코드 누출.
- **권고**:
  ```tsx
  // 기본값을 "⚠️"로 변경
  {FACTOR_LABELS[factor.type] ?? "⚠️"}
  ```

#### [P2-2] `WakeWordToggle.tsx` dead code
- **현상**: `src/components/WakeWordToggle.tsx` 파일이 존재하나 전체 src 내 import 0건.
- **권고**: 삭제. 혼동 방지 및 번들 크기 절감.

#### [P2-3] TC2 BottomTabBar alert → 토스트 교체 고려
- **현상**: 비활성 탭 클릭 시 `alert()` 사용. 시연 중 브라우저 native alert 박스 표시.
- **기능적으로는 정상**. `sonner` toast로 교체 시 UX 개선 가능 (별도 결정 사항).

---

## 4. 헤드리스 한계 — 검증 불가 항목

| 항목 | 이유 | 검증 수준 |
|---|---|---|
| Web Speech API (STT) — `listenOnce()` 실제 음성 인식 | Chromium headless에 SpeechRecognition API 없음 | 버튼 존재·graceful 처리까지만 확인 (TC6) |
| Web Speech API (TTS) — `speak()` 실제 음성 출력 | Chromium headless에 speechSynthesis API 없음 | 버튼 클릭 및 상태 전환까지만 확인 (TC6, TC9) |
| Naver 지도 타일 로드 | `VITE_NAVER_MAPS_CLIENT_ID=dummy` → 401 | 지도 컨테이너 DOM 렌더까지만 확인 (TC3) |
| 실제 마이크 입력 레벨 시각화 | headless 마이크 없음 | 컴포넌트 렌더까지만 확인 |

---

## 5. 권고 — 머지 / 수정 우선순위

### 머지 전 수정 필요 (P1)

1. **`Home.tsx` dbping() mock 조건부 처리** → `VITE_USE_MOCK=true` 시 API 호출 skip
   파일: `src/routes/Home.tsx:18`

2. **Naver Maps 실제 키 확보 또는 mock 분기** → 시연 시 401 에러 제거
   파일: vite env 또는 `src/routes/Map.tsx`

### 머지 후 정리 (P2)

3. **`RiskFactors.tsx` 이모지 기본값 `"⚠️"` 처리** → 영문 코드 누출 방어
   파일: `src/components/RiskFactors.tsx:26`

4. **`WakeWordToggle.tsx` 삭제** → dead code 제거
   파일: `src/components/WakeWordToggle.tsx`

5. **BottomTabBar `alert()` → `toast()` 교체** (선택 사항)
   파일: `src/components/layout/BottomTabBar.tsx:9`

---

## 6. 최종 판정

| 구분 | PASS | FAIL | PARTIAL | 총계 |
|---|---|---|---|---|
| E2E (Playwright) | 8 | 2 | 0 | 10 |
| 단위 / 정적 검사 | 4 | 0 | 0 | 4 |
| **합계** | **12** | **2** | **0** | **14** |

**시연 차단(P0) 이슈: 없음**
**P1 이슈: 2건** (dbping mock 누락, Naver Maps 401) — 시연 전 수정 권장
**P2 이슈: 3건** (RiskFactors 이모지 기본값, WakeWordToggle dead code, alert→toast)

---

*Generated by Claude Code — W3-8 테스트 지시서 기준*
