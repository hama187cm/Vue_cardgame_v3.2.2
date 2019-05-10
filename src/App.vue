<template>

<div id="app">
  <v-container ma-0 pa-0>
    <v-layout align-start justify-start>
      <v-flex xs2 text-align-start>
        <router-view />
      </v-flex>
      <v-flex xs2 text-align-start>
        <navigation />
      </v-flex>
    </v-layout>
  </v-container>
  <game /> ,  
</div>
</template>

<script>
import Navigation from "./components/Navigation";
import Game from './components/Game'
// import Player from './comp_sotto/Player'
// import pick from './utils/deck' //drawをApp.vueで実行用

export default {
  name: 'app',
  components: { Navigation, Game },
  // data () {
  //   return {
  //     mainMessage: 'Welcome to Game',
  //   }
  // },,
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
ul {
  margin: 1;
  padding: 0;
}
li {
  display: inline-block;
  margin: 1px 2px 1px;
  padding: 0px;
}

.material{
  /* border: 1px solid #222; */
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
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
