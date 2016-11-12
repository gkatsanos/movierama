<template>
  <section>
    <h4 class="text-center">
      <strong>{{ totalMovies }}</strong>
      <span v-if="latestView">
        movies found
      </span>
      <span v-else>
        movies found
      </span>
    </h4>

    <form class="form-inline text-center margin-top-bottom-m" action="/" @submit.prevent="searchOnType(currentPage)">
      <input type="text" v-model="searchString" class="form-control input-lg" placeholder="search movie" @keyup="searchOnType(currentPage)">
      <button type="submit" class="btn btn-primary btn-lg">
        search
      </button>
    </form>
    <transition-group name="fade">
      <movie v-bind:movie="movie" v-for="movie in items" v-bind:key="movie.id"></movie>
    </transition-group>
    <div class="text-center">
      <img class="text-center loading margin-top-bottom-m" v-bind:class="{ invisible: !loading}" src="../../assets/loading.svg" />
    </div>
  </section>
</template>

<script>
  import movie from '../Movie/movie'
  import throttle from 'lodash.throttle'
  import debounce from 'lodash.debounce'
  import Resource from '../../services/resource'
  import APIURLS from '../../apiurls'
  const resourceService = new Resource()
  export default {
    components: {
      'movie': movie
    },
    data () {
      return {
        items: [],
        totalMovies: 0,
        currentPage: 1,
        loading: false,
        searchString: '',
        latestView: true
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('DOMContentLoaded', this.getMovies(APIURLS.theaters, 1, null))
    },
    methods: {
      searchOnType: debounce(function (currentPage) {
        this.totalMovies = 0
        this.latestView = false
        this.currentPage = 1
        if (this.searchString.length > 2) {
          this.getMovies(APIURLS.searchMovies, currentPage, this.searchString)
        }
      }, 400, {'leading': true, 'trailing': true}),
      getMovies: function (url, page, query) {
        this.loading = true
        resourceService.getMovies(url, page, query).then((result) => {
          this.items = result.results
          this.totalMovies = result.total_results
          this.loading = false
        })
      },
      handleScroll: throttle(function () {
        let d = document.body
        let scrollTop = d.scrollTop
        let windowHeight = window.innerHeight || document.documentElement.clientHeight
        let height = d.offsetHeight - windowHeight
        let scrollPercentage = (scrollTop / height)

        // if the scroll is more than 90% from the top, load more content.
        if (scrollPercentage > 0.90) {
          this.loading = true
          this.currentPage++
          // check to see if we're on "in theaters" mode or in search results mode
          if (this.latestView) {
            resourceService.getMovies(APIURLS.theaters, this.currentPage).then((result) => {
              this.items = this.items.concat(result.results)
              this.loading = false
            })
          } else {
            resourceService.getMovies(APIURLS.searchMovies, this.currentPage, this.searchString).then((result) => {
              this.items = this.items.concat(result.results)
              this.loading = false
            })
          }
        }
      }, 500)
    }
  }
</script>
