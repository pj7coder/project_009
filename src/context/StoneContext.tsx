'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Project, Blog, CONTACT_INFO } from '../data/stoneData';

type ContactInfo = typeof CONTACT_INFO;

interface StoneContextType {
  products: Product[];
  projects: Project[];
  blogs: Blog[];
  contactInfo: ContactInfo;
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<void>;
  editProduct: (id: string, updated: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addProject: (project: Omit<Project, 'id'> & { id?: string }) => Promise<void>;
  editProject: (id: string, updated: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addBlog: (blog: Omit<Blog, 'id'> & { id?: string }) => Promise<void>;
  editBlog: (id: string, updated: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  updateContactInfo: (info: ContactInfo) => Promise<void>;
}

const StoneContext = createContext<StoneContextType | undefined>(undefined);

export function StoneProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(CONTACT_INFO);
  const [loading, setLoading] = useState(true);

  // ─── Initial data fetch from DB ──────────────────────────────────────────────
  useEffect(() => {
    async function loadAll() {
      try {
        const [pRes, prRes, bRes, cRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/projects'),
          fetch('/api/blogs'),
          fetch('/api/contact'),
        ]);

        if (pRes.ok) setProducts(await pRes.json());
        if (prRes.ok) setProjects(await prRes.json());
        if (bRes.ok) setBlogs(await bRes.json());
        if (cRes.ok) setContactInfo(await cRes.json());
      } catch (err) {
        console.error('[StoneContext] Failed to load data from DB:', err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  // ─── Products CRUD ────────────────────────────────────────────────────────────
  const addProduct = useCallback(async (newProduct: Omit<Product, 'id'> & { id?: string }) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) throw new Error(await res.text());
    const created: Product = await res.json();
    setProducts((prev) => [...prev, created]);
  }, []);

  const editProduct = useCallback(async (id: string, updated: Partial<Product>) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error(await res.text());
    const saved: Product = await res.json();
    setProducts((prev) => prev.map((p) => (p.id === id ? saved : p)));
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ─── Projects CRUD ────────────────────────────────────────────────────────────
  const addProject = useCallback(async (newProject: Omit<Project, 'id'> & { id?: string }) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    if (!res.ok) throw new Error(await res.text());
    const created: Project = await res.json();
    setProjects((prev) => [...prev, created]);
  }, []);

  const editProject = useCallback(async (id: string, updated: Partial<Project>) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error(await res.text());
    const saved: Project = await res.json();
    setProjects((prev) => prev.map((p) => (p.id === id ? saved : p)));
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // ─── Blogs CRUD ───────────────────────────────────────────────────────────────
  const addBlog = useCallback(async (newBlog: Omit<Blog, 'id'> & { id?: string }) => {
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });
    if (!res.ok) throw new Error(await res.text());
    const created: Blog = await res.json();
    setBlogs((prev) => [...prev, created]);
  }, []);

  const editBlog = useCallback(async (id: string, updated: Partial<Blog>) => {
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) throw new Error(await res.text());
    const saved: Blog = await res.json();
    setBlogs((prev) => prev.map((b) => (b.id === id ? saved : b)));
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // ─── Contact Info Update ──────────────────────────────────────────────────────
  const updateContactInfo = useCallback(async (info: ContactInfo) => {
    const res = await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
    if (!res.ok) throw new Error(await res.text());
    const saved: ContactInfo = await res.json();
    setContactInfo(saved);
  }, []);

  return (
    <StoneContext.Provider
      value={{
        products,
        projects,
        blogs,
        contactInfo,
        loading,
        addProduct,
        editProduct,
        deleteProduct,
        addProject,
        editProject,
        deleteProject,
        addBlog,
        editBlog,
        deleteBlog,
        updateContactInfo,
      }}
    >
      {children}
    </StoneContext.Provider>
  );
}

export function useStoneContext() {
  const context = useContext(StoneContext);
  if (context === undefined) {
    throw new Error('useStoneContext must be used within a StoneProvider');
  }
  return context;
}
