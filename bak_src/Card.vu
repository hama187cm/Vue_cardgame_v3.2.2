<template>
  <div id="app">
    <draggable :options="{ group: 'tasks' }" element="ul" v-for="list in tasks">
      <li v-for="item in list.cards">{{ item }}</li>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  name: 'card',
  components: {
    draggable,
  },
  data() {
    return {
      tasks: [
        { label: "public",
          cards: ['task1-1', 'task1-2', 'task1-3', 'task1-4'],
        },
        { label: "space1",
          cards: ['task2-1', 'task2-2', 'task2-3', 'task2-4'],
        },
        { label: "space2",
          cards: ['task3-1', 'task3-2', 'task3-3', 'task3-4']
        },
      ]
    }
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: space-around;
}
ul {
  list-style: none;
  padding:8px;
  margin: 8px;
  width: 150px;
  border: 1px solid #222;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
}
li {
  padding: 8px;
  margin: 4px;
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  z-index: 99999;
  cursor: grab;
}
</style>
