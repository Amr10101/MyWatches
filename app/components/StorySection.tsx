'use client';

import React from 'react';
import FadeIn from './FadeIn';
import { STORY_CHAPTERS, TESTIMONIALS } from '../../data/watches';
import { StoryChapter } from '../../types/types';

/* ─── Scrolling marquee ──────────────────────────────────── */
const MarqueeStrip: React.FC = () => {
    const items = [
        'In-house movements', 'Le Locle atelier', 'Lifetime service',
        '±3s daily accuracy', 'Grand Feu enamel', 'Grade 5 titanium',
        'Limited editions', 'No compromise',
    ];
    const doubled = [...items, ...items];
    return (
        <div
            className="overflow-hidden py-3.5"
            style={{ background: 'var(--ink-3)', borderTop: '1px solid var(--b1)', borderBottom: '1px solid var(--b1)' }}
        >
            <div className="animate-marquee">
                {doubled.map((item, i) => (
                    <span key={i} className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--w3)' }}>
                        {item}
                        <span className="mx-10" style={{ color: 'var(--gold-lo)' }}>·</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ─── Chapter — text on left ─────────────────────────────── */
const ChapterLeft: React.FC<{ chapter: StoryChapter }> = ({ chapter }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
        {/* Solid text panel */}
        <FadeIn from="left">
            <div
                className="relative flex flex-col justify-center h-full px-8 md:px-16 lg:px-20 py-24"
                style={{ background: 'var(--ink-2)' }}
            >
                {/* Ghost chapter — decorative only, gold at 4% opacity */}
                <div className="chapter-ghost absolute right-4 bottom-0 pointer-events-none select-none">
                    {chapter.roman}
                </div>

                <div className="relative z-10 max-w-[540px]">
                    {/* Chapter label — w3 (6:1) */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
                        <span className="font-mono text-[9px] tracking-[0.38em] uppercase" style={{ color: 'var(--gold)' }}>
                            Chapter {chapter.roman}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.28em] uppercase" style={{ color: 'var(--w3)' }}>
                            {chapter.label}
                        </span>
                    </div>

                    {/* Heading — w1 (18:1) */}
                    <h2 className="font-display font-light leading-[1.05] mb-2" style={{ fontSize: 'clamp(28px,3.2vw,46px)', color: 'var(--w1)' }}>
                        {chapter.heading}
                    </h2>
                    {/* Accent line — gold only because it's 46px+ display size */}
                    <h2 className="font-display font-light italic leading-[1.05] mb-10" style={{ fontSize: 'clamp(28px,3.2vw,46px)', color: 'var(--gold)' }}>
                        {chapter.headingAccent}
                    </h2>

                    {/* Body — w2 (10:1) at 14px — perfectly readable */}
                    <div className="space-y-5 mb-10">
                        {chapter.body.map((para, i) => (
                            <p key={i} className="font-sans text-[14px] font-light leading-[1.92]" style={{ color: 'var(--w2)' }}>
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Pull quote — w1 border-left style */}
                    <div className="pl-5 mb-8" style={{ borderLeft: '2px solid var(--gold)' }}>
                        <p className="font-display italic font-light leading-[1.45]" style={{ fontSize: 'clamp(15px,1.7vw,19px)', color: 'var(--w1)' }}>
                            "{chapter.pullQuote}"
                        </p>
                    </div>

                    {/* Stat — gold only for the huge number, w3 for the label */}
                    {chapter.stat && (
                        <div
                            className="inline-flex items-end gap-4 px-6 py-4"
                            style={{ border: '1px solid var(--b1)', background: 'var(--ink-3)' }}
                        >
                            <span
                                className="font-display font-light leading-none"
                                style={{ fontSize: 'clamp(40px,4vw,60px)', color: 'var(--gold)' }}
                            >
                                {chapter.stat.value}
                            </span>
                            <span
                                className="font-mono text-[10px] tracking-[0.2em] uppercase pb-2 max-w-[140px] leading-tight"
                                style={{ color: 'var(--w3)' }}
                            >
                                {chapter.stat.label}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>

        {/* Image panel — nothing overlaid on the photo */}
        <FadeIn from="right" delay="0.15s">
            <div
                className="img-zoom relative min-h-[400px] lg:h-full"
                style={{ background: 'var(--ink-3)' }}
            >
                <img
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-y-0 left-0 w-16 pointer-events-none"
                    style={{ background: 'linear-gradient(to right, var(--ink-2), transparent)' }}
                />
                <div className="absolute bottom-5 right-5">
                    <span
                        className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5"
                        style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(247,244,239,0.35)' }}
                    >
                        {chapter.imageCaption}
                    </span>
                </div>
            </div>
        </FadeIn>
    </div>
);

/* ─── Chapter — text on right ────────────────────────────── */
const ChapterRight: React.FC<{ chapter: StoryChapter }> = ({ chapter }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[620px]">
        {/* Image first on desktop */}
        <FadeIn from="left">
            <div
                className="img-zoom relative min-h-[400px] lg:h-full order-2 lg:order-1"
                style={{ background: 'var(--ink-3)' }}
            >
                <img
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-y-0 right-0 w-16 pointer-events-none"
                    style={{ background: 'linear-gradient(to left, var(--ink-3), transparent)' }}
                />
                <div className="absolute bottom-5 left-5">
                    <span
                        className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5"
                        style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(247,244,239,0.35)' }}
                    >
                        {chapter.imageCaption}
                    </span>
                </div>
            </div>
        </FadeIn>

        {/* Text panel */}
        <FadeIn from="right" delay="0.15s">
            <div
                className="relative flex flex-col justify-center h-full px-8 md:px-16 lg:px-20 py-24 order-1 lg:order-2"
                style={{ background: 'var(--ink-3)' }}
            >
                <div className="chapter-ghost absolute left-4 bottom-0 pointer-events-none select-none">
                    {chapter.roman}
                </div>

                <div className="relative z-10 max-w-[540px]">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-4 h-px" style={{ background: 'var(--gold)' }} />
                        <span className="font-mono text-[9px] tracking-[0.38em] uppercase" style={{ color: 'var(--gold)' }}>
                            Chapter {chapter.roman}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.28em] uppercase" style={{ color: 'var(--w3)' }}>
                            {chapter.label}
                        </span>
                    </div>

                    <h2 className="font-display font-light leading-[1.05] mb-2" style={{ fontSize: 'clamp(28px,3.2vw,46px)', color: 'var(--w1)' }}>
                        {chapter.heading}
                    </h2>
                    <h2 className="font-display font-light italic leading-[1.05] mb-10" style={{ fontSize: 'clamp(28px,3.2vw,46px)', color: 'var(--gold)' }}>
                        {chapter.headingAccent}
                    </h2>

                    <div className="space-y-5 mb-10">
                        {chapter.body.map((para, i) => (
                            <p key={i} className="font-sans text-[14px] font-light leading-[1.92]" style={{ color: 'var(--w2)' }}>
                                {para}
                            </p>
                        ))}
                    </div>

                    <div className="pl-5 mb-8" style={{ borderLeft: '2px solid var(--gold)' }}>
                        <p className="font-display italic font-light leading-[1.45]" style={{ fontSize: 'clamp(15px,1.7vw,19px)', color: 'var(--w1)' }}>
                            "{chapter.pullQuote}"
                        </p>
                    </div>

                    {chapter.stat && (
                        <div
                            className="inline-flex items-end gap-4 px-6 py-4"
                            style={{ border: '1px solid var(--b1)', background: 'var(--ink-4)' }}
                        >
                            <span
                                className="font-display font-light leading-none"
                                style={{ fontSize: 'clamp(40px,4vw,60px)', color: 'var(--gold)' }}
                            >
                                {chapter.stat.value}
                            </span>
                            <span
                                className="font-mono text-[10px] tracking-[0.2em] uppercase pb-2 max-w-[140px] leading-tight"
                                style={{ color: 'var(--w3)' }}
                            >
                                {chapter.stat.label}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    </div>
);

/* ─── Manifesto ──────────────────────────────────────────── */
const Manifesto: React.FC = () => (
    <div className="relative py-32 px-8" style={{ background: 'var(--ink)' }}>
        <FadeIn>
            <div className="max-w-[800px] mx-auto text-center">
                <div className="flex justify-center items-center gap-5 mb-12">
                    <div className="w-10 h-px" style={{ background: 'var(--b2)' }} />
                    <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--w3)' }}>
                        Our position
                    </span>
                    <div className="w-10 h-px" style={{ background: 'var(--b2)' }} />
                </div>
                <blockquote
                    className="font-display font-light italic leading-[1.28]"
                    style={{ fontSize: 'clamp(22px,3vw,42px)', color: 'var(--w1)' }}
                >
                    We make watches for people who understand that time is not a luxury.
                    It is the only material from which a life is made.
                </blockquote>
                <cite
                    className="block mt-10 font-mono text-[9px] tracking-[0.35em] uppercase not-italic"
                    style={{ color: 'var(--gold)' }}
                >
                    — MyWatches · Le Locle Manifesto, 2016
                </cite>
            </div>
        </FadeIn>
    </div>
);

/* ─── Testimonials ───────────────────────────────────────── */
const Testimonials: React.FC = () => (
    <div className="py-28 px-8" style={{ background: 'var(--ink-2)' }}>
        <div className="max-w-[1440px] mx-auto">
            <FadeIn>
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-5 h-px" style={{ background: 'var(--gold)' }} />
                    <span className="font-mono text-[9px] tracking-[0.38em] uppercase" style={{ color: 'var(--w3)' }}>
                        From the wrist
                    </span>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '1px', background: 'var(--b1)' }}>
                {TESTIMONIALS.map((t, i) => (
                    <FadeIn key={i} delay={`${i * 0.12}s`}>
                        <div className="p-10 h-full flex flex-col justify-between" style={{ background: 'var(--ink-2)' }}>
                            <div>
                                {/* Opening quote — decorative, faint gold at large size */}
                                <div
                                    className="font-display text-[64px] leading-none mb-4"
                                    style={{ color: 'rgba(212,168,75,0.12)' }}
                                >
                                    "
                                </div>
                                {/* Quote body — w2 for comfortable long-form reading */}
                                <p className="font-sans text-[14px] font-light leading-[1.88]" style={{ color: 'var(--w2)' }}>
                                    {t.text}
                                </p>
                            </div>
                            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--b1)' }}>
                                <p className="font-mono text-[11px] tracking-[0.12em]" style={{ color: 'var(--w1)' }}>
                                    {t.author}
                                </p>
                                <p className="font-mono text-[10px] tracking-[0.1em] mt-1" style={{ color: 'var(--w3)' }}>
                                    {t.location}
                                </p>
                                <p className="font-mono text-[9px] tracking-[0.22em] uppercase mt-3" style={{ color: 'var(--gold)' }}>
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

/* ─── Section root ───────────────────────────────────────── */
const StorySection: React.FC = () => (
    <section id="chronicle" style={{ background: 'var(--ink)' }}>
        <MarqueeStrip />

        {/* Intro */}
        <div className="max-w-[1440px] mx-auto px-8 py-28 md:py-36">
            <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-12 md:gap-20 items-start">
                    <div>
                        <span className="font-mono text-[9px] tracking-[0.38em] uppercase block mb-6" style={{ color: 'var(--w3)' }}>
                            The Chronicle
                        </span>
                        <h2 className="font-display font-light leading-[0.94]" style={{ fontSize: 'clamp(40px,5vw,76px)', color: 'var(--w1)' }}>
                            Four chapters<br />
                            on what a{' '}
                            <em className="italic text-gold-shimmer">watch</em>
                            <br />
                            actually is.
                        </h2>
                    </div>
                    <div className="hidden md:block h-full" style={{ background: 'var(--b1)', width: '1px' }} />
                    <div className="flex flex-col justify-center">
                        <p className="font-sans text-[14.5px] font-light leading-[1.95] mb-5" style={{ color: 'var(--w2)' }}>
                            We are not a heritage brand. We don't have 300 years of history to hide behind. Everything we know about watchmaking we learned by taking movements apart, talking to the people who make them, and asking the questions that large houses stopped answering in the 1980s.
                        </p>
                        <p className="font-sans text-[14.5px] font-light leading-[1.95]" style={{ color: 'var(--w2)' }}>
                            These four chapters are what we found.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>

        <div className="hr-gold" />

        {STORY_CHAPTERS.map((ch, i) => (
            <React.Fragment key={ch.roman}>
                {ch.layout === 'text-left' ? <ChapterLeft chapter={ch} /> : <ChapterRight chapter={ch} />}
                {i < STORY_CHAPTERS.length - 1 && <div className="hr-gold" />}
            </React.Fragment>
        ))}

        <Manifesto />
        <Testimonials />
    </section>
);

export default StorySection;