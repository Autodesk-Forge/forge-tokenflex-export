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

const Router = require('koa-router')
const rp = require('request-promise')

const config = require('config')
const router = new Router({ prefix: '/api/forge' })
const url = require('url')

const getOptions = (getUrl, ctx) => ({
  agentOptions: { secureProtocol: config.get('tlsversion') },
  headers: { Authorization: `Bearer ${ctx.session.passport.user.access_token}` },
  json: true,
  method: 'GET',
  url: getUrl
})

const getAuthedResponse = async (getUrl, ctx) => {
  if (ctx.isAuthenticated) {
    const response = await rp(getOptions(getUrl, ctx))
    ctx.body = JSON.stringify(response)
  } else {
    ctx.throw(401)
  }
}

router.get(
  '/reports/contract/:contract_number',
  async (ctx) => getAuthedResponse(url.resolve(config.get('API_host'), url.resolve(config.get('tokenflex_path'), `contract/${ctx.params.contract_number}`)), ctx)

)

router.get(
  '/reports/summary/:contract_number',
  async (ctx) => getAuthedResponse(url.resolve(config.get('API_host'), url.resolve(config.get('tokenflex_path'), `usage/${ctx.params.contract_number}/summary`)), ctx)

)

router.get(
  '/reports/contracts',
  async (ctx) => getAuthedResponse(url.resolve(config.get('API_host'), url.resolve(config.get('tokenflex_path'), 'contract')), ctx)

)

router.get(
  '/reports/:contract_number/query',
  async (ctx) => {
    if (ctx.isAuthenticated) {
      const options = {
        agentOptions: { secureProtocol: config.get('tlsversion') },
        body: {
          'fields': [
            'Geo',
            'Country',
            'productName'
          ],
          'metrics': [
            'tokensConsumed',
            'usageHours'
          ],
          'usageCategory': [
            'DESKTOP_PRODUCT'
          ],
          'where': 'contractYear>=2'
        },
        headers: { Authorization: `Bearer ${ctx.session.passport.user.access_token}`, 'Content-Type': 'application/json' },
        json: true,
        method: 'POST',
        uri: url.resolve(config.get('API_host'), url.resolve(config.get('tokenflex_path'), `usage/${ctx.params.contract_number}/query`))
      }
      let response = await rp(options)
      if (response.detail_uri) {
        let qurl = new URL(response.detail_uri, config.get('API_host'))
        let offset = Math.floor(Math.random() * (response.result.total - 1000))
        qurl.searchParams.set('offset', offset < 0 ? 0 : offset)
        qurl.searchParams.set('limit', 1000)
        response = await rp(Object.assign(options, { uri: qurl.href, method: 'GET' }))
      }
      ctx.body = JSON.stringify(response)
    } else {
      ctx.throw(401)
    }
  }
)

router.get(
  '/user/profile',
  async (ctx) => getAuthedResponse(url.resolve(config.get('API_host'), url.resolve(config.get('userprofile_path'), 'users/@me')), ctx)

)

module.exports = router // eslint-enable no-use-before-define
