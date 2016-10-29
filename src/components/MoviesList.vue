<template>
  <section>
    <h4 class="text-center">
      <strong>{{ totalMovies }}</strong> movies in theaters this week
    </h4>

    <form class="form-inline" action="/" @submit.prevent="boom">
      <input type="text" class="form-control" placeholder="search movie">
      <button type="submit" class="btn btn-primary" @click="getMovies">
        search
      </button>
    </form>
    <transition-group name="fade">
      <movie v-bind:movie="movie" v-for="movie in items" v-bind:key="movie"></movie>
    </transition-group>
    <div class="text-center">
      <img class="text-center loading margin-top-bottom-m" v-bind:class="{ invisible: !loading}" src="../assets/loading.svg" />
    </div>
  </section>
</template>

<script>
  // import { movies } from '../mock'
  import movie from './movie'
  import throttle from 'lodash.throttle'
  import Resource from '../services/resource'
  import { mixin } from '../mixins/all'
  const resourceService = new Resource()

  export default {
    mixins: [mixin],
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
    destroyed: function () {
      window.removeEventListener('scroll', throttle(this.handleScroll, 450))
    },
    methods: {
      getMovies: function (url, page, id) {
        this.loading = true
        resourceService.getMovies(url, page, id).then((result) => {
          this.items = result.movies
          this.totalMovies = result.total
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  h1, h2 {
    font-weight: normal;
  }

  .margin-top-bottom-m {
    margin: 15px 0;
  }
  a {
    color: #42b983;
  }
</style>
