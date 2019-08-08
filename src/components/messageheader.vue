<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 21:31:39
 * @LastEditTime: 2019-08-08 20:59:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="header" @click="calloRigin">
    <img :src="logoDataurl" class="logo-img" />
    <!-- 搜索 -->
    <section class="section">
      <span>
        <!-- 修改图片颜色 -->
        <i class="el-icon-search"></i>
      </span>
      <input
        type="text"
        v-model="searchInput"
        placeholder="请输入文章名或者作者名"
        @click="inputClick"
        @blur="inputBlur"
        @mouseout="inputBlur"
        @change="changeMethod"
      />
      <div v-show="searchDiv" class="search-div">
        {{ searchInput ? searchInput : "搜索中..." }}
      </div>
    </section>
    <!-- 头像 -->
    <drop class="drop" @register="huoqushuju"></drop>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { soushu } from "@/request/api.js";
import drop from "./drop.vue";
@Component({
  components: {
    drop
  }
})
export default class messageheader extends Vue {
  public iconSearch: String = "sousuo";
  public iconName: String = "search";
  public searchDiv: Boolean = false;
  public searchInput: any = "";
  public logoDataurl: any = require("../assets/img/logo.png");
  public huoqushuju(res: any) {
    this.$emit("input", res);
  }
  public calloRigin() {
    this.$router.push({ path: "/" });
  }
  public inputClick() {
    this.searchDiv = true;
  }
  public inputBlur() {
    this.searchDiv = false;
  }
  public changeMethod() {
    let data = {
      request: 2,
      title: this.searchInput
    };
    soushu(data)
      .then(res => {
        if (res.data.errNo === 0) {
          console.log(res.data.data.total);
          if (res.data.data.total === 0) {
            this.$message({
              type: "warning",
              message: "没有相关的文章"
            });
          } else {
            this.$router.push({
              path: "/ShowIndex",
              query: { content: res.data.data.article }
            });
          }
        }
      })
      .catch(err => {
        throw err;
      });
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  position: relative;
  align-items: center;
  background: #42c57a;
  vertical-align: center;
  padding: 10px 0 10px 20px;
  .logo-img {
    width: 200px;
  }
  .section {
    background: #fff;
    padding: 5px 10px 6px 10px;
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
}
.search-div {
  text-align: center;
  width: 240px;
  // height: 100px;
  padding: 10px 0;
  background: #fff;
  position: absolute;
  top: 40px;
  left: 0px;
  z-index: 30;
}
</style>
