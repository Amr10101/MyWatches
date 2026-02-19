'use client';

import React from 'react';

const COLS = {
    Collection: ['Aether Noir', 'Meridian Frost', 'Chronos Terra', 'Solstice Or', 'Archive'],
    Chronicle: ['Our philosophy', 'The movement', 'The dial', 'The atelier', 'Journal'],
    Atelier: ['Service centre', 'Book a visit', 'Le Locle workshops', 'Custom orders'],
    Support: ['Shipping & delivery', 'Warranty', 'Returns', 'Contact', 'FAQ'],
};

const Footer: React.FC = () => (
    <footer style={{ background: 'var(--ink)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-[1440px] mx-auto px-8">

            {/* Decorative display wordmark */}
            <div className="py-16 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                    <h2
                        className="font-display font-light leading-[0.88] tracking-[-0.02em]"
                        style={{
                            fontSize: 'clamp(56px,10vw,130px)',
                            color: 'rgba(240,232,216,0.04)',
                        }}
                    >
                        MyWatches
                    </h2>
                    <div className="flex flex-col items-end gap-2">
                        <span className="font-display text-[22px] font-light text-[var(--cream)] tracking-[0.05em]">
                            My<span className="text-[var(--gold)]">Watches</span>
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream-faint)]">
                            Haute Horlogerie · Geneva Canton
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--cream-faint)]">
                            Est. Le Locle, 2016
                        </span>
                    </div>
                </div>
            </div>

            {/* Link columns */}
            <div
                className="grid grid-cols-2 md:grid-cols-5 gap-12 py-20 border-b"
                style={{ borderColor: 'var(--border)' }}
            >
                {/* Newsletter */}
                <div className="col-span-2 md:col-span-1">
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--cream-faint)] mb-5">
                        The Chronicle
                    </p>
                    <p className="font-sans text-[13px] font-light leading-[1.85] text-[var(--cream-2)] mb-6">
                        Movement updates, limited edition announcements, and essays on mechanical horology.
                    </p>
                    <div
                        className="flex border-b pb-0"
                        style={{ borderColor: 'var(--border-2)' }}
                    >
                        <input
                            type="email"
                            placeholder="Serial@email.com"
                            className="flex-1 bg-transparent py-3 font-mono text-[11px] tracking-[0.04em] outline-none placeholder:text-[var(--cream-faint)]"
                            style={{ color: 'var(--cream)' }}
                        />
                        <button
                            className="font-mono text-[9px] tracking-[0.28em] uppercase py-3 pl-4 text-[var(--gold)] hover:text-[var(--gold-2)] transition-colors"
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                {Object.entries(COLS).map(([title, links]) => (
                    <div key={title}>
                        <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--cream-faint)] mb-5">
                            {title}
                        </p>
                        <ul className="space-y-3.5">
                            {links.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="font-sans text-[13px] font-light text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Atelier address block */}
            <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b"
                style={{ borderColor: 'var(--border)' }}
            >
                {[
                    { label: 'Atelier', lines: ['Rue du Progrès 18', 'Le Locle, CH-2400', 'Geneva Canton, Switzerland'] },
                    { label: 'Service Centre', lines: ['Open Mon–Fri 09:00–17:00', 'By appointment only', '+41 32 931 XX XX'] },
                    { label: 'Certifications', lines: ['COSC Chronometer standard', 'Swiss Made · 100%', 'ISO 6425 Diver spec (Terra)'] },
                ].map(({ label, lines }) => (
                    <div key={label}>
                        <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-[var(--cream-faint)] mb-3">
                            {label}
                        </p>
                        {lines.map((l) => (
                            <p key={l} className="font-mono text-[11px] tracking-[0.06em] text-[var(--cream-dim)] mb-1">
                                {l}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-7">
                <span className="font-mono text-[9px] tracking-[0.15em] text-[var(--cream-faint)]">
                    © {new Date().getFullYear()} MyWatches SA · All rights reserved · CHE-XXX.XXX.XXX
                </span>
                <div className="flex gap-8">
                    {['Privacy', 'Cookie policy', 'Terms of sale', 'Sitemap'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="font-mono text-[8px] tracking-[0.2em] uppercase text-[var(--cream-faint)] hover:text-[var(--cream-dim)] transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;