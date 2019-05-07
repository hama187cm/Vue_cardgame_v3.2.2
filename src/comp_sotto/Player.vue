<template>
<v-container fluid grid-list-xs class="player">
  <v-layout row wrap justify-start>
    <v-flex xs5 text-align-start>
      <v-flex xs12 ma-0 pa-0>
        <span>Public area</span>
      </v-flex>
      <v-flex xs12 mt-1 pa-0>
        <div class="blue lighten-2 list">
          <draggable class="checkArena draggbleArea" group="cards" :list="arena" :move="beforeMove" :animation=300>
            <card v-for="(card, index) in arena" :key="index"
              :suit="card.suit" :number="card.number" :hide="card.hide">
            </card>
          </draggable>
          <div class="lable" v-if="arena.length==0">↑ Dragging Card Space</div>
        </div>
      </v-flex>
    </v-flex>
    <v-flex xs4>
      <div class="teal lighten-3 list" v-if="newCard.length!=0">
        <span class="yellow label px-5 material">New!</span>
        <draggable group="cards" :list="newCard" :move="beforeMove" :animation=300 :data-column-id=1>
          <card v-for="(card, index) in newCard" :key="index"
            :suit="card.suit" :number="card.number" :hide="true">
          </card>
        </draggable>
      </div>
    </v-flex>
    <v-flex xs3 mt-2>
      <v-btn @click="draw">New Game</v-btn>
    </v-flex>
    <v-flex xs12 mt-2 pa-0 text-align-start>
      <span>Private area</span>
    </v-flex>
    <v-flex xs12 text-align-start>
      <div class="teal lighten-4 list">
        
        <draggable class="draggbleArea" group="cards" :list="hand" :move="beforeMove" :animation=300>
          <card v-for="(card, index) in hand" :key="index"
            :suit="card.suit" :number="card.number" :hide="card.hide">
          </card>
        </draggable>
        <div class="lable" v-if="hand.length==0">↑ Dragging Card Space</div>
      </div>
    </v-flex>
    <v-flex xs12 text-align-start>
      <div class="teal lighten-4 list">
        <draggable class="draggbleArea" group="cards" :list="hand2" :move="beforeMove" :animation=300>
          <card v-for="(card, index) in hand2" :key="index"
            :suit="card.suit" :number="card.number" :hide="card.hide">
          </card>
        </draggable>
        <div class="lable" v-if="hand2.length==0">↑ Dragging Card Space</div>
      </div>
    </v-flex>
    <v-flex xs12 mb-1 pa-0>
      <v-layout row wrap justify-start>
          <v-flex xs3 mx-2>
            <div class="grey lighten-3 my-2 py-1 material"  @click="onDeviceorientation">on 伏せCheck</div>
            <!-- <div class="label" v-if="orientationData!=''">x: {{ orientation_beta }}, <br />y: {{ orientation_gamma }}</div> -->
            <div class="label" v-if="orientationData!=''">{{ orientationData }}</div>
          </v-flex>
          <v-flex xs3 mx-2>
            <div class="grey lighten-3 my-2 py-1 material"  @click="offDeviceorientation">off 伏せCheck</div>
          </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import draggable from "vuedraggable";

import pick from '../utils/deck'
import Card from './Card'

export default {
  name: 'player',
  components: { draggable, Card },
  data () {
    return {
      arena: [],
      newCard:  [],
      hand:  [],
      hand2: [],
      orientationOnFlg: false,
      orientation_beta: 0,
      orientation_gamma: 0,
      orientationData: '',
      updateEventListenerTimer : null,
    }
  },
  created: function () {
      this.hand.push(pick());
      this.hand.push(pick());
      this.hand.push(pick());
      this.hand.push(pick());
      this.hand.push(pick());
  },
  methods: {
    draw () {
      this.newCard.push(pick());
      this.newCard.push(pick());
      this.newCard.push(pick());
      this.newCard.push(pick());
      this.newCard.push(pick());
    },
    beforeMove: function(evt) {
      // console.log(evt);
      // console.log(evt.to.dataset.columnId);
      let newCardColumnflg = true;
      if(evt.to.dataset.columnId == 1){ newCardColumnflg = false}
      return newCardColumnflg;
    },
    // deviceorientationあたりを後でcomponet化する
    onDeviceorientation: function() {
      // this.orientationOnFlg = true;
      // モバイル端末の傾きを JavaScript で受け取る : https://gomiba.co.in/blog/archives/2463
      window.addEventListener('deviceorientation', this.setDeviceorientation, false);
      // this.$on('deviceorientation', this.setDeviceorientation);
      this.updateEventListenerTimer = setInterval(this.offDeviceorientation, 10*60*1000)
    },
    setDeviceorientation: function(evt) {
      // this.orientation_beta = evt.beta;
      console.log({
          beta: evt.beta,   // x 軸
          gamma: evt.gamma, // y 軸
          // alpha: evt.alpha, // z 軸
      })
      // this.mainMessage = 'x:' & event.gamma & ',y:' & event.gamma & ',z:' & event.beta
      this.orientation_beta = Math.floor( event.beta  *10)/10;
      this.orientation_gamma = Math.floor( event.gamma *10)/10;
      // let data_z = Math.floor( event.alpha *10)/10;
      // this.orientationData = `  x:${data_x}, y:${data_y}, z:${data_z}`;
      this.orientationData = `  x:${this.orientation_beta}, y:${this.orientation_gamma}`;
      this.mainMessage = "10分以内にスマホを伏せてください";
    },
    offDeviceorientation: function(){
      window.removeEventListener('deviceorientation', this.setDeviceorientation, false)
      // this.$off('deviceorientation', this.setDeviceorientation);
      clearInterval(this.updateEventListenerTimers);
    },
  },
  // watch: {
  //   orientation_beta: {
  //     handler: function(val){
  //       this.orientationData = `  x:${val}`;
  //     },
  //   },
  //   orientation_gamma: {
  //     handler: function(val){
  //       this.orientationData = `  y:${val}`;
  //     },
  //   },
  // },
}
</script>