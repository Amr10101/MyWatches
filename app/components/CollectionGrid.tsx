'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import FadeIn from './FadeIn';
import { WATCHES } from '../../data/watches';
import { Watch, WatchVariant } from '../../types/types';

interface CollectionGridProps {
    onAddToCart: (watch: Watch, variantId: string) => void;
}

const WatchCard: React.FC<{
    watch: Watch;
    onAddToCart: (watch: Watch, variantId: string) => void;
    delay: string;
    tall?: boolean;
}> = ({ watch, onAddToCart, delay, tall }) => {
    const [selected, setSelected] = useState<WatchVariant>(watch.variants[0]);
    const [added, setAdded] = useState(false);
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        onAddToCart(watch, selected.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <FadeIn delay={delay} className="flex flex-col h-full">
            <div
                className="watch-card flex flex-col h-full"
                style={{ background: 'var(--ink-2)', border: '1px solid var(--b1)' }}
            >
                {/* Image */}
                <div
                    className="img-zoom relative overflow-hidden"
                    style={{ height: tall ? 400 : 300, background: 'var(--ink-3)' }}
                >
                    <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--ink-2) 100%)' }}
                    />
                    {watch.edition && (
                        <div
                            className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5"
                            style={{ border: `1px solid ${watch.accentHex}55`, background: `${watch.accentHex}18` }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: watch.accentHex }} />
                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: watch.accentHex }}>
                                {watch.edition}
                            </span>
                        </div>
                    )}
                    <div className="absolute bottom-4 left-5">
                        <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'var(--w3)' }}>
                            {watch.collection} Collection
                        </span>
                    </div>
                </div>

                {/* Content — solid panel, always readable */}
                <div className="flex flex-col flex-1 p-7">
                    {/* Name — w1 */}
                    <h3 className="font-display text-[26px] font-light leading-tight mb-1" style={{ color: 'var(--w1)' }}>
                        {watch.name}
                    </h3>
                    {/* Tagline — w2 italic */}
                    <p className="font-sans text-[12px] font-light italic mb-5" style={{ color: 'var(--w2)' }}>
                        {watch.tagline}
                    </p>

                    {/* Mini specs */}
                    <div className="mb-5" style={{ borderTop: '1px solid var(--b1)', borderBottom: '1px solid var(--b1)', paddingTop: '12px', paddingBottom: '12px' }}>
                        <div className="grid grid-cols-2 gap-0">
                            {[
                                ['Case', watch.caseDiameter],
                                ['Reserve', watch.powerReserve],
                                ['Material', watch.caseMaterial.split(' ')[0]],
                                ['Depth', watch.waterResistance],
                            ].map(([k, v]) => (
                                <div key={k} className="spec-row pr-3">
                                    <span className="spec-key">{k}</span>
                                    <span className="spec-val text-[10px]">{v}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full specs accordion */}
                    <div className="mb-5">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full flex justify-between items-center py-2 transition-colors"
                            style={{ color: 'var(--w3)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w1)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; }}
                        >
                            <span className="font-mono text-[9px] tracking-[0.28em] uppercase">Full specifications</span>
                            <span className="font-mono text-[16px] leading-none">{open ? '−' : '+'}</span>
                        </button>
                        <div
                            className="overflow-hidden transition-all duration-500"
                            style={{ maxHeight: open ? '400px' : '0px' }}
                        >
                            <div className="pt-3">
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
                        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2.5" style={{ color: 'var(--w3)' }}>
                            Configuration
                        </p>
                        <div className="flex flex-col gap-1.5">
                            {watch.variants.map((v) => {
                                const active = selected.id === v.id;
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelected(v)}
                                        className="flex justify-between items-center px-4 py-3 font-mono text-[10px] tracking-[0.1em] uppercase transition-all duration-200"
                                        style={{
                                            border: `1px solid ${active ? 'var(--gold)' : 'var(--b2)'}`,
                                            background: active ? 'var(--gold-bg)' : 'transparent',
                                            color: active ? 'var(--gold)' : 'var(--w2)',
                                        }}
                                    >
                                        <span>{v.name}</span>
                                        <div className="flex items-center gap-3">
                                            {v.originalPrice && (
                                                <span style={{ color: 'var(--w4)', textDecoration: 'line-through', fontSize: '9px' }}>
                                                    ${v.originalPrice.toLocaleString()}
                                                </span>
                                            )}
                                            <span
                                                className="font-display font-light"
                                                style={{ fontSize: '15px', color: active ? 'var(--gold)' : 'var(--w1)' }}
                                            >
                                                ${v.price.toLocaleString()}
                                            </span>
                                            {active && <Check size={12} strokeWidth={2.5} style={{ color: 'var(--gold)' }} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA row */}
                    <div className="mt-auto flex items-center justify-between pt-6" style={{ borderTop: '1px solid var(--b1)' }}>
                        <div>
                            <span className="font-display font-light leading-none" style={{ fontSize: '32px', color: 'var(--w1)' }}>
                                ${selected.price.toLocaleString()}
                            </span>
                            <span className="font-mono text-[9px] tracking-[0.1em] block mt-1" style={{ color: 'var(--w3)' }}>
                                {selected.bracelet}
                            </span>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="btn-primary flex items-center gap-2"
                        >
                            {added ? <><Check size={12} /> Added</> : <>Acquire <ArrowRight size={12} /></>}
                        </button>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

const CollectionGrid: React.FC<CollectionGridProps> = ({ onAddToCart }) => (
    <section id="collection" className="py-28 md:py-36 px-8" style={{ background: 'var(--ink-3)' }}>
        <div className="max-w-[1440px] mx-auto">

            {/* Header */}
            <FadeIn>
                <div
                    className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-12"
                    style={{ borderBottom: '1px solid var(--b1)' }}
                >
                    <div>
                        <span className="font-mono text-[9px] tracking-[0.38em] uppercase block mb-5" style={{ color: 'var(--w3)' }}>
                            The Collection
                        </span>
                        <h2 className="font-display font-light leading-[0.95]" style={{ fontSize: 'clamp(38px,4.5vw,66px)', color: 'var(--w1)' }}>
                            Four references.<br />
                            <em className="italic text-gold-shimmer">No compromises.</em>
                        </h2>
                    </div>
                    <div className="flex items-center gap-3 px-5 py-3" style={{ border: '1px solid var(--b1)' }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-dot" style={{ background: 'var(--gold)' }} />
                        <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: 'var(--w3)' }}>
                            Current availability · 2024
                        </span>
                    </div>
                </div>
            </FadeIn>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <WatchCard watch={WATCHES[0]} onAddToCart={onAddToCart} delay="0s" tall />
                <WatchCard watch={WATCHES[3]} onAddToCart={onAddToCart} delay="0.1s" tall />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <WatchCard watch={WATCHES[1]} onAddToCart={onAddToCart} delay="0s" />
                <WatchCard watch={WATCHES[2]} onAddToCart={onAddToCart} delay="0.1s" />
            </div>

            {/* Info strip */}
            <FadeIn>
                <div className="mt-12 p-8" style={{ border: '1px solid var(--b1)', background: 'var(--ink-2)' }}>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <p className="font-mono text-[11px] tracking-[0.12em] mb-2" style={{ color: 'var(--w2)' }}>
                                All references include: lifetime movement service, 5-year warranty, and a certificate of authenticity.
                            </p>
                            <p className="font-mono text-[10px] tracking-[0.08em]" style={{ color: 'var(--w3)' }}>
                                4–6 week delivery. Fully insured worldwide shipping. 30-day return window.
                            </p>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                            <a href="#" className="btn-ghost text-[10px]">Download lookbook</a>
                            <a href="#" className="btn-ghost text-[10px]">Book a consultation</a>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
);

export default CollectionGrid;