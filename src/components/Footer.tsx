'use client';

import Link from 'next/link';
import { INSTAGRAM_HANDLE, STORE_WHATSAPP } from '@/lib/utils';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="container-hf">
        <div className="footer-top">
          <div>
            <span className="footer-logo">HAPPY FASHION</span>
            <p className="footer-tagline">Beautiful handcrafted leather bags — made with love at our Noida store. Quality materials, timeless designs, accessible pricing.</p>
            <div className="social-links">
              <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noreferrer" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={`https://wa.me/${STORE_WHATSAPP}`} target="_blank" rel="noreferrer" title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Shop</h4>
            <ul>
              <li><Link href="/shop">All Bags</Link></li>
              <li><Link href="/shop?category=tote">Totes</Link></li>
              <li><Link href="/shop?category=crossbody">Crossbody</Link></li>
              <li><Link href="/shop?category=shoulder">Shoulder</Link></li>
              <li><Link href="/shop?category=clutch">Clutches</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Help</h4>
            <ul>
              <li><Link href={`https://wa.me/${STORE_WHATSAPP}`}>Contact Us</Link></li>
              <li><Link href="/shipping-returns">Shipping & Returns</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay in the loop</h4>
            <p>New drops, restocks, and exclusive offers.</p>
            {subscribed ? (
              <p style={{ color: '#EBD8B2', fontWeight: 600 }}>Welcome to the atelier! Check your inbox.</p>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit">Join</button>
              </form>
            )}
            <span className="spam-disclaimer">No spam, unsubscribe anytime.</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Happy Fashion. All rights reserved.</span>
          <span>Made and maintained by <a href="https://anshalok.dev" target="_blank" rel="noreferrer" className="footer-credit-link">Ansh Alok</a></span>
        </div>
      </div>
    </footer>
  );
}
