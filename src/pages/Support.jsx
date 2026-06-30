import React, { useState, useEffect } from 'react';
import { Coins, Palette, School, HeartHandshake } from 'lucide-react';

const API_BASE = 'https://ngo-backend-production-b2ee.up.railway.app/api';

export default function Support({ setActivePage, triggerToast }) {
  const [presetAmount, setPresetAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('Sponsor an Artist');
  const [donors, setDonors] = useState([]);
  
  const [donorForm, setDonorForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    showOnWall: true
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch donor wall list
  const fetchDonors = async () => {
    try {
      const response = await fetch(`${API_BASE}/donations/wall`);
      const data = await response.json();
      if (data.success) {
        setDonors(data.donors);
      }
    } catch (err) {
      console.error("Error fetching donor wall:", err);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setDonorForm({ ...donorForm, [e.target.name]: value });
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : presetAmount;
    
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      triggerToast('Please select or input a valid donation amount');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...donorForm,
          amount: finalAmount,
          project: cause
        })
      });
      const data = await response.json();
      
      if (data.success) {
        triggerToast('Thank you for your generous donation! ♥');
        // Reset form
        setDonorForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          showOnWall: true
        });
        setCustomAmount('');
        // Re-fetch donor wall list
        fetchDonors();
      } else {
        triggerToast(data.message || 'Donation failed');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error, could not process donation.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Support Our Mission</span></div>
          <h1 className="display-hero">Support Our Mission</h1>
          <p>Your support brings art to every heart. Every contribution — big or small — makes a difference.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Ways You Can Support</p>
            <h2 className="display-section">How to Help</h2>
          </div>

          <div className="support-ways">
            <div className="support-card" onClick={() => setCause('Sponsor an Artist')} style={cause === 'Sponsor an Artist' ? { borderColor: 'var(--saffron)', background: 'var(--saffron-pale)' } : { cursor: 'pointer' }}>
              <div className="support-card-icon icon-saffron"><Coins size={24} /></div>
              <div>
                <h3>Sponsor an Artist</h3>
                <p>Support an artist's journey by funding their education, materials and exhibition opportunities. Your sponsorship empowers a creative life.</p>
              </div>
            </div>
            <div className="support-card" onClick={() => setCause('Donate Materials')} style={cause === 'Donate Materials' ? { borderColor: 'var(--saffron)', background: 'var(--saffron-pale)' } : { cursor: 'pointer' }}>
              <div className="support-card-icon icon-pink"><Palette size={24} /></div>
              <div>
                <h3>Donate Materials</h3>
                <p>Help us provide brushes, canvases, paints and other art materials to deserving students who cannot afford them.</p>
              </div>
            </div>
            <div className="support-card" onClick={() => setCause('Fund Workshops')} style={cause === 'Fund Workshops' ? { borderColor: 'var(--saffron)', background: 'var(--saffron-pale)' } : { cursor: 'pointer' }}>
              <div className="support-card-icon icon-green"><School size={24} /></div>
              <div>
                <h3>Fund Workshops</h3>
                <p>Support free or subsidized workshops for children from underserved communities and specially-abled artists.</p>
              </div>
            </div>
            <div className="support-card" onClick={() => setCause('Support Inclusive Programs')} style={cause === 'Support Inclusive Programs' ? { borderColor: 'var(--saffron)', background: 'var(--saffron-pale)' } : { cursor: 'pointer' }}>
              <div className="support-card-icon icon-purple"><HeartHandshake size={24} /></div>
              <div>
                <h3>Support Inclusive Programs</h3>
                <p>Help us expand our art therapy and inclusive art training programs for specially-abled artists across Hyderabad.</p>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="support-main-grid">
            <div className="contact-form" style={{ padding: '32px' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', marginBottom: '16px' }}>Make a Contribution</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '24px' }}>
                Cause selected: <strong>{cause}</strong>
              </p>

              <form onSubmit={handleDonateSubmit}>
                {/* Preset Amount Grid */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '8px' }}>Select Donation Amount (INR) *</label>
                  <div className="presets-grid">
                    {[500, 1000, 2500, 5000].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        className="btn"
                        style={{
                          fontSize: '0.82rem',
                          padding: '10px 0',
                          background: presetAmount === amount && !customAmount ? 'var(--navy)' : 'white',
                          color: presetAmount === amount && !customAmount ? 'white' : 'var(--navy)',
                          border: '1.5px solid var(--border-soft)',
                          borderRadius: 'var(--radius-sm)'
                        }}
                        onClick={() => {
                          setPresetAmount(amount);
                          setCustomAmount('');
                        }}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <input
                      type="number"
                      placeholder="Or enter custom amount in INR"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                      }}
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Name (Optional, defaults to Anonymous)</label>
                  <input
                    type="text"
                    name="name"
                    value={donorForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name (e.g. Rajesh Kumar)"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={donorForm.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com (For receiving tax invoices)"
                  />
                </div>
                <div className="form-group">
                  <label>Your Message (Optional)</label>
                  <textarea
                    name="message"
                    value={donorForm.message}
                    onChange={handleInputChange}
                    placeholder="Write a message of support..."
                    style={{ minHeight: '80px' }}
                  ></textarea>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <input
                    type="checkbox"
                    id="showOnWall"
                    name="showOnWall"
                    checked={donorForm.showOnWall}
                    onChange={handleInputChange}
                    style={{ width: 'auto' }}
                  />
                  <label htmlFor="showOnWall" style={{ fontSize: '0.82rem', cursor: 'pointer', color: 'var(--text-mid)' }}>Show my name, amount, and message on the Donor Wall</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : `Donate ₹${(customAmount ? parseFloat(customAmount) || 0 : presetAmount).toLocaleString()} Now ♥`}
                </button>
              </form>
            </div>

            {/* QR/Bank transfers */}
            <div>
              <div className="qr-card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Scan to Donate</h3>
                <div className="qr-placeholder">
                  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" fill="white"/>
                    <rect x="5" y="5" width="35" height="35" fill="none" stroke="#333" stroke-width="3"/>
                    <rect x="12" y="12" width="21" height="21" fill="#333"/>
                    <rect x="60" y="5" width="35" height="35" fill="none" stroke="#333" stroke-width="3"/>
                    <rect x="67" y="12" width="21" height="21" fill="#333"/>
                    <rect x="5" y="60" width="35" height="35" fill="none" stroke="#333" stroke-width="3"/>
                    <rect x="12" y="67" width="21" height="21" fill="#333"/>
                    <rect x="60" y="60" width="8" height="8" fill="#333"/>
                    <rect x="74" y="60" width="8" height="8" fill="#333"/>
                    <rect x="60" y="74" width="8" height="8" fill="#333"/>
                    <rect x="74" y="74" width="8" height="8" fill="#333"/>
                    <rect x="88" y="60" width="7" height="7" fill="#333"/>
                    <rect x="88" y="74" width="7" height="7" fill="#333"/>
                    <rect x="88" y="88" width="7" height="7" fill="#333"/>
                  </svg>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Scan the QR code to make a secure donation</p>
              </div>
              <div className="bank-details">
                <h3 style={{ marginBottom: '16px', fontSize: '1rem' }}>Bank Transfer Details</h3>
                <div className="bank-row"><span className="bank-label">Account Name</span><span className="bank-value">MasterBrush Art Foundation</span></div>
                <div className="bank-row"><span className="bank-label">A/C No.</span><span className="bank-value">1234567890172345</span></div>
                <div className="bank-row"><span className="bank-label">IFSC Code</span><span className="bank-value">HDFC0P00334</span></div>
                <div className="bank-row"><span className="bank-label">Bank</span><span className="bank-value">HDFC Bank</span></div>
                <div className="bank-row"><span className="bank-label">Branch</span><span className="bank-value">Hyderabad</span></div>
              </div>
            </div>
          </div>

          {/* Join Our Mission CTA */}
          <div style={{ marginTop: '56px', padding: '40px', background: 'var(--navy)', color: 'white', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', background: 'rgba(224,123,42,0.1)', borderRadius: '50%' }}></div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: 'white', marginBottom: '12px' }}>Join Our Mission</h3>
            <p style={{ maxWidth: '640px', margin: '0 auto 24px', fontSize: '0.92rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.6' }}>
              Whether you are an artist, volunteer, educator, donor, institution, or someone who believes in the power of creativity, there is a place for you at <strong>MasterBrush Art Foundation</strong>. Together, we can build a more inclusive, compassionate, and creative world where every individual has the opportunity to thrive through the transformative power of art.
            </p>
            <a className="btn btn-accent" onClick={() => setActivePage('contact')}>Get Involved Today →</a>
          </div>

          {/* Live Donor Wall rendering */}
          <div style={{ marginTop: '64px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--navy)' }}>Donor Wall</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '4px' }}>Celebrating those who support our community.</p>
            
            {donors.length === 0 ? (
              <p style={{ marginTop: '24px', fontStyle: 'italic', color: 'var(--text-light)' }}>No public donations reported yet. Be the first!</p>
            ) : (
              <div className="donor-wall-list">
                {donors.map((donor, idx) => (
                  <div key={idx} className="donor-wall-card">
                    <div className="donor-wall-card-info">
                      <div className="donor-wall-card-name">{donor.name}</div>
                      <div className="donor-wall-card-project">Supported: {donor.project}</div>
                      {donor.message && <div className="donor-wall-card-msg">"{donor.message}"</div>}
                    </div>
                    <div className="donor-wall-card-amount">
                      ₹{donor.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
