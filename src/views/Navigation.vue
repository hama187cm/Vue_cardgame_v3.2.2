<template>
<!-- <span class="navigation"> -->
<ul id="navigation" v-if="$route.params.id">
  <li v-for="tab in tabs" :key='tab.name' class="blue-grey lighten-4 mr-2">
    <router-link :to="{ path : tab.path}" v-if="tab.name!=$route.name">
      <a>{{tab.name}}</a>
    </router-link>
    <span v-else>{{tab.name}}</span>
  </li>
  <li class="blue-grey lighten-4 mr-2 px-1 devOnly">
    <router-link to="/1/user_a/table/">
      <a>1/a</a>
    </router-link>
  </li>
  <li class="blue-grey lighten-4 mr-2 px-1 devOnly">
    <router-link to="/1/user_b/table/">
      <a>1/b</a>
    </router-link>
  </li>
  <!-- <li v-for="tab in this.$router.options.routes" :key='tab.name' class="blue-grey lighten-4 mr-2">
    <router-link :to="{ name : tab.name}" v-if="tab.name!=$route.name">
      <a>{{tab.name}}</a>
    </router-link>
    <span v-else>{{tab.name}}</span>
  </li> -->
  <!-- <li>
    <v-btn primary @click="$emit('panret_login')">
      匿名ユーザーでログイン
    </v-btn>
  </li> -->
  <!-- <li>
    <div>"{{ mainMessage }}"</div>
  </li> -->
</ul>
<!-- </span> -->
</template>

<script>
export default {
  name: 'navigation',
  props: {
    mainMessage: {type: String},
  },
  data () {
    return {
      prePath: "",
      tabs: [{  name: 'Home',
                path: '/',
              },
              {  name: 'Table',
                path: '/table',
              },
      ],
    }
  },
  created() {
    // console.log("1", JSON.stringify(this.tabs));
    // console.log("2", JSON.stringify(this.$router.options.routes));

    //todo★: あとでmethod化
    let tmpArr = [];
    this.tabs.forEach(el => {
      let tmpTab = el;
      tmpTab.path = el.path.replace(":id",this.$route.params.id);
      // console.dir(tmpTab);
      tmpArr.push(tmpTab);
    });
    this.tabs = tmpArr;

    // if(this.$route.params.id){
    //   this.tabs.replace("",);
    // }
    // console.log(JSON.stringify(this.$route.params));

    // if(this.$route.params){
    //   this.prePath=this.$route.params+"/";
    // }

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