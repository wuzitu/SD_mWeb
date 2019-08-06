<template>
  <div id="app">
    <el-row type="flex" justify="start">
      <el-button type="text" icon="el-icon-arrow-left" @click="backMain">返回首页</el-button>
      
      
    </el-row>
    <el-row type="flex" justify="start">
<h2>SD玩家要塞-机体详情</h2></el-row>
    <br>
    <detail></detail>
     
  </div>
</template>

<script>
import detail from "./detail.vue";

export default {
  name: "app",
  components: {
    detail
  },
  data() {
    return {
    };
  },
  methods: {
    backMain: function() {
      window.location.href = "/";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
