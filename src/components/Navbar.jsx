import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, User, ChevronDown, LogOut } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, cartCount, toggleCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Read user from localStorage (syncs when page changes)
  useEffect(() => {
    const readUser = () => {
      try {
        const saved = localStorage.getItem('ngo_user');
        setLoggedInUser(saved ? JSON.parse(saved) : null);
      } catch {
        setLoggedInUser(null);
      }
    };
    readUser();
    // Re-check whenever activePage changes (catches login/logout)
  }, [activePage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('ngo_user');
    setLoggedInUser(null);
    setProfileDropdownOpen(false);
    setActivePage('home');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'members', label: 'Members' },
    { id: 'art', label: 'Art' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'events', label: 'Events' },
    { id: 'shop', label: 'Shop' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  // Get initials for avatar placeholder
  const getInitials = (name = '') =>
    name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <>
      <motion.div
        className="navbar-floating-container"
        animate={{ y: (visible || mobileMenuOpen) ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="navbar-pill">
          <a className="logo" onClick={() => handlePageChange('home')} style={{ cursor: 'pointer', padding: '4px' }}>
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

            {loggedInUser ? (
              /* ── Logged-in Profile Avatar + Dropdown ── */
              <div className="navbar-profile-dropdown hidden-mobile" style={{ position: 'relative' }}>
                <motion.button
                  onClick={() => setProfileDropdownOpen(prev => !prev)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--navy)',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '5px 14px 5px 5px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(26,26,78,0.2)'
                  }}
                >
                  {/* Avatar */}
                  {(loggedInUser.photoURL || loggedInUser.image) ? (
                    <img
                      src={loggedInUser.photoURL || loggedInUser.image}
                      alt={loggedInUser.name}
                      style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #F97316' }}
                    />
                  ) : (
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F97316, #EA580C)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0
                    }}>
                      {getInitials(loggedInUser.name)}
                    </div>
                  )}
                  {/* Name */}
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {loggedInUser.name?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown
                    size={14}
                    color="white"
                    style={{ transition: 'transform 0.2s', transform: profileDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                        background: 'white', borderRadius: '14px', minWidth: '200px',
                        boxShadow: '0 8px 32px rgba(26,26,78,0.15)', border: '1px solid var(--border-soft)',
                        overflow: 'hidden', zIndex: 1000
                      }}
                    >
                      {/* User Info Header */}
                      <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-soft)', background: 'var(--cream)' }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy)' }}>{loggedInUser.name}</div>
                        <div style={{ fontSize: '0.73rem', color: 'var(--text-light)', marginTop: '2px' }}>{loggedInUser.email}</div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#EA580C', marginTop: '4px', background: '#FFEDD5', display: 'inline-block', padding: '2px 8px', borderRadius: '20px' }}>
                          {loggedInUser.role}
                        </div>
                      </div>
                      {/* My Studio link */}
                      <button
                        onClick={() => handlePageChange('login')}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          width: '100%', padding: '12px 16px', background: 'none',
                          border: 'none', cursor: 'pointer', fontSize: '0.84rem',
                          fontWeight: 600, color: 'var(--navy)', transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <User size={15} color="var(--saffron)" />
                        My Account Studio
                      </button>
                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          width: '100%', padding: '12px 16px', background: 'none',
                          border: 'none', borderTop: '1px solid var(--border-soft)',
                          cursor: 'pointer', fontSize: '0.84rem', fontWeight: 600,
                          color: '#EA580C', transition: 'background 0.15s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#FFF7ED'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      >
                        <LogOut size={15} />
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* ── Guest: Login / Register button ── */
              <motion.a
                className="btn btn-donate hidden-mobile"
                onClick={() => handlePageChange('login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login / Register
              </motion.a>
            )}

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
              {/* Mobile login/profile link */}
              {loggedInUser ? (
                <>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <a onClick={() => handlePageChange('login')} style={{ color: '#EA580C' }}>
                      👤 {loggedInUser.name?.split(' ')[0]} — My Studio
                    </a>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.05 + 0.1 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <a onClick={handleLogout} style={{ color: '#EA580C' }}>
                      🚪 Log Out
                    </a>
                  </motion.li>
                </>
              ) : (
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a onClick={() => handlePageChange('login')}>
                    Login / Register
                  </a>
                </motion.li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
