import type { Lounge } from "@/types/geo";

export function createInfoWindowContent(lounge: Lounge) {
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