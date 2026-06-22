'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, MessageSquare } from 'lucide-react';
import { useStoneContext } from '../context/StoneContext';

interface InquiryFormProps {
  productName: string;
}

export default function InquiryForm({ productName }: InquiryFormProps) {
  const { contactInfo } = useStoneContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    quantity: '',
    message: '',
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

    // Simulate sending lead email to pj7coding@gmail.com
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);

      // Construct WhatsApp message URL
      const waText = `*INQUIRY FOR: ${productName}*
------------------------------
*Buyer Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Country/Region:* ${formData.location}
*Req. Quantity:* ${formData.quantity}
*Message:* ${formData.message}`;

      const encodedText = encodeURIComponent(waText);
      const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodedText}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <div className="glass-panel" style={{
      padding: '2.5rem',
      borderRadius: '4px',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-premium)'
    }}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h3 style={{
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Request Export Quote
          </h3>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '1.8rem',
            lineHeight: '1.4'
          }}>
            Complete the form below. Submission will open direct WhatsApp chat to secure priority pricing for international logistics.
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
              placeholder="e.g. John Smith"
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }} className="form-row">
            <div className="form-group">
              <label htmlFor="email">Work Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone / WhatsApp *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+1 (555) 019-2834"
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }} className="form-row">
            <div className="form-group">
              <label htmlFor="location">Target Market / Country *</label>
              <select
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Destination</option>
                <option value="USA">United States (USA)</option>
                <option value="Europe">Europe</option>
                <option value="UAE">United Arab Emirates (UAE)</option>
                <option value="Australia">Australia</option>
                <option value="Southeast Asia">Southeast Asia</option>
                <option value="Other">Other Region</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Est. Volume (Sq. Ft / Sq. M) *</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                required
                value={formData.quantity}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g. 5000 Sq. Ft"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="message">Custom Requirements & Logistics Details</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="form-textarea"
              placeholder="Specify custom edge profiles, surface finishes, or desired harbor destination details here..."
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
              <span>Preparing Quote...</span>
            ) : (
              <>
                <MessageSquare size={16} />
                Send Inquiry to WhatsApp
              </>
            )}
          </button>
        </form>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <CheckCircle size={56} style={{ color: 'var(--gold)' }} />
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>Inquiry Submitted!</h3>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            maxWidth: '400px'
          }}>
            Your request for <strong>{productName}</strong> has been logged. An email copy has been dispatched to <strong>{contactInfo.email}</strong>, and your WhatsApp chat redirection is active.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                location: '',
                quantity: '',
                message: '',
              });
            }}
            className="btn-secondary"
            style={{ marginTop: '1.5rem', padding: '0.8rem 1.8rem' }}
          >
            Submit Another Inquiry
          </button>
        </div>
      )}

    </div>
  );
}
