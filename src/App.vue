<template>

<div id="app">
  <v-container ma-1 pa-0>
    <v-layout align-center justify-start>
        <router-view />
        <ul>
          <li>
            <router-link to="/" exact-active-class!="active"><a>Home</a></router-link>
          </li>
          <li>
            <router-link to="/table" exact-active-class!="active"><a>Table</a></router-link>
          </li>
          <li>
            <div class="label">{{ mainMessage }}</div>
          </li>
        </ul>
    </v-layout>
  </v-container>
  <game mainMessage/> ,  
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
  data () {
    return {
      mainMessage: 'Welcome to Game',
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
ul {
  margin: 2px;
  padding: 0;
}
li {
  display: inline-block;
  margin: 1px 4px 1px;
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
