import React from 'react';
import '../styles/TodoItem.css';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
        className="todo-checkbox"
      />
      <div className="todo-content">
        <span className="todo-title">{todo.title}</span>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(todo._id)}
        className="delete-button"
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem; 