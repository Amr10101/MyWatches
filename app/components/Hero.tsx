'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { WATCHES } from '../../data/watches'
import { Watch } from '../../types/types';

interface HeroProps {
    onAddToCart: (watch: Watch, variantId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
    const featured = WATCHES[0]; // Aether Noir
    const [selectedVariant, setSelectedVariant] = useState(featured.variants[0]);

    const scrollToCollection = () => {
        document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="pt-[57px]"> {/* offset for fixed header */}
            {/* ── TOP SPLIT: Text left / Image right ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[92vh]">

                {/* ── LEFT PANEL — solid background, perfect readability ── */}
                <div
                    className="flex flex-col justify-between px-8 md:px-16 lg:px-20 py-16 lg:py-20"
                    style={{ background: 'var(--ink-2)' }}
                >
                    {/* Edition badge */}
                    <div className="anim-1">
                        <div className="inline-flex items-center gap-3 border border-[var(--gold-dim)] px-4 py-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--gold)]">
                                {featured.edition}
                            </span>
                        </div>
                    </div>

                    {/* Main headline */}
                    <div className="my-auto py-12">
                        <div className="anim-2">
                            <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--cream-dim)] block mb-5">
                                {featured.collection} Collection
                            </span>
                        </div>

                        <h1 className="anim-3 font-display leading-[0.92] mb-6">
                            <span className="block text-[clamp(64px,8vw,110px)] font-light text-[var(--cream)] tracking-[-0.02em]">
                                {featured.name.split(' ')[0]}
                            </span>
                            <span className="block text-[clamp(64px,8vw,110px)] font-light italic text-[var(--gold)] tracking-[-0.02em]">
                                {featured.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>

                        <p className="anim-4 font-sans text-[15px] font-light leading-[1.85] text-[var(--cream-2)] max-w-[420px] mb-10" style={{ fontStyle: 'italic' }}>
                            "{featured.tagline}"
                        </p>

                        {/* Key specs — mono tabular */}
                        <div className="anim-4 border-t border-[var(--border)] pt-8 mb-10 grid grid-cols-2 gap-x-8 gap-y-0 max-w-[380px]">
                            {[
                                ['Movement', featured.movement.split(' · ')[0]],
                                ['Reserve', featured.powerReserve],
                                ['Diameter', featured.caseDiameter],
                                ['Rating', featured.waterResistance],
                            ].map(([k, v]) => (
                                <div key={k} className="spec-row">
                                    <span className="spec-key">{k}</span>
                                    <span className="spec-val">{v}</span>
                                </div>
                            ))}
                        </div>

                        {/* Variant selector */}
                        <div className="anim-5 mb-8">
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream-dim)] block mb-3">
                                Select configuration
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {featured.variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`px-4 py-2.5 border font-mono text-[10px] tracking-[0.12em] transition-all duration-200 ${selectedVariant.id === v.id
                                            ? 'border-[var(--gold)] bg-[var(--gold-faint)] text-[var(--gold)]'
                                            : 'border-[var(--border-2)] text-[var(--cream-dim)] hover:border-[var(--cream-dim)]'
                                            }`}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pricing + CTA */}
                        <div className="anim-6 flex items-center gap-5">
                            <div>
                                {selectedVariant.originalPrice && (
                                    <span className="font-mono text-[12px] text-[var(--cream-faint)] line-through block leading-none mb-1">
                                        ${selectedVariant.originalPrice.toLocaleString()}
                                    </span>
                                )}
                                <span className="font-display text-[40px] font-light text-[var(--cream)] leading-none">
                                    ${selectedVariant.price.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onAddToCart(featured, selectedVariant.id)}
                                    className="btn-acquire px-8 py-4 flex items-center gap-2.5"
                                >
                                    Acquire <ArrowRight size={13} />
                                </button>
                                <button
                                    onClick={scrollToCollection}
                                    className="btn-ghost px-6 py-4 flex items-center gap-2"
                                >
                                    Explore all <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom — quick nav to other pieces */}
                    <div className="anim-6 flex items-center gap-6 border-t border-[var(--border)] pt-7">
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream-faint)]">
                            Also in collection
                        </span>
                        {WATCHES.slice(1).map((w) => (
                            <button
                                key={w.id}
                                className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--cream-dim)] hover:text-[var(--gold)] transition-colors"
                            >
                                {w.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT PANEL — pure photography, no text to fight with ── */}
                <div className="img-zoom relative min-h-[500px] lg:min-h-0 bg-[var(--ink)]">
                    <img
                        src={featured.heroImage}
                        alt={featured.name}
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle dark vignette on the left edge only — blends into the text panel */}
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--ink-2)] to-transparent pointer-events-none" />

                    {/* Floating serial indicator — photography side only, small and decorative */}
                    <div className="absolute top-8 right-8 flex flex-col items-end gap-1">
                        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">
                            Serial No.
                        </span>
                        <span className="font-mono text-[11px] text-white/20 tracking-[0.15em]">
                            MW-AN-2024-001
                        </span>
                    </div>

                    {/* Vertical text label on right edge */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 pr-4">
                        <div className="w-px h-16 bg-white/10" />
                        <span
                            className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/20"
                            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
                        >
                            Geneva · 2024
                        </span>
                        <div className="w-px h-16 bg-white/10" />
                    </div>
                </div>
            </div>

            {/* ── BELOW HERO — narrow spec strip for at-a-glance data ── */}
            <div
                className="border-t border-b border-[var(--border)] py-0"
                style={{ background: 'var(--ink-3)' }}
            >
                <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
                    {[
                        { label: 'Movement', value: 'In-house Calibre MW-01' },
                        { label: 'Power Reserve', value: '72 Hours' },
                        { label: 'Accuracy', value: '±3 sec / day' },
                        { label: 'Water Rating', value: '100 m · 10 ATM' },
                    ].map(({ label, value }, i) => (
                        <div
                            key={label}
                            className={`px-8 py-6 ${i < 3 ? 'border-r border-[var(--border)]' : ''}`}
                        >
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream-faint)] block mb-1.5">
                                {label}
                            </span>
                            <span className="font-mono text-[12px] tracking-[0.06em] text-[var(--cream-2)]">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;