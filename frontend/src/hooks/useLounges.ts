import { useQuery } from "@tanstack/react-query";
import { getLounges, getLoungeNearest, getLoungesCircle } from "@/api/lounges";

export function useLounges() {
  return useQuery({
    queryKey: ["lounges"],
    queryFn: getLounges,
    enabled: true,
  });
}

export function useLoungeNearest(lat: number, lng: number) {
  return useQuery({
    queryKey: ["loungeNearest", lat, lng],
    queryFn: () => getLoungeNearest(lat, lng),
    enabled: lat != null && lng != null,
  });
}

export function useLoungesCircle(lat: number, lng: number, radiusKm: number) {
  return useQuery({
    queryKey: ["getLoungesCircle", lat, lng, radiusKm],
    queryFn: () => getLoungesCircle(lat, lng, radiusKm),
    enabled: lat != null && lng != null,
  });
}