"""trips 테이블 — 운행 1건."""

from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("users.id"), nullable=False
    )

    started_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    ended_at: Mapped[datetime | None] = mapped_column(DateTime)

    start_lat: Mapped[float | None] = mapped_column(Float)
    start_lng: Mapped[float | None] = mapped_column(Float)
    end_lat: Mapped[float | None] = mapped_column(Float)
    end_lng: Mapped[float | None] = mapped_column(Float)

    total_duration_min: Mapped[int | None] = mapped_column(Integer)
    total_distance_km: Mapped[float | None] = mapped_column(Float)

    safety_score: Mapped[int | None] = mapped_column(Integer)  # 0~100
    rest_count: Mapped[int] = mapped_column(Integer, default=0)
    risk_alert_l1_count: Mapped[int] = mapped_column(Integer, default=0)
    risk_alert_l2_count: Mapped[int] = mapped_column(Integer, default=0)
    risk_alert_l3_count: Mapped[int] = mapped_column(Integer, default=0)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="trips")  # noqa: F821
    drowsiness_assessments: Mapped[list["DrowsinessAssessment"]] = relationship(  # noqa: F821
        back_populates="trip"
    )
