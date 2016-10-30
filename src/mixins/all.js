import $ from 'jquery'
import Resource from '../services/resource'
const resourceService = new Resource()

export let mixin = {
  methods: {
    handleScroll: function () {
      let d = document.body
      var scrollTop = d.scrollTop
      var windowHeight = window.innerHeight || document.documentElement.clientHeight
      var height = d.offsetHeight - windowHeight
      var scrollPercentage = (scrollTop / height)

      if (scrollPercentage > 0.55) {
        this.loading = true
      }
      // if the scroll is more than 90% from the top, load more content.
      if (scrollPercentage > 0.90) {
        this.currentPage++
        resourceService.getMovies('lists/movies/in_theaters.json', this.currentPage).then((result) => {
          this.items = this.items.concat(result.movies)
          this.loading = false
        })
      }
    }
  }
}
