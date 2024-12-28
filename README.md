# Todo-app

Client runs on http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## Authentication Flow

1. User registers/logs in through the frontend
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token is included in subsequent API requests
5. Protected routes check for valid token

## Todo Features

- Create new todos
- Mark todos as complete/incomplete
- Delete todos
- View all todos
- Update existing todos

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected routes
- Input validation
- Error handling

## Error Handling

The application includes comprehensive error handling for:
- Invalid credentials
- Network errors
- Server errors
- Validation errors
- Authentication errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/todo-app

## Acknowledgments

- React Documentation
- MongoDB Documentation
- Express.js Documentation
- Node.js Documentation