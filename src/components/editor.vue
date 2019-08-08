<template>
  <div class="com-editor">
    <quill-editor
      v-model="editorData"
      @blur="onEditorBlur($event)"
      :style="quillClass"
    ></quill-editor>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class editor extends Vue {
  @Prop({ type: Object }) public quillClass!: Object;
  public editorData: String = "";
  public onEditorBlur(event: any) {
    this.$emit("onEditorBlur", this.editorData);
  }
}
</script>
<style lang="less" scoped>
.com-editor {
  // display: inline-block;
  height: 100%;
}
</style>
