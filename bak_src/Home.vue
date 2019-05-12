<template>
<v-flex xs12 mx-1 pa-0 id="$route.name">
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
          <div>[Game ID:{{ $route.params.id }}]</div>
        </li>
        <li>
          <div v-if="mainMessage">"{{ mainMessage }}"</div>
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
  },
  methods: {
    db_init( deckAllArr ) {
      // 空欄の場合は実行しない
      // if (!deckAllArr) return;

      // this.list.push(deck());
      deckAllArr.forEach(function(cardDmmy){
        let card = deck.pick();
        console.log("at Home",JSON.stringify(this.$route.params));
        firebase
          .database()
          .ref("myBoard"+this.$route.params.id+"/")
          .child(card.id)
          .set({
            suit: card.suit,
            number: card.number,
            own: card.own,
            arena: card.arena,
            hide: card.hide,
         });
      });
    },
  },
}
</script>
