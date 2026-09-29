/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fbf9f5',
          dim: '#dbdad6',
          bright: '#fbf9f5',
          lowest: '#ffffff',
          low: '#f5f3ef',
          container: '#efeeea',
          high: '#eae8e4',
          highest: '#e4e2de',
        },
        ink: {
          DEFAULT: '#1b1c1a',
          variant: '#55423f',
        },
        inverse: {
          surface: '#30312e',
          onSurface: '#f2f0ed',
        },
        outline: {
          DEFAULT: '#88726e',
          variant: '#dbc1bc',
        },
        primary: {
          DEFAULT: '#9a4337',
          on: '#ffffff',
          container: '#e67e6e',
          onContainer: '#611911',
        },
        secondary: {
          DEFAULT: '#546253',
          on: '#ffffff',
          container: '#d7e7d3',
          onContainer: '#3c4a3c',
        },
        tertiary: {
          DEFAULT: '#006b56',
          on: '#ffffff',
          container: '#32ae8f',
          onContainer: '#003b2e',
        },
        danger: {
          DEFAULT: '#ba1a1a',
          on: '#ffffff',
          container: '#ffdad6',
          onContainer: '#93000a',
        },
        background: '#fbf9f5',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-md': ['28px', { lineHeight: '36px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-sm': ['22px', { lineHeight: '28px', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-lg': ['14px', { lineHeight: '20px', letterSpacing: '0.02em', fontWeight: '600' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      spacing: {
        18: '4.5rem',
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
      boxShadow: {
        soft: '0px 0px 12px 0px rgba(27, 28, 26, 0.06)',
      },
      maxWidth: {
        app: '520px',
      },
    },
  },
  plugins: [],
}
