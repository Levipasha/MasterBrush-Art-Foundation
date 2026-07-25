import React, { useState, useEffect } from 'react';
import { Image, PenTool, Trees, Trophy, Calendar, MapPin } from 'lucide-react';
import SEO from '../components/SEO';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Events({ setActivePage, triggerToast }) {
  const [dbEvents, setDbEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsConfig, setEventsConfig] = useState({
    title: 'Events',
    tagline: 'Join our creative gatherings, workshops, exhibitions and competitions.'
  });
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
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${API_BASE}/home`);
        const json = await res.json();
        if (json.success && json.data) {
          setEventsConfig({
            title: json.data.eventsTitle || 'Events',
            tagline: json.data.eventsTagline || 'Join our creative gatherings, workshops, exhibitions and competitions.'
          });
        }
      } catch (err) {
        console.error("Error fetching events config:", err);
      }
    };
    fetchEvents();
    fetchConfig();
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

  const mappedEvents = dbEvents.map(e => ({
    id: e._id || e.id,
    type: e.category || 'Event',
    title: e.title,
    date: e.date,
    location: e.location,
    description: e.description,
    image: e.image || '/cta-bg.jpg',
    status: e.status || 'Current'
  }));

  const upcomingEvents = mappedEvents.filter(e => e.status !== 'Completed');
  const pastEvents = mappedEvents.filter(e => e.status === 'Completed');

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
          program: selectedEvent
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
      <SEO 
        title="Events &amp; Workshops" 
        description="Join our upcoming art exhibitions, competitions, acrylic painting workshops, and community art retreats designed for all skill levels." 
        keywords="acrylic workshops, art exhibitions 2025, painting competitions, art retreats, enroll in art classes"
      />
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Events</span></div>
          <h1 className="display-hero">{eventsConfig.title}</h1>
          <p>{eventsConfig.tagline}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Upcoming Events</p>
            <h2 className="display-section">What's Happening at MasterBrush</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
            {loading ? (
              <p style={{ textAlign: 'center', padding: '48px', gridColumn: '1 / -1', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading events from database...</p>
            ) : upcomingEvents.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '48px', gridColumn: '1 / -1', color: 'var(--text-light)' }}>No upcoming events scheduled. Add new promos via the Admin dashboard.</p>
            ) : upcomingEvents.map(event => (
              <div 
                key={event.id} 
                style={{ 
                  position: 'relative',
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  boxShadow: 'var(--shadow-card)',
                  minHeight: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  background: `url("${event.image}") center/cover no-repeat`,
                  border: '1px solid var(--border-soft)',
                  maxWidth: '420px',
                  width: '100%',
                  margin: upcomingEvents.length === 1 ? '0 auto' : '0'
                }}
              >
                {/* Lightened Gradient Overlay for better image clarity and readability */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,15,48,0.85) 0%, rgba(15,15,48,0.3) 45%, rgba(15,15,48,0.05) 100%)',
                  zIndex: 1
                }} />

                {/* Card Content */}
                <div style={{ position: 'relative', zIndex: 2, padding: '32px 28px', color: 'white' }}>
                  <span style={{ 
                    background: 'var(--saffron)', 
                    color: 'white', 
                    padding: '4px 14px', 
                    borderRadius: '50px', 
                    fontSize: '0.78rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    display: 'inline-block',
                    marginBottom: '12px'
                  }}>
                    {event.type}
                  </span>
                  
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.6rem', color: 'white', fontFamily: 'Oswald, sans-serif', lineHeight: 1.25 }}>
                    {event.title}
                  </h3>

                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontWeight: 500 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Calendar size={15} color="var(--saffron-light)" /> {event.date}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><MapPin size={15} color="var(--saffron-light)" /> {event.location}</span>
                  </div>

                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '22px', color: 'rgba(255,255,255,0.8)' }}>
                    {event.description}
                  </p>

                  <button 
                    className="btn btn-accent" 
                    style={{ fontSize: '0.9rem', width: '100%', padding: '12px', justifyContent: 'center', fontWeight: 600 }} 
                    onClick={() => handleRegisterClick(event.title)}
                  >
                    Register / Book Spot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Completed/Past Events Section */}
      {!loading && pastEvents.length > 0 && (
        <section className="section" style={{ background: '#F8FAFC', borderTop: '1px solid var(--border-soft)' }}>
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Our Journey</p>
              <h2 className="display-section">Completed Events &amp; Exhibitions</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
              {pastEvents.map(event => (
                <div 
                  key={event.id} 
                  style={{ 
                    position: 'relative',
                    borderRadius: '24px', 
                    overflow: 'hidden', 
                    boxShadow: 'var(--shadow-card)',
                    minHeight: '380px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background: `url("${event.image}") center/cover no-repeat`,
                    border: '1px solid var(--border-soft)',
                    maxWidth: '420px',
                    width: '100%',
                    margin: pastEvents.length === 1 ? '0 auto' : '0',
                    filter: 'grayscale(25%)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15,15,48,0.9) 0%, rgba(15,15,48,0.45) 50%, rgba(15,15,48,0.1) 100%)',
                    zIndex: 1
                  }} />

                  <div style={{ position: 'relative', zIndex: 2, padding: '32px 28px', color: 'white' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ 
                        background: 'rgba(255,255,255,0.2)', 
                        color: 'white', 
                        padding: '4px 14px', 
                        borderRadius: '50px', 
                        fontSize: '0.78rem', 
                        fontWeight: 700, 
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        {event.type}
                      </span>
                      <span style={{ 
                        background: '#FCEBEB', 
                        color: '#C42424', 
                        padding: '4px 14px', 
                        borderRadius: '50px', 
                        fontSize: '0.78rem', 
                        fontWeight: 700, 
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        Completed
                      </span>
                    </div>

                    <h3 style={{ margin: '0 0 10px', fontSize: '1.6rem', color: 'white', fontFamily: 'Oswald, sans-serif', lineHeight: 1.25 }}>
                      {event.title}
                    </h3>

                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontWeight: 500 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><Calendar size={15} color="var(--saffron-light)" /> {event.date}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><MapPin size={15} color="var(--saffron-light)" /> {event.location}</span>
                    </div>

                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '22px', color: 'rgba(255,255,255,0.8)' }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
