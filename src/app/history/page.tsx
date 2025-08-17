"use client";

import { useCart } from "@/context/CartContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatRupiah } from "@/lib/utils";

export default function HistoryPage() {
  const { orders } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="font-headline text-5xl text-center mb-8 text-primary">Your Order History</h1>
        
        {orders.length > 0 ? (
            <Card className="max-w-4xl mx-auto shadow-lg">
                <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                        {orders.map((order) => (
                        <AccordionItem value={order.id} key={order.id}>
                            <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50 transition-colors">
                                <div className="flex justify-between w-full pr-4">
                                    <div className="flex flex-col items-start">
                                      <span className="font-bold">Order #{order.id.slice(-6)}</span>
                                      <span className="text-sm text-muted-foreground">Table {order.tableNumber}</span>
                                    </div>
                                    <span className="text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
                                    <span className="font-bold text-primary">{formatRupiah(order.total)}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-6 bg-secondary/20">
                                <h4 className="font-bold mb-4">Items:</h4>
                                <ul className="space-y-4">
                                    {order.items.map((item) => (
                                    <li key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Image src={item.image} alt={item.name} width={40} height={40} className="rounded-md" data-ai-hint={item.aiHint}/>
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
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        ) : (
            <Card className="max-w-md mx-auto text-center p-8 shadow-lg">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <PackageSearch className="h-24 w-24 text-muted-foreground/50"/>
                    </div>
                    <CardTitle className="font-headline text-3xl">No Orders Yet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">You haven't placed any orders in this session. Let's change that!</p>
                    <Button asChild>
                        <Link href="/">Explore The Menu</Link>
                    </Button>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
