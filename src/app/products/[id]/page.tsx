'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStoneContext } from '@/context/StoneContext';
import InquiryForm from '@/components/InquiryForm';
import { ArrowLeft, Globe, Shield, Sparkles, Check } from 'lucide-react';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { products } = useStoneContext();

  const id = params?.id as string;
  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState<string>('');
  const [thumbStart, setThumbStart] = useState(0);

  const THUMBS_VISIBLE = 3;

  // Update active image when product loads
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
      setThumbStart(0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>
          Stone Slab Not Found
        </h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          The requested stone slab could not be located in our active inventory.
        </p>
        <Link href="/products" className="btn-primary">
          Back to Inventory
        </Link>
      </div>
    );
  }

  const totalImages = product.images.length;
  const canScrollLeft = thumbStart > 0;
  const canScrollRight = thumbStart + THUMBS_VISIBLE < totalImages;

  const handleThumbLeft = () => setThumbStart((prev) => Math.max(0, prev - 1));
  const handleThumbRight = () =>
    setThumbStart((prev) => Math.min(Math.max(0, totalImages - THUMBS_VISIBLE), prev + 1));

  const visibleThumbs = product.images.slice(thumbStart, thumbStart + THUMBS_VISIBLE);

  return (
    <div className="container fade-in" style={{ padding: '3rem 2rem 6rem 2rem' }}>
      {/* Back & Breadcrumb navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: 600
          }}
        >
          <ArrowLeft size={16} /> Back to Gallery
        </button>

        <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link href="/">Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href="/products">Slabs</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{product.name}</span>
        </nav>
      </div>

      {/* Main Showcase Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        marginBottom: '5rem'
      }} className="showcase-grid">
        {/* Left Column: Image Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Main Active Slab Image — wide 16:9 landscape ratio */}
          <div style={{
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-premium)',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)',
            position: 'relative'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage || product.images[0]}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.4s ease' }}
            />
          </div>

          {/* Thumbnail Row with left/right arrows — always shows 3 */}
          {totalImages > 0 && (
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem' }}>
              {/* Left Arrow */}
              <button
                onClick={handleThumbLeft}
                disabled={!canScrollLeft}
                aria-label="Previous images"
                style={{
                  width: '40px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: canScrollLeft ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '2px',
                  cursor: canScrollLeft ? 'pointer' : 'default',
                  color: canScrollLeft ? 'var(--text-primary)' : 'var(--border-color)',
                  transition: 'all 0.2s ease',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                }}
              >
                ‹
              </button>

              {/* 3 Visible Thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', flex: 1 }}>
                {visibleThumbs.map((img, idx) => {
                  const realIdx = thumbStart + idx;
                  return (
                    <button
                      key={realIdx}
                      onClick={() => setActiveImage(img)}
                      style={{
                        aspectRatio: '16/9',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: activeImage === img ? '2px solid var(--gold)' : '1px solid var(--border-color)',
                        padding: 0,
                        transition: 'border-color 0.2s',
                        background: 'var(--bg-secondary)',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.name} detail ${realIdx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  );
                })}
                {/* Fill empty slots if fewer than 3 images visible */}
                {visibleThumbs.length < THUMBS_VISIBLE &&
                  Array.from({ length: THUMBS_VISIBLE - visibleThumbs.length }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      style={{
                        aspectRatio: '16/9',
                        background: 'var(--bg-secondary)',
                        border: '1px dashed var(--border-color)',
                        borderRadius: '2px',
                      }}
                    />
                  ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleThumbRight}
                disabled={!canScrollRight}
                aria-label="Next images"
                style={{
                  width: '40px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: canScrollRight ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '2px',
                  cursor: canScrollRight ? 'pointer' : 'default',
                  color: canScrollRight ? 'var(--text-primary)' : 'var(--border-color)',
                  transition: 'all 0.2s ease',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                }}
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Specifications & Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Stone Title Details */}
          <div>
            <span style={{
              fontSize: '0.8rem',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              {product.category} collection
            </span>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Globe size={14} style={{ color: 'var(--gold)' }} /> Origin: <strong>{product.origin}</strong>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Shield size={14} style={{ color: 'var(--gold)' }} /> Premium Quality Checked
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 600 }}>
              Slab Character & Geology
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {product.detailedDescription}
            </p>
          </div>

          {/* Spec details grid */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '4px',
            padding: '1.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }} className="spec-table">
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Finishes Available
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                {product.finishes.join(', ')}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Slab Thicknesses
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                {product.thickness.join(' / ')}
              </p>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                Architectural Applications
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0.2rem 0 0 0' }}>
                {product.applications.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details & Inquiries Dual Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem'
      }} className="inquiry-grid">
        {/* Left Side: Product Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{
              fontSize: '1.4rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Sparkles size={18} style={{ color: 'var(--gold)' }} />
              Export Sourcing Guarantee
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              PJ Stones guarantees that all shipped bundles of {product.name} meet architectural structural criteria:
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {product.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '4px' }} />
                  <span>{feat}</span>
                </li>
              ))}
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '4px' }} />
                <span>Calibrated thickness tolerance within +/- 1mm</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                <Check size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '4px' }} />
                <span>Reinforced fiber-mesh backing for transit safety</span>
              </li>
            </ul>
          </div>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--border-color)',
            padding: '1.5rem',
            borderRadius: '2px'
          }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              Logistics Notes for {product.category}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
              Standard loading is 7 to 8 bundles per 20ft container (approx. 400-450 sqm in 20mm thickness, or 280-300 sqm in 30mm thickness). Port departures are processed within 14 working days from invoice approval.
            </p>
          </div>
        </div>

        {/* Right Side: Inquiry Form */}
        <div>
          <InquiryForm productName={product.name} />
        </div>
      </div>

    </div>
  );
}
