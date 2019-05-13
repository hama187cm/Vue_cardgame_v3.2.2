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

import util_firebase from './utils/util_firebase'

Vue.use(Vuetify);

Vue.use(Router);
const router = new Router({
  routes: [
    { path: "/",      name:'Home',  component: Home },
    // { path: '/:id', component: Home },
    // { path: "/:id/table/", name:'Table', component: Table },
    { path: "/:id/:user/table/", name:'Table', component: Table },
    { path: "*",      name:'Home',  component: Home },
  ],
});
// router.push({ path: '/1/user_a/table' });

Vue.config.productionTip = false;

Vue.mixin(util_firebase);

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
