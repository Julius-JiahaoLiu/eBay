<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>Bot name: {{ botName }}</h1>
  </div>
</template>

<script>
import $ from 'jquery'
import { ref } from 'vue';

export default {
  name: 'HelloWorld',
  setup() {
    const botName = ref("");
    $.ajax({
      url: 'http://localhost:3000/test/firstMethod',
      type: 'GET',
      success: resp => {
        console.log(resp);
        botName.value = resp.name;
      }
    })
    return { botName }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
