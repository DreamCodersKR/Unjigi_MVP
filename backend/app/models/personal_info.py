"""personal_info 테이블 — 개인정보 (AES-256 암호화, 가명정보 결합 가점)."""

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class PersonalInfo(Base):
    __tablename__ = "personal_info"

    user_id: Mapped[str] = mapped_column(
        String(64), ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    real_name_encrypted: Mapped[str | None] = mapped_column(String(500))
    phone_encrypted: Mapped[str | None] = mapped_column(String(500))
    email_encrypted: Mapped[str | None] = mapped_column(String(500))
    encryption_key_id: Mapped[str | None] = mapped_column(String(36))
    # KMS 키 ID — Supabase Vault 또는 자체 KMS

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
