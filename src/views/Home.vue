<template>
<v-container fluid grid-list-xs grey lighten-3 id="firebaseDebug">
  <v-layout row wrap justify-start class="navi_bar">
    <navigation></navigation>
                  <!-- v-on:panret_login="login" -->
    <ul>
      <!-- <li>
        <v-btn primary @click="$emit('panret_login')">
          匿名ユーザーでログイン
        </v-btn>
      </li> -->
      <li class="blue-grey lighten-4 mr-2 px-1">
        <div v-if="$route.params.id">[Game ID:{{ $route.params.id }}]</div>
        <router-link to="/1/user_a/table/" v-else>
          <a>Game Room 1</a>
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
</v-container>
</template>

<script>
import  * as deck from '../utils/deck'
import Navigation from "./Navigation"

export default {
  name: 'Home',
  components:{ Navigation,
  },
  props: {  
    list: {type: Array},
    // mainMessage: {type: String},
  },
  data () {
    return {
      mainMessage: 'Making Game Room',
      localMessage: '',
      roomNum: null,
      userName: null,
      existRoomNum: null,
    }
  },
  // created() {
  //   // this.listen();
  // },
  methods: {
    moveRoom() {
      // 空欄の場合は実行しない
      if(this.$route.params.id ||  this.$route.params.user) return;
      this.$router.push({ path: '/'+this.roomNum+'/'+this.userName+'/table/' });
      // this.sendLocalMessage( "->done" );
    },
    resetRoom(){
      console.dir(deck.deck);
      this.firebaseResetCardAll(deck.deck, this.existRoomNum);
    },
    init_cardAll( deckAllArr ) {
      // 空欄の場合は実行しない
      // if (!deckAllArr) return;

      // this.list.push(deck());
      deckAllArr.forEach(function(cardDmmy){
        let card = deck.pick();
        // console.log(JSON.stringify(this.$route.params));
        this.setCard2F
      });
    },
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
