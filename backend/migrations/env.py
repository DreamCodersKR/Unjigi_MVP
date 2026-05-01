"""Alembic async env.py — 운지기 MVP.

환경별 .env 파일에서 DATABASE_URL 로딩:
  APP_ENV=local (기본) → .env.local
  APP_ENV=test        → .env.test
  APP_ENV=production  → .env.production
"""

import asyncio
import os
from logging.config import fileConfig
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

# .env 로딩
_env_name = os.getenv("APP_ENV", "local")
_env_file = Path(__file__).resolve().parent.parent / f".env.{_env_name}"
load_dotenv(_env_file)

# Alembic Config
config = context.config

# Alembic은 DIRECT_URL 우선 사용 (Supabase Session pooler 5432 포트)
# DIRECT_URL이 없으면 DATABASE_URL로 fallback
_db_url = os.environ.get("DIRECT_URL") or os.environ["DATABASE_URL"]
config.set_main_option("sqlalchemy.url", _db_url)

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# 모든 모델 import → Base.metadata에 등록
import app.models  # noqa: F401
from app.db.base import Base

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
