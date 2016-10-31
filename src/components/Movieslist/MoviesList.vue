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
        searchString: ''
      }
    },
    mounted: function () {
      window.addEventListener('scroll', throttle(() => this.handleScroll('lists/movies/in_theaters.json'), 450))
      this.getMovies('lists/movies/in_theaters.json', 1, null)
    },
    methods: {
      searchOnType: debounce(function (currentPage) {
        console.log(`Searching ${this.searchString}`)
        this.getMovies('movies.json', currentPage, this.searchString)
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
      handleScroll: function (url) {
        let d = document.body
        let scrollTop = d.scrollTop
        let windowHeight = window.innerHeight || document.documentElement.clientHeight
        let height = d.offsetHeight - windowHeight
        let scrollPercentage = (scrollTop / height)

        // if the scroll is more than 90% from the top, load more content.
        if (scrollPercentage > 0.90) {
          this.loading = true
          this.currentPage++
          resourceService.getMovies(url, this.currentPage).then((result) => {
            this.items = this.items.concat(result.movies)
            this.loading = false
          })
        }
      }
    }
  }
</script>
