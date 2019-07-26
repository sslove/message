import Vue from "vue";
import Router from "vue-router";
import Index from "./views/index.vue";
import EditorIndex from './views/editorIndex.vue';
import CheckIndex from './views/checkIndex.vue';
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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
