<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <h2>In theaters</h2>

    <div class="panel panel-default media" v-for="movie in movies">
      <div class="panel-body">
        <div class="media-left">
          <a href="#">
          <img class="media-object" v-bind:src="movie.posters.thumbnail" alt="...">
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">{{ movie.title }}</h4>
          <h5>{{ movie.year }} - {{ movie.runtime }}mins - {{ movie.ratings.critics_score }}/100</h5>
          <p>{{ movie.synopsis }}</p>
        </div>
      </div>
    </div>

    <form action="/" @submit.prevent="boom">
      <div class="error" v-show="!msg">
        Whatever
      </div>
      <input type="text" v-model="msg">
      <textarea v-model="msg"></textarea>
      <button type="submit" @click="updateCount">
        submit button
        {{ count }}
      </button>
    </form>
  </div>
</template>

<script>
  import { movies } from '../mock'
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        count: 0,
        movies: movies.movies
      }
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

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
