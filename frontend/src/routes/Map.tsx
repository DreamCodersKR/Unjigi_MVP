import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLounges, useLoungeNearest, useLoungesCircle } from "@/hooks/useLounges";
import type { Coord } from "@/types/geo";
import  { DEFAULT_Coord } from "@/utils/geo";
import { useLoungeMarkers } from "@/hooks/useLoungeMarkers";
import { useNaverMap } from "@/hooks/useNaverMap";
import "./Map.css";

declare global {
  interface Window {
    naver: typeof naver;
  }
}

export default function MapPage() {
  const [currentLoc] = useState<Coord>(DEFAULT_Coord);
  const { mapRef, map } = useNaverMap({ currentLoc });

  const [searchParams] = useSearchParams();
  const { data: lounges = [], isLoading, error } = 
    searchParams.get('focus') === 'nearest' 
    ? useLoungeNearest(DEFAULT_Coord.lat, DEFAULT_Coord.lng) 
    : useLounges();
  useLoungesCircle(DEFAULT_Coord.lat, DEFAULT_Coord.lng, 30);

  useLoungeMarkers({ map, lounges, isLoading });
   

  return (
  <div className="map-screen">
    {isLoading && <div className="map-screen__status">라운지 로딩중...</div>}
    {error && <div className="map-screen__status">라운지 에러 발생: {error.message}</div>}

    <Link
      to="/risk"
      className="map-screen__control map-screen__control--home"
    >
      돌아가기
    </Link>
    
    {/* <button
      onClick={() => refetch()}
      className="map-screen__control map-screen__control--refresh"
    >
      라운지 불러오기
    </button> */}

    <div
      ref={mapRef}
      className="map-screen__canvas"
    />
  </div>
  );
}
