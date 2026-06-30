import React, { useState, useEffect } from 'react';
import { Target, Sparkles, Heart, Award, Activity, Users, ShieldCheck, CheckCircle } from 'lucide-react';

export default function About({ setActivePage }) {
  const defaultAbout = {
    storyTitle: 'About the Foundation',
    storyText1: 'MasterBrush Art Foundation is a non-profit organization dedicated to making art education accessible, inclusive, and meaningful for everyone. We believe that art is more than creativity—it is a powerful language of expression, a source of emotional healing, a means of building confidence, and a pathway to sustainable livelihoods.',
    storyText2: 'Our mission is to ensure that every individual, regardless of physical ability, financial background, age, or social circumstances, has the opportunity to discover and develop their creative potential. We work closely with underprivileged communities, people with disabilities, children, youth, and aspiring artists to create an environment where creativity knows no boundaries.',
    storyText3: 'Through education, workshops, mentorship, exhibitions, and community engagement, we empower individuals to transform their artistic talents into skills that enrich their lives and open doors to personal and professional opportunities. At MasterBrush Art Foundation, we envision a society where art is not considered a privilege but a right that inspires confidence, inclusion, innovation, and positive social change.',
    storyImage: '/about_foundation.jpg',
    visionText: 'To build an inclusive world where art is accessible to everyone, empowering underprivileged and differently-abled individuals to express themselves, develop valuable skills, achieve financial independence, and contribute creatively to society.',
    founderQuote: 'As an artist and educator, I believe art has the power to heal, inspire and transform lives. Through MasterBrush, I want to create a space where every individual — regardless of age or ability — can discover their unique voice and shine. Thank you for being a part of this beautiful journey.',
    founderImage: '/founder.jpg',
    statYears: '10+',
    statStudents: '500+',
    statExhibitions: '50+',
    statLives: '1000+'
  };

  const [aboutInfo, setAboutInfo] = useState(defaultAbout);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch('https://ngo-backend-production-b2ee.up.railway.app/api/about');
        const json = await res.json();
        if (json.success && json.data) {
          setAboutInfo(json.data);
        }
      } catch (err) {
        console.error("Error fetching about config:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const coreValues = [
    {
      title: 'Inclusivity',
      description: 'We believe every individual deserves equal opportunities to learn, create, and succeed through art, regardless of their abilities or circumstances.',
      icon: <Users size={24} style={{ color: 'var(--saffron)' }} />,
      colorClass: 'icon-saffron'
    },
    {
      title: 'Creativity',
      description: 'We encourage imagination, innovation, and artistic exploration that inspires personal and social transformation.',
      icon: <Sparkles size={24} style={{ color: 'var(--pink)' }} />,
      colorClass: 'icon-pink'
    },
    {
      title: 'Empowerment',
      description: 'We equip individuals with practical artistic and entrepreneurial skills that help build confidence and create employment opportunities.',
      icon: <Award size={24} style={{ color: 'var(--purple)' }} />,
      colorClass: 'icon-purple'
    },
    {
      title: 'Compassion',
      description: 'We use art as a medium to support emotional well-being, mental health, and community healing.',
      icon: <Heart size={24} style={{ color: 'var(--green)' }} />,
      colorClass: 'icon-green'
    },
    {
      title: 'Community',
      description: 'We foster collaboration among artists, educators, volunteers, institutions, and communities to create lasting positive impact.',
      icon: <Activity size={24} style={{ color: 'var(--navy)' }} />,
      colorClass: 'icon-navy'
    }
  ];

  const missionPoints = [
    'Providing high-quality and affordable art education for people of all backgrounds.',
    'Organizing inclusive workshops, exhibitions, competitions, and training programs.',
    'Encouraging creativity as a tool for emotional healing, therapy, and self-expression.',
    'Supporting emerging artists through mentorship, resources, and exhibition opportunities.',
    'Creating pathways for artists to generate sustainable income through their creative work.',
    'Preserving and promoting both traditional and contemporary art forms.',
    'Building stronger communities by encouraging collaboration through art and culture.'
  ];

  const impactPoints = [
    'Make quality art education accessible to everyone.',
    'Empower differently-abled and underprivileged individuals through creativity.',
    'Promote emotional wellness through artistic expression.',
    'Preserve traditional art while embracing modern creative practices.',
    'Support emerging artists in building sustainable careers.',
    'Create inclusive communities where every individual is valued and celebrated.',
    'Inspire future generations to view art as a tool for education, healing, innovation, and social change.'
  ];

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="container page-hero-content">
          <div className="breadcrumb"><a onClick={() => setActivePage('home')}>Home</a> › <span>About Us</span></div>
          <h1 className="display-hero">About Us</h1>
          <p>Making art education accessible, inclusive, and meaningful for everyone.</p>
        </div>
      </div>

      {/* About Description Section */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="display-section mb-6">{aboutInfo.storyTitle}</h2>
              <p style={{ marginBottom: '16px', fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-mid)' }}>
                {aboutInfo.storyText1}
              </p>
              <p style={{ marginBottom: '16px', fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-mid)' }}>
                {aboutInfo.storyText2}
              </p>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.8', color: 'var(--text-mid)' }}>
                {aboutInfo.storyText3}
              </p>
            </div>
            
            <div className="story-image" style={{ display: 'flex', alignItems: 'stretch' }}>
              <img 
                src={aboutInfo.storyImage} 
                alt="About MasterBrush Art Foundation" 
                style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Our Direction</p>
            <h2 className="display-section">Mission &amp; Vision</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
            {/* Vision */}
            <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-soft)' }}>
              <div className="mv-icon icon-purple" style={{ marginBottom: '20px' }}><Sparkles size={28} /></div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", color: 'var(--navy)', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.8', color: 'var(--text-mid)' }}>
                {aboutInfo.visionText}
              </p>
            </div>

            {/* Mission */}
            <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-soft)' }}>
              <div className="mv-icon icon-saffron" style={{ marginBottom: '20px' }}><Target size={28} /></div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", color: 'var(--navy)', marginBottom: '16px' }}>Our Mission</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-light)', marginBottom: '20px' }}>
                Our mission is to promote creativity, inclusion, and lifelong learning by:
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {missionPoints.map((point, index) => (
                  <li key={index} style={{ display: 'flex', gap: '10px', alignItems: 'start', fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: '1.5' }}>
                    <span style={{ color: 'var(--saffron)', fontWeight: 'bold' }}>✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Our Foundation</p>
            <h2 className="display-section">Our Core Values</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {coreValues.map((val, idx) => (
              <div key={idx} style={{ padding: '32px', background: 'white', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-soft)' }}>
                <div className={`support-card-icon ${val.colorClass}`} style={{ marginBottom: '20px' }}>
                  {val.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '12px' }}>{val.title}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-mid)' }}>{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="section bg-cream">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Making a Difference</p>
            <h2 className="display-section">Our Impact</h2>
          </div>
          
          <div className="about-impact-card">
            <p style={{ textAlign: 'center', fontSize: '1rem', color: 'var(--text-mid)', marginBottom: '32px', fontStyle: 'italic' }}>
              "Through our initiatives, we strive to bring positive social transformations and heal community relationships through creativity."
            </p>
            <div className="about-impact-grid">
              {impactPoints.map((impact, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ background: 'var(--saffron-pale)', padding: '6px', borderRadius: '50%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={16} style={{ color: 'var(--saffron)' }} />
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--navy)', lineHeight: '1.5', margin: 0, fontWeight: 500 }}>
                    {impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote Board */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Founder's Message</p>
            <h2 className="display-section">A Word from Vishnu Kondoj</h2>
          </div>
          <div className="founder-card">
            <div className="founder-img" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={aboutInfo.founderImage} 
                alt="Vishnu Kondoj" 
                style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)' }} 
              />
            </div>
            <div>
              <p className="eyebrow">Founder &amp; Director</p>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Vishnu Kondoj</h2>
              <p className="founder-quote">
                "{aboutInfo.founderQuote}"
              </p>
              <div className="founder-sig">Vishnu Kondoj</div>
              <div className="founder-title-text">Founder, MasterBrush Art Foundation</div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', background: 'var(--cream-warm)', borderRadius: '12px', padding: '16px 24px' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)' }}>{aboutInfo.statYears}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Years of Impact</div>
                </div>
                <div style={{ textAlign: 'center', background: 'var(--cream-warm)', borderRadius: '12px', padding: '16px 24px' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)' }}>{aboutInfo.statStudents}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Students Trained</div>
                </div>
                <div style={{ textAlign: 'center', background: 'var(--cream-warm)', borderRadius: '12px', padding: '16px 24px' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)' }}>{aboutInfo.statExhibitions}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Exhibitions</div>
                </div>
                <div style={{ textAlign: 'center', background: 'var(--cream-warm)', borderRadius: '12px', padding: '16px 24px' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.8rem', fontWeight: 700, color: 'var(--navy)' }}>{aboutInfo.statLives}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Lives Touched</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
