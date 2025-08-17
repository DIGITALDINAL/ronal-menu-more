# Ronal's Menu & More

A modern, interactive restaurant menu web app built with Next.js, Tailwind CSS, and Firebase Hosting.

## 🌐 Web Preview

[https://ronal-menu-more.web.app](https://ronal-menu-more.web.app)

---

## ✨ Features

- **Categorized Menu Display:** Browse food and drinks by category (Breakfast, Lunch, Dinner, Appetizers, Desserts, Drinks).
- **Add to Cart:** Add items to a virtual shopping cart with quantity controls.
- **Order Summary:** View a clear order summary, including item quantities and total cost.
- **Simulated Order Placement:** Place orders (simulation only, no payment processing).
- **Order Confirmation:** See a confirmation page after placing an order.
- **Order History:** View your session-based order history.
- **AI Menu Suggestions:** Get menu suggestions based on your order history.
- **Responsive Design:** Mobile-friendly and accessible.
- **Modern UI:** Uses [Lobster](https://fonts.google.com/specimen/Lobster) and [Open Sans](https://fonts.google.com/specimen/Open+Sans) for a stylish look.

---

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Static Export)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) Primitives
- [Firebase Hosting](https://firebase.google.com/products/hosting)
- [Lucide Icons](https://lucide.dev/)

---

## 🛠️ Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   # or
   pnpm install
   ```

2. **Run locally:**

   ```sh
   npm run dev
   ```

3. **Build for static export:**

   ```sh
   npm run build
   npx next export
   ```

4. **Deploy to Firebase Hosting:**
   - Make sure you have the [Firebase CLI](https://firebase.google.com/docs/cli) installed and initialized.
   - Deploy with:
     ```sh
     firebase deploy
     ```

---

## 📁 Project Structure

- `src/app/` – Main app pages and layout
- `src/components/` – UI and feature components
- `src/lib/` – Menu data and utilities
- `src/context/` – React context providers (cart, table number, etc.)
- `public/` – Static assets
- `firebase.json` – Firebase Hosting configuration
- `next.config.ts` – Next.js configuration

---

## 🎨 Style Guide

- Warm orange and yellow tones for an inviting atmosphere
- Vibrant red-orange for call-to-action
- Grid-based layout with appetizing food photography
- Smooth scrolling and subtle animations

---

## 👨‍💻 Author

Ronal Aldinal

---

## 📄 License

MIT

---

> **Preview the app:** [https://ronal-menu-more.web.app](https://ronal-menu-more.web.app)
