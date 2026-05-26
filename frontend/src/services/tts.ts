type SpeakOptions = {
  rate?: number;
  pitch?: number;
};

const VOICE_LOAD_TIMEOUT_MS = 1200;
const FEMALE_VOICE_HINTS = [
  "female",
  "woman",
  "여성",
  "yuna",
  "heami",
  "sora",
  "sunhi",
  "kyuri",
];

function isSpeechSynthesisSupported() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function getKoreanVoices() {
  return window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith("ko"));
}

function isLikelyFemaleVoice(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  return FEMALE_VOICE_HINTS.some((hint) => name.includes(hint));
}

export function getPreferredKoreanVoice() {
  const koreanVoices = getKoreanVoices();

  return (
    koreanVoices.find(isLikelyFemaleVoice)
    ?? koreanVoices.find((voice) => voice.lang === "ko-KR")
    ?? koreanVoices[0]
    ?? null
  );
}

function waitForVoicesChanged() {
  return new Promise<void>((resolve) => {
    if (window.speechSynthesis.getVoices().length > 0) {
      resolve();
      return;
    }

    const timeoutId = window.setTimeout(cleanup, VOICE_LOAD_TIMEOUT_MS);

    function cleanup() {
      window.clearTimeout(timeoutId);
      window.speechSynthesis.removeEventListener("voiceschanged", cleanup);
      resolve();
    }

    window.speechSynthesis.addEventListener("voiceschanged", cleanup, {
      once: true,
    });
  });
}

export async function speak(
  text: string,
  options: SpeakOptions = {}
): Promise<void> {
  if (!isSpeechSynthesisSupported()) return;
  await waitForVoicesChanged();

  return new Promise<void>((resolve, reject) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = options?.rate ?? 1.0;
    u.pitch = options?.pitch ?? 1.0;
    u.voice = getPreferredKoreanVoice();
    u.onend = () => resolve();
    u.onerror = reject;
    window.speechSynthesis.speak(u);
  });
}
