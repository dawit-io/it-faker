import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "IT Faker",
  description: "IT-Faker: Italian Data Generator based on Faker.js",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Modules', link: '/modules/' },
      { text: 'Examples', link: '/examples/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/' },
          { text: 'Installation', link: '/guide/installation' }
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'Overview', link: '/modules/' },
          { text: 'Person', link: '/modules/person' },
          { text: 'Fiscal Code', link: '/modules/fiscal-code' },
          { text: 'Addresses', link: '/modules/addresses' },
          { text: 'Names', link: '/modules/names' },
          { text: 'Last Names', link: '/modules/last-names' },
          { text: 'Places', link: '/modules/places' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Overview', link: '/examples/' },
          { text: 'Basic Usage', link: '/examples/basic-usage' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dawit-io/it-faker' }  // Update with your repo
    ]
  }
})