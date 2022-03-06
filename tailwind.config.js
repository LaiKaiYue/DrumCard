module.exports = {
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    options: {
      safelist: [/^el-/]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
