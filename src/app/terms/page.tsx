import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — Happy Fashion',
};

export default function TermsPage() {
  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container-hf">
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--color-earth)', marginBottom: '32px' }}>
          Terms & Conditions
        </h1>

        <div style={{ display: 'grid', gap: '32px' }}>
          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              General
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>By using this website, you agree to be bound by these terms and conditions. If you do not agree, please do not use our website or services.</p>
              <p>We reserve the right to modify these terms at any time. Changes are effective immediately upon posting to the website.</p>
              <p>Happy Fashion reserves the right to refuse service to anyone for any reason.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Products & Pricing
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>All prices are in Indian Rupees (₹) and include applicable taxes.</p>
              <p>We make every effort to display product colors accurately, but actual colors may vary slightly due to monitor settings.</p>
              <p>We reserve the right to modify prices at any time without prior notice. The price at the time of order placement is final.</p>
              <p>Product availability is subject to stock. We reserve the right to cancel orders if products become unavailable.</p>
              <p>We do not guarantee that product descriptions or other content on this site are error-free.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Orders & Payment
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>Orders are confirmed only after payment is received.</p>
              <p>We accept prepaid payments via Razorpay (credit/debit cards, UPI, net banking, wallets).</p>
              <p>We reserve the right to cancel any order suspected of fraud or misuse.</p>
              <p>Bulk/reseller orders may require prior approval.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Intellectual Property
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>All content on this website — including text, images, logos, and designs — is the property of Happy Fashion and protected by copyright.</p>
              <p>You may not reproduce, distribute, or use our content without written permission.</p>
              <p>Product photos are for representation only. Actual products may have slight variations.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Limitation of Liability
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>Happy Fashion is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
              <p>Our total liability for any claim shall not exceed the amount paid for the specific product in question.</p>
              <p>We do not guarantee uninterrupted or error-free website operation.</p>
            </div>
          </div>

          <div className="admin-card">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-earth)', marginBottom: '16px' }}>
              Contact Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              <p>For any questions about these terms, contact us at:</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>WhatsApp:</strong> +91 81782 21808</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Instagram:</strong> @happy_fashion_9100</p>
              <p><strong style={{ color: 'var(--color-earth)' }}>Store:</strong> Happy Fashion, Sector 18, Noida, UP 201301</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
