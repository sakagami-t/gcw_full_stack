from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

def get_todos(db: Session, skip: int = 0, limit: int = 100) -> List[models.Todo]:
    """Get all todos with pagination."""
    return db.query(models.Todo).offset(skip).limit(limit).all()

def get_todo(db: Session, todo_id: int) -> Optional[models.Todo]:
    """Get a specific todo by ID."""
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()

def create_todo(db: Session, todo: schemas.TodoCreate) -> models.Todo:
    """Create a new todo."""
    db_todo = models.Todo(**todo.dict())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def update_todo(db: Session, todo_id: int, todo: schemas.TodoUpdate) -> Optional[models.Todo]:
    """Update a todo."""
    db_todo = get_todo(db, todo_id)
    if db_todo:
        # Only update fields that are provided
        update_data = todo.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_todo, key, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int) -> bool:
    """Delete a todo."""
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
        return True
    return False