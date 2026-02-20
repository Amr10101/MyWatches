'use client';

import React from 'react';

const COLS = {
    Collection: ['Aether Noir', 'Meridian Frost', 'Chronos Terra', 'Solstice Or', 'Archive'],
    Chronicle: ['Our philosophy', 'The movement', 'The dial', 'The atelier', 'Journal'],
    Atelier: ['Service centre', 'Book a visit', 'Le Locle workshops', 'Custom orders'],
    Support: ['Shipping & delivery', 'Warranty', 'Returns', 'Contact', 'FAQ'],
};

const Footer: React.FC = () => (
    <footer style={{ background: 'var(--ink)', borderTop: '1px solid var(--b1)' }}>
        <div className="max-w-[1440px] mx-auto px-8">

            {/* Decorative wordmark row */}
            <div className="py-16" style={{ borderBottom: '1px solid var(--b1)' }}>
                <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                    {/* Ghost wordmark — purely decorative, very low opacity */}
                    <h2
                        className="font-display font-light leading-[0.88] tracking-[-0.02em]"
                        style={{ fontSize: 'clamp(56px,10vw,130px)', color: 'rgba(247,244,239,0.03)' }}
                    >
                        MyWatches
                    </h2>
                    <div className="flex flex-col items-start md:items-end gap-2">
                        <span className="font-display text-[20px] font-light tracking-[0.06em]" style={{ color: 'var(--w1)' }}>
                            My<span style={{ color: 'var(--gold)' }}>Watches</span>
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--w3)' }}>
                            Haute Horlogerie · Geneva Canton
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: 'var(--w4)' }}>
                            Est. Le Locle, 2016
                        </span>
                    </div>
                </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 py-20" style={{ borderBottom: '1px solid var(--b1)' }}>
                {/* Newsletter */}
                <div className="col-span-2 md:col-span-1">
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-5" style={{ color: 'var(--w4)' }}>
                        The Chronicle
                    </p>
                    <p className="font-sans text-[13px] font-light leading-[1.85] mb-6" style={{ color: 'var(--w3)' }}>
                        Movement updates, limited editions, and essays on mechanical horology.
                    </p>
                    <div style={{ borderBottom: '1px solid var(--b2)' }}>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 bg-transparent py-3 font-mono text-[11px] tracking-[0.04em] outline-none"
                                style={{ color: 'var(--w1)', fontFamily: 'DM Mono, monospace' }}
                            />
                            <button
                                className="font-mono text-[9px] tracking-[0.28em] uppercase py-3 pl-4 transition-colors"
                                style={{ color: 'var(--gold)' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--gold-hi)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {Object.entries(COLS).map(([title, links]) => (
                    <div key={title}>
                        <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-5" style={{ color: 'var(--w4)' }}>
                            {title}
                        </p>
                        <ul className="space-y-3.5">
                            {links.map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="font-sans text-[13px] font-light transition-colors"
                                        style={{ color: 'var(--w3)' }}
                                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w1)'; }}
                                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; }}
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Address + certs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10" style={{ borderBottom: '1px solid var(--b1)' }}>
                {[
                    { label: 'Atelier', lines: ['Rue du Progrès 18', 'Le Locle, CH-2400', 'Geneva Canton, Switzerland'] },
                    { label: 'Service Centre', lines: ['Open Mon–Fri 09:00–17:00', 'By appointment only', '+41 32 931 XX XX'] },
                    { label: 'Certifications', lines: ['COSC Chronometer standard', 'Swiss Made · 100%', 'ISO 6425 Diver spec (Terra)'] },
                ].map(({ label, lines }) => (
                    <div key={label}>
                        <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--w4)' }}>
                            {label}
                        </p>
                        {lines.map((l) => (
                            <p key={l} className="font-mono text-[11px] tracking-[0.06em] mb-1" style={{ color: 'var(--w3)' }}>
                                {l}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-7">
                <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: 'var(--w4)' }}>
                    © {new Date().getFullYear()} MyWatches SA · All rights reserved
                </span>
                <div className="flex gap-8">
                    {['Privacy', 'Cookie policy', 'Terms of sale', 'Sitemap'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="font-mono text-[8px] tracking-[0.2em] uppercase transition-colors"
                            style={{ color: 'var(--w4)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w4)'; }}
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