<template>
<v-app>
  <div id="app">
    <div class="main-container">
    <div>
    <recruitment/>
    </div>
  </div>
  </div>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data:()=>({
 
  })
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

#app{
  font-family: 'Roboto Mono', Roboto, Noto, Helvetica, Arial, sans-serif;
  font-size: $font-size-root;
  //background-image: url('./assets/background.jpg');
  background-image: linear-gradient(
to bottom, #3c0101, #100000);
  background-size: cover;
  background-attachment: fixed;
}
.main-container{
  width: 94%;
  max-width: 1280px;
  margin:10px auto;
}
</style>
