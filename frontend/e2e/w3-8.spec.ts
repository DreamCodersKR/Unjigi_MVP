import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

// ESM __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── 공통 헬퍼 ──────────────────────────────────────────────────────────────

const errors: Record<string, string[]> = {};

function attachConsoleListener(page: Page, label: string) {
  errors[label] = [];
  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      errors[label].push(`[console.error] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err: Error) => {
    errors[label].push(`[pageerror] ${err.message}`);
  });
}

async function ss(page: Page, name: string) {
  const dir = path.resolve(__dirname, "../test-results");
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: true });
}

// 운행 시작 플로우 공통 헬퍼
async function startTrip(page: Page) {
  await page.goto("/start-trip");
  await page.waitForLoadState("domcontentloaded");
  // 하단 footer의 [🚚 운행 시작] 버튼을 class로 직접 선택
  const startBtn = page.locator(".start-trip-modal__footer button");
  await expect(startBtn).toBeVisible({ timeout: 5000 });
  await startBtn.click();
  await page.waitForURL("**/risk", { timeout: 5000 });
}

// ─── TC1: 홈 + 하단탭바 ───────────────────────────────────────────────────────

test("TC1 - 홈 하단탭바 4개 렌더 및 active 스타일", async ({ page }) => {
  attachConsoleListener(page, "TC1");
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // 탭 4개 텍스트 확인
  await expect(page.getByText("지도")).toBeVisible();
  await expect(page.getByText("기록")).toBeVisible();
  await expect(page.getByText("가족")).toBeVisible();
  await expect(page.getByText("설정")).toBeVisible();

  // 지도 탭에 active 클래스 확인
  const mapTab = page.locator(".bottom-tab-bar__item--active");
  await expect(mapTab).toBeVisible();
  const mapTabText = await mapTab.textContent();
  expect(mapTabText).toContain("지도");

  await ss(page, "TC1");

  // 콘솔 에러 0
  expect(errors["TC1"]).toHaveLength(0);
});

// ─── TC2: 비활성 탭 alert ─────────────────────────────────────────────────────

test("TC2 - 비활성 탭 클릭 시 '준비 중인 기능입니다' alert", async ({ page }) => {
  attachConsoleListener(page, "TC2");
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  const urlBefore = page.url();

  const tabs = ["기록", "가족", "설정"];
  for (const tab of tabs) {
    let dialogMessage = "";
    page.once("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.dismiss();
    });

    // 탭 버튼 클릭 (button 요소만, Link 제외)
    await page.locator(".bottom-tab-bar__grid button").filter({ hasText: tab }).click();
    await page.waitForTimeout(300);

    expect(dialogMessage).toBe("준비 중인 기능입니다");
    expect(page.url()).toBe(urlBefore);
  }

  await ss(page, "TC2");
});

// ─── TC3: 지도 탭 → /map 네비 ─────────────────────────────────────────────────

test("TC3 - 지도 탭 클릭 → URL /map 이동 및 컨테이너 렌더", async ({ page }) => {
  attachConsoleListener(page, "TC3");
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // "지도" Link 클릭
  await page.locator(".bottom-tab-bar__item").filter({ hasText: "지도" }).click();
  await page.waitForTimeout(500);

  expect(page.url()).toContain("/map");

  // 페이지가 렌더됐는지 확인 (body 비어있지 않음)
  const bodyText = (await page.locator("body").textContent()) ?? "";
  expect(bodyText.length).toBeGreaterThan(0);

  await ss(page, "TC3");
});

// ─── TC4: /start-trip → 운행시작 → /risk ─────────────────────────────────────

test("TC4 - /start-trip 운행시작 버튼 → /risk 이동", async ({ page }) => {
  attachConsoleListener(page, "TC4");
  await startTrip(page);

  expect(page.url()).toContain("/risk");

  await ss(page, "TC4");
});

// ─── TC5: /risk 위험도 + RiskFactors ─────────────────────────────────────────

test("TC5 - /risk 위험도 점수·레벨·RiskFactors 표시 (영문 type 미노출)", async ({ page }) => {
  attachConsoleListener(page, "TC5");

  await startTrip(page);
  await page.waitForTimeout(1000);

  const bodyText = (await page.locator("body").textContent()) ?? "";

  // 점수 47, 레벨 L2 확인
  expect(bodyText).toContain("47");
  expect(bodyText).toContain("L2");

  // RiskFactors 메시지 확인
  expect(bodyText).toContain("90분 연속 운행 중이에요");
  expect(bodyText).toContain("야간 운행");

  // 영문 type 코드 미노출 확인 (아이콘 컬럼에 raw type 값이 그대로 나오는 버그 체크)
  expect(bodyText).not.toContain("long_drive");
  expect(bodyText).not.toContain("night_time");

  await ss(page, "TC5");
});

// ─── TC6: 음성 호출 버튼 ─────────────────────────────────────────────────────

test("TC6 - '운지기 호출' 버튼 존재 + 클릭 시 graceful 처리", async ({ page }) => {
  attachConsoleListener(page, "TC6_home");

  // 홈에서 확인
  await page.goto("/");
  await page.waitForLoadState("domcontentloaded");

  // UnjigiCallButton은 idle 상태에서 "운지기 호출" 텍스트
  const callBtnHome = page.locator(".unjigi-call__button");
  await expect(callBtnHome).toBeVisible({ timeout: 5000 });

  const homeLabel = await callBtnHome.textContent();
  expect(homeLabel).toContain("운지기 호출");

  await ss(page, "TC6_home");

  // 홈에서 클릭 → STT 미지원 시 crash 없어야 함
  await callBtnHome.click();
  await page.waitForTimeout(2000);

  const crashed = errors["TC6_home"].some((e) =>
    e.includes("Uncaught") || (e.includes("TypeError") && !e.includes("speechSynthesis"))
  );
  expect(crashed).toBe(false);

  await ss(page, "TC6_home_after_click");

  // /risk에서 확인
  attachConsoleListener(page, "TC6_risk");
  await startTrip(page);
  await page.waitForTimeout(500);

  const callBtnRisk = page.locator(".unjigi-call__button");
  await expect(callBtnRisk).toBeVisible({ timeout: 5000 });

  await ss(page, "TC6_risk");
});

// ─── TC7: 휴게소 디버그텍스트 제거 ──────────────────────────────────────────

test("TC7 - /rest-area 디버그 텍스트(MVP·20초·디버그) 0개", async ({ page }) => {
  attachConsoleListener(page, "TC7");

  // /rest-area는 isRunning=true 필요 → 운행 시작 후 직접 이동
  await startTrip(page);

  await page.goto("/rest-area");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(500);

  const bodyText = (await page.locator("body").textContent()) ?? "";

  const hasMVP = bodyText.includes("MVP");
  const has20sec = bodyText.includes("20초");
  const hasDebug = bodyText.includes("디버그");

  expect(hasMVP).toBe(false);
  expect(has20sec).toBe(false);
  expect(hasDebug).toBe(false);

  await ss(page, "TC7");
});

// ─── TC8: 운행요약 실데이터 ──────────────────────────────────────────────────

test("TC8 - 운행요약 운행시간·안전점수 실데이터 (하드코딩 FAIL)", async ({ page }) => {
  attachConsoleListener(page, "TC8");

  await startTrip(page);

  // 잠시 대기 (riskHistory 쌓기 위해)
  await page.waitForTimeout(1500);

  // 운행 종료 버튼 클릭 → ConfirmWindow 열림
  const endBtn = page.locator("button").filter({ hasText: /운행 종료/ }).first();
  await expect(endBtn).toBeVisible({ timeout: 3000 });
  await endBtn.click();

  // ConfirmWindow의 "확인" 버튼 클릭
  const confirmBtn = page.locator(".confirm-window__button--confirm");
  await expect(confirmBtn).toBeVisible({ timeout: 3000 });
  await confirmBtn.click();

  // Home으로 redirect 후 TripSummary 모달 기다림
  await page.waitForTimeout(1500);

  const bodyText = (await page.locator("body").textContent()) ?? "";

  // "운행 완료" 또는 "운행 시간" 텍스트 (TripSummary 모달)
  const summaryOpen =
    bodyText.includes("운행 완료") || bodyText.includes("운행 시간");
  expect(summaryOpen).toBe(true);

  // 하드코딩 값 미노출 확인
  expect(bodyText).not.toContain("5시간 32분");
  expect(bodyText).not.toContain("420km");

  await ss(page, "TC8");
});

// ─── TC9: /test-tts 렌더 ──────────────────────────────────────────────────────

test("TC9 - /test-tts 페이지 렌더 + 버튼 존재", async ({ page }) => {
  attachConsoleListener(page, "TC9");
  await page.goto("/test-tts");
  await page.waitForLoadState("domcontentloaded");

  // 버튼 최소 1개
  const buttons = page.getByRole("button");
  const count = await buttons.count();
  expect(count).toBeGreaterThanOrEqual(1);

  await ss(page, "TC9");
  expect(errors["TC9"]).toHaveLength(0);
});

// ─── TC10: 전역 안정성 ───────────────────────────────────────────────────────

test("TC10 - 전 라우트 uncaught exception / 콘솔 error 수집", async ({ page }) => {
  const routes = ["/", "/map", "/start-trip", "/test-tts"];
  const allErrors: Record<string, string[]> = {};

  for (const route of routes) {
    allErrors[route] = [];

    const onConsole = (msg: ConsoleMessage) => {
      if (msg.type() === "error") allErrors[route].push(`[console.error] ${msg.text()}`);
    };
    const onPageError = (err: Error) => {
      allErrors[route].push(`[pageerror] ${err.message}`);
    };

    page.on("console", onConsole);
    page.on("pageerror", onPageError);

    await page.goto(route);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    await ss(page, `TC10_${route.replace(/\//g, "_").replace(/^_/, "") || "home"}`);

    page.off("console", onConsole);
    page.off("pageerror", onPageError);
  }

  // /risk, /rest-area (isRunning=true 필요) — 운행 후 이동
  for (const route of ["/risk", "/rest-area"]) {
    allErrors[route] = [];

    // 먼저 운행 시작
    const onConsole2 = (msg: ConsoleMessage) => {
      if (msg.type() === "error") allErrors[route].push(`[console.error] ${msg.text()}`);
    };
    const onPageError2 = (err: Error) => {
      allErrors[route].push(`[pageerror] ${err.message}`);
    };

    page.on("console", onConsole2);
    page.on("pageerror", onPageError2);

    await startTrip(page);
    await page.goto(route);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);

    await ss(page, `TC10_${route.replace(/\//g, "_").replace(/^_/, "")}`);

    page.off("console", onConsole2);
    page.off("pageerror", onPageError2);
  }

  // 결과를 JSON으로 저장
  const errPath = path.resolve(__dirname, "../test-results/tc10-errors.json");
  fs.writeFileSync(errPath, JSON.stringify(allErrors, null, 2));

  const totalErrors = Object.values(allErrors).flat();
  if (totalErrors.length > 0) {
    console.warn("TC10 콘솔 에러 발견:", JSON.stringify(allErrors, null, 2));
  }

  expect(totalErrors).toHaveLength(0);
});
