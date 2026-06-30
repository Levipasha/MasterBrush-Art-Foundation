import React, { useState, useEffect } from 'react';
import { Palette, Heart, Trees } from 'lucide-react';

const API_BASE = 'https://ngo-backend-production-b2ee.up.railway.app/api';

export default function Blog({ setActivePage, triggerToast }) {
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/blog`);
        const json = await res.json();
        if (json.success && json.data) {
          setDbPosts(json.data);
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const activePosts = dbPosts.map(p => ({
    id: p._id || p.id,
    category: p.category,
    title: p.title,
    excerpt: p.summary,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    icon: p.image ? (
      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : getBlogIcon(p.category),
    bgColor: p.image ? 'transparent' : getBlogBgColor(p.category),
    useImage: !!p.image
  }));

  const categories = [
    { name: 'All', count: activePosts.length },
    { name: 'Art Tips', count: activePosts.filter(p => p.category === 'Art Tips').length },
    { name: 'Student Stories', count: 0 },
    { name: 'Events', count: activePosts.filter(p => p.category === 'Events').length },
    { name: 'Inclusion', count: activePosts.filter(p => p.category === 'Inclusion').length }
  ];

  const filteredPosts = activePosts.filter(post => 
    activeCategory === 'All' || post.category === activeCategory
  );

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      triggerToast('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      
      if (data.success) {
        triggerToast(data.message);
        setEmail('');
      } else {
        triggerToast(data.message || 'Subscription failed');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error, could not subscribe.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>Blog</span></div>
          <h1 className="display-hero">Blog</h1>
          <p>Stories, tips and inspiration from the MasterBrush community.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="blog-main-grid">
            {/* Articles List */}
            <div>
              {loading ? (
                <p style={{ textAlign: 'center', padding: '40px', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading blog posts...</p>
              ) : filteredPosts.length === 0 ? (
                <p style={{ fontStyle: 'italic', color: 'var(--text-light)' }}>No posts found in this category.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {filteredPosts.map(post => (
                    <div 
                      key={post.id} 
                      style={{ background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', overflow: 'hidden', boxShadow: 'var(--shadow-soft)' }}
                    >
                      <div style={{ height: '240px', background: post.bgColor, display: 'flex', alignItems: post.useImage ? 'stretch' : 'center', justifyContent: post.useImage ? 'stretch' : 'center', overflow: 'hidden' }}>
                        {post.icon}
                      </div>
                      <div style={{ padding: '28px' }}>
                        <span className="status-badge status-pending" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {post.category}
                        </span>
                        <h2 style={{ margin: '14px 0 10px', fontSize: '1.5rem', fontFamily: 'Playfair Display, serif', color: 'var(--navy)' }}>
                          {post.title}
                        </h2>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '16px' }}>
                          {post.excerpt}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                          <span>By {post.author} · {post.date}</span>
                          <span>📖 {post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Category selector */}
              <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-soft)', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontFamily: "'Inter',sans-serif", fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                  Categories
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {categories.map(cat => (
                    <a 
                      key={cat.name}
                      style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: activeCategory === cat.name ? 'var(--saffron)' : 'var(--text-mid)', textDecoration: 'none', cursor: 'pointer', fontWeight: activeCategory === cat.name ? '700' : 'normal' }}
                      onClick={() => setActiveCategory(cat.name)}
                    >
                      {cat.name} 
                      <span style={{ background: 'var(--cream-warm)', padding: '2px 8px', borderRadius: '20px', fontSize: '0.75rem', color: 'var(--navy)', fontWeight: 600 }}>
                        {cat.count}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter subscribe form */}
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-md)', padding: '24px', color: 'white' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Get Art Tips in Your Inbox</h4>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>Monthly newsletter with tips, events and student stories.</p>
                
                <form onSubmit={handleSubscribeSubmit}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: 'none', fontSize: '0.85rem', marginBottom: '10px', fontFamily: "'Inter',sans-serif", outline: 'none' }}
                    required
                  />
                  <button 
                    type="submit" 
                    className="btn btn-accent" 
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
