import { defineConfig } from 'vitepress';
 
export default defineConfig({
  title: 'Fundatio',
  description: "Vastare's Design Foundation",
  base: '/',
  outDir: '../public',
  themeConfig: {
    logo: {
      light: '/img/symbol-blue.png',
      dark: '/img/symbol-white.png',
    },
    nav: [
      { text: 'Getting Started', link: '/' },
      { text: 'Usage', link: '/usage/' },
      { text: 'API', link: '/api/' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Fundatio?', link: '/what-is-Fundatio' },
            { text: 'Why Fundatio Exists', link: '/why-Fundatio-exists' },
            { text: 'Design Principles', link: '/design-principles' },
          ],
        },
      ],
    },
  },
});
