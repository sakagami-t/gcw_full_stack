import { Todo, TodoCreate, TodoUpdate } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_URL}/todos/`);
    if (!response.ok) {
      throw new Error(`Error fetching todos: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    return [];
  }
}

export async function fetchTodo(id: number): Promise<Todo | null> {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching todo: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch todo ${id}:`, error);
    return null;
  }
}

export async function createTodo(todo: TodoCreate): Promise<Todo | null> {
  try {
    const response = await fetch(`${API_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error(`Error creating todo: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to create todo:', error);
    return null;
  }
}

export async function updateTodo(id: number, todo: TodoUpdate): Promise<Todo | null> {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error(`Error updating todo: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to update todo ${id}:`, error);
    return null;
  }
}

export async function deleteTodo(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error(`Failed to delete todo ${id}:`, error);
    return false;
  }
}