'use strict'

import CONFIG from './config'
import _ from 'underscore'

export class Server {
  initialize() {
    this.API_BASE_URL =
      CONFIG.useLocal ? CONFIG.local.url :
        CONFIG.useDev ? CONFIG.dev.url :
          CONFIG.prod.url
  }

  async test() {
    return await this._fetch({
      method: 'GET',
      url: '/test',
    })
  }

  async register(email, password) {
    return await this._fetch({
      method: 'POST',
      url: '/auth/signup',
      body: {
        email,
        password,
      }
    })
  }


  async validateAuthToken(authToken) {
    return await this._fetch({
      method: 'GET',
      url: '/auth/validate',
      headers: {
        'Authorization': 'Bearer ' + authToken,
      }
    })
  }

  async refreshAuthToken(refreshToken) {
    return await this._fetch({
      method: 'GET',
      url: '/auth/refresh',
      headers: {
        'Authorization': 'Bearer ' + refreshToken,
      }
    })
  }

  async getUrlList(params){
    return this._fetch({
        method : 'GET',
        url : '/storage/list/' + params.petId + '?' + params.param,
    })
  }

  async login(params){
    return this._fetch({
        method : 'POST',
        url : '/user/login',
        body : {
          loginId : params.loginId,
          password : params.password
        }
    })
  }

  async _fetch(opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null,
      headers: {}
    }, opts)

    if (opts.method === 'POST' || opts.method === 'PUT') {
      opts.headers['Content-Type'] = 'application/json'
      if (opts.body) {
        opts.body = JSON.stringify(opts.body)
      }
    }

    try {
      console.log('Fetch:', this.API_BASE_URL + opts.url)
      let res = await fetch(this.API_BASE_URL + opts.url, opts)
      let data = await res.json()
      if (res.status >= 200 && res.status < 400) {
        return data
      } else {
        throw (res.status, data)
      }

    } catch (err) {
      console.log(opts, err)
      throw (err)
    }

  }
}

export let server = new Server()
