import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../../services/api';
import toast from 'react-hot-toast';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);

    const handleStatusChange = async () => {
        try {
            await updateTodo(todo._id, {
                ...todo,
                status: todo.status === 'pending' ? 'completed' : 'pending'
            });
            onUpdate();
        } catch (error) {
            toast.error('Failed to update todo');
        }
    };

    const handleEdit = async () => {
        if (isEditing) {
            try {
                await updateTodo(todo._id, { ...todo, title: editedTitle });
                onUpdate();
                setIsEditing(false);
            } catch (error) {
                toast.error('Failed to update todo');
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo._id);
            onDelete();
            toast.success('Todo deleted successfully');
        } catch (error) {
            toast.error('Failed to delete todo');
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    checked={todo.status === 'completed'}
                    onChange={handleStatusChange}
                    className="h-4 w-4"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="border rounded px-2 py-1"
                        autoFocus
                    />
                ) : (
                    <span className={todo.status === 'completed' ? 'line-through text-gray-500' : ''}>
                        {todo.title}
                    </span>
                )}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleEdit}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem; 