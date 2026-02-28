from flask import Flask
from flask_cors import CORS
from database import init_db
from routes import api

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(api, url_prefix='/api')

# Initialize database
init_db()

@app.route('/')
def index():
    return {'message': 'Note-Taking API is running', 'version': '1.0.0'}

@app.route('/health')
def health():
    return {'status': 'healthy'}

if __name__ == '__main__':
    print("=" * 50)
    print("Starting Note-Taking Application Backend")
    print("API available at: http://localhost:5000")
    print("API Endpoints:")
    print("  - GET    /api/notes")
    print("  - POST   /api/notes")
    print("  - GET    /api/notes/<id>")
    print("  - PUT    /api/notes/<id>")
    print("  - DELETE /api/notes/<id>")
    print("  - GET    /api/tags")
    print("  - POST   /api/tags")
    print("  - DELETE /api/tags/<id>")
    print("  - GET    /api/categories")
    print("  - POST   /api/categories")
    print("  - DELETE /api/categories/<id>")
    print("  - GET    /api/search?q=<query>")
    print("=" * 50)
    app.run(debug=True, host='0.0.0.0', port=5000)
