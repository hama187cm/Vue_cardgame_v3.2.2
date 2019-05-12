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
export default {
  name: "Main",
}
</script>

<script>
import Player from '../components/Player'
import  * as deck from '../utils/deck'

import Navigation from "./Navigation"
import firebaseDebug from '../components/firebaseDebug'

export default {
  name: 'Table',
  components: { Player, 
              Navigation, 
              firebaseDebug
  },
  // props: {
  //   mainMessage: {type: String},
  // },
  data () {
    return {
      mainMessage: 'At Table',
      // ⬇firebase
      list: [], // 最新状態はここにコピーされる
    }
  },
  created() {
    // this.$parent.mainMessage = "test";

    // this.listen();
    
    // console.log(deck.deck);
    // this.db_init( deck.deck );
    // this.list = deck.deck;

  },
  methods: {
    //データベースの変更を購読、最新状態をlistにコピーする
    listen() {
      firebase
        .database()
        .ref("myBoard/")
        .on("value", snapshot => {
          // eslint-disable-line
          if (snapshot) {
            const rootList = snapshot.val();
            let list = [];
            Object.keys(rootList).forEach((val, key) => {
              rootList[val].id = val;
              list.push(rootList[val]);
            });
            this.list = list;
          }
        });
    },
  },
}
</script>
