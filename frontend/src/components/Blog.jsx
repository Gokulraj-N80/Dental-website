import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, Clock, Tag } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    tag: 'Preventive Care',
    title: '5 Crucial Tips for Maintaining Perfect Gum Health',
    excerpt: 'Gum health is often overlooked, but it is the foundation of a beautiful smile. Discover 5 daily habits you can build today to protect your gums and prevent disease.',
    readTime: '5 min read',
    date: 'July 28, 2026',
    author: 'Dr. Marcus Vance',
    initials: 'MV'
  },
  {
    id: 2,
    tag: 'Technology',
    title: 'Why Digital Intraoral Scans are Safer and More Accurate',
    excerpt: 'Traditional dental molds are uncomfortable and prone to error. Learn how our new 3D digital scanner solves both problems, delivering faster, more accurate treatment results.',
    readTime: '4 min read',
    date: 'June 15, 2026',
    author: 'Dr. Priya Sharma',
    initials: 'PS'
  },
  {
    id: 3,
    tag: 'Orthodontics',
    title: 'Invisalign vs. Traditional Braces: A Clinical Comparison',
    excerpt: 'Considering teeth straightening? We compare the clinical advantages, comfort level, and treatment timelines of Invisalign aligners versus traditional metal braces.',
    readTime: '7 min read',
    date: 'May 10, 2026',
    author: 'Dr. Marcus Vance',
    initials: 'MV'
  },
  {
    id: 4,
    tag: 'Cosmetic Dentistry',
    title: 'The Complete Guide to Professional Teeth Whitening',
    excerpt: 'Professional whitening delivers results that no over-the-counter product can match. This guide explains the process, what to expect, and how to maintain results long-term.',
    readTime: '6 min read',
    date: 'April 5, 2026',
    author: 'Dr. Kelvin Osei',
    initials: 'KO'
  },
  {
    id: 5,
    tag: 'Implants',
    title: 'Dental Implants: Everything You Need to Know Before Surgery',
    excerpt: 'Thinking about dental implants? From candidacy requirements to recovery timelines, our implantologist walks you through the entire process step-by-step.',
    readTime: '8 min read',
    date: 'March 18, 2026',
    author: 'Dr. Marcus Vance',
    initials: 'MV'
  },
  {
    id: 6,
    tag: 'Child Dentistry',
    title: 'When Should Your Child Have Their First Dental Visit?',
    excerpt: 'Many parents wait too long before scheduling their child\'s first appointment. Our pediatric care team shares the ideal age and what to expect from the first visit.',
    readTime: '4 min read',
    date: 'February 22, 2026',
    author: 'Dr. Priya Sharma',
    initials: 'PS'
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
            <article key={post.id} className="blog-card-premium">
              <div className="blog-card-tag-row">
                <span className="blog-card-tag">
                  <Tag size={11} />
                  {post.tag}
                </span>
                <span className="blog-read-time">
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>

              <div className="blog-card-content">
                <span className="blog-date">
                  <Calendar size={12} style={{ marginRight: '4px', flexShrink: 0 }} />
                  {post.date}
                </span>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
              </div>

              <div className="blog-card-footer">
                <div className="blog-author-row">
                  <div className="blog-author-avatar">{post.initials}</div>
                  <span className="blog-author-name">By {post.author}</span>
                </div>
                <button className="blog-read-btn">
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
