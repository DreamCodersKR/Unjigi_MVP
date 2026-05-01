"""users 테이블 — 사용자 (가명 처리)."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import TruckType, UserRole


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    # SHA-256(supabase_user_id + salt) — 가명 hash
    role: Mapped[UserRole] = mapped_column(Enum(UserRole, name="userrole"), nullable=False)
    nickname: Mapped[str | None] = mapped_column(String(50))
    profile_image_url: Mapped[str | None] = mapped_column(String(500))

    company_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("companies.id", ondelete="SET NULL")
    )

    # DRIVER 전용
    truck_type: Mapped[TruckType | None] = mapped_column(Enum(TruckType, name="trucktype"))
    voice_tone: Mapped[str] = mapped_column(String(20), default="default")
    # default | friendly | formal

    # 동의 사항
    consent_location: Mapped[bool] = mapped_column(Boolean, default=False)
    consent_microphone: Mapped[bool] = mapped_column(Boolean, default=False)
    consent_dtg: Mapped[bool] = mapped_column(Boolean, default=False)
    consent_marketing: Mapped[bool] = mapped_column(Boolean, default=False)

    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime)

    # Relationships
    oauth_accounts: Mapped[list["OAuthAccount"]] = relationship(back_populates="user")  # noqa: F821
    company: Mapped["Company | None"] = relationship(back_populates="members")  # noqa: F821
    trips: Mapped[list["Trip"]] = relationship(back_populates="user")  # noqa: F821
    family_contacts: Mapped[list["FamilyContact"]] = relationship(back_populates="user")  # noqa: F821
