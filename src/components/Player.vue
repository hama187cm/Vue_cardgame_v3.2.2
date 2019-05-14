<template>
<v-container fluid grid-list-xs class="player">
  <v-layout row wrap justify-start>
    <v-flex xs4 text-align-start>
      <v-flex xs12 ma-0 pa-0>
        <span>Public area</span>
      </v-flex>
      <v-flex xs12 mt-1 pa-0>
        <div class="blue lighten-2 list">
          <draggable id="arena" class="checkArena draggbleArea" group="cards" :list="arena" :move="beforeMove" @end="onEnd" :animation=300>
            <card v-for="(card, index) in arena" :key="index"
              :suit="card.suit" :number="card.number" :hide="card.hide" :color="card.color">
            </card>
          </draggable>
          <div class="lable" v-if="arena.length==0">↑ Dragging Card Space</div>
        </div>
      </v-flex>
    </v-flex>
    <v-flex xs2 mt-2>
      <v-btn @click="draw" round v-if="!nothing_in_deck_flg">Draw</v-btn>
      <v-btn @click="draw" round disabled v-else>Draw<br />(no card)</v-btn>
    </v-flex>
    <v-flex xs6>
      <div class="teal lighten-3 list" v-if="newCards.length!=0">
        <span class="yellow label px-5 material">New!</span>
        <draggable id="newCards" group="cards" :list="newCards" :move="beforeMove" @end="onEnd" :animation=300>
          <card v-for="(card, index) in newCards" :key="index"
            :suit="card.suit" :number="card.number" :hide="false" :color="card.color">
          </card>
        </draggable>
      </div>
    </v-flex>
    <v-flex xs12 mt-2 pa-0 text-align-start>
      <span>Private area</span>
    </v-flex>
    <v-flex xs12 text-align-start>
      <div class="teal lighten-4 list">
        <draggable id="hand" class="draggbleArea" group="cards" :list="hand" :move="beforeMove" @end="onEnd" :animation=300>
          <card v-for="(card, index) in hand" :key="index"
            :suit="card.suit" :number="card.number" :hide="card.hide" :color="card.color">
          </card>
        </draggable>
        <div class="lable" v-if="hand.length==0">↑ Dragging Card Space</div>
      </div>
    </v-flex>
    <v-flex xs12 text-align-start>
      <div class="teal lighten-4 list">
        <draggable id="hand2" class="draggbleArea" group="cards" :list="hand2" :move="beforeMove" @end="onEnd" :animation=300>
          <card v-for="(card, index) in hand2" :key="index"
            :suit="card.suit" :number="card.number" :hide="card.hide" :color="card.color">
          </card>
        </draggable>
        <div class="lable" v-if="hand2.length==0">↑ Dragging Card Space</div>
      </div>
    </v-flex>
  </v-layout>
  <v-layout row wrap justify-start>
    User ID:{{this.getUserID()}}
  </v-layout>
</v-container>
</template>

<script>
import draggable from "vuedraggable";

import  * as deck from '../utils/deck'
import Card from './Card'
import { constants } from 'fs';

export default {
  name: 'player',
  components: { draggable, Card },
  props: ["mainMessageAtView","dataAll"],
  data () {
    return {
      userID: null,
      list: [],
      arena: [],
      newCards:  [],
      hand:  [],
      hand2: [],
      // myCards: this.arena.concat(this.newCards, this.hand, this.hand2 ),
      nothing_in_deck_flg: false,
    }
  },
  // beforeUpdate(){
  //   console.log("$cardAll :", JSON.stringify( this.$root.$cardAll ))
  //   if(this.$root.$cardAll==null){
  //     this.list = this.$root.$cardAll  = deck.deck;
  //   }
  // },
  created() {
    // console.log("$cardAll :", JSON.stringify( this.$root.$cardAll ))
    // console.dir(this.$root.$cardAll);
    // console.log("deck :", JSON.stringify( deck ))
    // let myCards = this.arena.concat(this.newCards, this.hand, this.hand2 );
    // console.dir(myCards);
    // if(myCards.length===0 || this.$root.$cardAll===4 ){
    //   // this.arena.push(   deck.pick());
    //   // this.arena.push(   deck.pick());
    //   // this.newCards.push( deck.pick());
    //   // this.hand.push(    deck.pick());
    // }

    // this.hand = this.dataAll;
    this.userID = this.getUserID();
    this.init();
  },
  updated() {
    this.userID = this.getUserID();
  },
  watch: {
    // hand(val, oldVal) {
    //   this.hand = this.dataAll;
    // },
    dataAll: {
      handler(val, oldVal) {
        this.distributeCardPlace(val);
      },
      deep: true
    },
    // arena(val) {
    //   let arena_temp = [];
    //   // console.dir( val );
    //   val.forEach(ele => {
    //     if(ele.own == this.userID ){
    //       // console.dir( ele );
    //       if(ele.arena){
    //         arena_temp.push( ele );
    //         // console.log( "arena");
    //         }
    //     }
    //     this.arena = arena_temp;
    //   });
    // }, 
    userID(val) {
      this.distributeCardPlace( this.dataAll );
    },
  },
  methods: {
    distributeCardPlace( val ){
      let newCards_temp = [];
      let arena_temp = [];
      let hand_temp = [];
      // console.dir( val );
      val.forEach(ele => {
        if(ele.own == this.userID ){
          // console.dir( ele );
          if(ele.arena==this.$newCards() ){
            newCards_temp.push( ele );
            // console.log( "arena");
           }else if(ele.arena==this.$arena() ){
            arena_temp.push( ele );
           }else{
            hand_temp.push( ele );
           }
        }
        this.newCards = newCards_temp;
        this.arena = arena_temp;
        this.hand2 = hand_temp;
        this.hand = []; //init
      });
    },
    init(){
      this.distributeCardPlace( this.dataAll );
    },
    draw () {
      let card = deck.pickCard( this.dataAll);
      console.dir(card);
      if( !card ){
        // this.$parent.mainMessage = "no card in deck";
        this.nothing_in_deck_flg = true
        return;
      }
      card.own = this.getUserID();
      card.arena = this.$newCards();
      this.firebaseSetCard( card );
      // this.newCards.push( card );
    },
    onEnd: function(evt) {  //hands[]用
      console.dir(evt.item.id);
      console.dir(evt.from.id);
      console.dir(evt.to.id);
      console.dir(evt);
      let cardObj;
      if(evt.from.id != this.$arena() 
         && evt.to.id == this.$arena() ){
          this.dataAll.forEach(ele => {
          if(ele.id==evt.item.id){
            cardObj = ele;
            cardObj.arena = this.$arena();
            this.firebaseSetCard( cardObj );
          }
        });
        console.log(cardObj);
      }else if(evt.from.id == this.$newCards() 
              && evt.to.id != this.$newCards() ){
        this.dataAll.forEach(ele => {
          if(ele.id==evt.item.id){
            cardObj = ele;
            cardObj.arena = null;
            this.firebaseSetCard( cardObj );
          }
        });
        console.log(cardObj);
      }else{
        this.dataAll.forEach(ele => {
          if(ele.id==evt.item.id){
            cardObj = ele;
            cardObj.arena = null;
            this.firebaseSetCard( cardObj );
          }
        });
        console.log(cardObj);
      }
        console.log(cardObj);
      // console.log(evt.to.dataset.columnId);
      // return evt.relatedContext.list.name !== 'newCards';
    },
    beforeMove: function(evt) {
      // console.log(evt.to.dataset.columnId);
      let newCardColumnflg = true;
      if(evt.to.id == this.$newCards() ){ newCardColumnflg = false}
      return newCardColumnflg;
    },
    listen() {  // データベースの変更を購読、最新状態をlistにコピーする
      firebase
        .database()
        .ref("myBoard/1")
        // .ref("myBoard/"+this.$route.params.id)
        .orderByChild('own').startAt('user_a').endAt('user_a')
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
            this.hand2 = list;
            // this.$parent.dataAll = list;
            // this.listen();
          }
        });
    },
  },
}
</script>


<style scoped>
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