import React, { useState, useEffect } from 'react';
import { Image, PenTool, Trees, Trophy, Calendar, MapPin } from 'lucide-react';

const API_BASE = 'https://ngo-backend-production-b2ee.up.railway.app/api';

export default function Events({ setActivePage, triggerToast }) {
  const [dbEvents, setDbEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/events`);
        const json = await res.json();
        if (json.success && json.data) {
          setDbEvents(json.data);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getEventIcon = (category) => {
    switch (category) {
      case 'Exhibition': return <Image size={48} style={{ color: 'var(--saffron)' }} />;
      case 'Workshop': return <PenTool size={48} style={{ color: 'var(--pink)' }} />;
      case 'Retreat': return <Trees size={48} style={{ color: 'var(--green)' }} />;
      default: return <Trophy size={48} style={{ color: 'var(--purple)' }} />;
    }
  };

  const getEventColorClass = (category) => {
    switch (category) {
      case 'Exhibition': return 'icon-saffron';
      case 'Workshop': return 'icon-pink';
      case 'Retreat': return 'icon-green';
      default: return 'icon-purple';
    }
  };

  const activeEvents = dbEvents.map(e => ({
    id: e._id || e.id,
    type: e.category,
    title: e.title,
    date: e.date,
    location: e.location,
    description: e.description,
    icon: e.image ? (
      <img src={e.image} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : getEventIcon(e.category),
    colorClass: e.image ? '' : getEventColorClass(e.category),
    useImage: !!e.image
  }));

  const getEventBadgeClass = (category) => {
    switch (category) {
      case 'Exhibition': return 'status-pending';
      case 'Workshop': return 'status-shipped';
      default: return 'status-completed';
    }
  };

  const handleRegisterClick = (eventTitle) => {
    setSelectedEvent(eventTitle);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      triggerToast('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ageGroup: 'Event Registration',
          program: `Event: ${selectedEvent}`
        })
      });
      const data = await response.json();
      
      if (data.success) {
        triggerToast(`Successfully registered for ${selectedEvent}!`);
        setFormData({ name: '', email: '', phone: '' });
        setSelectedEvent(null);
      } else {
        triggerToast(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error, could not register.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Events</span></div>
          <h1 className="display-hero">Events</h1>
          <p>Join our creative gatherings, workshops, exhibitions and competitions.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Upcoming Events</p>
            <h2 className="display-section">What's Happening at MasterBrush</h2>
          </div>

          <div className="events-grid">
            {loading ? (
              <p style={{ textAlign: 'center', padding: '48px', gridColumn: '1 / -1', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading events from database...</p>
            ) : activeEvents.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '48px', gridColumn: '1 / -1', color: 'var(--text-light)' }}>No upcoming events scheduled. Add new promos via the Admin dashboard.</p>
            ) : activeEvents.map(event => (
              <div key={event.id} style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ height: '180px', background: 'var(--cream-warm)', display: 'flex', alignItems: event.useImage ? 'stretch' : 'center', justifyContent: event.useImage ? 'stretch' : 'center', overflow: 'hidden' }}>
                  {event.icon}
                </div>
                <div style={{ padding: '24px' }}>
                  <span className={`status-badge ${getEventBadgeClass(event.type)}`}>
                    {event.type}
                  </span>
                  <h3 style={{ margin: '12px 0 8px', fontSize: '1.1rem' }}>{event.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {event.date}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {event.location}</span>
                  </p>
                  <p style={{ fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '16px' }}>
                    {event.description}
                  </p>
                  <a 
                    className="btn btn-primary" 
                    style={{ fontSize: '0.85rem' }} 
                    onClick={() => handleRegisterClick(event.title)}
                  >
                    Register / Book Spot
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Register Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedEvent(null)}>×</button>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', marginBottom: '12px' }}>
              Book Ticket / Spot
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '24px' }}>
              Confirm your booking details for <strong>{selectedEvent}</strong>.
            </p>

            <form onSubmit={handleFormSubmit}>
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
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="+91 00000 00000" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
                disabled={submitting}
              >
                {submitting ? 'Booking...' : 'Confirm Registration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
