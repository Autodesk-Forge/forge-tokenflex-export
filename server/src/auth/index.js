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


const passport = require('koa-passport')
const OAuth2Strategy = require('passport-oauth2').Strategy

const config = require('config')

/**
 * Initiate 3-legged OAuth 2.0 Forge Strategy
 *
 * The configuration must be generated first
 * by running the script `npm run init`
 */
passport.use(
  new OAuth2Strategy(
    config.get('oauth2'),
    (accessToken, refreshToken, profile, done) => {
      if (accessToken && refreshToken) {
        const tokens = { access_token: accessToken, refresh_token: refreshToken }
        done(null, tokens)
      } else {
        done('An error occurred!')
      }
    }
  )
)

passport.serializeUser(
  (user, done) => {
    done(null, user)
  }
)

passport.deserializeUser(
  (user, done) => {
    done(null, user)
  }
)
