from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class TodoBase(BaseModel):
    """Base schema for Todo items."""
    title: str
    description: Optional[str] = None
    completed: bool = False

class TodoCreate(TodoBase):
    """Schema for creating a Todo."""
    pass

class TodoUpdate(BaseModel):
    """Schema for updating a Todo."""
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

class TodoResponse(TodoBase):
    """Schema for Todo response with all fields."""
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True