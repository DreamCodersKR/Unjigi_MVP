from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text

from app.db.session import get_async_session
from app.models.lounges import Lounge
from app.schemas import LoungeRead

import time

router = APIRouter(prefix="/api/lounges", tags=["lounges"])

@router.get("", response_model=list[LoungeRead])
async def get_lounges(
    db: AsyncSession = Depends(get_async_session),
):
    t0 = time.perf_counter()
    result = await db.execute(select(Lounge))
    t1 = time.perf_counter()
    lounges = result.scalars().all()
    t2 = time.perf_counter()

    print({
        "db_execute_ms": round((t1 - t0) * 1000, 2),
        "scalars_all_ms": round((t2 - t1) * 1000, 2),
        "total_ms": round((t2 - t0) * 1000, 2),
    })

    return lounges

@router.get("/nearest")
async def get_nearest_lounge(
    lat: float = Query(...),
    lng: float = Query(...),
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(
        text("""
            SELECT
                id,
                name,
                type,
                lat,
                lng,
                facility_shower,
                facility_sleep_room,
                facility_laundry,
                facility_restaurant,
                total_seats,
                sido,
                sigungu,
                earth_distance(
                    ll_to_earth(:lat, :lng),
                    ll_to_earth(lat, lng)
                ) AS distance_m
            FROM lounges
            ORDER BY distance_m ASC
            LIMIT 1
        """),
        {"lat": lat, "lng": lng},
    )

    row = result.mappings().first()

    if row is None:
        return None

    return row