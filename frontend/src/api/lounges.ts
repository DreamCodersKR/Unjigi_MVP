const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Lounge = {
  id: string; 
  name: string; 
  type: 'lounge' | 'rest_area';
  lat: number; lng: number;
  facility_shower: boolean; 
  facility_sleep_room: boolean;
  facility_laundry: boolean; 
  facility_restaurant: boolean;
  total_seats: number;
  sido: string | null; 
  sigungu: string | null;
};


export async function getLounges(): Promise<Lounge[]> {
  const response = await fetch(`${API_BASE_URL}api/lounges`);

  if (!response.ok) {
    throw new Error("라운지 목록 조회 실패");
  }

  return response.json();
}