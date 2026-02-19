'use client';

import React from 'react';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types/types';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (variantId: string, delta: number) => void;
    onRemoveItem: (variantId: string) => void;
}

const Cart: React.FC<CartProps> = ({
    isOpen, onClose, items, onUpdateQuantity, onRemoveItem,
}) => {
    const subtotal = items.reduce((s, i) => s + i.selectedVariant.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-[100] transition-opacity duration-400 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            />

            {/* Panel */}
            <div
                className={`cart-panel fixed inset-y-0 right-0 z-[101] w-full max-w-[480px] flex flex-col border-l ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                style={{ background: 'var(--ink-2)', borderColor: 'var(--border)' }}
            >
                {/* Header */}
                <div
                    className="flex items-start justify-between px-8 py-7 border-b"
                    style={{ borderColor: 'var(--border)', background: 'var(--ink-3)' }}
                >
                    <div>
                        <h2 className="font-display text-[28px] font-light text-[var(--cream)] leading-none">
                            Acquisition
                        </h2>
                        <p className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--cream-faint)] mt-2">
                            {count === 0 ? 'Empty' : `${count} item${count !== 1 ? 's' : ''} · Pending confirmation`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="border text-[var(--cream-dim)] hover:text-[var(--cream)] hover:border-[var(--cream-dim)] transition-all w-9 h-9 flex items-center justify-center mt-1"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <X size={14} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-5 text-center">
                            <div
                                className="font-display text-[70px] font-light italic leading-none select-none"
                                style={{ color: 'var(--border-2)' }}
                            >
                                Empty
                            </div>
                            <p className="font-mono text-[11px] tracking-[0.1em] text-[var(--cream-faint)] max-w-[220px]">
                                Select a reference from the collection to begin your acquisition.
                            </p>
                            <button
                                onClick={onClose}
                                className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--gold)] border-b border-[var(--gold-dim)] pb-0.5 hover:border-[var(--gold)] transition-colors"
                            >
                                Browse collection
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                            {items.map((item) => (
                                <div key={item.variantId} className="flex gap-5 py-7">
                                    {/* Thumb */}
                                    <div
                                        className="w-20 h-20 flex-shrink-0 overflow-hidden border"
                                        style={{ borderColor: 'var(--border)' }}
                                    >
                                        <img
                                            src={item.watch.image}
                                            alt={item.watch.name}
                                            className="w-full h-full object-cover brightness-75"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-3">
                                            <div>
                                                <h3 className="font-display text-[20px] font-light text-[var(--cream)] leading-tight">
                                                    {item.watch.name}
                                                </h3>
                                                <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--cream-faint)] mt-1">
                                                    {item.selectedVariant.name}
                                                </p>
                                                <p className="font-mono text-[9px] tracking-[0.12em] text-[var(--cream-faint)] mt-0.5">
                                                    {item.selectedVariant.bracelet}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => onRemoveItem(item.variantId)}
                                                className="text-[var(--cream-faint)] hover:text-red-400 transition-colors mt-0.5"
                                            >
                                                <Trash2 size={13} strokeWidth={1.5} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Qty */}
                                            <div
                                                className="flex items-center border"
                                                style={{ borderColor: 'var(--border-2)', background: 'var(--ink)' }}
                                            >
                                                <button
                                                    onClick={() => onUpdateQuantity(item.variantId, -1)}
                                                    disabled={item.quantity <= 1}
                                                    className="text-[var(--cream-dim)] hover:text-[var(--cream)] disabled:opacity-25 transition-colors px-3 py-2.5"
                                                >
                                                    <Minus size={10} strokeWidth={2} />
                                                </button>
                                                <span className="font-mono text-[12px] text-[var(--cream)] w-7 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.variantId, 1)}
                                                    className="text-[var(--cream-dim)] hover:text-[var(--cream)] transition-colors px-3 py-2.5"
                                                >
                                                    <Plus size={10} strokeWidth={2} />
                                                </button>
                                            </div>

                                            <span className="font-display text-[22px] font-light text-[var(--cream)]">
                                                ${(item.selectedVariant.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div
                        className="px-8 py-7 border-t"
                        style={{ borderColor: 'var(--border)', background: 'var(--ink-3)' }}
                    >
                        {/* Subtotal */}
                        <div className="flex items-baseline justify-between mb-3">
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--cream-faint)]">
                                Subtotal
                            </span>
                            <span className="font-display text-[36px] font-light text-[var(--cream)]">
                                ${subtotal.toLocaleString()}
                            </span>
                        </div>

                        {/* Small print */}
                        <p className="font-mono text-[9px] tracking-[0.06em] text-[var(--cream-faint)] text-center mb-6">
                            Shipping · Insurance · Import duties calculated at checkout
                        </p>

                        {/* CTA */}
                        <button className="btn-acquire w-full py-5 flex items-center justify-center gap-3">
                            Proceed to acquisition <ArrowRight size={13} />
                        </button>

                        {/* Trust info */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[
                                ['Insured', 'Worldwide shipping'],
                                ['30 days', 'Return window'],
                                ['5 years', 'Warranty included'],
                            ].map(([val, label]) => (
                                <div key={label} className="text-center">
                                    <span className="font-mono text-[9px] tracking-[0.12em] text-[var(--gold)] block">
                                        {val}
                                    </span>
                                    <span className="font-mono text-[8px] tracking-[0.08em] text-[var(--cream-faint)] block mt-0.5">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;