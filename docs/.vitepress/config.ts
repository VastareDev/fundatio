import { defineConfig } from 'vitepress';
 
export default defineConfig({
  title: 'Sol',
  description: "LNPG's Design Foundation",
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
            { text: 'What is Sol?', link: '/what-is-sol' },
            { text: 'Why Sol Exists', link: '/why-sol-exists' },
            { text: 'Design Principles', link: '/design-principles' },
          ],
        },
      ],
    },
  },
});
