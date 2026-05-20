// hooks/useLoungeMarkers.ts

import { useEffect, useRef } from "react";
import type { Lounge } from "@/types/geo";
import { createInfoWindowContent } from "@/utils/naverMaps";

type UseLoungeMarkersParams = {
  map: naver.maps.Map | null;
  lounges: Lounge[];
  isLoading: boolean;
};

export function useLoungeMarkers({
  map,
  lounges,
  isLoading,
}: UseLoungeMarkersParams) {
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const markerByIdRef = useRef<Map<string, naver.maps.Marker>>(new Map());

  const removeMarkers = () => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });

    markersRef.current = [];
    markerByIdRef.current.clear();
  };

  const openLoungeInfoWindow = (
    lounge: Lounge,
    marker: naver.maps.Marker
  ) => {
    if (!map) return;

    if (!infoWindowRef.current) {
      infoWindowRef.current = new naver.maps.InfoWindow({ content: "" });
    }

    infoWindowRef.current.setContent(createInfoWindowContent(lounge));
    infoWindowRef.current.open(map, marker);
  };

  //마커 생성
  useEffect(() => {
    if (!map) return;
    if (!window.naver?.maps) return;
    if (isLoading) return;

    removeMarkers();

    if (lounges.length === 0) return;

    const bounds = new naver.maps.LatLngBounds( //타입 정의상 초기값 필요
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );

    lounges.forEach((lounge) => {
      const position = new naver.maps.LatLng(lounge.lat, lounge.lng);

      const marker = new naver.maps.Marker({
        position,
        map,
        icon: {
          content: `
            <div
              style="
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: ${lounge.type === "lounge" ? "#1A56DB" : "#FF6B35"};
                border: 2px solid white;
                box-shadow: 0 0 4px rgba(0,0,0,0.3);
              "
            ></div>
          `,
        },
      });

      naver.maps.Event.addListener(marker, "click", () => {
        openLoungeInfoWindow(lounge, marker);
      });

      markerByIdRef.current.set(lounge.id, marker);
      markersRef.current.push(marker);
      bounds.extend(position);
    });

    requestAnimationFrame(() => {
      map.fitBounds(bounds);
    });

    return () => {
      removeMarkers();
    };
  }, [map, lounges, isLoading]);

  //단일 라운지 자동 인포 오픈
  useEffect(() => {
    if (!map) return;
    if (lounges.length !== 1) return;

    const marker = markerByIdRef.current.get(lounges[0].id);
    if (!marker) return;

    openLoungeInfoWindow(lounges[0], marker);
  }, [map, lounges]);
}