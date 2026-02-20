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
    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-4'}`}
                style={{
                    background: scrolled ? 'rgba(10,10,10,0.97)' : 'var(--ink-2)',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: '1px solid var(--b1)',
                }}
            >
                <div className="max-w-[1440px] mx-auto px-8 flex items-center justify-between">

                    {/* Brand */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="lg:hidden transition-colors"
                            style={{ color: 'var(--w3)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--w1)')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--w3)')}
                        >
                            <Menu size={18} strokeWidth={1.5} />
                        </button>
                        <div>
                            <a href="#" className="block">
                                <span className="font-display text-[18px] font-light tracking-[0.08em]" style={{ color: 'var(--w1)' }}>
                                    My<span style={{ color: 'var(--gold)' }}>Watches</span>
                                </span>
                            </a>
                            <span className="font-mono text-[8px] tracking-[0.28em] uppercase block -mt-0.5" style={{ color: 'var(--w4)' }}>
                                Haute Horlogerie · Geneva
                            </span>
                        </div>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => setHovered(item.label)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <a href="#" className="nav-link py-2 block">{item.label}</a>

                                {item.sub.length > 0 && hovered === item.label && (
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 py-3 min-w-[160px] z-10"
                                        style={{ background: 'var(--ink-4)', border: '1px solid var(--b1)' }}
                                    >
                                        {item.sub.map((s) => (
                                            <a
                                                key={s}
                                                href="#"
                                                className="flex items-center justify-between px-5 py-2.5 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors"
                                                style={{ color: 'var(--w3)' }}
                                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; (e.currentTarget as HTMLElement).style.background = 'var(--ink-5)'; }}
                                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
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

                    {/* Right actions */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 pl-6" style={{ borderLeft: '1px solid var(--b1)' }}>
                            <div className="w-1.5 h-1.5 rounded-full animate-dot" style={{ background: 'var(--gold)' }} />
                            <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'var(--w3)' }}>
                                Limited 2024
                            </span>
                        </div>

                        <button
                            onClick={onOpenCart}
                            className="flex items-center gap-2.5 transition-colors"
                            style={{ color: 'var(--w3)' }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--w1)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--w3)')}
                        >
                            <span className="nav-link hidden sm:block" style={{ color: 'inherit' }}>Acquire</span>
                            <div className="relative">
                                <ShoppingBag size={17} strokeWidth={1.5} />
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-1.5 -right-1.5 font-mono text-[9px] font-medium w-4 h-4 flex items-center justify-center rounded-full leading-none"
                                        style={{ background: 'var(--gold)', color: 'var(--ink)' }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 z-[60] transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'var(--ink-2)' }}
            >
                <div className="max-w-[1440px] mx-auto px-8 pt-6">
                    <div className="flex items-center justify-between mb-16">
                        <span className="font-display text-[18px] font-light" style={{ color: 'var(--w1)' }}>
                            My<span style={{ color: 'var(--gold)' }}>Watches</span>
                        </span>
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{ color: 'var(--w3)' }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--w1)')}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--w3)')}
                        >
                            <X size={18} strokeWidth={1.5} />
                        </button>
                    </div>

                    <nav>
                        {[...NAV_ITEMS, { label: 'Acquire', sub: [] }].map((item, i) => (
                            <a
                                key={item.label}
                                href="#"
                                onClick={() => setMenuOpen(false)}
                                className="font-display text-[clamp(32px,5vw,56px)] font-light py-4 flex items-center justify-between transition-colors"
                                style={{ color: 'var(--w1)', borderBottom: '1px solid var(--b1)', transitionDelay: `${i * 40}ms` }}
                                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--gold)')}
                                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--w1)')}
                            >
                                {item.label}
                                <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: 'var(--w4)' }}>
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                            </a>
                        ))}
                    </nav>

                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-16" style={{ color: 'var(--w4)' }}>
                        Le Locle · Geneva Canton · Est. 2016
                    </p>
                </div>
            </div>
        </>
    );
};

export default Header;