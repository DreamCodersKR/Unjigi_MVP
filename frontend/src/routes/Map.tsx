import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLounges } from "@/hooks/useLounges";
import type { Lounge, Coord } from "@/types/geo";
import  { DEFAULT_Coord, findNearestLounge } from "@/utils/geo";

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);  //네이버 지도 SDK 로드 완료 여부
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const infoWindowRef = useRef<naver.maps.InfoWindow | null>(null);
  const { data: lounges = [], isLoading, error, refetch } = useLounges();
  const [currentLoc] = useState<Coord>(DEFAULT_Coord);
  const markerByIdRef = useRef<Map<string, naver.maps.Marker>>(new Map<string, naver.maps.Marker>());

  const nearestLounge = useMemo(() => {
    if (!currentLoc) return null;
    if (lounges.length === 0) return null;

    return findNearestLounge(currentLoc, lounges);
  }, [currentLoc, lounges]);

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

  //SDK 로드 완료 후 지도 생성
  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const mapInstance  = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(currentLoc.lat,currentLoc.lng),
      zoom: 12,
    });

    setMap(mapInstance);
    if (!infoWindowRef.current) {
      infoWindowRef.current = new naver.maps.InfoWindow({content: ""}); //타입 정의상 options 객체 필요
    }

  }, [loaded]);

  //마커 생성
  useEffect(() => {
    if (!map) return;
    if (!window.naver) return;
    if (isLoading) return;
    if (lounges.length === 0) return;

    removeMarkers();

    const bounds = new naver.maps.LatLngBounds(  //타입 정의상 초기값 필요
      new naver.maps.LatLng(0, 0),
      new naver.maps.LatLng(0, 0)
    );
    

    lounges.forEach((lounge) => {
      const position = new window.naver.maps.LatLng(lounge.lat, lounge.lng);

      const marker = new window.naver.maps.Marker({
        position: position,
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
      window.naver.maps.Event.addListener(marker, "click", () => {
        openLoungeInfoWindow(lounge, marker);
      });
      markerByIdRef.current.set(lounge.id, marker);
      markersRef.current.push(marker);
      bounds.extend(position);
    });

    requestAnimationFrame(() => {
      map.fitBounds(bounds);
    });
  }, [map, lounges]);

  useEffect(() => {
    if (!map) return;
    if (!nearestLounge) return;

    const marker = markerByIdRef.current.get(nearestLounge.id);

    if (!marker) return;
    openLoungeInfoWindow(nearestLounge, marker);
  }, [map, nearestLounge]);


  const openLoungeInfoWindow = (
    lounge: Lounge,
    marker: naver.maps.Marker
  ) => {
    if (!map) return;
    infoWindowRef.current?.setContent(createInfoWindowContent(lounge));
    infoWindowRef.current?.open(map, marker);
  };

  const removeMarkers = () => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];  
  };

  function createInfoWindowContent(lounge: Lounge) {
    return `
      <div style="padding: 12px; min-width: 140px; font-size: 14px;">
        <strong>${lounge.name}</strong>
        <div>${lounge.sido ?? ""} ${lounge.sigungu ?? ""}</div>
        <div style="margin-top: 6px;">
          <strong>[${lounge.type === "lounge" ? "화물차 라운지" : "졸음쉼터"}]</strong>
        </div>
        <div>샤워실: ${lounge.facility_shower ? '<strong>O</strong>':'X'}</div>
        <div>수면실: ${lounge.facility_sleep_room ? '<strong>O</strong>':'X'}</div>
        <div>세탁실: ${lounge.facility_laundry ? '<strong>O</strong>':'X'}</div>
        <div>음식점: ${lounge.facility_restaurant ? '<strong>O</strong>':'X'}</div>
        <div>좌석수: ${lounge.total_seats}</div>
      </div>
      `;
  }

  return (
  <div className="relative w-full h-screen">
    {isLoading && <div>라운지 로딩중...</div>}
    {error && <div>라운지 에러 발생: {error.message}</div>}

    <Link
      to="/"
      className="absolute top-4 left-4 z-10 bg-white p-2 border"
    >
      홈으로 돌아가기
    </Link>
    
    <button
      onClick={() => refetch()}
      className="absolute top-16 left-4 z-10 bg-white p-2 border"
    >
      라운지 불러오기
    </button>

    <div
      ref={mapRef}
      className="w-full h-screen"
    />
  </div>
  );
}