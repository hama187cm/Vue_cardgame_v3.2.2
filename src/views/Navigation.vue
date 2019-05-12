<template>
<!-- <v-flex xs12 class="navigation"> -->
<ul id="navigation">
  <!-- <li v-for="tab in tabs" :key='tab.name' class="blue-grey lighten-4 pa-1"> -->
    <!-- data () {
      return {
        tabs: [{  name: 'Home',
                  path: '/',
                },
                {  name: 'Table',
                  path: '/table',
                },
        ],
      }
    }, -->
  <li v-for="tab in this.$router.options.routes" :key='tab.name' class="blue-grey lighten-4 mr-2">
    <router-link :to="{ path : tab.path}" v-if="tab.name!=$route.name">
      <a>{{tab.name}}</a>
    </router-link>
    <span v-else>{{tab.name}}</span>
  </li>
  <!-- <li>
    <v-btn primary @click="$emit('panret_login')">
      匿名ユーザーでログイン
    </v-btn>
  </li> -->
  <!-- <li>
    <div>"{{ mainMessage }}"</div>
  </li> -->
</ul>
<!-- </v-flex> -->
</template>

<script>
export default {
  name: 'navigation',
  props: {
    mainMessage: {type: String},
  },
  // data () {
  //   return {
  //     tabs: [{  name: 'Home',
  //               path: '/',
  //             },
  //             {  name: 'Table',
  //               path: '/table',
  //             },
  //     ],
  //   }
  // },
  created() {
    // console.dir(["debug", this.$route.name ]);
    // console.dir(["debug-all", this.$router ]);
    // console.dir(["debug-all", this.$router.options ]);
    // console.dir(["debug-all", this.$router.currentRoute ]);
  }
}
</script>

<style>
ul {
  margin: 0;
  padding: 0;
  /* border-bottom: solid 1px #000000; */
}
li {
  display: inline-block;
}
.navi_bar{
  text-align: left;
  border-bottom: solid 1px #000000;
}

</style>