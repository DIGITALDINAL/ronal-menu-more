"use client";

import Link from 'next/link';
import { ShoppingCart, UtensilsCrossed, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { CartSheet } from './CartSheet';
import { useState } from 'react';
import { useTableNumber } from '@/context/TableNumberContext';

export function Header() {
  const { itemCount, tableNumber } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { openDialog } = useTableNumber();

  return (
    <header className="bg-card shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <UtensilsCrossed className="h-8 w-8" />
          <span className="font-headline text-2xl font-bold">Ronal's</span>
        </Link>
        <nav className="flex items-center gap-4">
            {tableNumber && (
                <Button variant="ghost" onClick={openDialog}>
                    Table: {tableNumber} <SquarePen className="ml-2 h-4 w-4" />
                </Button>
            )}
          <Button variant="ghost" asChild>
            <Link href="/" className="font-body font-bold">Menu</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/history" className="font-body font-bold">Order History</Link>
          </Button>
          <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <Button onClick={() => setIsCartOpen(true)} variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </CartSheet>
        </nav>
      </div>
    </header>
  );
}
