from fastapi import HTTPException, APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from core.models.db_helper import db_helper
from .crud.users import UsersCRUD
from core.config import settings
from core.schemas.users import UserRead, UserCreate

router = APIRouter(prefix=settings.api.v1.users, tags=["Users"])


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: UserCreate,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    return await UsersCRUD.create_user(user=user, session=session)


@router.get("/{user_id}", response_model=UserRead)
async def get_user(
    user_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    user = await UsersCRUD.get_user(user_id=user_id, session=session)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}")
async def get_user(
    user_id: int,
    session: AsyncSession = Depends(db_helper.session_getter),
):
    await UsersCRUD.delete_user(user_id=user_id, session=session)
