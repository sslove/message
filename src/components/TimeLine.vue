<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 10:06:54
 * @LastEditTime: 2019-08-08 20:59:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="hello">
    <ul
      :class="animatedName"
      v-for="(item, key) in lineDataShow ? gainData : gainData.slice(0, 3)"
      :key="key"
    >
      <li class="identify">
        <span class="timeLine-line"></span>
        <!-- 里面的内容 -->
        <div class="header-article">
          <img
            :src="item.userInfo.photo ? item.userInfo.photo : url"
            :style="item.style"
          />
          <div class="header-content">
            <p class="content-title" @click="skipMethod(item)">
              {{ item.title }}
            </p>
            <p class="content-data">{{ item.createTime }}</p>
            <ul class="header-li">
              <li v-for="(item, index) in classifyData" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <i
      :class="{
        'row-up': true,
        'el-icon-d-arrow-right': true,
        bounce: bounceShow ? true : false
      }"
      v-show="!lineDataShow"
      @click="showChange"
      @mousemove="bounceShowMethod"
    ></i>
    <i
      :class="{
        'row-down': true,
        'el-icon-d-arrow-right': true,
        bounceDown: bounceShow ? true : false
      }"
      v-show="lineDataShow"
      @click="showChangeDown"
      @mousemove="bounceShowMethod"
    ></i>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
@Component
export default class TimeLine extends Vue {
  @Prop({ type: String, default: "timeline-ui animated bounceInRight" })
  public animatedName!: String;
  // @Prop({ default: "" }) searchDate!: any;
  @Prop({ type: Array })
  public gainData!: Array<any>;
  public classifyData: Array<String> = ["后台", "流媒体", "分布式"];
  public url = require("../assets/img/touxiang1.png");
  public lineDataShow: Boolean = false;
  public bounceShow: Boolean = false;
  public showContentData: Object = {
    title: "",
    content: "",
    createtime: ""
  };
  public showChange() {
    this.lineDataShow = true;
  }
  public showChangeDown() {
    this.lineDataShow = false;
  }
  public bounceShowMethod() {
    this.bounceShow = true;
  }
  public bouncedisappear() {
    this.bounceShow = false;
  }
  public skipMethod(content: any) {
    this.$router.push({ path: "/CheckIndex", query: { hotTitle: content } });
  }
}
</script>

<style scoped lang="less">
@color: #42c57a;
h1,
h2 {
  font-weight: normal;
}
.timeline-ui {
  list-style-type: none;
  padding: 0;
  position: relative;
}
.timeline-ui::before {
  content: "";
  display: block;
  width: 0;
  height: 100%;
  border: 1px dashed #42c57a;
  position: absolute;
  top: 50px;
  left: 30px;
}
.identify {
  margin: 20px 60px 60px;
  position: relative;
  display: block;
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
  .timeLine-line {
    content: "";
    display: block;
    width: 0;
    height: 100%;
    border: 1px solid #42c57a;
    position: absolute;
    top: 0;
    left: -30px;
  }
  .header-article {
    display: flex;
    padding: 15px;
    border: 1px solid @color;
    margin-left: 50px;
    border-radius: 5px;
    margin-left: -20px;
    cursor: pointer;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 1px solid @color;
    }
    .header-li {
      display: flex;
      align-items: flex-end;
      flex-direction: row-reverse;
      li {
        padding: 5px;
        width: 60px;
        height: 20px;
        border: 1px solid @color;
        border-radius: 5px;
        line-height: 20px;
        text-align: center;
        margin-right: 10px;
        &:first-child {
          margin-right: 0;
        }
      }
    }
  }
}
.timeLine-line:before,
.timeLine-line:after {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #42c57a;
  border: 2px solid #42c57a;
  position: absolute;
  left: -7.5px;
}
.timeLine-line:before {
  top: -10px;
}
.timeLine-line:after {
  bottom: -10px;
}
// .el-icon-d-arrow-right {
//   font-size: 35px;
//   color: #42c57a;
//   transform: rotate(90deg);
//   // margin-left: 10px;
// }
.row-up {
  font-size: 35px;
  color: #42c57a;
  transform: rotate(90deg);
}
.row-down {
  font-size: 35px;
  color: #42c57a;
  transform: rotate(-90deg);
}
.bounce {
  animation: myfirst 2s 3;
}
.bounceDown {
  animation: mySend 2s 3;
}

@keyframes myfirst {
  0% {
    transform: translate(-13px, 0px) rotate(90deg);
  }
  50% {
    transform: translate(-13px, -40px) rotate(90deg);
  }
  100% {
    transform: translate(-13px, 0px) rotate(90deg);
  }
}
@keyframes mySend {
  0% {
    transform: translate(10px, 0px) rotate(-90deg);
  }
  50% {
    transform: translate(10px, -40px) rotate(-90deg);
  }
  100% {
    transform: translate(10px, 0px) rotate(-90deg);
  }
}
.header-content {
  flex: 1;
  padding: 0 10px;
  p {
    height: 20px;
    line-height: 20px;
  }
  .content-title {
    width: 289px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      color: @color;
    }
  }
  .content-data {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
