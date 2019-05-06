<template>
<div class="player">
  <v-container fluid grid-list-xs>
    <v-layout row wrap justify-start>
      <v-flex d-flex xs1 mb-2>
        <v-btn @click="draw">Draw</v-btn>
        <!-- <v-btn @click="hit">Hit</v-btn>
        <v-btn @click="stand">Stand</v-btn> -->
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-start>
      <v-flex xs4 text-align-start>
        <v-flex xs12 ma-0 pa-0 text-align-start>
          <span>Public area</span>
        </v-flex>
        <v-flex xs12 ma-1 pa-0 align-self-center1>
          <div class="blue lighten-2 list">
            <draggable class="checkArena draggbleArea" group="cards" :list="arena" :move="beforeMove" @end="onEnd" :animation=300>
              <div class="card" v-for="(card, index) in arena" :key="index"  :data-column-id=94>
                  {{card.suit}} {{card.number}}
              </div>
            </draggable>
          </div>
          <div class="lable">(↑) Dragging Card Space</div>
        </v-flex>
      </v-flex>
      <v-flex xs8 text-align-start>
        <v-flex xs6 ma-0 pa-0 text-align-start>
          <span>Private area</span>
        </v-flex>
        <v-layout row wrap justify-start>
          <v-flex xs6 text-align-start>
            <div class="teal lighten-4 list">
              
              <div class="teal lighten-3 list" v-if="newCard.length!=0">
                <div class="yellow label material">New!</div>
                <draggable group="cards" :list="newCard" :move="beforeMove" @end="onEnd" :animation=300 :data-column-id=1>
                  <div class="card" v-for="(card, index) in newCard" :key="index">
                      {{card.suit}} {{card.number}}
                  </div>
                </draggable>
              </div>

              <draggable class="draggbleArea" group="cards" :list="hand" :move="beforeMove" @end="onEnd" :animation=300>
                <div class="card" v-for="(card, index) in hand" :key="index">
                    {{card.suit}} {{card.number}}
                </div>
              </draggable>
            </div>
            <div class="lable">(↑) Dragging Card Space</div>
          </v-flex>
          <v-flex xs6 text-align-start>
            <div class="teal lighten-4 list">
              <draggable class="draggbleArea" group="cards" :list="hand2" :move="beforeMove" @end="onEnd" :animation=300>
                <div class="card" v-for="(card, index) in hand2" :key="index">
                    {{card.suit}} {{card.number}}
                </div>
              </draggable>
            </div>
            <div class="lable">(↑) Dragging Card Space</div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import draggable from "vuedraggable";

import pick from '../utils/deck'

export default {
  name: 'player',
  components: { draggable },
  data () {
    return {
      arena: [],
      newCard:  [],
      hand:  [],
      hand2: [],
    }
  },
  created: function () {
      this.newCard.push(pick());
      this.newCard.push(pick());
      // this.hand.push(pick());
  },
  methods: {
    draw () {
      this.newCard.push(pick());
    },
    beforeMove: function(evt) {
      // console.log(evt);
      // console.log(evt.to.dataset.columnId);
      let newCardColumnflg = true;
      if(evt.to.dataset.columnId == 1){ newCardColumnflg = false}
      return newCardColumnflg;
    },
    onEnd: function(evt) {
      // console.log(evt);
      // console.log(evt.to.dataset.columnId);
      // return evt.relatedContext.list.name !== 'newCard';
    },
  },
}
</script>