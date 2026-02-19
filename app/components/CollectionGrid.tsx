'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import FadeIn from './FadeIn';
import { WATCHES } from '../../data/watches';
import { Watch, WatchVariant } from '../../types/types';

interface CollectionGridProps {
    onAddToCart: (watch: Watch, variantId: string) => void;
}

/* ─── Single watch card ─────────────────────────────────────── */
const WatchCard: React.FC<{
    watch: Watch;
    onAddToCart: (watch: Watch, variantId: string) => void;
    delay: string;
    featured?: boolean;
}> = ({ watch, onAddToCart, delay, featured }) => {
    const [selectedVariant, setSelectedVariant] = useState<WatchVariant>(watch.variants[0]);
    const [added, setAdded] = useState(false);
    const [specsOpen, setSpecsOpen] = useState(false);

    const handleAdd = () => {
        onAddToCart(watch, selectedVariant.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <FadeIn delay={delay} className="flex flex-col">
            <div
                className="watch-card flex flex-col h-full"
                style={{ background: 'var(--ink-2)', border: '1px solid var(--border)' }}
            >
                {/* Image */}
                <div className="img-zoom relative overflow-hidden" style={{ height: featured ? 420 : 300 }}>
                    <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full h-full object-cover brightness-80"
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--ink-2) 100%)' }}
                    />
                    {/* Edition badge */}
                    {watch.edition && (
                        <div
                            className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 border"
                            style={{
                                borderColor: watch.accentHex,
                                background: `${watch.accentHex}18`,
                            }}
                        >
                            <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: watch.accentHex }}
                            />
                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: watch.accentHex }}>
                                {watch.edition}
                            </span>
                        </div>
                    )}
                    {/* Collection label */}
                    <div className="absolute bottom-5 left-5">
                        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[var(--cream-faint)] block">
                            {watch.collection} Collection
                        </span>
                    </div>
                </div>

                {/* Content — all on solid panel, guaranteed readable */}
                <div className="flex flex-col flex-1 p-7">
                    {/* Name */}
                    <div className="mb-5">
                        <h3 className="font-display text-[28px] font-light text-[var(--cream)] leading-tight">
                            {watch.name}
                        </h3>
                        <p className="font-sans text-[12px] font-light italic text-[var(--cream-dim)] mt-1">
                            {watch.tagline}
                        </p>
                    </div>

                    {/* Mini spec table */}
                    <div className="border-t border-b border-[var(--border)] py-4 mb-5 grid grid-cols-2 gap-0">
                        {[
                            ['Case', watch.caseDiameter],
                            ['Reserve', watch.powerReserve],
                            ['Movement', watch.caseMaterial.split(' ')[0]],
                            ['Depth', watch.waterResistance],
                        ].map(([k, v]) => (
                            <div key={k} className="spec-row pr-4">
                                <span className="spec-key">{k}</span>
                                <span className="spec-val text-[10px]">{v}</span>
                            </div>
                        ))}
                    </div>

                    {/* Full specs accordion */}
                    <div className="mb-5">
                        <button
                            onClick={() => setSpecsOpen(!specsOpen)}
                            className="w-full flex justify-between items-center py-2"
                        >
                            <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--cream-dim)]">
                                Full specifications
                            </span>
                            <span className="font-mono text-[14px] text-[var(--cream-faint)] leading-none">
                                {specsOpen ? '−' : '+'}
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-500 ${specsOpen ? 'max-h-80' : 'max-h-0'
                                }`}
                        >
                            <div className="pt-3 space-y-0">
                                {Object.entries(watch.specs).map(([k, v]) => (
                                    <div key={k} className="spec-row">
                                        <span className="spec-key">{k}</span>
                                        <span className="spec-val">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Variant selector */}
                    <div className="mb-5">
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream-faint)] block mb-2.5">
                            Configuration — <span style={{ color: watch.accentHex }}>{selectedVariant.name}</span>
                        </span>
                        <div className="flex flex-col gap-1.5">
                            {watch.variants.map((v) => {
                                const active = selectedVariant.id === v.id;
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariant(v)}
                                        className="flex justify-between items-center px-4 py-3 border font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-200"
                                        style={{
                                            borderColor: active ? watch.accentHex : 'var(--border-2)',
                                            background: active ? `${watch.accentHex}14` : 'transparent',
                                            color: active ? watch.accentHex : 'var(--cream-dim)',
                                        }}
                                    >
                                        <span>{v.name}</span>
                                        <div className="flex items-center gap-3">
                                            {v.originalPrice && (
                                                <span className="line-through text-[var(--cream-faint)] text-[9px]">
                                                    ${v.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                            <span className="font-display text-[15px] font-light" style={{ color: active ? watch.accentHex : 'var(--cream-2)', fontFamily: 'Bodoni Moda, serif' }}>
                                                ${v.price.toLocaleString()}
                                            </span>
                                            {active && <Check size={12} strokeWidth={2.5} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA row */}
                    <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-6">
                        <div>
                            <span className="font-display text-[32px] font-light text-[var(--cream)] leading-none">
                                ${selectedVariant.price.toLocaleString()}
                            </span>
                            <span className="font-mono text-[9px] tracking-[0.15em] text-[var(--cream-faint)] block mt-1">
                                {selectedVariant.bracelet}
                            </span>
                        </div>
                        <button
                            onClick={handleAdd}
                            className={`btn-acquire px-6 py-3.5 flex items-center gap-2 ${added ? '!bg-emerald-700' : ''
                                }`}
                        >
                            {added
                                ? <><Check size={12} /> Added</>
                                : <>Acquire <ArrowRight size={12} /></>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

/* ─── Main CollectionGrid ───────────────────────────────────── */
const CollectionGrid: React.FC<CollectionGridProps> = ({ onAddToCart }) => (
    <section id="collection" className="py-28 md:py-36" style={{ background: 'var(--ink-3)' }}>
        <div className="max-w-[1440px] mx-auto px-8">
            {/* Header */}
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-[var(--border)] pb-12">
                    <div>
                        <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[var(--gold)] block mb-5">
                            The Collection
                        </span>
                        <h2 className="font-display text-[clamp(38px,4.5vw,66px)] font-light leading-[0.95] text-[var(--cream)]">
                            Four references.
                            <br />
                            <em className="italic text-gold-shimmer">No compromises.</em>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 border border-[var(--border)] px-5 py-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-gold-pulse" />
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--cream-dim)]">
                            Current availability · 2024
                        </span>
                    </div>
                </div>
            </FadeIn>

            {/* Featured + 3 grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <WatchCard watch={WATCHES[0]} onAddToCart={onAddToCart} delay="0s" featured />
                <WatchCard watch={WATCHES[3]} onAddToCart={onAddToCart} delay="0.1s" featured />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WatchCard watch={WATCHES[1]} onAddToCart={onAddToCart} delay="0s" />
                <WatchCard watch={WATCHES[2]} onAddToCart={onAddToCart} delay="0.1s" />
            </div>

            {/* Bottom info strip */}
            <FadeIn>
                <div
                    className="mt-12 p-8 border border-[var(--border)]"
                    style={{ background: 'var(--ink)' }}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="font-mono text-[11px] tracking-[0.15em] text-[var(--cream-2)] mb-1">
                                All references include: lifetime movement service, 5-year warranty, and a certificate of authenticity signed by the watchmaker.
                            </p>
                            <p className="font-mono text-[10px] tracking-[0.1em] text-[var(--cream-faint)]">
                                Delivery in 4–6 weeks. Fully insured worldwide shipping. 30-day return window.
                            </p>
                        </div>
                        <div className="flex gap-4 flex-shrink-0">
                            <a href="#" className="btn-ghost px-6 py-3.5 text-[10px]">
                                Download lookbook
                            </a>
                            <a href="#" className="btn-ghost px-6 py-3.5 text-[10px]">
                                Book a consultation
                            </a>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
);

export default CollectionGrid;