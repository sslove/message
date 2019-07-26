<template>
  <div class="header">
    <img :src="logoDataurl" class="logo-img" />
    <!-- 搜索 -->
    <section class="section">
      <span>
        <!-- 修改图片颜色 -->
        <icon :icon-class="iconSearch" :class-name="iconName"></icon>
      </span>
      <input type="text" placeholder="请输入文章名或者作者名" />
    </section>
    <!-- 头像 -->
    <drop class="drop"></drop>
  </div>
</template>

<script>
import drop from "./drop";
// import register from './register'
export default {
  name: "messageheader",
  components: {
    drop
    // register
  },
  data() {
    return {
      iconSearch: "sousuo",
      iconName: "search",
      logoDataurl: require("../assets/img/logo.png")
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  display: flex;
  position: relative;
  align-items: center;
  background: #42c57a;
  vertical-align: center;
  padding: 10px 0 10px 20px;
}
.logo-img {
  width: 200px;
}
.section {
  background: #fff;
  padding: 5px 10px;
  display: inline-block;
  border-radius: 5px; //需要修改为半圆
  // float:right;
  position: absolute;
  left: 73%;
  input {
    border: none;
    background: none;
    width: 200px;
  }
  input:focus {
    outline: none;
  }
}
.drop {
  position: absolute;
  left: 94%;
}
</style>
