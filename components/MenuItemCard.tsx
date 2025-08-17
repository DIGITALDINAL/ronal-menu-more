"use client";

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import type { MenuItem } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="aspect-[3/2] relative">
            <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
                data-ai-hint={item.aiHint}
            />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="font-headline text-2xl mb-2">{item.name}</CardTitle>
        <CardDescription className="font-body">{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 pt-0">
        <p className="text-xl font-bold text-primary">{formatRupiah(item.price)}</p>
        <Button onClick={() => addToCart(item)}>
            <PlusCircle className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
