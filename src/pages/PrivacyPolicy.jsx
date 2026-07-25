import React, { useState } from 'react';
import { Shield, Lock, Eye, FileText, Database, UserCheck, HelpCircle, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function PrivacyPolicy({ setActivePage }) {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: '1. Introduction', icon: <Shield size={18} /> },
    { id: 'collect', label: '2. Information We Collect', icon: <Database size={18} /> },
    { id: 'use', label: '3. How We Use Information', icon: <Eye size={18} /> },
    { id: 'share', label: '4. Information Sharing', icon: <ArrowRight size={18} /> },
    { id: 'security', label: '5. Data Security', icon: <Lock size={18} /> },
    { id: 'rights', label: '6. Your Rights', icon: <UserCheck size={18} /> },
    { id: 'cookies', label: '7. Cookies & Tracking', icon: <FileText size={18} /> },
    { id: 'contact', label: '8. Contact Us', icon: <HelpCircle size={18} /> },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // sticky header offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div>
      <SEO 
        title="Privacy Policy" 
        description="Understand how MasterBrush Art Foundation collects, uses, and secures your personal and payment information." 
        keywords="data privacy, cookie tracking policy, payment safety details"
      />
      {/* Page Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '60px 0 40px 0' }}>
        <div className="container page-hero-content">
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '10px' }}>
            <a onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Home</a> › <span>Privacy Policy</span>
          </div>
          <h1 className="display-hero" style={{ color: 'white', fontFamily: "'Oswald', sans-serif", fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginTop: '8px' }}>
            Last Updated: July 25, 2026 | MasterBrush Art Foundation
          </p>
        </div>
      </div>

      {/* Main Layout Container */}
      <section className="section" style={{ background: 'var(--cream)', padding: '60px 0' }}>
        <div className="container">
          <div className="policy-layout" style={{ display: 'flex', gap: '40px', position: 'relative' }}>
            
            {/* Sidebar Sticky Navigation (visible on desktop) */}
            <aside className="policy-sidebar" style={{
              width: '280px',
              flexShrink: 0,
              position: 'sticky',
              top: '120px',
              height: 'fit-content',
              background: 'white',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-soft)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: '16px', borderBottom: '2px solid var(--saffron)', paddingBottom: '8px', letterSpacing: '1px' }}>
                Contents
              </h3>
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: activeSection === sec.id ? 'var(--saffron-pale)' : 'transparent',
                    color: activeSection === sec.id ? 'var(--saffron)' : 'var(--text-mid)',
                    cursor: 'pointer',
                    fontWeight: activeSection === sec.id ? '600' : 'normal',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    fontSize: '0.95rem'
                  }}
                >
                  <span style={{ color: activeSection === sec.id ? 'var(--saffron)' : 'var(--text-light)' }}>
                    {sec.icon}
                  </span>
                  <span>{sec.label}</span>
                </button>
              ))}
            </aside>

            {/* Privacy Policy Main Content */}
            <main className="policy-content" style={{
              flexGrow: 1,
              background: 'white',
              padding: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-soft)'
            }}>
              
              <div id="intro" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <Shield size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>1. Introduction</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  MasterBrush Art Foundation ("we," "us," or "our") is dedicated to protecting your privacy. This Privacy Policy details how we collect, store, utilize, and protect your personal information when you visit our website, register as a member, participate in our events, support us with donations, or buy artwork from our shop.
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  By accessing or using our services, you consent to the collection and use of your information as outlined in this policy. We reserve the right to modify this policy at any time, and changes will be updated on this page.
                </p>
              </div>

              <div id="collect" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <Database size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>2. Information We Collect</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  We collect personal and non-personal details from you to facilitate our support programs, process donations, coordinate classes/workshops, and run our online shop.
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Personal Identifier Info:</strong> Name, email address, contact number, shipping/billing address, and membership details when you register or reach out to us.</li>
                  <li><strong>Payment and Donation Data:</strong> Financial details (processed securely via encrypted third-party payment gateways; we do not store raw credit card numbers or PINs).</li>
                  <li><strong>Creative Profiles:</strong> Portfolio pieces, profiles of specially-abled artists, and workshop submissions that you intentionally share with us.</li>
                  <li><strong>Technical Log Information:</strong> IP addresses, browser versions, system type, visited pages, and referral URLs.</li>
                </ul>
              </div>

              <div id="use" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <Eye size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>3. How We Use Your Information</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  The details we gather are used exclusively to advance our mission of making art education accessible and supporting our talented community of artists:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>To process, pack, ship, and deliver your purchased art pieces from our online shop.</li>
                  <li>To register and track members, students, and volunteers in workshops, exhibitions, and competitions.</li>
                  <li>To process recurring or one-time charity donations and generate corresponding tax-exempt receipts.</li>
                  <li>To distribute newsletters, updates, and promotions regarding upcoming community exhibitions and initiatives (you can unsubscribe at any point).</li>
                  <li>To maintain security, perform audits, and continuously optimize the performance of our website.</li>
                </ul>
              </div>

              <div id="share" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <ArrowRight size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>4. Information Sharing & Disclosure</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  We respect your privacy and do not sell, rent, or lease your personal information to marketing firms or third parties. We may disclose data under the following circumstances:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Service Partners:</strong> We share details with courier companies for art shipping and payment gateways for donation/shop billing. These entities are obligated to secure your data and use it only to execute specific tasks.</li>
                  <li><strong>Legal Mandates:</strong> If required by law, court orders, or government regulators to verify tax-exemption files, or protect our community safety.</li>
                  <li><strong>With Consent:</strong> We publish profiles and photos of our student artists and their artwork only with prior consent from them or their parent/guardian.</li>
                </ul>
              </div>

              <div id="security" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <Lock size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>5. Data Security</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  We employ rigorous administrative, physical, and technical security safeguards to defend your personal data. All connection flows between your browser and our servers are encrypted using Secure Socket Layer (SSL) technology.
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  While we implement best-in-class methods to shield your information, no method of transmission over the Internet or electronic database storage is 100% secure. Therefore, we cannot guarantee absolute security.
                </p>
              </div>

              <div id="rights" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <UserCheck size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>6. Your Rights & Choices</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  You have full ownership of your data. Depending on your location, you may possess the following rights regarding your personal information:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Access & Copy:</strong> You can request a summary of the personal details we store about you.</li>
                  <li><strong>Update & Correct:</strong> You can edit inaccurate or outdated information in your profile settings or by contacting our team.</li>
                  <li><strong>Erasure:</strong> You can ask us to permanently delete your registration records, account, or subscription details.</li>
                  <li><strong>Opt-Out:</strong> You can easily opt-out of newsletter list subscriptions at any time via the unsubscribe links in our emails.</li>
                </ul>
              </div>

              <div id="cookies" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <FileText size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>7. Cookies & Web Tracking</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  Our website uses cookies (small text files saved to your computer) to remember your preferences, manage your shopping cart items, and collect aggregated technical usage statistics.
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  You can set your browser configuration to refuse cookies or warn you before they are saved. However, disabling cookies may prevent some portions of our website (like the Art Shop checkout) from functioning correctly.
                </p>
              </div>

              <div id="contact" style={{ scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <HelpCircle size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>8. Contact Us</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '20px' }}>
                  If you have any questions, suggestions, or concerns regarding this Privacy Policy or wish to exercise your rights, please reach out to us:
                </p>
                
                <div style={{
                  background: 'var(--cream-warm)',
                  padding: '24px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-soft)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ color: 'var(--navy)', fontWeight: '600' }}>
                    MasterBrush Art Foundation
                  </div>
                  <div style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
                    <strong>Address:</strong> Plot No. 13, Sri Sai Avenue Apartment, R.K.H Colony, AS Rao Nagar, Hyderabad - 500062
                  </div>
                  <div style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
                    <strong>Email:</strong> info@masterbrushartfoundation.org
                  </div>
                  <div style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
                    <strong>Phone:</strong> +91 98765 43210
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>
      
      {/* CSS styling in JSX to manage sidebar hiding on mobile */}
      <style>{`
        @media (max-width: 991px) {
          .policy-layout {
            flex-direction: column !important;
          }
          .policy-sidebar {
            display: none !important;
          }
          .policy-content {
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
