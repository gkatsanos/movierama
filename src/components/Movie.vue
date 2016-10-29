<template>
  <div class="panel panel-default media">
    <div class="panel-body" @click="getMovieDetails(`movies/${movie.id}.json`,null)">
      <div class="media-left">
        <a href="#">
          <img class="media-object" v-bind:src="movie.posters.thumbnail" v-bind:alt="movie.title" v-bind:title="movie.title">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{ movie.title }}</h4>
        <ul class="list-inline">
          <li v-for="genre in movie.genres">{{ genre }}</li>
        </ul>
        <h5>{{ movie.year }} - {{ movie.runtime }}mins - {{ movie.ratings.critics_score }}/100</h5>
        <p>{{ movie.synopsis }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Resource from '../services/resource'
  import assign from 'lodash.assign'

  const resourceService = new Resource()

  export default {
    props: ['movie'],
    methods: {
      getMovieDetails: function (url, page, id) {
        this.loading = true
        resourceService.getMovies(url, page, id).then((result) => {
          console.log('getting details')
          assign(this.movie, result)
        })
      }
    }
  }
</script>
