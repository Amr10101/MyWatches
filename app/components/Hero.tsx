'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { WATCHES } from '../../data/watches';
import { Watch } from '../../types/types';

interface HeroProps {
    onAddToCart: (watch: Watch, variantId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
    const w = WATCHES[0];
    const [variant, setVariant] = useState(w.variants[0]);

    return (
        <section className="pt-[68px]">
            {/*
        ── VISUAL-FIRST HERO ──
        Full-height left panel = pure photography, no text competing
        Right panel = product info on clean cream surface
        Result: image is the emotion, text is the information
      */}
            <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] min-h-[96vh]">

                {/* ── IMAGE — dominates ── */}
                <div
                    className="img-reveal relative min-h-[60vh] lg:min-h-0 overflow-hidden"
                    style={{ background: 'var(--cream-3)' }}
                >
                    <img
                        src={w.heroImage}
                        alt={w.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                    />
                    {/* Very subtle gradient at bottom blending to cream */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(228,221,210,0.6), transparent)' }}
                    />

                    {/* Edition float — top-left, white card on image */}
                    <div className="h1 absolute top-8 left-8">
                        <div
                            className="inline-flex items-center gap-2.5 px-4 py-2"
                            style={{ background: 'rgba(253,251,248,0.88)', backdropFilter: 'blur(12px)' }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                            <span className="font-ui text-[11px] font-medium" style={{ color: 'var(--ink)', letterSpacing: '0.04em' }}>
                                {w.edition}
                            </span>
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <div className="h6 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden">
                        <span className="font-ui text-[11px]" style={{ color: 'var(--subtle)' }}>Scroll</span>
                        <ChevronDown size={14} strokeWidth={1.5} style={{ color: 'var(--subtle)' }} className="animate-bounce" />
                    </div>
                </div>

                {/* ── PRODUCT INFO — cream surface, perfectly readable ── */}
                <div
                    className="flex flex-col justify-center px-10 md:px-14 lg:px-16 py-16"
                    style={{ background: 'var(--cream)' }}
                >
                    {/* Collection label */}
                    <p className="h1 font-ui text-[12px] font-medium mb-6" style={{ color: 'var(--subtle)', letterSpacing: '0.06em' }}>
                        {w.collection} Collection
                    </p>

                    {/* Name — large Cormorant, ink on cream */}
                    <h1 className="h2 font-serif leading-[0.9] mb-5">
                        <span className="block" style={{ fontSize: 'clamp(56px,7vw,96px)', fontWeight: 300, color: 'var(--ink)' }}>
                            {w.name.split(' ')[0]}
                        </span>
                        {/* Gold only for this 96px+ italic accent — 7:1 contrast on cream */}
                        <span className="block italic" style={{ fontSize: 'clamp(56px,7vw,96px)', fontWeight: 300, color: 'var(--gold)' }}>
                            {w.name.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>

                    {/* Tagline — body text, comfortable size */}
                    <p className="h3 font-ui text-[15px] leading-[1.75] mb-8" style={{ color: 'var(--body)', maxWidth: '360px' }}>
                        {w.tagline}
                    </p>

                    {/* 4 key specs — clean grid, Outfit 14px labels + values */}
                    <div className="h4 grid grid-cols-2 gap-0 mb-8" style={{ borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)' }}>
                        {[
                            ['Movement', w.movement.split(' · ')[0]],
                            ['Power reserve', w.powerReserve],
                            ['Case', w.caseDiameter],
                            ['Water rating', w.waterResistance],
                        ].map(([label, value]) => (
                            <div
                                key={label}
                                className="px-4 py-3.5"
                                style={{ borderRight: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
                            >
                                {/* Label — Outfit 11px, subtle — NOT uppercase, NOT over-spaced */}
                                <p className="font-ui text-[11px] mb-1" style={{ color: 'var(--subtle)' }}>{label}</p>
                                {/* Value — Outfit 14px, ink — clear and readable */}
                                <p className="font-ui text-[14px] font-medium" style={{ color: 'var(--ink)' }}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Variant selector */}
                    <div className="h5 mb-8">
                        <p className="font-ui text-[11px] mb-3" style={{ color: 'var(--subtle)' }}>Configuration</p>
                        <div className="flex flex-wrap gap-2">
                            {w.variants.map((v) => {
                                const active = variant.id === v.id;
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setVariant(v)}
                                        className="px-4 py-2.5 font-ui text-[13px] font-medium transition-all duration-200"
                                        style={{
                                            border: `1.5px solid ${active ? 'var(--forest)' : 'var(--line-2)'}`,
                                            background: active ? 'var(--forest)' : 'transparent',
                                            color: active ? 'var(--white)' : 'var(--body)',
                                        }}
                                    >
                                        {v.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="h6 flex items-center gap-5 flex-wrap">
                        <div>
                            {variant.originalPrice && (
                                <p className="font-ui text-[13px] line-through" style={{ color: 'var(--faint)' }}>
                                    ${variant.originalPrice.toLocaleString()}
                                </p>
                            )}
                            {/* Price — large Cormorant, ink — unmissable */}
                            <p className="price" style={{ fontSize: 'clamp(40px,4vw,54px)' }}>
                                ${variant.price.toLocaleString()}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => onAddToCart(w, variant.id)}
                                className="btn-cta px-7 py-3.5"
                            >
                                Acquire <ArrowRight size={14} strokeWidth={1.5} />
                            </button>
                            <button
                                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-outline px-5 py-3.5"
                            >
                                View all
                            </button>
                        </div>
                    </div>

                    {/* Other watches — small links */}
                    <div className="mt-8 pt-6 flex items-center gap-5 flex-wrap" style={{ borderTop: '1px solid var(--line)' }}>
                        <span className="font-ui text-[11px]" style={{ color: 'var(--faint)' }}>Also in collection</span>
                        {WATCHES.slice(1).map((w2) => (
                            <button
                                key={w2.id}
                                className="font-ui text-[12px] transition-colors"
                                style={{ color: 'var(--subtle)' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                            >
                                {w2.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Spec strip — cream-2, readable Outfit ── */}
            <div style={{ background: 'var(--cream-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
                <div className="max-w-[1380px] mx-auto grid grid-cols-2 md:grid-cols-4">
                    {[
                        { label: 'In-house movement', value: 'Calibre MW-01' },
                        { label: 'Power reserve', value: '72 hours' },
                        { label: 'Accuracy', value: '±3 sec / day' },
                        { label: 'Water resistance', value: '100 m' },
                    ].map(({ label, value }, i) => (
                        <div
                            key={label}
                            className="px-8 py-5"
                            style={{ borderRight: i < 3 ? '1px solid var(--line)' : 'none' }}
                        >
                            {/* Outfit 12px label — NOT uppercase, normal spacing */}
                            <p className="font-ui text-[12px] mb-1" style={{ color: 'var(--subtle)' }}>{label}</p>
                            {/* Outfit 15px medium value — clear, dark */}
                            <p className="font-ui text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;