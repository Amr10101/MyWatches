'use client';

import React from 'react';

const COLS = {
    Collection: ['Aether Noir', 'Meridian Frost', 'Chronos Terra', 'Solstice Or', 'Archive'],
    Chronicle: ['Philosophy', 'The movement', 'The dial', 'Atelier', 'Journal'],
    Service: ['Servicing', 'Book a visit', 'Workshops', 'Custom orders'],
    Support: ['Shipping', 'Warranty', 'Returns', 'Contact', 'FAQ'],
};

const Footer: React.FC = () => (
    <footer style={{ background: 'var(--cream)', borderTop: '1px solid var(--line)' }}>
        <div className="max-w-[1380px] mx-auto px-8">

            {/* Top row */}
            <div className="py-16 grid grid-cols-1 md:grid-cols-[1.4fr_3fr] gap-16" style={{ borderBottom: '1px solid var(--line)' }}>
                {/* Brand */}
                <div>
                    <div className="font-serif font-medium mb-3" style={{ fontSize: '24px', color: 'var(--ink)' }}>
                        My<span style={{ color: 'var(--forest)' }}>Watches</span>
                    </div>
                    <p className="font-ui text-[13px] mb-6" style={{ color: 'var(--subtle)', lineHeight: '1.75' }}>
                        Haute horlogerie. Le Locle, Geneva Canton. Built to last a lifetime.
                    </p>
                    {/* Newsletter */}
                    <div className="mb-1">
                        <p className="font-ui text-[11px] font-medium mb-3" style={{ color: 'var(--subtle)', letterSpacing: '0.04em' }}>
                            The Chronicle — movement updates, limited editions
                        </p>
                        <div className="flex" style={{ borderBottom: '1.5px solid var(--line-2)' }}>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-transparent py-2.5 font-ui text-[13px] outline-none"
                                style={{ color: 'var(--ink)' }}
                            />
                            <button
                                className="font-ui text-[12px] font-semibold pl-4 py-2.5 transition-colors"
                                style={{ color: 'var(--forest)' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--forest-2)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--forest)'; }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {Object.entries(COLS).map(([title, links]) => (
                        <div key={title}>
                            <p className="font-ui text-[11px] font-semibold mb-5" style={{ color: 'var(--ink)', letterSpacing: '0.04em' }}>
                                {title}
                            </p>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="font-ui text-[13px] transition-colors"
                                            style={{ color: 'var(--subtle)' }}
                                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Address row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8" style={{ borderBottom: '1px solid var(--line)' }}>
                {[
                    { label: 'Atelier', lines: ['Rue du Progrès 18', 'Le Locle, CH-2400', 'Geneva Canton, Switzerland'] },
                    { label: 'Service Centre', lines: ['Mon–Fri 09:00–17:00', 'By appointment', '+41 32 931 XX XX'] },
                    { label: 'Certifications', lines: ['COSC Chronometer', 'Swiss Made · 100%', 'ISO 6425 (Chronos Terra)'] },
                ].map(({ label, lines }) => (
                    <div key={label}>
                        <p className="font-ui text-[11px] font-semibold mb-3" style={{ color: 'var(--ink)', letterSpacing: '0.04em' }}>
                            {label}
                        </p>
                        {lines.map((l) => (
                            <p key={l} className="font-ui text-[12px] mb-1" style={{ color: 'var(--subtle)' }}>{l}</p>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6">
                <span className="font-ui text-[12px]" style={{ color: 'var(--faint)' }}>
                    © {new Date().getFullYear()} MyWatches SA · All rights reserved
                </span>
                <div className="flex gap-7">
                    {['Privacy', 'Cookies', 'Terms', 'Sitemap'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="font-ui text-[12px] transition-colors"
                            style={{ color: 'var(--faint)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--faint)'; }}
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