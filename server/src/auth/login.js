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
const config = require('config')

const requireLogin = async (ctx, next) => {
  if (ctx.req.url.indexOf('/api/forge') === 0 && ctx.req.url.indexOf(new URL(config.get('oauth2.callbackURL')).pathname) !== 0) {
    if (ctx.isAuthenticated()) {
      await next()
    } else if (ctx.session && ctx.session.publicCredentials && ctx.session.publicCredentials.access_token) {
      await next()
    } else {
      ctx.status = 401
      ctx.body = {
        errors: [{ title: 'Login required', status: 401 }]
      }
    }
  }
}
module.exports = requireLogin
