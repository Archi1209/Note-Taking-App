# Note-Taking Application

## Project Overview
A full-stack note-taking application with tags, categories, search functionality, and modern UI. Built with Python Flask backend, React frontend, and SQLite database.

## Tech Stack
- **Backend**: Python 3.x + Flask
- **Frontend**: React 18 + Vite
- **Database**: SQLite3
- **API**: RESTful JSON API
- **Styling**: CSS3 with custom design

## Features
- Create, Read, Update, Delete notes
- Tag system for organization
- Category management with color coding
- Full-text search across notes and titles
- Real-time updates
- Responsive design (mobile-friendly)

---

# Key Technical Decisions

## 1. Architecture Pattern
**Client-Server Architecture with REST API**
- Clear separation between frontend and backend
- Backend serves as a pure API (no templates)
- Frontend consumes JSON API endpoints
- Uses Vite proxy for development to avoid CORS issues

## 2. Database Design

### Relational Schema
```
Notes (1) ←→ (N) Note_Tags (N) ←→ (1) Tags
Notes (N) ←→ (1) Categories
```

### Why SQLite?
- Zero configuration - no setup required
- Perfect for development and small-scale production
- ACID compliant
- Easy to backup and migrate

### Why SQLAlchemy?
- ORM provides abstraction over raw SQL
- Prevents SQL injection attacks
- Easy to switch databases later (PostgreSQL, MySQL)
- Clean Pythonic API

## 3. Backend Decisions

### Flask with Blueprints
- Modular route organization
- Easy to scale and maintain
- Clear separation of concerns

### API Design Principles
- RESTful conventions (proper HTTP methods)
- Consistent JSON response format
- Proper HTTP status codes
- Input validation on all endpoints

### Error Handling
- All database operations in try-catch blocks
- Proper rollback on errors
- Meaningful error messages

## 4. Frontend Decisions

### React with Vite
- Fast development server
- Hot Module Replacement (HMR)
- Smaller bundle sizes
- Modern React patterns (hooks)

### State Management
- useState for local component state
- useEffect for side effects and data fetching
- No external state library (simple enough without Redux)

### Component Structure
- Single main App component with helper components
- API service layer separated from components
- CSS in separate file for maintainability

### Styling Approach
- CSS Variables for theming and consistency
- Mobile-first responsive design
- No external CSS frameworks (custom lightweight CSS)

## 5. Security Considerations
- Input validation on backend
- SQL injection prevention via SQLAlchemy
- CORS properly configured
- No sensitive data exposure in errors

## 6. Development Workflow
- Vite proxy handles API calls in development
- SQLite database auto-created on first run
- Default categories seeded on initialization

---

## Project Structure
```
note-taking-app/
├── backend/
│   ├── app.py              # Main Flask application
│   ├── models.py           # Database models
│   ├── routes.py           # API routes
│   ├── database.py         # Database initialization
│   ├── requirements.txt    # Python dependencies
│   └── instance/           # SQLite database
├── frontend/
│   ├── src/
│   │   ├── services/       # API services
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # Styles
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── AI_GUIDANCE/
│   ├── claude.md           # AI agent instructions
│   └── prompting_rules.md  # Development guidelines
└── README.md
```

## Setup & Installation

### Backend
```
bash
cd backend
pip install -r requirements.txt
python app.py
```
Server runs on http://localhost:5000

### Frontend
```
bash
cd frontend
npm install
npm run dev
```
Client runs on http://localhost:5173

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/<id>` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/<id>` - Update note
- `DELETE /api/notes/<id>` - Delete note

### Tags
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create tag
- `DELETE /api/tags/<id>` - Delete tag

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `DELETE /api/categories/<id>` - Delete category

### Search
- `GET /api/search?q=<query>` - Search notes

## Database Schema

### Notes Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| title | TEXT | Note title |
| content | TEXT | Note content |
| category_id | INTEGER | Foreign key |
| created_at | DATETIME | Creation timestamp |
| updated_at | DATETIME | Last update timestamp |

### Tags Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Tag name |

### Note_Tags (Junction Table)
| Column | Type | Description |
|--------|------|-------------|
| note_id | INTEGER | Foreign key |
| tag_id | INTEGER | Foreign key |

### Categories Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Category name |
| color | TEXT | Category color |

## AI Usage
- Code generation and refactoring
- API design consultation
- Database schema optimization
- Frontend component structure

## Author
Created for assessment purposes
