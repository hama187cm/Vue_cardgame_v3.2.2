<template>
<v-container ma-0 pa-0>
    <v-layout align-start justify-start>
      <v-flex xs4 ma-1 pa-0 text-align-start>
        <router-link to="/">Home</router-link>
      </v-flex>
      <v-flex xs4 ma-1 pa-0 text-align-start>
        <router-link to="/table">Table</router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Navigation'
  }
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display: inline-block;
    padding: 1em 0.5em;
  }
</style>