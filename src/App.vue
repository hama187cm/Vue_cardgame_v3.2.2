<template>
<v-flex xs12 mx-1 pa-0 id="app">
<!-- <v-container fluid grid-list-xs id="app"> -->
  <v-layout row wrap justify-start class="navi_bar">
    <navigation  :mainMessage="mainMessage"
      ></navigation>
                  <!-- v-on:panret_login="login" -->
    <ul>
        <!-- <li>
          <v-btn primary @click="$emit('panret_login')">
            匿名ユーザーでログイン
          </v-btn>
        </li> -->
        <li>
          <div>"{{ mainMessage }}"</div>
        </li>
      </ul>
  </v-layout>

  <router-view :mainMessage="mainMessage"
  ></router-view>
<!-- </v-container> -->
</v-flex>
</template>

<script>
import Navigation from "./views/Navigation"
// import Game from './components/Game'
// import Player from './comp_sotto/Player'
// import pick from './utils/deck' //drawをApp.vueで実行用

export default {
  name: 'app',
  components: { Navigation, 
              //  Game, 
  },
  data () {
    return {
      mainMessage: 'Welcome to Game',
      // list: [], // 最新状態はここにコピーされる
    }
  },
  // created() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       // User is signed in.
  //       console.log("is login.");
  //     } else {
  //       // No user is signed in.
  //       console.log("No user is signed in.");
  //     }
  //   });
  // },
  methods: {
    // //匿名ユーザーでログイン
    // login() {
    //   firebase
    //     .auth()
    //     .signInAnonymously()
    //     .then(e => {
    //       // ログイン成功
    //       console.log(e);
    //       // this.listen();
    //     })
    //     .catch(error => {
    //       // エラーメッセージ
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       console.log("エラーメッセージ", errorCode, errorMessage);
    //     });
    // },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul {
  margin: 2px;
  padding: 0;
}
li {
  display: inline-block;
  margin: 1px 4px 1px;
  padding: 0px;
}
.navi_bar{
  text-align: left;
  border-bottom: solid 1px #000000;
}

.material{
  /* border: 1px solid #222; */
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
.lable{
  margin: 2px;
  padding: 2px 8px 2px;
  /* background-color: gray; */
  /* border-radius: 8px; */
  /* color: white; */
  text-align: left;
}
.debug {
  text-align: left;
  font-size: smaill;
  border: 1px;
  border-color: black;
  border-radius: 4px;
  /* background-color: #ccc; */
}
</style>
