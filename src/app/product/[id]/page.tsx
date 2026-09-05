import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Product } from '@/types';
import ProductDetailClient from '@/components/ProductDetailClient';

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p: Product) => ({ id: String(p.id) }));
}

export const dynamicParams = false;

async function fetchProducts(): Promise<Product[]> {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true);
    if (data && !error && data.length > 0) {
      return data as Product[];
    }
  } catch (err) {
    console.error('supabase fetch failed, using mock', err);
  }
  return MOCK_PRODUCTS;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .single();
    if (data && !error) return data as Product;
  } catch (err) {
    console.error('supabase fetch failed, using mock', err);
  }
  return MOCK_PRODUCTS.find(p => p.id === id) || null;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '8px' }}>
          Product Not Found
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          This bag may have been removed or is no longer available.
        </p>
        <a href="/shop" style={{ display: 'inline-block', padding: '10px 24px', background: 'var(--color-earth)', color: 'var(--bg-primary)', borderRadius: '8px', fontWeight: 600, textDecoration: 'none' }}>
          Back to Shop
        </a>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
