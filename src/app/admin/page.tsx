'use client';

import React, { useState } from 'react';
import { useStoneContext } from '@/context/StoneContext';
import { Product, Project, Blog } from '@/data/stoneData';
import { Plus, Edit2, Trash2, Save, X, Download, Upload, Loader2, Lock, LogOut } from 'lucide-react';

type ActiveTab = 'products' | 'projects' | 'blogs' | 'contact';

interface ImageUploadFieldProps {
  label: string;
  images: string;
  onChange: (val: string) => void;
  multiple?: boolean;
}

function ImageUploadField({ label, images, onChange, multiple = true }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const imagesList = images
    ? images.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  // Reset active index if it goes out of bounds
  React.useEffect(() => {
    if (imagesList.length === 0) {
      setActiveIndex(0);
    } else if (activeIndex >= imagesList.length) {
      setActiveIndex(imagesList.length - 1);
    }
  }, [imagesList.length, activeIndex]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate Aspect Ratio (Landscape, between 1.2 and 2.0)
    setUploading(true);
    try {
      const validateResult = await new Promise<{ valid: boolean; ratio: number }>((resolve) => {
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);
        img.src = objectUrl;
        img.onload = () => {
          URL.revokeObjectURL(objectUrl);
          const ratio = img.width / img.height;
          // Accept landscape aspect ratios (1.2 to 2.0 covers standard 4:3 (~1.33) and 16:9 (~1.77))
          const valid = ratio >= 1.2 && ratio <= 2.0;
          resolve({ valid, ratio });
        };
        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          resolve({ valid: false, ratio: 0 });
        };
      });

      if (!validateResult.valid) {
        alert(`Invalid Aspect Ratio: ${validateResult.ratio.toFixed(2)} (${validateResult.ratio > 1 ? 'Too narrow landscape or portrait' : 'Portrait'}).\n\nPlease upload a landscape image with an aspect ratio between 4:3 and 16:9 (ratio: 1.20 to 2.00).`);
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned status ${res.status}`);
      }

      const data = await res.json();
      const uploadedUrl = data.url;

      if (multiple) {
        const newList = [...imagesList, uploadedUrl];
        onChange(newList.join(', '));
        setActiveIndex(newList.length - 1);
      } else {
        onChange(uploadedUrl);
        setActiveIndex(0);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Failed to upload image: ${err.message || 'Please try again.'}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    if (multiple) {
      const updatedList = [...imagesList];
      updatedList.splice(index, 1);
      onChange(updatedList.join(', '));
      if (activeIndex >= updatedList.length) {
        setActiveIndex(Math.max(0, updatedList.length - 1));
      }
    } else {
      onChange('');
      setActiveIndex(0);
    }
  };

  const activeImageUrl = imagesList[activeIndex];

  return (
    <div className="form-group" style={{ marginBottom: '2rem' }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)', textTransform: 'none' }}>(Landscape, 4:3 or 16:9 ratio required)</span>
      </label>

      {/* Real-window style showcase active image box */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: multiple ? '300px' : '200px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
        }}
      >
        {activeImageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImageUrl}
              alt="Active showcase preview"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            <span style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'rgba(28, 27, 24, 0.85)',
              color: 'var(--gold-light)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '0.3rem 0.6rem',
              borderRadius: '2px',
              fontWeight: 600,
              border: '1px solid var(--border-color)',
            }}>
              {multiple ? `Showcase Image ${activeIndex + 1} of ${imagesList.length}` : 'Header Banner'}
            </span>

            <button
              type="button"
              onClick={() => handleRemoveImage(activeIndex)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(239, 68, 68, 0.95)',
                color: '#fff',
                border: 'none',
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#dc2626')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.95)')}
            >
              <Trash2 size={14} /> Remove Image
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
            <Upload size={40} style={{ color: 'var(--gold)', marginBottom: '0.5rem', opacity: 0.7 }} />
            <p style={{ margin: 0, fontSize: '0.9rem' }}>No image uploaded yet</p>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem' }}>Select a landscape file below to begin</p>
          </div>
        )}
      </div>

      {/* Thumbnail grid mirroring the real window detail thumbnail row */}
      {multiple && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center', marginBottom: '1rem' }}>
          {imagesList.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                position: 'relative',
                width: '90px',
                height: '65px',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: idx === activeIndex ? '2px solid var(--gold)' : '1px solid var(--border-color)',
                padding: 0,
                background: 'var(--bg-secondary)',
                transition: 'all 0.2s ease',
                transform: idx === activeIndex ? 'scale(1.05)' : 'none',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgUrl}
                alt={`Thumbnail preview ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                bottom: '2px',
                right: '4px',
                color: '#fff',
                fontSize: '0.65rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                fontWeight: 'bold',
              }}>
                {idx + 1}
              </span>
            </div>
          ))}

          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '90px',
              height: '65px',
              border: '1px dashed var(--gold)',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--gold)',
              background: 'rgba(188, 163, 116, 0.05)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(188, 163, 116, 0.1)';
              e.currentTarget.style.borderColor = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(188, 163, 116, 0.05)';
              e.currentTarget.style.borderColor = 'var(--gold)';
            }}
          >
            {uploading ? (
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <>
                <Plus size={18} style={{ marginBottom: '0.1rem' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>Add Image</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* If single image and no image exists, show the upload button */}
      {!multiple && !activeImageUrl && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.5rem',
              fontSize: '0.8rem',
            }}
          >
            {uploading ? (
              <>
                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={14} /> Upload Banner Image
              </>
            )}
          </button>
        </div>
      )}

      <details style={{ marginTop: '0.8rem', cursor: 'pointer' }}>
        <summary style={{ fontSize: '0.75rem', color: 'var(--text-muted)', userSelect: 'none' }}>Edit raw image URLs</summary>
        <textarea
          value={images}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
          className="form-textarea"
          style={{ marginTop: '0.3rem', fontSize: '0.8rem', fontFamily: 'monospace' }}
          placeholder="Comma-separated image URLs"
        />
      </details>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default function Admin() {
  const {
    products, projects, blogs, contactInfo, updateContactInfo, loading,
    addProduct, editProduct, deleteProduct,
    addProject, editProject, deleteProject,
    addBlog, editBlog, deleteBlog
  } = useStoneContext();

  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  React.useEffect(() => {
    fetch('/api/auth/status')
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.authenticated);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Contact Info Form State
  const [contactForm, setContactForm] = useState({
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    targetMarkets: ''
  });

  React.useEffect(() => {
    if (contactInfo) {
      setContactForm({
        email: contactInfo.email,
        phone: contactInfo.phone,
        whatsapp: contactInfo.whatsapp,
        address: contactInfo.address,
        targetMarkets: contactInfo.targetMarkets.join(', ')
      });
    }
  }, [contactInfo]);

  // Import / Export states
  const [importText, setImportText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Dynamic categories list — derived purely from existing data.
  // 'Uncategorized' is excluded from the deletable list (it's a fallback, not a real category)
  // and is sorted to last position in filter dropdowns.
  const existingProductCategories = React.useMemo(() => {
    const cats = new Set<string>();
    products.forEach(p => {
      if (p.category && p.category !== 'Uncategorized') cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [products]);

  const existingProjectCategories = React.useMemo(() => {
    const cats = new Set<string>();
    projects.forEach(p => {
      if (p.category && p.category !== 'Uncategorized') cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [projects]);

  // Whether the contact form was saved successfully (for inline message)
  const [contactSaved, setContactSaved] = useState(false);

  const [isNewProductCategory, setIsNewProductCategory] = useState(false);
  const [customProductCategory, setCustomProductCategory] = useState('');
  const [isNewProjectCategory, setIsNewProjectCategory] = useState(false);
  const [customProjectCategory, setCustomProjectCategory] = useState('');

  // Form States (Common/Union representation)
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Quartzite' as string,
    description: '',
    detailedDescription: '',
    images: '',
    origin: '',
    finishes: '',
    applications: '',
    thickness: '',
    features: ''
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Residential' as string,
    location: '',
    description: '',
    images: '',
    stoneUsed: '',
    year: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    summary: '',
    content: '',
    author: 'PJ Stone Team',
    image: '',
    tags: ''
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Invalid credentials');
      } else {
        setIsAuth(true);
      }
    } catch (err) {
      setLoginError('Server error. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuth(false);
      setUsernameInput('');
      setPasswordInput('');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Handle Form Open for Adding
  const handleAddNew = () => {
    setEditId(null);
    setShowForm(true);

    setIsNewProductCategory(false);
    setCustomProductCategory('');
    setIsNewProjectCategory(false);
    setCustomProjectCategory('');

    // Reset forms
    setProductForm({
      name: '',
      category: 'Quartzite',
      description: '',
      detailedDescription: '',
      images: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      origin: '',
      finishes: 'Polished, Honed',
      applications: 'Kitchen Countertops, Flooring',
      thickness: '20mm, 30mm',
      features: 'Scratch Resistant, Low Porosity'
    });

    setProjectForm({
      title: '',
      category: 'Residential',
      location: '',
      description: '',
      images: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      stoneUsed: '',
      year: new Date().getFullYear().toString()
    });

    setBlogForm({
      title: '',
      summary: '',
      content: '',
      author: 'PJ Stone Exporters',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
      tags: 'Design, Sourcing'
    });
  };

  // Handle Form Open for Editing
  const handleEdit = (id: string) => {
    setEditId(id);
    setShowForm(true);

    setIsNewProductCategory(false);
    setCustomProductCategory('');
    setIsNewProjectCategory(false);
    setCustomProjectCategory('');

    if (activeTab === 'products') {
      const item = products.find(p => p.id === id);
      if (item) {
        setProductForm({
          name: item.name,
          category: item.category,
          description: item.description,
          detailedDescription: item.detailedDescription,
          images: item.images.join(', '),
          origin: item.origin,
          finishes: item.finishes.join(', '),
          applications: item.applications.join(', '),
          thickness: item.thickness.join(', '),
          features: item.features.join(', ')
        });
      }
    } else if (activeTab === 'projects') {
      const item = projects.find(p => p.id === id);
      if (item) {
        setProjectForm({
          title: item.title,
          category: item.category,
          location: item.location,
          description: item.description,
          images: item.images.join(', '),
          stoneUsed: item.stoneUsed.join(', '),
          year: item.year
        });
      }
    } else if (activeTab === 'blogs') {
      const item = blogs.find(b => b.id === id);
      if (item) {
        setBlogForm({
          title: item.title,
          summary: item.summary,
          content: item.content,
          author: item.author,
          image: item.image,
          tags: item.tags.join(', ')
        });
      }
    }
  };

  // Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    if (activeTab === 'products') {
      const formattedProduct = {
        name: productForm.name,
        category: productForm.category,
        description: productForm.description,
        detailedDescription: productForm.detailedDescription,
        images: productForm.images.split(',').map(s => s.trim()).filter(Boolean),
        origin: productForm.origin,
        finishes: productForm.finishes.split(',').map(s => s.trim()).filter(Boolean),
        applications: productForm.applications.split(',').map(s => s.trim()).filter(Boolean),
        thickness: productForm.thickness.split(',').map(s => s.trim()).filter(Boolean),
        features: productForm.features.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editId) {
        await editProduct(editId, formattedProduct);
        triggerNotification('Product updated successfully!');
      } else {
        await addProduct(formattedProduct);
        triggerNotification('New product added successfully!');
      }
    } else if (activeTab === 'projects') {
      const formattedProject = {
        title: projectForm.title,
        category: projectForm.category,
        location: projectForm.location,
        description: projectForm.description,
        images: projectForm.images.split(',').map(s => s.trim()).filter(Boolean),
        stoneUsed: projectForm.stoneUsed.split(',').map(s => s.trim()).filter(Boolean),
        year: projectForm.year
      };

      if (editId) {
        await editProject(editId, formattedProject);
        triggerNotification('Project updated successfully!');
      } else {
        await addProject(formattedProject);
        triggerNotification('New project added successfully!');
      }
    } else if (activeTab === 'blogs') {
      const formattedBlog = {
        title: blogForm.title,
        summary: blogForm.summary,
        content: blogForm.content,
        author: blogForm.author,
        image: blogForm.image,
        tags: blogForm.tags.split(',').map(s => s.trim()).filter(Boolean),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };

      if (editId) {
        await editBlog(editId, formattedBlog);
        triggerNotification('Blog article updated successfully!');
      } else {
        await addBlog(formattedBlog);
        triggerNotification('New blog article added successfully!');
      }
    }
    } catch (err) {
      console.error('[Admin] Form submit error:', err);
      triggerNotification('Error saving data. Please try again.');
    }

    setShowForm(false);
    setEditId(null);
  };

  // Delete Handler
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        if (activeTab === 'products') {
          await deleteProduct(id);
          triggerNotification('Product deleted successfully.');
        } else if (activeTab === 'projects') {
          await deleteProject(id);
          triggerNotification('Project deleted successfully.');
        } else if (activeTab === 'blogs') {
          await deleteBlog(id);
          triggerNotification('Blog article deleted.');
        }
      } catch (err) {
        console.error('[Admin] Delete error:', err);
        triggerNotification('Error deleting item. Please try again.');
      }
    }
  };

  const handleDeleteProductCategory = async (catName: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${catName}"? All products in this category will be reset to "Uncategorized".`)) {
      try {
        await Promise.all(
          products
            .filter(p => p.category === catName)
            .map(p => editProduct(p.id, { category: 'Uncategorized' }))
        );
        triggerNotification(`Category "${catName}" deleted successfully!`);
      } catch (err) {
        console.error('[Admin] Delete category error:', err);
        triggerNotification('Error deleting category. Please try again.');
      }
    }
  };

  const handleDeleteProjectCategory = async (catName: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${catName}"? All projects in this category will be reset to "Uncategorized".`)) {
      try {
        await Promise.all(
          projects
            .filter(p => p.category === catName)
            .map(p => editProject(p.id, { category: 'Uncategorized' }))
        );
        triggerNotification(`Category "${catName}" deleted successfully!`);
      } catch (err) {
        console.error('[Admin] Delete category error:', err);
        triggerNotification('Error deleting category. Please try again.');
      }
    }
  };

  // Helper for notification
  const triggerNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // Backup / Data Export Action
  const handleExportData = () => {
    const fullData = {
      products,
      projects,
      blogs,
      contactInfo
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(fullData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', 'pj_stones_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    triggerNotification('Backup downloaded successfully!');
  };

  // Import Data Action — sends to MongoDB via API
  const handleImportData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(importText);

      const promises: Promise<Response>[] = [];

      if (parsed.products && Array.isArray(parsed.products)) {
        parsed.products.forEach((p: any) => {
          promises.push(fetch(`/api/products/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) }));
        });
      }
      if (parsed.projects && Array.isArray(parsed.projects)) {
        parsed.projects.forEach((p: any) => {
          promises.push(fetch(`/api/projects/${p.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) }));
        });
      }
      if (parsed.blogs && Array.isArray(parsed.blogs)) {
        parsed.blogs.forEach((b: any) => {
          promises.push(fetch(`/api/blogs/${b.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }));
        });
      }
      if (parsed.contactInfo) {
        promises.push(fetch('/api/contact', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed.contactInfo) }));
      }

      await Promise.all(promises);
      triggerNotification('Inventory imported successfully! Reloading...');
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      alert('Import failed. Check the JSON format and try again.');
    }
  };

  if (isAuth === null || loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        color: 'var(--text-secondary)'
      }}>
        <Loader2 size={48} style={{ color: 'var(--gold)', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Connecting to database...
        </p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="container fade-in" style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}>
        <div className="glass-panel" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '3rem 2.5rem',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-premium)',
          background: 'rgba(28, 27, 24, 0.85)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--border-light)',
            color: 'var(--gold)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <Lock size={28} />
          </div>

          <h3 style={{
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '0.5rem'
          }}>
            Admin Login
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '2rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            PJ Stones Management Console
          </p>

          {loginError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              padding: '0.8rem',
              borderRadius: '4px',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
              animation: 'fadeIn 0.3s ease'
            }}>
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
            <div className="form-group">
              <label htmlFor="username" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'block' }}>Username</label>
              <input
                type="text"
                id="username"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="form-input"
                placeholder="Enter username"
                style={{ width: '100%', padding: '0.8rem 1rem' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="password" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'block' }}>Password</label>
              <input
                type="password"
                id="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="form-input"
                placeholder="Enter password"
                style={{ width: '100%', padding: '0.8rem 1rem' }}
              />
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem'
              }}
            >
              {loggingIn ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Verifying...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <span className="subtitle">Management Console</span>
          <h2 style={{ margin: 0 }}>PJ Stones Admin Panel</h2>
        </div>
        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            fontSize: '0.85rem',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '4px'
          }}
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>

      {/* Info notification */}
      {feedbackMsg && (
        <div style={{
          background: 'var(--gold-gradient)',
          color: '#1c1b18',
          padding: '1rem',
          borderRadius: '4px',
          fontWeight: 700,
          marginBottom: '2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-premium)'
        }}>
          {feedbackMsg}
        </div>
      )}

      {/* Admin Operations Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }} className="ops-bar">
        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.3rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          {(['products', 'projects', 'blogs', 'contact'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
              }}
              style={{
                background: activeTab === tab ? 'var(--gold-gradient)' : 'transparent',
                color: activeTab === tab ? '#1c1b18' : 'var(--text-secondary)',
                border: 'none',
                padding: '0.6rem 1.5rem',
                borderRadius: '2px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowImportArea(!showImportArea)}
            className="btn-secondary"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.75rem',
              gap: '0.4rem',
            }}
          >
            <Upload size={14} /> Import Backup
          </button>
          <button
            onClick={handleExportData}
            className="btn-secondary"
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: '0.75rem',
              gap: '0.4rem',
            }}
          >
            <Download size={14} /> Export Backup
          </button>
          {activeTab !== 'contact' && (
            <button
              onClick={handleAddNew}
              className="btn-primary"
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.75rem',
                gap: '0.4rem',
              }}
            >
              <Plus size={14} /> Add New {activeTab.slice(0, -1)}
            </button>
          )}
        </div>
      </div>

      {/* Backup Import Panel */}
      {showImportArea && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '4px', marginBottom: '3rem', border: '1px dashed var(--gold)' }}>
          <form onSubmit={handleImportData}>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Import Database JSON</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Paste your exported JSON backup file string below to overwrite your browser's local stone inventory.
            </p>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={6}
                required
                className="form-input"
                style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                placeholder='{ "products": [...], "projects": [...], "blogs": [...] }'
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>
                Restore Database
              </button>
              <button type="button" onClick={() => setShowImportArea(false)} className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CRUD Form overlay or inline box */}
      {showForm && (
        <div className="glass-panel" style={{
          padding: '2.5rem',
          borderRadius: '4px',
          border: '1px solid var(--gold)',
          marginBottom: '4rem',
          boxShadow: 'var(--shadow-premium)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
              {editId ? 'Edit Existing' : 'Create New'} {activeTab.slice(0, -1).toUpperCase()}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditId(null);
              }}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleFormSubmit}>
            {/* 1. Products Form */}
            {activeTab === 'products' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="form-row">
                  <div className="form-group">
                    <label>Stone / Product Name *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Alabaster White Granite"
                    />
                  </div>
                  <div className="form-group">
                    <label>Stone Category *</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <select
                        value={isNewProductCategory ? 'NEW_CUSTOM_CATEGORY' : productForm.category}
                        onChange={(e) => {
                          if (e.target.value === 'NEW_CUSTOM_CATEGORY') {
                            setIsNewProductCategory(true);
                            setProductForm({ ...productForm, category: customProductCategory });
                          } else {
                            setIsNewProductCategory(false);
                            setProductForm({ ...productForm, category: e.target.value });
                          }
                        }}
                        className="form-select"
                      >
                        {existingProductCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="NEW_CUSTOM_CATEGORY">+ Add New Category...</option>
                      </select>
                      {isNewProductCategory && (
                        <input
                          type="text"
                          required
                          value={customProductCategory}
                          onChange={(e) => {
                            setCustomProductCategory(e.target.value);
                            setProductForm({ ...productForm, category: e.target.value });
                          }}
                          className="form-input"
                          placeholder="Type new category name..."
                          style={{ marginTop: '0.3rem' }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                  <div className="form-group">
                    <label>Geological Origin (Country) *</label>
                    <input
                      type="text"
                      required
                      value={productForm.origin}
                      onChange={(e) => setProductForm({ ...productForm, origin: e.target.value })}
                      className="form-input"
                      placeholder="e.g. India (Rajasthan Quarries)"
                    />
                  </div>
                  <div className="form-group">
                    <label>Thicknesses (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={productForm.thickness}
                      onChange={(e) => setProductForm({ ...productForm, thickness: e.target.value })}
                      className="form-input"
                      placeholder="e.g. 20mm, 30mm"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Brief Description *</label>
                  <input
                    type="text"
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="form-input"
                    placeholder="Short summary for grids and list views"
                  />
                </div>

                <div className="form-group">
                  <label>Detailed Geology & Features (Full text) *</label>
                  <textarea
                    required
                    value={productForm.detailedDescription}
                    onChange={(e) => setProductForm({ ...productForm, detailedDescription: e.target.value })}
                    rows={4}
                    className="form-textarea"
                    placeholder="Detailed history, appearance notes, and coordinating guidelines"
                  />
                </div>

                <ImageUploadField
                  label="Slab Images *"
                  images={productForm.images}
                  onChange={(val) => setProductForm({ ...productForm, images: val })}
                  multiple={true}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.2rem' }} className="form-three-row">
                  <div className="form-group">
                    <label>Finishes (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={productForm.finishes}
                      onChange={(e) => setProductForm({ ...productForm, finishes: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Polished, Honed, Leathered"
                    />
                  </div>
                  <div className="form-group">
                    <label>Applications (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={productForm.applications}
                      onChange={(e) => setProductForm({ ...productForm, applications: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Countertops, Facades"
                    />
                  </div>
                  <div className="form-group">
                    <label>Features (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={productForm.features}
                      onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Acid Resistant, Low Absorption"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Projects Form */}
            {activeTab === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }} className="form-row">
                  <div className="form-group">
                    <label>Project Title *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Fifth Avenue Commercial Plaza"
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Category *</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <select
                        value={isNewProjectCategory ? 'NEW_CUSTOM_CATEGORY' : projectForm.category}
                        onChange={(e) => {
                          if (e.target.value === 'NEW_CUSTOM_CATEGORY') {
                            setIsNewProjectCategory(true);
                            setProjectForm({ ...projectForm, category: customProjectCategory });
                          } else {
                            setIsNewProjectCategory(false);
                            setProjectForm({ ...projectForm, category: e.target.value });
                          }
                        }}
                        className="form-select"
                      >
                        {existingProjectCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="NEW_CUSTOM_CATEGORY">+ Add New Category...</option>
                      </select>
                      {isNewProjectCategory && (
                        <input
                          type="text"
                          required
                          value={customProjectCategory}
                          onChange={(e) => {
                            setCustomProjectCategory(e.target.value);
                            setProjectForm({ ...projectForm, category: e.target.value });
                          }}
                          className="form-input"
                          placeholder="Type new category name..."
                          style={{ marginTop: '0.3rem' }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                  <div className="form-group">
                    <label>Location (City, Country) *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                      className="form-input"
                      placeholder="e.g. New York, USA"
                    />
                  </div>
                  <div className="form-group">
                    <label>Completion Year *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      className="form-input"
                      placeholder="e.g. 2026"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Stones Slabs Used (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.stoneUsed}
                    onChange={(e) => setProjectForm({ ...projectForm, stoneUsed: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Alabaster White Granite, Nero Marquina Marble"
                  />
                </div>

                <div className="form-group">
                  <label>Project Description *</label>
                  <textarea
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows={4}
                    className="form-textarea"
                    placeholder="Summarize the project layout and client specification briefs"
                  />
                </div>

                <ImageUploadField
                  label="Project Images *"
                  images={projectForm.images}
                  onChange={(val) => setProjectForm({ ...projectForm, images: val })}
                  multiple={true}
                />
              </div>
            )}

            {/* 3. Blogs Form */}
            {activeTab === 'blogs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="form-group">
                  <label>Blog Title *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Quartzite vs Marble Countertops"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                  <div className="form-group">
                    <label>Author *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="form-input"
                      placeholder="PJ Stone Team"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tags (Comma separated) *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Interior Design, Sourcing"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Summary / Excerpt *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.summary}
                    onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                    className="form-input"
                    placeholder="Brief intro preview for listings"
                  />
                </div>

                <ImageUploadField
                  label="Header Image *"
                  images={blogForm.image}
                  onChange={(val) => setBlogForm({ ...blogForm, image: val })}
                  multiple={false}
                />

                <div className="form-group">
                  <label>Main Body Content (Use double line breaks for paragraphs) *</label>
                  <textarea
                    required
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    rows={8}
                    className="form-textarea"
                    placeholder="Write your article content. To add secondary headers start the line with '### '"
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <button type="submit" className="btn-primary" style={{ display: 'inline-flex', gap: '0.4rem', padding: '0.8rem 2rem' }}>
                <Save size={16} /> Save Data
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                className="btn-secondary"
                style={{ padding: '0.8rem 2rem' }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Items List Rendering */}
      {activeTab !== 'contact' && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem' }}>
            Active {activeTab.toUpperCase()} List ({
              activeTab === 'products' ? products.length : activeTab === 'projects' ? projects.length : blogs.length
            } items)
          </h3>

          {/* 1. Products List */}
          {activeTab === 'products' && (
            <div>
              {/* Category removal bar */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Active Categories:</span>
                {existingProductCategories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '2px',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleDeleteProductCategory(cat)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      title={`Delete ${cat} Category`}
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map((p) => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: '2px', border: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '1rem' }} className="admin-item-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }} />
                      <div>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{p.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category} — Origin: {p.origin}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(p.id)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', gap: '0.3rem' }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderColor: 'rgba(255,0,0,0.3)', color: 'rgba(200,0,0,1)', display: 'inline-flex', gap: '0.3rem' }}>
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Projects List */}
          {activeTab === 'projects' && (
            <div>
              {/* Category removal bar */}
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Active Categories:</span>
                {existingProjectCategories.map((cat) => (
                  <span
                    key={cat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '2px',
                      fontSize: '0.8rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {cat}
                    <button
                      type="button"
                      onClick={() => handleDeleteProjectCategory(cat)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                      title={`Delete ${cat} Category`}
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projects.map((p) => (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: '2px', border: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '1rem' }} className="admin-item-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }} />
                      <div>
                        <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{p.title}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.category} — {p.location} ({p.year})</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(p.id)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', gap: '0.3rem' }}>
                        <Edit2 size={12} /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id, p.title)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderColor: 'rgba(255,0,0,0.3)', color: 'rgba(200,0,0,1)', display: 'inline-flex', gap: '0.3rem' }}>
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Blogs List */}
          {activeTab === 'blogs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {blogs.map((b) => (
                <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: '2px', border: '1px solid var(--border-light)', flexWrap: 'wrap', gap: '1rem' }} className="admin-item-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image} alt={b.title} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }} />
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{b.title}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>By {b.author} — {b.date}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleEdit(b.id)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', gap: '0.3rem' }}>
                      <Edit2 size={12} /> Edit
                    </button>
                    <button onClick={() => handleDelete(b.id, b.title)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderColor: 'rgba(255,0,0,0.3)', color: 'rgba(200,0,0,1)', display: 'inline-flex', gap: '0.3rem' }}>
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. Contact Details Management */}
      {activeTab === 'contact' && (
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem' }}>
            Manage Contact Details & Sourcing Coordinates
          </h3>
          <form onSubmit={async (e) => {
            e.preventDefault();
            setContactSaved(false);
            try {
              const markets = contactForm.targetMarkets.split(',').map(m => m.trim()).filter(Boolean);
              await updateContactInfo({
                email: contactForm.email,
                phone: contactForm.phone,
                whatsapp: contactForm.whatsapp,
                address: contactForm.address,
                targetMarkets: markets
              });
              setContactSaved(true);
              setTimeout(() => setContactSaved(false), 5000);
            } catch (err) {
              console.error('[Admin] Contact update error:', err);
              triggerNotification('Error updating contact details. Please try again.');
            }
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="form-input"
                    placeholder="e.g. contact@pjstones.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="form-input"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
                <div className="form-group">
                  <label>WhatsApp Number (International format, numbers only) *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.whatsapp}
                    onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                    className="form-input"
                    placeholder="e.g. 919876543210"
                  />
                </div>
                <div className="form-group">
                  <label>Target Markets (Comma separated) *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.targetMarkets}
                    onChange={(e) => setContactForm({ ...contactForm, targetMarkets: e.target.value })}
                    className="form-input"
                    placeholder="e.g. USA, Europe, UAE, Australia"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Business Address *</label>
                <textarea
                  required
                  value={contactForm.address}
                  onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                  rows={3}
                  className="form-textarea"
                  placeholder="e.g. 102 Stone Avenue, Jaipur, India"
                />
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <button type="submit" className="btn-primary" style={{ display: 'inline-flex', gap: '0.4rem', padding: '0.8rem 2rem' }}>
                  <Save size={16} /> Save Contact Details
                </button>
                {contactSaved && (
                  <span style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#22c55e',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    ✓ Contact details updated successfully!
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
