import React, { useState } from 'react';
import { FileText, ShieldCheck, UserCheck, CreditCard, ShoppingBag, AlertOctagon, Scale, RefreshCw, Mail } from 'lucide-react';
import SEO from '../components/SEO';

export default function TermsConditions({ setActivePage }) {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms', icon: <ShieldCheck size={18} /> },
    { id: 'accounts', label: '2. User Accounts', icon: <UserCheck size={18} /> },
    { id: 'intellectual', label: '3. Intellectual Property', icon: <FileText size={18} /> },
    { id: 'donations', label: '4. Donations & Support', icon: <CreditCard size={18} /> },
    { id: 'shop', label: '5. Art Shop Transactions', icon: <ShoppingBag size={18} /> },
    { id: 'conduct', label: '6. Prohibited Conduct', icon: <AlertOctagon size={18} /> },
    { id: 'liability', label: '7. Limitation of Liability', icon: <Scale size={18} /> },
    { id: 'governing', label: '8. Governing Law', icon: <Scale size={18} /> },
    { id: 'changes', label: '9. Changes to Terms', icon: <RefreshCw size={18} /> },
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
        title="Terms &amp; Conditions" 
        description="Read the rules and agreements for visiting the MasterBrush website, making donations, and purchasing art from our shop." 
        keywords="terms of use, copyright terms, refund policy, user agreement"
      />
      {/* Page Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '60px 0 40px 0' }}>
        <div className="container page-hero-content">
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '10px' }}>
            <a onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ cursor: 'pointer', textDecoration: 'underline' }}>Home</a> › <span>Terms & Conditions</span>
          </div>
          <h1 className="display-hero" style={{ color: 'white', fontFamily: "'Oswald', sans-serif", fontSize: '3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Terms &amp; Conditions</h1>
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

            {/* Terms Main Content */}
            <main className="policy-content" style={{
              flexGrow: 1,
              background: 'white',
              padding: '40px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-soft)'
            }}>
              
              <div id="acceptance" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <ShieldCheck size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>1. Acceptance of Terms</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  Welcome to the MasterBrush Art Foundation website. By browsing, accessing, or using our site, you agree to comply with and be bound by the following Terms & Conditions, which govern our relationship with you in relation to this website.
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  If you disagree with any part of these terms and conditions, please do not use our website or services. These Terms apply to all visitors, users, students, members, and donors who access the website.
                </p>
              </div>

              <div id="accounts" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <UserCheck size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>2. User Registration & Accounts</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  To access certain features of our site (such as class enrollment, art shop checkouts, or membership profiles), you may need to register and create an account:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>You must provide accurate, current, and complete details during registration.</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials and passwords.</li>
                  <li>You agree to notify us immediately of any unauthorized use or breaches of security.</li>
                  <li>We reserve the right to suspend, terminate, or refuse service to accounts that violate these terms or provide fraudulent info.</li>
                </ul>
              </div>

              <div id="intellectual" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <FileText size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>3. Intellectual Property Rights</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  The content, design, layouts, logos, graphics, databases, and structural code of this website are the property of MasterBrush Art Foundation or its licensed contributors and are protected by intellectual property laws.
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  <strong>Artist Portfolios:</strong> All artwork images, paintings, and creative profiles showcased on our website remain the intellectual property of the respective artists (including our specially-abled student artists).
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>You may not copy, reproduce, download, distribute, or reuse any artwork images or site contents for commercial purposes without explicit written consent from us and the artist.</li>
                  <li>You may print pages or download brochures for personal, non-commercial educational purposes only.</li>
                </ul>
              </div>

              <div id="donations" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <CreditCard size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>4. Donations & Support Rules</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  MasterBrush Art Foundation accepts donations to support art education, workshops, and material resources for underprivileged and specially-abled children:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>All donations are voluntary and, unless specified, are non-refundable.</li>
                  <li>Donations made in Indian Rupees (INR) from Indian citizens may qualify for tax exemption under Section 80G of the Income Tax Act. We will issue certificates based on the details you submit.</li>
                  <li>You warrant that all payment details submitted are valid and that you have full authorization to use the funding source.</li>
                </ul>
              </div>

              <div id="shop" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <ShoppingBag size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>5. Art Shop Transactions</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  When purchasing original artwork or prints from our online Art Shop, the following terms apply:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Authenticity & Variations:</strong> Original artworks are handmade. Minor details, textures, or colors may vary slightly from the screen photos.</li>
                  <li><strong>Pricing & Availability:</strong> Prices are displayed in INR and are subject to update. In the event an item sells out before a system update, we will contact you to arrange a substitute or process a full refund.</li>
                  <li><strong>Shipping & Delivery:</strong> We ship artworks securely across India and globally. Shipping timelines and courier fees are specified at checkout. We are not liable for delayed deliveries caused by custom checks or courier company logistics.</li>
                  <li><strong>Returns:</strong> Due to the fragile and unique nature of original paintings, all sales are final. If an artwork arrives damaged, please report it within 48 hours of receipt with unboxing video/photos to arrange returns or adjustments.</li>
                </ul>
              </div>

              <div id="conduct" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <AlertOctagon size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>6. Prohibited Conduct</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  By using this website, you agree not to engage in any activity that could harm, disable, or compromise our web applications or server systems. You are strictly prohibited from:
                </p>
                <ul style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Uploading files containing malware, viruses, trojans, or corrupted code.</li>
                  <li>Attempting to gain unauthorized access to our administrative databases, server instances, or student directories.</li>
                  <li>Using automated scraping, bots, indexers, or extraction tools to compile artwork images or details.</li>
                  <li>Posting comments, messages, or reviews that are defamatory, abusive, offensive, or violate rights.</li>
                </ul>
              </div>

              <div id="liability" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <Scale size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>7. Limitation of Liability</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '14px' }}>
                  This website and its services are provided on an "as is" and "as available" basis without guarantees of any kind, whether express or implied.
                </p>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  MasterBrush Art Foundation, its trustees, members, directors, and employees will not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, system errors, data loss, or server downtimes.
                </p>
              </div>

              <div id="governing" style={{ marginBottom: '40px', scrollMarginTop: '140px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <Scale size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>8. Governing Law & Jurisdiction</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  These Terms & Conditions are governed by and construed in accordance with the laws of the Republic of India. Any disputes arising from or in connection with the use of this website will be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
                </p>
              </div>

              <div id="changes" style={{ scrollMarginTop: '140px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '10px', borderRadius: '50%', color: 'var(--saffron)' }}>
                    <RefreshCw size={22} />
                  </div>
                  <h2 style={{ fontSize: '1.6rem', color: 'var(--navy)', textTransform: 'uppercase', margin: 0 }}>9. Changes to Terms</h2>
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '1rem', lineHeight: '1.8' }}>
                  We reserve the right, at our sole discretion, to modify or replace these Terms & Conditions at any time. When we make updates, the "Last Updated" date at the top of this page will be revised. It is your responsibility to check this page periodically for changes. Your continued use of the site following the posting of modifications constitutes acceptance of those changes.
                </p>
              </div>

              <div style={{
                background: 'var(--cream-warm)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-soft)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginTop: '40px'
              }}>
                <div style={{ color: 'var(--navy)', fontWeight: '600' }}>
                  Contact Information
                </div>
                <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', margin: 0 }}>
                  For questions about these Terms & Conditions, please contact us at:
                </p>
                <div style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
                  <strong>Email:</strong> info@masterbrushartfoundation.org
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>

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
