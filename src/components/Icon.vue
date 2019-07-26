<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    iconClass: {
      type: String
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      return this.className ? "svg-icon " + this.className : "svg-icon";
    }
  }
};
</script>
<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.search {
  width: 25px;
  height: 25px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.register {
  width: 55px;
  height: 55px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  // position:absolute;
  // right:1px;
}
.editor {
  width: 30px;
  height: 30px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  position: absolute;
  left: 10px;
  top: 8px;
}
.header {
  width: 90px;
  height: 90px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
