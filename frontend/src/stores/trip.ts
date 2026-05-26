import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RiskResponse } from '@/types/risk';

type RiskHistoryPoint = RiskResponse['history'][number];

export type RestRecord = {
  restStartedAt: string;
  restFinishedAt: string | null;
};

interface TripStore {
  isRunning: boolean;
  tripId: string | null;
  tripStartedAt: string | null;
  tripMode: 'normal' | 'demo' | null;
  destination: string | null;
  currentScore: number;
  currentLevel: 'L1'|'L2'|'L3'|'L4';
  riskHistory: RiskHistoryPoint[];
  rests: RestRecord[];
  isAtRestArea: boolean;
  hasShownBackgroundToast: boolean;
 
  startTrip: (mode: 'normal' | 'demo', destination?: string) => void;
  endTrip: () => void;
  updateRisk: (score: number, level: 'L1'|'L2'|'L3'|'L4', history?: RiskHistoryPoint[]) => void;
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
      riskHistory: [],
      rests: [],
      isAtRestArea: false,
      hasShownBackgroundToast: false,
 
      startTrip: (mode, destination) => set({
        isRunning: true,
        tripId: `trip_${Date.now()}`,
        tripStartedAt: new Date().toISOString(),
        tripMode: mode,
        destination: destination ?? null,
        riskHistory: [],
        rests: [],
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
        riskHistory: [],
        rests: [],
        isAtRestArea: false,
        hasShownBackgroundToast: false,
      }),
      updateRisk: (currentScore, currentLevel, riskHistory) => set({
        currentScore,
        currentLevel,
        ...(riskHistory ? { riskHistory } : {}),
      }),
      enterRestArea: () => set((state) => {
        if (state.isAtRestArea) return state;

        return {
          isAtRestArea: true,
          rests: [
            ...state.rests,
            {
              restStartedAt: new Date().toISOString(),
              restFinishedAt: null,
            },
          ],
        };
      }),
      exitRestArea: () => set((state) => {
        if (!state.isAtRestArea) return state;

        const latestOpenRestIndex = state.rests.findLastIndex(
          (rest) => rest.restFinishedAt === null
        );

        if (latestOpenRestIndex === -1) {
          return { isAtRestArea: false };
        }

        return {
          isAtRestArea: false,
          rests: state.rests.map((rest, index) =>
            index === latestOpenRestIndex
              ? { ...rest, restFinishedAt: new Date().toISOString() }
              : rest
          ),
        };
      }),
      markBackgroundToastShown: () => set({ hasShownBackgroundToast: true }),
    }),
    { name: 'unjigi-trip' }
  )
);
 
export function getElapsedMinutes(tripStartedAt: string) {
  return Math.floor((Date.now() - new Date(tripStartedAt).getTime()) / 60000);
}
