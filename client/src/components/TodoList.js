import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../services/api';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await createTodo({
        title: newTodo,
        description: '',
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo('');
      setError(null);
    } catch (err) {
      setError('Failed to create todo');
      console.error('Error creating todo:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const response = await updateTodo(id, { completed: !completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='todo-container'>
      {error && <div className='error-message'>{error}</div>}

      <form onSubmit={handleSubmit} className='todo-form'>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new todo...'
          className='todo-input'
        />
        <button type='submit' className='add-button'>
          Add
        </button>
      </form>

      <div className='todo-list'>
        {todos.length === 0 ? (
          <div className='no-todos'>No todos yet. Add one above!</div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
