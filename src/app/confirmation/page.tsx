"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle2, Home, ListOrdered } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/lib/utils";

export default function ConfirmationPage() {
  const { lastPlacedOrder } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!lastPlacedOrder) {
      router.replace('/');
    }
  }, [lastPlacedOrder, router]);

  if (!lastPlacedOrder) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center bg-secondary/50 p-8">
            <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="font-headline text-4xl text-primary">Thank You For Your Order!</CardTitle>
            <p className="text-muted-foreground">Your simulated order for table <strong>{lastPlacedOrder.tableNumber}</strong> has been placed successfully.</p>
            <p className="text-sm text-muted-foreground mt-2">Order ID: {lastPlacedOrder.id}</p>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <ul className="space-y-4">
            {lastPlacedOrder.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image src={item.image} alt={item.name} width={48} height={48} className="rounded-md" data-ai-hint={item.aiHint}/>
                    <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {item.quantity} x {formatRupiah(item.price)}
                        </p>
                    </div>
                </div>
                <p className="font-semibold">{formatRupiah(item.quantity * item.price)}</p>
              </li>
            ))}
          </ul>
          <div className="border-t my-4"></div>
          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>{formatRupiah(lastPlacedOrder.total)}</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 p-6 bg-secondary/50">
            <Button asChild className="w-full">
                <Link href="/"><Home className="mr-2"/>Back to Menu</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
                <Link href="/history"><ListOrdered className="mr-2"/>View Order History</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
