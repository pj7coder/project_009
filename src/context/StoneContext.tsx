'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Project, Blog, INITIAL_PRODUCTS, INITIAL_PROJECTS, INITIAL_BLOGS } from '../data/stoneData';

interface StoneContextType {
  products: Product[];
  projects: Project[];
  blogs: Blog[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => void;
  editProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProject: (project: Omit<Project, 'id'> & { id?: string }) => void;
  editProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addBlog: (blog: Omit<Blog, 'id'> & { id?: string }) => void;
  editBlog: (id: string, updated: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
}

const StoneContext = createContext<StoneContextType | undefined>(undefined);

export function StoneProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only access localStorage in client browser
    const storedProducts = localStorage.getItem('pj_products');
    const storedProjects = localStorage.getItem('pj_projects');
    const storedBlogs = localStorage.getItem('pj_blogs');

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('pj_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('pj_projects', JSON.stringify(INITIAL_PROJECTS));
    }

    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    } else {
      setBlogs(INITIAL_BLOGS);
      localStorage.setItem('pj_blogs', JSON.stringify(INITIAL_BLOGS));
    }

    setInitialized(true);
  }, []);

  // Sync to local storage on changes (only after initial load)
  useEffect(() => {
    if (initialized) {
      localStorage.setItem('pj_products', JSON.stringify(products));
    }
  }, [products, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('pj_projects', JSON.stringify(projects));
    }
  }, [projects, initialized]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('pj_blogs', JSON.stringify(blogs));
    }
  }, [blogs, initialized]);

  // CRUD actions for Products
  const addProduct = (newProduct: Omit<Product, 'id'> & { id?: string }) => {
    const id = newProduct.id || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const productWithId: Product = { ...newProduct, id };
    setProducts((prev) => [...prev, productWithId]);
  };

  const editProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // CRUD actions for Projects
  const addProject = (newProject: Omit<Project, 'id'> & { id?: string }) => {
    const id = newProject.id || newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const projectWithId: Project = { ...newProject, id };
    setProjects((prev) => [...prev, projectWithId]);
  };

  const editProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // CRUD actions for Blogs
  const addBlog = (newBlog: Omit<Blog, 'id'> & { id?: string }) => {
    const id = newBlog.id || newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blogWithId: Blog = { ...newBlog, id };
    setBlogs((prev) => [...prev, blogWithId]);
  };

  const editBlog = (id: string, updated: Partial<Blog>) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <StoneContext.Provider
      value={{
        products,
        projects,
        blogs,
        addProduct,
        editProduct,
        deleteProduct,
        addProject,
        editProject,
        deleteProject,
        addBlog,
        editBlog,
        deleteBlog,
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
