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
    large?: boolean;
}> = ({ watch, onAddToCart, delay, large }) => {
    const [selected, setSelected] = useState<WatchVariant>(watch.variants[0]);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart(watch, selected.id);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <FadeIn delay={delay} className="h-full">
            <div
                className="watch-card-hover flex flex-col h-full"
                style={{ background: 'var(--white)', border: '1px solid var(--line)' }}
            >
                {/* ── Image — takes up most of the visual space ── */}
                <div
                    className="img-reveal relative overflow-hidden"
                    style={{ height: large ? '420px' : '320px', background: 'var(--cream-2)', flexShrink: 0 }}
                >
                    <img
                        src={watch.image}
                        alt={watch.name}
                        className="w-full h-full object-cover"
                    />
                    {/* Edition badge on image — white card so always readable */}
                    {watch.edition && (
                        <div className="absolute top-4 left-4">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1.5"
                                style={{ background: 'rgba(253,251,248,0.9)', backdropFilter: 'blur(8px)' }}
                            >
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                                <span className="font-ui text-[10px] font-medium" style={{ color: 'var(--ink)', letterSpacing: '0.03em' }}>
                                    {watch.edition}
                                </span>
                            </div>
                        </div>
                    )}
                    {/* Collection label bottom */}
                    <div
                        className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(247,243,236,0.9), transparent)' }}
                    >
                        <p className="font-ui text-[11px] font-medium" style={{ color: 'var(--subtle)' }}>
                            {watch.collection}
                        </p>
                    </div>
                </div>

                {/* ── Info — white surface, clean and readable ── */}
                <div className="flex flex-col flex-1 p-6">
                    {/* Name + tagline */}
                    <div className="mb-5">
                        <h3
                            className="font-serif font-medium leading-tight mb-1"
                            style={{ fontSize: '26px', color: 'var(--ink)' }}
                        >
                            {watch.name}
                        </h3>
                        <p className="font-ui text-[13px]" style={{ color: 'var(--subtle)', lineHeight: '1.6' }}>
                            {watch.tagline}
                        </p>
                    </div>

                    {/* 4 key specs — clean, readable */}
                    <div className="mb-5 space-y-1" style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                        {[
                            [watch.caseDiameter, 'Case diameter'],
                            [watch.powerReserve, 'Power reserve'],
                            [watch.waterResistance, 'Water resistance'],
                            [watch.caseMaterial, 'Material'],
                        ].map(([val, key]) => (
                            <div key={key} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: '1px solid var(--line)' }}>
                                <span className="font-ui text-[12px]" style={{ color: 'var(--subtle)' }}>{key}</span>
                                <span className="font-ui text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Variant selector */}
                    <div className="mb-5">
                        <p className="font-ui text-[11px] mb-2.5" style={{ color: 'var(--subtle)' }}>
                            Configuration — <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{selected.name}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {watch.variants.map((v) => {
                                const active = selected.id === v.id;
                                return (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelected(v)}
                                        className="px-3.5 py-2 font-ui text-[11px] font-medium transition-all duration-200"
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
                    <div className="mt-auto flex items-center justify-between pt-5" style={{ borderTop: '1px solid var(--line)' }}>
                        <div>
                            {selected.originalPrice && (
                                <p className="font-ui text-[12px] line-through" style={{ color: 'var(--faint)' }}>
                                    ${selected.originalPrice.toLocaleString()}
                                </p>
                            )}
                            <p className="price" style={{ fontSize: '30px' }}>
                                ${selected.price.toLocaleString()}
                            </p>
                        </div>
                        <button onClick={handleAdd} className="btn-cta px-5 py-3">
                            {added
                                ? <><Check size={13} /> Added</>
                                : <>Acquire <ArrowRight size={13} /></>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

const CollectionGrid: React.FC<CollectionGridProps> = ({ onAddToCart }) => (
    <section id="collection" className="py-24 md:py-32 px-8" style={{ background: 'var(--cream-2)' }}>
        <div className="max-w-[1380px] mx-auto">

            {/* Header */}
            <FadeIn>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-10" style={{ borderBottom: '1px solid var(--line)' }}>
                    <div>
                        <p className="font-ui text-[12px] font-medium mb-4" style={{ color: 'var(--subtle)', letterSpacing: '0.06em' }}>
                            The Collection
                        </p>
                        <h2 className="font-serif font-light leading-[0.95]" style={{ fontSize: 'clamp(36px,4.5vw,64px)', color: 'var(--ink)' }}>
                            Four references.
                            <br />
                            <em className="italic" style={{ color: 'var(--gold)' }}>No compromise.</em>
                        </h2>
                    </div>
                    <p className="font-ui text-[14px] mt-6 md:mt-0 max-w-[320px]" style={{ color: 'var(--body)', lineHeight: '1.75' }}>
                        Each reference is produced once a year. When the parts run out, the edition closes. There is no restock.
                    </p>
                </div>
            </FadeIn>

            {/* 2-column top row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
                <WatchCard watch={WATCHES[0]} onAddToCart={onAddToCart} delay="0s" large />
                <WatchCard watch={WATCHES[3]} onAddToCart={onAddToCart} delay="0.1s" large />
            </div>

            {/* 2-column bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <WatchCard watch={WATCHES[1]} onAddToCart={onAddToCart} delay="0s" />
                <WatchCard watch={WATCHES[2]} onAddToCart={onAddToCart} delay="0.1s" />
            </div>

            {/* Trust strip */}
            <FadeIn>
                <div
                    className="mt-10 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                    style={{ background: 'var(--white)', border: '1px solid var(--line)' }}
                >
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                        {[
                            ['Lifetime service', "Every movement we've made"],
                            ['5-year warranty', 'On all references'],
                            ['30-day returns', 'No questions asked'],
                            ['Insured worldwide', 'Delivery in 4–6 weeks'],
                        ].map(([title, sub]) => (
                            <div key={title}>
                                <p className="font-ui text-[13px] font-semibold" style={{ color: 'var(--ink)' }}>{title}</p>
                                <p className="font-ui text-[12px]" style={{ color: 'var(--subtle)' }}>{sub}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                        <button className="btn-outline px-5 py-2.5 text-[12px]">Download lookbook</button>
                        <button className="btn-outline px-5 py-2.5 text-[12px]">Book a consultation</button>
                    </div>
                </div>
            </FadeIn>
        </div>
    </section>
);

export default CollectionGrid;