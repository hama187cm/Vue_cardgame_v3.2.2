<template>
<v-container fluid grid-list-xs grey lighten-3 id="$route.name">
  <v-layout row wrap justify-start class="navi_bar">
    <navigation></navigation>
                  <!-- v-on:panret_login="login" -->
    <ul>
      <!-- <li>
        <v-btn primary @click="$emit('panret_login')">
          匿名ユーザーでログイン
        </v-btn>
      </li> -->
      <li class="blue-grey lighten-4 mr-2 px-1 devOnly">
        <router-link to="/1/user_a/table/">
          <a>1/a</a>
        </router-link>
      </li>
      <li class="blue-grey lighten-4 mr-2 px-1 devOnly">
        <router-link to="/1/user_b/table/">
          <a>1/b</a>
        </router-link>
      </li>
      <!-- <li class="blue-grey lighten-4 mr-2 px-1">
        <router-link to="/1/user_a/table/">
          <a>Game Room 1</a>
        </router-link>
      </li> -->
      <li class="mr-2" >
        <div v-if="mainMessage">"{{ mainMessage }}"</div>
      </li>
    </ul>
  </v-layout>
  <v-layout row wrap justify-start class="debug">
    <input class="grey lighten-5 ma-2 pa-2" type="text" id="roomNum" placeholder="input Number" v-model="roomNum" />
    <input class="grey lighten-5 ma-2 pa-2" type="text" id="userName" placeholder="input your User name" v-model="userName" />
    <v-btn round type="button" @click="moveRoom">start</v-btn>
    <span class="debug">{{ localMessage }}</span>
  </v-layout>
  <v-layout row wrap justify-start class="debug">
    <input class="grey lighten-5 ma-2 pa-2" type="text" id="existRoomNum" placeholder="input Room Number" v-model="existRoomNum" />
    <v-btn round type="button" @click="resetRoom">reset Room</v-btn>
    <span class="debug">{{ localMessage }}</span>
  </v-layout>
  <v-layout row wrap justify-start class="debug">
    <input class="grey lighten-5 ma-2 pa-2" type="text" id="existRoomNum" placeholder="input Room Number" v-model="existRoomNum" />
    <v-btn round type="button" @click="setCardAll">Set CardAll</v-btn>
    <span class="debug">{{ localMessage }}</span>
  </v-layout>
  <v-layout row wrap justify-start>
    <firebaseDebug v-bind:dataAll= "dataAll"/>
  </v-layout>
</v-container>
</template>

<script>
import  * as deck from '../utils/deck'
import Navigation from "./Navigation"
import firebaseDebug from '../components/firebaseDebug'

export default {
  name: 'Home',
  components:{ Navigation,
              firebaseDebug,
  },
  props: {  
    AppMessage: {type: String},
    dataAll: {type: Array}, // 最新状態はここにコピーされる
  },
  data () {
    return {
      // dataAll: [], // 最新状態はここにコピーされる
      mainMessage: 'Making Game Room',
      localMessage: '',
      roomNum: null,
      userName: null,
      existRoomNum: 1,
    }
  },
  created() {
    // this.listen();
  },
  methods: {
    moveRoom() {
      // 空欄の場合は実行しない
      if(this.$route.params.id ||  this.$route.params.user) return;
      this.$router.push({ path: '/'+this.roomNum+'/'+this.userName+'/table/' });
      // this.sendLocalMessage( "->done" );
    },
    resetRoom() {  //need: this.existRoomNum.
      // console.dir(deckAllArr);
      this.firebaseResetCardAll(this.existRoomNum);
    },
    setCardAll() {
      deck.init();
      let cardAllObj = deck.deck;
      // console.log("at Home",JSON.stringify(this.$route.params))
      // console.dir(cardAllObj);
      this.firebaseResetCardAll(this.existRoomNum);
      this.firebaseSetCardAll( cardAllObj, this.existRoomNum);
    },
    // ⬇App.vueで実行している
    // listen() {
    //   firebase
    //     .database()
    //     .ref("myBoard/1")
    //     // .ref("myBoard/"+this.$route.params.id)
    //     .on("value", snapshot => {
    //       // eslint-disable-line
    //       if (snapshot) {
    //         const rootList = snapshot.val();
    //         let list = [];
    //         if(rootList===null) return //全reomoveしたら、エラーになる
    //         Object.keys(rootList).forEach((val, key) => {
    //           rootList[val].id = val;
    //           list.push(rootList[val]);
    //         });
    //         this.dataAll = list;
    //         // this.$parent.dataAll = list;
    //         // this.listen();
    //       }
    //     });
    // },
    // ★localMessage関連
    // firebaseSetCard_lcl( cardObj, roomNum ) {
    //   this.firebaseSetCard( cardObj, roomNum);
    // },
    // sendLocalMessage( msg ){
    //   this.localMessage = msg;
    //   this.timerObj = setInterval(function() { 
    //     this.localMessage = null; }, 1000);
    //   //this.destroyed();
    // },
    // timerLocalMessage() {
    //   let self = this;
    //   this.timerObj = setInterval(function() {self.count()}, 3000)
    //   // this.timerOn = true
    // },
    // completeLocalMessage() {
    //   clearInterval(this.timerObj)
    // }
  },
  // destroyed(){
  //     clearInterval(this.timerObj);
  // },
}
</script>

<style scoped>
.debug {
  /* margin: 1px; */
  text-align: left;
  font-size: smaill;
  border: 1px;
  border-color: black;
  border-radius: 4px;
  /* background-color: #ccc; */
}
</style>
