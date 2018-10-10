'use strict'

import Vue from 'vue'
import axios from 'axios'

import conf from './../config'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = conf.koahost
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || conf.koahost
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true // Check cross-site Access-Control
}

const _axios = axios.create(config)
const cancelToken = axios.CancelToken
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    },
    $cancelToken: {
      get () {
        return cancelToken
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
