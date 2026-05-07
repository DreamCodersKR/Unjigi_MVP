from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_async_session
from app.models.lounges import Lounge

router = APIRouter(prefix="/api/lounges", tags=["lounges"])

@router.get("")
async def get_lounges(
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(select(Lounge))

    lounges = result.scalars().all()

    return lounges