"""운지기 MVP — 시드 데이터 로더.

사용법:
  cd backend
  python -m app.seed lounges                    # 기본 CSV 경로
  python -m app.seed lounges /path/to/file.csv  # 커스텀 CSV 경로
"""

import asyncio
import csv
import sys
import uuid
from pathlib import Path

from app.db.session import async_session_factory
from app.models import Lounge, LoungeType

# 프로젝트 기본 CSV 경로 (backend/ 기준 → unjigi/ 루트)
_BACKEND_DIR = Path(__file__).resolve().parent.parent
_DEFAULT_CSV = (
    _BACKEND_DIR.parent.parent.parent
    / "05_data"
    / "공공데이터"
    / "전국졸음쉼터표준데이터.csv"
)


async def seed_lounges(csv_path: Path | None = None) -> None:
    """전국졸음쉼터표준데이터 CSV를 읽어 lounges 테이블에 삽입."""
    path = csv_path or _DEFAULT_CSV
    if not path.exists():
        print(f"CSV 파일을 찾을 수 없습니다: {path}")
        sys.exit(1)

    # cp949 인코딩 (공공데이터 표준)
    with open(path, encoding="cp949", errors="replace") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    print(f"CSV 로드 완료: {len(rows)}건")

    async with async_session_factory() as session:
        # 기존 데이터 확인
        from sqlalchemy import func, select

        count = await session.scalar(select(func.count()).select_from(Lounge))
        if count and count > 0:
            print(f"lounges 테이블에 이미 {count}건 존재. 시드 스킵.")
            print("초기화하려면: DELETE FROM lounges; 후 재실행")
            return

        inserted = 0
        skipped = 0
        for row in rows:
            lat_str = row.get("위도", "").strip()
            lng_str = row.get("경도", "").strip()

            # 좌표 없는 행 스킵
            if not lat_str or not lng_str:
                skipped += 1
                continue

            try:
                lat = float(lat_str)
                lng = float(lng_str)
            except ValueError:
                skipped += 1
                continue

            # 주차면수 파싱
            seats_str = row.get("주차면수", "").strip()
            try:
                total_seats = int(seats_str) if seats_str else 10
            except ValueError:
                total_seats = 10

            lounge = Lounge(
                id=str(uuid.uuid4()),
                name=row.get("졸음쉼터명", "").strip(),
                type=LoungeType.REST_AREA,
                lat=lat,
                lng=lng,
                sido=row.get("시도명", "").strip() or None,
                sigungu=row.get("시군구명", "").strip() or None,
                road_name=row.get("도로노선명", "").strip() or None,
                total_seats=total_seats,
                facility_shower=False,
                facility_sleep_room=False,
                facility_laundry=False,
                facility_restaurant=row.get("화장실유무", "").strip() == "Y",
            )
            session.add(lounge)
            inserted += 1

        await session.commit()
        print(f"시드 완료: {inserted}건 삽입, {skipped}건 스킵 (좌표 누락)")


def main() -> None:
    if len(sys.argv) < 2:
        print("사용법: python -m app.seed <command> [args]")
        print("  lounges [csv_path]  — 졸음쉼터 시드")
        sys.exit(1)

    command = sys.argv[1]

    if command == "lounges":
        csv_path = Path(sys.argv[2]) if len(sys.argv) > 2 else None
        asyncio.run(seed_lounges(csv_path))
    else:
        print(f"알 수 없는 명령: {command}")
        print("가능한 명령: lounges")
        sys.exit(1)


if __name__ == "__main__":
    main()
