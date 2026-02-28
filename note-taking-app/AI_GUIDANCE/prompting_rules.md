# AI Development Guidelines & Prompting Rules

## General Principles

### 1. Code Quality Standards
- Write clean, readable, and maintainable code
- Follow language-specific best practices and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### 2. Error Handling
- Always handle errors gracefully
- Provide meaningful error messages
- Log errors for debugging
- Never expose sensitive information in error responses

### 3. Security Best Practices
- Validate all user inputs
- Use parameterized queries for database operations
- Implement proper authentication/authorization
- Keep dependencies updated
- Never commit secrets to version control

## Python/Flask Backend Rules

### API Design
```
✓ RESTful endpoints with proper HTTP methods
✓ Consistent JSON response format
✓ Proper HTTP status codes (200, 201, 400, 404, 500)
✓ Request validation
✗ Don't expose raw database errors
```

### Database Operations
```
✓ Use SQLAlchemy ORM
✓ Use migrations for schema changes
✓ Proper relationship handling
✓ Index frequently queried columns
✗ Don't write raw SQL unless necessary
✗ Don't expose database connection details
```

### Project Structure
```
backend/
├── app.py           # App factory & config
├── models.py        # Data models
├── routes.py        # API endpoints
├── database.py      # DB initialization
└── requirements.txt # Dependencies
```

## React Frontend Rules

### Component Structure
```
✓ Functional components with hooks
✓ Separate concerns (UI, logic, data)
✓ Reusable components
✓ Proper prop types
✗ Don't put all code in one component
```

### State Management
```
✓ Use useState for local state
✓ Use useEffect for side effects
✓ Keep API calls in service layer
✓ Proper cleanup in useEffect
```

### Styling
```
✓ Use CSS variables for theming
✓ Keep styles in separate CSS files
✓ Follow BEM or similar naming convention
✓ Mobile-responsive design
```

## Communication & Documentation

### Code Comments
- Explain WHY, not WHAT
- Document complex algorithms
- Add JSDoc/Python docstrings
- Keep comments up-to-date

### README Requirements
- Clear setup instructions
- API documentation
- Project structure
- Known limitations
- Future improvements

## Version Control

### Commit Messages
```
✓ Use imperative mood
✓ Be specific and descriptive
✓ Reference issue numbers if applicable
✗ Avoid vague messages like "fixed bugs"
```

### Branch Naming
```
✓ feature/add-search-functionality
✓ bugfix/fix-note-delete-error
✗ Avoid: fix, update, changes
```

## Testing Guidelines

### Unit Tests
- Test individual functions/components
- Mock external dependencies
- Cover edge cases
- Aim for meaningful test coverage

### Integration Tests
- Test API endpoints
- Test database operations
- Test user flows

## Performance Considerations

### Backend
- Use database indexing
- Implement pagination for large datasets
- Cache frequently accessed data
- Use async operations where appropriate

### Frontend
- Optimize re-renders with React.memo
- Lazy load components
- Minimize bundle size
- Optimize images and assets

## Code Review Checklist

- [ ] Code follows project conventions
- [ ] No security vulnerabilities
- [ ] Proper error handling
- [ ] Code is tested
- [ ] Documentation updated
- [ ] No console.log/debug code
- [ ] Responsive on all screen sizes
