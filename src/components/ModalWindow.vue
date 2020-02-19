<template>
  <div class="modal-wrapper">
    <div class="modal-container">

      <div class="modal-header">
        <slot name="header">
          <span>Создание новой заметки</span>
          <button class="close_btn" v-on:click="closePopup">&#10006;</button>
        </slot>
      </div>
      <div class="modal-body">
        <slot name="body">
          <input class="noteName" v-model="message" placeholder="Введите название заметки" />
          <ul>
            <li @v-for="(input, index) in inputs">
              <input type="text">
              <button @click="deleteRow(index)">Delete</button>
            </li>
          </ul>

          <button v-on:click="addRow">Add row</button>
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          <button class="modal-default-button">
            Добавить
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
  private inputs: object[] = [];

  private closePopup(): void {
    this.$emit('closePopup');
  }

  private addRow() {
    this.inputs.push({
      one: '',
    });
  }
}
</script>
<style lang="less">

.modal-wrapper {
  width: 550px;
  height: 200px;
  max-height: 100%;
  max-width: 100%;
  background: #fff;border-radius: 8px;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14),
              0 1px 10px 0 rgba(0,0,0,0.12),
              0 2px 4px -1px rgba(0,0,0,0.2);

  .modal-container {
    margin: 5px;

    .modal-header {
      display: flex;
      justify-content: space-between;

      .close_btn {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
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
    .modal-footer {
      bottom: 5px;
    }
  }
}
</style>
