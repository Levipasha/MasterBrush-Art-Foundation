import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { Compass, X, ShoppingBag, ArrowLeft } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const InstagramIcon = ({ size = 14 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function ArtistPortfolio({ setActivePage, artist }) {
  const [shopProducts, setShopProducts] = useState([]);
  const [loadingShop, setLoadingShop] = useState(false);
  const [zoomedArtImage, setZoomedArtImage] = useState(null);
  const [portfolioTab, setPortfolioTab] = useState('expo'); // 'expo' or 'shop'

  useEffect(() => {
    if (!artist) return;
    const fetchArtistShop = async () => {
      setLoadingShop(true);
      try {
        const res = await fetch(`${API_BASE}/shop`);
        const json = await res.json();
        if (json.success && json.data) {
          const filtered = json.data.filter(p => p.memberEmail === artist.email);
          setShopProducts(filtered);
        }
      } catch (err) {
        console.error("Error fetching shop items:", err);
      } finally {
        setLoadingShop(false);
      }
    };
    fetchArtistShop();
  }, [artist]);

  if (!artist) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <p>No artist selected.</p>
        <button className="btn btn-primary" onClick={() => setActivePage('members')}>Back to Members</button>
      </div>
    );
  }

  const approvedArtworks = artist.artworks ? artist.artworks.filter(art => art.isApproved !== false) : [];

  return (
    <div>
      <SEO 
        title={`${artist.name}'s Portfolio | MasterBrush`} 
        description={`Explore the inspiring art portfolio and handcrafted items of specially-abled artist ${artist.name}.`}
        keywords={`${artist.name} portfolio, disabled artist, art exhibition`}
      />

      <div style={{ background: '#F8FAFC', paddingBottom: '60px' }}>
        {/* Back Link Header */}
        <div className="container" style={{ paddingTop: '24px', paddingBottom: '12px' }}>
          <button 
            onClick={() => {
              setActivePage('art');
            }} 
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              display: 'inline-flex', alignItems: 'center', gap: '8px', 
              color: 'var(--text-mid)', fontSize: '0.88rem', fontWeight: 600,
              padding: '8px 12px', borderRadius: '8px', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mid)'}
          >
            <ArrowLeft size={16} /> Back to Art Expo
          </button>
        </div>

        {/* Artist Profile Header Banner */}
        <div className="container">
          <div style={{ 
            background: 'white', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            border: '1px solid var(--border-soft)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.03)',
            marginBottom: '40px'
          }}>
            {/* Header Cover Background */}
            <div style={{ 
              height: '180px', 
              backgroundImage: 'url("/logo.png")', 
              backgroundPosition: 'right 40px center', 
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'var(--saffron-pale)',
              borderBottom: '1px solid var(--border-soft)'
            }} />

            {/* Profile Content */}
            <div style={{ 
               padding: '0 32px 32px 32px', 
               marginTop: '-100px', 
               display: 'flex', 
               flexDirection: 'column', 
               alignItems: 'center',
               textAlign: 'center'
             }}>
               {/* Profile Image */}
               <img 
                 src={artist.image || '/logo.png'} 
                 alt={artist.name} 
                 style={{ 
                   width: '180px', 
                   height: '180px', 
                   borderRadius: '50%', 
                   objectFit: 'cover', 
                   border: '6px solid white', 
                   boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                   background: 'white'
                 }} 
               />

              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: 'var(--navy)', marginTop: '16px', marginBottom: '4px' }}>{artist.name}</h1>
              <span style={{ 
                background: 'var(--saffron)', 
                color: 'white', 
                padding: '4px 16px', 
                borderRadius: '50px', 
                fontSize: '0.82rem', 
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '12px'
              }}>
                {artist.role || 'Specially-Abled Artist'}
              </span>

              {artist.instagram && (
                <a 
                  href={`https://instagram.com/${artist.instagram}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--accent)', 
                    marginBottom: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontWeight: 600 
                  }}
                >
                  <InstagramIcon size={16} /> @{artist.instagram}
                </a>
              )}

              <p style={{ 
                maxWidth: '700px', 
                fontSize: '0.95rem', 
                color: 'var(--text-mid)', 
                lineHeight: '1.6', 
                margin: '0 0 20px 0' 
              }}>
                {artist.info || 'Passionate artist creating inspiring handcrafted artworks at MasterBrush Art Foundation.'}
              </p>
            </div>
          </div>

          {/* Tabs: Portfolio Expo (Display Only) & Shop Items (For Sale) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
            <button 
              onClick={() => setPortfolioTab('expo')}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: portfolioTab === 'expo' ? 'var(--navy)' : 'white',
                color: portfolioTab === 'expo' ? 'white' : 'var(--navy)',
                border: '1px solid var(--border-soft)',
                boxShadow: portfolioTab === 'expo' ? '0 4px 15px rgba(26,26,58,0.2)' : 'none'
              }}
            >
              My Portfolio Expo ({approvedArtworks.length})
            </button>
            <button 
              onClick={() => setPortfolioTab('shop')}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: 'none',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: portfolioTab === 'shop' ? 'var(--navy)' : 'white',
                color: portfolioTab === 'shop' ? 'white' : 'var(--navy)',
                border: '1px solid var(--border-soft)',
                boxShadow: portfolioTab === 'shop' ? '0 4px 15px rgba(26,26,58,0.2)' : 'none'
              }}
            >
              My Shop items ({shopProducts.length})
            </button>
          </div>

          {/* Expo Tab Content */}
          {portfolioTab === 'expo' && (
            <div>
              {approvedArtworks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px dashed var(--border-soft)' }}>
                  <p style={{ color: 'var(--text-mid)', fontStyle: 'italic', margin: 0 }}>No portfolio artworks published by this artist yet.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {approvedArtworks.map((art, idx) => (
                    <div 
                      key={art.id || idx} 
                      style={{ 
                        border: '1px solid var(--border-soft)', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        background: 'white', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    >
                      <div style={{ height: '220px', overflow: 'hidden', background: '#F8FAFC' }}>
                        <img 
                          src={art.image} 
                          alt={art.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }} 
                          onClick={() => setZoomedArtImage(art.image)}
                        />
                      </div>
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--navy)', margin: '0 0 6px 0' }}>{art.title}</h3>
                        <span style={{ 
                          fontSize: '0.68rem', 
                          background: '#FFEDD5', 
                          color: '#EA580C', 
                          padding: '2px 8px', 
                          borderRadius: '4px', 
                          fontWeight: 700, 
                          alignSelf: 'flex-start',
                          marginBottom: '12px' 
                        }}>{art.category}</span>
                        {art.description && (
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: '1.5', margin: 0 }}>
                            {art.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Shop Tab Content */}
          {portfolioTab === 'shop' && (
            <div>
              {loadingShop ? (
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading shop items...</p>
              ) : shopProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: 'white', borderRadius: '16px', border: '1px dashed var(--border-soft)' }}>
                  <p style={{ color: 'var(--text-mid)', fontStyle: 'italic', margin: 0 }}>No shop items currently listed for sale by this artist.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {shopProducts.map(prod => (
                    <div 
                      key={prod._id} 
                      style={{ 
                        border: '1px solid var(--border-soft)', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        background: 'white', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    >
                      <div style={{ height: '220px', overflow: 'hidden', background: '#F8FAFC' }}>
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </div>
                      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--navy)', margin: 0 }}>{prod.name}</h3>
                            <span style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 'bold' }}>₹{prod.price.toLocaleString()}</span>
                          </div>
                          <span style={{ 
                            fontSize: '0.68rem', 
                            background: '#EFF6FF', 
                            color: '#2563EB', 
                            padding: '2px 8px', 
                            borderRadius: '4px', 
                            fontWeight: 700, 
                            display: 'inline-block',
                            marginBottom: '12px' 
                          }}>{prod.category}</span>
                          {prod.description && (
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                              {prod.description}
                            </p>
                          )}
                        </div>
                        
                        <button 
                          className="btn btn-accent"
                          onClick={() => {
                            setActivePage('shop');
                            window.scrollTo({ top: 500, behavior: 'smooth' });
                          }}
                          style={{ 
                            width: '100%', 
                            padding: '10px 0', 
                            fontSize: '0.82rem', 
                            fontWeight: 700, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '8px' 
                          }}
                        >
                          <ShoppingBag size={14} /> Buy in Art Shop
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
