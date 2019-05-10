<template>
<div class="card cardRow">
  <div class="cardStyle cardStyle_backPlus" v-if="this.hide">
    back
  </div>
  <div class="cardStyle" v-else>
    <span v-bind:style="{ color: 'red' }"
     v-if="this.suit==this.allStuits[2] | this.suit==this.allStuits[3]">
      {{this.suit}}<br />{{this.number}}
    </span>
    <span v-else>
      {{this.suit}}<br />{{this.number}}
    </span>
  </div>
</div>
</template>

<script>
import  * as deck from '../utils/deck'

export default {
  name: 'card',
  props: {
    number: Number,
    suit: String,
    hide: Boolean,
  },
  data () {
    return {
      suitColor2: false,
      allStuits: deck.allSuits,
    }
  },
  created: function () {
    for( let val of deck.suits_red){
      if(this.suit==val){
        this.suitColor2 = true;
      }
      // console.log(this.suit +"/"+val);
    }
  },
  // computed: {
  //   getcardData: function () {
  //     const cardData = this.hide ? 'back' : `${this.suit}_${this.number.toString().padStart(2, "0")}`
  //     return cardData;
  //   }
  // }
}
</script>

<style>
div.cardStyle {
  margin: 4px;
  padding: 4px;
  width: 40px;
  text-align: center;
  font-size: large;
  border: 0px;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  cursor: grab;
}
div.cardStyle_backPlus {
  font-size: small!important;
  height: 50px;
}
div.cardRow{
  display: table-cell;
  /* display: table; */ /* ←を親divに指定無しでも動作したので使っていない */
}
</style>
