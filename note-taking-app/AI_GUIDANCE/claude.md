# AI Agent Guidance - Note Taking Application

## Project Context
This is a full-stack Note-Taking Application built with:
- **Backend**: Python + Flask (REST API)
- **Frontend**: React 18 + Vite
- **Database**: SQLite3 (Relational DB)

## Architecture Overview

### Backend Structure
```
backend/
├── app.py           # Flask app initialization & entry point
├── database.py      # SQLAlchemy models & database setup
├── models.py        # Data models (Note, Tag, Category)
├── routes.py        # RESTful API endpoints
└── requirements.txt # Python dependencies
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/  # React components
│   ├── services/    # API service layer
│   ├── App.jsx      # Main application component
│   ├── App.css      # Styling
│   └── main.jsx     # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## AI Agent Instructions

### Code Generation Rules
1. **Backend (Python/Flask)**:
   - Use SQLAlchemy ORM for database operations
   - Follow RESTful API conventions
   - Always return JSON responses
   - Implement proper error handling
   - Use Blueprints for route organization

2. **Frontend (React)**:
   - Use functional components with hooks
   - Keep API calls in separate service files
   - Use CSS variables for theming
   - Implement proper state management
   - Follow component composition patterns

### Database Schema
- **Note**: id, title, content, category_id, created_at, updated_at
- **Tag**: id, name (many-to-many with Notes)
- **Category**: id, name, color (one-to-many with Notes)

### API Endpoints
All endpoints are prefixed with `/api`:
- `GET/POST /api/notes`
- `GET/PUT/DELETE /api/notes/<id>`
- `GET/POST /api/tags`
- `DELETE /api/tags/<id>`
- `GET/POST /api/categories`
- `DELETE /api/categories/<id>`
- `GET /api/search?q=<query>`

### Development Guidelines
1. Start backend server on port 5000
2. Start frontend dev server on port 5173
3. Frontend proxies `/api` requests to backend
4. Use `sqlite:///notes.db` for development database

### Important Notes
- Always validate user input on both frontend and backend
- Use proper CORS configuration
- Implement proper error messages
- Follow security best practices
- Keep code modular and maintainable
