import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
// ./config/index.js is where the proxy is setup to overcome absence of CORS on the API
Vue.http.options.root = 'https://api.themoviedb.org/3'

export default class Resource {

  getMovies (url, currentPage, query) {
    let params = {
      params: {
        'page': currentPage,
        'api_key': '36081eca9a2ced64d616c59681881626',
        'query': query,
        'append_to_response': 'credits,similar'
      }
    }
    return Vue.http.get(url, params).then((response) => {
      return response.json()
    }).catch(function (e) {
      return false
    })
  }
}
