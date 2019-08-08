<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 21:36:36
 * @LastEditTime: 2019-08-08 20:58:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="editor-index">
    <messageheader></messageheader>
    <div class="main">
      <div class="title">
        <h1>标题</h1>
        <input type="text" v-model="editorData.title" v-show="!editorShow" />
        <p v-show="editorShow" class="title-content">{{ editorData.title }}</p>
      </div>
      <div class="editor">
        <h1>内容</h1>
        <editor
          :quillClass="quillClass"
          v-show="!editorShow"
          @onEditorBlur="EditorBlur"
        ></editor>
        <div
          class="editor-contnent"
          v-show="editorShow"
          v-html="editorData.content"
        ></div>
      </div>
      <div class="tag">
        <h1>标签</h1>
        <input type="text" v-model="editorData.tag" v-show="!editorShow" />
        <p v-show="editorShow" class="title-content">{{ editorData.tag }}</p>
      </div>
      <div class="publish-button" @click="publishMethod" v-show="!editorShow">
        发布
      </div>
      <div class="publish-button" @click="editorMethod" v-show="editorShow">
        返回编辑
      </div>
      <div class="main-button" @click="mainMethod" v-show="editorShow">
        返回主页
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import messageheader from "@/components/messageheader.vue";
import editor from "@/components/editor.vue";
import { fabu } from "@/request/api";
@Component({
  components: {
    editor,
    messageheader
  }
})
export default class editorIndex extends Vue {
  public quillClass: Object = { height: "600px" };
  public editorData: any = {
    title: "",
    content: "",
    tag: ""
  };
  public editorShow: Boolean = false;
  // public publicText: any = !this.editorShow ? "发回编辑" : "返回编辑";
  //富文本编辑框
  public onEditorBlur(event: any) {
    console.log(event);
  }
  //点击发布按钮
  public publishMethod() {
    if (this.editorData.title === "") {
      this.$notify({
        title: "失败",
        message: "标题不能为空",
        type: "warning"
      });
    } else {
      fabu(this.editorData)
        .then(res => {
          if (res.data.errNo === 0) {
            this.$notify({
              title: "成功",
              message: "发部文章成功",
              type: "success"
            });
            this.editorShow = true;
          } else {
            this.$notify({
              title: "失败",
              message: res.data.errStr,
              type: "warning"
            });
          }
        })
        .catch(err => {
          throw err;
        });
    }
  }
  public editorMethod() {
    this.editorShow = false;
  }
  public EditorBlur(data: any) {
    console.log(data);
    this.editorData.content = data;
  }
  //返回主页按钮
  public mainMethod() {
    this.$router.push({ path: "/" });
  }
}
</script>
<style lang="less" scoped>
.main {
  padding: 50px 100px 0 150px;
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
    // div {
    //   height: 100%;
    //   width: 400px;
    //   background: red;
    // }
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
    &:hover {
      background: #42c57a;
    }
  }
  .main-button {
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
    right: 400px;
    &:hover {
      background: #42c57a;
    }
  }
}
.editor-contnent {
  height: 490px;
  border: 1px solid #42c57a;
  border-radius: 10px;
  padding: 20px 20px;
}
.title-content {
  padding: 10px 5px;
  text-align: center;
  font-size: 25px;
  border: 1px solid #42c57a;
  border-radius: 10px;
}
</style>
