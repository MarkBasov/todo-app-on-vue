<template>
  <div class="wrapper">
    <h1>{{ headerMsg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Список заметок</h3>
    <button class="btn_showPopup" v-on:click="showPopupCreate">
      &#10010; Создать новую заметку
    </button>
    <div v-bind:class="{ popup_wrapper: isActive }">
      <ModalWindow class="popupCreate" v-if="isCreatePopup" @closePopup="closePopup"> </ModalWindow>
    </div>
    <div class="boxNotes">
      <ul>
        <li>
          <div id="note"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ModalWindow from './ModalWindow.vue';

@Component({
  components: {
    ModalWindow,
  },
})
export default class Notes extends Vue {
  @Prop() private headerMsg!: string;

  private isCreatePopup = false;

  private isActive = false;

  private closePopup(): void {
    this.isCreatePopup = false;
    this.isActive = false;
    this.$emit('modalClosed');
  }

  private showPopupCreate(): void {
    this.isCreatePopup = true;
    this.isActive = true;
    this.$emit('modalOpened');
  }
}
</script>

<style lang="less">
.wrapper {
  .btn_showPopup {
    height: 28px;
    background: #63c383;
    border: none;
    cursor: pointer;
    outline: none;
    border-radius: 2px;

    &:hover {
      background: #3cb464;
    }
  }
  .popup_wrapper {
    background-color: rgba(0,0,0,0.54);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    overflow: auto;
    z-index: 10;

    .popupCreate {
      position: absolute;
      z-index: 11;
    }
  }
  h3 {
    margin: 40px 0 0;
  }
  .boxNotes {
    ul {
      list-style-type: none;
      padding: 0;

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
}
</style>
