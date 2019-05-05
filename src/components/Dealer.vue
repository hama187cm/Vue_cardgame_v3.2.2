<template>
  <div class="dealer">
    <div class="container">
      <div class="row">
        <div class="col s6">
      <card v-for="(card, index) in hand"
            :key="index"
            :suit="card.suit"
            :number="card.number"
            :hide="card.hide"
      ></card>
    </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

import pick from "../utils/deck";
import calc from "../utils/calc";
import Card from "./Card";

export default {
  name: "dealer",
  components: { draggable, Card },
  data() {
    return{
      arenaSpaces:[
        {name:"unfinish"}, 
        {name:"Create a document"}, 
        {name:"Appointment"}
      ],
      privateSpaces:[
        {name:"Yesterday finish"},
        {name:"Yesterdat Appointment"}
      ],
      arena:[ ["area1"],[],[],
      ],
      hand: [],
    };
  },
  created: function() {
    this.hand.push(pick());

    this.hand[0].hide = true;

    this.$on("postexec", this.postexec);
  },
  methods: {
    postexec(playerBust) {
      this.hand[0].hide = false;
      // プレイヤーがBustしてない場合、17を超えるまでカードを引く
      while (!playerBust && calc(this.hand) < 17) {
        this.hand.push(pick());
      }
      this.$emit("result", calc(this.hand));
    },
    beforeMove: function(evt) {
      return evt.draggedContext.element.name !== 'Meeting';
    },
    onEnd: function(evt) {
      console.log(evt);
    },
  }
};
</script>

<style>
div.dealer {
  display: flex;
  justify-content: space-around;  /*均等に間隔をあける・両端にも間隔をあける*/

  padding: 8px;
  margin-bottom: 8px;
  width: 800px;
  border: 1px solid #222;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
div.area {
  padding: 8px;
  margin: 8px;
  width: 150px;
  border: 1px solid #222;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
#app {
  display: flex;
  justify-content: space-around;
}
ul {
  witdh: 150px;
  list-style: none;
  padding: 20px;
  margin: 20px;
  border: 1px solid #222;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
.card {
  witdh: 350px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  z-index: 99999;
  cursor: grab;
}
.noWrap {
    display: inline-block!import; /* インラインブロック化 */
}
</style>
