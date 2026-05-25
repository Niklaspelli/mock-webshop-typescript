export interface Product {
  id: number;
  name: string;
  price: number;
  stock_status: boolean;
  stock_quantity: number;
  description?: string;
  images?: {
    thumbnail: string;
    large?: string;
  };
}
export interface ProductsResponse {
  data: Product[];
}
export interface OrderItem {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface OrderData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_city: string;
  customer_postcode: string;
  customer_phone: string;
  customer_email: string;
  order_items: OrderItem[];
  order_total: number;
}

export interface ShopContextType {
  cartItems: Record<number, number>;
  addToCart: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  clearCart: () => void;
}

export interface AddToCartButtonTypes {
  id: number;
  text: string;
  stockQuantity: number;
}
