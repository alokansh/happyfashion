'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { inr } from '@/lib/utils';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin');
    }
  }, [authLoading, user, router]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (data && !error) {
          setProducts(data as Product[]);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hf-admin-session');
    router.push('/admin');
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const handleSaveProduct = async (product: Product) => {
    setSaveLoading(true);
    setError(null);
    try {
      if (editingProduct) {
        const { data, error } = await supabase
          .from('products')
          .update({
            name: product.name,
            category: product.category,
            category_label: product.category_label,
            price: product.price,
            mrp: product.mrp,
            discount: product.discount || '',
            color: product.color || '#A45A49',
            color_name: product.color_name || '',
            image: product.image,
            tags: product.tags || [],
            tag_text: product.tag_text || '',
            description: product.description,
            leather_type: product.leather_type || '',
            hardware: product.hardware || '',
            strap: product.strap || '',
            stock: product.stock || 25,
            active: product.active ?? true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingProduct.id)
          .select()
          .single();
        if (error) throw error;
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? data : p));
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert({
            name: product.name,
            category: product.category,
            category_label: product.category_label,
            price: product.price,
            mrp: product.mrp,
            discount: product.discount || '',
            color: product.color || '#A45A49',
            color_name: product.color_name || '',
            image: product.image,
            tags: product.tags || [],
            tag_text: product.tag_text || '',
            description: product.description,
            leather_type: product.leather_type || '',
            hardware: product.hardware || '',
            strap: product.strap || '',
            stock: product.stock || 25,
            active: product.active ?? true,
          })
          .select()
          .single();
        if (error) throw error;
        setProducts(prev => [data, ...prev]);
      }
      setEditingProduct(null);
      setShowAddForm(false);
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaveLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="admin-page">
        <div className="container-hf">
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div className="spinner" style={{ marginBottom: '16px' }} />
            <p>Checking auth...</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container-hf">
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <div className="spinner" style={{ marginBottom: '16px' }} />
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container-hf">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 className="admin-panel-title">Admin Dashboard</h1>
          <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
        </div>

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Products ({products.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders (0)
          </button>
        </div>

        {activeTab === 'products' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--color-earth)' }}>
                All Products
              </h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => { setEditingProduct(null); setShowAddForm(true); }}
              >
                + Add Product
              </button>
            </div>

            {(showAddForm || editingProduct) && (
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onCancel={() => { setShowAddForm(false); setEditingProduct(null); }}
                loading={saveLoading}
              />
            )}

            <div className="admin-card" style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className="prod-mini">
                          <img src={p.image} alt={p.name} />
                          <span>{p.name}</span>
                        </div>
                      </td>
                      <td>{p.category_label}</td>
                      <td>{inr(p.price)}</td>
                      <td>{p.stock}</td>
                      <td>
                        <span className="admin-badge">{p.active ? 'Active' : 'Hidden'}</span>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setEditingProduct(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ marginLeft: '6px', color: '#E63946' }}
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="admin-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📦</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--color-earth)', marginBottom: '8px' }}>
              No orders yet
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Orders will appear here when customers place them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
  loading,
}: {
  product: Product | null;
  onSave: (p: Product) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<Product>(product || {
    id: '',
    name: '',
    category: 'tote',
    category_label: 'Structured Tote',
    price: 0,
    mrp: 0,
    discount: '',
    color: '#A45A49',
    color_name: '',
    image: '',
    tags: [],
    tag_text: '',
    description: '',
    leather_type: '',
    hardware: '',
    strap: '',
    stock: 25,
    active: true,
    created_at: new Date().toISOString(),
  });

  const [imagePreview, setImagePreview] = useState<string>(product?.image || '');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [priceStr, setPriceStr] = useState(product?.price ? String(product.price) : '');
  const [mrpStr, setMrpStr] = useState(product?.mrp ? String(product.mrp) : '');

  useEffect(() => {
    if (product) {
      setImagePreview(product.image);
      setPriceStr(String(product.price));
      setMrpStr(String(product.mrp));
    }
  }, [product]);

  useEffect(() => {
    const priceNum = parseFloat(priceStr) || 0;
    const mrpNum = parseFloat(mrpStr) || 0;
    if (priceNum > 0 && mrpNum > priceNum) {
      const discount = Math.round(((mrpNum - priceNum) / mrpNum) * 100);
      setForm({ ...form, price: priceNum, mrp: mrpNum, discount: `${discount}% OFF` });
    } else {
      setForm({ ...form, price: priceNum, mrp: mrpNum, discount: '' });
    }
  }, [priceStr, mrpStr]);

  const handleImageChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setForm({ ...form, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      alert('Please upload an image for the product');
      return;
    }
    onSave({ ...form, image: imagePreview });
  };

  return (
    <div className="admin-card" style={{ marginBottom: '24px' }}>
      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
        {product ? 'Edit Product' : 'Add New Product'}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          <div className="full">
            <label>Product Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Sienna Rose Structured Flap"
              required
            />
          </div>

          <div>
            <label>Category *</label>
            <select
              value={form.category}
              onChange={e => {
                const cat = e.target.value;
                const labels: Record<string, string> = {
                  tote: 'Structured Tote', crossbody: 'Crossbody & Satchel', shoulder: 'Shoulder Bag', clutch: 'Evening Clutch'
                };
                setForm({ ...form, category: cat, category_label: labels[cat] || cat });
              }}
            >
              <option value="tote">Tote</option>
              <option value="crossbody">Crossbody</option>
              <option value="shoulder">Shoulder</option>
              <option value="clutch">Clutch</option>
            </select>
          </div>

          <div>
            <label>Color Name</label>
            <input
              type="text"
              value={form.color_name}
              onChange={e => setForm({ ...form, color_name: e.target.value })}
              placeholder="e.g. Terracotta Sienna"
            />
          </div>

          <div>
            <label>Price (₹) *</label>
            <input
              type="number"
              value={priceStr}
              onChange={e => setPriceStr(e.target.value)}
              placeholder="e.g. 1899"
              required
            />
          </div>

          <div>
            <label>MRP (₹) *</label>
            <input
              type="number"
              value={mrpStr}
              onChange={e => setMrpStr(e.target.value)}
              placeholder="e.g. 2999"
              required
            />
          </div>

          <div>
            <label>Discount</label>
            <input
              type="text"
              value={form.discount}
              readOnly
              style={{
                fontWeight: 700,
                color: form.discount ? '#E63946' : 'var(--text-muted)',
                background: form.discount ? '#FFF5F5' : 'var(--bg-primary)'
              }}
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label>Tag</label>
            <select
              value={form.tags[0] || ''}
              onChange={e => {
                const tag = e.target.value;
                const labels: Record<string, string> = {
                  bestseller: 'Bestseller', new: 'New Arrival', limited: 'Limited Run', '': ''
                };
                setForm({ ...form, tags: tag ? [tag] : [], tag_text: labels[tag] || '' });
              }}
            >
              <option value="">None</option>
              <option value="bestseller">Bestseller</option>
              <option value="new">New Arrival</option>
              <option value="limited">Limited Run</option>
            </select>
          </div>

          <div>
            <label>Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
            />
          </div>

          {/* Image Upload - Full Width */}
          <div className="full">
            <label>Product Image *</label>
            <div
              className={'image-upload-zone ' + (dragActive ? 'drag-active ' : '') + (imagePreview ? 'has-image' : '')}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />

              {imagePreview ? (
                <div className="image-preview-container">
                  <img src={imagePreview} alt="Preview" className="image-preview-img" />
                  <div className="image-preview-overlay">
                    <span>Click or drop to change</span>
                  </div>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p>Click or drag image here</p>
                  <small>JPG, PNG, WebP &#8212; Max 5MB</small>
                </div>
              )}
            </div>
          </div>

          <div className="full">
            <label>Description *</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Product description..."
              rows={3}
              required
            />
          </div>

          <div>
            <label>Leather Type</label>
            <input
              type="text"
              value={form.leather_type}
              onChange={e => setForm({ ...form, leather_type: e.target.value })}
              placeholder="Genuine Leather"
            />
          </div>

          <div>
            <label>Hardware</label>
            <input
              type="text"
              value={form.hardware}
              onChange={e => setForm({ ...form, hardware: e.target.value })}
              placeholder="Solid Brass"
            />
          </div>

          <div>
            <label>Strap</label>
            <input
              type="text"
              value={form.strap}
              onChange={e => setForm({ ...form, strap: e.target.value })}
              placeholder="Detachable Strap"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
          </button>
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
