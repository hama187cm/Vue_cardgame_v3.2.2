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
        <li class="blue-grey lighten-4 mr-2 px-1">
          <router-link to="/1/user_a/table/">
            <a>Game Room 1</a>
          </router-link>
        </li>
        <li v-if="$route.params.id">
          [Game ID:{{ $route.params.id }}]
        </li>
        <li>
          <div v-if="mainMessage">"{{ mainMessage }}"</div>
        </li>
      </ul>
  </v-layout>

  <player :mainMessageAtView="mainMessage" 
          :dataAll="dataAll"
  ></player>
  <firebaseDebug v-bind:dataAll= "dataAll"/>
<!-- </v-container> -->
</v-flex>
</template>

<script>
import Player from '../components/Player'
import  * as deck from '../utils/deck'

import Navigation from "./Navigation"
import firebaseDebug from '../components/firebaseDebug'

export default {
  name: 'Table',
  components:{ Player, 
              Navigation, 
              firebaseDebug,
  },
  // props: {
  //   AppMessage: {type: String},
  //   // dataAll: {type: Array}, // 最新状態はここにコピーされる
  // },
  data () {
    return {
      mainMessage: 'Welcome to Game',
      // ⬇firebase
      dataAll: [], // 最新状態はここにコピーされる
    }
  },
  created() {
    // this.db_init();
    this.listen();
    this.init_cardAll( deck.deck );
  },
  methods: {
    // db_init() {  //todo★: try
    //   this.database = firebase.database();
    //   this.cardAllRef = this.database.ref('myBoard');

    //   this.cardAllRef.on('value', function(snapshot) {
    //     this.cardAll = snapshot.val();
    //   });
    // },
    // データベースの変更を購読、最新状態をlistにコピーする
    listen() {
      firebase
        .database()
        .ref("myBoard/1")
        // .ref("myBoard/"+this.$route.params.id)
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
    init_cardAll( dackAll ) {
      let id=1;
      console.log("at Home",JSON.stringify(this.$route.params));
      if (!this.$route.params.id ){ 
        id =this.$route.params.id ;
      }
      // if(this.dataAll.length!==0){
      //   firebase.database()
      //   .ref("myBoard"+this.$route.params.id+"/")
      //   .remove();
      // }
      this.setCardAll(dackAll, id );
    },
    setCardAll( deckAllArr, refID=1  ) {
      // this.dataAll.push(deck());
      deckAllArr.forEach(function(cardDmmy){
        let card = deck.pick();
        firebase.database()
          .ref("myBoard"+refID+"/")
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
