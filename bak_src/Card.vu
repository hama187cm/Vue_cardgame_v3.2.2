<template>
  <div class="card">
    {{getcardData}}
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    number: Number,
    suit: String,
    hide: Boolean,
  },
  computed: {
    getcardData: function () {
      const cardData = this.hide ? 'back' : `${this.suit}_${this.number.toString().padStart(2, "0")}`
      return cardData;
    }
  }
}
</script>

<style>
div.card {
  padding: 8px;
  margin: 4px;
  width: 50px;
  border: 1px solid #222;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  cursor: grab;
}
</style>
