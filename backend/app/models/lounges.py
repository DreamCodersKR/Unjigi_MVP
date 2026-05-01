"""lounges 테이블 — 정적 시설 데이터 (298개 시드)."""

from sqlalchemy import Boolean, Enum, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.enums import LoungeType


class Lounge(Base):
    __tablename__ = "lounges"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    type: Mapped[LoungeType] = mapped_column(
        Enum(LoungeType, name="loungetype"), nullable=False
    )

    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)

    facility_shower: Mapped[bool] = mapped_column(Boolean, default=False)
    facility_sleep_room: Mapped[bool] = mapped_column(Boolean, default=False)
    facility_laundry: Mapped[bool] = mapped_column(Boolean, default=False)
    facility_restaurant: Mapped[bool] = mapped_column(Boolean, default=False)

    total_seats: Mapped[int] = mapped_column(Integer, default=10)

    sido: Mapped[str | None] = mapped_column(String(50))
    sigungu: Mapped[str | None] = mapped_column(String(50))
    road_name: Mapped[str | None] = mapped_column(String(100))
    operating_hours: Mapped[str | None] = mapped_column(String(50))
