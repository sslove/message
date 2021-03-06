import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import './plugins/element.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import animate from 'animate.css'




Vue.config.productionTip = false;
Vue.use(Element)
Vue.use(VueQuillEditor)
Vue.use(animate)
// Vue.prototype.$http= axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
