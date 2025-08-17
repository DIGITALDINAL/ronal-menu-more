"use server";

import { menuItems } from "@/lib/menu";
import type { Order } from "@/lib/types";

// This is a simulated AI suggestion function.
// In a real application, this would call a GenAI model.
export async function getAiSuggestions(orderHistory: Order[]) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If there's no order history, return some popular items.
    if (orderHistory.length === 0) {
        return menuItems.filter(item => [4, 7, 12].includes(item.id));
    }

    // Simple logic: find items that haven't been ordered yet.
    const orderedItemIds = new Set(orderHistory.flatMap(order => order.items.map(item => item.id)));
    const notOrderedItems = menuItems.filter(item => !orderedItemIds.has(item.id));

    // Return up to 3 random non-ordered items
    if (notOrderedItems.length <= 3) {
        return notOrderedItems;
    }

    const suggestions = [];
    const availableItems = [...notOrderedItems];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableItems.length);
        suggestions.push(availableItems.splice(randomIndex, 1)[0]);
    }

    return suggestions;
}
