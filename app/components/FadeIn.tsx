'use client';

import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    delay?: string;
    className?: string;
    from?: 'bottom' | 'left' | 'right' | 'none';
    threshold?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
    children,
    delay = '0s',
    className = '',
    from = 'bottom',
    threshold = 0.1,
}) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        const el = ref.current;
        if (el) obs.observe(el);
        return () => { if (el) obs.unobserve(el); };
    }, [threshold]);

    const initial = {
        bottom: 'translate-y-7',
        left: '-translate-x-8',
        right: 'translate-x-8',
        none: '',
    }[from];

    return (
        <div
            ref={ref}
            className={`transition-all duration-[1000ms] ease-out
        ${visible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${initial}`}
        ${className}`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
};

export default FadeIn;