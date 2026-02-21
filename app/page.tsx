'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CollectionGrid from './components/CollectionGrid';
import StorySection from './components/StorySection';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartItem, Watch } from './../types/types';
import { WATCHES } from '../data/watches';

export default function MyWatchesPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (watch: Watch, variantId: string) => {
    const variant = watch.variants.find((v) => v.id === variantId);
    if (!variant) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.variantId === variantId);
      if (existing) return prev.map((i) => i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { variantId, watchId: watch.id, quantity: 1, watch, selectedVariant: variant }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (variantId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => i.variantId === variantId ? { ...i, quantity: i.quantity + delta } : i)
        .filter((i) => i.quantity > 0)
    );
  };

  const cartCount = cartItems.reduce((a, i) => a + i.quantity, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero onAddToCart={handleAddToCart} />
        <CollectionGrid onAddToCart={handleAddToCart} />
        <StorySection />
      </main>
      <Footer />
      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={(id) => setCartItems((p) => p.filter((i) => i.variantId !== id))}
      />
    </div>
  );
}