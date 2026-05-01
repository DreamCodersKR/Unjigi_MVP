"""family_notifications 테이블 — F4 알림 로그 (MVP는 mock SMS)."""

from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.enums import DeliveryStatus, MessageType


class FamilyNotification(Base):
    __tablename__ = "family_notifications"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"))
    family_contact_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("family_contacts.id")
    )

    message_type: Mapped[MessageType] = mapped_column(
        Enum(MessageType, name="messagetype")
    )
    message: Mapped[str] = mapped_column(String(500), nullable=False)

    delivery_method: Mapped[str] = mapped_column(String(20), default="mock")
    # 'mock' (MVP) | 'sms' (멘토링 후) | 'kakao' (사업화)
    delivery_status: Mapped[DeliveryStatus] = mapped_column(
        Enum(DeliveryStatus, name="deliverystatus"), default=DeliveryStatus.MOCK
    )

    sent_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
