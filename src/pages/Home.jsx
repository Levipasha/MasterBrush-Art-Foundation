import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Heart, Award, Activity, Image, PenTool, Trees, Hand, Coins, Gift, User, Calendar, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CountingNumber } from '../components/ui/counting-number';
import SEO from '../components/SEO';

const API_BASE = import.meta.env.VITE_API_BASE || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://ngo-backend-zeta.vercel.app/api'
);

export default function Home({ setActivePage }) {
  const [homeConfig, setHomeConfig] = useState({
    heroTagline: '✦ Empowering Creativity Since 2025',
    heroTitle: 'MasterBrush Art Foundation',
    heroLogo: '/logo.png',
    heroVideoUrl: '/about_video.mp4',
    statYears: '10+',
    statStudents: '500+',
    statExhibitions: '50+',
    statLives: '1,000+'
  });
  const [activeTab, setActiveTab] = useState('All');

  const parseStat = (val) => {
    if (!val) return { num: 0, suffix: '+' };
    const str = String(val).trim();
    const num = parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
    const suffix = str.replace(/[0-9]/g, '') || '';
    return { num, suffix };
  };

  const [galleryList, setGalleryList] = useState([]);


  const displayItems = galleryList.map(item => ({
    id: item._id,
    category: item.category,
    title: item.title,
    element: <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }));

  const filteredItems = displayItems.filter(item => 
    activeTab === 'All' || item.category === activeTab
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = filteredItems.length;

  useEffect(() => {
    if (totalSlides === 0 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3500);
    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const [eventsList, setEventsList] = useState([]);
  const [storiesList, setStoriesList] = useState([]);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch(`${API_BASE}/home`);
        const json = await res.json();
        if (json.success && json.data) {
          setHomeConfig(json.data);
        }
      } catch (err) {
        console.error("Error fetching home config:", err);
      }
    };
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE}/gallery`);
        const json = await res.json();
        if (json.success && json.data) {
          setGalleryList(json.data);
        }
      } catch (err) {
        console.error("Error fetching homepage gallery:", err);
      }
    };
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/events`);
        const json = await res.json();
        if (json.success && json.data) {
          setEventsList(json.data);
        }
      } catch (err) {
        console.error("Error fetching homepage events:", err);
      }
    };
    const fetchStories = async () => {
      try {
        const res = await fetch(`${API_BASE}/stories`);
        const json = await res.json();
        if (json.success && json.data) {
          setStoriesList(json.data);
        }
      } catch (err) {
        console.error("Error fetching homepage stories:", err);
      }
    };
    fetchHome();
    fetchGallery();
    fetchEvents();
    fetchStories();
  }, []);



  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SEO 
        title="Home" 
        description="Empowering specially-abled and underprivileged artists by providing quality art education, workshops, exhibitions, and platforms to showcase their talent." 
        keywords="art education, charity NGO, disabled artists, painting classes, art workshops, Hyderabad art foundation, buy original paintings, donate to art charity"
      />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content" style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <h1 className="display-hero hero-title">
              {homeConfig.heroTitle}
            </h1>
            <span className="hero-script">Bringing Art to Every Heart ♡</span>
            <p className="hero-desc" style={{ margin: '0 auto', maxWidth: '640px' }}>
              Empowering creativity, nurturing talent and building an inclusive art community where imagination has no limits.
            </p>
          </div>
        </div>
      </section>

      {/* Values Strip */}
      <div className="values-strip">
        <div className="container">
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon icon-purple"><Palette size={20} /></div>
              <div className="value-title">Learn</div>
              <div className="value-desc">Quality art education for all age groups</div>
            </div>
            <div className="value-item">
              <div className="value-icon icon-pink"><Sparkles size={20} /></div>
              <div className="value-title">Create</div>
              <div className="value-desc">Nurturing creativity and self-expression</div>
            </div>
            <div className="value-item">
              <div className="value-icon icon-green"><Heart size={20} /></div>
              <div className="value-title">Inclusion</div>
              <div className="value-desc">Empowering specially-abled artists</div>
            </div>
            <div className="value-item">
              <div className="value-icon icon-saffron"><Award size={20} /></div>
              <div className="value-title">Exhibit</div>
              <div className="value-desc">Showcasing talent through exhibitions</div>
            </div>
            <div className="value-item">
              <div className="value-icon icon-navy"><Activity size={20} /></div>
              <div className="value-title">Impact</div>
              <div className="value-desc">Building confidence and inspiring lives</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image" style={{ display: 'flex', alignItems: 'stretch', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
              <video 
                src={homeConfig.heroVideoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '360px' }}
              />
            </div>
            <div className="about-content">
              <p className="eyebrow">About Us</p>
              <h2 className="display-section">Empowering Creative Expression</h2>
              <p className="about-body">
                MasterBrush Art Foundation is a non-profit organization dedicated to making art education accessible, inclusive, and meaningful for everyone. We believe that art is more than creativity—it is a powerful language of expression, a source of emotional healing, and a pathway to sustainable livelihoods.
              </p>
              <p className="about-body" style={{ marginTop: '-12px' }}>
                We work closely with underprivileged communities, people with disabilities, and budding artists to create a supportive environment where creativity knows no boundaries.
              </p>
              <a className="btn btn-primary" onClick={() => handlePageChange('about')}>Know More About Us →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-cream">
        <div className="container">
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-num">
                <CountingNumber target={parseStat(homeConfig.statYears).num} />
                <span>{parseStat(homeConfig.statYears).suffix || '+'}</span>
              </div>
              <div className="stat-label">Years of Impact</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <CountingNumber target={parseStat(homeConfig.statStudents).num} />
                <span>{parseStat(homeConfig.statStudents).suffix || '+'}</span>
              </div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <CountingNumber target={parseStat(homeConfig.statExhibitions).num} />
                <span>{parseStat(homeConfig.statExhibitions).suffix || '+'}</span>
              </div>
              <div className="stat-label">Exhibitions Held</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">
                <CountingNumber target={parseStat(homeConfig.statLives).num} />
                <span>{parseStat(homeConfig.statLives).suffix || '+'}</span>
              </div>
              <div className="stat-label">Lives Touched</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Our Creative Journey</p>
            <h2 className="display-section">Explore Our Artwork</h2>
            <p>A glimpse of the beautiful creations from our community of artists.</p>
          </div>



          {/* Interactive Slideshow Carousel */}
          <div 
            className="gallery-slideshow-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              position: 'relative',
              maxWidth: '900px',
              margin: '30px auto 0 auto',
              overflow: 'hidden',
              borderRadius: '24px',
              boxShadow: 'var(--shadow-card)',
              background: 'white',
              border: '1px solid var(--border-soft)'
            }}
          >
            {/* Main Slide Card */}
            <div 
              style={{ position: 'relative', height: '480px', width: '100%', cursor: 'pointer', background: '#0F0F30' }}
              onClick={() => handlePageChange('gallery')}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                >
                  {filteredItems[currentSlide]?.element}
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Control Arrows */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
                aria-label="Previous Slide"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  zIndex: 10,
                  color: 'var(--navy)',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronLeft size={26} />
              </button>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
                aria-label="Next Slide"
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  zIndex: 10,
                  color: 'var(--navy)',
                  transition: 'all 0.2s ease'
                }}
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* Slide Indicators Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '16px 0', background: 'white' }}>
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: currentSlide === idx ? '32px' : '10px',
                    height: '10px',
                    borderRadius: '50px',
                    border: 'none',
                    background: currentSlide === idx ? 'var(--saffron)' : 'rgba(26,26,78,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="gallery-center" style={{ textAlign: 'center', marginTop: '32px' }}>
            <a className="btn btn-outline" onClick={() => handlePageChange('gallery')}>View Full Gallery →</a>
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="section bg-cream">
        <div className="container">
          <div className="events-grid">
            <div>
              <p className="eyebrow">Upcoming Events</p>
              <h2 className="display-section mb-8">Join Our Creative Events</h2>
              <div className="events-list">
                {eventsList.length === 0 ? (
                  <p style={{ color: 'var(--text-light)', fontStyle: 'italic', padding: '16px 0' }}>
                    No events listed currently. Add new events via the Admin portal.
                  </p>
                ) : (
                  eventsList.slice(0, 3).map((event, idx) => (
                    <div 
                      key={event._id || idx} 
                      className="event-card" 
                      onClick={() => handlePageChange('events')}
                      style={{
                        background: 'white',
                        borderRadius: '16px',
                        border: '1px solid var(--border-soft)',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-soft)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {event.image ? (
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            flexShrink: 0,
                            border: '1px solid var(--border-soft)'
                          }}
                        />
                      ) : (
                        <div 
                          className={`event-icon ${idx % 3 === 0 ? 'icon-saffron' : idx % 3 === 1 ? 'icon-pink' : 'icon-green'}`}
                          style={{ flexShrink: 0 }}
                        >
                          {idx % 3 === 0 ? <Image size={20} style={{ color: 'var(--saffron)' }} /> : idx % 3 === 1 ? <PenTool size={20} style={{ color: 'var(--pink)' }} /> : <Trees size={20} style={{ color: 'var(--green)' }} />}
                        </div>
                      )}

                      <div className="event-body">
                        <div className="event-name" style={{ color: 'var(--navy)', fontFamily: 'Oswald, sans-serif', fontSize: '1.15rem', marginBottom: '4px' }}>
                          {event.title}
                        </div>
                        <div className="event-date" style={{ color: 'var(--text-mid)', fontSize: '0.85rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={14} style={{ color: 'var(--saffron)' }} /> {event.date} &bull; {event.location || 'Hyderabad'}
                        </div>
                        <span className="event-link" style={{ color: 'var(--saffron)', fontWeight: 600, fontSize: '0.85rem' }}>
                          View Details &rarr;
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="events-feature" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src="/whatsapp_event_image.jpeg" 
                alt="Creative Events Exhibition" 
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-medium)'
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Community Banner */}
      <section className="section-sm">
        <div className="container">
          <div className="support-banner">
            <div className="support-banner-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <User size={32} style={{ color: 'white' }} />
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'white' }}>Join MasterBrush Community</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Create an account to participate in workshops, register for events, and connect with artists.</p>
                </div>
              </div>
            </div>
            <div className="support-actions">
              <div className="support-action" onClick={() => handlePageChange('login')}>
                <div className="support-action-icon"><User size={20} /></div>
                <div className="support-action-label">Login / Register</div>
                <div className="support-action-sub">Join as member or artist</div>
              </div>
              <div className="support-action" onClick={() => handlePageChange('events')}>
                <div className="support-action-icon"><Calendar size={20} /></div>
                <div className="support-action-label">Upcoming Events</div>
                <div className="support-action-sub">Register & participate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">What People Say</p>
            <h2 className="display-section">Stories of Transformation</h2>
          </div>
          <div className="testimonials-grid">
            {storiesList.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-mid)', fontStyle: 'italic', padding: '24px 0', width: '100%' }}>
                No stories of transformation listed currently. Add new stories via the Admin portal.
              </p>
            ) : (
              storiesList.map((story, idx) => (
                <div key={story._id || idx} className="testimonial-card">
                  <p className="testimonial-text">{story.text}</p>
                  <div className="testimonial-author">
                    <div 
                      className="author-avatar" 
                      style={{ 
                        background: idx % 3 === 0 ? 'var(--navy)' : idx % 3 === 1 ? 'var(--pink)' : 'var(--green)',
                        color: 'white'
                      }}
                    >
                      {story.avatarInitials || (story.authorName ? story.authorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'ST')}
                    </div>
                    <div>
                      <div className="author-name">{story.authorName}</div>
                      <div className="author-role">{story.authorRole}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
