import type { Config } from "tailwindcss";
// FIX: Import the default object, not a named export
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Bodoni Moda"', 'Georgia', 'serif'],
                mono: ['"DM Mono"', 'monospace'],
                sans: ['Jost', 'sans-serif'],
            },
            transitionDuration: {
                '400': '400ms',
            },
        },
    },
    plugins: [],
};
export default config;



