const baseConfig = require('@nyayavedik/config/tailwind/base.js')

module.exports = {
  ...baseConfig,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    ...baseConfig.theme,
    extend: {
      ...baseConfig.theme?.extend,
      fontFamily: {
        'instrument-sans': ['"Instrument Sans"', 'sans-serif'],
        'instrument-serif': ['"Instrument Serif"', 'serif'],
      }
    }
  }
}