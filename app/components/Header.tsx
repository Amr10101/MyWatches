'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
    cartCount: number;
    onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3.5' : 'py-5'
                    }`}
                style={{
                    background: scrolled ? 'rgba(247,243,236,0.96)' : 'var(--cream)',
                    backdropFilter: scrolled ? 'blur(18px)' : 'none',
                    borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
                }}
            >
                <div className="max-w-[1380px] mx-auto px-8 flex items-center justify-between">

                    {/* Brand — serif wordmark */}
                    <a href="#" className="flex-shrink-0">
                        <span
                            className="font-serif leading-none"
                            style={{ fontSize: '22px', fontWeight: 500, color: 'var(--ink)', letterSpacing: '0.02em' }}
                        >
                            My<span style={{ color: 'var(--forest)' }}>Watches</span>
                        </span>
                        <span
                            className="font-ui block text-[10px]"
                            style={{ color: 'var(--faint)', letterSpacing: '0.08em', marginTop: '1px' }}
                        >
                            Haute Horlogerie · Geneva
                        </span>
                    </a>

                    {/* Center nav — Outfit 14px, normal case, minimal spacing */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {['Collection', 'Chronicle', 'Atelier', 'Contact'].map((item) => (
                            <a key={item} href="#" className="nav-item">{item}</a>
                        ))}
                    </nav>

                    {/* Right — actions */}
                    <div className="flex items-center gap-5">
                        {/* Availability dot */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--gold)' }} />
                            <span
                                className="font-ui text-[12px]"
                                style={{ color: 'var(--subtle)', letterSpacing: '0.01em' }}
                            >
                                2024 pieces available
                            </span>
                        </div>

                        <button
                            onClick={onOpenCart}
                            className="flex items-center gap-2 transition-colors"
                            style={{ color: 'var(--subtle)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                        >
                            <div className="relative">
                                <ShoppingBag size={18} strokeWidth={1.5} />
                                {cartCount > 0 && (
                                    <span
                                        className="absolute -top-1.5 -right-1.5 font-ui text-[9px] font-semibold w-4 h-4 flex items-center justify-center rounded-full leading-none"
                                        style={{ background: 'var(--forest)', color: 'var(--white)' }}
                                    >
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </button>

                        <button
                            onClick={() => setMenuOpen(true)}
                            className="lg:hidden transition-colors"
                            style={{ color: 'var(--subtle)' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                        >
                            <Menu size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-[60] transition-all duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ background: 'var(--cream)' }}
            >
                <div className="max-w-[1380px] mx-auto px-8 pt-5 flex items-center justify-between mb-16">
                    <span className="font-serif text-[22px] font-medium" style={{ color: 'var(--ink)' }}>
                        My<span style={{ color: 'var(--forest)' }}>Watches</span>
                    </span>
                    <button
                        onClick={() => setMenuOpen(false)}
                        style={{ color: 'var(--subtle)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>
                <nav className="px-8 flex flex-col">
                    {['Collection', 'Chronicle', 'Atelier', 'Contact', 'Acquire'].map((item, i) => (
                        <a
                            key={item}
                            href="#"
                            onClick={() => setMenuOpen(false)}
                            className="font-serif font-light py-5 flex items-center justify-between border-b transition-colors"
                            style={{
                                fontSize: 'clamp(32px,5vw,54px)',
                                color: 'var(--ink)',
                                borderColor: 'var(--line)',
                                transitionDelay: `${i * 45}ms`,
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--forest)'; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                        >
                            {item}
                            <span className="font-ui text-[12px]" style={{ color: 'var(--faint)' }}>
                                0{i + 1}
                            </span>
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Header;