import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// ./config/index.js is where the proxy is setup to overcome absence of CORS on the API
Vue.http.options.root = '/api/public/v1.0'
Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://api.rottentomatoes.com/'

export default class Resource {

  getMovies (url, currentPage, query) {
    let params = {
      params: {
        'page_limit': 10,
        'page': currentPage,
        'country': 'us',
        'apikey': '*****',
        'q': query
      }
    }
    return Vue.http.get(url, params).then((response) => {
      return response.json()
    }).catch(function (e) {
      return false
    })
  }
}
