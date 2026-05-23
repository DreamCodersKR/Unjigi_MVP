import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { speak } from '@/services/tts';
import { useTripStore } from '@/stores/trip';

export function useBackgroundEntryToast() {
  const { isRunning, hasShownBackgroundToast, markBackgroundToastShown } = useTripStore();
  const didRunRef = useRef(false);

  useEffect(() => {
    if (didRunRef.current) return;
    if (!isRunning || hasShownBackgroundToast) return;

    didRunRef.current = true;
    markBackgroundToastShown();

    toast.info('🚛 백그라운드 모드 진입. 안전운행 하세요', {
      duration: 3000, position: 'top-center',
    });
    
    speak('안전운행 하세요. 위험할 때 제가 먼저 말씀드릴게요.');
  }, [isRunning, hasShownBackgroundToast]);
}
