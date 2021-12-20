<template>
  <div class="hello">
    <img class="id-avatar" src="@/assets/avatar/55.png" alt="amiya">
    <img class="id-avatar" src="@/assets/Icon/logo.png" alt="logo">
  <div>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.id{
  &-avatar {
    margin:15px auto;
    display: block;
    width: 130px;
    height: 130px;
    border:2px solid gray;
    border-radius: 65px;
    padding: 0.5px;
    background-color: white;
  }
}
.btn{
  background-color: #22c7dd !important;
}
</style>
