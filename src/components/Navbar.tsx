'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, PhoneCall } from 'lucide-react';
import { CONTACT_INFO } from '../data/stoneData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/projects', label: 'Projects' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <>
      <header className="glass-panel" style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: 'var(--text-primary)'
            }}>
              PJ <span style={{ color: 'var(--gold)' }}>STONES</span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginTop: '-3px'
            }}>
              International
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                    padding: '0.5rem 0',
                  }}
                  className="nav-link"
                >
                  {link.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--gold-gradient)',
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions (Theme & CTA) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'background 0.3s'
              }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary desktop-cta"
              style={{
                display: 'none',
                padding: '0.6rem 1.2rem',
                fontSize: '0.75rem',
                gap: '0.4rem',
              }}
            >
              <PhoneCall size={14} />
              WhatsApp Inquiry
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem'
              }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            width: '100%',
            height: 'calc(100vh - var(--nav-height))',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
          }}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`glass-panel mobile-drawer ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          right: 0,
          width: '80%',
          maxWidth: '300px',
          height: 'calc(100vh - var(--nav-height))',
          zIndex: 100,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem 1.5rem',
          gap: '1.5rem',
          borderRight: 'none',
          borderBottom: 'none',
        }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-light)'
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            International Exports
          </p>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.8rem' }}
          >
            <PhoneCall size={16} />
            Direct WhatsApp
          </a>
        </div>
      </div>

    </>
  );
}
