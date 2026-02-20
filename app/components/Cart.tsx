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

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
    const subtotal = items.reduce((s, i) => s + i.selectedVariant.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-[100] transition-opacity duration-400 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(8px)' }}
            />

            {/* Drawer */}
            <div
                className={`cart-panel fixed inset-y-0 right-0 z-[101] w-full max-w-[480px] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ background: 'var(--ink-2)', borderLeft: '1px solid var(--b1)' }}
            >
                {/* Header */}
                <div
                    className="flex items-start justify-between px-8 py-7"
                    style={{ borderBottom: '1px solid var(--b1)', background: 'var(--ink-3)' }}
                >
                    <div>
                        <h2 className="font-display text-[28px] font-light leading-none" style={{ color: 'var(--w1)' }}>
                            Acquisition
                        </h2>
                        <p className="font-mono text-[9px] tracking-[0.28em] uppercase mt-2" style={{ color: 'var(--w3)' }}>
                            {count === 0 ? 'Empty' : `${count} item${count !== 1 ? 's' : ''} · Pending confirmation`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center mt-1 transition-colors"
                        style={{ border: '1px solid var(--b1)', color: 'var(--w3)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w1)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--b2)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--b1)'; }}
                    >
                        <X size={14} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-5 text-center">
                            <div
                                className="font-display font-light italic leading-none select-none"
                                style={{ fontSize: '72px', color: 'var(--b2)' }}
                            >
                                Empty
                            </div>
                            <p className="font-mono text-[11px] tracking-[0.08em] max-w-[220px]" style={{ color: 'var(--w3)' }}>
                                Select a reference from the collection to begin your acquisition.
                            </p>
                            <button
                                onClick={onClose}
                                className="font-mono text-[9px] tracking-[0.28em] uppercase pb-0.5 transition-colors"
                                style={{ color: 'var(--gold)', borderBottom: '1px solid var(--gold-lo)' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold)'; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold-lo)'; }}
                            >
                                Browse collection
                            </button>
                        </div>
                    ) : (
                        <div style={{ borderTop: '1px solid var(--b1)' }}>
                            {items.map((item) => (
                                <div key={item.variantId} className="flex gap-5 py-7" style={{ borderBottom: '1px solid var(--b1)' }}>
                                    {/* Thumbnail */}
                                    <div
                                        className="w-20 h-20 flex-shrink-0 overflow-hidden"
                                        style={{ border: '1px solid var(--b1)', background: 'var(--ink-3)' }}
                                    >
                                        <img src={item.watch.image} alt={item.watch.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-3">
                                            <div>
                                                <h3 className="font-display text-[20px] font-light leading-tight" style={{ color: 'var(--w1)' }}>
                                                    {item.watch.name}
                                                </h3>
                                                <p className="font-mono text-[9px] tracking-[0.18em] uppercase mt-1" style={{ color: 'var(--w3)' }}>
                                                    {item.selectedVariant.name}
                                                </p>
                                                <p className="font-mono text-[9px] tracking-[0.1em] mt-0.5" style={{ color: 'var(--w4)' }}>
                                                    {item.selectedVariant.bracelet}
                                                </p>
                                            </div>
                                            <button
                                                className="mt-0.5 transition-colors"
                                                style={{ color: 'var(--w4)' }}
                                                onClick={() => onRemoveItem(item.variantId)}
                                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#e05555'; }}
                                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w4)'; }}
                                            >
                                                <Trash2 size={13} strokeWidth={1.5} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Qty control */}
                                            <div
                                                className="flex items-center"
                                                style={{ border: '1px solid var(--b2)', background: 'var(--ink-3)' }}
                                            >
                                                <button
                                                    disabled={item.quantity <= 1}
                                                    onClick={() => onUpdateQuantity(item.variantId, -1)}
                                                    className="px-3 py-2.5 transition-colors disabled:opacity-25"
                                                    style={{ color: 'var(--w3)' }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w1)'; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; }}
                                                >
                                                    <Minus size={10} strokeWidth={2} />
                                                </button>
                                                <span className="font-mono text-[12px] w-7 text-center" style={{ color: 'var(--w1)' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.variantId, 1)}
                                                    className="px-3 py-2.5 transition-colors"
                                                    style={{ color: 'var(--w3)' }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w1)'; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--w3)'; }}
                                                >
                                                    <Plus size={10} strokeWidth={2} />
                                                </button>
                                            </div>
                                            <span className="font-display text-[22px] font-light" style={{ color: 'var(--w1)' }}>
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
                        className="px-8 py-7"
                        style={{ borderTop: '1px solid var(--b1)', background: 'var(--ink-3)' }}
                    >
                        <div className="flex items-baseline justify-between mb-2">
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'var(--w3)' }}>
                                Subtotal
                            </span>
                            <span className="font-display text-[36px] font-light" style={{ color: 'var(--w1)' }}>
                                ${subtotal.toLocaleString()}
                            </span>
                        </div>
                        <p className="font-mono text-[9px] tracking-[0.06em] text-center mb-6" style={{ color: 'var(--w4)' }}>
                            Shipping · Insurance · Import duties calculated at checkout
                        </p>
                        <button className="btn-primary w-full py-5 justify-center flex items-center gap-3">
                            Proceed to acquisition <ArrowRight size={13} />
                        </button>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {[['Insured', 'Worldwide'], ['30 days', 'Returns'], ['5 years', 'Warranty']].map(([val, label]) => (
                                <div key={label} className="text-center">
                                    <span className="font-mono text-[9px] tracking-[0.12em] block" style={{ color: 'var(--gold)' }}>
                                        {val}
                                    </span>
                                    <span className="font-mono text-[8px] tracking-[0.08em] block mt-0.5" style={{ color: 'var(--w4)' }}>
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