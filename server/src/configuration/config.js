/* eslint-disable no-use-before-define */
module.exports = {
  'favicon': '/public/favicon.ico',
  'oauth2': {
    'authorizationURL': 'https://developer-stg.api.autodesk.com/authentication/v1/authorize',
    'clientID': 'r51MKhr7F3kRzKGNi4d5kIgg5c3Ge727',
    'clientSecret': 'ViVFIGu6XAQcrrHV',
    'callbackURL': 'http://localhost:5000/api/oauth/callback',
    'tokenURL': 'https://developer-stg.api.autodesk.com/authentication/v1/gettoken'
  },
  'http_port': 5000,
  'https_port': 5001,
  'scope': [
    'data:read'
  ],
  'session': {
    'maxAge': 3600000,
    'overwrite': true,
    'httpOnly': true,
    'signed': true,
    'rolling': false,
    'renew': false
  },
  'tlsversion': 'TLSv1_2_method',
  'vuehost': 'http://localhost:8080'
}
/* eslint-enable no-use-before-define */
