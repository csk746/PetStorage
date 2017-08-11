'use strict'

import CONFIG from './config'
import _ from 'underscore'
const QS = require('querystringify')

export class Server {
  initialize() {
    this.API_BASE_URL =
      CONFIG.useLocal ? CONFIG.local.url :
        CONFIG.useDev ? CONFIG.dev.url :
          CONFIG.prod.url
  }

  // CDN_POLITICIANS(picture_key) {
  //   return 'http://polipan-politicians.s3-website.ap-northeast-2.amazonaws.com/' + picture_key + '.jpg'
  // }

  // CDN_USERS(user_id, picture_key) {
  //   return 'http://polipan-users.s3-website.ap-northeast-2.amazonaws.com/' + user_id + '-' + picture_key + '.jpg'
  // }

  // async uploadPicture(authToken, data) {
  //   return await this._fetch({
  //     method: 'POST',
  //     url: '/my/picture/upload',
  //     headers: {
  //       'Authorization': 'Bearer ' + authToken,
  //     },
  //     body: {
  //       data
  //     }
  //   })

  // }

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