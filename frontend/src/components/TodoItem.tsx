import { useState } from 'react';
import { Todo, TodoUpdate } from '../types';
import { updateTodo, deleteTodo } from '../api';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  
  const handleToggleComplete = async () => {
    const update: TodoUpdate = { completed: !todo.completed };
    const updated = await updateTodo(todo.id, update);
    if (updated) {
      onUpdate(updated);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setIsEditing(false);
  };
  
  const handleSave = async () => {
    const update: TodoUpdate = {
      title,
      description: description || undefined,
    };
    
    const updated = await updateTodo(todo.id, update);
    if (updated) {
      onUpdate(updated);
      setIsEditing(false);
    }
  };
  
  const handleDelete = async () => {
    const success = await deleteTodo(todo.id);
    if (success) {
      onDelete(todo.id);
    }
  };
  
  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
          className="todo-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="todo-textarea"
        />
        <div className="todo-actions">
          <button onClick={handleSave} disabled={!title.trim()}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="todo-title">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
          />
          <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
        </label>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
      </div>
      <div className="todo-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;