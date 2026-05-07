export interface Lounge {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export async function getLounges(): Promise<Lounge[]> {
  const response = await fetch("/api/lounges");

  if (!response.ok) {
    throw new Error("라운지 목록 조회 실패");
  }

  return response.json();
}