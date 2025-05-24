/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./index.html', './src/**/*.{js,ts}'], // adjust if you use JSX/TSX, Svelte, etc.
    relative: true,
    transform: (content) => content.replace(/taos:/g, ''), // TAOS needs this
  },
  safelist: [
    '!duration-[0ms]',
    '!delay-[0ms]',
    'html.js :where([class*="taos:"]:not(.taos-init))', // keep the “hidden” state in prod build
  ],
  theme: {
    extend: {
      // Example custom keyframe if you need fade‑blur‑scale again
      keyframes: {
        'fade-blur-scale': {
          '0%': { opacity: '0', filter: 'blur(12px)', transform: 'scale(1.25)' },
          '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-blur-scale': 'fade-blur-scale 0.8s ease-out both',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'), // utilities like animate-wiggle, animate-jump-in, etc.
    require('tailwindcss-motion'),   // motion / key-frame helpers
    require('taos/plugin'),          // scroll-triggered taos: variant
  ],
};
