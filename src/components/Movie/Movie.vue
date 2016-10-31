<style src="./movie.scss" lang="scss"></style>

<template>
  <div class="panel panel-default media">
    <div class="panel-body movie-body" @click="getMovieDetails(movie.id)" v-bind:class="{ selected: detailedOn}">
      <div class="row">
        <div v-bind:class="[detailedOn? 'col-md-6' : 'col-md-12']">
          <div class="media-left">
            <a href="#">
              <img class="media-object" v-bind:src="movie.posters.thumbnail" v-bind:alt="movie.title" v-bind:title="movie.title">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading">{{ movie.title }}</h4>
            <ul class="list-inline" v-bind:class="{ hidden: !detailedOn}">
              <li v-for="genre in movie.genres">{{ genre }}</li>
            </ul>
            <h5>{{ movie.year }} - {{ movie.runtime }} mins - {{ movie.ratings.critics_score }}/100</h5>

            <ul class="list-inline">
              <li>Starring:</li>
              <li v-for="(actor, index) in movie.abridged_cast">
                <span v-if="index < 3">{{ actor.name }}</span>
              </li>
            </ul>

            <p>{{ movie.synopsis }}</p>

            <ul class="list-inline" v-if="movie.abridged_directors && movie.abridged_directors.length > 0">
              <li>Director(s)</li>
              <li v-for="(director, index) in movie.abridged_directors">
                <span v-if="index < 3">{{ director.name }}</span>
              </li>
            </ul>

            <ul class="list-inline" v-bind:class="{ hidden: !detailedOn}" v-if="movie.similar && movie.similar.length > 0">
              <li>Related</li>
              <li v-for="movie in movie.similar">
                <span>{{ movie.title }}</span>
              </li>
            </ul>

          </div>
        </div>
        <div v-bind:class="{ hidden: !detailedOn}" >
          <div class="col-md-6" v-if="movie.reviews && movie.reviews.length > 0">
            <h4 class="media-heading">Latest Reviews</h4>
            <div class="margin-top-bottom-m" v-for="review in movie.reviews">
              {{ review.quote }}
              <div>
                <small>{{ review.critic }} | {{ review.date }}</small>
              </div>
            </div>
          </div>
          <div v-else class="col-md-6">
            No reviews found.
          </div>
        </div>
      </div>
      <div class="loading-backdrop" v-bind:class="{ hidden: !loadingDetails}">
        <img class="text-center loading-icon margin-top-bottom-m" src="../../assets/loading.svg" />
      </div>
    </div>
  </div>
</template>

<script>
  import Resource from '../../services/resource'
  import assign from 'lodash.assign'

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
        this.detailedOn = !this.detailedOn
        if (this.movie.hasOwnProperty('genres')) {
          return
        } else {
          this.loadingDetails = true
          resourceService.getMovies(`movies/${id}.json`).then((result) => {
            assign(this.movie, result)
          })
          resourceService.getMovies(`movies/${id}/reviews.json?page_limit=2`).then((result) => {
            this.$set(this.movie, 'reviews', result.reviews)
          })
          resourceService.getMovies(`movies/${id}/similar.json?limit=5`).then((result) => {
            this.$set(this.movie, {similar: result.movies})
            this.loadingDetails = false
          })
        }
      }
    }
  }
</script>
