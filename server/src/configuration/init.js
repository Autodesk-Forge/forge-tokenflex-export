'use strict'

const config = require('./default.json')
const fs = require('fs')

config.oauth2.authorizationURL = 'https://developer-stg.api.autodesk.com/authentication/v1/authorize'
config.oauth2.callbackURL = process.env.FORGE_CALLBACK_URL || process.argv[4]
config.oauth2.clientID = process.env.FORGE_CLIENT_ID || process.argv[2]
config.oauth2.clientSecret = process.env.FORGE_CLIENT_SECRET || process.argv[3]
config.oauth2.tokenURL = 'https://developer-stg.api.autodesk.com/authentication/v1/gettoken'
config.scope = ['data:read']

config.vuehost = process.env.HEROKU_VUE_HOST || config.vuehost

fs.writeFile(
  './src/configuration/config.js',
  `/* eslint-disable no-use-before-define */\nmodule.exports = ${JSON.stringify(config, null, 2).replace(/'/g, "\\'").replace(/"/g, "'")}\n/* eslint-enable no-use-before-define */\n`,
  err => {
    if (err) {
      console.error(err)
      return
    }
    console.info('New configuration file has been created.\n')
  })

/* eslint-disable no-use-before-define */
module.exports = config //
/* eslint-enable no-use-before-define */
