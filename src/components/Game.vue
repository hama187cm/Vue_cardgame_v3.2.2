<template>
<v-container fluid grid-list-xs id="game">
  <v-layout row wrap justify-start>
    <v-flex xs12 mb-1 pa-0>
      <div class="message">{{ mainMessage }}</div>
    </v-flex>
    <v-flex xs12 mb-1 pa-0>
      <player />
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import Player from './Player'
// import pick from './utils/deck' //drawをGame.vueで実行用

export default {
  name: 'game',
  components: { Player },
  data () {
    return {
      mainMessage: 'Welcome to Game',
    }
  },
  // methods: {
    // draw () {  //drawをApp.vueで実行用
    //   this.newCard.push(pick());
    // },
    // deviceorientationあたりを後でcomponet化する
    // onDeviceorientation: function() {
    //   // モバイル端末の傾きを JavaScript で受け取る : https://gomiba.co.in/blog/archives/2463
    //   window.addEventListener('deviceorientation', this.setDeviceorientation, false);
    //   // this.$on('deviceorientation', this.setDeviceorientation);
    //   this.updateEventListenerTimer = setInterval(this.offDeviceorientation, 10*60*1000)
    // },
    // setDeviceorientation: function(evt) {
    //   console.log({
    //       beta: evt.beta,   // x 軸
    //       gamma: evt.gamma, // y 軸
    //       // alpha: evt.alpha, // z 軸
    //   })
    //   // this.mainMessage = 'x:' & event.gamma & ',y:' & event.gamma & ',z:' & event.beta
    //   let data_x = Math.floor( event.beta  *10)/10;
    //   let data_y = Math.floor( event.gamma *10)/10;
    //   // let data_z = Math.floor( event.alpha *10)/10;
    //   // this.orientationData = `  x:${data_x}, y:${data_y}, z:${data_z}`;
    //   this.orientationData = `  x:${data_x}, y:${data_y}`;
    //   this.mainMessage = "10分以内にスマホを伏せてください";
    // },
    // offDeviceorientation: function(){
    //   window.removeEventListener('deviceorientation', this.setDeviceorientation, false)
    //   // this.$off('deviceorientation', this.setDeviceorientation);
    //   clearInterval(this.updateEventListenerTimers);
    // },
  // },
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
</style>
