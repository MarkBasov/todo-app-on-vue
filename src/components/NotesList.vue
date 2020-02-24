<template>
  <div class="wrapper">
    <h1>{{ headerMsg }}</h1>
    <h3>Список заметок</h3>
    <div v-bind:class="{ popup_wrapper: isActive }">
      <ModalWindow class="popupCreate" v-if="isCreatePopup"
                   @createNote="addedNote"
                   @closePopup="closePopup">
      </ModalWindow>
    </div>
    <div class="boxNotes">
      <button class="btn_showPopup" v-on:click="showPopupCreate">
        &#10010; Создать новую заметку
      </button>
      <ul>
        <li v-for="(item) in items"
                    v-bind:key="item.id">
          <div id="note_wrapper">
            <h3 class="note_header">{{ item.noteName }}</h3>
            <div class="note_body">
              <div class="task" v-for="task in item.tasksList"
                    v-bind:key="task.id">
                <label class="task_name" for="checkbox">
                  <input type="checkbox" class="checkbox" v-model="checked"  />
                  {{ task.value }}
                </label>
              </div>
            </div>
          </div>
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

  private items = [{
    id: 0,
    tasksList: {},
    noteName: '',
    checked: false,
  }];

  private isCreatePopup = false;

  private isActive = false;

  private closePopup(): void {
    this.isCreatePopup = false;
    this.isActive = false;
  }

  private showPopupCreate(): void {
    this.isCreatePopup = true;
    this.isActive = true;
  }

  protected addedNote(noteName: string, tasksList: any, checked = false): void {
    const maxId = Math.max(...this.items.map((i) => i.id));
    // Проверка на случай если удалить все задачи, при создании заметки.
    if (maxId >= 0) {
      this.items.push({
        id: maxId + 1,
        tasksList,
        noteName,
        checked,
      });
    } else {
      this.items.push({
        id: 0,
        tasksList,
        noteName,
        checked,
      });
    }
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
    display: block;
    margin: 10px;

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
      display: flex;
      flex-flow: row wrap;

      li {
        margin: 5px 0 5px 10px;
        max-width: 100%;

        #note_wrapper {
          border: 1px;
          height: 200px;
          width: 400px;
          max-width: 100%;
          background-color: #fff;

          &:hover {
            box-shadow:
            1px 1px #979797,
            2px 2px #979797,
            3px 3px #979797;
            -webkit-transform: translateX(-4px);
            transform: translateX(-4px);
            -webkit-transition: all 0.3s ease;;
            -moz-transition: all 0.3s ease;;
            -o-transition: all 0.3s ease;;
            transition: all 0.3s ease;
          }

          .note_header {
            margin: 0 15px 0 15px;
            padding: 10px 15px 10px 15px;
            font-size: 16px;
            font-weight: normal;
            text-align: left;
            border-bottom: 1px solid darkgray;
          }
          .note_body {
            margin: 10px 15px 10px 15px;

            .task {
              display: flex;
              align-items: center;
              padding: 10px 0 10px 0;

              input[type="checkbox"] {
                vertical-align: middle;
              }

              .task_name {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }

              input[type="checkbox"]:before {
                border-radius: 3px;
              }

              input[type="checkbox"]:checked {
                content: "\2713";
                text-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
                font-size: 15px;
                color: #f3f3f3;
                text-align: center;
                line-height: 15px;
              }
            }
          }
        }
      }
    }
  }
  a {
    color: #42b983;
  }
}
</style>
