"""운지기 MVP — 공용 Enum 정의."""

import enum


# === users ===

class UserRole(str, enum.Enum):
    DRIVER = "DRIVER"
    COMPANY_ADMIN = "COMPANY_ADMIN"
    SUPER_ADMIN = "SUPER_ADMIN"


class TruckType(str, enum.Enum):
    TRUCK_5T = "TRUCK_5T"
    TRUCK_11T = "TRUCK_11T"
    TRUCK_25T = "TRUCK_25T"
    TRAILER = "TRAILER"


# === companies ===

class SubscriptionStatus(str, enum.Enum):
    TRIAL = "trial"
    ACTIVE = "active"
    PAUSED = "paused"
    CANCELLED = "cancelled"


# === drowsiness_assessments ===

class DrowsinessLevel(str, enum.Enum):
    L0 = "L0"  # 안전 0~39
    L1 = "L1"  # 주의 40~59
    L2 = "L2"  # 경고 60~79
    L3 = "L3"  # 위험 80~100


class UserResponse(str, enum.Enum):
    ACCEPTED = "accepted"
    DECLINED = "declined"


# === lounges ===

class LoungeType(str, enum.Enum):
    LOUNGE = "lounge"        # 화물차 라운지
    REST_AREA = "rest_area"  # 졸음쉼터


# === companion_conversations ===

class Intent(str, enum.Enum):
    DROWSY = "drowsy"
    LONELY = "lonely"
    INFO_LOUNGE = "info_lounge"
    FAMILY_MSG = "family_msg"
    EMERGENCY = "emergency"
    GENERAL = "general"


# === family_contacts ===

class Relationship(str, enum.Enum):
    SPOUSE = "spouse"
    SON = "son"
    DAUGHTER = "daughter"
    MOTHER = "mother"
    FATHER = "father"
    OTHER = "other"


# === family_notifications ===

class MessageType(str, enum.Enum):
    DEPARTURE = "departure"
    REST = "rest"
    ARRIVAL = "arrival"
    EMERGENCY = "emergency"


class DeliveryStatus(str, enum.Enum):
    PENDING = "pending"
    SENT = "sent"
    DELIVERED = "delivered"
    FAILED = "failed"
    MOCK = "mock"  # MVP: 실제 발송 X, UI 토스트만
