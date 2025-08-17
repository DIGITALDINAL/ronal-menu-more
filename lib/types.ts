export type Category = "Breakfast" | "Lunch" | "Dinner" | "Appetizers" | "Desserts" | "Drinks";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  aiHint: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: Date;
    tableNumber: string;
}
