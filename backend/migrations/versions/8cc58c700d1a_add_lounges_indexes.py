"""add lounges indexes

Revision ID: 8cc58c700d1a
Revises: 12e2f6296660
Create Date: 2026-05-16 22:59:50.905982

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8cc58c700d1a'
down_revision: Union[str, None] = '12e2f6296660'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index('ix_lounges_type', 'lounges', ['type'])
    op.create_index('ix_lounges_sido_sigungu', 'lounges', ['sido', 'sigungu'])
    # 원형범위 검색 대비:
    op.execute("CREATE INDEX ix_lounges_location ON lounges USING GIST (ll_to_earth(lat, lng))")


def downgrade() -> None:
    op.drop_index('ix_lounges_type')
    op.drop_index('ix_lounges_sido_sigungu')
    op.drop_index('ix_lounges_location')
