import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#cfe5ff',
          200: '#9fcaff',
          300: '#6fafff',
          400: '#3f94ff',
          500: '#1877f2',
          600: '#0f5dc1',
          700: '#0b4691',
          800: '#073060',
          900: '#041a30',
        },
      },
      boxShadow: {
        glass: '0 10px 40px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
