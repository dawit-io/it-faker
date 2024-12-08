import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ItFaker',
      fileName: (format) => `it-faker.${format}.js`
    },
    rollupOptions: {
      external: ['@faker-js/faker'],
      output: {
        globals: {
          '@faker-js/faker': 'Faker'
        }
      }
    }
  },
  root: './playground',
  resolve: {
    alias: {
      '@lib': resolve(__dirname, './src/lib'),
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'node'
  }
})