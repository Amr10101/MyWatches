'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StorySection from './components/StorySection';
import CollectionGrid from './components/CollectionGrid';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartItem, Watch } from '../types/types';

export default function MyWatchesPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (watch: Watch, variantId: string) => {
    const variant = watch.variants.find((v) => v.id === variantId);
    if (!variant) return;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.variantId === variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { variantId, watchId: watch.id, quantity: 1, watch, selectedVariant: variant },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.variantId === variantId ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveItem = (variantId: string) => {
    setCartItems((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero onAddToCart={handleAddToCart} />
        <CollectionGrid onAddToCart={handleAddToCart} />
        <StorySection />
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}