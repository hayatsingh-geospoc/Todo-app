import React from 'react';

const TodoFilters = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="flex space-x-4 mb-6">
            <button
                onClick={() => onFilterChange('all')}
                className={`px-4 py-2 rounded-lg ${
                    currentFilter === 'all'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange('pending')}
                className={`px-4 py-2 rounded-lg ${
                    currentFilter === 'pending'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                Pending
            </button>
            <button
                onClick={() => onFilterChange('completed')}
                className={`px-4 py-2 rounded-lg ${
                    currentFilter === 'completed'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                Completed
            </button>
        </div>
    );
};

export default TodoFilters; 