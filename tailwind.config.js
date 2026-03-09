/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* green-50 */
        input: "var(--color-input)", /* custom-earth-warm */
        ring: "var(--color-ring)", /* custom-forest-trust */
        background: "var(--color-background)", /* gray-50 */
        foreground: "var(--color-foreground)", /* custom-forest-dark */
        primary: {
          DEFAULT: "var(--color-primary)", /* custom-forest-trust */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* custom-growth-energy */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-300 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* custom-earth-warm */
          foreground: "var(--color-muted-foreground)", /* custom-natural-hierarchy */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* light-blue-400 */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* custom-forest-dark */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* custom-forest-dark */
        },
        success: {
          DEFAULT: "var(--color-success)", /* green-500 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* orange-500 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-300 */
          foreground: "var(--color-error-foreground)", /* white */
        },
        'conversion-accent': "var(--color-conversion-accent)", /* custom-warm-orange */
        'trust-builder': "var(--color-trust-builder)", /* light-blue-400 */
        'surface': "var(--color-surface)", /* custom-earth-warm */
        'text-secondary': "var(--color-text-secondary)", /* custom-natural-hierarchy */
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'organic': '12px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.2', fontWeight: '600' }],
        'display': ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'subheading': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'micro': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "grow": "grow 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "grow": {
          from: { transform: "scale(0.8)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      boxShadow: {
        'organic': '0 4px 20px rgba(45, 90, 39, 0.1), 0 1px 3px rgba(45, 90, 39, 0.2)',
        'organic-lg': '0 8px 40px rgba(45, 90, 39, 0.15), 0 2px 6px rgba(45, 90, 39, 0.25)',
        'neomorphic': 'inset 2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(255, 255, 255, 0.9)',
        'float': '0 12px 60px rgba(45, 90, 39, 0.2), 0 4px 12px rgba(45, 90, 39, 0.3)',
      },
      backdropBlur: {
        'organic': '12px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}