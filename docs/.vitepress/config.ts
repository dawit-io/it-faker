import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/it-faker/',
  title: "IT Faker",
  description: "IT-Faker: Italian Data Generator based on Faker.js",
  ignoreDeadLinks: true, // this is temporary until we have all the pages
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Modules', link: '/modules/' },
      { text: 'Examples', link: '/modules/' }
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
          { text: 'Person', link: '/in-progress' },
          { text: 'Fiscal Code', link: '/in-progress' },
          { text: 'Addresses', link: '/in-progress' },
          { text: 'Names', link: '/in-progress' },
          { text: 'Last Names', link: '/in-progress' },
          { text: 'Places', link: '/in-progress' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Overview', link: '/guide/' },
          { text: 'Basic Usage', link: '/guide/installation' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dawit-io/it-faker' }  // Update with your repo
    ]
  }
})