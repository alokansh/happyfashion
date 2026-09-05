export function inr(value: number | string): string {
  const num = Number(value || 0);
  return `₹${num.toLocaleString('en-IN')}`;
}

export const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'happy_fashion_9100';
export const INSTAGRAM_FOLLOWERS = '300K+';

export const STORE_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918178221808';

export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

export const ADMIN_EMAIL = 'admin@happyfashion.com';
export const ADMIN_PASSWORD = 'admin123';
