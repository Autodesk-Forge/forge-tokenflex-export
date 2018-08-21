'use strict'

const config = require('./default.json')
const fs = require('fs')

config.oauth2.authorizationURL = 'https://developer-stg.api.autodesk.com/authentication/v1/authorize'
config.oauth2.callbackURL = process.env.FORGE_CALLBACK_URL
config.oauth2.clientID = process.env.FORGE_CLIENT_ID
config.oauth2.clientSecret = process.env.FORGE_CLIENT_SECRET
config.oauth2.tokenURL = 'https://developer-stg.api.autodesk.com/authentication/v1/gettoken'
config.scope = ['data:read']

fs.writeFile(
  './src/configuration/config.json', 
  JSON.stringify(config, null, 2), 
  err => {
    if (err) {
      console.error(err)
      return
    }
    console.info('New configuration file has been created.\n')
})

module.exports = config
