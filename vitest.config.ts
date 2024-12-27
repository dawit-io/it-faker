import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: [
                'src/lib/**/*.{js,ts,jsx,tsx}',
                '!src/lib/types/**',
            ]
        },
        include: ['tests/**/*.spec.ts'],
    },
})