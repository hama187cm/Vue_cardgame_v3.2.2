<template>
<v-container fluid grid-list-xs grey lighten-3 id="firebaseDebug">
  <hr />
  <v-layout row wrap justify-start>
    <span>firebase debagu Component</span>
  </v-layout>
  <v-layout row wrap justify-start>
    <div>
      <input class="ma-2 pa-2 grey lighten-5" type="txt" id="suit" placeholder="Suit" v-model="cardObj_tmp.suit" />
    </div>
    <div>
      <input class="ma-2 pa-2 grey lighten-5 debug" type="text" id="number" placeholder="Number" v-model="cardObj_tmp.number" />
    </div>
    <div>
      <input class="ma-2 pa-2 grey lighten-5 debug" type="text" id="hide" placeholder="hideFlg" v-model="cardObj_tmp.hide" />
    </div>
  </v-layout>
  <v-layout row wrap justify-start>
    <div>
      <input class="ma-2 pa-2 grey lighten-5" type="txt" id="own" placeholder="own" v-model="cardObj_tmp.own" />
    </div>
    <div>
      <input class="ma-2 pa-2 grey lighten-5 debug" type="text" id="arena" placeholder="arena" v-model="cardObj_tmp.arena" />
    </div>
    <div>
      <button class="ma-2 pa-2 grey lighten-5 debug" type="button" @click="sendMessage">送信</button>
      <span class="debug">{{ localMessage }}</span>
    </div>
  </v-layout>
  <v-container fluid grid-list-xl>
    <v-layout row wrap justify-start>
      <v-flex xs2 grey lighten-5 ma-1 pa-1 v-for="item in dataAll" :key="item.id" class="debug">
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
import  * as deck from '../utils/deck'

export default {
  name: 'firebaseDebug',
  // components: {  },
  props: {  
    dataAll: {type: Array},
    // mainMessage: {type: String},
  },
  data () {
    return {
      // dataAll: [], // 最新状態はここにコピーされる
      cardObj_tmp: deck.cardObj(),
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
    // データベースの変更を購読、最新状態をlistにコピーする
    // listen() {
    //   firebase
    //     .database()
    //     .ref("myBoard/1")
    //     // .ref("myBoard/"+this.$route.params.id)
    //     .on("value", snapshot => {
    //       // eslint-disable-line
    //       if (snapshot) {
    //         const rootList = snapshot.val();
    //         let list = [];
    //         Object.keys(rootList).forEach((val, key) => {
    //           rootList[val].id = val;
    //           list.push(rootList[val]);
    //         });
    //         this.dataAll = list;
    //         // this.$parent.dataAll = list;
    //         // this.listen();
    //       }
    //     });
    // },
    sendMessage() {
      // 空欄の場合は実行しない
      if (!this.cardObj_tmp.suit || !this.cardObj_tmp.number) return;
      let id=1;
      if (!this.$route.params.id ){ 
        id =this.$route.params.id ;
      }
      // 送信
      firebase.database()   //todo:後でグローバル変数化する
        .ref("myBoard/"+id)   //1=dummt
        // .ref("myBoard/"+this.$route.params.id)
        .child(this.cardObj_tmp.suit+this.cardObj_tmp.number)
        .set({
          suit:   this.cardObj_tmp.suit,
          number: this.cardObj_tmp.number,
          hide:   this.cardObj_tmp.hide,
          own:    this.cardObj_tmp.own,
          arena:  this.cardObj_tmp.arena,
        });
      // 送信後inputを空にする
      // this.cardObj_tmp.suit = null;
      // this.cardObj_tmp.number = null;
      //cardObj_tmp= deck.cardObj(),
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
