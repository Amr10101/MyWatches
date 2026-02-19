export interface WatchVariant {
    id: string;
    name: string;         // e.g. "Steel bracelet"
    bracelet: string;
    price: number;
    originalPrice?: number;
}

export interface Watch {
    id: string;
    name: string;
    collection: string;
    tagline: string;
    description: string;
    edition?: string;      // e.g. "Limited · 250 Pieces"
    movement: string;
    powerReserve: string;
    caseDiameter: string;
    waterResistance: string;
    crystal: string;
    caseMaterial: string;
    image: string;
    heroImage: string;
    accentHex: string;
    variants: WatchVariant[];
    specs: Record<string, string>;
}

export interface CartItem {
    variantId: string;
    watchId: string;
    quantity: number;
    watch: Watch;
    selectedVariant: WatchVariant;
}

export interface StoryChapter {
    roman: string;
    label: string;
    heading: string;
    headingAccent: string;
    body: string[];
    pullQuote: string;
    stat: { value: string; label: string } | null;
    image: string;
    imageAlt: string;
    imageCaption: string;
    layout: 'text-left' | 'text-right';
}