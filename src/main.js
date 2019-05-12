// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
// import App from "../src_sotto/App";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";

import Router from "vue-router";
import Home from "./views/Home";
// import Home from "./views/Home";
import Table from "./views/Table";

Vue.use(Vuetify);

Vue.use(Router);
const router = new Router({
  routes: [
    { path: "/",      name:'Home',  component: Home },
    { path: "/table", name:'Table', component: Table },
  ]
});
// router.push({ path: 'table' });

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

/* eslint-disable no-new */
// new Vue({
//   el: "#app",
//   components: { App },
//   template: "<App/>"
// });
