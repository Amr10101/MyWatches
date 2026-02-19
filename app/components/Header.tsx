'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

interface HeaderProps {
    cartCount: number;
    onOpenCart: () => void;
}

const NAV_ITEMS = [
    { label: 'Collection', sub: ['Aether', 'Meridian', 'Chronos', 'Solstice'] },
    { label: 'Chronicle', sub: [] },
    { label: 'Atelier', sub: [] },
    { label: 'Contact', sub: [] },
];

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <>
            {/* ── Main header bar ── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'bg-[var(--ink)]/98 backdrop-blur-2xl border-b border-[var(--border)] py-3'
                        : 'bg-[var(--ink)] border-b border-[var(--border)] py-4'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-8">
                    <div className="flex items-center justify-between">

                        {/* Left — brand */}
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors lg:hidden"
                            >
                                <Menu size={18} strokeWidth={1.5} />
                            </button>
                            <div>
                                <a href="#" className="block">
                                    <span className="font-display text-[18px] font-light tracking-[0.1em] text-[var(--cream)]">
                                        My<span className="text-[var(--gold)]">Watches</span>
                                    </span>
                                </a>
                                <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-[var(--cream-faint)] block -mt-0.5">
                                    Haute Horlogerie · Geneva
                                </span>
                            </div>
                        </div>

                        {/* Center — nav (desktop) */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {NAV_ITEMS.map((item) => (
                                <div
                                    key={item.label}
                                    className="relative"
                                    onMouseEnter={() => setHoveredNav(item.label)}
                                    onMouseLeave={() => setHoveredNav(null)}
                                >
                                    <a
                                        href="#"
                                        className="nav-link py-2 block"
                                        style={{
                                            color: hoveredNav === item.label ? 'var(--cream)' : undefined,
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                    {/* Dropdown for items with sub */}
                                    {item.sub.length > 0 && hoveredNav === item.label && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[var(--ink-3)] border border-[var(--border)] py-3 min-w-[160px]">
                                            {item.sub.map((s) => (
                                                <a
                                                    key={s}
                                                    href="#"
                                                    className="flex items-center justify-between px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--cream-dim)] hover:text-[var(--gold)] hover:bg-[var(--ink-4)] transition-colors"
                                                >
                                                    {s}
                                                    <ChevronRight size={10} strokeWidth={1.5} />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Right — actions */}
                        <div className="flex items-center gap-6">
                            {/* Serial number / edition indicator */}
                            <div className="hidden md:flex items-center gap-2 border-l border-[var(--border)] pl-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-gold-pulse" />
                                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--cream-dim)]">
                                    Limited 2024
                                </span>
                            </div>

                            <button
                                onClick={onOpenCart}
                                className="flex items-center gap-2.5 text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors"
                            >
                                <span className="nav-link hidden sm:block" style={{ color: 'inherit' }}>Acquire</span>
                                <div className="relative">
                                    <ShoppingBag size={17} strokeWidth={1.5} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-[var(--gold)] text-[var(--ink)] font-mono text-[9px] font-medium w-4 h-4 flex items-center justify-center rounded-full leading-none">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Mobile full-screen menu ── */}
            <div
                className={`fixed inset-0 z-[60] bg-[var(--ink-2)] transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-8 pt-6">
                    <div className="flex items-center justify-between mb-16">
                        <span className="font-display text-[18px] font-light text-[var(--cream)]">
                            My<span className="text-[var(--gold)]">Watches</span>
                        </span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors"
                        >
                            <X size={18} strokeWidth={1.5} />
                        </button>
                    </div>

                    <nav className="flex flex-col">
                        {[...NAV_ITEMS, { label: 'Acquire', sub: [] }].map((item, i) => (
                            <a
                                key={item.label}
                                href="#"
                                onClick={() => setMenuOpen(false)}
                                className="font-display text-[clamp(32px,5vw,56px)] font-light text-[var(--cream)] py-4 border-b border-[var(--border)] hover:text-[var(--gold)] transition-colors flex items-center justify-between"
                                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                            >
                                {item.label}
                                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--cream-faint)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </a>
                        ))}
                    </nav>

                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[var(--cream-faint)] mt-16">
                        Le Locle · Geneva Canton · Est. 2016
                    </p>
                </div>
            </div>
        </>
    );
};

export default Header;