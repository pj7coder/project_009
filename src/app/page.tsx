'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStoneContext } from '@/context/StoneContext';
import { ArrowRight, ShieldCheck, Globe, Award, Sparkles, MessageSquare } from 'lucide-react';

export default function Home() {
  const { products, projects, contactInfo } = useStoneContext();
  // Show first 6 products as featured
  const featuredProducts = products.slice(0, 6);

  const stats = [
    { value: '15+', label: 'Countries Supplied' },
    { value: '200+', label: 'Projects Completed' },
    { value: '3', label: 'Dedicated Quarries' },
    { value: '100%', label: 'Quality Inspection' }
  ];

  const markets = [
    { code: 'USA', name: 'North America' },
    { code: 'Europe', name: 'Western Europe' },
    { code: 'UAE', name: 'Middle East / Dubai' },
    { code: 'Australia', name: 'Oceania' },
    { code: 'Southeast Asia', name: 'ASEAN Region' }
  ];

  return (
    <div className="fade-in">
      {/* 1. Hero Section */}
      <section style={{
        position: 'relative',
        height: '85vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(28, 27, 24, 0.45), rgba(28, 27, 24, 0.65)), url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.5rem',
          maxWidth: '800px',
          zIndex: 10
        }}>
          <span style={{
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            fontSize: '0.85rem',
            color: 'var(--gold-light)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Sparkles size={16} /> Elite Architectural Materials
          </span>
          <h1 style={{
            fontSize: 'calc(2.2rem + 2vw)',
            fontFamily: 'var(--font-serif)',
            lineHeight: '1.15',
            color: '#ffffff'
          }}>
            Bespoke Slabs of <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Quartzite</span>, Marble & Granite
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#e2dfd8',
            maxWidth: '650px',
            lineHeight: '1.6'
          }}>
            PJ Stones exports premium natural stone blocks and custom-cut slabs directly from premium quarries in India, Brazil, and Italy to builders worldwide.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem',
            width: '100%',
            flexWrap: 'wrap'
          }} className="hero-ctas">
            <Link href="/products" className="btn-primary">
              Explore Collections <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
              Request Price List
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Global Trust / Target Markets Band */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '2rem 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Globe size={24} style={{ color: 'var(--gold)' }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Verified Exporter
              </h4>
              <p style={{ fontSize: '0.8rem', margin: 0, color: 'var(--text-muted)' }}>
                FOB & CIF Logistics Worldwide
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }} className="market-badges">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Core Markets:
            </span>
            {markets.map((m) => (
              <div
                key={m.code}
                style={{
                  padding: '0.4rem 0.8rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--gold)' }}>{m.code}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Pillars / Value Proposition */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Why Select PJ Stones?</span>
            <h2>Architectural Sourcing Standards</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginTop: '3rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--bg-secondary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                border: '1px solid var(--border-color)'
              }}>
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>First-Grade Block Selection</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                We inspect every stone block directly at the quarry. Only blocks with flawless crystalline structures and balanced veining pattern distributions are approved for export.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--bg-secondary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                border: '1px solid var(--border-color)'
              }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>Guaranteed Thickness Tolerances</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Utilizing state-of-the-art Italian gang saws, we guarantee thickness tolerances within +/- 1mm, ensuring flawless joints and edge matching during installation.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--bg-secondary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                border: '1px solid var(--border-color)'
              }}>
                <Globe size={28} />
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>Seaworthy Protective Packaging</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Slabs are bundled in heavy-duty, fumigated wooden A-frames. Edges are padded, and bundles are braced in shipping containers to assure arrival in pristine condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Collections & Tab Filter */}
      <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Premium Natural Stones</span>
            <h2>Browse Featured Collection</h2>
          </div>

          {/* Product Grid */}
          <div className="stone-grid">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-panel"
                style={{
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  border: '1px solid var(--border-color)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(28, 27, 24, 0.85)',
                    color: 'var(--gold-light)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '2px',
                    fontWeight: 600
                  }}>
                    {product.category}
                  </span>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '0.8rem' }}>
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                    {product.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-light)',
                    paddingTop: '1rem',
                    marginTop: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Origin: {product.origin.split(' ')[0]}
                    </span>
                    <Link
                      href={`/products/${product.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--gold)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/products" className="btn-secondary">
              View Entire Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Key Statistics Ribbon */}
      <section style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '5rem 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            textAlign: 'center'
          }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '3.2rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  background: 'var(--gold-gradient)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {stat.value}
                </span>
                <span style={{
                  textTransform: 'uppercase',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  color: 'var(--text-secondary)',
                  fontWeight: 600
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Featured Architectural Projects */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">Reference Projects</span>
            <h2>Architectural Showcase</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            marginTop: '3rem'
          }} className="project-grid">
            {projects.slice(0, 2).map((project) => (
              <div
                key={project.id}
                style={{
                  position: 'relative',
                  height: '420px',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-premium)',
                  cursor: 'pointer'
                }}
                className="project-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.images[0]}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="project-img"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 10, 9, 0.95) 0%, rgba(10, 10, 9, 0.6) 50%, rgba(10, 10, 9, 0) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2.5rem',
                  color: '#ffffff'
                }}>
                  <span style={{
                    color: 'var(--gold-light)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    marginBottom: '0.5rem'
                  }}>
                    {project.category} — {project.location}
                  </span>
                  <h3 style={{
                    fontSize: '1.6rem',
                    fontFamily: 'var(--font-serif)',
                    marginBottom: '0.8rem',
                    color: '#ffffff'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#dedcd4',
                    lineHeight: '1.5',
                    marginBottom: '1rem'
                  }}>
                    {project.description.slice(0, 120)}...
                  </p>
                  <Link
                    href="/projects"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--gold-light)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    View Project Slabs <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Call To Action (Establish Trust & Lead Capture) */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '6rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2.4rem' }}>Consult Our Stone Export Desk</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '600px' }}>
            Interested in sourcing slabs for commercial or high-end residential builds? Let our experts guide you on logistics, sizing, and custom finishes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/contact" className="btn-primary">
              Request Free Consultation
            </Link>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=Hello,%20I%20would%20like%20to%20request%20a%20stone%20export%20catalogue.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <MessageSquare size={16} />
              WhatsApp Catalog
            </a>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Average reply time: Under 15 minutes. Or email directly to <strong>{contactInfo.email}</strong>.
          </span>
        </div>
      </section>


    </div>
  );
}
