'use client';

import React, { useState } from 'react';
import { useStoneContext } from '@/context/StoneContext';
import { Blog } from '@/data/stoneData';
import { Calendar, User, Clock, ArrowRight, X, BookOpen } from 'lucide-react';

export default function Blogs() {
  const { blogs } = useStoneContext();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="subtitle">Insights & Knowledge</span>
        <h2>Stone Guides & Industry Trends</h2>
      </div>

      {/* Blogs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem'
      }}>
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="glass-panel"
            style={{
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--border-color)',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedBlog(blog)}
          >
            {/* Header Image */}
            <div style={{ height: '220px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                className="card-zoom-img"
              />
            </div>

            {/* Content info */}
            <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.8rem' }}>
              {/* Metadata */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                alignItems: 'center'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Calendar size={12} /> {blog.date}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                  <User size={12} /> By {blog.author}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.4rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                lineHeight: '1.3'
              }}>
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                flexGrow: 1
              }}>
                {blog.summary}
              </p>

              {/* Tags Row */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '2px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read button link */}
              <div style={{
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1rem',
                marginTop: '0.5rem',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dynamic Modal / Overlay Viewer */}
      {selectedBlog && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 10, 9, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem 1rem'
        }} onClick={() => setSelectedBlog(null)}>
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              position: 'relative',
              boxShadow: 'var(--shadow-premium)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(28,27,24,0.85)',
                border: '1px solid var(--border-color)',
                color: 'var(--gold-light)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
              aria-label="Close article"
            >
              <X size={20} />
            </button>

            {/* Article Image Banner */}
            <div style={{ height: '300px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Article content info */}
            <div style={{ padding: '2rem 1.5rem' }}>
              {/* Metadata */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> {selectedBlog.date}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={14} /> By {selectedBlog.author}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> 5 min read
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-primary)',
                marginBottom: '1.5rem',
                lineHeight: '1.25'
              }}>
                {selectedBlog.title}
              </h2>

              {/* Excerpt panel */}
              <blockquote style={{
                borderLeft: '3px solid var(--gold)',
                paddingLeft: '1.25rem',
                fontSize: '1.05rem',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                {selectedBlog.summary}
              </blockquote>

              {/* Main Content Body with simple markdown parsing for line breaks/headers */}
              <div style={{
                fontSize: '1rem',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem'
              }}>
                {selectedBlog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h4 key={index} style={{
                        fontSize: '1.3rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--text-primary)',
                        marginTop: '1.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {paragraph.replace('### ', '')}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h3 key={index} style={{
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-serif)',
                        color: 'var(--text-primary)',
                        marginTop: '1.8rem',
                        marginBottom: '0.5rem'
                      }}>
                        {paragraph.replace('## ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                    const parts = paragraph.split('\n');
                    return (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.5rem 0' }}>
                        {parts.map((p, pIdx) => (
                          <div key={pIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{p.substring(0, 3)}</span>
                            <span>{p.substring(3)}</span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p key={index} style={{ margin: 0 }}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
