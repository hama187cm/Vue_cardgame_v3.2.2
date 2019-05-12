<template>
<v-flex xs12 mx-1 pa-0 id="Home">
<!-- <v-container fluid grid-list-xs id="app"> -->
  <v-layout row wrap justify-start class="navi_bar">
    <navigation></navigation>
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

  <player :mainMessage="mainMessage" />
  <firebaseDebug v-bind:list= "list"/>
<!-- </v-container> -->
</v-flex>
</template>

<script>
import Player from '../components/Player'
import  * as deck from '../utils/deck'

import Navigation from "./Navigation"
import firebaseDebug from '../components/firebaseDebug'

export default {
  name: 'Home',
  components:{ Player, 
              Navigation, 
              firebaseDebug,
  },
  // props: {
  //   AppMessage: {type: String},
  //   // list: {type: Array}, // 最新状態はここにコピーされる
  // },
  data () {
    return {
      mainMessage: 'Welcome to Game',
      // ⬇firebase
      list: [], // 最新状態はここにコピーされる
    }
  },
  created() {
    // this.$parent.mainMessage = "test";
    
    // this.db_init( deck.deck );
    // this.db_init0( deck.deck );
  },
  methods: {
    db_init() {
      // this.database = firebase.database();
      // this.todosRef = this.database.ref('myBoard');

      // var _this = this;
      // // this.todosRef.on('value', function(snapshot) {
      // //   _this.todos = snapshot.val(); // データに変化が起きたときに再取得する
      // // });
    },
    db_init0( deckAllArr ) {
      // 空欄の場合は実行しない
      // if (!deckAllArr) return;

      // this.list.push(deck());
      deckAllArr.forEach(function(cardDmmy){
        let card = deck.pick();
        firebase
          .database()
          .ref("myBoard/")
          .push({
            id: card.suit+card.number,
            suit: card.suit,
            number: card.number,
            own: null,
            arena: null,
            hide: null,
         });
      });
    },
  },
}
</script>
