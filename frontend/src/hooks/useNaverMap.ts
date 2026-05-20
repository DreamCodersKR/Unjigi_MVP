import { useEffect, useState, useRef } from "react";
import type { Coord } from "@/types/geo";

type UseCreateNaverMapParams = {
  //mapRef: React.RefObject<HTMLDivElement | null>;
  currentLoc: Coord;
};

export function useNaverMap({
  //mapRef,
  currentLoc,
}: UseCreateNaverMapParams) {
  const [loaded, setLoaded] = useState(false);  //네이버 지도 SDK 로드 완료 여부
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  //네이버 지도 SDK script 로드
  useEffect(() => {
    if (window.naver?.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");

    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${
      import.meta.env.VITE_NAVER_MAPS_CLIENT_ID
    }`;

    script.async = true;

    script.onload = () => {
      setLoaded(true);
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (!mapRef.current) return;
    if (map) return;

    const mapInstance = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(currentLoc.lat, currentLoc.lng),
      zoom: 12,
    });

    setMap(mapInstance);
  }, [loaded, map]);

    return { mapRef, map};
}