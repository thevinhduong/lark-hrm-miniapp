import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Kinetic Polaris - Primary (Ink Charcoal)
        primary: '#303030',
        'on-primary': '#ffffff',
        'primary-container': '#303030',
        'on-primary-container': '#999797',
        'primary-fixed': '#e4e2e1',
        'primary-fixed-dim': '#c8c6c6',
        'on-primary-fixed': '#1b1c1c',
        'on-primary-fixed-variant': '#474747',

        // Secondary (Interactive Indigo)
        secondary: '#0055c7',
        'on-secondary': '#ffffff',
        'secondary-container': '#2c6fe7',
        'on-secondary-container': '#fefcff',
        'secondary-fixed': '#d9e2ff',
        'secondary-fixed-dim': '#b0c6ff',
        'on-secondary-fixed': '#001945',
        'on-secondary-fixed-variant': '#00419c',

        // Tertiary (Aura Amethyst)
        tertiary: '#370038',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#5a005c',
        'on-tertiary-container': '#e366de',
        'tertiary-fixed': '#ffd7f6',
        'tertiary-fixed-dim': '#ffaaf5',
        'on-tertiary-fixed': '#380039',
        'on-tertiary-fixed-variant': '#800082',

        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',

        // Surfaces & Backgrounds
        background: '#fbf9f8',
        'on-background': '#1b1c1c',
        surface: '#fbf9f8',
        'surface-dim': '#dbdad9',
        'surface-bright': '#fbf9f8',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f3f3',
        'surface-container': '#efeded',
        'surface-container-high': '#e9e8e7',
        'surface-container-highest': '#e4e2e2',
        'on-surface': '#1b1c1c',
        'on-surface-variant': '#444748',
        'inverse-surface': '#303031',
        'inverse-on-surface': '#f2f0f0',

        // Outlines
        outline: '#747878',
        'outline-variant': '#c4c7c7',

        // Inverse
        'inverse-primary': '#c8c6c6',
        'inverse-surface': '#303031',
        'inverse-on-surface': '#f2f0f0',

        // Surface tint
        'surface-tint': '#5f5e5e',

        // Semantic status colors
        success: {
          bg: '#e6feda',
          icon: '#047b5d',
          text: '#014b40',
        },
        warning: {
          bg: '#fff3e0',
          icon: '#e65100',
          text: '#8a3a00',
        },
        critical: {
          bg: '#ffecef',
          icon: '#c70a24',
          text: '#8e0b21',
        },
        info: {
          bg: '#e8f0fe',
          icon: '#1967d2',
          text: '#0d47a1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'headline-lg': ['Inter'],
        'headline-md': ['Inter'],
        'body-lg': ['Inter'],
        'body-md': ['Inter'],
        'label-sm': ['Inter'],
        'label-md': ['Inter'],
      },
      fontSize: {
        'display-lg': ['40px', { lineHeight: '48px', letterSpacing: '-0.54px', fontWeight: '700' }],
        'headline-2xl': ['30px', { lineHeight: '40px', letterSpacing: '-0.3px', fontWeight: '700' }],
        'headline-2xl-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.2px', fontWeight: '700' }],
        'headline-lg': ['20px', { lineHeight: '24px', letterSpacing: '-0.2px', fontWeight: '650' }],
        'headline-md': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '650' }],
        'body-lg': ['14px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '450' }],
        'body-md': ['13px', { lineHeight: '20px', letterSpacing: '0px', fontWeight: '450' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0px', fontWeight: '450' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0px', fontWeight: '500' }],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        'space-100': '4px',
        'space-200': '8px',
        'space-300': '12px',
        'space-400': '16px',
        'space-600': '24px',
        'space-800': '32px',
        'margin-mobile': '16px',
        'margin-desktop': '32px',
        'gutter': '16px',
      },
      boxShadow: {
        'polaris': '0px 1px 0px 0px rgba(26, 26, 26, 0.07)',
        'polaris-sm': '0px 0px 0px 1px rgba(26, 26, 26, 0.04)',
        'polaris-lg': '0px 4px 8px -2px rgba(26, 26, 26, 0.07), 0px 2px 4px -2px rgba(26, 26, 26, 0.05)',
        'inset-tactile': '0px -1px 0px 1px rgba(0, 0, 0, 0.8) inset',
      },
    },
  },
  plugins: [],
} satisfies Config
