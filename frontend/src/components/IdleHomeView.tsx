import { RunStartButton } from "@/components/RunStartButton";

export function IdleHomeView() {
  
  return (
    <div>
        {/* 인사 + 운행 시작 CTA + 빠른 정보 3개 + 음성 동반자 토글 + 하단 탭바 */}
        <div>안녕하세요, 김기사님</div>
        <div>오늘도 안전운행하세요</div>
        {/* <div className="bg-orange-50 p-3 rounded-lg mb-4 text-center font-bold text-orange-700">
          🚛 운행 시작
        </div> */}
      <RunStartButton/>
    </div>
  );
}
