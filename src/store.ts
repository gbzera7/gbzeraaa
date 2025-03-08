import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface OrderState {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (isOpen: boolean) => void;
  selectedPaymentMethod: 'pix' | 'card' | null;
  setSelectedPaymentMethod: (method: 'pix' | 'card' | null) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  cart: [],
  total: 0,
  isCheckoutOpen: false,
  selectedPaymentMethod: null,
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
          total: state.total + item.price,
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  removeFromCart: (itemId) =>
    set((state) => {
      const item = state.cart.find((cartItem) => cartItem.id === itemId);
      return {
        cart: state.cart.filter((cartItem) => cartItem.id !== itemId),
        total: state.total - (item ? item.price * item.quantity : 0),
      };
    }),
  updateQuantity: (itemId, quantity) =>
    set((state) => {
      const item = state.cart.find((cartItem) => cartItem.id === itemId);
      if (!item) return state;
      const oldTotal = item.price * item.quantity;
      const newTotal = item.price * quantity;
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        ),
        total: state.total - oldTotal + newTotal,
      };
    }),
  clearCart: () => set({ cart: [], total: 0, isCheckoutOpen: false, selectedPaymentMethod: null }),
  setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
}));