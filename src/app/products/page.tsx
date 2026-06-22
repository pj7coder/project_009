'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStoneContext } from '@/context/StoneContext';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';

export default function Products() {
  const { products } = useStoneContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(products.map((p) => p.category)));
    return ['All', ...uniq];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="subtitle">Curated Slab Library</span>
        <h2>Premium Natural Stones</h2>
      </div>

      {/* Search and Filter Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginBottom: '4rem'
      }}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="Search stone by name, origin, or properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '1.1rem 1.5rem 1.1rem 3.2rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-premium)',
              transition: 'all 0.3s ease'
            }}
          />
          <Search size={18} style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} />
        </div>

        {/* Category Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.8rem',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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
      </div>

      {/* Inventory Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border-light)',
        paddingBottom: '1rem'
      }}>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredProducts.length}</strong> premium slabs
        </p>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>
          <SlidersHorizontal size={14} /> Global Sourcing Specifications
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="stone-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-panel"
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-color)'
              }}
            >
              {/* Product Image */}
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  className="card-zoom-img"
                />
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(28, 27, 24, 0.9)',
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

              {/* Product Details */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    {product.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Origin: <strong>{product.origin}</strong>
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', flexGrow: 1 }}>
                  {product.description}
                </p>

                {/* Finishes Badges */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {product.finishes.slice(0, 3).map((finish) => (
                    <span
                      key={finish}
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.5rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '2px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {finish}
                    </span>
                  ))}
                  {product.finishes.length > 3 && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                      +{product.finishes.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action button */}
                <div style={{
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1.2rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Thickness: {product.thickness.join(' / ')}
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
                    View Slabs <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
            No premium slabs match your search query.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            style={{
              marginTop: '1rem',
              background: 'transparent',
              border: '1px solid var(--gold)',
              color: 'var(--text-primary)',
              padding: '0.5rem 1.5rem',
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              fontWeight: 600
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
