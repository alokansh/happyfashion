'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS, CATEGORY_CARDS } from '@/lib/mock-data';
import ProductCard from '@/components/ProductCard';
import InstagramSection from '@/components/InstagramSection';
import { inr, STORE_WHATSAPP } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

function Hero({ heroProduct }: { heroProduct: Product }) {
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-bg-glow" />
      <div className="hero-content">
        <div>
          <div className="hero-pill-badge">
            <span className="badge-dot" />
            New Collection &#8212; Autumn 2026
          </div>
          <h1 className="hero-title">
            Beautiful Handcrafted Leather Bags
          </h1>
          <p className="hero-description">
            Italian-inspired designs, genuine leather, and quality hardware &#8212; made with care at our Noida store.
          </p>
          <div className="hero-cta-group">
            <Link href="/shop" className="btn btn-primary">Shop the Collection</Link>
            <Link href="#craftsmanship" className="btn btn-secondary">Our Craft</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">12K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">4.9&#9733;</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item insta">
              <span className="stat-num">300K+</span>
              <span className="stat-label">Instagram Family</span>
            </div>
          </div>
        </div>

        <div className="hero-visual-col">
          <div className="hero-card-container">
            <div ref={cardRef} className="showcase-card">
              <div className="showcase-img-wrap">
                <img src={heroProduct.image} alt={heroProduct.name} className="hero-handbag-img" />
              </div>
              <div className="showcase-details">
                <div>
                  <span className="meta-tag">Bestseller</span>
                  <h3 className="showcase-name">{heroProduct.name}</h3>
                  <div>
                    <span className="showcase-price">{inr(heroProduct.price)}</span>
                    <span className="old-price">{inr(heroProduct.mrp)}</span>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" style={{ whiteSpace: 'nowrap' }} onClick={() => addItem(heroProduct)}>
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="floating-badge badge-top-left float-anim-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A45A49" strokeWidth="2"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>
              <div>
                <strong>Real Leather</strong>
                <small>Full leather bags</small>
              </div>
            </div>
            <div className="floating-badge badge-bottom-right float-anim-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A45A49" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <div>
                <strong>Handcrafted</strong>
                <small>Made with love</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="container-hf">
        <div className="section-header">
          <span className="sub-heading">Collections</span>
          <h2 className="section-title">Find Your Perfect Carry</h2>
          <p className="section-desc">From spacy totes to evening clutches &#8212; a silhouette for every moment of your day.</p>
        </div>
        <div className="categories-grid">
          {CATEGORY_CARDS.map(cat => (
            <Link key={cat.key} href={`/shop?category=${cat.key}`} className="category-card">
              <img src={cat.img} alt={cat.label} />
              <div className="cat-overlay" />
              <div className="cat-content">
                <span className="cat-tag">Collection</span>
                <h3 className="cat-title">{cat.label}</h3>
                <p className="cat-subtitle">{cat.subtitle}</p>
                <span className="cat-link">Shop Now &#8594;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.filter(p => p.tags.includes('bestseller') || p.tags.includes('new')).slice(0, 4);

  return (
    <section className="catalog-section">
      <div className="container-hf">
        <div className="section-header-flex">
          <div>
            <span className="sub-heading">Most Loved</span>
            <h2 className="section-title">Trending Now</h2>
          </div>
          <Link href="/shop" className="btn btn-outline btn-sm">View All &#8594;</Link>
        </div>
        <div className="products-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  return (
    <section className="craftsmanship-section" id="craftsmanship">
      <div className="container-hf">
        <div className="craft-wrapper">
          <div className="craft-img-stack">
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
              alt="Leather craft"
              className="craft-img-main"
            />
            <div className="craft-badge-glass">
              <span className="craft-badge-title">Made by Hand</span>
              <p>Each bag takes 12+ hours of skilled handwork from cutting to stitching.</p>
            </div>
          </div>
          <div>
            <span className="sub-heading">Why Us?</span>
            <h2 className="section-title">Bags You'll Love to Carry</h2>
            <p className="craft-lead">
              We make beautiful leather bags that look expensive but aren't. Every bag is hand-stitched
              by skilled craftsmen in Noida using genuine leather &#8212; no shortcuts, no fake materials.
            </p>
            <div className="craft-features-list">
              <div className="craft-feature-item">
                <div className="craft-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div>
                  <h4>Real Leather</h4>
                  <p>Real leather that ages beautifully &#8212; not PU or faux.</p>
                </div>
              </div>
              <div className="craft-feature-item">
                <div className="craft-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
                <div>
                  <h4>Quality Hardware</h4>
                  <p>Strong stitching that lasts &#8212; no glue, no shortcuts.</p>
                </div>
              </div>
              <div className="craft-feature-item">
                <div className="craft-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div>
                  <h4>14-Day Returns</h4>
                  <p>Don't love it? Send it back within 14 days, no questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreVisit() {
  return (
    <section className="store-visit-section" id="store-visit">
      <div className="container-hf">
        <div className="store-grid">
          <div>
            <span className="sub-heading">Visit the Store</span>
            <h2 className="section-title">Try Before You Buy</h2>
            <div className="store-info">
              <div className="store-detail">
                <div className="icn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Happy Fashion<br/>Sector 18, Noida, UP 201301</p>
                </div>
              </div>
              <div className="store-detail">
                <div className="icn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h4>Hours</h4>
                  <p>Mon&#8211;Sat: 10 AM &#8211; 8 PM<br/>Sunday: 11 AM &#8211; 6 PM</p>
                </div>
              </div>
              <div className="store-detail">
                <div className="icn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4>Contact</h4>
                  <a href={`https://wa.me/918178221808`} target="_blank" rel="noreferrer" className="store-whatsapp-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="store-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2858!2d77.3218918!3d28.5726565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5359f55b291%3A0x4a5e22c0290bb664!2sHappy%20fashion!5e0!3m2!1sen!2sin!4v1728000000000!5m2!1sen!2sin"
              title="Store location map"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={`https://wa.me/${STORE_WHATSAPP}`} target="_blank" rel="noreferrer" className="floating-whatsapp-btn" title="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    </a>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (typeof window !== 'undefined') {
          const { supabase } = await import('@/lib/supabase');
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });
          if (data && !error) {
            setProducts(data as Product[]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch products, using mock data');
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="announcement-bar">
        <div className="announcement-track">
          FREE SHIPPING on orders above &#8377;999
          <span>&#9679;</span>
          <span>COD AVAILABLE across India</span>
          <span>&#9679;</span>
          <span>14-DAY EASY RETURNS</span>
          <span>&#9679;</span>
          <span>HANDCRAFTED WITH LOVE</span>
          <span>&#9679;</span>
          FREE SHIPPING on orders above &#8377;999
          <span>&#9679;</span>
          <span>COD AVAILABLE across India</span>
          <span>&#9679;</span>
          <span>14-DAY EASY RETURNS</span>
          <span>&#9679;</span>
          <span>HANDCRAFTED WITH LOVE</span>
          <span>&#9679;</span>
        </div>
      </div>
      <Hero heroProduct={products[0]} />
      <Categories />
      <FeaturedProducts products={products} />
      <Craftsmanship />
      <InstagramSection />
      <StoreVisit />
      <FloatingWhatsApp />
    </>
  );
}
