import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi, register as registerApi } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token and set user
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const data = await loginApi(credentials);
        localStorage.setItem('token', data.token);
        setUser({ token: data.token });
    };

    const register = async (userData) => {
        const data = await registerApi(userData);
        localStorage.setItem('token', data.token);
        setUser({ token: data.token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}; 