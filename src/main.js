import FirebaseVue from "./firebase/index";
import Vue from "vue";
import App from "./App.vue";
import BaseSpinner from "./components/BaseSpinner";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { firestorePlugin } from "vuefire";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import router from "./router";

Vue.use(firestorePlugin);
Vue.use(FirebaseVue);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("BaseSpinner", BaseSpinner);

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
