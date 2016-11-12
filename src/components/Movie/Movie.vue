<style src="./movie.scss" lang="scss"></style>

<template>
  <div class="panel panel-default media">
    <div class="panel-body movie-body" @click="getMovieDetails(movie.id)" v-bind:class="{ selected: detailedOn}">
      <div class="row">
        <div v-bind:class="[detailedOn? 'col-md-6' : 'col-md-12']">
          <div class="media-left">
            <a href="#">
              <img class="media-object" v-if="movie.poster_path != null" v-bind:src="`https://image.tmdb.org/t/p/w185/${movie.poster_path}`" v-bind:alt="movie.original_title" v-bind:title="movie.original_title" />
              <img v-else src="https://pbs.twimg.com/profile_images/789117657714831361/zGfknUu8.jpg" />
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{ movie.original_title }}</h4>
            <ul class="list-inline" v-show="detailedOn" v-if="movie.genres && movie.genres.length > 0">
              <li v-for="genre in movie.genres">{{ genre.name }}</li>
            </ul>
            <h5>{{ movie.release_date }} - {{ movie.vote_average }}</h5>

            <ul class="list-inline" v-if="movie.credits && movie.credits.cast.length > 0">
              <li>Starring:</li>
              <li v-for="(actor, index) in movie.credits.cast">
                <span v-if="index < 3">{{ actor.name }}</span>
              </li>
            </ul>

            <p>{{ movie.overview }}</p>

            <ul class="list-inline" v-if="movie.abridged_directors && movie.abridged_directors.length > 0">
              <li>Director(s)</li>
              <li v-for="(director, index) in movie.abridged_directors">
                <span v-if="index < 3">{{ director.name }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-show="detailedOn">
          <div class="col-md-6" v-if="movie.reviews && movie.reviews.length > 0">
            <h4 class="media-heading">Latest Reviews</h4>
            <div class="margin-top-bottom-m" v-for="review in movie.reviews">
              {{ review.content | truncate(150, "...")}}
              <div>
                <small>{{ review.author }}</small>
              </div>
            </div>
          </div>
          <div v-else class="col-md-6">
            No reviews found.
          </div>
        </div>
      </div>
      <div v-show="detailedOn" v-if="movie.similar && movie.similar.results.length > 0">
        <strong>Related:</strong>
        <span v-for="movie in movie.similar.results">
          <span>{{ movie.title }}</span>,
        </li>
      </div>
      <div class="loading-backdrop" v-show="loadingDetails">
        <img class="text-center loading-icon margin-top-bottom-m" src="../../assets/loading.svg" />
      </div>
    </div>
  </div>
</template>

<script>
  import Resource from '../../services/resource'
  import assign from 'lodash.assign'
  import APIURLS from '../../apiurls'

  const resourceService = new Resource()

  export default {
    props: ['movie'],
    data () {
      return {
        loadingDetails: false,
        detailedOn: false
      }
    },
    methods: {
      getMovieDetails: function (id) {
        // toggle between detailed movie card mode and normal mode
        this.detailedOn = !this.detailedOn
        if (this.movie.hasOwnProperty('genres')) {
          // avoid making an extra HTTP request if the data is already there
          return
        } else {
          // show the loading spinner and perform the HTTP requests
          this.loadingDetails = true
          resourceService.getMovies(`${APIURLS.movieDetails}/${id}`).then((result) => {
            assign(this.movie, result)
          })
          resourceService.getMovies(`${APIURLS.movieDetails}/${id}/reviews`).then((reviews) => {
            this.$set(this.movie, 'reviews', reviews.results)
            this.loadingDetails = false
          })
        }
      }
    },
    filters: {
      truncate: function (text, length, clamp) {
        clamp = clamp || '...'
        var node = document.createElement('div')
        node.innerHTML = text
        var content = node.textContent
        return content.length > length ? content.slice(0, length) + clamp : content
      }
    }
  }
</script>
