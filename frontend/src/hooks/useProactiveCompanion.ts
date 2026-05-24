import { useEffect } from 'react';
import { speak } from '@/services/tts';

type RiskLevel = 'L1' | 'L2' | 'L3' | 'L4';

type UseProactiveCompanionParams = {
  level: RiskLevel;
  tripStartedAt: string | null;
};

const PROACTIVE_COOLDOWN_MS = 30 * 60 * 1000;
const PROACTIVE_SPEAK_DELAY_MS = 1200;

const MESSAGES: Record<Exclude<RiskLevel, 'L1'>, string> = {
  L2: '주의가 필요해요. 잠깐 자세를 고치고 앞차와 거리를 유지해 주세요.',
  L3: '위험 신호가 감지됐어요. 가까운 휴게소나 졸음쉼터를 확인해보는 게 좋아요.',
  L4: '위험도가 높아요. 가능한 한 빨리 안전한 곳에 정차하고 쉬어가세요.',
};

const lastSpokenAtByTrip = new Map<string, Partial<Record<RiskLevel, number>>>();
const pendingTimers = new Map<string, number>();

function getTripKey(tripStartedAt: string | null) {
  return tripStartedAt ?? 'no-active-trip';
}

function getMessage(level: RiskLevel) {
  if (level === 'L1') return null;
  return MESSAGES[level];
}

export function useProactiveCompanion({
  level,
  tripStartedAt,
}: UseProactiveCompanionParams) {
  useEffect(() => {
    const message = getMessage(level);
    if (!message || !tripStartedAt) return;

    const tripKey = getTripKey(tripStartedAt);
    const timerKey = `${tripKey}:${level}`;
    const now = Date.now();
    const lastSpokenAt = lastSpokenAtByTrip.get(tripKey)?.[level] ?? 0;

    if (now - lastSpokenAt < PROACTIVE_COOLDOWN_MS) return;
    if (pendingTimers.has(timerKey)) return;

    const timerId = window.setTimeout(() => {
      pendingTimers.delete(timerKey);

      const latestSpokenAt = lastSpokenAtByTrip.get(tripKey)?.[level] ?? 0;
      if (Date.now() - latestSpokenAt < PROACTIVE_COOLDOWN_MS) return;

      const spokenAtByLevel = lastSpokenAtByTrip.get(tripKey) ?? {};
      spokenAtByLevel[level] = Date.now();
      lastSpokenAtByTrip.set(tripKey, spokenAtByLevel);

      speak(message).catch((error) => {
        console.error('useProactiveCompanion speak failed', error);
      });
    }, PROACTIVE_SPEAK_DELAY_MS);

    pendingTimers.set(timerKey, timerId);

    return () => {
      window.clearTimeout(timerId);
      pendingTimers.delete(timerKey);
    };
  }, [level, tripStartedAt]);
}
