import React, { useState } from 'react';
import { Calendar, ArrowRight, Clock, Tag } from 'lucide-react';

// Import newly generated blog cover images
import blogGums from '../assets/blog_gums.png';
import blogCancer from '../assets/blog_cancer.png';

// Import existing premium service images for other posts
import imgOrtho from '../assets/service_ortho.png';
import imgImplants from '../assets/service_implants.png';
import imgWhitening from '../assets/service_whitening.png';
import imgPediatric from '../assets/service_pediatric.png';

const BLOG_POSTS = [
  {
    id: 1,
    tag: 'Preventive Care',
    title: '5 Crucial Tips for Maintaining Perfect Gum Health',
    excerpt: 'Gum health is often overlooked, but it is the foundation of a beautiful smile. Discover 5 daily habits you can build today to protect your gums.',
    readTime: '5 min read',
    date: 'July 28, 2026',
    author: 'Dr. Marcus Vance',
    initials: 'MV',
    image: blogGums
  },
  {
    id: 2,
    tag: 'Technology',
    title: 'Why Smoking Increases Your Risk of Oral Cancer',
    excerpt: 'Tobacco use harms your oral health in more ways than stains. Learn the clinical connection between smoking and cell mutations in the mouth.',
    readTime: '4 min read',
    date: 'June 15, 2026',
    author: 'Dr. Priya Sharma',
    initials: 'PS',
    image: blogCancer
  },
  {
    id: 3,
    tag: 'Implants',
    title: 'Dental Implants: Everything You Need to Know Before Surgery',
    excerpt: 'Thinking about dental implants? From candidacy requirements to recovery timelines, our implantologist walks you through the entire process step-by-step.',
    readTime: '8 min read',
    date: 'May 20, 2026',
    author: 'Dr. Marcus Vance',
    initials: 'MV',
    image: imgImplants
  },
  {
    id: 4,
    tag: 'Orthodontics',
    title: 'Invisalign vs. Traditional Braces: A Clinical Comparison',
    excerpt: 'Considering teeth straightening? We compare the clinical advantages, comfort level, and treatment timelines of Invisalign aligners versus metal braces.',
    readTime: '7 min read',
    date: 'May 10, 2026',
    author: 'Dr. Marcus Vance',
    initials: 'MV',
    image: imgOrtho
  },
  {
    id: 5,
    tag: 'Cosmetic Dentistry',
    title: 'The Complete Guide to Professional Teeth Whitening',
    excerpt: 'Professional whitening delivers results that no over-the-counter product can match. This guide explains the process, what to expect, and how to maintain results.',
    readTime: '6 min read',
    date: 'April 5, 2026',
    author: 'Dr. Kelvin Osei',
    initials: 'KO',
    image: imgWhitening
  },
  {
    id: 6,
    tag: 'Child Dentistry',
    title: 'When Should Your Child Have Their First Dental Visit?',
    excerpt: 'Many parents wait too long before scheduling their child\'s first appointment. Our pediatric care team shares the ideal age and what to expect from the first visit.',
    readTime: '4 min read',
    date: 'February 22, 2026',
    author: 'Dr. Priya Sharma',
    initials: 'PS',
    image: imgPediatric
  }
];

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState('All');
  const tags = ['All', ...new Set(BLOG_POSTS.map(p => p.tag))];

  const filtered = selectedTag === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.tag === selectedTag);

  return (
    <div>
      {/* Page Banner */}
      <div className="page-hero-banner">
        <div className="page-hero-inner section">
          <span className="section-tag">Resources</span>
          <h1 className="page-hero-title">Dental Insights & Articles</h1>
          <p className="page-hero-subtitle">
            Clinical recommendations, treatment comparisons, and oral hygiene guidelines by our specialist team.
          </p>
        </div>
      </div>

      <section className="blog-section section" id="blog">
        {/* Tag Filter */}
        <div className="blog-filter-row">
          {tags.map(tag => (
            <button
              key={tag}
              className={`blog-filter-btn ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid-3">
          {filtered.map((post) => (
            <article key={post.id} className="blog-card-premium" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Premium Blog Image Header */}
              <div className="blog-card-img-container" style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  className="blog-card-hover-img"
                />
                <span className="blog-card-tag" style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255, 255, 255, 0.9)', color: 'var(--color-secondary-dark)', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                  <Tag size={11} />
                  {post.tag}
                </span>
              </div>

              <div className="blog-card-content" style={{ padding: '20px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="blog-date" style={{ fontSize: '0.76rem', color: 'var(--color-accent-medium)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {post.date}
                  </span>
                  <span className="blog-read-time" style={{ fontSize: '0.76rem', color: 'var(--color-accent-medium)', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="blog-card-title" style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '8px', lineHeight: '1.4' }}>{post.title}</h3>
                <p className="blog-card-excerpt" style={{ fontSize: '0.85rem', color: 'var(--color-accent-medium)', lineHeight: '1.5', flex: '1' }}>{post.excerpt}</p>
              </div>

              <div className="blog-card-footer" style={{ padding: '16px 20px', borderTop: '1px solid var(--color-accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="blog-author-row" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="blog-author-avatar" style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--color-secondary-soft)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: '700', fontSize: '0.75rem' }}>{post.initials}</div>
                  <span className="blog-author-name" style={{ fontSize: '0.78rem', color: 'var(--color-accent-medium)', fontWeight: '600' }}>{post.author}</span>
                </div>
                <button className="blog-read-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--color-secondary)', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
