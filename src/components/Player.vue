<template>
<v-container fluid grid-list-xs class="player">
  <v-layout row wrap justify-start>
    <v-flex xs4 text-align-start>
      <v-flex xs12 ma-0 pa-0>
        <span>Public area</span>
      </v-flex>
      <v-flex xs12 mt-1 pa-0>
        <div class="blue lighten-2 list">
          <draggable class="checkArena draggbleArea" group="cards" :list="arena" :move="beforeMove" @end="onEnd" :animation=300>
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
      <div class="teal lighten-3 list" v-if="newCard.length!=0">
        <span class="yellow label px-5 material">New!</span>
        <draggable group="cards" :list="newCard" :move="beforeMove" @end="onEnd" :animation=300 :data-column-id=1>
          <card v-for="(card, index) in newCard" :key="index"
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
        
        <draggable class="draggbleArea" group="cards" :list="hand" :move="beforeMove" @end="onEnd" :animation=300>
          <card v-for="(card, index) in hand" :key="index"
            :suit="card.suit" :number="card.number" :hide="card.hide" :color="card.color">
          </card>
        </draggable>
        <div class="lable" v-if="hand.length==0">↑ Dragging Card Space</div>
      </div>
    </v-flex>
    <v-flex xs12 text-align-start>
      <div class="teal lighten-4 list">
        <draggable class="draggbleArea" group="cards" :list="hand2" :move="beforeMove" @end="onEnd" :animation=300>
          <card v-for="(card, index) in hand2" :key="index"
            :suit="card.suit" :number="card.number" :hide="card.hide" :color="card.color">
          </card>
        </draggable>
        <div class="lable" v-if="hand2.length==0">↑ Dragging Card Space</div>
      </div>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import draggable from "vuedraggable";

import  * as deck from '../utils/deck'
import Card from './Card'

export default {
  name: 'player',
  components: { draggable, Card },
  props: {
    mainMessageAtView: {type: String},
  },
  data () {
    return {
      list: [],
      arena: [],
      newCard:  [],
      hand:  [],
      hand2: [],
      // myCards: this.arena.concat(this.newCard, this.hand, this.hand2 ),
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
    console.log("$cardAll :", JSON.stringify( this.$root.$cardAll ))
    console.dir(this.$root.$cardAll);
    // console.log("deck :", JSON.stringify( deck ))
    let myCards = this.arena.concat(this.newCard, this.hand, this.hand2 );
    console.dir(myCards);
    let pickCard = deck.pick("A");
    pickCard.own = "A";
    // if(myCards.length==0 && this.$root.$cardAll==4 ){
      this.arena.push(   deck.pick());
      this.arena.push(   deck.pick());
      this.newCard.push( deck.pick());
      this.hand.push(    deck.pick());
      // console.log( this.arena );
    // }
  },
  methods: {
    draw () {
      let card = deck.pick();
      if( !card ){
        // this.$parent.mainMessage = "no card in deck";
        this.nothing_in_deck_flg = true
        return;
      }
      console.log( card );
      this.newCard.push( card );
    },
    beforeMove: function(evt) {
      // console.log(evt.to.dataset.columnId);
      let newCardColumnflg = true;
      if(evt.to.dataset.columnId == 1){ newCardColumnflg = false}
      return newCardColumnflg;
    },
    onEnd: function(evt) {
      // console.log(evt.to.dataset.columnId);
      // return evt.relatedContext.list.name !== 'newCard';
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