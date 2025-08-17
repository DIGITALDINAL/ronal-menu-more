"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuItems } from "@/lib/menu";
import type { Category } from "@/lib/types";
import { MenuItemCard } from "./MenuItemCard";

const categories: (Category | "All")[] = ["All", "Breakfast", "Lunch", "Dinner", "Appetizers", "Desserts", "Drinks"];

export function MenuTabs() {
  return (
    <Tabs defaultValue="All" className="w-full">
      <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 bg-secondary mb-8">
        {categories.map((category) => (
          <TabsTrigger key={category} value={category} className="font-bold">
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="All">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
        </div>
      </TabsContent>

      {categories.filter(c => c !== "All").map((category) => (
        <TabsContent key={category} value={category}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
