<template>
<v-container fluid grid-list-xs grey lighten-3 id="firebaseDebug">
  <hr />
  <v-layout row wrap justify-start>
    <v-flex xs3 ma-1 pa-1 class="debug">
      <input class="input" type="txt" id="nameInput" placeholder="Suit" v-model="suit" />
    </v-flex>
    <v-flex xs3 ma-1 pa-1 class="debug">
            <input class="input" type="text" id="nameInput" placeholder="Number" v-model="number" />
    </v-flex>
    <v-flex xs3 ma-1 pa-1 class="debug">
      <button class="button is-success" type="button" @click="sendMessage">送信</button>
      <span class="debug">{{ localMessage }}</span>
    </v-flex>
  </v-layout>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-start>
      <v-flex xs2 grey lighten-5 ma-1 pa-1 v-for="item in list" :key="item.id" class="debug">
        <div class="debug">
            {{ item.suit }}, {{ item.number }}
        </div>
        <span class="debug">
            {{ item.hide }}, {{ item.own }}, {{ item.arena }}
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</v-container>
</template>

<script>
// import  * as deck from '../utils/deck'

export default {
  name: 'firebaseDebug',
  // components: {  },
  props: {  
    list: {type: Array},
    // mainMessage: {type: String},
  },
  data () {
    return {
      // list: [], // 最新状態はここにコピーされる
      suit: "", // 名前
      number: "", // 送信メッセージ
      localMessage: "",
      min: 59,
      sec: 59,
      timerOn: false,
      timerObj: null,
    }
  },
  created() {
    // this.listen();
  },
  methods: {
    // db_init( deckAllArr ) {
    //   // 空欄の場合は実行しない
    //   if (!deckAllArr) return;
    //   deckAllArr.forEach(function(card){
    //     firebase
    //       .database()
    //       .ref("myBoard1/")
    //       .push({
    //         id: card.suit+card.number,
    //         suit: card.suit,
    //         number: card.number,
    //         own: null,
    //         arena: null,
    //         hide: null,
    //      });
    //   });
    // },
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
            // this.list = list;
            // this.$parent.list = list;
            this.listen();
          }
        });
    },
    sendMessage() {
      // 空欄の場合は実行しない
      if (!this.suit || !this.number) return;
      // 送信
      firebase
        .database()
        .ref("myBoard/")
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
      this.sendLocalMessage( "->done" );
    },
    sendLocalMessage( msg ){
      this.localMessage = msg;
      this.timerObj = setInterval(function() { 
        this.localMessage = null; }, 1000);
      //this.destroyed();
    },
    timerLocalMessage() {
      let self = this;
      this.timerObj = setInterval(function() {self.count()}, 3000)
      // this.timerOn = true
    },
    // completeLocalMessage() {
    //   clearInterval(this.timerObj)
    // }
  },
  destroyed(){
      clearInterval(this.timerObj);
  },
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
