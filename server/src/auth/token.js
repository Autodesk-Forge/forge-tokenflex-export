'use strict'

function Token (session) {
  this._oAuthTemplate = {
    'authentication': {
      'authorizationUrl': '/authentication/v1/authorize',
      'tokenUrl': '/authentication/v1/gettoken',
      'refreshTokenUrl': '/authentication/v1/refreshtoken',
      'scopes': {
        'data:read': 'The application will be able to read the end user’s data within the Autodesk ecosystem.',
        'data:write': 'The application will be able to create, update, and delete data on behalf of the end user within the Autodesk ecosystem.',
        'data:create': 'The application will be able to create data on behalf of the end user within the Autodesk ecosystem.',
        'data:search': 'The application will be able to search the end user’s data within the Autodesk ecosystem.',
        'bucket:create': 'The application will be able to create an OSS bucket it will own.',
        'bucket:read': 'The application will be able to read the metadata and list contents for OSS buckets that it has access to.',
        'bucket:update': 'The application will be able to set permissions and entitlements for OSS buckets that it has permission to modify.',
        'bucket:delete': 'The application will be able to delete a bucket that it has permission to delete.',
        'code:all': 'The application will be able to author and execute code on behalf of the end user (e.g., scripts processed by the Design Automation API).',
        'account:read': 'For Product APIs, the application will be able to read the account data the end user has entitlements to.',
        'account:write': 'For Product APIs, the application will be able to update the account data the end user has entitlements to.',
        'user-profile:read': 'The application will be able to read the end user’s profile data.',
        'viewables:read': 'The application will have read access to viewable resources such as thumbnails. This scope is a subset of data:read.'
      }
    },
    'authName': 'oauth2_access_code',
    'clientId': '',
    'clientSecret': '',
    'credentials': {
      'expires_at': 0
    },
    'autoRefresh': false,
    'basePath': 'https://developer.api.autodesk.com',
    'scope': 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete',
    'redirectUri': ''
  }
  this._session = session
}

Token.prototype.getInternalOAuth = function () {
  // reconstruct JSON structure per template
  const internalOAuth = this._oAuthTemplate
  internalOAuth.clientId = this._session.internalOAuth.clientId
  internalOAuth.clientSecret = this._session.internalOAuth.clientSecret
  internalOAuth.credentials.expires_at = this._session.internalOAuth.expiresAt
  internalOAuth.autoRefresh = this._session.internalOAuth.autoRefresh
  internalOAuth.scope = this._session.internalOAuth.scope
  internalOAuth.redirectUri = this._session.internalOAuth.redirectUri
  return internalOAuth
}

Token.prototype.setInternalOAuth = function (internalOAuth) {
  this._session.internalOAuth = internalOAuth
}

Token.prototype.getPublicOAuth = function () {
  // reconstruct JSON structure per template
  const publicOAuth = this._oAuthTemplate
  publicOAuth.clientId = this._session.publicOAuth.clientId
  publicOAuth.clientSecret = this._session.publicOAuth.clientSecret
  publicOAuth.credentials.expires_at = this._session.publicOAuth.expiresAt
  publicOAuth.autoRefresh = this._session.publicOAuth.autoRefresh
  publicOAuth.scope = this._session.publicOAuth.scope
  publicOAuth.redirectUri = this._session.publicOAuth.redirectUri
  return publicOAuth
}

Token.prototype.setPublicOAuth = function (publicOAuth) {
  this._session.publicOAuth = publicOAuth
}

Token.prototype.getInternalCredentials = function () {
  return this._session.internalCredentials
}

Token.prototype.setInternalCredentials = function (internalCredentials) {
  this._session.internalCredentials = internalCredentials
}

Token.prototype.getPublicCredentials = function () {
  return this._session.publicCredentials
}

Token.prototype.setPublicCredentials = function (publicCredentials) {
  this._session.publicCredentials = publicCredentials
}

Token.prototype.isAuthorized = function () {
  // !! converts value into boolean
  return (!!this._session.publicCredentials)
}

module.exports = Token
