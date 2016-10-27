<template>
  <div id="app" class="container">
    <div class="text-center">
      <a href="/">
        <img class="logo" src="./assets/logo.png" />
      </a>
    </div>
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
