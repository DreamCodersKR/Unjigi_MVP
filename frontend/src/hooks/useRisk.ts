import { useQuery } from '@tanstack/react-query';
import { getRisk } from "@/api/risk";
import mockRisk from '@/mocks/mock_risk.json';
import type { RiskResponse } from "@/types/risk";

//const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
 
export function useRisk() {
  return useQuery<RiskResponse>({
    queryKey: ['risk'],
    queryFn: async () => {
      if (true) return mockRisk as RiskResponse;
      return getRisk();
    },
    refetchInterval: 5000,
    enabled: true,
  });
}
