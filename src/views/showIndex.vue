<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 23:17:31
 * @LastEditTime: 2019-08-08 20:57:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <messageheader></messageheader>
    <canvanStart></canvanStart>
    <div class="definite">
      <timeLine :gainData="gainData"> </timeLine>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import messageheader from "@/components/messageheader.vue";
import timeLine from "@/components/TimeLine.vue";
import canvanStart from "@/components/canvanStart.vue";
import moment from "moment";
// import { huoquxinxi } from "@/request/api";
@Component({
  components: {
    timeLine,
    messageheader,
    canvanStart
  }
})
export default class showIndex extends Vue {
  public gainData: any = [];
  public gain: any = [];
  public infoDtat: any = {
    authorName: "",
    authorId: "",
    qianMing: "",
    photo: ""
  };
  mounted() {
    console.log(this.gainData);
    if (this.$route.query.content[0] === "[object Object]") {
      console.log(this.gainData);
    } else {
      this.gainData = this.$route.query.content;
    }
  }
}
</script>
<style lang="less" scoped>
.definite {
  min-width: 400px;
  max-width: 600px;
}
</style>
