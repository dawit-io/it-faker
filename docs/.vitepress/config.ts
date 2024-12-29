import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "IT Faker",
  description: "IT-Faker: Italian Data Generator based on Faker.js",
  ignoreDeadLinks: true, // this is temporary until we have all the pages
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
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Cli Usage', link: '/cli' },
        ]
      },
      {
        text: 'Modules',
        items: [
          { text: 'Overview', link: '/modules/' },
          { text: 'Person', link: '/modules/person' },
          { text: 'Fiscal Code', link: '/modules/fiscal-code' },
          { text: 'First Names', link: '/modules/first-name' },
          { text: 'Last Names', link: '/modules/last-name' },
          { text: 'Places', link: '/modules/places' },
          { text: 'Address', link: '/modules/address' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Overview', link: '/examples/' },
          { text: 'Basic Usage', link: '/examples/basic-example' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dawit-io/it-faker' }
    ]
  }
})