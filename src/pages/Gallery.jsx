import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Gallery({ setActivePage }) {
  const [dbItems, setDbItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('https://ngo-backend-production-b2ee.up.railway.app/api/gallery');
        const json = await res.json();
        if (json.success && json.data) {
          setDbItems(json.data);
        }
      } catch (err) {
        console.error("Error fetching gallery items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const activeItems = dbItems.map(item => ({
    id: item._id || item.id,
    category: item.category,
    title: item.title,
    medium: item.artist || 'NGO Artwork',
    layoutClass: item.category === 'Pebble Art' ? '' : 'tall',
    element: (
      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    )
  }));

  const uniqueCategories = ['All', ...new Set(dbItems.map(item => item.category).filter(Boolean))];

  const filteredItems = activeItems.filter(item => 
    activeTab === 'All' || item.category === activeTab
  );

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Gallery</span></div>
          <h1 className="display-hero">Gallery</h1>
          <p>A Glimpse of Creativity — artworks from our talented community.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="gallery-tabs mb-8">
            {uniqueCategories.map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="gallery-full">
            {loading ? (
              <p style={{ textAlign: 'center', padding: '48px', width: '100%', gridColumn: '1 / -1', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading artwork gallery...</p>
            ) : filteredItems.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '48px', width: '100%', gridColumn: '1 / -1', color: 'var(--text-light)' }}>No artworks found matching this tab. Add new entries via the Admin dashboard.</p>
            ) : filteredItems.map(item => (
              <div 
                key={item.id} 
                className={`gallery-full-card ${item.layoutClass}`}
                onClick={() => setLightboxItem(item)}
              >
                {item.element}
                <div className="gallery-overlay">
                  <span style={{ fontSize: '1rem', fontWeight: '700' }}>{item.title}</span>
                  <span style={{ fontSize: '0.78rem', opacity: '0.8' }}>{item.medium}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a className="btn btn-primary" onClick={() => alert('All demo artworks loaded.')}>Load More</a>
          </div>
        </div>
      </section>

      {/* Lightbox Zoom Overlay */}
      {lightboxItem && (
        <div className="lightbox" onClick={() => setLightboxItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxItem(null)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={16} /></button>
            <div className="lightbox-img-wrap">
              {lightboxItem.element}
            </div>
            <div className="lightbox-details">
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)' }}>{lightboxItem.title}</h3>
              <p style={{ color: 'var(--saffron)', fontWeight: '600', fontSize: '0.9rem', marginTop: '4px' }}>{lightboxItem.medium}</p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.8rem', marginTop: '8px' }}>Created with love by MasterBrush Foundation members.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
