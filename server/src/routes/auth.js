'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const config = require('./../configuration/config.json')
const token = require('./../auth/token')

const router = new Router({ prefix: '/api/oauth' })

/**
 * Authenticate
 * 
 * Calls the Autodesk authenticate URL
 */
router.get(
  '/authenticate',
  passport.authenticate(
    'oauth2',
    { scope: config.scope }
  ))

/**
 * Get the Forge App Callback
 * 
 * Retrieves the access and refresh tokens
 * from the Forge App callback URL
 */
router.get(
  '/callback',
  ctx => {
    return passport.authenticate(
      'oauth2',
      async (err, user) => {
        if (err) ctx.throw(err)
        const tokenSession = new token(ctx.session)
        await ctx.login(user)
        tokenSession.setPublicCredentials(user)
        ctx.redirect(`${config.vuehost}/auth?isUserLoggedIn=true`)
      })(ctx)
  })

/** 
 * Log out
 * 
 * If you need to completely log out from Forge
 * you will need to implement on the client-side
 * the steps documented in the below Forge article
 * https://forge.autodesk.com/blog/log-out-forge
 */
router.get(
  '/logout',
  ctx => {
    ctx.logout()
    ctx.body = {
      success: true,
      message: 'Log out operation complete'
    }
  }
)

module.exports = router
