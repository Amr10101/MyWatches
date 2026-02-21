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
                style={{ background: 'rgba(24,22,15,0.4)', backdropFilter: 'blur(6px)' }}
            />

            {/* Drawer */}
            <div
                className={`cart-slide fixed inset-y-0 right-0 z-[101] w-full max-w-[460px] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                style={{ background: 'var(--white)', borderLeft: '1px solid var(--line)' }}
            >
                {/* Header */}
                <div className="flex items-start justify-between px-7 py-6" style={{ borderBottom: '1px solid var(--line)', background: 'var(--cream)' }}>
                    <div>
                        <h2 className="font-serif font-medium leading-none" style={{ fontSize: '28px', color: 'var(--ink)' }}>
                            Your selection
                        </h2>
                        <p className="font-ui text-[12px] mt-1.5" style={{ color: 'var(--subtle)' }}>
                            {count === 0 ? 'Nothing added yet' : `${count} piece${count > 1 ? 's' : ''} · Pending confirmation`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 flex items-center justify-center mt-0.5 transition-colors"
                        style={{ border: '1px solid var(--line)', color: 'var(--subtle)' }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--line-2)'; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--line)'; }}
                    >
                        <X size={14} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-7 py-5">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center gap-5 text-center py-20">
                            <div className="font-serif italic font-light leading-none select-none" style={{ fontSize: '64px', color: 'var(--cream-3)' }}>
                                Empty
                            </div>
                            <p className="font-ui text-[13px] max-w-[200px]" style={{ color: 'var(--subtle)', lineHeight: '1.6' }}>
                                Your selection is empty. Browse the collection to begin.
                            </p>
                            <button
                                onClick={onClose}
                                className="font-ui text-[12px] font-medium pb-0.5 transition-colors"
                                style={{ color: 'var(--forest)', borderBottom: '1px solid var(--forest)' }}
                            >
                                View collection
                            </button>
                        </div>
                    ) : (
                        <div>
                            {items.map((item) => (
                                <div key={item.variantId} className="flex gap-4 py-6" style={{ borderBottom: '1px solid var(--line)' }}>
                                    {/* Thumbnail */}
                                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}>
                                        <img src={item.watch.image} alt={item.watch.name} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <p className="font-serif font-medium" style={{ fontSize: '20px', color: 'var(--ink)', lineHeight: '1.2' }}>
                                                    {item.watch.name}
                                                </p>
                                                <p className="font-ui text-[11px] mt-1" style={{ color: 'var(--subtle)' }}>
                                                    {item.selectedVariant.name} — {item.selectedVariant.bracelet}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => onRemoveItem(item.variantId)}
                                                className="mt-0.5 transition-colors"
                                                style={{ color: 'var(--faint)' }}
                                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#cc4444'; }}
                                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--faint)'; }}
                                            >
                                                <Trash2 size={13} strokeWidth={1.5} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            {/* Qty */}
                                            <div className="flex items-center" style={{ border: '1px solid var(--line-2)' }}>
                                                <button
                                                    disabled={item.quantity <= 1}
                                                    onClick={() => onUpdateQuantity(item.variantId, -1)}
                                                    className="px-3 py-2 transition-colors disabled:opacity-30"
                                                    style={{ color: 'var(--subtle)' }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                                                >
                                                    <Minus size={10} strokeWidth={2} />
                                                </button>
                                                <span className="font-ui text-[13px] font-semibold w-7 text-center" style={{ color: 'var(--ink)' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.variantId, 1)}
                                                    className="px-3 py-2 transition-colors"
                                                    style={{ color: 'var(--subtle)' }}
                                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
                                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--subtle)'; }}
                                                >
                                                    <Plus size={10} strokeWidth={2} />
                                                </button>
                                            </div>
                                            <p className="price" style={{ fontSize: '22px' }}>
                                                ${(item.selectedVariant.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-7 py-6" style={{ borderTop: '1px solid var(--line)', background: 'var(--cream)' }}>
                        <div className="flex items-baseline justify-between mb-4">
                            <span className="font-ui text-[13px]" style={{ color: 'var(--subtle)' }}>Subtotal</span>
                            <p className="price" style={{ fontSize: '38px' }}>${subtotal.toLocaleString()}</p>
                        </div>
                        <p className="font-ui text-[11px] text-center mb-5" style={{ color: 'var(--faint)' }}>
                            Shipping, insurance & import duties at checkout
                        </p>
                        <button className="btn-cta w-full py-4 justify-center">
                            Proceed to checkout <ArrowRight size={14} strokeWidth={1.5} />
                        </button>
                        <div className="grid grid-cols-3 gap-4 mt-5">
                            {[['Insured', 'Worldwide'], ['30 days', 'Returns'], ['5 years', 'Warranty']].map(([v, l]) => (
                                <div key={l} className="text-center">
                                    <p className="font-ui text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>{v}</p>
                                    <p className="font-ui text-[10px]" style={{ color: 'var(--faint)' }}>{l}</p>
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