module.exports = {
  ...require('./base.js'),
  extends: [
    ...require('./base.js').extends,
    'next/core-web-vitals',
    'plugin:@next/next/recommended'
  ],
  plugins: [...require('./base.js').plugins, '@next/next'],
  rules: {
    ...require('./base.js').rules,
    '@next/next/no-html-link-for-pages': 'off',
    'react/no-unescaped-entities': 'off'
  }
}