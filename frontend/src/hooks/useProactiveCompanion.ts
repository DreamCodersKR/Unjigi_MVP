import { useEffect, useRef } from 'react';
import { speak } from '@/services/tts';

type RiskLevel = 'L1' | 'L2' | 'L3' | 'L4';

type UseProactiveCompanionParams = {
  level: RiskLevel;
  tripStartedAt: string | null;
};

function triggerProactive(level: RiskLevel, tripStartedAt: string | null) {
  console.log('triggerProactive 실행', { level, tripStartedAt });
  speak('레벨변경: ' + level);
  //나중에
}

export function useProactiveCompanion({
  level,
  tripStartedAt,
}: UseProactiveCompanionParams) {
  const lastTriggerRef = useRef({ L1: 0, L2: 0, L3: 0, L4: 0 });

  useEffect(() => {
    if (level === 'L1') return;

    const now = Date.now();
    if (now - lastTriggerRef.current[level] < 30 * 60 * 1000) return;
    lastTriggerRef.current[level] = now;
    triggerProactive(level, tripStartedAt);
  }, [level]);
}
