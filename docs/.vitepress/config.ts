import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "IT Faker",
  description: "IT-Faker: generatore di dati italiani realistici basato su Faker.js",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Person', link: '/person' },
          { text: 'Company', link: '/company' },          
          { text: 'Address', link: '/address' },
          { text: 'City', link: '/city' },
          { text: 'Phone', link: '/phone' },
          { text: 'Vehicle', link: '/vehicle' },
          { text: 'Bank', link: '/bank' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
})
