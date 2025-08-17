"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import type { ReactNode } from "react";
import { formatRupiah } from "@/lib/utils";

interface CartSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export function CartSheet({ open, onOpenChange, children }: CartSheetProps) {
  const { cart, updateQuantity, removeFromCart, cartTotal, placeOrder, itemCount } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
            {children}
        </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline text-3xl">Your Order</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-grow my-4 pr-6 -mr-6">
                <div className="flex flex-col gap-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                        data-ai-hint={item.aiHint}
                    />
                    <div className="flex-grow">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{formatRupiah(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold w-4 text-center">{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    </div>
                ))}
                </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
                <div className="w-full space-y-4">
                    <Separator />
                    <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total</span>
                        <span>{formatRupiah(cartTotal)}</span>
                    </div>
                    <Button className="w-full font-bold text-lg" size="lg" onClick={placeOrder}>
                        Place Order
                    </Button>
                </div>
            </SheetFooter>
          </>
        ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center gap-4">
                <ShoppingCart className="h-24 w-24 text-muted-foreground/50" />
                <p className="font-headline text-2xl text-muted-foreground">Your cart is empty!</p>
                <p className="text-muted-foreground">Add some delicious items from our menu.</p>
                <SheetClose asChild>
                    <Button>Start Ordering</Button>
                </SheetClose>
            </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
