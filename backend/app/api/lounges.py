from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_async_session
from app.models.lounges import Lounge
from app.schemas import LoungeRead

router = APIRouter(prefix="/api/lounges", tags=["lounges"])

@router.get("", response_model=list[LoungeRead])
async def get_lounges(
    db: AsyncSession = Depends(get_async_session),
):
    result = await db.execute(select(Lounge))

    lounges = result.scalars().all()

    return lounges