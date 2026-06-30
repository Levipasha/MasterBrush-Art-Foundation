import React, { useState, useEffect } from 'react';
import { Users, Award, Calendar, ExternalLink } from 'lucide-react';

const API_BASE = 'https://ngo-backend-production-b2ee.up.railway.app/api';

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
            <p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)' }}>No members listed in the database yet. Add members via the Admin portal.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {members.map(member => (
                <div key={member._id} style={{ display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-soft)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}>
                  {/* Photo wrapping */}
                  <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={member.image || '/logo.png'} 
                      alt={member.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', padding: '16px', display: 'flex', alignItems: 'flex-end' }}>
                      <span className="status-badge status-pending" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{member.role}</span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '12px' }}>{member.name}</h3>
                      <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--text-mid)', marginBottom: '24px' }}>
                        {member.info}
                      </p>
                    </div>

                    {/* Highlights list */}
                    {member.highlights && member.highlights.length > 0 && (
                      <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: '20px' }}>
                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '10px', fontWeight: 700 }}>Highlights &amp; Specialties:</h4>
                        <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.85rem', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {member.highlights.map((h, idx) => (
                            <li key={idx}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
