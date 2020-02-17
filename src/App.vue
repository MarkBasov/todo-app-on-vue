<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Notes headerMsg="Welcome to my test task"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notes from './components/NotesList.vue';

@Component({
  components: {
    Notes,
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
body {
  background-color: #edeef0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
