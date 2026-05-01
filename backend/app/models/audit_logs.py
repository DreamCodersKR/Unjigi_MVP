"""audit_logs 테이블 — 관리자 작업 로그."""

from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str | None] = mapped_column(String(64), ForeignKey("users.id"))

    action: Mapped[str] = mapped_column(String(100), nullable=False)
    # 'login' | 'data_export' | 'company_admin_assigned' | 'consent_updated' 등
    entity_type: Mapped[str | None] = mapped_column(String(50))
    entity_id: Mapped[str | None] = mapped_column(String(64))
    audit_data: Mapped[dict | None] = mapped_column("metadata", JSONB)

    ip_address: Mapped[str | None] = mapped_column(String(45))
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
