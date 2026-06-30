import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Compass } from 'lucide-react';

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsappIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const API_BASE = 'https://ngo-backend-production-b2ee.up.railway.app/api';

export default function Contact({ setActivePage, triggerToast }) {
  const [contactConfig, setContactConfig] = useState({
    address: 'Plot No. 42, Art Colony, Jubilee Hills, Hyderabad - 500033',
    phone: '+91 98765 43210',
    email: 'info@masterbrush.org',
    mapUrl: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Class Enquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_BASE}/contact`);
        const json = await res.json();
        if (json.success && json.data) {
          setContactConfig(json.data);
        }
      } catch (err) {
        console.error("Error fetching contact details:", err);
      }
    };
    fetchContact();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      triggerToast('Please complete all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        triggerToast(data.message || 'Message sent successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: 'Class Enquiry',
          message: ''
        });
      } else {
        triggerToast(data.message || 'Failed to send message');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error, message not sent.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Contact Us</span></div>
          <h1 className="display-hero">Contact Us</h1>
          <p>We'd love to hear from you. Reach out for classes, collaborations or just to say hello!</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <p className="eyebrow">Get in Touch</p>
              <h2 className="display-section mb-6" style={{ fontSize: '1.8rem' }}>We're Here for You</h2>

              <div className="contact-item">
                <div className="contact-item-icon"><Phone size={18} /></div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <div className="contact-item-value">{contactConfig.phone}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><Mail size={18} /></div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-value">{contactConfig.email}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><MapPin size={18} /></div>
                <div>
                  <div className="contact-item-label">Address</div>
                  <div className="contact-item-value">{contactConfig.address}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><Clock size={18} /></div>
                <div>
                  <div className="contact-item-label">Hours</div>
                  <div className="contact-item-value">Mon–Sat: 9:00 AM – 6:00 PM</div>
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <p className="eyebrow" style={{ marginBottom: '14px' }}>Follow Us</p>
                <div className="social-row">
                  <a className="social-btn" style={{ background: 'rgba(26,26,78,0.08)', color: 'var(--navy)' }} href="#"><FacebookIcon size={16} /></a>
                  <a className="social-btn" style={{ background: 'rgba(226,91,139,0.1)', color: 'var(--pink)' }} href="#"><InstagramIcon size={16} /></a>
                  <a className="social-btn" style={{ background: 'rgba(224,42,42,0.1)', color: '#E42020' }} href="#"><YoutubeIcon size={16} /></a>
                  <a className="social-btn" style={{ background: 'rgba(224,42,42,0.08)', color: '#E42020' }} href="#"><Compass size={16} /></a>
                  <a className="social-btn" style={{ background: 'rgba(43,175,138,0.1)', color: 'var(--green)' }} href="#"><WhatsappIcon size={16} /></a>
                </div>
              </div>

              {/* Map placeholder */}
              {contactConfig.mapUrl ? (
                <div style={{ marginTop: '28px', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '200px', border: '1px solid var(--border-soft)' }}>
                  <iframe 
                    title="MasterBrush Location Map"
                    src={contactConfig.mapUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                  />
                </div>
              ) : (
                <div style={{ marginTop: '28px', borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '200px', background: 'var(--cream-warm)', border: '1px solid var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}><MapPin size={32} style={{ color: 'var(--saffron)' }} /></div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', fontWeight: 600 }}>{contactConfig.address}</div>
                </div>
              )}
            </div>

            <div className="contact-form">
              <h3 style={{ fontSize: '1.3rem', marginBottom: '6px', fontFamily: "'Playfair Display',serif" }}>Send Us a Message</h3>
              <p style={{ fontSize: '0.85rem', marginBottom: '24px', color: 'var(--text-mid)' }}>Fill in the form and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Enter your name" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="+91 00000 00000" 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="your@email.com" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Subject *</label>
                  <select name="subject" value={formData.subject} onChange={handleInputChange}>
                    <option value="Class Enquiry">Class Enquiry</option>
                    <option value="Donation / Sponsorship">Donation / Sponsorship</option>
                    <option value="Custom Artwork Order">Custom Artwork Order</option>
                    <option value="Exhibition / Event">Exhibition / Event</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Tell us what you have in mind..." 
                    required 
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
