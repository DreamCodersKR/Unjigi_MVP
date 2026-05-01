"""운지기 MVP — 11개 SQLAlchemy 모델 export.

Alembic autogenerate가 모든 모델을 감지하려면
이 __init__.py에서 전부 import 해야 함.
"""

from app.models.enums import (
    DeliveryStatus,
    DrowsinessLevel,
    Intent,
    LoungeType,
    MessageType,
    Relationship,
    SubscriptionStatus,
    TruckType,
    UserResponse,
    UserRole,
)
from app.models.users import User
from app.models.oauth_accounts import OAuthAccount
from app.models.personal_info import PersonalInfo
from app.models.companies import Company
from app.models.trips import Trip
from app.models.drowsiness_assessments import DrowsinessAssessment
from app.models.lounges import Lounge
from app.models.companion_conversations import CompanionConversation
from app.models.family_contacts import FamilyContact
from app.models.family_notifications import FamilyNotification
from app.models.audit_logs import AuditLog

__all__ = [
    # Enums
    "UserRole",
    "TruckType",
    "SubscriptionStatus",
    "DrowsinessLevel",
    "UserResponse",
    "LoungeType",
    "Intent",
    "Relationship",
    "MessageType",
    "DeliveryStatus",
    # Models
    "User",
    "OAuthAccount",
    "PersonalInfo",
    "Company",
    "Trip",
    "DrowsinessAssessment",
    "Lounge",
    "CompanionConversation",
    "FamilyContact",
    "FamilyNotification",
    "AuditLog",
]
