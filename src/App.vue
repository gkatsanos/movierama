<style src="./styles/global.scss" lang="scss"></style>

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
  import movieslist from './components/Movieslist/movieslist'

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

      }
    }
  }
</script>
