"use client";

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem, MenuItem, Order } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';


interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeFromCart: (itemId: number) => void;
  cartTotal: number;
  itemCount: number;
  placeOrder: () => void;
  orders: Order[];
  lastPlacedOrder: Order | null;
  tableNumber: string | null;
  setTableNumber: (table: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState<string | null>(null);


  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast({
      title: "Added to cart!",
      description: `${item.name} is now in your order.`,
    })
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter((item) => item.id !== itemId);
      }
      return prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
     toast({
      title: "Item removed",
      variant: "destructive",
      description: `The item has been removed from your cart.`,
    })
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const placeOrder = () => {
    if (cart.length === 0) {
        toast({
            title: "Your cart is empty!",
            description: "Please add items to your cart before placing an order.",
            variant: "destructive",
        });
        return;
    }
    if (!tableNumber) {
        toast({
            title: "No Table Number!",
            description: "Please enter your table number before placing an order.",
            variant: "destructive",
        });
        return;
    }

    const newOrder: Order = {
        id: new Date().getTime().toString(),
        items: [...cart],
        total: cartTotal,
        date: new Date(),
        tableNumber: tableNumber,
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setLastPlacedOrder(newOrder);
    setCart([]);
    router.push('/confirmation');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, cartTotal, itemCount, placeOrder, orders, lastPlacedOrder, tableNumber, setTableNumber }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
