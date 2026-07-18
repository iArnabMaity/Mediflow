/* Tailwind CSS Configuration for MediFlow */
/* Inspired by MiniMax design system with healthcare-specific color palette */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "Inter", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      fontSize: {
        // Hero & Display
        "hero-display": ["80px", { lineHeight: "1.10", letterSpacing: "-2px", fontWeight: "600" }],
        "display-lg": ["56px", { lineHeight: "1.10", letterSpacing: "-1.5px", fontWeight: "600" }],
        "display-md": ["48px", { lineHeight: "1.15", letterSpacing: "-1px", fontWeight: "600" }],
        // Headings
        "heading-lg": ["40px", { lineHeight: "1.20", letterSpacing: "-1px", fontWeight: "600" }],
        "heading-md": ["32px", { lineHeight: "1.25", letterSpacing: "-0.5px", fontWeight: "600" }],
        "heading-sm": ["24px", { lineHeight: "1.30", fontWeight: "600" }],
        // Card & Body
        "card-title": ["20px", { lineHeight: "1.40", fontWeight: "600" }],
        "subtitle": ["18px", { lineHeight: "1.50", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "1.50", fontWeight: "400" }],
        "body-md-bold": ["16px", { lineHeight: "1.50", fontWeight: "700" }],
        "body-sm": ["14px", { lineHeight: "1.50", fontWeight: "400" }],
        "body-sm-medium": ["14px", { lineHeight: "1.50", fontWeight: "500" }],
        // Caption & Micro
        "caption": ["13px", { lineHeight: "1.70", fontWeight: "400" }],
        "caption-bold": ["13px", { lineHeight: "1.50", fontWeight: "600" }],
        "micro": ["12px", { lineHeight: "1.50", fontWeight: "400" }],
        // Button
        "button-md": ["14px", { lineHeight: "1.40", fontWeight: "600" }],
      },
      colors: {
        // Primary & Core
        primary: {
          50: "#f5f8f9",
          100: "#e8eef2",
          200: "#d1dde5",
          300: "#a8c2d1",
          400: "#7ca5ba",
          500: "#4d7d8f", // Deep Navy (primary)
          600: "#3d6577",
          700: "#2d4d5f",
          800: "#1f3747",
          900: "#0f1f2f",
        },
        // Healthcare Accent - Teal/Emerald
        teal: {
          50: "#f0fef9",
          100: "#ccfce8",
          200: "#99f9d6",
          300: "#5ffcbe",
          400: "#1feca0",
          500: "#10b981", // Teal accent
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        // Medical Green (success/positive)
        medical: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Medical Green
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
        },
        // Coral/Orange (urgent/attention)
        coral: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ff5530", // Coral (inspired by MiniMax)
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        // Magenta/Pink (secondary brand)
        magenta: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f8b4d6",
          400: "#ea5ec1", // Magenta (inspired by MiniMax)
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        // Blue (information/secondary)
        brand: {
          blue: "#1456f0", // Brand Blue (inspired by MiniMax)
          "blue-mid": "#3b82f6",
          "blue-deep": "#1d4ed8",
          "blue-700": "#17437d",
          cyan: "#3daeff",
          "blue-200": "#bfdbfe",
          purple: "#a855f7",
        },
        // Neutral Palette
        canvas: "#ffffff",
        surface: "#f7f8fa",
        "surface-soft": "#f2f3f5",
        hairline: "#e5e7eb",
        "hairline-soft": "#eaecf0",
        ink: "#0a0a0a",
        "ink-strong": "#000000",
        charcoal: "#222222",
        slate: "#45515e",
        steel: "#5f5f5f",
        stone: "#8e8e93",
        muted: "#a8aab2",
        // Semantic
        success: {
          bg: "#e8ffea",
          text: "#1ba673",
        },
        error: {
          bg: "#ffe8e8",
          text: "#d45656",
        },
        warning: {
          bg: "#fffaeb",
          text: "#f59e0b",
        },
        info: {
          bg: "#eef2ff",
          text: "#3b82f6",
        },
        "footer-bg": "#0a0a0a",
      },
      spacing: {
        // 4px base unit system
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        xxl: "32px",
        xxxl: "40px",
        "section-sm": "48px",
        section: "64px",
        "section-lg": "80px",
        hero: "96px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        xxl: "20px",
        xxxl: "24px",
        hero: "32px",
        full: "9999px",
      },
      boxShadow: {
        // Elevation system
        "elevation-0": "none",
        "elevation-1": "rgba(0, 0, 0, 0.04) 0px 1px 2px 0px",
        "elevation-2": "rgba(0, 0, 0, 0.08) 0px 4px 6px 0px",
        "elevation-3": "rgba(0, 0, 0, 0.08) 0px 0px 22px 0px",
        "elevation-4": "rgba(36, 36, 36, 0.08) 0px 12px 16px -4px",
      },
      maxWidth: {
        // Container widths
        container: "1280px",
        prose: "720px",
        sidebar: "220px",
        toc: "180px",
      },
      screens: {
        // MiniMax-inspired breakpoints
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
