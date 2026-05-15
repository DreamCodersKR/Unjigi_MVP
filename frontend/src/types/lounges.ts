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