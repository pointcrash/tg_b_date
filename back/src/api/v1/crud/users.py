from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional
from core.models import User
from core.schemas.users import UserCreate


class UsersCRUD:
    @staticmethod
    async def create_user(
        session: AsyncSession,
        user: UserCreate,
    ) -> User:
        new_user = User(**user.model_dump())
        session.add(new_user)
        try:
            await session.commit()
            return new_user
        except IntegrityError:
            await session.rollback()
            raise

    @staticmethod
    async def get_user(
        session: AsyncSession,
        user_id: int,
    ) -> Optional[User]:
        stmt = select(User).where(User.id == user_id)
        result = await session.execute(stmt)
        return result.scalar_one_or_none()

    @staticmethod
    async def delete_user(
        session: AsyncSession,
        user_id: int,
    ) -> None:
        stmt = select(User).where(User.id == user_id)
        result = await session.execute(stmt)
        user = result.scalar_one_or_none()
        await session.delete(user)
        await session.commit()
