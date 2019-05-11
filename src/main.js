// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
// import App from "../src_sotto/App";

import Router from "vue-router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
Vue.use(Vuetify);

// import Home from "./views/Home";
// import About from "./views/About";
// import Table from "./views/Table";

Vue.use(Router);
const routes = [
  { path: "/",
    component: {
      template:'<span>[TOP]</span>'
    }
  },
  // { path: "/about", component: About },
  { path: "/table",
    component: {
      template: '<span>[Table]</span>'
    }
  },
];
const router = new Router({
  routes
});
router.push({ path: 'table' });

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
