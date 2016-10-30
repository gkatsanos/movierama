<template>
  <section>
    <h4 class="text-center">
      <strong>{{ totalMovies }}</strong> movies in theaters this week
    </h4>

    <form class="form-inline text-center margin-top-bottom-m" action="/" @submit.prevent="getMovies('movies.json', currentPage, 'mars')">
      <input type="text" class="form-control input-lg" placeholder="search movie" @keydown="getMovies('movies.json', currentPage, 'mars')">
      <button type="submit" class="btn btn-primary btn-lg" @click="getMovies('movies.json', currentPage, 'impossible')">
        search
      </button>
    </form>
    <transition-group name="fade">
      <movie v-bind:movie="movie" v-for="movie in items" v-bind:key="movie"></movie>
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
        loading: false
      }
    },
    mounted: function () {
      window.addEventListener('scroll', throttle(this.handleScroll, 450))
      this.getMovies('lists/movies/in_theaters.json', 1, null)
    },
    methods: {
      getMovies: function (url, page, query) {
        this.loading = true
        resourceService.getMovies(url, page, query).then((result) => {
          this.items = result.movies
          this.totalMovies = result.total
        })
      },
      handleScroll: function () {
        let d = document.body
        let scrollTop = d.scrollTop
        let windowHeight = window.innerHeight || document.documentElement.clientHeight
        let height = d.offsetHeight - windowHeight
        let scrollPercentage = (scrollTop / height)

        // if the scroll is more than 90% from the top, load more content.
        if (scrollPercentage > 0.90) {
          this.loading = true
          this.currentPage++
          resourceService.getMovies('lists/movies/in_theaters.json', this.currentPage).then((result) => {
            this.items = this.items.concat(result.movies)
            this.loading = false
          })
        }
      }
    }
  }
</script>
