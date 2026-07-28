import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Search, Compass, X } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Art({ setActivePage, setSelectedArtist }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [zoomedArtImage, setZoomedArtImage] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch(`${API_BASE}/members`);
        const json = await res.json();
        if (json.success && json.data) {
          setMembers(json.data);
        }
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Extract all approved portfolio artworks from approved members
  const allArtworks = [];
  members.forEach(member => {
    if (member.isApproved !== false && member.artworks) {
      member.artworks.forEach(art => {
        if (art.isApproved !== false) {
          allArtworks.push({
            ...art,
            artist: member
          });
        }
      });
    }
  });

  // Filter artworks by category and search query
  const filteredArtworks = allArtworks.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (art.description && art.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Paintings', 'DIY Kits', 'Crafts'];

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
    setActivePage('artist-portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <SEO 
        title="Art Expo | MasterBrush" 
        description="Explore the beautiful artwork created by specially-abled artists of the MasterBrush Art Foundation in our curated Pinterest-style layout."
        keywords="paintings, disabled artists showcase, portfolio exhibition, art expo"
      />

      <style>{`
        .art-expo-masonry {
          columns: 4 280px;
          column-gap: 20px;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .art-expo-masonry {
            columns: 3 240px;
          }
        }
        @media (max-width: 768px) {
          .art-expo-masonry {
            columns: 2 200px;
          }
        }
        @media (max-width: 480px) {
          .art-expo-masonry {
            columns: 1 100%;
          }
        }
        .art-pin-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.08) !important;
        }
      `}</style>

      {/* Page Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <div className="container page-hero-content">
          <div className="breadcrumb" style={{ display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '0.85rem', marginBottom: '16px', opacity: 0.8 }}>
            <a onClick={() => setActivePage('home')} style={{ color: 'white', cursor: 'pointer' }}>Home</a> › <span style={{ color: 'var(--saffron)' }}>Art Expo</span>
          </div>
          <h1 className="display-hero" style={{ fontSize: '2.5rem', fontFamily: 'Oswald, sans-serif', fontWeight: 'bold', marginBottom: '12px', color: 'white' }}>Artist Portfolios Expo</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', opacity: 0.9 }}>A collection of beautiful, display-only artworks created by our talented community of specially-abled artists.</p>
        </div>
      </div>

      <section className="section" style={{ padding: '40px 0', background: '#F8FAFC' }}>
        <div className="container">
          
          {/* Search & Category Filter Bar */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '20px', 
            marginBottom: '32px',
            background: 'white',
            padding: '16px 24px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: selectedCategory === cat ? 'var(--navy)' : '#F1F5F9',
                    color: selectedCategory === cat ? 'white' : 'var(--text-dark)',
                    boxShadow: selectedCategory === cat ? '0 4px 10px rgba(26,26,58,0.2)' : 'none'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <input 
                type="text" 
                placeholder="Search art or artist..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px 16px 10px 40px', 
                  borderRadius: '50px', 
                  border: '1px solid #E2E8F0', 
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: '#F8FAFC'
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: '16px', top: '12px', color: '#94A3B8' }} />
            </div>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '80px', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading Art Expo...</p>
          ) : filteredArtworks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '16px', border: '1px dashed var(--border-soft)' }}>
              <Compass size={48} style={{ color: 'var(--text-light)', marginBottom: '16px', opacity: 0.6 }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '8px' }}>No Artworks Found</h3>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Try clearing filters or searching for something else.</p>
            </div>
          ) : (
            /* Pinterest Masonry Grid Container */
            <div className="art-expo-masonry">
              {filteredArtworks.map((art, idx) => (
                <div 
                  key={art.id || idx}
                  className="art-pin-card"
                  style={{
                    breakInside: 'avoid',
                    marginBottom: '20px',
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    border: '1px solid var(--border-soft)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                >
                  {/* Artwork Image Container */}
                  <div style={{ position: 'relative', overflow: 'hidden' }} onClick={() => setZoomedArtImage(art.image)}>
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                    />
                  </div>

                  {/* Artwork Details & Artist Profile */}
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '0.92rem', fontFamily: 'Oswald, sans-serif', color: 'var(--navy)', margin: '0 0 4px 0', fontWeight: 'bold' }}>{art.title}</h4>
                    <span style={{ 
                      fontSize: '0.68rem', 
                      background: '#FFEDD5', 
                      color: '#EA580C', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      fontWeight: 700, 
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>{art.category}</span>
                    
                    {art.description && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-mid)', lineHeight: '1.4', margin: '0 0 14px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {art.description}
                      </p>
                    )}

                    {/* Pinterest-style Artist Profile redirect */}
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArtistClick(art.artist);
                      }}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        borderTop: '1px solid #F1F5F9', 
                        paddingTop: '12px',
                        cursor: 'pointer' 
                      }}
                    >
                      <img 
                        src={art.artist.image || '/logo.png'} 
                        alt={art.artist.name} 
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-soft)' }} 
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{art.artist.name}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>Explore Profile ›</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {zoomedArtImage && (
        <div 
          onClick={() => setZoomedArtImage(null)} 
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            zIndex: 2000, cursor: 'zoom-out' 
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <img 
              src={zoomedArtImage} 
              alt="Zoomed Artwork" 
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }} 
            />
            <button 
              onClick={() => setZoomedArtImage(null)} 
              style={{ 
                position: 'absolute', top: '-45px', right: '0', background: 'none', border: 'none', 
                cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '1rem', fontWeight: 'bold' 
              }}
            >
              <X size={24} /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
