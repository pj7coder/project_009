'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, CheckCircle, MessageSquare } from 'lucide-react';
import { useStoneContext } from '@/context/StoneContext';

export default function Contact() {
  const { contactInfo } = useStoneContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    market: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);

      // WhatsApp format
      const waText = `*GENERAL CONTACT REQUEST*
------------------------------
*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}
*Region:* ${formData.market}
*Message:* ${formData.message}`;

      const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(waText)}`;
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="container fade-in" style={{ padding: '4rem 2rem 6rem 2rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="subtitle">Let's Connect</span>
        <h2>Consult Our Sourcing Team</h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }} className="contact-grid">
        {/* Left Column: Coordinates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Export Logistics Head Office
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              We coordinates all global operations, shipping logistics, and customs documentation from our central office. Our communication desks respond in English, Hindi, and Arabic.
            </p>
          </div>

          {/* Icon details card */}
          <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <MapPin size={22} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Address</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: '0.2rem 0 0 0', lineHeight: '1.4' }}>
                  {contactInfo.address}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Mail size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Email Coordinates</h4>
                <a href={`mailto:${contactInfo.email}`} style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Phone size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>Phone / WhatsApp</h4>
                <a href={`tel:${contactInfo.phone}`} style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Export hubs */}
          <div>
            <h4 style={{
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              fontWeight: 600
            }}>
              International Port Clearances
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Globe size={14} style={{ color: 'var(--gold)' }} />
                <span>Mudra Port, India (FOB)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Globe size={14} style={{ color: 'var(--gold)' }} />
                <span>Port of Santos, Brazil</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Globe size={14} style={{ color: 'var(--gold)' }} />
                <span>Port of Carrara, Italy</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Globe size={14} style={{ color: 'var(--gold)' }} />
                <span>Global CIF delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div>
          {!isSubmitted ? (
            <div className="glass-panel" style={{
              padding: '2.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-premium)'
            }}>
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  Submit General Inquiry
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Complete the fields below to dispatch your message to our export office and open direct WhatsApp.
                </p>

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="john.doe@architects.com"
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }} className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject">Subject / Project *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. Hotel Lobby slabs"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="market">Your Region *</label>
                    <select
                      id="market"
                      name="market"
                      required
                      value={formData.market}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Region</option>
                      {contactInfo.targetMarkets.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                      <option value="Other">Other Region</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="form-textarea"
                    placeholder="Outline your detailed specifications or delivery timeline requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.2)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem'
                  }}
                >
                  {loading ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <MessageSquare size={16} />
                      Submit & Open Chat
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="glass-panel" style={{
              padding: '4rem 2.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-premium)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <CheckCircle size={56} style={{ color: 'var(--gold)' }} />
              <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>Message Sent!</h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                maxWidth: '400px',
                margin: 0
              }}>
                Thank you for contacting PJ Stones. A copy of this inquiry has been routed to <strong>{contactInfo.email}</strong>. Our logistics team will call or message you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary"
                style={{ marginTop: '1.5rem', padding: '0.8rem 1.8rem' }}
              >
                Send New Message
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Styled Location Map/Transit routes visualizer placeholder */}
      <div style={{ marginTop: '6rem' }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-serif)',
          color: 'var(--text-primary)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          Global Sourcing Routes
        </h3>
        <div style={{
          height: '350px',
          width: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-premium)'
        }}>
          {/* Subtle grid pattern background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(var(--border-color) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
            opacity: 0.5
          }} />
          
          <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <Globe size={48} style={{ color: 'var(--gold)', animation: 'spin 120s linear infinite' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', marginTop: '1rem' }}>
              Jaipur, India Export Center
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '500px', lineHeight: '1.5' }}>
              Processing Hub: NH-8 Industrial Corridor, Jaipur, Rajasthan. Port of Departure: Mundra (Gujarat) for transit to USA, UAE, Europe, and Australia.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-primary)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
                Transit to NYC: ~28 Days
              </span>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-primary)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
                Transit to Rotterdam: ~24 Days
              </span>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-primary)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
                Transit to Jebel Ali: ~6 Days
              </span>
              <span style={{ fontSize: '0.75rem', background: 'var(--bg-primary)', padding: '0.3rem 0.6rem', border: '1px solid var(--border-color)', borderRadius: '2px' }}>
                Transit to Melbourne: ~32 Days
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
