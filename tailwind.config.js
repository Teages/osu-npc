const themeColor = 'indigo'

const colors = require('tailwindcss/colors')

const light = {
  ...require('daisyui/src/theming/themes').light,

  'primary': colors[themeColor][500],
  'primary-content': colors.white,
  'secondary': colors.purple[500],
  'secondary-content': colors.white,
  'accent': colors.cyan[500],
  'accent-content': colors.white,

  'success': colors.emerald[500],
  'success-content': colors.white,
  'warning': colors.yellow[500],
  'warning-content': colors.white,
  'error': colors.red[500],
  'error-content': colors.white,
  'info': colors.sky[500],
  'info-content': colors.white,

  'base-100': colors.zinc[100],
  'base-200': colors.zinc[200],
  'base-300': colors.zinc[300],
}

const dark = {
  ...require('daisyui/src/theming/themes').dracula,

  'primary': colors[themeColor][400],
  'secondary': colors.purple[400],
  'accent': colors.cyan[400],

  'success': colors.emerald[400],
  'warning': colors.yellow[400],
  'error': colors.red[400],
  'info': colors.sky[400],

  'base-100': colors.zinc[900],
  'base-200': colors.zinc[800],
  'base-300': colors.zinc[700],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './*.vue',
  ],
  theme: {
    container: {
      center: true, // https://tailwindcss.com/docs/container#centering-by-default
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light,
        dark,
      },
    ],
    base: false,
    logs: false,
  },
}
