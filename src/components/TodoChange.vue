<template>
  <div id="todoChange">
    <div id="note_wrapper">
      <h3 class="note_header">{{ item.noteName }}</h3>
      <div class="note_body">
        <div class="task" v-for="(task) in item.tasksList"
              :key="task.id">
          <div class="panelLabel">
            <input type="checkbox" class="checkbox" />
            <label class="task_name" for="checkbox" v-if="taskNameVisible">
              {{ task.value }}
            </label>
            <input type="textbox" v-if="textboxVisible" :value="task.value" />
          </div>
          <div class="panelUnderLabel">
            <button @click="nameChangeTodo()">Изменить</button>
          </div>
        </div>
      </div>
      <div class="note_footer">
        <button class="btn_deletePopup" @click="deletePopup(index)">
          &#10007; Удалить заметку
        </button>
        <button @click="ReturnToHome">Вернуться</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private item: object = {};

  private textboxVisible = false;

  private taskNameVisible = true;

  private ReturnToHome() {
    this.$router.replace({ name: 'homePage' });
  }

  private nameChangeTodo() {
    this.textboxVisible = true;
    this.taskNameVisible = false;
  }

  mounted() {
    this.item = {
      noteName: this.$route.params.name,
      tasksList: JSON.parse(this.$route.params.tasksJson || '{}'),
      isChange: false,
    };
  }
}
</script>

<style lang="less">
#todoChange {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;

  #note_wrapper {
    border: 1px;
    height: auto;
    width: 600px;
    max-width: 100%;
    background-color: #fff;

    .note_header {
      margin: 0 15px 0 15px;
      padding: 10px 0 10px 0;
      font-size: 16px;
      font-weight: normal;
      text-align: left;
      border-bottom: 1px solid darkgray;
      min-height: 39px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .note_body {
      margin: 10px 15px 0px 15px;
      height: auto;
      overflow: scroll;

      .task {
        display: flex;
        align-items: left;
        flex-direction: column;
        align-items: flex-start;
        margin: 15px 0 15px 0;

        .panelLabel {
          padding: 10px 10px 10px 0;

          .nameChange {
            display: none;
          }
        }

        .panelUnderLabel {
          button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 12px;
            color: grey;
            outline: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }

        input[type="textbox"] {
          padding: 12px 20px;
          display: inline-block;
          border: 1px solid #ccc;
          border-radius: 4px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }

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
        margin-bottom: 10px;
      }
    }
  }
}

</style>
