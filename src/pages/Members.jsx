import React, { useState, useEffect } from 'react';
import { Users, Award, Calendar, ExternalLink, X } from 'lucide-react';
import SEO from '../components/SEO';

const API_BASE = import.meta.env.VITE_API_BASE || (
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://ngo-backend-zeta.vercel.app/api'
);

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
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Members({ setActivePage, setSelectedArtist, triggerToast }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <SEO 
        title="Our Members &amp; Artists" 
        description="Meet the talented members, students, volunteers, and specially-abled artists who form the core of the MasterBrush Art Foundation community." 
        keywords="disabled artists profile, art foundation students, volunteer artists, creative team, community members"
      />
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Our Members</span></div>
          <h1 className="display-hero">Foundation Members</h1>
          <p>The hearts and hands guiding the MasterBrush Art Foundation vision.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">People of MasterBrush</p>
            <h2 className="display-section">Meet Our Team &amp; Mentors</h2>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '60px', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading members directory...</p>
          ) : members.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)' }}>No members listed in the database yet.</p>
          ) : (
            <div>
              {/* Founder & Leadership Section */}
              {members.filter(m => m.isFounder || m.role?.toLowerCase().includes('founder')).length > 0 && (
                <div style={{ marginBottom: '50px' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '24px', borderBottom: '2px solid var(--saffron-pale)', paddingBottom: '8px' }}>
                    Leadership &amp; Founders
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    {members.filter(m => m.isFounder || m.role?.toLowerCase().includes('founder')).map(member => (
                      <div key={member._id} style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-soft)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', maxWidth: '420px' }}>
                        <div style={{ height: '360px', overflow: 'hidden', position: 'relative', background: '#F8FAFC' }}>
                          <img 
                            src={member.image || '/founder.jpg'} 
                            alt="" 
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.8)', transform: 'scale(1.1)' }} 
                          />
                          <img 
                            src={member.image || '/founder.jpg'} 
                            alt={member.name} 
                            style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} 
                          />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '16px', zIndex: 2 }}>
                            <span className="status-badge status-pending" style={{ fontSize: '0.75rem' }}>{member.role}</span>
                          </div>
                        </div>
                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '10px' }}>{member.name}</h3>
                            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-mid)', marginBottom: '16px' }}>{member.info}</p>
                          </div>
                          {member.highlights && member.highlights.length > 0 && (
                            <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '16px' }}>
                              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '8px', fontWeight: 700 }}>Highlights:</h4>
                              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.85rem', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {member.highlights.map((h, idx) => <li key={idx}>{h}</li>)}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approved Artists & Members Section */}
              <div>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '24px', borderBottom: '2px solid var(--saffron-pale)', paddingBottom: '8px' }}>
                  Our Specially-Abled Artists &amp; Members
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
                  {members.filter(m => !(m.isFounder || m.role?.toLowerCase().includes('founder')) && m.isApproved !== false).map(member => (
                    <div key={member._id} style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-soft)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', maxWidth: '420px' }}>
                      <div style={{ height: '300px', overflow: 'hidden', position: 'relative', background: '#F8FAFC' }}>
                        <img 
                          src={member.image || '/logo.png'} 
                          alt="" 
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.8)', transform: 'scale(1.1)' }} 
                        />
                        <img 
                          src={member.image || '/logo.png'} 
                          alt={member.name} 
                          style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }} 
                        />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', padding: '16px', zIndex: 2 }}>
                          <span style={{ background: 'var(--saffron)', color: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>{member.role || 'Specially-Abled Artist'}</span>
                        </div>
                      </div>

                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ marginBottom: '20px' }}>
                          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '8px' }}>{member.name}</h3>
                          {member.instagram && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                              <InstagramIcon size={14} /> @{member.instagram}
                            </p>
                          )}
                          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-mid)', margin: 0 }}>
                            {member.info || 'Passionate artist creating inspiring handcrafted artworks at MasterBrush Art Foundation.'}
                          </p>
                        </div>
                        <button 
                          className="btn btn-primary" 
                          style={{ width: '100%', padding: '10px 0', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: 'auto' }}
                          onClick={() => {
                            setSelectedArtist(member);
                            setActivePage('artist-portfolio');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          Explore Art
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
