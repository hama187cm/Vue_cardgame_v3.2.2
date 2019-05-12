<template>
<div id="Home">
  <player :mainMessage="mainMessage" />
  <firebaseDebug v-bind:list= "list"/>
</div>
</template>

<script>
export default {
  name: "Home",
}
</script>

<script>
import Player from '../components/Player'
import  * as deck from '../utils/deck'

import firebaseDebug from '../components/firebaseDebug'

export default {
  name: 'Home',
  components: { Player, 
              firebaseDebug,
  },
  props: {
    mainMessage: {type: String},
    // list: {type: Array}, // 最新状態はここにコピーされる
  },
  data () {
    return {
      mainMessageAtHome: this.mainMessage,
      // ⬇firebase
      list: [], // 最新状態はここにコピーされる
    }
  },
  created() {
    // this.$parent.mainMessage = "test";
    
    // console.log(deck.deck);
    // this.db_init( deck.deck );
    this.db_init0( deck.deck );
    // this.list = deck.deck;

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
      if (!deckAllArr) return;

      // this.list.push(deck());
      deckAllArr.forEach(function(cardDmmy){
        let card = deck.pick();
        // console.dir( card );
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
