const API_BASE = '/api';

// Notes API
export const notesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/notes`);
    return response.json();
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE}/notes/${id}`);
    if (!response.ok) throw new Error('Note not found');
    return response.json();
  },
  
  create: async (noteData) => {
    const response = await fetch(`${API_BASE}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData)
    });
    return response.json();
  },
  
  update: async (id, noteData) => {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData)
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/notes/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Tags API
export const tagsApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/tags`);
    return response.json();
  },
  
  create: async (name) => {
    const response = await fetch(`${API_BASE}/tags`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/tags/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/categories`);
    return response.json();
  },
  
  create: async (name, color) => {
    const response = await fetch(`${API_BASE}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color })
    });
    return response.json();
  },
  
  delete: async (id) => {
    const response = await fetch(`${API_BASE}/categories/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

// Search API
export const searchApi = {
  search: async (query) => {
    const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }
};
