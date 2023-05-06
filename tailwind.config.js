// const colors = require('tailwindcss/colors')

module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      colors: {
        "brand": {
          "light-gray": "#9DA3AE",
          "dark-gray": "#4D5562",
          blue: "#426FAE",
          "light-mint": "#D9F9E6",
          "dark-mint": "#347659",
          dark: "#0D121C"
        }
      },
    },
    plugins: [],
  }
}
