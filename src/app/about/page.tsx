'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Anchor, Compass, Heart, Users, Check } from 'lucide-react';
import { CONTACT_INFO } from '@/data/stoneData';

export default function About() {
  const steps = [
    {
      title: 'Quarry Selection',
      desc: 'We procure raw material blocks directly from geological deposits in Brazil, Italy, and India. Only blocks showcasing natural pattern cohesion are chosen.'
    },
    {
      title: 'Diamond Gangsaw Slicing',
      desc: 'Blocks are sliced using state-of-the-art Italian machinery. This ensures uniform thickness and slab integrity, preventing micro-fractures.'
    },
    {
      title: 'Surface Finishing',
      desc: 'Slabs undergo computerized multi-head line polishing to achieve mirrors, velvet hones, or custom leathered textures as specified.'
    },
    {
      title: 'Double Quality Gate',
      desc: 'Every single slab is dry-laid and scanned under laboratory lighting. We check for thickness tolerance, veining continuity, and structural anomalies.'
    }
  ];

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '5rem' }}>
        <span className="subtitle">Who We Are</span>
        <h2>About PJ Stones</h2>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'center',
        marginBottom: '6rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '2rem',
            fontFamily: 'var(--font-serif)',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Establishing Sourcing Trust for Global Landmarks
          </h3>
          <p style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)' }}>
            Founded with the singular vision of making premium, rare natural stones accessible to global developers, PJ Stones has grown into an international sourcing powerhouse. We operate at the intersection of geological expertise and premium service.
          </p>
          <p style={{ marginBottom: '1.2rem', color: 'var(--text-secondary)' }}>
            Our business model cuts out middle-men. By inspecting blocks directly at source quarries and controlling the polishing process ourselves, we guarantee that the material specified is exactly the material delivered.
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Whether shipping to high-rise projects in New York, custom residential villas in Palm Jumeirah Dubai, or waterside estates in Sydney, our logistics network provides seamless door-to-door delivery.
          </p>
        </div>

        {/* Big Photography Frame */}
        <div style={{
          position: 'relative',
          height: '450px',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-premium)',
          border: '1px solid var(--border-color)'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
            alt="Premium stone cutting warehouse"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
            background: 'rgba(28, 27, 24, 0.95)',
            border: '1px solid var(--border-color)',
            padding: '1.5rem',
            color: '#ffffff',
            borderRadius: '2px'
          }}>
            <h4 style={{ color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.2rem' }}>
              Direct Quarry Sourcing
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#e2dfd8', margin: 0 }}>
              Inspected, processed, and bundled under strict European supervision.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values / Pillar Section */}
      <section style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '4px',
        padding: '4rem 3rem',
        marginBottom: '6rem'
      }}>
        <h3 style={{
          textAlign: 'center',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          marginBottom: '3rem'
        }}>
          Our Sourcing Philosophy
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Anchor size={24} style={{ color: 'var(--gold)' }} />
            <h4 style={{ fontSize: '1.1rem' }}>Global Logistics Guarantee</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Full compliance with FOB, CFR, and CIF shipping protocols. We coordinate customs declarations, harbor handling, and sea-freight booking.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Compass size={24} style={{ color: 'var(--gold)' }} />
            <h4 style={{ fontSize: '1.1rem' }}>Sourcing Integrity</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Ethically sourced stones. We ensure all associated partner quarries observe fair labor standards and sustainable excavation policies.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <ShieldCheck size={24} style={{ color: 'var(--gold)' }} />
            <h4 style={{ fontSize: '1.1rem' }}>Architectural Collaboration</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              We collaborate directly with architectural firms, supplying high-resolution CAD files, physical samples, and layout test alignments.
            </p>
          </div>
        </div>
      </section>

      {/* Slicing Process Step-by-Step */}
      <div style={{ marginBottom: '6rem' }}>
        <div className="section-header" style={{ marginBottom: '4rem' }}>
          <span className="subtitle">The Quality Journey</span>
          <h2>Processing Timeline</h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>
          {steps.map((step, idx) => (
            <div key={idx} className="glass-panel" style={{
              padding: '2rem',
              borderRadius: '2px',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <span style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                fontSize: '2.5rem',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'rgba(188, 163, 116, 0.15)'
              }}>
                0{idx + 1}
              </span>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem', color: 'var(--text-primary)', paddingRight: '2rem' }}>
                {step.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Target Market Focus Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        alignItems: 'center'
      }}>
        <div style={{
          height: '350px',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-premium)',
          border: '1px solid var(--border-color)'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80"
            alt="Polished stone warehouse blocks"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div>
          <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
            International Trade Compliance
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            PJ Stones maintains complete certification required for shipping to our major market territories. We compile and dispatch all crucial import paperwork:
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Check size={16} style={{ color: 'var(--gold)' }} />
              Fumigation and Phytosanitary Certificates
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Check size={16} style={{ color: 'var(--gold)' }} />
              Certificate of Origin (COO) for tax exemptions
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Check size={16} style={{ color: 'var(--gold)' }} />
              Material Safety Data Sheets (MSDS)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <Check size={16} style={{ color: 'var(--gold)' }} />
              Detailed Commercial Invoices & Packing Lists
            </li>
          </ul>
          <Link href="/contact" className="btn-primary">
            Contact Export Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
