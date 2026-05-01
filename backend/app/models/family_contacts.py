"""family_contacts 테이블 — F4 가족 연락처."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import Relationship


class FamilyContact(Base):
    __tablename__ = "family_contacts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("users.id", ondelete="CASCADE")
    )
    relationship_type: Mapped[Relationship | None] = mapped_column(
        Enum(Relationship, name="relationship")
    )
    phone_encrypted: Mapped[str] = mapped_column(String(500), nullable=False)
    nickname: Mapped[str | None] = mapped_column(String(50))
    auto_notification: Mapped[bool] = mapped_column(Boolean, default=True)
    # 운행 시 자동 알림 on/off

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="family_contacts")  # noqa: F821
