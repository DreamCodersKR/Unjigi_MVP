import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLounges, useLoungeNearest, useLoungesCircle } from "@/hooks/useLounges";
import type { Coord } from "@/types/geo";
import  { DEFAULT_Coord } from "@/utils/geo";
import { useLoungeMarkers } from "@/hooks/useLoungeMarkers";
import { useNaverMap } from "@/hooks/useNaverMap";

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function MapPage() {
  const [currentLoc] = useState<Coord>(DEFAULT_Coord);
  const { mapRef, map } = useNaverMap({ currentLoc });

  const [searchParams] = useSearchParams();
  const { data: lounges = [], isLoading, error, refetch } = 
    searchParams.get('focus') === 'nearest' 
    ? useLoungeNearest(DEFAULT_Coord.lat, DEFAULT_Coord.lng) 
    : useLounges();
  useLoungesCircle(DEFAULT_Coord.lat, DEFAULT_Coord.lng, 30);

  useLoungeMarkers({ map, lounges, isLoading });
   

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