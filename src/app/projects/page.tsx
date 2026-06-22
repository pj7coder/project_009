'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStoneContext } from '@/context/StoneContext';
import { MapPin, Calendar, Sparkles, Box, ArrowRight } from 'lucide-react';

export default function Projects() {
  const { projects } = useStoneContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const categories = React.useMemo(() => {
    const uniq = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...uniq];
  }, [projects]);

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="subtitle">Global Portfolio</span>
        <h2>Architectural Sourcing Reference</h2>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.8rem',
        marginBottom: '4rem',
        flexWrap: 'wrap'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            style={{
              background: selectedCategory === cat ? 'var(--gold-gradient)' : 'transparent',
              color: selectedCategory === cat ? '#1c1b18' : 'var(--text-secondary)',
              border: '1px solid',
              borderColor: selectedCategory === cat ? 'var(--gold)' : 'var(--border-color)',
              padding: '0.5rem 1.5rem',
              borderRadius: '2px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5rem'
        }}>
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '4rem',
                  alignItems: 'center',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '4rem'
                }}
                className="project-row"
              >
                {/* Left/Right swapping depending on index for grid layout design */}
                <div style={{
                  order: isEven ? 1 : 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }} className="project-text-col">
                  <div>
                    <span style={{
                      color: 'var(--gold)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.5rem'
                    }}>
                      {project.category}
                    </span>
                    <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <MapPin size={14} style={{ color: 'var(--gold)' }} /> {project.location}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <Calendar size={14} style={{ color: 'var(--gold)' }} /> Completed: {project.year}
                      </span>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {project.description}
                  </p>

                  {/* Stones Used indicators */}
                  <div>
                    <span style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--text-muted)',
                      display: 'block',
                      marginBottom: '0.6rem'
                    }}>
                      Specified Stones Supplied:
                    </span>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                      {project.stoneUsed.map((stone) => (
                        <span
                          key={stone}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.8rem',
                            padding: '0.3rem 0.8rem',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '2px',
                            color: 'var(--text-primary)',
                            fontWeight: 600
                          }}
                        >
                          <Box size={12} style={{ color: 'var(--gold)' }} />
                          {stone}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: '0.5rem' }}>
                    <Link href="/contact" className="btn-secondary" style={{ padding: '0.8rem 1.8rem', fontSize: '0.75rem' }}>
                      Inquire About Similar Specifications
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div style={{
                  order: isEven ? 2 : 1,
                  position: 'relative',
                  height: '420px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-premium)',
                  border: '1px solid var(--border-color)'
                }} className="project-image-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {project.images.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      background: 'rgba(28,27,24,0.85)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--gold-light)',
                      fontSize: '0.7rem',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '2px',
                      textTransform: 'uppercase',
                      fontWeight: 600
                    }}>
                      +{project.images.length - 1} Detail Photos
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 0',
          border: '1px dashed var(--border-color)',
          borderRadius: '4px',
          background: 'var(--bg-secondary)'
        }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            No showcase projects matching this category are currently available.
          </p>
        </div>
      )}
    </div>
  );
}
