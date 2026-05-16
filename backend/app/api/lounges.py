from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

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