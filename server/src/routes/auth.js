
'use strict'

const passport = require('koa-passport')
const Router = require('koa-router')

const config = require('config')
const Token = require('./../auth/token')

const router = new Router({ prefix: '/api/oauth' })
const url = require('url')
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
        ctx.redirect(url.resolve(config.get('vuehost') === 'origin' ? `http://${ctx.req.headers.host}` : config.get('vuehost'), '/?isUserLoggedIn=true'))
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

router.get(
  '/logoutaccount',
  ctx => ctx.redirect(config.get('logoutaccount_url'))
)

module.exports = router // eslint-enable no-use-before-define
