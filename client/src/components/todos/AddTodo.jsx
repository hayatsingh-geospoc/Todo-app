import React, { useState } from 'react';
import { createTodo } from '../../services/api';
import toast from 'react-hot-toast';

const AddTodo = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Please enter a todo title');
            return;
        }

        try {
            await createTodo({ title, priority });
            setTitle('');
            setPriority('medium');
            onAdd();
            toast.success('Todo added successfully');
        } catch (error) {
            toast.error('Failed to add todo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new todo..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default AddTodo; 