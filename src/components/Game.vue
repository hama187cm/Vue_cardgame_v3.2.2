<template>
<v-container ma-0 pa-0 fluid grid-list-xs id="app">
  <v-layout row wrap justify-start>
    <v-flex xs12 mb-1 pa-0>
      <div class="message">{{ mainMessage }}</div>
    </v-flex>
    <v-flex xs12 mb-1 pa-0>
      <player />
    </v-flex>
  </v-layout>

  <v-layout row wrap justify-start>
    <v-flex xs3 ma-1 pa-1 class="debug">
      <input class="input" type="txt" id="nameInput" placeholder="Suit" v-model="suit" />
    </v-flex>
    <v-flex xs3 ma-1 pa-1 class="debug">
            <input class="input" type="text" id="nameInput" placeholder="Number" v-model="number" />
    </v-flex>
    <v-flex xs3 ma-1 pa-1 class="debug">
      <button class="button is-success" type="button" @click="sendMessage">送信</button>
    </v-flex>
  </v-layout>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-start>
      <v-flex xs2 grey lighten-3 ma-0 pa-0 v-for="item in list" :key="item.id" class="debug">
        <div class="ma-1 px-1 debug">
            {{ item.suit }}, {{ item.number }}
        </div>
        <span class="mx-1 pa-1 debug">
            {{ item.hide }}, {{ item.own }}, {{ item.arena }}
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</v-container>
</template>

<script>
import Player from './Player'
// import Player from './comp_sotto/Player'
// import pick from './utils/deck' //drawをApp.vueで実行用
import  * as deck from '../utils/deck'

export default {
  name: 'app',
  components: { Player },
  data () {
    return {
      mainMessage: 'Welcome to Game',
      // ⬇firebase
      list: [], // 最新状態はここにコピーされる
      suit: "", // 名前
      number: "" // 送信メッセージ
    }
  },
  created() {
    this.listen();
    
    console.log(deck.deck);
    // this.db_init( deck.deck );

  },
  methods: {
    db_init( deckAllArr ) {
      // 空欄の場合は実行しない
      if (!deckAllArr) return;

      deckAllArr.forEach(function(card){
        firebase
          .database()
          .ref("myBoard1/")
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
    // データベースの変更を購読、最新状態をlistにコピーする
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
    sendMessage() {
      // 空欄の場合は実行しない
      if (!this.suit || !this.number) return;
      // 送信
      firebase
        .database()
        .ref("myBoard1/")
        .push({
          id: this.suit+this.number,
          suit: this.suit,
          number: this.number,
          own: null,
          arena: null,
          hide: null,
        });
      // 送信後inputを空にする
      this.suit = "";
      this.number = "";
    },    
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
.list{
  margin: 1px;
  padding: 4px;
  border-radius: 8px;
}
/* .card {
  margin: 8px;
  padding: 4px;
  width: 50px;
  text-align: center;
  font-size: large;
  border: 1px solid #666;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  cursor: grab;
  display: table-cell;
} */
.card_blank{
  margin-top: 40px;
}
.lable{
  margin: 2px;
  padding: 2px 8px 2px;
  /* background-color: gray; */
  /* border-radius: 8px; */
  /* color: white; */
  text-align: left;
}
.draggbleArea{
  min-width: 40px;
  min-height: 40px;
  /* display: table; */
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
