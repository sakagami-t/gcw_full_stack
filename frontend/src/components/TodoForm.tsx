import { useState } from 'react';
import { TodoCreate } from '../types';
import { createTodo } from '../api';

interface TodoFormProps {
  onTodoCreated: () => void;
}

function TodoForm({ onTodoCreated }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    
    const newTodo: TodoCreate = {
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
    };
    
    const created = await createTodo(newTodo);
    
    if (created) {
      setTitle('');
      setDescription('');
      onTodoCreated();
    }
    
    setIsSubmitting(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>Add New Todo</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="todo-input"
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="todo-textarea"
          disabled={isSubmitting}
        />
      </div>
      <button 
        type="submit" 
        disabled={!title.trim() || isSubmitting}
        className="add-todo-btn"
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;