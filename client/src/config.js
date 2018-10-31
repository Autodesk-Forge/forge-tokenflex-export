'use strict'

module.exports = {
  koahost: process.env.VUE_APP_HEROKU_KOA_HOST === 'origin' ? location.origin : (process.env.VUE_APP_HEROKU_KOA_HOST || 'http://localhost:5000')
}
