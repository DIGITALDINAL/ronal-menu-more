"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { getAiSuggestions } from "@/app/actions";
import type { MenuItem } from "@/lib/types";
import { MenuItemCard } from "./MenuItemCard";
import { Skeleton } from "./ui/skeleton";
import { Sparkles } from "lucide-react";

export function AiSuggestions() {
  const { orders } = useCart();
  const [suggestions, setSuggestions] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      setLoading(true);
      const newSuggestions = await getAiSuggestions(orders);
      setSuggestions(newSuggestions);
      setLoading(false);
    }
    fetchSuggestions();
  }, [orders]);

  if (loading) {
    return (
        <section className="mb-12">
            <h2 className="font-headline text-3xl text-center mb-6 flex items-center justify-center gap-3">
                <Sparkles className="text-primary" />
                Chef's Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Skeleton className="h-[400px] rounded-lg" />
                <Skeleton className="h-[400px] rounded-lg" />
                <Skeleton className="h-[400px] rounded-lg" />
            </div>
      </section>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
        <h2 className="font-headline text-3xl text-center mb-6 flex items-center justify-center gap-3">
            <Sparkles className="text-primary" />
            Just For You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestions.map((item) => (
            <MenuItemCard key={item.id} item={item} />
            ))}
      </div>
    </section>
  );
}
