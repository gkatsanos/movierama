<template>
  <div id="app">
    <img src="./assets/logo.png">
    <movieslist></movieslist>
    <div>
      Root component <br>
      {{ count }}
    </div>
    <button @click="updateCount">
      click here
    </button>
  </div>
</template>

<script>
  import movieslist from './components/movieslist'

  export default {
    name: 'app',
    components: {
      movieslist
    },
    methods: {
      updateCount: function () {
        this.count++
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        count: 0
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
