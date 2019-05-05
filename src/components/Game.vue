<template>
  <div class="game">
    <!-- <span>Arena er</span> -->
    <!-- <dealer ref="dealer" @result="postexec" /> -->
    <!-- <div class="message">
      {{ mainMessage }}
    </div> -->
    <player @stand="stand" :showButtons="showButtons" />
    <div class="message result">
      {{ resultMessage }}
    </div>
  </div>
</template>

<script>

import Dealer from './Dealer'
import Player from './Player'

export default {
  name: "game",
  components: { Dealer, Player },
  data () {
    return {
      mainMessage: 'Welcome to Black Jack',
      playersResult: 0,
      dealersResult: 0,
      showButtons: true,
    }
  },
  methods: {
    stand: function (playersResult) {
      this.playersResult = playersResult;
      this.$refs.dealer.$emit('postexec', playersResult === 'Bust')
    },
    postexec: function (dealersResult) {
      this.dealersResult = dealersResult
      this.showButtons = false
      this.mainMessage = `Dealer : ${dealersResult} / Player : ${this.playersResult}`
    },
  },
  computed: {
    resultMessage: function () {
      if (this.showButtons) {
        return ''
      }
      if (this.playersResult > this.dealersResult || this.dealersResult === 'Bust') {
        return 'You Win'
      }
      if (this.playersResult < this.dealersResult || this.playersResult === 'Bust') {
        return 'You Lose'
      }
      return 'Draw'
    }
  }
}
</script>
<style>
.material{
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
.card {
  padding: 8px;
  margin: 4px;
  width: 50px;
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  cursor: grab;
  /* float:  left;  */
}
.lable{
  text-align: left;
}
/* .label{
  padding-top: 8px;
} */
</style>