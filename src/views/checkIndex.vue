<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 21:36:36
 * @LastEditTime: 2019-08-08 20:58:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <messageheader></messageheader>
    <div class="look">
      <h1>{{ title.title }}</h1>
      <div class="show-article" v-html="title.content"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import messageheader from "@/components/messageheader.vue";
@Component({
  components: {
    messageheader
  }
})
export default class checkIndex extends Vue {
  public title: any = "";
  mounted() {
    this.title = this.$route.query.hotTitle;
  }
}
</script>
<style lang="less" scoped>
.look {
  padding: 20px 100px;
  h1 {
    height: 50px;
    border-bottom: 1px solid #42c57a;
  }
  .show-article {
    border: 1px solid #42c57a;
    margin-top: 10px;
    height: 400px;
    padding: 20px;
    // flex:1;
  }
}
</style>
