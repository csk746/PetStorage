module.exports = {
  TOKEN_KEY: 'TOKEN_KEY',
  useDev: false,
  useProd: false,
  useLocal: true,
  appId: 'polipan',
  local: {
    //url: 'http://127.0.0.1:9000'
    //url: 'http://localhost:9000'
    //url: 'http://192.168.55.197:9000'
    //url: 'http://172.21.26.48:9000'
    url: 'http://ghdoc.com:9000'

  },
  dev: {
    // url: 'https://dev.polipankorea.com'
    //  url: 'http://192.168.1.2:3000'
  },
  prod: {
    url: 'https://app.polipankorea.com'
  }
}
