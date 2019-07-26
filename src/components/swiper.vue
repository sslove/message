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
<script>
export default {
  data() {
    return {
      options: {
        currentPage: 0,
        autoplay: 2000,
        loop: true
      },
      swiperList: [
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
      ]
    };
  }
};
</script>
<style lang="less" scoped>
// .swiper{
//    width:100%;
//    height:400px
// }
h3 {
  color: #fff;
  text-align: center;
  // font-size: 14px;
  // opacity: 0.75;
  // line-height: 150px;
  // margin: 0;
}
</style>
