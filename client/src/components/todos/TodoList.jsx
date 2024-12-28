import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import TodoFilters from './TodoFilters';
import { getTodos } from '../../services/api';
import toast from 'react-hot-toast';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
            setFilteredTodos(data);
        } catch (error) {
            toast.error('Failed to fetch todos');
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (newFilter === 'all') {
            setFilteredTodos(todos);
        } else {
            setFilteredTodos(todos.filter(todo => todo.status === newFilter));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AddTodo onAdd={fetchTodos} />
            <TodoFilters currentFilter={filter} onFilterChange={handleFilterChange} />
            <div className="space-y-4 mt-6">
                {filteredTodos.map(todo => (
                    <TodoItem 
                        key={todo._id} 
                        todo={todo} 
                        onUpdate={fetchTodos}
                        onDelete={fetchTodos}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList; 