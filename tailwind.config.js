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
        emerald: {
          500: '#10b981',
          400: '#34d399',
        },
        surface: {
          DEFAULT: '#070707',
          100: '#090909',
          200: '#0a0a0a',
          300: '#0c0c0c',
          400: '#0d0d0d',
          500: '#0e0e0e',
          600: '#0f0f0f',
          700: '#111111',
          800: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'border-spin': 'border-spin 4s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-up-custom': 'fadeUp 0.65s cubic-bezier(0.21,0.47,0.32,0.98) forwards',
        'scale-in-x': 'scaleInX 0.8s 0.3s ease-out forwards',
        'water-dot': 'waterDot 6s ease-in-out infinite',
        'shimmer-slide': 'shimmerSlide 3.5s ease-in-out infinite',
        'shimmer-slide-2': 'shimmerSlide2 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'float-y': 'floatY 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'scan-line': 'scanLine 10s ease-in-out infinite',
      },
      keyframes: {
        'border-spin': {
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleInX: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        waterDot: {
          '0%, 100%': { opacity: '0', transform: 'translate(-50%,-50%) translateY(0) scale(0.6)' },
          '20%, 80%': { opacity: '0.7', transform: 'translate(-50%,-50%) translateY(-6px) scale(1)' },
          '50%': { opacity: '1', transform: 'translate(-50%,-50%) translateY(-10px) scale(1.1)' },
        },
        shimmerSlide: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
        shimmerSlide2: {
          '0%': { transform: 'translateX(-100%) skewX(-8deg)' },
          '100%': { transform: 'translateX(280%) skewX(-8deg)' },
        },
        borderPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        rotateSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.12' },
          '50%': { opacity: '0.45' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '8%': { opacity: '1' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translateY(900%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
