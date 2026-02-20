'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { WATCHES } from '../../data/watches';
import { Watch } from '../../types/types';

interface HeroProps {
    onAddToCart: (watch: Watch, variantId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
    const featured = WATCHES[0];
    const [selectedVariant, setSelectedVariant] = useState(featured.variants[0]);

    return (
        <section className="pt-[57px]">
            {/*
        SPLIT LAYOUT — Solves every readability problem structurally:
        Left = solid dark panel → text is ALWAYS readable, no contest with photography
        Right = pure photography → image shown at full quality with nothing on top
      */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[92vh]">

                {/* ── LEFT: solid panel, all text ── */}
                <div
                    className="flex flex-col justify-between px-8 md:px-16 lg:px-20 py-16 lg:py-20"
                    style={{ background: 'var(--ink-2)' }}
                >
                    {/* Edition badge — gold text is large enough + spaced enough here */}
                    <div className="anim-1">
                        <div
                            className="inline-flex items-center gap-3 px-4 py-2"
                            style={{ border: '1px solid var(--gold-lo)' }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                            <span
                                className="font-mono text-[9px] tracking-[0.35em] uppercase"
                                style={{ color: 'var(--gold)' }}
                            >
                                {featured.edition}
                            </span>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="my-auto py-10">
                        {/* Collection label — white-3 (6:1 contrast, AA compliant) */}
                        <p className="anim-2 font-mono text-[10px] tracking-[0.35em] uppercase mb-5" style={{ color: 'var(--w3)' }}>
                            {featured.collection} Collection
                        </p>

                        {/* Headline — gold ONLY on large text (72px+) where 7:1 contrast is comfortable */}
                        <h1 className="anim-3 font-display leading-[0.90] mb-6">
                            <span
                                className="block tracking-[-0.02em]"
                                style={{ fontSize: 'clamp(64px,8vw,112px)', color: 'var(--w1)', fontWeight: 300 }}
                            >
                                {featured.name.split(' ')[0]}
                            </span>
                            <span
                                className="block italic tracking-[-0.02em]"
                                style={{ fontSize: 'clamp(64px,8vw,112px)', color: 'var(--gold)', fontWeight: 300 }}
                            >
                                {featured.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>

                        {/* Tagline — white-2 (10:1 contrast) italic body */}
                        <p
                            className="anim-4 font-sans text-[15px] font-light leading-[1.85] max-w-[420px] mb-10 italic"
                            style={{ color: 'var(--w2)' }}
                        >
                            "{featured.tagline}"
                        </p>

                        {/* Spec table — w3 labels (6:1), w1 values (18:1) */}
                        <div
                            className="anim-4 grid grid-cols-2 gap-x-8 max-w-[380px] mb-10 pt-8"
                            style={{ borderTop: '1px solid var(--b1)' }}
                        >
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
                            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--w3)' }}>
                                Select configuration
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {featured.variants.map((v) => {
                                    const active = selectedVariant.id === v.id;
                                    return (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            className="px-4 py-2.5 font-mono text-[10px] tracking-[0.12em] transition-all duration-200"
                                            style={{
                                                border: `1px solid ${active ? 'var(--gold)' : 'var(--b2)'}`,
                                                background: active ? 'var(--gold-bg)' : 'transparent',
                                                color: active ? 'var(--gold)' : 'var(--w2)',
                                            }}
                                        >
                                            {v.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="anim-6 flex items-center gap-5 flex-wrap">
                            <div>
                                {selectedVariant.originalPrice && (
                                    <span
                                        className="font-mono text-[12px] block leading-none mb-1"
                                        style={{ color: 'var(--w4)', textDecoration: 'line-through' }}
                                    >
                                        ${selectedVariant.originalPrice.toLocaleString()}
                                    </span>
                                )}
                                {/* Price — very large, full white, unmissable */}
                                <span
                                    className="font-display font-light leading-none"
                                    style={{ fontSize: 'clamp(36px,4vw,54px)', color: 'var(--w1)' }}
                                >
                                    ${selectedVariant.price.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => onAddToCart(featured, selectedVariant.id)}
                                    className="btn-primary flex items-center gap-2.5"
                                >
                                    Acquire <ArrowRight size={13} />
                                </button>
                                <button
                                    onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="btn-ghost flex items-center gap-2"
                                >
                                    Explore all <ChevronRight size={12} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom strip */}
                    <div className="anim-6 flex items-center gap-6 pt-7" style={{ borderTop: '1px solid var(--b1)' }}>
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--w4)' }}>
                            Also available
                        </span>
                        {WATCHES.slice(1).map((w) => (
                            <button
                                key={w.id}
                                className="font-mono text-[9px] tracking-[0.15em] uppercase transition-colors"
                                style={{ color: 'var(--w3)' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w1)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; }}
                            >
                                {w.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: pure photography, nothing on top of the image ── */}
                <div
                    className="img-zoom relative min-h-[500px] lg:min-h-0"
                    style={{ background: 'var(--ink-3)' }}
                >
                    <img
                        src={featured.heroImage}
                        alt={featured.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center center' }}
                    />
                    {/* Left edge gradient blends into text panel */}
                    <div
                        className="absolute inset-y-0 left-0 w-20 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, var(--ink-2), transparent)' }}
                    />
                    {/* Decorative serial — very faint, right corner, decorative only */}
                    <div className="absolute top-7 right-7 text-right hidden md:block">
                        <span
                            className="font-mono text-[8px] tracking-[0.3em] uppercase block"
                            style={{ color: 'rgba(247,244,239,0.18)' }}
                        >
                            Serial No.
                        </span>
                        <span
                            className="font-mono text-[11px] tracking-[0.12em]"
                            style={{ color: 'rgba(247,244,239,0.12)' }}
                        >
                            MW-AN-2024-001
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Spec strip below fold ── */}
            <div style={{ background: 'var(--ink-3)', borderTop: '1px solid var(--b1)', borderBottom: '1px solid var(--b1)' }}>
                <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
                    {[
                        ['Movement', 'In-house Calibre MW-01'],
                        ['Power reserve', '72 Hours'],
                        ['Accuracy', '±3 sec / day'],
                        ['Water rating', '100 m · 10 ATM'],
                    ].map(([label, value], i) => (
                        <div
                            key={label}
                            className="px-8 py-6"
                            style={{ borderRight: i < 3 ? '1px solid var(--b1)' : 'none' }}
                        >
                            <span
                                className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-1.5"
                                style={{ color: 'var(--w3)' }}
                            >
                                {label}
                            </span>
                            {/* Value in full w1 — clear white */}
                            <span className="font-mono text-[13px] tracking-[0.06em]" style={{ color: 'var(--w1)' }}>
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