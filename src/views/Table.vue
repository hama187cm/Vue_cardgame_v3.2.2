<template>
<!-- <v-container fluid grid-list-xs grey lighten-3 id="home"> -->
<v-flex xs10 mx-1 pa-0 id="$route.name">
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
<!-- </v-container> -->
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
  props: {
    dataAll: {type: Array}, // 最新状態はここにコピーされる
    AppMessage: {type: String},
  },
  data () {
    return {
      // dataAll: [], // 最新状態はここにコピーされる
      mainMessage: 'Welcome to Game',
    }
  },
  created() {
    // this.listen();
  },
  methods: {
     //⬇App.vueで実行している
    listen() {  // データベースの変更を購読、最新状態をlistにコピーする
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
  },
}
</script>
