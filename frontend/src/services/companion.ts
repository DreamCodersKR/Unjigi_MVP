import mockDemo from "@/mocks/mock_demo.json";
import type {
  CompanionIntent,
  MockCompanionResponse,
  UserCompanionIntent,
} from "@/types/companion";

const USER_INTENT_KEYWORDS: Record<UserCompanionIntent, string[]> = {
  user_emergency: [
    "긴급",
    "비상",
    "119",
    "사고",
    "아파",
    "도와",
    "응급",
    "위험",
    "구급",
  ],
  user_lounge_query: [
    "휴게소",
    "라운지",
    "쉼터",
    "졸음쉼터",
    "쉬",
    "샤워",
    "화장실",
    "주차",
  ],
  user_weather_query: [
    "날씨",
    "비",
    "눈",
    "안개",
    "기온",
    "도로",
    "시야",
    "바람",
  ],
  user_greeting: [
    "안녕",
    "고마워",
    "반가",
    "수고",
    "졸려",
    "피곤",
    "괜찮",
  ],
};

const mockResponses = mockDemo as MockCompanionResponse[];

function normalizeInput(input: string) {
  return input.trim().toLowerCase();
}

function countKeywordMatches(input: string, keywords: string[]) {
  return keywords.reduce(
    (count, keyword) => count + (input.includes(keyword.toLowerCase()) ? 1 : 0),
    0
  );
}

export function classifyUserIntent(input: string): UserCompanionIntent {
  const normalizedInput = normalizeInput(input);

  let selectedIntent: UserCompanionIntent = "user_greeting";
  let selectedScore = 0;

  for (const [intent, keywords] of Object.entries(USER_INTENT_KEYWORDS) as [
    UserCompanionIntent,
    string[],
  ][]) {
    const score = countKeywordMatches(normalizedInput, keywords);
    if (score > selectedScore) {
      selectedIntent = intent;
      selectedScore = score;
    }
  }

  return selectedIntent;
}

export function getMockResponsesByIntent(intent: CompanionIntent) {
  return mockResponses.filter((item) => item.intent === intent);
}

function scoreResponseForInput(input: string, response: MockCompanionResponse) {
  if (!response.user_input) return 0;

  const normalizedInput = normalizeInput(input);
  const mockInput = normalizeInput(response.user_input);
  const compactMockInput = mockInput.replace(/\s/g, "");

  if (normalizedInput === mockInput) return 100;
  if (normalizedInput.includes(mockInput) || mockInput.includes(normalizedInput)) {
    return 50;
  }

  return Array.from(compactMockInput).reduce(
    (score, char) => score + (normalizedInput.includes(char) ? 1 : 0),
    0
  );
}

export function findMockCompanionResponse(input: string) {
  const intent = classifyUserIntent(input);
  const candidates = getMockResponsesByIntent(intent);

  if (candidates.length === 0) return null;

  return candidates.reduce((best, current) => {
    const bestScore = scoreResponseForInput(input, best);
    const currentScore = scoreResponseForInput(input, current);
    return currentScore > bestScore ? current : best;
  }, candidates[0]);
}

export function findMockCompanionResponseByTrigger(trigger: string) {
  return mockResponses.find((item) => item.trigger === trigger) ?? null;
}
