/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

'use strict'

const config = require('./default.json')
const fs = require('fs')
const configPath = `./config/${process.env.NODE_ENV === 'production' ? 'production' : 'default'}.json`
config.oauth2.authorizationURL = process.env.FORGE_AUTH_URL || config.oauth2.authorizationURL
config.oauth2.callbackURL = process.env.FORGE_CALLBACK_URL || process.argv[4]
config.oauth2.clientID = process.env.FORGE_CLIENT_ID || process.argv[2]
config.oauth2.clientSecret = process.env.FORGE_CLIENT_SECRET || process.argv[3]
config.oauth2.tokenURL = process.env.FORGE_TOKEN_URL || config.oauth2.tokenURL
config.scope = JSON.parse(process.env.FORGE_SCOPE || config.scope)
config.GoogleAPIKey = process.env.GoogleAPIKey || process.argv[5]
config.vuehost = process.env.VUE_HOST || (process.env.NODE_ENV === 'production' ? 'origin' : config.vuehost)

config.API_host = process.env.TOKENFLEX_API_HOST || config.API_host
config.tokenflex_path = process.env.TOKENFLEX_PATH || '/tokenflex/v1/'
config.tokenflex_path_nover = process.env.TOKENFLEX_PATH_NOVER || '/tokenflex/'
config.userprofile_path = process.env.USERPROFILE_PATH || '/userprofile/v1/'
config.logoutaccount_url = process.env.LOGOUTACCOUNT_URL || config.logoutaccount_url

fs.writeFile(
  configPath,
  JSON.stringify(config, null, 2),
  err => {
    if (err) {
      console.error(err)
      return
    }
    console.info(`New configuration file has been created at ${configPath}`)
  })

/* eslint-disable no-use-before-define */
module.exports = config //
/* eslint-enable no-use-before-define */
