<template>
  <div id="app">
    
   <h1>单个机体编辑</h1>
   <ManageGundam></ManageGundam>
  </div>
</template>

<script>
import ManageGundam from './ManageGundam.vue'

export default {
  name: 'app',
  components: {
    ManageGundam
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
