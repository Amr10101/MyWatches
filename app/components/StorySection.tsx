'use client';

import React from 'react';
import FadeIn from './FadeIn';
import { STORY_CHAPTERS, TESTIMONIALS } from '../../data/watches';

/* ── Marquee ──────────────────────────────────── */
const Marquee: React.FC = () => {
    const items = ['In-house movements', 'Le Locle atelier', 'Lifetime service', '±3s accuracy', 'Grand Feu enamel', 'Grade 5 titanium', 'Limited editions', 'No compromise'];
    const doubled = [...items, ...items];
    return (
        <div className="overflow-hidden py-3.5" style={{ background: 'var(--cream-3)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <div className="animate-marquee">
                {doubled.map((item, i) => (
                    <span key={i} className="font-ui text-[12px]" style={{ color: 'var(--subtle)', marginRight: 0 }}>
                        {item}
                        <span className="mx-10" style={{ color: 'var(--faint)' }}>·</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

/* ── Chapter ─────────────────────────────────── */
const Chapter: React.FC<{ chapter: typeof STORY_CHAPTERS[0]; flip?: boolean }> = ({ chapter, flip }) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[640px]`}>

        {/* Image side */}
        <div
            className={`img-reveal relative min-h-[480px] lg:min-h-0 overflow-hidden ${flip ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}
            style={{ background: 'var(--cream-3)' }}
        >
            <img
                src={chapter.image}
                alt={chapter.imageAlt}
                className="w-full h-full object-cover"
            />
            {/* Caption — white card, always readable */}
            <div className="absolute bottom-6 left-6">
                <div
                    className="px-4 py-2"
                    style={{ background: 'rgba(253,251,248,0.88)', backdropFilter: 'blur(10px)' }}
                >
                    <p className="font-ui text-[11px]" style={{ color: 'var(--body)' }}>{chapter.imageCaption}</p>
                </div>
            </div>

            {/* Chapter number — large decorative, very faint */}
            <div
                className="absolute bottom-0 right-4 font-serif italic leading-none pointer-events-none select-none"
                style={{ fontSize: 'clamp(120px,18vw,200px)', fontWeight: 500, color: 'rgba(24,22,15,0.04)' }}
            >
                {chapter.roman}
            </div>
        </div>

        {/* Text side — cream surface, always readable */}
        <FadeIn from={flip ? 'right' : 'left'} delay="0.1s">
            <div
                className={`flex flex-col justify-center h-full px-8 md:px-14 lg:px-16 py-20 ${flip ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}
                style={{ background: 'var(--cream)' }}
            >
                {/* Label */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-0.5" style={{ background: 'var(--gold)' }} />
                    <span className="font-ui text-[11px] font-medium" style={{ color: 'var(--gold)' }}>
                        Chapter {chapter.roman}
                    </span>
                    <span className="font-ui text-[11px]" style={{ color: 'var(--faint)' }}>
                        {chapter.label}
                    </span>
                </div>

                {/* Heading — Cormorant, large, ink */}
                <h2 className="font-serif font-light leading-[1.0] mb-2" style={{ fontSize: 'clamp(30px,3.2vw,48px)', color: 'var(--ink)' }}>
                    {chapter.heading}
                </h2>
                {/* Gold accent line — only gold because it's 48px display */}
                <h2 className="font-serif font-light italic leading-[1.0] mb-8" style={{ fontSize: 'clamp(30px,3.2vw,48px)', color: 'var(--gold)' }}>
                    {chapter.headingAccent}
                </h2>

                {/* Body — Outfit 15px, body color, generous line height */}
                <div className="space-y-4 mb-8" style={{ maxWidth: '520px' }}>
                    {chapter.body.map((para, i) => (
                        <p key={i} className="font-ui text-[15px]" style={{ color: 'var(--body)', lineHeight: '1.85' }}>
                            {para}
                        </p>
                    ))}
                </div>

                {/* Pull quote */}
                <div className="ornament mb-8">
                    <p
                        className="font-serif italic font-light leading-[1.45]"
                        style={{ fontSize: 'clamp(17px,1.8vw,22px)', color: 'var(--ink)', maxWidth: '460px' }}
                    >
                        "{chapter.pullQuote}"
                    </p>
                </div>

                {/* Stat — large Cormorant number, gold */}
                {chapter.stat && (
                    <div
                        className="inline-flex items-end gap-4 px-6 py-4"
                        style={{ border: '1px solid var(--line)', background: 'var(--cream-2)', maxWidth: 'fit-content' }}
                    >
                        <span
                            className="font-serif font-light leading-none"
                            style={{ fontSize: 'clamp(48px,5vw,68px)', color: 'var(--gold)' }}
                        >
                            {chapter.stat.value}
                        </span>
                        <span
                            className="font-ui text-[12px] pb-2 max-w-[150px] leading-snug"
                            style={{ color: 'var(--subtle)' }}
                        >
                            {chapter.stat.label}
                        </span>
                    </div>
                )}
            </div>
        </FadeIn>
    </div>
);

/* ── Testimonials ────────────────────────────── */
const Testimonials: React.FC = () => (
    <div className="py-24 px-8" style={{ background: 'var(--cream-2)' }}>
        <div className="max-w-[1380px] mx-auto">
            <FadeIn>
                <p className="font-ui text-[12px] font-medium mb-14" style={{ color: 'var(--subtle)', letterSpacing: '0.06em' }}>
                    From the wrist
                </p>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'var(--line)' }}>
                {TESTIMONIALS.map((t, i) => (
                    <FadeIn key={i} delay={`${i * 0.1}s`}>
                        <div className="p-8 h-full flex flex-col justify-between" style={{ background: 'var(--cream-2)' }}>
                            <div>
                                {/* Opening quote — decorative gold, large */}
                                <div
                                    className="font-serif leading-none mb-4"
                                    style={{ fontSize: '64px', color: 'rgba(184,145,42,0.15)', fontStyle: 'italic' }}
                                >
                                    "
                                </div>
                                {/* Quote body — Outfit 15px body color */}
                                <p className="font-ui text-[15px]" style={{ color: 'var(--body)', lineHeight: '1.8' }}>
                                    {t.text}
                                </p>
                            </div>
                            <div className="mt-7 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
                                <p className="font-ui text-[14px] font-semibold" style={{ color: 'var(--ink)' }}>{t.author}</p>
                                <p className="font-ui text-[13px] mt-0.5" style={{ color: 'var(--subtle)' }}>{t.location}</p>
                                <p className="font-ui text-[11px] mt-3 font-medium" style={{ color: 'var(--gold)' }}>{t.watch}</p>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </div>
);

/* ── Manifesto quote ─────────────────────────── */
const Manifesto: React.FC = () => (
    <div className="py-28 px-8" style={{ background: 'var(--forest)' }}>
        <FadeIn>
            <div className="max-w-[820px] mx-auto text-center">
                <div className="flex justify-center items-center gap-5 mb-12">
                    <div className="h-px w-12" style={{ background: 'rgba(247,243,236,0.2)' }} />
                    <span className="font-ui text-[11px] font-medium" style={{ color: 'rgba(247,243,236,0.5)', letterSpacing: '0.08em' }}>
                        Our position
                    </span>
                    <div className="h-px w-12" style={{ background: 'rgba(247,243,236,0.2)' }} />
                </div>
                <blockquote
                    className="font-serif font-light italic leading-[1.25]"
                    style={{ fontSize: 'clamp(26px,3.5vw,48px)', color: 'var(--cream)' }}
                >
                    We make watches for people who understand that time is not a luxury.
                    It is the only material from which a life is made.
                </blockquote>
                <p className="font-ui text-[11px] font-medium mt-10" style={{ color: 'rgba(184,145,42,0.8)', letterSpacing: '0.08em' }}>
                    MyWatches · Le Locle Manifesto, 2016
                </p>
            </div>
        </FadeIn>
    </div>
);

/* ── Main ─────────────────────────────────────── */
const StorySection: React.FC = () => (
    <section id="chronicle" style={{ background: 'var(--cream)' }}>
        <Marquee />

        {/* Intro — keeps it brief, visual-first */}
        <div className="max-w-[1380px] mx-auto px-8 py-24 md:py-32">
            <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-end">
                    <div>
                        <p className="font-ui text-[12px] font-medium mb-6" style={{ color: 'var(--subtle)', letterSpacing: '0.06em' }}>
                            The Chronicle
                        </p>
                        <h2 className="font-serif font-light leading-[0.94]" style={{ fontSize: 'clamp(40px,5vw,72px)', color: 'var(--ink)' }}>
                            Four chapters on what a{' '}
                            <em className="italic" style={{ color: 'var(--gold)' }}>watch</em>{' '}
                            actually is.
                        </h2>
                    </div>
                    <div>
                        <p className="font-ui text-[15px]" style={{ color: 'var(--body)', lineHeight: '1.85', maxWidth: '440px' }}>
                            Everything we know about watchmaking we learned by taking movements apart, talking to the people who build them, and asking the questions that large houses stopped answering decades ago.
                        </p>
                    </div>
                </div>
            </FadeIn>
        </div>

        <div className="rule-gold" />

        {/* Only show 2 most visual chapters to avoid "article" feel */}
        {STORY_CHAPTERS.slice(0, 2).map((ch, i) => (
            <React.Fragment key={ch.roman}>
                <Chapter chapter={ch} flip={i % 2 !== 0} />
                {i < 1 && <div className="rule-gold" />}
            </React.Fragment>
        ))}

        <Manifesto />
        <Testimonials />
    </section>
);

export default StorySection;