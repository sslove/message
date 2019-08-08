import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import EditorIndex from './views/editorIndex.vue';
import CheckIndex from './views/checkIndex.vue';
import ShowIndex from './views/showIndex.vue';
// import canvanStart from './components/canvanStart.vue';
// import Index from "./views/index.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: '/EditorIndex',
      name: 'EditorIndex',
      component: EditorIndex
    },
    {
      path: '/CheckIndex',
      name: 'CheckIndex',
      component: CheckIndex
    },
    {
      path: '/ShowIndex',
      name: 'ShowIndex',
      component: ShowIndex
    }
  ]
});
