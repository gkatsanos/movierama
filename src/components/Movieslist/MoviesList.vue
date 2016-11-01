<template>
  <section>
    <h4 class="text-center">
      <strong>{{ totalMovies }}</strong> movies in theaters this week
    </h4>

    <form class="form-inline text-center margin-top-bottom-m" action="/" @submit.prevent="getMovies('movies.json', currentPage, searchString)">
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
  // import { movies } from '../mock'
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
        flag: true
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('DOMContentLoaded', this.getMovies('lists/movies/in_theaters.json', 1, null))
    },
    methods: {
      searchOnType: debounce(function (currentPage) {
        this.flag = false
        this.currentPage = 1
        if (this.searchString.length > 2) {
          console.log(`Searching ${this.searchString}`)
          this.getMovies('movies.json', currentPage, this.searchString)
        }
      }, 400, {'leading': true, 'trailing': true}),
      getMovies: function (url, page, query) {
        console.log(query)
        this.loading = true
        resourceService.getMovies(url, page, query).then((result) => {
          this.items = result.movies
          this.totalMovies = result.total
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
          console.log('hit bottom!')
          this.loading = true
          this.currentPage++
          if (this.flag) {
            console.log('in full listing mode')
            resourceService.getMovies(APIURLS.theaters, this.currentPage).then((result) => {
              this.items = this.items.concat(result.movies)
              this.loading = false
            })
          } else {
            console.log('in search mode')
            resourceService.getMovies(APIURLS.searchMovies, this.currentPage, this.searchString).then((result) => {
              this.items = this.items.concat(result.movies)
              this.loading = false
            })
          }
        }
      }, 500)
    }
  }
</script>
