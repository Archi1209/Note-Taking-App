from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base, note_tags

class Note(Base):
    __tablename__ = 'notes'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    category = relationship("Category", back_populates="notes")
    tags = relationship("Tag", secondary=note_tags, back_populates="notes")
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'category_id': self.category_id,
            'category': self.category.to_dict() if self.category else None,
            'tags': [tag.to_dict() for tag in self.tags],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class Tag(Base):
    __tablename__ = 'tags'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    
    notes = relationship("Note", secondary=note_tags, back_populates="tags")
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    color = Column(String(20), default="#6c757d")
    
    notes = relationship("Note", back_populates="category")
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color
        }
