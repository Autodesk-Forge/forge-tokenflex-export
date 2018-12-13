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
