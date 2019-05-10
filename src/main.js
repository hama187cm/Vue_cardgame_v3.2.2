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
      template: 
      `<ul>
          <li>
            <!-- <router-link to="/"> -->
              Home
            <!-- </router-link> -->
          </li>
          <li>
            <router-link to="/table">
              Table
            </router-link>
          </li>
        </ul>
      <div>
      ユーザーIDは {{ $route.params.userid }}</div>`
    }
  },
  // { path: "/about", component: About },
  { path: "/table",
    component: {
      template: 
      `<ul>
          <li>
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li>
            <!-- <router-link to="/table"> -->
              Table
            <!-- </router-link> -->
          </li>
        </ul>
      <div>
      ユーザーIDは {{ $route.params.userid }}</div>`
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
