<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 19:51:43
 * @LastEditTime: 2019-08-08 20:54:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { Component, Vue, Emit } from "vue-property-decorator";
import canvanStart from "./components/canvanStart.vue";
@Component({
  components: {
    canvanStart
  }
})
export default class App extends Vue {}
</script>
<style lang="less">
/* 修改默认的样式 */
body {
  margin: 0;
  padding: 0;
}
ul {
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
ul {
  list-style-type: none;
}
p {
  display: block;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>
