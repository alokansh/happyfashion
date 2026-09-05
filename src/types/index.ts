export interface Product {
  id: string;
  name: string;
  category: string;
  category_label: string;
  price: number;
  mrp: number;
  discount: string;
  color: string;
  color_name: string;
  image: string;
  tags: string[];
  tag_text: string;
  description: string;
  leather_type: string;
  dimensions?: string;
  hardware: string;
  strap: string;
  stock: number;
  active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  order_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  address: string;
  city: string;
  pin: string;
  items: OrderItem[];
  subtotal: number;
  checkout_amount: number;
  currency: string;
  mode: string;
  status: string;
  payment_status: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}
