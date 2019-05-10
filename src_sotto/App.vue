<template>
<v-container fluid grid-list-xs id="app">
  <v-layout row wrap justify-start>
    <v-flex xs12 mb-1 pa-0>
      <div class="message">{{ mainMessage }}</div>
    </v-flex>
    <v-flex xs12 mb-1 pa-0>
      <player />
    </v-flex>
    <v-flex xs12 mb-1 pa-0>
      <player2 />
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
// import Player from './components/Player'
import Player from './components/Player'
import Player2 from './components/Player'

export default {
  name: 'app',
  components: { Player, Player },
  data () {
    return {
      mainMessage: 'Welcome to Game',
    }
  },
  methods: {
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
