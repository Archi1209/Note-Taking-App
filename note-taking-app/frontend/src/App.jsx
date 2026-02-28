import { useState, useEffect } from 'react';
import { notesApi, tagsApi, categoriesApi, searchApi } from './services/api';

function App() {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: null,
    tag_ids: []
  });

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [notesData, tagsData, categoriesData] = await Promise.all([
        notesApi.getAll(),
        tagsApi.getAll(),
        categoriesApi.getAll()
      ]);
      setNotes(notesData);
      setTags(tagsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality
  useEffect(() => {
    const search = async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const results = await searchApi.search(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    };
    
    const debounce = setTimeout(search, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleCreateNote = () => {
    setSelectedNote(null);
    setFormData({ title: '', content: '', category_id: null, tag_ids: [] });
    setIsEditing(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category_id: note.category_id,
      tag_ids: note.tags.map(t => t.id)
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedNote) {
        await notesApi.update(selectedNote.id, formData);
      } else {
        await notesApi.create(formData);
      }
      await loadData();
      setIsEditing(false);
      setFormData({ title: '', content: '', category_id: null, tag_ids: [] });
      setSelectedNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesApi.delete(id);
        await loadData();
        if (selectedNote?.id === id) {
          setSelectedNote(null);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleCreateTag = async (name) => {
    try {
      const newTag = await tagsApi.create(name);
      setTags([...tags, newTag]);
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      await tagsApi.delete(id);
      setTags(tags.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const handleCreateCategory = async (name, color) => {
    try {
      const newCategory = await categoriesApi.create(name, color);
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await categoriesApi.delete(id);
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const displayNotes = isSearching ? searchResults : notes;

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <h1>📝 Note Taking App</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <button className="btn btn-primary" onClick={handleCreateNote}>
            + New Note
          </button>

          {/* Categories */}
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="categories-list">
              {categories.map(category => (
                <div key={category.id} className="category-item">
                  <span 
                    className="category-color" 
                    style={{ backgroundColor: category.color }}
                  ></span>
                  <span>{category.name}</span>
                  <button 
                    className="btn-icon btn-delete"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <AddCategoryForm onAdd={handleCreateCategory} />
          </div>

          {/* Tags */}
          <div className="sidebar-section">
            <h3>Tags</h3>
            <div className="tags-list">
              {tags.map(tag => (
                <span key={tag.id} className="tag">
                  #{tag.name}
                  <button onClick={() => handleDeleteTag(tag.id)}>×</button>
                </span>
              ))}
            </div>
            <AddTagForm onAdd={handleCreateTag} />
          </div>
        </aside>

        {/* Notes Grid */}
        <main className="notes-grid">
          {isSearching && (
            <div className="search-results-info">
              Found {searchResults.length} result(s) for "{searchQuery}"
            </div>
          )}
          
          {displayNotes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note!</p>
            </div>
          ) : (
            displayNotes.map(note => (
              <div 
                key={note.id} 
                className={`note-card ${selectedNote?.id === note.id ? 'selected' : ''}`}
                onClick={() => handleEditNote(note)}
              >
                <h3>{note.title}</h3>
                <p className="note-preview">
                  {note.content?.substring(0, 100)}...
                </p>
                <div className="note-meta">
                  {note.category && (
                    <span 
                      className="note-category"
                      style={{ backgroundColor: note.category.color }}
                    >
                      {note.category.name}
                    </span>
                  )}
                  <div className="note-tags">
                    {note.tags?.map(tag => (
                      <span key={tag.id} className="tag-small">#{tag.name}</span>
                    ))}
                  </div>
                </div>
                <button 
                  className="btn-delete-note"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(note.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </main>

        {/* Editor Panel */}
        {isEditing && (
          <div className="editor-panel">
            <div className="editor-header">
              <h2>{selectedNote ? 'Edit Note' : 'New Note'}</h2>
              <button className="btn-close" onClick={() => setIsEditing(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="editor-form">
              <input
                type="text"
                placeholder="Note title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input-title"
              />
              <textarea
                placeholder="Write your note here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="input-content"
              />
              <div className="form-group">
                <label>Category:</label>
                <select
                  value={formData.category_id || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    category_id: e.target.value ? parseInt(e.target.value) : null 
                  })}
                >
                  <option value="">No category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Tags:</label>
                <div className="tags-selector">
                  {tags.map(tag => (
                    <label key={tag.id} className="tag-checkbox">
                      <input
                        type="checkbox"
                        checked={formData.tag_ids.includes(tag.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ 
                              ...formData, 
                              tag_ids: [...formData.tag_ids, tag.id] 
                            });
                          } else {
                            setFormData({ 
                              ...formData, 
                              tag_ids: formData.tag_ids.filter(id => id !== tag.id) 
                            });
                          }
                        }}
                      />
                      #{tag.name}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {selectedNote ? 'Update Note' : 'Save Note'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper Components
function AddTagForm({ onAdd }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="Add tag..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">+</button>
    </form>
  );
}

function AddCategoryForm({ onAdd }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#6c757d');

  const colors = ['#e74c3c', '#3498db', '#9b59b6', '#f39c12', '#2ecc71', '#1abc9c'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), color);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="Add category..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="color-picker">
        {colors.map(c => (
          <button
            key={c}
            type="button"
            className={`color-option ${color === c ? 'selected' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default App;
