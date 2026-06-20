'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/stoneData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '5rem 0 2rem 0',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Company Bio */}
          <div>
            <Link href="/" style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'var(--text-primary)'
              }}>
                PJ <span style={{ color: 'var(--gold)' }}>STONES</span>
              </span>
              <span style={{
                fontSize: '0.7rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: '-3px'
              }}>
                Luxury Natural Stone exporter
              </span>
            </Link>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              We extract, refine, and export premium-grade Quartzite, Marble, and Granite to global standards. Serving architects, designers, and developers worldwide.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CONTACT_INFO.targetMarkets.map((market) => (
                <span
                  key={market}
                  style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '0.3rem 0.6rem',
                    background: 'var(--bg-tertiary)',
                    borderRadius: '2px',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    border: '1px solid var(--border-light)'
                  }}
                >
                  {market}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link href="/" style={{ fontSize: '0.95rem' }} className="footer-link">Home</Link></li>
              <li><Link href="/about" style={{ fontSize: '0.95rem' }} className="footer-link">About Us</Link></li>
              <li><Link href="/products" style={{ fontSize: '0.95rem' }} className="footer-link">Stone Collection</Link></li>
              <li><Link href="/projects" style={{ fontSize: '0.95rem' }} className="footer-link">Project Gallery</Link></li>
              <li><Link href="/blogs" style={{ fontSize: '0.95rem' }} className="footer-link">Blogs & Guides</Link></li>
              <li><Link href="/contact" style={{ fontSize: '0.95rem' }} className="footer-link">Contact Us</Link></li>
              <li><Link href="/admin" style={{ fontSize: '0.95rem' }} className="footer-link">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}>
              Head Office & Exports
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <a href={`mailto:${CONTACT_INFO.email}`} style={{ fontSize: '0.95rem' }} className="footer-link">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                <a href={`tel:${CONTACT_INFO.phone}`} style={{ fontSize: '0.95rem' }} className="footer-link">
                  {CONTACT_INFO.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Quick Call-to-action */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600
            }}>
              Instant Support
            </h4>
            <p style={{ fontSize: '0.95rem', marginBottom: '1.2rem' }}>
              Have an urgent requirement or custom project specification? Talk to our export desk directly.
            </p>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hello,%20I%20am%20interested%20in%20importing%20premium%20stones.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.8rem',
                fontSize: '0.8rem',
                display: 'inline-flex',
                gap: '0.5rem',
                backgroundColor: '#25D366'
              }}
            >
              <MessageSquare size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <span>
            © {currentYear} PJ STONES. All rights reserved.
          </span>
          <span style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/privacy" className="footer-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-link">Terms of Service</Link>
          </span>
        </div>
      </div>

      <style jsx>{`
        .footer-link:hover {
          color: var(--gold) !important;
          padding-left: 3px;
        }
      `}</style>
    </footer>
  );
}
