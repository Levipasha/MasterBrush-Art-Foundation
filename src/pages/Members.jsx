import React, { useState, useEffect } from 'react';
import { Users, Award, Calendar, ExternalLink } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Members({ setActivePage, triggerToast }) {
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
                        <div style={{ height: '360px', overflow: 'hidden', position: 'relative' }}>
                          <img src={member.image || '/founder.jpg'} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '16px' }}>
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
                          alt={member.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                        <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#E2F0D9', color: '#2E7D32', padding: '4px 12px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          ✓ UDID Verified Artist
                        </div>
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.75))', padding: '16px' }}>
                          <span style={{ background: 'var(--saffron)', color: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>{member.role || 'Specially-Abled Artist'}</span>
                        </div>
                      </div>

                      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '8px' }}>{member.name}</h3>
                          {member.email && <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '12px' }}>✉ {member.email}</p>}
                          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-mid)', marginBottom: '20px' }}>
                            {member.info || 'Passionate artist creating inspiring handcrafted artworks at MasterBrush Art Foundation.'}
                          </p>
                        </div>

                        {/* Artist Created Artworks Portfolio Gallery */}
                        {member.artworks && member.artworks.length > 0 && (
                          <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '16px', marginTop: '12px' }}>
                            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--navy)', marginBottom: '12px', fontWeight: 700 }}>
                              🎨 Artist Portfolio ({member.artworks.length} Art Pieces):
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                              {member.artworks.map((art, idx) => (
                                <div key={art.id || idx} style={{ border: '1px solid var(--border-soft)', borderRadius: '10px', overflow: 'hidden', background: '#F8FAFC' }}>
                                  <div style={{ height: '90px', overflow: 'hidden' }}>
                                    <img src={art.image} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  </div>
                                  <div style={{ padding: '8px' }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{art.title}</div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--saffron)', fontWeight: '700', marginTop: '2px' }}>₹{art.price ? art.price.toLocaleString('en-IN') : 'N/A'}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
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
