import type { RiskResponse } from "@/types/risk";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getRisk(): Promise<RiskResponse> {
  const response = await fetch(`${API_BASE_URL}api/risk`);

  if (!response.ok) {
    throw new Error("api/risk 조회 실패");
  }

  return response.json();
}