import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartCount, toggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide if scrolling down past 100px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setVisible(true);
  }, [activePage]);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'members', label: 'Members' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'events', label: 'Events' },
    { id: 'shop', label: 'Shop' },
    { id: 'support', label: 'Donate' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.div 
        className="navbar-floating-container"
        animate={{ y: (visible || mobileMenuOpen) ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="navbar-pill">
          <a className="logo" onClick={() => handlePageChange('home')} style={{ cursor: 'pointer', padding: '4px' }}>
            {/* Logo Icon PNG */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img src="/logo.png" alt="MasterBrush Logo" className="logo-icon" style={{ width: '54px', height: '54px', objectFit: 'contain' }} />
            </motion.div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden-mobile" style={{ display: 'flex', alignItems: 'center' }}>
            <ul className="navbar-pill-links">
              {navLinks.map((link) => (
                <motion.li 
                  key={link.id}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <a 
                    onClick={() => handlePageChange(link.id)} 
                    className={activePage === link.id ? 'active' : ''}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Right side CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Donate Button */}
            <motion.a 
              className="btn btn-donate hidden-mobile" 
              onClick={() => handlePageChange('support')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate
            </motion.a>

            {/* Mobile menu toggle button */}
            <motion.button 
              className="mobile-toggle-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              whileTap={{ scale: 0.9 }}
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-overlay-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button 
              className="mobile-overlay-close" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>
            <ul className="mobile-overlay-links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a 
                    onClick={() => handlePageChange(link.id)}
                    style={activePage === link.id ? { color: 'var(--saffron)' } : {}}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}

            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
