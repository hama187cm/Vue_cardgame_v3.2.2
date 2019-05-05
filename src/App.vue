<template>
<div id="app">
  <v-container fluid grid-list-xs>
    <v-layout row wrap justify-start>

      <v-flex xs6 pt-3>
        <div class="message">{{ mainMessage }}</div>
        <div class="message">{{ orientationData }}</div>
      </v-flex>
      <v-flex xs6>
        <v-btn @click="getDeviceorientation">getDeviceorientation</v-btn>
        <v-btn @click="setDeviceorientation">setDeviceorientation</v-btn>
      </v-flex>

      <v-flex xs12 mb-2>
        <div class="game">
          <!-- <span>Arena er</span> -->
          <!-- <dealer ref="dealer" @result="postexec" /> -->
          <!-- <div class="message">
            {{ mainMessage }}
          </div> -->
          <player />
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</div>
</template>

<script>
import Dealer from './components/Dealer'
import Player from './components/Player'

export default {
  name: 'app',
  components: { Dealer, Player },
  data () {
    return {
      mainMessage: 'Welcome to Game',
      playersResult: 0,
      dealersResult: 0,
      showButtons: true,
      orientationData: '',
      updateEventListenerTimer : null
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
    getDeviceorientation: function(evt) {
      // モバイル端末の傾きを JavaScript で受け取る : https://gomiba.co.in/blog/archives/2463
      window.addEventListener('deviceorientation', this.setDeviceorientation, false)
    },
    setDeviceorientation: function(evt) {
      console.log({
          beta: evt.beta,   // x 軸
          gamma: evt.gamma, // y 軸
          alpha: evt.alpha, // z 軸
      })
      // this.mainMessage = 'x:' & event.gamma & ',y:' & event.gamma & ',z:' & event.beta
      let data_x = Math.floor( event.beta  *10)/10;
      let data_y = Math.floor( event.gamma *10)/10;
      let data_z = Math.floor( event.alpha *10)/10;
      this.orientationData = `  x:${data_x}, y:${data_y}, z:${data_z}`;

      this.mainMessage = "1分以内にスマホを伏せてください";
      
      this.updateEventListenerTimer = setInterval(this.kickRemoveEventListener, 5*1000)
    },
    kickRemoveEventListener: function(){
      window.removeEventListener('deviceorientation', this.setDeviceorientation, false)
      clearInterval(this.updateEventListenerTimers)
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
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.material{
  /* border: 1px solid #222; */
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
.list{
  margin: 1px;
  padding: 4px;
  border-radius: 8px;
}
.card {
  margin: 8px;
  padding: 4px;
  width: 50px;
  text-align: center;
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  cursor: grab;
  /* float:  left;  */
}
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
  min-height: 200px;
}
</style>
