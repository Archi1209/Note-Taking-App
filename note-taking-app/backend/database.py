from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table
from datetime import datetime

# Create database
DATABASE_URL = 'sqlite:///notes.db'
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Junction table for notes and tags
note_tags = Table(
    'note_tags',
    Base.metadata,
    Column('note_id', Integer, ForeignKey('notes.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tags.id'), primary_key=True)
)

# Models
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

class Tag(Base):
    __tablename__ = 'tags'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    
    notes = relationship("Note", secondary=note_tags, back_populates="tags")

class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    color = Column(String(20), default="#6c757d")
    
    notes = relationship("Note", back_populates="category")

# Create tables
def init_db():
    Base.metadata.create_all(bind=engine)
    
    # Add default categories if none exist
    db = SessionLocal()
    try:
        if db.query(Category).count() == 0:
            default_categories = [
                Category(name="Personal", color="#e74c3c"),
                Category(name="Work", color="#3498db"),
                Category(name="Ideas", color="#9b59b6"),
                Category(name="Tasks", color="#f39c12"),
            ]
            db.add_all(default_categories)
            db.commit()
    finally:
        db.close()

# Get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
