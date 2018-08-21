'use strict'

const Router = require('koa-router')
const rp = require('request-promise')

const config = require('./../configuration/config.json')
const router = new Router({ prefix: '/api' })

router.get(
  '/user/profile',
  async (ctx) => {
    if (ctx.isAuthenticated) {
      const options = {
        agentOptions: { secureProtocol: config.tlsversion },
        headers: { Authorization: `Bearer ${ctx.session.publicCredentials.access_token}` },
        json: true,
        method: 'GET',
        uri: 'https://developer.api.autodesk.com/userprofile/v1/users/@me'
      }
      const response = await rp(options)
      ctx.body = JSON.stringify(response)
    } else {
      ctx.throw(401)
    }
  }
)

module.exports = router
