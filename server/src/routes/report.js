'use strict'

const Router = require('koa-router')
const rp = require('request-promise')

const Config = require('config-js')
const config = new Config('./src/configuration/config.js')
const router = new Router({ prefix: '/api' })

router.get(
  '/reports/contract/:contract_number',
  async (ctx) => {
    if (ctx.isAuthenticated) {
      const options = {
        agentOptions: { secureProtocol: config.get('tlsversion') },
        headers: { Authorization: `Bearer ${ctx.session.passport.user.access_token}` },
        json: true,
        method: 'GET',
        url: `https://developer-stg.api.autodesk.com/eccr-data-api/v1/contract/${this.params.contract_number}`
      }
      const response = await rp(options)
      ctx.body = JSON.stringify(response)
    } else {
      ctx.throw(401)
    }
  }
)

router.get(
  '/reports/contracts',
  async (ctx) => {
    if (ctx.isAuthenticated) {
      const options = {
        agentOptions: { secureProtocol: config.get('tlsversion') },
        headers: { Authorization: `Bearer ${ctx.session.passport.user.access_token}` },
        json: true,
        method: 'GET',
        url: 'https://developer-stg.api.autodesk.com/eccr-data-api/v1/contract'
      }
      const response = await rp(options)
      ctx.body = JSON.stringify(response)
    } else {
      ctx.throw(401)
    }
  }
)

router.get(
  '/user/profile',
  async (ctx) => {
    if (ctx.isAuthenticated) {
      const options = {
        agentOptions: { secureProtocol: config.get('tlsversion') },
        headers: { Authorization: `Bearer ${ctx.session.passport.user.access_token}` },
        json: true,
        method: 'GET',
        uri: 'https://developer-stg.api.autodesk.com/userprofile/v1/users/@me'
      }
      const response = await rp(options)
      ctx.body = JSON.stringify(response)
    } else {
      ctx.throw(401)
    }
  }
)

module.exports = router // eslint-enable no-use-before-define
