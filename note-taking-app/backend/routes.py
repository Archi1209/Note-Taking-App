from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import get_db, SessionLocal
from models import Note, Tag, Category
from datetime import datetime

api = Blueprint('api', __name__)

# ==================== NOTES ====================

@api.route('/notes', methods=['GET'])
def get_notes():
    db = SessionLocal()
    try:
        notes = db.query(Note).order_by(Note.updated_at.desc()).all()
        return jsonify([note.to_dict() for note in notes])
    finally:
        db.close()

@api.route('/notes/<int:id>', methods=['GET'])
def get_note(id):
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == id).first()
        if not note:
            return jsonify({'error': 'Note not found'}), 404
        return jsonify(note.to_dict())
    finally:
        db.close()

@api.route('/notes', methods=['POST'])
def create_note():
    db = SessionLocal()
    try:
        data = request.get_json()
        
        # Create note
        note = Note(
            title=data.get('title', 'Untitled'),
            content=data.get('content', ''),
            category_id=data.get('category_id')
        )
        db.add(note)
        db.flush()  # Get the note ID
        
        # Add tags if provided
        tag_ids = data.get('tag_ids', [])
        if tag_ids:
            tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
            note.tags = tags
        
        db.commit()
        db.refresh(note)
        
        return jsonify(note.to_dict()), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

@api.route('/notes/<int:id>', methods=['PUT'])
def update_note(id):
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == id).first()
        if not note:
            return jsonify({'error': 'Note not found'}), 404
        
        data = request.get_json()
        
        if 'title' in data:
            note.title = data['title']
        if 'content' in data:
            note.content = data['content']
        if 'category_id' in data:
            note.category_id = data['category_id']
        if 'tag_ids' in data:
            tag_ids = data['tag_ids']
            tags = db.query(Tag).filter(Tag.id.in_(tag_ids)).all()
            note.tags = tags
        
        note.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(note)
        
        return jsonify(note.to_dict())
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

@api.route('/notes/<int:id>', methods=['DELETE'])
def delete_note(id):
    db = SessionLocal()
    try:
        note = db.query(Note).filter(Note.id == id).first()
        if not note:
            return jsonify({'error': 'Note not found'}), 404
        
        db.delete(note)
        db.commit()
        
        return jsonify({'message': 'Note deleted successfully'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

# ==================== TAGS ====================

@api.route('/tags', methods=['GET'])
def get_tags():
    db = SessionLocal()
    try:
        tags = db.query(Tag).all()
        return jsonify([tag.to_dict() for tag in tags])
    finally:
        db.close()

@api.route('/tags', methods=['POST'])
def create_tag():
    db = SessionLocal()
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        
        if not name:
            return jsonify({'error': 'Tag name is required'}), 400
        
        # Check if tag already exists
        existing = db.query(Tag).filter(Tag.name == name).first()
        if existing:
            return jsonify(existing.to_dict())
        
        tag = Tag(name=name)
        db.add(tag)
        db.commit()
        db.refresh(tag)
        
        return jsonify(tag.to_dict()), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

@api.route('/tags/<int:id>', methods=['DELETE'])
def delete_tag(id):
    db = SessionLocal()
    try:
        tag = db.query(Tag).filter(Tag.id == id).first()
        if not tag:
            return jsonify({'error': 'Tag not found'}), 404
        
        db.delete(tag)
        db.commit()
        
        return jsonify({'message': 'Tag deleted successfully'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

# ==================== CATEGORIES ====================

@api.route('/categories', methods=['GET'])
def get_categories():
    db = SessionLocal()
    try:
        categories = db.query(Category).all()
        return jsonify([cat.to_dict() for cat in categories])
    finally:
        db.close()

@api.route('/categories', methods=['POST'])
def create_category():
    db = SessionLocal()
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        color = data.get('color', '#6c757d')
        
        if not name:
            return jsonify({'error': 'Category name is required'}), 400
        
        # Check if category already exists
        existing = db.query(Category).filter(Category.name == name).first()
        if existing:
            return jsonify(existing.to_dict())
        
        category = Category(name=name, color=color)
        db.add(category)
        db.commit()
        db.refresh(category)
        
        return jsonify(category.to_dict()), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

@api.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    db = SessionLocal()
    try:
        category = db.query(Category).filter(Category.id == id).first()
        if not category:
            return jsonify({'error': 'Category not found'}), 404
        
        db.delete(category)
        db.commit()
        
        return jsonify({'message': 'Category deleted successfully'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    finally:
        db.close()

# ==================== SEARCH ====================

@api.route('/search', methods=['GET'])
def search_notes():
    db = SessionLocal()
    try:
        query = request.args.get('q', '').strip()
        
        if not query:
            return jsonify([])
        
        # Search in title and content
        notes = db.query(Note).filter(
            (Note.title.contains(query)) | 
            (Note.content.contains(query))
        ).order_by(Note.updated_at.desc()).all()
        
        return jsonify([note.to_dict() for note in notes])
    finally:
        db.close()
