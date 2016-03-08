require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Castor',
    head: {
      titleTemplate: 'Castor: %s',
      meta: [
        {name: 'description', content: 'Blogging platform for students'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Castor'},
        {property: 'og:locale', content: 'ru_RU'},
        {property: 'og:title', content: 'Castor'},
        {property: 'og:description', content: 'Blogging platform for students'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: 'http://katakana.me'},
        {property: 'og:creator', content: '@codejunkienick'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
