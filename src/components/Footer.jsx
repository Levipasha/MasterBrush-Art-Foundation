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

const WhatsappIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.456h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
              <img src="/cropped_circle_image.png" alt="MasterBrush Logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
            </div>
            <p className="footer-desc">An art initiative dedicated to promoting creativity and providing art education for all — including specially-abled artists.</p>
            <div className="footer-tagline">Bringing Art to Every Heart ♡</div>
            <div className="social-row" style={{ marginTop: '20px' }}>
              <a className="social-btn" href="#"><FacebookIcon size={16} /></a>
              <a className="social-btn" href="https://www.instagram.com/masterbrushartfoundation/" target="_blank" rel="noopener noreferrer"><InstagramIcon size={16} /></a>
              <a className="social-btn" href="#"><YoutubeIcon size={16} /></a>
              <a className="social-btn" href="#"><Compass size={16} /></a>
              <a className="social-btn" href="https://chat.whatsapp.com/FFoLfhaCvmkH0BSHT8EpxG?s=cl&p=a&mlu=0&amv=0" target="_blank" rel="noopener noreferrer"><WhatsappIcon size={16} /></a>
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
              <li><a onClick={() => handlePageChange('login')}>Login / Register</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Events & Community</h4>
            <ul className="footer-links">
              <li><a onClick={() => handlePageChange('events')}>Art Exhibition 2025</a></li>
              <li><a onClick={() => handlePageChange('events')}>Acrylic Workshop</a></li>
              <li><a onClick={() => handlePageChange('events')}>Art Retreat</a></li>
              <li><a onClick={() => handlePageChange('events')}>Art Competition</a></li>
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
            <a onClick={() => handlePageChange('privacy-policy')} style={{ cursor: 'pointer' }}>Privacy Policy</a>
            <a onClick={() => handlePageChange('terms-conditions')} style={{ cursor: 'pointer' }}>Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
