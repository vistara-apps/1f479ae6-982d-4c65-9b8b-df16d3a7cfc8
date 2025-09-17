/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 70% 55%)',
        accent: 'hsl(170 70% 50%)',
        bg: 'hsl(220 20% 10%)',
        surface: 'hsl(220 20% 15%)',
        'text-primary': 'hsl(0 0% 95%)',
        'text-secondary': 'hsl(0 0% 70%)',
        success: 'hsl(130 70% 45%)',
        warning: 'hsl(40 70% 50%)',
        danger: 'hsl(0 70% 50%)',
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.025em' }],
        'heading1': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'heading2': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '2rem' }],
        'body': ['1rem', { lineHeight: '1.75rem' }],
        'small': ['0.875rem', { lineHeight: '1.5rem' }],
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.625rem',
        'lg': '1rem',
        'xl': '1.25rem',
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(220, 20%, 10%, 0.20)',
        'modal': '0 12px 32px hsla(220, 20%, 10%, 0.32)',
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
