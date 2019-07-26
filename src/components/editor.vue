<template>
  <div class="com-editor">
    <quill-editor
      v-model="editorData"
      @blur="onEditorBlur($event)"
      :style="quillClass"
    ></quill-editor>
  </div>
</template>
<script>
export default {
  name: "editor",
  props: {
    quillClass: {
      type: Object
    }
  },
  data() {
    return {
      editorData: ""
    };
  },
  methods: {
    onEditorBlur(event) {
      console.log(this.editorData);
      console.log(event);
    }
  }
};
</script>
<style lang="less" scoped>
.com-editor {
  // display: inline-block;
  height: 100%;
}
</style>
