<template>
  <div class="hello">
    <h2>TODO FIX THIS movies in theaters this week</h2>

    <form class="form-inline" action="/" @submit.prevent="boom">
      <input type="text" class="form-control" placeholder="search movie">
      <button type="submit" class="btn btn-primary" @click="updateCount">
        search
      </button>
    </form>
    <div class="panel panel-default media" v-for="movie in movies">
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
  import { Resource } from '../services/resource'
  const resourceService = new Resource()
  export default {
    name: 'hello',
    data () {
      return {
        count: 0,
        movies: [],
        test: null
      }
    },
    mounted: function () {
      let that = this
      resourceService.getMovies().then(function (result) {
        that.movies = result.body
      })
    },
    methods: {
      boom: function () {
        console.log('Woho')
      },
      updateCount: function () {
        this.count++
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
