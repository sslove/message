<template>
  <div>
    <messageheader></messageheader>
    <div class="look">
      <h1>{{ title }}</h1>
      <div class="show-article"></div>
    </div>
  </div>
</template>
<script>
import messageheader from "@/components/messageheader";
export default {
  components: {
    messageheader
  },
  data() {
    return {
      title: this.$route.query.hotTitle
    };
  },
  mounted() {
    console.log(this.$route);
  }
};
</script>
<style lang="less" scoped>
.look {
  // display:flex;
  // flex-direction: column;
  padding: 20px 100px;
  h1 {
    height: 50px;
    border-bottom: 1px solid #42c57a;
  }
}
.show-article {
  border: 1px solid #42c57a;
  margin-top: 10px;
  height: 400px;
  padding: 20px;
  // flex:1;
}
</style>
