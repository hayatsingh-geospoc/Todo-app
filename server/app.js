const express = require('express');
const cors = require('cors');
const app = express();
const todoRoutes = require('./routes/todos');

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3001', // React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Rest of your middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... rest of your app code 

app.use('/api/todos', todoRoutes); 