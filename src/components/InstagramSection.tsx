'use client';

import Link from 'next/link';
import { INSTA_GRID_IMAGES } from '@/lib/mock-data';
import { INSTAGRAM_HANDLE, INSTAGRAM_FOLLOWERS } from '@/lib/utils';

export default function InstagramSection() {
  return (
    <section className="instagram-section">
      <div className="container-hf">
        <div className="section-header">
          <span className="sub-heading">Join the Family</span>
          <h2 className="section-title">#HappyFashion</h2>
          <p className="section-desc">{INSTAGRAM_FOLLOWERS} women sharing their style. Follow us for new drops, restocks, and styling tips.</p>
        </div>

        {/* Instagram-style profile header */}
        <div className="insta-profile-header">
          <div className="insta-profile-pic">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </div>
          <div className="insta-profile-info">
            <div className="insta-username">happy_fashion_9100</div>
            <div className="insta-stats">
              <span><strong>{INSTAGRAM_FOLLOWERS}</strong> followers</span>
              <span><strong>9</strong> posts</span>
            </div>
          </div>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="insta-follow-btn"
          >
            Follow
          </a>
        </div>

        {/* Instagram-style grid */}
        <div className="insta-grid">
          {INSTA_GRID_IMAGES.map((img, i) => (
            <Link key={i} href="/shop" className="insta-grid-item">
              <img src={img.src} alt={img.alt} />
              <div className="insta-grid-overlay">
                <span>{img.alt}</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="insta-cta-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow @happy_fashion_9100
          </a>
        </div>
      </div>
    </section>
  );
}
