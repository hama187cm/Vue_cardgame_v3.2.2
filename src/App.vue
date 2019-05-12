<template>
<div id="app">
  <div class="lable" v-if="AppMessage">"{{ AppMessage }}"</div>
  <!-- <router-view :AppMessage="AppMessage" -->
  <router-view
  ></router-view>
</div>
</template>

<script>
// import Navigation from "./views/Navigation"
// import Game from './components/Game'
// import Player from './comp_sotto/Player'
import  * as deck from './utils/deck' //drawをApp.vueで実行用

// Vue.prototype.$appName = 'My App'
export default {
  name: 'app',
  // components: { Navigation, 
  //             //  Game, 
  // },
  data () {
    return {
      AppMessage: "",
      list: [], // 最新状態はここにコピーされる
    }
  },
  created() {
    this.$root.$AppMessage = "" //グローバルmessage変数
    console.dir( this.$root.$AppMessage );
    this.$root.$cardAll = deck.deck;
    console.log("$cardAll :", JSON.stringify( this.$root.$cardAll ))
    // console.log( "this.$root", JSON.stringify(this.$root ));
    // deck.makeDeck();
    // this.list = deck.makeDeck();
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       // User is signed in.
  //       console.log("is login.");
  //     } else {
  //       // No user is signed in.
  //       console.log("No user is signed in.");
  //     }
  //   });
  },
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
