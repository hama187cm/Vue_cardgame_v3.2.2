<template>
<div class="card cardRow" :id="this.suit+this.number">
  <div class="cardStyle cardStyle_backPlus" v-if="this.hide">
    back
  </div>
  <div class="cardStyle" v-else>
    <span v-bind:style="{ color: this.color }"
     v-if="this.color">
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
  props: ["number","suit","color","hide"],
  // {
  //   number: Number,
  //   suit: String,
  //   hide: Boolean,
  // },
  // data () {
  //   return {
  //     cardId: null
  //   }
  // },
  // created: function () {
  //   this.id = this.suit+this.number;
  // },
  // computed: {
  //   getcardData: function () {
  //     const cardData = this.hide ? 'back' : `${this.suit}_${this.number.toString().padStart(2, "0")}`
  //     return cardData;
  //   }
  // }
}
</script>

<style scoped>
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
  /* display: inline-block; */
  text-align: center;
  /* display: table; */ /* ←を親divに指定無しでも動作したので使っていない */
}
</style>
