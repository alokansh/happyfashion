'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_EMAIL } from '@/lib/utils';

export default function AdminLogin() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div className="payment-state">
      <div className="card" style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👜</div>
        <h2>Admin Panel</h2>
        <p style={{ fontSize: '0.85rem' }}>Sign in to manage your store</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-earth)', display: 'block', marginBottom: '4px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@happyfashion.com"
              style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-earth)', display: 'block', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="&#8226;&#8222;&#8220;&#8221;"
              style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem' }}
            />
          </div>
          {error && <p style={{ fontSize: '0.78rem', color: '#E63946' }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '16px' }}>
          Demo: admin@happyfashion.com / admin123
        </p>
      </div>
    </div>
  );
}
