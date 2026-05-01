"""drowsiness_assessments 테이블 — 졸음 평가 (5분마다 1건)."""

from datetime import datetime

from sqlalchemy import DateTime, Enum, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import DrowsinessLevel, UserResponse


class DrowsinessAssessment(Base):
    __tablename__ = "drowsiness_assessments"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    trip_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("trips.id", ondelete="CASCADE")
    )

    assessed_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    lstm_score: Mapped[float | None] = mapped_column(Float)       # LSTM 출력 0~100
    rule_score: Mapped[float | None] = mapped_column(Float)       # 룰베이스 출력
    final_level: Mapped[DrowsinessLevel] = mapped_column(
        Enum(DrowsinessLevel, name="drowsinesslevel"), nullable=False
    )

    user_response: Mapped[UserResponse | None] = mapped_column(
        Enum(UserResponse, name="userresponse")
    )
    nearest_lounge_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("lounges.id")
    )

    # Relationships
    trip: Mapped["Trip"] = relationship(back_populates="drowsiness_assessments")  # noqa: F821
