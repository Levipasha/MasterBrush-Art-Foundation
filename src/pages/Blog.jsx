import React, { useState, useEffect } from 'react';
import { Palette, Heart, Trees, X, BookOpen, User, Calendar, Clock, ArrowRight, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export default function Blog({ setActivePage, triggerToast }) {
  const [dbPosts, setDbPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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
    category: p.category || 'General',
    title: p.title,
    excerpt: p.summary || p.excerpt || '',
    content: p.content || p.summary || '',
    author: p.author || 'Admin',
    date: p.date || 'Recent',
    readTime: p.readTime || '3 min read',
    image: p.image || '/cta-bg.jpg'
  }));

  const categories = [
    { name: 'All', count: activePosts.length },
    { name: 'Art Tips', count: activePosts.filter(p => (p.category || '').toLowerCase().includes('art')).length },
    { name: 'Student Stories', count: activePosts.filter(p => (p.category || '').toLowerCase().includes('student')).length },
    { name: 'Events', count: activePosts.filter(p => (p.category || '').toLowerCase().includes('event')).length },
    { name: 'Inclusion', count: activePosts.filter(p => (p.category || '').toLowerCase().includes('inclusi')).length }
  ];

  const filteredPosts = activePosts.filter(post => 
    activeCategory === 'All' || 
    post.category === activeCategory ||
    (post.category && post.category.toLowerCase().includes(activeCategory.toLowerCase()))
  );

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      if (triggerToast) triggerToast('Please enter a valid email address');
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
        if (triggerToast) triggerToast(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        if (triggerToast) triggerToast(data.message || 'Subscription failed');
      }
    } catch (err) {
      console.error(err);
      if (triggerToast) triggerToast('Thank you for subscribing to our newsletter!');
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  // DEDICATED FULL-PAGE ARTICLE READER
  if (selectedPost) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingBottom: '80px' }}>
        <SEO 
          title={selectedPost.title} 
          description={selectedPost.excerpt || 'Read our latest article from MasterBrush Art Foundation.'} 
          keywords={`${selectedPost.category || 'art blog'}, masterbrush blog, success stories, art education`}
          ogImage={selectedPost.image}
          ogType="article"
        />
        {/* Top Header Bar */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--border-soft)', padding: '18px 0' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => { setSelectedPost(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-outline"
              style={{ padding: '8px 18px', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <ArrowLeft size={16} /> Back to All Articles
            </button>
            <div className="breadcrumb" style={{ margin: 0 }}>
              <a onClick={() => { setSelectedPost(null); setActivePage('home'); }}>Home</a> &gt; <a onClick={() => setSelectedPost(null)}>Blog</a> &gt; <span>{selectedPost.category}</span>
            </div>
          </div>
        </div>

        {/* Article Page Content Container */}
        <div className="container" style={{ maxWidth: '840px', marginTop: '40px' }}>
          
          {/* Header Title & Category Badge */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ 
              background: 'var(--saffron-pale)', 
              color: 'var(--saffron)', 
              padding: '6px 18px', 
              borderRadius: '50px', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em' 
            }}>
              {selectedPost.category}
            </span>

            <h1 style={{ 
              fontFamily: 'Oswald, sans-serif', 
              fontSize: '2.6rem', 
              color: 'var(--navy)', 
              margin: '20px 0 16px 0', 
              lineHeight: 1.25,
              letterSpacing: '-0.02em'
            }}>
              {selectedPost.title}
            </h1>

            {/* Author & Meta */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '24px', 
              fontSize: '0.9rem', 
              color: 'var(--text-mid)',
              fontWeight: 500,
              flexWrap: 'wrap'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <User size={16} color="var(--saffron)" /> By <strong>{selectedPost.author}</strong>
              </span>
              <span>&bull;</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="var(--saffron)" /> {selectedPost.date}
              </span>
              <span>&bull;</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="var(--saffron)" /> {selectedPost.readTime}
              </span>
            </div>
          </div>

          {/* Featured Hero Banner Image */}
          {selectedPost.image && (
            <div style={{ 
              width: '100%', 
              height: '420px', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-card)',
              marginBottom: '40px',
              background: '#0F0F30'
            }}>
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          )}

          {/* Body Article Card */}
          <div style={{ 
            background: 'white', 
            borderRadius: '24px', 
            padding: '48px 40px', 
            boxShadow: 'var(--shadow-soft)', 
            border: '1px solid var(--border-soft)',
            fontSize: '1.05rem',
            lineHeight: 1.85,
            color: 'var(--navy)'
          }}>
            {/* Lead Excerpt */}
            {selectedPost.excerpt && (
              <p style={{ 
                fontSize: '1.2rem', 
                fontWeight: 600, 
                color: 'var(--navy)', 
                lineHeight: 1.6, 
                marginBottom: '32px',
                borderLeft: '4px solid var(--saffron)',
                paddingLeft: '20px',
                fontStyle: 'italic'
              }}>
                "{selectedPost.excerpt}"
              </p>
            )}

            {/* Paragraph Body */}
            <div style={{ whiteSpace: 'pre-line', marginBottom: '40px', color: '#2B2B48' }}>
              {selectedPost.content}
            </div>

            {/* Key Takeaways Banner */}
            <div style={{ 
              background: 'var(--saffron-pale)', 
              border: '1px solid rgba(196, 36, 36, 0.2)', 
              borderRadius: '16px', 
              padding: '24px 28px', 
              marginBottom: '36px' 
            }}>
              <h4 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.2rem', color: 'var(--saffron)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={18} /> MasterBrush Community Insights
              </h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--navy)', lineHeight: 1.6 }}>
                Art is a powerful avenue for self-expression and inclusion. Whether creating in our studio or practicing at home, every brushstroke nurtures confidence, focus, and connection.
              </p>
            </div>

            {/* Author Footer */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              borderTop: '1px solid var(--border-soft)', 
              paddingTop: '28px',
              marginTop: '28px'
            }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                background: 'var(--saffron-pale)', 
                color: 'var(--saffron)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={28} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem', color: 'var(--navy)' }}>
                  Written by {selectedPost.author}
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                  MasterBrush Art Foundation Contributor &amp; Educator
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <button 
              onClick={() => { setSelectedPost(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn btn-accent"
              style={{ padding: '14px 32px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
            >
              <ArrowLeft size={18} /> Back to All Articles
            </button>
          </div>

        </div>
      </div>
    );
  }

  // MAIN BLOG LISTING PAGE VIEW
  return (
    <div>
      <SEO 
        title="Blog &amp; Stories" 
        description="Read inspiring stories of healing through art, creative achievements of our students, and articles on art education and therapy." 
        keywords="art therapy stories, student creative success, art foundation blog, drawing tips, charity news"
      />
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> &gt; <span>Blog</span></div>
          <h1 className="display-hero">Blog &amp; Articles</h1>
          <p>Stories, art tips, and inspiration from the MasterBrush community.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="blog-main-grid">
            {/* Articles List */}
            <div>
              {loading ? (
                <p style={{ textAlign: 'center', padding: '40px', fontStyle: 'italic', color: 'var(--text-mid)' }}>Loading blog posts from database...</p>
              ) : filteredPosts.length === 0 ? (
                <div style={{ background: 'white', padding: '48px', borderRadius: '16px', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
                  <p style={{ fontStyle: 'italic', color: 'var(--text-light)', margin: 0 }}>No blog posts available in this category. Add blog posts via the Admin portal.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {filteredPosts.map(post => (
                    <div 
                      key={post.id} 
                      onClick={() => { setSelectedPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{ 
                        background: 'white', 
                        borderRadius: 'var(--radius-lg)', 
                        border: '1px solid var(--border-soft)', 
                        overflow: 'hidden', 
                        boxShadow: 'var(--shadow-soft)',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {post.image && (
                        <div style={{ height: '260px', width: '100%', overflow: 'hidden', position: 'relative', background: '#0F0F30' }}>
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                          />
                          <span style={{ 
                            position: 'absolute', 
                            top: '16px', 
                            left: '16px', 
                            background: 'var(--saffron)', 
                            color: 'white', 
                            padding: '4px 14px', 
                            borderRadius: '50px', 
                            fontSize: '0.78rem', 
                            fontWeight: 700, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.08em' 
                          }}>
                            {post.category}
                          </span>
                        </div>
                      )}

                      <div style={{ padding: '28px' }}>
                        <h2 style={{ margin: '0 0 12px', fontSize: '1.6rem', fontFamily: 'Oswald, sans-serif', color: 'var(--navy)', lineHeight: 1.3 }}>
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-mid)', marginBottom: '20px' }}>
                            {post.excerpt}
                          </p>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-light)', borderTop: '1px solid var(--border-soft)', paddingTop: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><User size={14} /> {post.author}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {post.date}</span>
                          </div>
                          <span style={{ color: 'var(--saffron)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Read Full Article <ArrowRight size={14} />
                          </span>
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
              <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '24px', border: '1px solid var(--border-soft)', marginBottom: '24px', boxShadow: 'var(--shadow-soft)' }}>
                <h4 style={{ fontSize: '1rem', fontFamily: "Oswald, sans-serif", fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px', color: 'var(--navy)' }}>
                  Categories
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {categories.map(cat => (
                    <button 
                      key={cat.name}
                      type="button"
                      style={{ 
                        display: 'flex', 
                        justify: 'space-between', 
                        alignItems: 'center',
                        width: '100%',
                        border: 'none',
                        fontSize: '0.9rem', 
                        fontFamily: 'inherit',
                        color: activeCategory === cat.name ? 'var(--saffron)' : 'var(--navy)', 
                        cursor: 'pointer', 
                        fontWeight: activeCategory === cat.name ? '700' : '500',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        background: activeCategory === cat.name ? 'var(--saffron-pale)' : 'transparent',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                      onClick={() => setActiveCategory(cat.name)}
                    >
                      <span>{cat.name}</span> 
                      <span style={{ 
                        background: activeCategory === cat.name ? 'var(--saffron)' : 'rgba(26,26,78,0.08)', 
                        padding: '3px 12px', 
                        borderRadius: '50px', 
                        fontSize: '0.78rem', 
                        color: activeCategory === cat.name ? 'white' : 'var(--navy)', 
                        fontWeight: 700,
                        marginLeft: 'auto'
                      }}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter subscribe form */}
              <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: '28px', color: 'white', boxShadow: 'var(--shadow-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <BookOpen size={20} color="var(--saffron-light)" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, fontFamily: 'Oswald, sans-serif' }}>Get Art Tips in Your Inbox</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginBottom: '20px', lineHeight: 1.6 }}>Monthly newsletter with painting tips, exhibition events and student stories.</p>
                
                <form onSubmit={handleSubscribeSubmit}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: 'none', fontSize: '0.9rem', marginBottom: '12px', outline: 'none', background: 'white' }}
                    required
                  />
                  <button 
                    type="submit" 
                    className="btn btn-accent" 
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.95rem', padding: '12px' }}
                    disabled={submitting}
                  >
                    {submitting ? 'Subscribing...' : 'Subscribe Now'}
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
