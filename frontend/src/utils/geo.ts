import type { Lounge, Coord } from "@/types/geo";

export const DEFAULT_Coord: Coord = {
  lat: 35.18,
  lng: 129.07,
};

export function getDistanceMeters(a: Coord, b: Coord) {
  const R = 6371000; // 지구 반지름, meter

  const toRad = (deg: number) => (deg * Math.PI) / 180;  //degree -> radian 변환

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

export function findNearestLounge(
  current: Coord,
  lounges: Lounge[]
): (Lounge & { distanceMeters: number }) | null {
  if (lounges.length === 0) return null;

  return lounges.reduce<(Lounge & { distanceMeters: number }) | null>(
    (nearest, lounge) => {
      const distanceMeters = getDistanceMeters(current, {
        lat: lounge.lat,
        lng: lounge.lng,
      });

      if (!nearest || distanceMeters < nearest.distanceMeters) {
        return {
          ...lounge,
          distanceMeters,
        };
      }

      return nearest;
    },
    null
  );
}