'use client';

import { useCart } from '@/contexts/CartContext';
import { inr } from '@/lib/utils';
import Link from 'next/link';
import { Product } from '@/types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container-hf">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-secondary)', aspectRatio: '1/1' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Details */}
          <div>
            <span className="sub-heading">{product.category_label}</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-earth)', marginBottom: '12px', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-earth)' }}>{inr(product.price)}</span>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{inr(product.mrp)}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2D6A4F' }}>{product.discount}</span>
            </div>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
              {product.description}
            </p>

            {/* Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Leather</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-earth)' }}>{product.leather_type}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Hardware</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-earth)' }}>{product.hardware}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Color</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--color-earth)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: product.color, display: 'inline-block', border: '1px solid rgba(0,0,0,0.15)' }} />
                  {product.color_name}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Availability</span>
                <strong style={{ fontSize: '0.85rem', color: product.stock > 0 ? '#2D6A4F' : '#E63946' }}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </strong>
              </div>
            </div>

            {product.tag_text && (
              <span className="tag-badge tag-bestseller" style={{ marginBottom: '20px', display: 'inline-block' }}>
                {product.tag_text}
              </span>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => addItem(product)}>
                Add to Cart
              </button>
              <Link href="/checkout" className="btn btn-secondary" onClick={() => addItem(product)}>
                Buy Now
              </Link>
            </div>

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <strong style={{ color: 'var(--color-earth)' }}>Free shipping</strong> on orders above &#8377;999
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                <strong style={{ color: 'var(--color-earth)' }}>COD available</strong> across India
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--color-earth)' }}>14-day easy returns</strong> &mdash; no questions asked
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
