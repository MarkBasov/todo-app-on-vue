<template>
  <div class="modal-wrapper">
    <div class="modal-container">

      <div class="modal-header">
        <slot name="header">
          Создание новой заметки
        </slot>
        <span>
          <i class="closeIcon" v-on:click="closePopup">close</i>
        </span>
      </div>

      <div class="modal-body">
        <slot name="body">
          <input class="noteName" v-model="message" placeholder="Введите имя заметки">
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          default footer
          <button class="modal-default-button">
            OK
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ModalWindow extends Vue {
  private closePopup(): void {
    this.$emit('closePopup');
  }
}
</script>
<style lang="less">

.modal-wrapper {
  max-width: 600px;
  max-height: 300px;
  position: relative;
  background: #fff;
  box-shadow: 0 0 17px 0 #e7e7e7;
  .modal-container {
    display: contents;
    .modal-body {
      display: flex;
      justify-content: center;
      align-items: center;
      .noteName {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
