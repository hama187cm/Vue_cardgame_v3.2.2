<template>
<v-container ma-1 pa-0 fluid grid-list-xs>
<v-layout row wrap justify-start>
    <v-flex xs12 mb-1 pa-0>
      <player />
    </v-flex>
  </v-layout>
  <firebaseDebug v-bind:list= "list"/>
  </v-container>
</template>

<script>
export default {
  name: "Main",
}
</script>

<script>
import Player from '../components/Player'
import  * as deck from '../utils/deck'

import firebaseDebug from '../components/firebaseDebug'

export default {
  name: 'Table',
  components: { Player, 
              firebaseDebug
  },
  props: {
    mainMessage: {type: String},
  },
  data () {
    return {
      // mainMessage: 'Welcome to Game',
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
