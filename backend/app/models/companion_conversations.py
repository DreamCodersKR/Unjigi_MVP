"""companion_conversations 테이블 — F3 음성 AI 대화 + 비용 추적."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.models.enums import Intent


class CompanionConversation(Base):
    __tablename__ = "companion_conversations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), ForeignKey("users.id"))
    trip_id: Mapped[str | None] = mapped_column(String(36), ForeignKey("trips.id"))

    utterance: Mapped[str] = mapped_column(String(2000), nullable=False)
    intent: Mapped[Intent | None] = mapped_column(Enum(Intent, name="intent"))
    response: Mapped[str] = mapped_column(String(2000), nullable=False)

    is_cached: Mapped[bool] = mapped_column(Boolean, default=False)
    # mock_demo.json 사전 응답 여부

    claude_model: Mapped[str | None] = mapped_column(String(50))
    # 'claude-haiku-4-5'
    claude_tokens_in: Mapped[int | None] = mapped_column(Integer)
    claude_tokens_out: Mapped[int | None] = mapped_column(Integer)

    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
