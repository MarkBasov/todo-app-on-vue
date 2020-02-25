<template>
  <div id="todoChange">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Notes from './components/NotesList.vue';

@Component
export default class App extends Vue {}
</script>

<style lang="less">
body {
  background-color: #edeef0;
}
#todoChange {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
