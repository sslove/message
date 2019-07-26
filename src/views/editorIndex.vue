<template>
  <div class="editor-index">
    <messageheader></messageheader>
    <div class="main">
      <div class="title">
        <h1>标题</h1>
        <input type="text" />
      </div>
      <div class="editor">
        <h1>内容</h1>
        <editor :quillClass="quillClass"></editor>
      </div>
      <div class="tag">
        <h1>标签</h1>
        <input type="text" />
      </div>
      <div class="publish-button" @click="publishMethod">
        发布
      </div>
    </div>
  </div>
</template>
<script>
import messageheader from "@/components/messageheader";
import editor from "@/components/editor";
export default {
  components: {
    editor,
    messageheader
  },
  data() {
    return {
      quillClass: {
        height: "600px"
      }
    };
  },
  methods: {
    publishMethod() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  padding: 50px 100px 0 150px;
  // width:50%;
  // .editor{
  //     height:400px
  // }
  .title {
    position: relative;
    margin-bottom: 40px;
    h1 {
      position: absolute;
      top: 0px;
      left: -100px;
    }
    input {
      width: 100%;
      height: 35px;
    }
  }
  .editor {
    position: relative;
    h1 {
      position: absolute;
      top: 0px;
      left: -100px;
    }
  }
  .tag {
    position: relative;
    margin-bottom: 30px;
    margin-top: 70px;
    h1 {
      position: absolute;
      top: 0px;
      left: -100px;
    }
    input {
      width: 100%;
      height: 35px;
    }
  }
  .publish-button {
    width: 200px;
    text-align: center;
    padding: 10px;
    background: #35cc67;
    cursor: pointer;
    border-radius: 10px;
    font-weight: bold;
    font-size: 25px;
    color: #fff;
    position: absolute;
    right: 100px;
  }
  .publish-button:hover {
    background: #42c57a;
  }
}
</style>
