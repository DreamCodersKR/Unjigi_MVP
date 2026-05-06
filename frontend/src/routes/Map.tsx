import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);  //네이버 지도 SDK 로드 완료 여부

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

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(35.18, 129.07),
      zoom: 12,
    });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(35.18, 129.07),
      map,
    });
  }, [loaded]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-screen" 
    />
  );
}