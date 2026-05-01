"""Async engine + session factory.

환경별 .env 파일 로딩:
  APP_ENV=local   → .env.local  (기본값)
  APP_ENV=test    → .env.test
  APP_ENV=production → .env.production
"""

import os
from pathlib import Path
from collections.abc import AsyncGenerator

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

# .env 파일 로딩
_env_name = os.getenv("APP_ENV", "local")
_env_file = Path(__file__).resolve().parent.parent.parent / f".env.{_env_name}"
load_dotenv(_env_file)

DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_async_engine(DATABASE_URL, echo=False)
async_session_factory = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


def get_async_engine():
    return engine


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """FastAPI Depends용 async session generator."""
    async with async_session_factory() as session:
        yield session
