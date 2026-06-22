'use client';

import React, { useState } from 'react';
import { useStoneContext } from '@/context/StoneContext';
import { Product, Project, Blog } from '@/data/stoneData';
import { Plus, Edit2, Trash2, Save, X, Download, Upload, Info, Loader2 } from 'lucide-react';

type ActiveTab = 'products' | 'projects' | 'blogs' | 'contact';

export default function Admin() {
  const {
    products, projects, blogs, contactInfo, updateContactInfo, loading,
    addProduct, editProduct, deleteProduct,
    addProject, editProject, deleteProject,
    addBlog, editBlog, deleteBlog
  } = useStoneContext();

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

  // Dynamic categories list
  const existingProductCategories = React.useMemo(() => {
    const cats = new Set(['Quartzite', 'Marble', 'Granite']);
    products.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [products]);

  const existingProjectCategories = React.useMemo(() => {
    const cats = new Set(['Residential', 'Commercial', 'Hospitality']);
    projects.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

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

  if (loading) {
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

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '3rem' }}>
        <span className="subtitle">Management Console</span>
        <h2>PJ Stones Admin Panel</h2>
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

                <div className="form-group">
                  <label>Slab Images (Comma separated URLs) *</label>
                  <textarea
                    required
                    value={productForm.images}
                    onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                    rows={2}
                    className="form-textarea"
                    placeholder="Provide image URLs, separate multiple with commas"
                  />
                </div>

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

                <div className="form-group">
                  <label>Project Images (Comma separated URLs) *</label>
                  <textarea
                    required
                    value={projectForm.images}
                    onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                    rows={2}
                    className="form-textarea"
                    placeholder="Provide image URLs, separated by commas"
                  />
                </div>
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

                <div className="form-group">
                  <label>Header Image URL *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className="form-input"
                    placeholder="Paste banner image URL"
                  />
                </div>

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
            try {
              const markets = contactForm.targetMarkets.split(',').map(m => m.trim()).filter(Boolean);
              await updateContactInfo({
                email: contactForm.email,
                phone: contactForm.phone,
                whatsapp: contactForm.whatsapp,
                address: contactForm.address,
                targetMarkets: markets
              });
              triggerNotification('Contact details updated successfully!');
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

              <div style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary" style={{ display: 'inline-flex', gap: '0.4rem', padding: '0.8rem 2rem' }}>
                  <Save size={16} /> Save Contact Details
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Admin Panel Warning/Help Info */}
      <div className="glass-panel" style={{
        marginTop: '4rem',
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <Info size={24} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
            Data Persistence Guidance
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
            Because this application is designed for serverless deployment on Vercel, edits are stored in your browser's local cache (localStorage). To persist updates across other devices or environments, click <strong>EXPORT BACKUP</strong> to download the updated JSON database file. You can then copy it into <code>src/data/stoneData.ts</code>, commit to your repository, or paste it here using <strong>IMPORT BACKUP</strong>.
          </p>
        </div>
      </div>

    </div>
  );
}
