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

  /**
   * user api
   **/
  async getUser(params) {

    return this._fetch({
      method: 'GET',
      url: '/user/detail/' + params.userId,
    })
  }


  /**
   * friend api
   **/

  async getFriendPets(userId) {
    return this._fetch({
      method: 'GET',
      url: '/friend/user/' + userId,
    })
  }

  async requestFriendPet(petId) {
    return this._fetch({
      method: 'POST',
      url: '/friend/request/' + petId,
    })
  }

  /**
   * pet api
   **/

  async setPetProfile(petId, url) {
    return this._fetch({
      method: 'POST',
      url: '/pet/profile',
      body: {
        id: petId,
        url: url
      }
    })
  }

  async setDefaultPet(petId) {
    return this._fetch({
      method: 'POST',
      url: '/pet/defaultPet',
      body: {
        id: petId,
      }
    })
  }


  async addPet(name, kind) {
    console.log ( " addPet server call : " + name + " , " + kind)
    return this._fetch({
      method: 'POST',
      url: '/pet/addPet',
      body: {
        name: name,
        kind: kind,
      }
    })
  }


  async getPet(params) {
    return this._fetch({
      method: 'GET',
      url: '/pet/detail/' + params.petId,
    })
  }

  async getMyPetList(params) {
    return this._fetch({
      method: 'GET',
      url: '/pet/list',
    })
  }

  /**
   * friend api
   **/
  async findFollowPets() {
    return this._fetch({
      method: 'GET',
      url: '/friend/pet',
    })
  }

  async setAccessControl(id, ac) {
    return this._fetch({
      method: 'POST',
      url: '/friend/accessControl',
      body: {
        id: id ,
        accessControl: ac
      }
    })
  }



  async getReceiveRequests() {
    return this._fetch({
      method: 'GET',
      url: '/friend/request/receive',
    })
  }

  async requestFriend(petId) {
    return this._fetch({
      method: 'POST',
      url: '/friend/request/' + petId,
    })
  }

  async approveFriend(petId, userId) {
    return this._fetch({
      method: 'POST',
      url: '/friend/approve/' + petId + '/' + userId,
    })
  }

  async rejectFriend(petId, userId) {
    return this._fetch({
      method: 'POST',
      url: '/friend/reject/' + petId + '/' + userId,
    })
  }

  /**
   * storage api
   **/
  async getUrlList(petId) {
    return this._fetch({
      method: 'GET',
      url: '/storage/list/' + petId,
    })
  }

  async uploadPhoto(params) {
    let formData = new FormData();
    formData.append('image', { uri: params.url, type: 'image/jpg', name: '1.jpg' })

    console.log("petId : " + params.petId)
    console.log("url :" + params.url)

    return this._fetch({
      method: 'POST',
      url: '/storage/image/' + params.petId,
      headers: { "Accept": "multipart/form-data", "Content-Type": "multipart/form-data" },
      body: formData
    })
  }


  /**
   * story api
   **/
  async iLikeStroy(params) {
    return this._fetch({
      method: 'PUT',
      url: '/story/' + params.storyId
    })
  }

  async addComment(params) {
    return this._fetch({
      method: 'POST',
      url: '/story/comment',
      body: {
        id: params.storyId,
        comment: params.comment
      }
    })
  }

  async getStoryList(params) {
    return this._fetch({
      method: 'POST',
      url: '/story/list',
      body: {
        petId: params.petId,
        page: params.page,
        offset: params.offset,
        order: params.order,
        field: params.field,
      }
    })
  }

  async createPosting(petId, url, content) {
    return this._fetch({
      method: 'POST',
      url: '/story',
      body: {
        id: petId,
        url: url,
        content: content
      }
    })
  }

  /**
   * login api
   **/
  async login(params) {
    return this._fetch({
      method: 'POST',
      url: '/user/login',
      body: {
        loginId: params.loginId,
        password: params.password
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
      if (opts.headers['Content-Type'] == null) {
        opts.headers['Content-Type'] = 'application/json'
        if (opts.body) {
          console.log(" json obj : " + opts.body)

          opts.body = JSON.stringify(opts.body)
        }
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
