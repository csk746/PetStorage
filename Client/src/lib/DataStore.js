import _ from 'underscore'

export default class DataStore {
  constructor(dataStore) {
    this.referenced = {}
    this.cached = {}
    if (dataStore) {
      for (var item in dataStore.referenced) {
        this.referenced[item] =
          {
            id: dataStore.referenced[item].id,
            isReferenced: dataStore.referenced[item].isReferenced,
            isLoading: dataStore.referenced[item].isLoading,
            data: _.clone(dataStore.referenced[item].data)
          }
      }
      for (var item in dataStore.cached) {
        this.cached[item] =
          {
            id: dataStore.cached[item].id,
            isReferenced: dataStore.cached[item].isReferenced,
            isLoading: dataStore.cached[item].isLoading,
            data: _.clone(dataStore.cached[item].data)
          }
      }
    }
  }

  getItem(id) {
    var i = this.referenced[id]
    if (i) {
      return i
    }
    else {
      return null
    }
  }

  forEach(cb) {
    for (var item in this.referenced) {
      cb(this.referenced[item])
    }
    for (var item in this.cached) {
      cb(this.referenced[item])
    }
  }

  getData(id, def) {
    var i = this.getItem(id)
    if (i && i.isLoading === false) {
      return i.data
    }
    else {
      return def
    }
  }

  getIsLoading(id) {
    var i = this.getItem(id)
    if (i) {
      return i.isLoading
    }
    else {
      return true
    }
  }

  unmount(id) {
    var i = this.referenced[id]
    if (i && i.isReferenced === true) {
      i.isReferenced = false
      if (i.isLoading === false) {
        this.cached[id] = i
        delete this.referenced[id]
      }
    }
    else {
      throw ("Unexpected error")
    }
    return this
  }

  response(id, item) {
    var i = this.referenced[id]
    if (i && i.isLoading === true) {
      i.isLoading = false
      i.data = item
    }
    else {
      throw ("Unexpected error")
    }
    return this
  }

  mount(id) {
    var i = this.referenced[id]
    if (i) {
      i.isReferenced = true
      i.isLoading = true
    }
    else {
      var i = this.cached[id]
      if (i) {
        i.isReferenced = true
        i.isLoading = true
        this.referenced[id] = i
        delete this.cached[id]
      }
      else {
        i = { id, isReferenced: true, isLoading: true, data: null }
        this.referenced[id] = i
      }
    }
    return this
  }

  concat(id, item) {
    var i = this.referenced[id]
    if (i) {
      i.data = i.data.concat(item)
    }
    else {
      throw ("Unexpected error")
    }
    return this
  }
}