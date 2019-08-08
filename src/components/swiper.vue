<template>
  <div>
    <el-carousel>
      <el-carousel-item
        v-for="(item, index) in swiperList"
        :key="index"
        :style="item.style"
      >
        <h3>{{ item.html }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Swiper extends Vue {
  public options: Object = { currentPage: 0, autoplay: 2000, loop: true };
  public swiperList: any[] = [
    {
      html: "作业帮",
      style: {
        background: "#1bbc9b"
      }
    },
    {
      html: "作业帮一课",
      style: {
        background: "#4bbfc3"
      }
    },
    {
      html: "直播课",
      style: {
        background: "#7baabe"
      }
    }
  ];
}
</script>
<style lang="less" scoped>
h3 {
  color: #fff;
  text-align: center;
}
</style>
