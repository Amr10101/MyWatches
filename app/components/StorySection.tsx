'use client';

import React from 'react';
import FadeIn from './FadeIn';
import { STORY_CHAPTERS, TESTIMONIALS } from '../../data/watches';
import { StoryChapter } from '../../types/types';

/* ─── Marquee ─────────────────────────────────────────────── */
const MarqueeStrip: React.FC = () => {
    const items = [
        'In-house movements',
        'Le Locle atelier',
        'Life-time service',
        '±3s daily accuracy',
        'Grand Feu enamel',
        'Grade 5 titanium',
        'Limited editions',
        'No compromise',
    ];
    const doubled = [...items, ...items];
    return (
        <div
            className="overflow-hidden py-3.5 border-y border-[var(--border)]"
            style={{ background: 'var(--ink-3)' }}
        >
            <div className="animate-marquee">
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--cream-dim)] mr-0"
                    >
                        {item}
                        <span className="mx-10 text-[var(--gold-dim)] opacity-70">·</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ─── Chapter Text Left ───────────────────────────────────── */
const ChapterTextLeft: React.FC<{ chapter: StoryChapter }> = ({ chapter }) => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[640px]">
        {/* Solid text panel */}
        <FadeIn from="left" className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-32 relative" style={{ background: 'var(--panel)' } as React.CSSProperties}>
            {/* Ghost chapter number */}
            <div className="chapter-ghost absolute right-4 bottom-0 select-none pointer-events-none">
                {chapter.roman}
            </div>

            <div className="relative z-10 max-w-[540px]">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-4 h-px bg-[var(--gold)]" />
                    <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[var(--gold)]">
                        Chapter {chapter.roman}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--cream-faint)]">
                        {chapter.label}
                    </span>
                </div>

                <h2 className="font-display text-[clamp(30px,3.5vw,50px)] font-light leading-[1.05] mb-2 text-[var(--cream)]">
                    {chapter.heading}
                </h2>
                <h2 className="font-display text-[clamp(30px,3.5vw,50px)] font-light italic leading-[1.05] text-[var(--gold)] mb-10">
                    {chapter.headingAccent}
                </h2>

                <div className="space-y-5 mb-10">
                    {chapter.body.map((para, i) => (
                        <p key={i} className="font-sans text-[14px] font-light leading-[1.9] text-[var(--cream-2)]">
                            {para}
                        </p>
                    ))}
                </div>

                {/* Pull quote */}
                <div className="border-l-2 border-[var(--gold)] pl-5 mb-8">
                    <p className="font-display italic text-[clamp(16px,1.8vw,20px)] font-light leading-[1.45] text-[var(--cream)]">
                        "{chapter.pullQuote}"
                    </p>
                </div>

                {/* Stat */}
                {chapter.stat && (
                    <div className="flex items-end gap-4 border border-[var(--border)] px-6 py-4 bg-[var(--ink-4)] inline-flex">
                        <span className="font-display text-[clamp(40px,4vw,60px)] font-light text-[var(--gold)] leading-none">
                            {chapter.stat.value}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--cream-dim)] pb-2 max-w-[140px] leading-tight">
                            {chapter.stat.label}
                        </span>
                    </div>
                )}
            </div>
        </FadeIn>

        {/* Image panel */}
        <FadeIn from="right" delay="0.2s" className="img-zoom relative min-h-[400px] lg:min-h-0 bg-[var(--ink)]">
            <img
                src={chapter.image}
                alt={chapter.imageAlt}
                className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--panel)] to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6">
                <span className="font-mono text-[8px] tracking-[0.22em] uppercase bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white/40">
                    {chapter.imageCaption}
                </span>
            </div>
        </FadeIn>
    </div>
);

/* ─── Chapter Text Right ──────────────────────────────────── */
const ChapterTextRight: React.FC<{ chapter: StoryChapter }> = ({ chapter }) => (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[640px]">
        {/* Image panel */}
        <FadeIn from="left" className="img-zoom relative min-h-[400px] lg:min-h-0 bg-[var(--ink)] order-2 lg:order-1">
            <img
                src={chapter.image}
                alt={chapter.imageAlt}
                className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--ink-3)] to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6">
                <span className="font-mono text-[8px] tracking-[0.22em] uppercase bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white/40">
                    {chapter.imageCaption}
                </span>
            </div>
        </FadeIn>

        {/* Solid text panel */}
        <FadeIn from="right" delay="0.2s" className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-32 relative order-1 lg:order-2" style={{ background: 'var(--ink-3)' } as React.CSSProperties}>
            <div className="chapter-ghost absolute left-4 bottom-0 select-none pointer-events-none">
                {chapter.roman}
            </div>

            <div className="relative z-10 max-w-[540px]">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-4 h-px bg-[var(--gold)]" />
                    <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[var(--gold)]">
                        Chapter {chapter.roman}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--cream-faint)]">
                        {chapter.label}
                    </span>
                </div>

                <h2 className="font-display text-[clamp(30px,3.5vw,50px)] font-light leading-[1.05] mb-2 text-[var(--cream)]">
                    {chapter.heading}
                </h2>
                <h2 className="font-display text-[clamp(30px,3.5vw,50px)] font-light italic leading-[1.05] text-[var(--gold)] mb-10">
                    {chapter.headingAccent}
                </h2>

                <div className="space-y-5 mb-10">
                    {chapter.body.map((para, i) => (
                        <p key={i} className="font-sans text-[14px] font-light leading-[1.9] text-[var(--cream-2)]">
                            {para}
                        </p>
                    ))}
                </div>

                <div className="border-l-2 border-[var(--gold)] pl-5 mb-8">
                    <p className="font-display italic text-[clamp(16px,1.8vw,20px)] font-light leading-[1.45] text-[var(--cream)]">
                        "{chapter.pullQuote}"
                    </p>
                </div>

                {chapter.stat && (
                    <div className="inline-flex items-end gap-4 border border-[var(--border)] px-6 py-4 bg-[var(--ink)]">
                        <span className="font-display text-[clamp(40px,4vw,60px)] font-light text-[var(--gold)] leading-none">
                            {chapter.stat.value}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--cream-dim)] pb-2 max-w-[140px] leading-tight">
                            {chapter.stat.label}
                        </span>
                    </div>
                )}
            </div>
        </FadeIn>
    </div>
);

/* ─── Testimonials ────────────────────────────────────────── */
const Testimonials: React.FC = () => (
    <div
        className="py-28 px-8"
        style={{ background: 'var(--ink-2)' }}
    >
        <div className="max-w-[1440px] mx-auto">
            <FadeIn>
                <div className="flex items-center gap-5 mb-16">
                    <div className="w-6 h-px bg-[var(--gold)]" />
                    <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[var(--gold)]">
                        From the wrist
                    </span>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
                {TESTIMONIALS.map((t, i) => (
                    <FadeIn key={i} delay={`${i * 0.12}s`}>
                        <div
                            className="p-10 h-full flex flex-col justify-between"
                            style={{ background: 'var(--ink-2)' }}
                        >
                            <div>
                                <div className="font-display text-[56px] text-[var(--gold)]/15 leading-none mb-4">"</div>
                                <p className="font-sans text-[14px] font-light leading-[1.85] text-[var(--cream-2)]">
                                    {t.text}
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[var(--border)]">
                                <p className="font-mono text-[11px] tracking-[0.12em] text-[var(--cream)]">
                                    {t.author}
                                </p>
                                <p className="font-mono text-[10px] tracking-[0.1em] text-[var(--cream-faint)] mt-1">
                                    {t.location}
                                </p>
                                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--gold)] mt-3">
                                    {t.watch}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </div>
);

/* ─── Manifesto quote ─────────────────────────────────────── */
const ManifestoQuote: React.FC = () => (
    <div className="relative py-32 px-8 overflow-hidden" style={{ background: 'var(--ink)' }}>
        <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1600&q=80')",
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-transparent to-[var(--ink)]" />

        <FadeIn className="relative max-w-[800px] mx-auto text-center">
            <div className="flex justify-center items-center gap-5 mb-12">
                <div className="w-10 h-px bg-[var(--gold-dim)]" />
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-[var(--gold-dim)]">
                    Our position
                </span>
                <div className="w-10 h-px bg-[var(--gold-dim)]" />
            </div>
            <blockquote className="font-display text-[clamp(22px,3.2vw,42px)] font-light italic leading-[1.28] text-[var(--cream)]">
                We make watches for people who understand that time is not a luxury.
                It is the only material from which a life is made.
            </blockquote>
            <cite className="block mt-10 font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--gold)] not-italic">
                — MyWatches · Le Locle Manifesto, 2016
            </cite>
        </FadeIn>
    </div>
);

/* ─── Main ────────────────────────────────────────────────── */
const StorySection: React.FC = () => (
    <section id="chronicle" style={{ background: 'var(--ink)' }}>
        <MarqueeStrip />

        {/* Intro */}
        <div className="max-w-[1440px] mx-auto px-8 py-28 md:py-36">
            <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-12 md:gap-20 items-start">
                    <div>
                        <span className="font-mono text-[9px] tracking-[0.38em] uppercase text-[var(--gold)] block mb-6">
                            The Chronicle
                        </span>
                        <h2 className="font-display text-[clamp(40px,5vw,76px)] font-light leading-[0.94] text-[var(--cream)]">
                            Four chapters<br />
                            on what a <em className="italic text-gold-shimmer">watch</em><br />
                            actually is.
                        </h2>
                    </div>
                    <div className="hidden md:block w-px h-full bg-[var(--border)]" />
                    <div className="flex flex-col justify-center">
                        <p className="font-sans text-[14.5px] font-light leading-[1.95] text-[var(--cream-2)] mb-6">
                            We are not a heritage brand. We don't have 300 years of history to hide behind. Everything we know about watchmaking we learned by taking movements apart, talking to the people who make them, and asking the questions that large houses stopped answering in the 1980s.
                        </p>
                        <p className="font-sans text-[14.5px] font-light leading-[1.95] text-[var(--cream-2)]">
                            These four chapters are what we found. We think they change how you look at the object on your wrist.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>

        <hr className="hr-gold" />

        {/* Chapters */}
        {STORY_CHAPTERS.map((chapter, i) => (
            <React.Fragment key={chapter.roman}>
                {chapter.layout === 'text-left'
                    ? <ChapterTextLeft chapter={chapter} />
                    : <ChapterTextRight chapter={chapter} />
                }
                {i < STORY_CHAPTERS.length - 1 && <hr className="hr-gold" />}
            </React.Fragment>
        ))}

        <ManifestoQuote />
        <Testimonials />
    </section>
);

export default StorySection;