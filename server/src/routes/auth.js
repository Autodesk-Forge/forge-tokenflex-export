'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const Config = require('config-js')
const config = new Config('./src/configuration/config.js')
const Token = require('./../auth/token')

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
    { scope: config.get('scope') }
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
        const tokenSession = new Token(ctx.session)
        await ctx.login(user)
        let forgeSession = {
          oauth2: {
            auto_refresh: false,
            client_id: config.get('oauth2.clientID'),
            client_secret: config.get('oauth2.clientSecret'),
            expires_at: '',
            redirect_uri: config.get('oauth2.callbackURL'),
            scope: config.get('scope')
          }
        }
        tokenSession.setForgeSession(forgeSession)
        ctx.redirect(`${config.get('vuehost')}/auth?isUserLoggedIn=true`)
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

module.exports = router // eslint-enable no-use-before-define
