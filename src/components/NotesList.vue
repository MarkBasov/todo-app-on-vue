<template>
  <div class="hello">
    <h1>{{ headerMsg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>My task desc</h3>
    <button v-on:click="showPopupCreate">Добавить</button>
    <ModalWindow class="popupCreate" v-if="isCreatePopup" @closePopup="closePopup"> </ModalWindow>
    <ul>
      <li>
        <div id="note"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import ActionNoteButton from './Button.vue';
import ModalWindow from './ModalWindow.vue';

@Component({
  components: {
    ModalWindow,
  },
})
export default class Notes extends Vue {
  @Prop() private headerMsg!: string;

  private isCreatePopup = false;

  protected created() {
    this.isCreatePopup = false;
  }

  private closePopup(): void {
    this.isCreatePopup = false;
  }

  private showPopupCreate() {
    this.isCreatePopup = true;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.popupCreate {
  position: absolute;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 10px;

  &:hover {
    box-shadow:
    1px 1px #979797,
    2px 2px #979797,
    3px 3px #979797,
    4px 4px #979797,
    5px 5px #979797,
    6px 6px #979797,
    7px 7px #979797;
    -webkit-transform: translateX(-7px);
    transform: translateX(-7px);
    -webkit-transition: all 0.3s ease;;
    -moz-transition: all 0.3s ease;;
    -o-transition: all 0.3s ease;;
    transition: all 0.3s ease;
  }
}
a {
  color: #42b983;
}
#note {
  border: 1px;
  height: 200px;
  width: 400px;
  background-color: #fff;
}
</style>
