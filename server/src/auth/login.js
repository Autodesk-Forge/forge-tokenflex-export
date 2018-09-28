'use strict'

const requireLogin = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next()
  } else if (ctx.session && ctx.session.publicCredentials.access_token) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      errors: [{ title: 'Login required', status: 401 }]
    }
  }
}
module.exports = requireLogin // eslint-enable no-use-before-define
