/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./docs/.vitepress/**/*.{js,vue,ts,jsx,tsx}",
    "./docs/**/*.{md,vue,js,ts,jsx,tsx}",
    '.vitepress/**/*.{vue,js,ts,jsx,tsx,md}',
    'docs/**/*.{vue,js,ts,jsx,tsx,md}',
    'components/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/typography')
  ]
}