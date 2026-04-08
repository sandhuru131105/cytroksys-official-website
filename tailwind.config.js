/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          ink: 'var(--color-ink)',
          panel: 'var(--color-panel)',
          panelSoft: 'var(--color-panel-soft)',
          surface1: 'var(--color-surface-1)',
          surface2: 'var(--color-surface-2)',
          surface3: 'var(--color-surface-3)',
          line: 'var(--color-line)',
          cyan: 'var(--color-cyan)',
          violet: 'var(--color-violet)',
          aurora: 'var(--color-accent-3)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
        },
      },
      boxShadow: {
        glow: '0 0 24px color-mix(in srgb, var(--color-accent-1) 34%, transparent)',
        violet: '0 0 30px color-mix(in srgb, var(--color-accent-2) 35%, transparent)',
        aurora: '0 10px 30px color-mix(in srgb, var(--color-accent-3) 30%, transparent)',
      },
      backgroundImage: {
        'cyber-grid':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'cyber-brand': 'var(--gradient-brand)',
        'cyber-cta': 'var(--gradient-cta)',
      },
    },
  },
}
