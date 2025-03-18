from datetime import date
from pydantic import BaseModel


class UserBase(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    birth_date: date


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


class UserPartialUpdate(UserBase):
    id: int | None = None
    username: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    birth_date: date | None = None


class UserRead(UserBase):
    pass
