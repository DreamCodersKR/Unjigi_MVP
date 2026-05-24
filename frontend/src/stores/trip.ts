import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TripStore {
  isRunning: boolean;
  tripId: string | null;
  tripStartedAt: string | null;
  tripMode: 'normal' | 'demo' | null;
  destination: string | null;
  currentScore: number;
  currentLevel: 'L1'|'L2'|'L3'|'L4';
  isAtRestArea: boolean;
  hasShownBackgroundToast: boolean;
 
  startTrip: (mode: 'normal' | 'demo', destination?: string) => void;
  endTrip: () => void;
  updateRisk: (score: number, level: 'L1'|'L2'|'L3'|'L4') => void;
  enterRestArea: () => void;
  exitRestArea: () => void;
  markBackgroundToastShown: () => void;
}

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      isRunning: false,
      tripId: null,
      tripStartedAt: null,
      tripMode: null,
      destination: null,
      currentScore: 0,
      currentLevel: 'L1',
      isAtRestArea: false,
      hasShownBackgroundToast: false,
 
      startTrip: (mode, destination) => set({
        isRunning: true,
        tripId: `trip_${Date.now()}`,
        tripStartedAt: new Date().toISOString(),
        tripMode: mode,
        destination: destination ?? null,
        hasShownBackgroundToast: false,
      }),
      endTrip: () => set({
        isRunning: false,
        tripId: null,
        tripStartedAt: null,
        tripMode: null,
        destination: null,
        currentScore: 0,
        currentLevel: 'L1',
        isAtRestArea: false,
        hasShownBackgroundToast: false,
      }),
      updateRisk: (currentScore, currentLevel) => set({ currentScore, currentLevel }),
      enterRestArea: () => set({ isAtRestArea: true }),
      exitRestArea: () => set({ isAtRestArea: false }),
      markBackgroundToastShown: () => set({ hasShownBackgroundToast: true }),
    }),
    { name: 'unjigi-trip' }
  )
);
 
export function getElapsedMinutes(tripStartedAt: string) {
  return Math.floor((Date.now() - new Date(tripStartedAt).getTime()) / 60000);
}
