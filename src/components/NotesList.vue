<template>
  <div class="wrapper">
    <h1>{{ headerMsg }}</h1>
    <h3>Список заметок</h3>
    <div v-bind:class="{ popup_wrapper: isActive }">
      <CreateNote class="popupWindow" v-if="isCreatePopup"
                   @createNote="addNote"
                   @closePopup="closePopup">
      </CreateNote>
    </div>
    <div v-bind:class="{ popup_wrapper: isDelete }">
      <ConfirmDelete class="popupWindow" v-if="isDeletePopup"
                  @deleteConfirm="deleteConfirm"
                  @closePopup="closePopup">
      </ConfirmDelete>
    </div>
    <div class="boxNotes">
      <button class="btn_showPopup" @click="showCreatePopup">
        &#10010; Создать новую заметку
      </button>
      <ul>
        <li v-for="(item, index) in items"
                    v-bind:key="item.id">
          <div id="note_wrapper">
            <h3 class="note_header">{{ item.noteName }}</h3>
            <div class="note_body">
              <div class="task" v-for="task in item.tasksList"
                    :key="task.id">
                <label class="task_name" for="checkbox">
                  <input type="checkbox" class="checkbox" disabled />
                  {{ task.value }}
                </label>
              </div>
            </div>
            <div class="note_footer">
              <button class="btn_deletePopup" @click="deletePopup(index)">
                &#10007; Удалить
              </button>
              <button class="btn_change"
                      @click="changeNote(index, item.noteName, item.tasksList)">
                &#10007; Изменить
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CreateNote from './CreateNote.vue';
import ConfirmDelete from './ConfirmWindow.vue';

@Component({
  components: {
    CreateNote,
    ConfirmDelete,
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

  mounted() {
    if (localStorage.getItem('tasks')) {
      try {
        this.items = JSON.parse(localStorage.getItem('tasks') || '{}');
      } catch (e) {
        localStorage.removeItem('tasks');
      }
    }
  }

  private isCreatePopup = false;

  private isActive = false;

  private isDeletePopup = false;

  private isDelete = false;

  private watchIndex = -1;

  private test = 0;

  private closePopup(): void {
    this.isCreatePopup = false;
    this.isActive = false;
    this.isDeletePopup = false;
    this.isDelete = false;
  }

  private showCreatePopup(): void {
    this.isCreatePopup = true;
    this.isActive = true;
  }

  private changeNote(index: number, noteName: string, tasksList: Array<object>): void {
    const taskListJson = JSON.stringify(tasksList);
    this.$router.replace({ name: 'changePage', params: { name: noteName, tasksJson: taskListJson } });
  }

  protected addNote(noteName: string, tasksList: Array<object>, checked = false): void {
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
    this.saveData();
  }

  private saveData(): void {
    const parsed = JSON.stringify(this.items);
    localStorage.setItem('tasks', parsed);
  }

  private deleteConfirm(isConfirmed: boolean): void {
    if (isConfirmed) {
      this.items.splice(this.watchIndex, 1);
      this.saveData();
    }
    this.watchIndex = -1;
    this.closePopup();
  }

  private deletePopup(index: number): void {
    this.isDeletePopup = true;
    this.isDelete = true;
    this.watchIndex = index;
  }
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
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

    .popupWindow {
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
          height: 210px;
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
            padding: 10px 0 10px 0;
            font-size: 16px;
            font-weight: normal;
            text-align: left;
            border-bottom: 1px solid darkgray;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            min-height: 39px;
          }
          .note_body {
            margin: 10px 15px 0px 15px;
            max-height: 120px;
            overflow: scroll;

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
          .note_footer {
            display: flex;
            justify-content: flex-end;
            margin-right: 15px;

            .btn_deletePopup {
              height: 28px;
              background: #ed5e68;
              border: none;
              cursor: pointer;
              outline: none;
              border-radius: 2px;
              display: block;
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
