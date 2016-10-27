<template>
  <div class="hello">
    <h2>{{ totalMovies }} movies in theaters this week</h2>

    <form class="form-inline" action="/" @submit.prevent="boom">
      <input type="text" class="form-control" placeholder="search movie">
      <button type="submit" class="btn btn-primary" @click="getMovies">
        search
      </button>
    </form>
    <div class="panel panel-default media" v-for="movie in items">
      <div class="panel-body">
        <div class="media-left">
          <a href="#">
          <img class="media-object" v-bind:src="movie.posters.thumbnail" v-bind:alt="movie.title" v-bind:title="movie.title">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">{{ movie.title }}</h4>
          <h5>{{ movie.year }} - {{ movie.runtime }}mins - {{ movie.ratings.critics_score }}/100</h5>
          <p>{{ movie.synopsis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { movies } from '../mock'
  import debounce from 'lodash.debounce'
  import Resource from '../services/resource'
  import { mixin } from '../mixins/all'
  const resourceService = new Resource()

  export default {
    mixins: [mixin],
    data () {
      return {
        items: [],
        totalMovies: 0
      }
    },
    mounted: function () {
      window.addEventListener('scroll', debounce(this.handleScroll, 300))
      this.getMovies()
    },
    methods: {
      boom: function () {
        console.log('Woho')
      },
      getMovies: function () {
        resourceService.getMovies(1).then((result) => {
          this.items = result.movies
          this.totalMovies = result.total
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
