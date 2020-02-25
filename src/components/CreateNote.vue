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
          <div class="headerBody">
            <div class="nameNote">
              <input v-model.trim="noteName" class="input" placeholder="Введите название заметки"
              />
            </div>
            <div class="error" v-if="validNameNote">Name of note is required</div>
          </div>
          <div class="tasksBox">
            <fieldset>
              <legend>Список задач</legend>
              <ul>
                <li v-for="(item, index) in items"
                    v-bind:key="item.id">
                  <div class="task">
                    <input class="input" v-model.trim="item.value" />
                    <button class="deleteTask"
                            v-on:click="deleteItem(index)">
                      &#10006;
                    </button>
                  </div>
                  <div class="error" v-if="item.validate">Name of task is required</div>
                </li>
              </ul>
              <button class="btn_add" v-on:click="addItem">Добавить задачу</button>
            </fieldset>
          </div>
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          <button v-on:click="btnAddNote" class="btn_add">
            Добавить
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/**
 * @class
 * @author Basov M.A
 * Компонент модального окна
 */

@Component
export default class ModalWindow extends Vue {
  private items = [{
    id: 0,
    value: '',
    validate: false,
  }];

  private noteName = '';

  private validNameNote = false;

  private validNameTask = false;

  /**
   * Метод, который оповещает родителя о том, что диалоговое окно закрыто
   * @function
   * @private
   */
  private closePopup(): void {
    this.$emit('closePopup');
  }

  private btnAddNote(): boolean {
    if (this.noteName === '') {
      this.validNameNote = true;
      return false;
    }
    this.$emit('createNote', this.noteName, this.items);
    this.closePopup();
    return true;
  }

  /**
   * Метод, отвечающий за пополнение задач
   * @function
   * @private
   */
  private addItem(): boolean {
    this.validNameTask = false;
    let proverkaProidena = true;
    Object.values(this.items).map((item) => {
      if (item.value === '') {
        item.validate = true;
        proverkaProidena = false;
      } else {
        item.validate = false;
      }
      return item;
    });
    if (!proverkaProidena) {
      return false;
    }
    const maxId = Math.max(...this.items.map((i) => i.id));
    // Проверка на случай если удалить все задачи, при создании заметки.
    if (maxId >= 0) {
      this.items.push({
        id: maxId + 1,
        value: '',
        validate: false,
      });
    } else {
      this.items.push({
        id: 0,
        value: '',
        validate: false,
      });
    }
    return true;
  }

  /**
   * Метод, отвечающий за удаление задачи
   * @function
   * @private
   */
  private deleteItem(index: number): void {
    this.items.splice(index, 1);
  }
}
</script>
<style lang="less">

.modal-wrapper {
  width: 550px;
  max-height: 100%;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14),
              0 1px 10px 0 rgba(0,0,0,0.12),
              0 2px 4px -1px rgba(0,0,0,0.2);
  background-color: #f5f5f5;
  overflow: hidden;

  .modal-container {

    .modal-header {
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
    .modal-body {
      padding: 0 10px 0 10px;
      flex-grow: 1;

      .headerBody {
        .nameNote {
          display: flex;
        }
      }

      .tasksBox {
        height: 226px;
        overflow: auto;

        fieldset {
          margin: 0;
        }
        ul {
          list-style-type: none;
          padding: 0;

          li {

            .task {
              display: flex;
              margin: 8px 0;
              align-items: center;
            }
          }

          .deleteTask {
            background-color: #ed5e68;
            border: none;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            margin-left: 10px;
          }
        }
      }
      .input {
        flex-grow: 1;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .error {
        text-align: left;
        font-size: small;
        color: #ed5e68;
      }
    }
    .modal-footer {
      height: 50px;
      padding: 5px 10px 5px 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

    }
    .btn_add {
        padding: 10px;
        background: #63c383;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 2px;

        &:hover {
          background: #3cb464;
        }
      }
  }
}
</style>
