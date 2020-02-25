<template>
  <div class="confirm-wrapper">
    <div class="confirm-container">

      <div class="confirm-header">
        <slot name="header">
          <span>Удалить заметку?</span>
          <button class="close_btn" v-on:click="closePopup">&#10006;</button>
        </slot>
      </div>
      <div class="confirm-body">
        <slot name="body">
          <div class="msg">
            Заметка будет полностью удалена из вашего списка.
          </div>
        </slot>
      </div>

      <div class="confirm-footer">
        <slot name="footer">
          <button v-on:click="btnCancelDeleting" class="btn_no">
            Нет, оставить заметку
          </button>
          <button v-on:click="btnDeleteNote" class="btn_yes">
            Да, удалить заметку
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmDelete extends Vue {
  private btnDeleteNote(): void {
    this.$emit('deleteConfirm', true);
  }

  private btnCancelDeleting(): void {
    this.$emit('deleteConfirm', false);
  }

  /**
   * Метод, который оповещает родителя о том, что диалоговое окно закрыто
   * @function
   * @private
   */
  private closePopup(): void {
    this.$emit('closePopup');
  }
}
</script>

<style lang="less">

.confirm-wrapper {
  width: 550px;
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14),
              0 1px 10px 0 rgba(0,0,0,0.12),
              0 2px 4px -1px rgba(0,0,0,0.2);
  background-color: #f5f5f5;
  overflow: hidden;

  .confirm-container {

    .confirm-header {
      background-color: #fff;
      padding: 5px 10px 5px 20px;
      border-bottom: 1px solid #dcdcdc;
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .close_btn {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
    .confirm-body {
      height: 100px;
      border-bottom: 1px solid #dcdcdc;

      .msg {
        padding: 20px 0 0 20px;
        text-align: left;
      }

      .error {
        text-align: left;
        font-size: small;
        color: #ed5e68;
      }
    }
    .confirm-footer {
      background-color: #fff;
      height: 50px;
      padding: 5px 10px 5px 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .btn_yes {
        margin: 5px;
        padding: 10px;
        background: #ed5e68;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 2px;
      }

      .btn_no {
        margin: 5px;
        padding: 10px;
        background: #fff;
        border: 1px solid #dcdcdc;
        cursor: pointer;
        outline: none;
        border-radius: 2px;
      }
    }
  }
}
</style>
