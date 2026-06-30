import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Heart, Award, Activity, Image, PenTool, Trees, Hand, Coins, Gift } from 'lucide-react';

const galleryItems = [
  {
    id: 'g1',
    category: 'Student Works',
    title: 'Peacock — Acrylic',
    element: (
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#E8F5E9"/>
        <circle cx="100" cy="100" r="30" fill="#1A7A4A"/>
        <ellipse cx="100" cy="90" rx="20" ry="30" fill="#2BAF8A"/>
        <ellipse cx="60" cy="70" rx="12" ry="30" fill="#3498DB" opacity="0.7" transform="rotate(-30 60 70)"/>
        <ellipse cx="80" cy="55" rx="10" ry="28" fill="#7B68EE" opacity="0.7" transform="rotate(-15 80 55)"/>
        <ellipse cx="100" cy="50" rx="10" ry="30" fill="#2BAF8A" opacity="0.8"/>
        <ellipse cx="120" cy="55" rx="10" ry="28" fill="#3498DB" opacity="0.7" transform="rotate(15 120 55)"/>
        <ellipse cx="140" cy="70" rx="12" ry="30" fill="#7B68EE" opacity="0.7" transform="rotate(30 140 70)"/>
        <circle cx="100" cy="88" r="8" fill="#FFD700"/>
        <circle cx="95" cy="72" r="5" fill="#3498DB"/>
        <circle cx="100" cy="68" r="5" fill="#2BAF8A"/>
        <circle cx="105" cy="72" r="5" fill="#7B68EE"/>
      </svg>
    )
  },
  {
    id: 'g2',
    category: 'Acrylic Paintings',
    title: 'Sunset Serenity — Acrylic',
    element: (
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="sunsetG_home" cx="50%" cy="30%">
            <stop offset="0%" stop-color="#FF6B35"/>
            <stop offset="60%" stop-color="#FF8C42"/>
            <stop offset="100%" stop-color="#1A3A6B"/>
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#sunsetG_home)"/>
        <circle cx="100" cy="80" r="28" fill="#FFE066" opacity="0.9"/>
        <rect x="0" y="140" width="200" height="60" fill="#0D2137" opacity="0.9"/>
        <ellipse cx="100" cy="155" rx="25" ry="10" fill="#FFD700" opacity="0.3"/>
        <rect x="55" y="120" width="8" height="20" fill="#1A2A3A"/>
        <polygon points="55,122 45,140 65,140" fill="#F5DEB3" opacity="0.7"/>
        <rect x="137" y="125" width="8" height="15" fill="#1A2A3A"/>
        <polygon points="137,127 128,140 146,140" fill="#F5DEB3" opacity="0.6"/>
      </svg>
    )
  },
  {
    id: 'g3',
    category: 'Student Works',
    title: 'Portrait — Student Work',
    element: (
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#F8F8F8"/>
        <circle cx="100" cy="80" r="44" fill="#F4C090"/>
        <ellipse cx="100" cy="62" rx="44" ry="28" fill="#2C1810"/>
        <circle cx="88" cy="82" r="6" fill="#3D2810"/>
        <circle cx="112" cy="82" r="6" fill="#3D2810"/>
        <circle cx="89" cy="81" r="2" fill="white"/>
        <circle cx="113" cy="81" r="2" fill="white"/>
        <path d="M90 95 Q100 103 110 95" stroke="#C0784A" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="100" cy="88" rx="8" ry="5" fill="#E8A07A" opacity="0.4"/>
        <rect x="72" y="122" width="56" height="60" fill="#E0E0E0" rx="6"/>
        <rect x="78" y="128" width="44" height="52" fill="#BDBDBD" rx="4"/>
      </svg>
    )
  },
  {
    id: 'g4',
    category: 'Pebble Art',
    title: 'Love Birds — Pebble Art',
    element: (
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#F5F0E8"/>
        <rect x="20" y="120" width="160" height="8" fill="#5D4037" rx="4"/>
        <ellipse cx="55" cy="110" rx="14" ry="18" fill="#E25B8B"/>
        <circle cx="55" cy="96" r="10" fill="#F48FB1"/>
        <ellipse cx="85" cy="108" rx="13" ry="17" fill="#FF7043"/>
        <circle cx="85" cy="94" r="9" fill="#FFAB91"/>
        <ellipse cx="113" cy="106" rx="14" ry="18" fill="#7B68EE"/>
        <circle cx="113" cy="92" r="10" fill="#B39DDB"/>
        <ellipse cx="142" cy="108" rx="13" ry="17" fill="#2BAF8A"/>
        <circle cx="142" cy="94" r="9" fill="#80CBC4"/>
        <text x="50" y="112" font-size="8" fill="white" text-anchor="middle">♥</text>
        <text x="85" y="110" font-size="8" fill="white" text-anchor="middle">♥</text>
      </svg>
    )
  },
  {
    id: 'g5',
    category: 'Exhibitions',
    title: 'Artist at Work — Exhibition',
    element: (
      <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#E8F4F8"/>
        <circle cx="90" cy="75" r="26" fill="#F4C090"/>
        <ellipse cx="90" cy="60" rx="26" ry="18" fill="#2C1810"/>
        <rect x="68" y="98" width="44" height="55" fill="#27AE60" rx="6"/>
        <rect x="72" y="103" width="36" height="48" fill="#1A6B3A" opacity="0.8" rx="4"/>
        <rect x="120" y="60" width="55" height="70" fill="#FFF8F0" stroke="#C8956C" stroke-width="2" rx="3"/>
        <polygon points="120,120 140,75 160,120" fill="#7B68EE" opacity="0.7"/>
        <polygon points="135,120 155,82 175,120" fill="#B39DDB" opacity="0.7"/>
        <rect x="120" y="118" width="55" height="12" fill="#27AE60" opacity="0.5"/>
        <rect x="110" y="95" width="3" height="30" fill="#8B4513" transform="rotate(-20 110 95)"/>
      </svg>
    )
  }
];

export default function Home({ setActivePage }) {
  const [homeConfig, setHomeConfig] = useState({
    heroTagline: '✦ Empowering Creativity Since 2025',
    heroTitle: 'MasterBrush Art Foundation',
    heroLogo: '/logo.png',
    heroVideoUrl: '/about_video.mp4'
  });
  const [activeTab, setActiveTab] = useState('All');

  const [galleryList, setGalleryList] = useState([]);


  const displayItems = galleryList.length > 0 
    ? galleryList.map(item => ({
        id: item._id,
        category: item.category,
        title: item.title,
        element: <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      }))
    : galleryItems;

  const filteredItems = displayItems.filter(item => 
    activeTab === 'All' || item.category === activeTab
  );

  const showcaseItems = filteredItems.slice(0, 6);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await fetch('https://ngo-backend-production-b2ee.up.railway.app/api/home');
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
        const res = await fetch('https://ngo-backend-production-b2ee.up.railway.app/api/gallery');
        const json = await res.json();
        if (json.success && json.data) {
          setGalleryList(json.data);
        }
      } catch (err) {
        console.error("Error fetching homepage gallery:", err);
      }
    };
    fetchHome();
    fetchGallery();
  }, []);



  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-tagline">
                {homeConfig.heroTagline}
              </div>
              <h1 className="display-hero hero-title">
                {homeConfig.heroTitle}
              </h1>
              <span className="hero-script">Bringing Art to Every Heart ♡</span>
              <p className="hero-desc">
                Empowering creativity, nurturing talent and building an inclusive art community where imagination has no limits.
              </p>
              <div className="hero-buttons">
                <a className="btn btn-outline" onClick={() => handlePageChange('gallery')}>Explore Gallery</a>
                <a className="btn btn-accent" onClick={() => handlePageChange('support')}>Support Our Mission ♥</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-art-bg"></div>
              <div className="hero-art-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', padding: '24px' }}>
                <img 
                  src={homeConfig.heroLogo} 
                  alt="MasterBrush Art Foundation Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '320px' }} 
                />
              </div>
              <div className="hero-badge hero-badge-tl" style={{ display: 'flex', alignItems: 'center' }}>
                <Heart size={14} style={{ marginRight: '6px', color: 'var(--saffron)' }} />
                Creative Inclusion
              </div>
              <div className="hero-badge hero-badge-br" style={{ display: 'flex', alignItems: 'center' }}>
                <Sparkles size={14} style={{ marginRight: '6px', color: 'var(--pink)' }} />
                Expression & Healing
              </div>
            </div>
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
              <div className="stat-num">10<span>+</span></div>
              <div className="stat-label">Years of Impact</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">500<span>+</span></div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">50<span>+</span></div>
              <div className="stat-label">Exhibitions Held</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">1000<span>+</span></div>
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



          <div className="gallery-grid">
            {showcaseItems.map(item => (
              <div key={item.id} className="gallery-card" onClick={() => handlePageChange('gallery')}>
                {item.element}
                <div className="gallery-overlay">
                  <span>{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Horizontally Scrollable Row (Visible only on mobile) */}
          <div className="gallery-swipe-container">
            <div className="gallery-swipe-row">
              {filteredItems.map(item => (
                <div 
                  key={item.id} 
                  className="gallery-swipe-card"
                  onClick={() => handlePageChange('gallery')}
                >
                  {item.element}
                  <div className="gallery-overlay">
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="gallery-center mt-10">
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
                <div className="event-card" onClick={() => handlePageChange('events')}>
                  <div className="event-icon icon-saffron"><Image size={18} style={{ color: 'var(--saffron)' }} /></div>
                  <div className="event-body">
                    <div className="event-name">Art Exhibition 2025</div>
                    <div className="event-date">📍 15–18 June, 2025 · Hyderabad</div>
                    <span className="event-link">View Details →</span>
                  </div>
                </div>
                <div className="event-card" onClick={() => handlePageChange('events')}>
                  <div className="event-icon icon-pink"><PenTool size={18} style={{ color: 'var(--pink)' }} /></div>
                  <div className="event-body">
                    <div className="event-name">Acrylic Workshop</div>
                    <div className="event-date">📍 22 June, 2025 · Hyderabad</div>
                    <span className="event-link">View Details →</span>
                  </div>
                </div>
                <div className="event-card" onClick={() => handlePageChange('events')}>
                  <div className="event-icon icon-green"><Trees size={18} style={{ color: 'var(--green)' }} /></div>
                  <div className="event-body">
                    <div className="event-name">Art Retreat</div>
                    <div className="event-date">📍 5–7 July, 2025 · Outskirts of Hyderabad</div>
                    <span className="event-link">View Details →</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="events-feature">
              <svg width="100%" height="100%" viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="360" fill="#E8F4F8" />
                <circle cx="200" cy="120" r="34" fill="#F4C090" />
                <ellipse cx="200" cy="103" rx="34" ry="22" fill="#2C1810" />
                <rect x="172" y="150" width="56" height="60" fill="#27AE60" rx="8" />
                <ellipse cx="160" cy="240" rx="28" ry="28" fill="none" stroke="#1A1A4E" stroke-width="4" />
                <ellipse cx="240" cy="240" rx="28" ry="28" fill="none" stroke="#1A1A4E" stroke-width="4" />
                <rect x="155" y="190" width="90" height="30" fill="#2C3E8C" rx="6" />
                <rect x="155" y="188" width="90" height="10" fill="#3A52B4" rx="4" />
                <rect x="260" y="70" width="100" height="130" fill="#FFF8F0" stroke="#C8956C" stroke-width="2" rx="4" />
                <circle cx="310" cy="125" r="30" fill="#FFB347" opacity="0.6" />
                <circle cx="310" cy="125" r="18" fill="#FF6B35" opacity="0.7" />
                <circle cx="310" cy="125" r="8" fill="#FFD700" />
                <ellipse cx="310" cy="100" rx="8" ry="18" fill="#E25B8B" opacity="0.7" />
                <ellipse cx="310" cy="150" rx="8" ry="18" fill="#E25B8B" opacity="0.7" />
                <ellipse cx="287" cy="125" rx="18" ry="8" fill="#7B68EE" opacity="0.7" />
                <ellipse cx="333" cy="125" rx="18" ry="8" fill="#7B68EE" opacity="0.7" />
                <circle cx="80" cy="50" r="24" fill="#E25B8B" opacity="0.2" />
                <circle cx="340" cy="30" r="18" fill="#7B68EE" opacity="0.2" />
                <circle cx="50" cy="290" r="20" fill="#2BAF8A" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="section-sm">
        <div className="container">
          <div className="support-banner">
            <div className="support-banner-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Hand size={32} style={{ color: 'white' }} />
                <div>
                  <h2 style={{ fontSize: '1.6rem', color: 'white' }}>Support Our Mission</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Your support helps us provide art education, materials and opportunities to deserving artists.</p>
                </div>
              </div>
            </div>
            <div className="support-actions">
              <div className="support-action" onClick={() => handlePageChange('support')}>
                <div className="support-action-icon"><Coins size={20} /></div>
                <div className="support-action-label">Donate</div>
                <div className="support-action-sub">Contribute funds</div>
              </div>
              <div className="support-action" onClick={() => handlePageChange('support')}>
                <div className="support-action-icon"><Palette size={20} /></div>
                <div className="support-action-label">Sponsor an Artist</div>
                <div className="support-action-sub">Empower a creative life</div>
              </div>
              <div className="support-action" onClick={() => handlePageChange('support')}>
                <div className="support-action-icon"><Gift size={20} /></div>
                <div className="support-action-label">Donate Materials</div>
                <div className="support-action-sub">Support with art supplies</div>
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
            <div className="testimonial-card">
              <p className="testimonial-text">MasterBrush gave me the confidence to believe in my talent. It's more than an art class, it's a family.</p>
              <div className="testimonial-author">
                <div className="author-avatar">AN</div>
                <div>
                  <div className="author-name">Ananya</div>
                  <div className="author-role">Student</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">My son has specially-abled needs and the team made him feel so included and celebrated. His artwork is now in the gallery!</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'var(--pink)' }}>PR</div>
                <div>
                  <div className="author-name">Priya Reddy</div>
                  <div className="author-role">Parent</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">Art therapy sessions at MasterBrush helped me heal. I found a new way to express emotions I couldn't put into words.</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'var(--green)' }}>RK</div>
                <div>
                  <div className="author-name">Rajan Kumar</div>
                  <div className="author-role">Art Therapy Participant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
