import type { Lounge } from "@/types/geo";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getLounges(): Promise<Lounge[]> {
  const response = await fetch(`${API_BASE_URL}api/lounges`);

  if (!response.ok) {
    throw new Error("라운지 목록 조회 실패");
  }

  return response.json();
}

export async function getLoungeNearest(  
  lat: number,
  lng: number
): Promise<Lounge> {
  const response = await fetch(`${API_BASE_URL}api/lounges/nearest?lat=${lat}&lng=${lng}`);

  if (!response.ok) {
    throw new Error("가장 가까운 라운지 조회 실패");
  }

  return response.json();
}

export async function dbping(): Promise<[]> {
  const response = await fetch(`${API_BASE_URL}dbping`);

  if (!response.ok) {
    throw new Error("dbping 실패");
  }

  return response.json();
}