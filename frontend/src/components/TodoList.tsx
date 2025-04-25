import { useState, useEffect } from 'react';
import { Todo } from '../types';
import { fetchTodos } from '../api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  const handleTodoDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-list-container">
      <h1>Todo App</h1>
      
      <TodoForm onTodoCreated={loadTodos} />
      
      <div className="todo-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      
      {loading ? (
        <p>Loading todos...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredTodos.length === 0 ? (
        <p>No todos found. Add a new one above!</p>
      ) : (
        <div className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onUpdate={handleTodoUpdate} 
              onDelete={handleTodoDelete} 
            />
          ))}
        </div>
      )}
      
      {todos.length > 0 && (
        <div className="todo-stats">
          <p>{todos.filter(todo => !todo.completed).length} items left</p>
        </div>
      )}
    </div>
  );
}

export default TodoList;