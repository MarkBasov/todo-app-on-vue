<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Notes
      headerMsg="Welcome to my test task"/>
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

::-webkit-scrollbar { /* chrome based */
  width: 0px;  /* ширина scrollbar'a */
  background: transparent;  /* опционально */
}
body {
  background-color: #edeef0;
  -ms-overflow-style: none;  /* IE 10+ */
  scrollbar-width: none; /* Firefox */
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
