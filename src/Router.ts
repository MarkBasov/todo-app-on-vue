import Vue from 'vue';
import Router from 'vue-router';
import NotesList from './components/NotesList.vue';
import TodoChange from './components/TodoChange.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'homePage', component: NotesList },
    { path: '/change', name: 'changePage', component: TodoChange },
  ],
});
