<template>
<div id="app">
  <div class="lable" v-if="AppMessage">"{{ AppMessage }}"</div>
  <!-- <router-view :AppMessage="AppMessage" -->
  <router-view :AppMessage="AppMessage" 
              :dataAll="dataAll"
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
      AppMessage: this.$root.$AppMessage,
      // list: [], // ⬇
      dataAll: [], // 最新状態はここにコピーされる
    }
  },
  beforeCreate(){
    this.$root.$AppMessage = "" //グローバルmessage変数
    // console.dir( this.$root.$AppMessage );
    this.$root.$cardAll = deck.deck;
    // console.log("$cardAll :", JSON.stringify( this.$root.$cardAll ))
    // console.log( "this.$root", JSON.stringify(this.$root ));
  },
  created() {
    this.listen();
  },
  // created() {
    // deck.makeDeck();
    // this.init_cardAll( this.list  );
    // this.auth_check();
  // },
  methods: {
    listen() {  // データベースの変更を購読、最新状態をlistにコピーする
      firebase
        .database()
        // .ref("myBoard/"+this.getRoomNum() ) 
        .ref("myBoard/1")
        .on("value", snapshot => {
          // eslint-disable-line
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            if(rootList===null) return //全reomoveしたら、エラーになる
            Object.keys(rootList).forEach((val, key) => {
              rootList[val].id = val;
              list.push(rootList[val]);
            });
            this.dataAll = list;
            // this.$parent.dataAll = list;
            // this.listen();
          }
        });
    },
    // init_cardAll( deckAllArr ) {
    //   // 空欄の場合は実行しない
    //   // if (!deckAllArr) return;

    //   // this.list.push(deck());
    //   deckAllArr.forEach(function(cardDmmy){
    //     let card = deck.pick();
    //     // console.log(JSON.stringify(this.$route.params));
    //     firebase
    //       .database()
    //       // .ref("myBoard/"+this.$route.params.id+"/")
    //       .ref("myBoard/1") //1=dummt
    //       // .ref("myBoard/"+this.$route.params.id)
    //       .child(card.id)
    //       .set({
    //         suit: card.suit,
    //         number: card.number,
    //         own: card.own,
    //         arena: card.arena,
    //         hide: card.hide,
    //      });
    //   });
    // },
    // auth_check(){
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
