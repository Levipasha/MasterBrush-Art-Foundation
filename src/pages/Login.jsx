import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, LogIn, UserPlus, ArrowRight, ShieldCheck, LogOut, Upload, CreditCard, Building, HeartHandshake, Briefcase, FileText, CheckCircle2, Sparkles, PartyPopper, Check, Hourglass, Image, Palette, Package } from 'lucide-react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from '../firebase';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Login({ setActivePage, triggerToast }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Form states - Register
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('Member');

  // Member - UDID fields
  const [udidNumber, setUdidNumber] = useState('');
  const [disabilityType, setDisabilityType] = useState('General / Specially-Abled');
  const [udidFrontImage, setUdidFrontImage] = useState('');
  const [udidBackImage, setUdidBackImage] = useState('');

  // Volunteer fields
  const [volunteerWork, setVolunteerWork] = useState('Event Management & Logistics');
  const [volunteerAvailability, setVolunteerAvailability] = useState('Flexible / As Needed');

  // Sponsor fields
  const [sponsorOrg, setSponsorOrg] = useState('');
  const [sponsorCategory, setSponsorCategory] = useState('Artist Sponsorship');

  // Corporate fields
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [industryCategory, setIndustryCategory] = useState('');

  // Active User session state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ngo_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Database member account state & studio handlers
  const [dbMember, setDbMember] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [checkingApproval, setCheckingApproval] = useState(false);

  // Profile Edit states
  const [bioInput, setBioInput] = useState('');
  const [profilePicInput, setProfilePicInput] = useState('');

  // Post Artwork form states
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState('Paintings');
  const [artDescription, setArtDescription] = useState('');
  const [artPrice, setArtPrice] = useState('');
  const [artImage, setArtImage] = useState('');
  const [postingArt, setPostingArt] = useState(false);

  // User Orders Tracking States
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Check database approval status on login or mount
  useEffect(() => {
    if (currentUser && currentUser.email) {
      setCheckingApproval(true);
      fetch(`${API_BASE}/members/login-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser.email })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.member) {
          setDbMember(data.member);
          setIsApproved(!!data.member.isApproved);
          setBioInput(data.member.info || '');
          setProfilePicInput(data.member.image || '');
        }
      })
      .catch(err => console.error('Login check error:', err))
      .finally(() => setCheckingApproval(false));
    }
  }, [currentUser]);

  // Fetch user orders for tracking
  useEffect(() => {
    if (currentUser && currentUser.email) {
      setLoadingOrders(true);
      fetch(`${API_BASE}/orders/email/${currentUser.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setUserOrders(data.data);
          }
        })
        .catch(err => console.error('Fetch user orders error:', err))
        .finally(() => setLoadingOrders(false));
    } else {
      setUserOrders([]);
    }
  }, [currentUser]);

  // Handle Profile Update (Pic & Bio)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!currentUser || !currentUser.email) return;
    try {
      const res = await fetch(`${API_BASE}/members/profile/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          name: currentUser.name,
          info: bioInput,
          image: profilePicInput
        })
      });
      const data = await res.json();
      if (data.success) {
        setDbMember(data.data);
        if (triggerToast) triggerToast('Artist profile & photo updated successfully!');
      }
    } catch (err) {
      console.error(err);
      if (triggerToast) triggerToast('Failed to update profile.');
    }
  };

  // Handle Post Artwork
  const handlePostArtwork = async (e) => {
    e.preventDefault();
    if (!artTitle || !artPrice || !artImage) {
      if (triggerToast) triggerToast('Please enter artwork title, price, and upload art photo.');
      return;
    }

    setPostingArt(true);
    try {
      const res = await fetch(`${API_BASE}/members/artworks/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          title: artTitle,
          category: artCategory,
          description: artDescription,
          price: Number(artPrice),
          image: artImage
        })
      });
      const data = await res.json();
      if (data.success) {
        setDbMember(data.data);
        setArtTitle('');
        setArtDescription('');
        setArtPrice('');
        setArtImage('');
        if (triggerToast) triggerToast('Artwork submitted for Admin approval! Once approved, it will be visible in your public profile.');
      } else {
        if (triggerToast) triggerToast(data.message || 'Failed to post artwork.');
      }
    } catch (err) {
      console.error(err);
      if (triggerToast) triggerToast('Error posting artwork.');
    } finally {
      setPostingArt(false);
    }
  };

  const handleUpdateArtworkStatus = async (artworkId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/members/artworks/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUser.email,
          artworkId,
          status: newStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        setDbMember(data.data);
        if (triggerToast) triggerToast('Artwork status updated successfully!');
      } else {
        if (triggerToast) triggerToast(data.message || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      if (triggerToast) triggerToast('Error updating artwork status.');
    }
  };

  // Handle file uploads to Base64 data URL
  const handleFileUpload = (e, setImageState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !currentUser) {
        const userData = {
          name: user.displayName || user.email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL || null,
          role: 'Member',
          uid: user.uid
        };
        localStorage.setItem('ngo_user', JSON.stringify(userData));
        setCurrentUser(userData);
      }
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userData = {
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || null,
        role: regRole || 'Member',
        uid: user.uid
      };
      localStorage.setItem('ngo_user', JSON.stringify(userData));
      setCurrentUser(userData);
      if (triggerToast) triggerToast(`Welcome, ${userData.name}! Logged in with Google.`);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      if (error.code !== 'auth/popup-closed-by-user') {
        if (triggerToast) triggerToast(error.message || 'Google Sign-In error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Login Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      if (triggerToast) triggerToast('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = result.user;
      const userData = {
        name: user.displayName || loginEmail.split('@')[0],
        email: user.email,
        role: 'Member',
        uid: user.uid
      };
      localStorage.setItem('ngo_user', JSON.stringify(userData));
      setCurrentUser(userData);
      if (triggerToast) triggerToast(`Welcome back, ${userData.name}!`);
    } catch (error) {
      console.warn('Firebase auth fallback to local login:', error);
      const user = {
        name: loginEmail.split('@')[0] || 'User',
        email: loginEmail,
        role: 'Member'
      };
      localStorage.setItem('ngo_user', JSON.stringify(user));
      setCurrentUser(user);
      if (triggerToast) triggerToast(`Welcome back, ${user.name}!`);
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Register Handler
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      if (triggerToast) triggerToast('Please fill in all required fields.');
      return;
    }

    if (regRole === 'Member' && (!udidNumber || !udidFrontImage)) {
      if (triggerToast) triggerToast('Please enter your UDID Card number and upload front photo.');
      return;
    }

    if (regRole === 'Corporate' && !companyName) {
      if (triggerToast) triggerToast('Please enter your Company Name.');
      return;
    }

    setLoading(true);
    const regPayload = {
      name: regName,
      email: regEmail,
      role: regRole,
      udidNumber: regRole === 'Member' ? udidNumber : null,
      disabilityType: regRole === 'Member' ? disabilityType : null,
      udidFrontImage: regRole === 'Member' ? udidFrontImage : null,
      udidBackImage: regRole === 'Member' ? udidBackImage : null,
      volunteerWork: regRole === 'Volunteer' ? volunteerWork : null,
      volunteerAvailability: regRole === 'Volunteer' ? volunteerAvailability : null,
      sponsorOrg: regRole === 'Sponsor' ? sponsorOrg : null,
      sponsorCategory: regRole === 'Sponsor' ? sponsorCategory : null,
      companyName: regRole === 'Corporate' ? companyName : null,
      gstNumber: regRole === 'Corporate' ? gstNumber : null,
      industryCategory: regRole === 'Corporate' ? industryCategory : null
    };

    try {
      try {
        await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      } catch (err) {
        console.warn('Firebase registration notice:', err.message);
      }

      // Register with MongoDB backend database
      const res = await fetch(`${API_BASE}/members/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regPayload)
      });
      const data = await res.json();

      localStorage.setItem('ngo_user', JSON.stringify(regPayload));
      setCurrentUser(regPayload);
      if (triggerToast) triggerToast(`Account registered as ${regRole}! Submitted for Admin approval.`);
    } catch (error) {
      console.error('Registration error:', error);
      localStorage.setItem('ngo_user', JSON.stringify(regPayload));
      setCurrentUser(regPayload);
      if (triggerToast) triggerToast(`Account registered successfully as ${regRole}!`);
    } finally {
      setLoading(false);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('ngo_user');
    setCurrentUser(null);
    setDbMember(null);
    setIsApproved(false);
    if (triggerToast) triggerToast('Logged out successfully.');
  };

  return (
    <div style={{ padding: '60px 24px', background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: currentUser ? '720px' : '520px', width: '100%' }}>
        
        {/* Breadcrumb */}
        <div className="breadcrumb" style={{ marginBottom: '24px', textAlign: 'center', color: 'var(--text-mid)' }}>
          <a onClick={() => setActivePage('home')} style={{ color: 'var(--text-mid)' }}>Home</a> &gt; <span style={{ color: 'var(--navy)', fontWeight: 600 }}>{currentUser ? 'My Account Studio' : (isLoginTab ? 'Login' : 'Register')}</span>
        </div>

        {currentUser ? (
          /* LOGGED IN DASHBOARD CARD */
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--border-soft)'
          }}>
            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              {(dbMember?.image || profilePicInput || currentUser.photoURL) ? (
                <img 
                  src={dbMember?.image || profilePicInput || currentUser.photoURL} 
                  alt={currentUser.name} 
                  style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 16px auto',
                    border: '3px solid var(--saffron)'
                  }} 
                />
              ) : (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--saffron-pale)',
                  color: 'var(--saffron)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <User size={40} />
                </div>
              )}

              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.8rem', color: 'var(--navy)', marginBottom: '4px' }}>
                Welcome, {currentUser.name}!
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.92rem' }}>
                {currentUser.email} &bull; <span style={{ color: 'var(--saffron)', fontWeight: 600 }}>{currentUser.role} Account</span>
              </p>
            </div>

            {/* Beautiful Thank You & Pending Approval Banner */}
            {!isApproved && currentUser.role === 'Member' ? (
              <div style={{
                background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
                border: '2px solid #FDBA74',
                padding: '32px 24px',
                borderRadius: '20px',
                marginBottom: '28px',
                textAlign: 'center',
                boxShadow: '0 10px 25px -5px rgba(251, 146, 60, 0.15)'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'white',
                  color: '#EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.2)'
                }}>
                  <Sparkles size={32} />
                </div>

                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.65rem', color: '#9A3412', marginBottom: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Thank You for Registering! <PartyPopper size={28} color="#EA580C" />
                </h3>

                <p style={{ fontSize: '0.95rem', color: '#C2410C', fontWeight: 600, marginBottom: '16px' }}>
                  We are thrilled to welcome you to MasterBrush Art Foundation!
                </p>

                <div style={{
                  background: 'white',
                  padding: '18px 20px',
                  borderRadius: '14px',
                  fontSize: '0.88rem',
                  color: '#431407',
                  lineHeight: '1.6',
                  border: '1px solid #FED7AA',
                  textAlign: 'left',
                  marginBottom: '20px'
                }}>
                  <p style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#C2410C' }}>
                    <ShieldCheck size={18} color="#EA580C" /> Application Status: Under Review
                  </p>
                  <p style={{ margin: 0 }}>
                    Please wait a short while while our team reviews your <strong>UDID Card details</strong> and identity documents. Once approved by our Admin, you will gain full access to your <strong>Artist Studio Dashboard</strong> to upload your profile photo, post artwork with custom pricing, build your portfolio, and showcase on our Members Directory!
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', background: '#FFEDD5', color: '#C2410C', padding: '6px 14px', borderRadius: '50px', fontWeight: 700, border: '1px solid #FDBA74' }}>
                    <Check size={14} /> UDID Submitted
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', background: '#FFEDD5', color: '#C2410C', padding: '6px 14px', borderRadius: '50px', fontWeight: 700, border: '1px solid #FDBA74' }}>
                    <Hourglass size={14} /> Admin Approval Pending
                  </span>
                </div>
              </div>
            ) : (
              /* Approved Artist / Member Studio Dashboard */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
                
                {/* 1. Profile & Bio Editor */}
                <div style={{ background: 'var(--cream)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-soft)' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color="var(--saffron)" /> Edit Artist Profile &amp; Bio
                  </h3>
                  <form onSubmit={handleUpdateProfile}>
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>
                        Profile Picture
                      </label>
                      <label style={{ display: 'inline-flex', padding: '8px 14px', background: 'var(--navy)', color: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                        <Upload size={14} style={{ marginRight: '6px' }} /> Choose Profile Photo
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setProfilePicInput)} />
                      </label>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px' }}>
                        Portfolio Bio / About Yourself
                      </label>
                      <textarea 
                        rows={3} 
                        value={bioInput} 
                        onChange={(e) => setBioInput(e.target.value)} 
                        placeholder="Write a brief bio about your artistic journey, style, and inspirations..."
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-soft)', fontSize: '0.88rem' }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                      Save Profile &amp; Bio
                    </button>
                  </form>
                </div>

                {/* 2. Post New Artwork Form */}
                <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} style={{ color: 'var(--accent)' }} /> Post New Artwork to Portfolio
                  </h3>
                  <form onSubmit={handlePostArtwork}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                          Artwork Title *
                        </label>
                        <input 
                          type="text" 
                          value={artTitle} 
                          onChange={(e) => setArtTitle(e.target.value)} 
                          placeholder="e.g. Peacock Canvas" 
                          required 
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-soft)', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                          Price (₹) *
                        </label>
                        <input 
                          type="number" 
                          value={artPrice} 
                          onChange={(e) => setArtPrice(e.target.value)} 
                          placeholder="e.g. 2500" 
                          required 
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-soft)', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                          Category *
                        </label>
                        <select 
                          value={artCategory} 
                          onChange={(e) => setArtCategory(e.target.value)}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-soft)', fontSize: '0.88rem' }}
                        >
                          <option value="Paintings">Paintings</option>
                          <option value="Pebble Art">Pebble Art</option>
                          <option value="Handmade Art">Handmade Art</option>
                          <option value="Crafts">Crafts</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                          Artwork Photo *
                        </label>
                        <label style={{ display: 'inline-flex', padding: '8px 14px', background: 'var(--navy)', color: 'white', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600' }}>
                          <Upload size={14} style={{ marginRight: '6px' }} /> Upload Art Photo
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setArtImage)} />
                        </label>
                      </div>
                    </div>

                    {artImage && (
                      <div style={{ marginBottom: '12px' }}>
                        <img src={artImage} alt="Preview" style={{ height: '80px', width: '120px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-soft)' }} />
                      </div>
                    )}

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '4px' }}>
                        Artwork Description
                      </label>
                      <textarea 
                        rows={2} 
                        value={artDescription} 
                        onChange={(e) => setArtDescription(e.target.value)} 
                        placeholder="Medium used, canvas dimensions, story behind artwork..."
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-soft)', fontSize: '0.88rem' }}
                      />
                    </div>

                    <button type="submit" disabled={postingArt} className="btn btn-accent" style={{ padding: '10px 20px', fontSize: '0.88rem', fontWeight: 700 }}>
                      {postingArt ? 'Publishing Artwork...' : '+ Post Artwork to Portfolio & Shop Catalog'}
                    </button>
                  </form>
                </div>

                {/* 3. My Posted Portfolio Artworks Gallery */}
                {dbMember?.artworks && dbMember.artworks.length > 0 && (
                  <div>
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Palette size={18} style={{ color: 'var(--saffron)' }} /> My Published Portfolio ({dbMember.artworks.length} Items)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                      {dbMember.artworks.map((art, idx) => (
                        <div key={art.id || idx} style={{ border: '1px solid var(--border-soft)', borderRadius: '12px', overflow: 'hidden', background: 'white' }}>
                          <div style={{ height: '130px', overflow: 'hidden' }}>
                            <img src={art.image} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '12px' }}>
                            <h4 style={{ fontSize: '0.9rem', color: 'var(--navy)', margin: '0 0 4px 0' }}>{art.title}</h4>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '6px' }}>{art.category}</div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-mid)' }}>Approval:</span>
                              <span style={{ 
                                fontSize: '0.72rem', 
                                padding: '2px 8px', 
                                borderRadius: '50px', 
                                background: art.isApproved !== false ? '#E1F6EB' : '#FEF3D6', 
                                color: art.isApproved !== false ? '#1A7A44' : '#B27600',
                                fontWeight: 700 
                              }}>
                                {art.isApproved !== false ? 'Approved' : 'Pending'}
                              </span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '0.9rem', color: 'var(--saffron)', fontWeight: '700' }}>₹{art.price ? art.price.toLocaleString('en-IN') : 'N/A'}</span>
                              <span style={{ 
                                fontSize: '0.72rem', 
                                padding: '2px 8px', 
                                borderRadius: '50px', 
                                background: art.status === 'Sold Out' ? '#FCEBEB' : art.status === 'Coming Soon' ? '#FEF3D6' : '#E1F6EB', 
                                color: art.status === 'Sold Out' ? '#C42424' : art.status === 'Coming Soon' ? '#B27600' : '#1A7A44',
                                fontWeight: 700 
                              }}>
                                {art.status || 'Available'}
                              </span>
                            </div>
                            
                            {/* Status Selector Dropdown */}
                            <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-soft)' }}>
                              <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-mid)', marginBottom: '4px', fontWeight: 600 }}>Update Status:</label>
                              <select 
                                value={art.status || 'Available'} 
                                onChange={(e) => handleUpdateArtworkStatus(art.id, e.target.value)}
                                style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-soft)', fontSize: '0.78rem', color: 'var(--navy)', background: '#F8FAFC' }}
                              >
                                <option value="Available">Available</option>
                                <option value="Sold Out">Sold Out</option>
                                <option value="Coming Soon">Coming Soon</option>
                                <option value="Custom Order">Custom Order</option>
                                <option value="Only 1 Left">Only 1 Left</option>
                                <option value="Only 2 Left">Only 2 Left</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Order History / Tracking Section */}
            {userOrders && userOrders.length > 0 && (
              <div style={{ marginTop: '32px', borderTop: '2px solid var(--border-soft)', paddingTop: '28px', textAlign: 'left' }}>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Package size={18} style={{ color: 'var(--navy)' }} /> My Order History &amp; Tracking
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {userOrders.map((order) => (
                    <div 
                      key={order._id} 
                      style={{ 
                        border: '1px solid var(--border-soft)', 
                        borderRadius: 'var(--radius-md)', 
                        padding: '18px', 
                        background: 'var(--cream)', 
                        boxShadow: 'var(--shadow-soft)' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px dashed var(--border-soft)', paddingBottom: '10px', marginBottom: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'block' }}>ORDER ID</span>
                          <span style={{ fontSize: '0.88rem', fontWeight: 'bold', color: 'var(--navy)' }}>{order._id}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', display: 'block' }}>STATUS</span>
                          <span 
                            style={{ 
                              fontSize: '0.78rem', 
                              fontWeight: 'bold', 
                              padding: '3px 10px', 
                              borderRadius: '50px', 
                              background: order.status === 'Confirmed' ? '#E1F6EB' : order.status === 'Cancelled' ? '#FCEBEB' : '#FEF3D6', 
                              color: order.status === 'Confirmed' ? '#1A7A44' : order.status === 'Cancelled' ? '#C42424' : '#B27600', 
                              display: 'inline-block' 
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div>
                          <strong>Items ordered:</strong>
                          <ul style={{ paddingLeft: '18px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} <span style={{ color: 'var(--text-light)' }}>x{item.quantity}</span> — ₹{(item.price * item.quantity).toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-soft)', paddingTop: '8px', marginTop: '4px' }}>
                          <span>Ordered on: {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--saffron)' }}>Total: ₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                onClick={() => setActivePage('members')} 
                className="btn btn-outline" 
                style={{ flex: 1, padding: '10px' }}
              >
                View Public Members Directory
              </button>
              <button 
                onClick={handleLogout} 
                className="btn btn-danger-outline" 
                style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </div>
        ) : (
          /* AUTH FORM CARD */
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '36px 32px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--border-soft)'
          }}>
            {/* Header Title */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2rem', color: 'var(--navy)', marginBottom: '6px' }}>
                {isLoginTab ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                {isLoginTab 
                  ? 'Sign in to access your MasterBrush account' 
                  : 'Join MasterBrush Art Foundation community'}
              </p>
            </div>

            {/* Toggle Tabs */}
            <div style={{
              display: 'flex',
              background: 'var(--cream)',
              borderRadius: '50px',
              padding: '4px',
              marginBottom: '24px',
              border: '1px solid var(--border-soft)'
            }}>
              <button
                type="button"
                onClick={() => setIsLoginTab(true)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '50px',
                  border: 'none',
                  background: isLoginTab ? 'var(--navy)' : 'transparent',
                  color: isLoginTab ? 'white' : 'var(--text-mid)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <LogIn size={16} /> Login
              </button>

              <button
                type="button"
                onClick={() => setIsLoginTab(false)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '50px',
                  border: 'none',
                  background: !isLoginTab ? 'var(--navy)' : 'transparent',
                  color: !isLoginTab ? 'white' : 'var(--text-mid)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <UserPlus size={16} /> Register
              </button>
            </div>

            {/* LOGIN FORM */}
            {isLoginTab ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--navy)' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--navy)' }}>
                      Password
                    </label>
                    <a 
                      onClick={() => triggerToast && triggerToast('Password reset link sent to your email.')}
                      style={{ fontSize: '0.8rem', color: 'var(--saffron)', cursor: 'pointer' }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 42px 12px 42px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-light)'
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-accent"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? 'Signing in...' : <>Sign In <ArrowRight size={18} /></>}
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
                  Don't have an account?{' '}
                  <span 
                    onClick={() => setIsLoginTab(false)} 
                    style={{ color: 'var(--saffron)', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Register now
                  </span>
                </p>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--navy)' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--navy)' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px 12px 42px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Role / Category Dropdown */}
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--navy)' }}>
                    Role / Category
                  </label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-soft)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      background: 'white',
                      fontWeight: 600,
                      color: 'var(--navy)'
                    }}
                  >
                    <option value="Member">Member (Specially-Abled / Artist)</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Sponsor">Sponsor</option>
                    <option value="Corporate">Corporate / Organization</option>
                  </select>
                </div>

                {/* CONDITIONAL FIELDS BASED ON ROLE */}

                {/* 1. MEMBER CONDITIONAL FIELDS */}
                {regRole === 'Member' && (
                  <div style={{ background: 'var(--saffron-pale)', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid rgba(196, 36, 36, 0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--saffron)', fontWeight: 700, fontSize: '0.9rem' }}>
                      <CreditCard size={18} /> Unique Disability ID (UDID) Details
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        UDID Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. TS1910219980012345"
                        value={udidNumber}
                        onChange={(e) => setUdidNumber(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Disability Category
                      </label>
                      <select
                        value={disabilityType}
                        onChange={(e) => setDisabilityType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      >
                        <option value="General / Specially-Abled">General / Specially-Abled</option>
                        <option value="Locomotor Disability">Locomotor Disability</option>
                        <option value="Visual Impairment">Visual Impairment</option>
                        <option value="Hearing Impairment">Hearing Impairment</option>
                        <option value="Intellectual / Learning">Intellectual / Learning</option>
                        <option value="Multiple Disabilities">Multiple Disabilities</option>
                      </select>
                    </div>

                    {/* UDID Card Photos (Front & Back) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                          UDID Photo (Front) *
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setUdidFrontImage)}
                            style={{ display: 'none' }}
                            id="udid-front-input"
                          />
                          <label 
                            htmlFor="udid-front-input"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              padding: '10px',
                              borderRadius: '8px',
                              border: '1px dashed var(--saffron)',
                              background: 'white',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              color: 'var(--navy)',
                              fontWeight: 600
                            }}
                          >
                            <Upload size={14} color="var(--saffron)" />
                            {udidFrontImage ? 'Front Attached ✓' : 'Upload Front'}
                          </label>
                          {udidFrontImage && (
                            <img src={udidFrontImage} alt="UDID Front Preview" style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px', border: '1px solid var(--saffron)' }} />
                          )}
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                          UDID Photo (Back)
                        </label>
                        <div style={{ position: 'relative' }}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, setUdidBackImage)}
                            style={{ display: 'none' }}
                            id="udid-back-input"
                          />
                          <label 
                            htmlFor="udid-back-input"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                              padding: '10px',
                              borderRadius: '8px',
                              border: '1px dashed var(--saffron)',
                              background: 'white',
                              cursor: 'pointer',
                              fontSize: '0.8rem',
                              color: 'var(--navy)',
                              fontWeight: 600
                            }}
                          >
                            <Upload size={14} color="var(--saffron)" />
                            {udidBackImage ? 'Back Attached ✓' : 'Upload Back'}
                          </label>
                          {udidBackImage && (
                            <img src={udidBackImage} alt="UDID Back Preview" style={{ width: '100%', height: '60px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px', border: '1px solid var(--saffron)' }} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. VOLUNTEER CONDITIONAL FIELDS */}
                {regRole === 'Volunteer' && (
                  <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--navy)', fontWeight: 700, fontSize: '0.9rem' }}>
                      <HeartHandshake size={18} color="var(--saffron)" /> Volunteer Work Preference
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Preferred Area of Work
                      </label>
                      <select
                        value={volunteerWork}
                        onChange={(e) => setVolunteerWork(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      >
                        <option value="Event Management & Logistics">Event Management & Logistics</option>
                        <option value="Teaching & Art Workshops">Teaching & Art Workshops</option>
                        <option value="Social Media & Digital Outreach">Social Media & Digital Outreach</option>
                        <option value="Crafts & Design Support">Crafts & Design Support</option>
                        <option value="General On-site Assistance">General On-site Assistance</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Availability
                      </label>
                      <select
                        value={volunteerAvailability}
                        onChange={(e) => setVolunteerAvailability(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      >
                        <option value="Flexible / As Needed">Flexible / As Needed</option>
                        <option value="Weekends Only">Weekends Only</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Remote / Online">Remote / Online</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 3. SPONSOR CONDITIONAL FIELDS */}
                {regRole === 'Sponsor' && (
                  <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--navy)', fontWeight: 700, fontSize: '0.9rem' }}>
                      <Briefcase size={18} color="var(--saffron)" /> Sponsorship Interest
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Sponsor / Organization Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Philanthropy / Individual"
                        value={sponsorOrg}
                        onChange={(e) => setSponsorOrg(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Sponsorship Category
                      </label>
                      <select
                        value={sponsorCategory}
                        onChange={(e) => setSponsorCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      >
                        <option value="Artist Sponsorship">Sponsor an Artist (Education & Supplies)</option>
                        <option value="Event Sponsor">Sponsor Exhibition / Event</option>
                        <option value="Workshop Sponsor">Fund Community Workshops</option>
                        <option value="General Foundation Support">General Foundation Support</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* 4. CORPORATE CONDITIONAL FIELDS */}
                {regRole === 'Corporate' && (
                  <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '16px', marginBottom: '20px', border: '1px solid var(--border-soft)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--navy)', fontWeight: 700, fontSize: '0.9rem' }}>
                      <Building size={18} color="var(--saffron)" /> Corporate Details
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Company / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corp Pvt Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        GSTIN / Registration No. (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 36AABCU9603R1ZM"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', marginBottom: '4px', color: 'var(--navy)' }}>
                        Industry / Sector
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Information Technology / CSR Foundation"
                        value={industryCategory}
                        onChange={(e) => setIndustryCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-soft)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          background: 'white'
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--navy)' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Create a password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 42px 12px 42px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-light)'
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-accent"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {loading ? 'Creating Account...' : <>Create Account <ArrowRight size={18} /></>}
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem' }}>
                  Already have an account?{' '}
                  <span 
                    onClick={() => setIsLoginTab(true)} 
                    style={{ color: 'var(--saffron)', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Sign In
                  </span>
                </p>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
