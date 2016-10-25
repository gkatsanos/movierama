<template>
  <div id="app" class="container">
    <img class="logo" src="./assets/logo.png" />
    <movieslist></movieslist>
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
  .logo {
    width: 250px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
