import React from 'react';
import { Phone, Mail, MapPin, Clock, Compass } from 'lucide-react';

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.017 0 12 0 12s0 3.983.502 5.837a3.003 3.003 0 002.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.983 24 12 24 12s0-3.983-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer({ setActivePage }) {
  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-logo-wrap">
            <div className="footer-logo" style={{ marginBottom: '14px' }}>
              <img src="/logo.png" alt="MasterBrush Logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
            </div>
            <p className="footer-desc">An art initiative dedicated to promoting creativity and providing art education for all — including specially-abled artists.</p>
            <div className="footer-tagline">Bringing Art to Every Heart ♡</div>
            <div className="social-row" style={{ marginTop: '20px' }}>
              <a className="social-btn" href="#"><FacebookIcon size={16} /></a>
              <a className="social-btn" href="#"><InstagramIcon size={16} /></a>
              <a className="social-btn" href="#"><YoutubeIcon size={16} /></a>
              <a className="social-btn" href="#"><Compass size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a onClick={() => handlePageChange('about')}>About Us</a></li>
              <li><a onClick={() => handlePageChange('members')}>Members</a></li>
              <li><a onClick={() => handlePageChange('gallery')}>Gallery</a></li>
              <li><a onClick={() => handlePageChange('events')}>Events</a></li>
              <li><a onClick={() => handlePageChange('shop')}>Shop</a></li>
              <li><a onClick={() => handlePageChange('blog')}>Blog</a></li>
              <li><a onClick={() => handlePageChange('contact')}>Contact</a></li>
              <li><a href="http://localhost:5174/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--saffron-light)' }}>Admin Dashboard</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Events</h4>
            <ul className="footer-links">
              <li><a onClick={() => handlePageChange('events')}>Art Exhibition 2025</a></li>
              <li><a onClick={() => handlePageChange('events')}>Acrylic Workshop</a></li>
              <li><a onClick={() => handlePageChange('events')}>Art Retreat</a></li>
              <li><a onClick={() => handlePageChange('events')}>Art Competition</a></li>
            </ul>
            <h4 style={{ marginTop: '20px' }}>Support Us</h4>
            <ul className="footer-links">
              <li><a onClick={() => handlePageChange('support')}>Donate</a></li>
              <li><a onClick={() => handlePageChange('support')}>Sponsor an Artist</a></li>
              <li><a onClick={() => handlePageChange('support')}>Donate Materials</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Phone size={14} /></span>
              <span>+91 98765 43210</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Mail size={14} /></span>
              <span>info@masterbrushartfoundation.org</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><MapPin size={14} /></span>
              <span>Hyderabad, Telangana, India</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><Clock size={14} /></span>
              <span>Mon–Sat: 9:00 AM – 6:00 PM</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 MasterBrush Art Foundation. All Rights Reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
