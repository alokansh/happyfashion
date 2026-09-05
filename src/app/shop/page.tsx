'use client';

import { useState, useEffect, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '@/lib/mock-data';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Fetch products from Supabase on mount
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

  // Read category from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat && CATEGORIES.some(c => c.key === cat)) {
      setActiveCategory(cat);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.active);

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.color_name.toLowerCase().includes(q) ||
        p.category_label.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filtered.sort((a, b) => parseInt(b.discount || '0') - parseInt(a.discount || '0'));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return filtered;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section className="catalog-section">
      <div className="container-hf">
        <div className="section-header-flex">
          <div>
            <span className="sub-heading">Our Collection</span>
            <h2 className="section-title">
              {activeCategory === 'all' ? 'All Bags' : CATEGORIES.find(c => c.key === activeCategory)?.label || 'Shop'}
            </h2>
          </div>
          <div className="filter-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                className={`filter-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-controls">
          <div className="search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search bags, colors, collections..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="sort-select-wrap">
            <span>Sort:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No bags found</p>
            <p style={{ fontSize: '0.9rem' }}>Try a different search or category</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'bag' : 'bags'}
            </p>
            <div className="products-grid">
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
