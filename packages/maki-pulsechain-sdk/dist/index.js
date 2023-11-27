
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./maki-pulsechain-sdk.cjs.production.min.js')
} else {
  module.exports = require('./maki-pulsechain-sdk.cjs.development.js')
}
