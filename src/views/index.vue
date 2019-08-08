<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 21:36:36
 * @LastEditTime: 2019-08-08 20:57:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <canvanStart> </canvanStart>
    <messageheader v-model="registerData" :infoDtat="infoDtat"></messageheader>
    <!-- <time-line style="background:red"></time-line> -->
    <div class="content" v-loading="loading" element-loading-text="拼命加载中">
      <div calss="show">
        <!-- 轮播图 -->

        <swiper class="main-swiper"></swiper>

        <div class="detail">
          <div class="message">
            <!-- 头像 -->
            <div class="detail-header">
              <el-popover
                placement="right"
                width="200"
                v-model="visible"
                trigger="hover"
              >
                <p class="extra">
                  用户名：{{ registerData.authorName || infoDtat.authorName }}
                </p>
                <p class="extra">
                  账号：{{ registerData.qianMing || infoDtat.authorId }}
                </p>
                <p class="extra">
                  签名：{{ registerData.qianMing || infoDtat.qianMing }}
                </p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >取消</el-button
                  >
                  <el-button type="primary" size="mini" @click="visible = false"
                    >确定</el-button
                  >
                </div>
                <img
                  :src="
                    registerData.photo || infoDtat.photo
                      ? registerData.photo || infoDtat.photo
                      : require('../assets/img/touxiang1.png')
                  "
                  slot="reference"
                />
              </el-popover>
            </div>
            <!-- 信息 -->
            <div class="message-text">
              <h2>
                用户名：{{ registerData.authorName || infoDtat.authorName }}
              </h2>
            </div>
          </div>
          <div class="editor-main" @click="editorMethod">
            <i class="el-icon-edit-outline"></i>
            发布文章
          </div>
        </div>
      </div>
      <!-- 下面的内容 -->
      <div class="article">
        <div class="article-main">
          <div class="general">
            <div
              class="new-article"
              @click="articleChangeColor((index = 0))"
              :style="{ background: articleChage ? '#42c57a' : '' }"
            >
              最新文章
            </div>
            <div
              class="winnnow-article"
              @click="articleChangeColor((index = 1))"
              :style="{ background: newArticleChage ? '#42c57a' : '' }"
            >
              精选文章
            </div>
            <div class="winnow-day">
              <el-date-picker
                placeholder="选择日期"
                @change="articleChangeColor"
                v-model="searchDate"
                type="month"
                size="large"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="definite">
            <timeLine :gainData="gainData"> </timeLine>
          </div>
          <el-pagination
            class="pagination"
            layout="prev, pager, next"
            :page-size="6"
            :total="total"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
        <!-- 热门部分 -->
        <div class="article-hot">
          <h1>本周热门</h1>
          <ul>
            <li
              v-for="(item, index) in articleData"
              :key="index"
              @click="hotArticleSkip(item)"
            >
              <span class="circle">{{ index++ }}</span>
              <span class="hot-content">{{ item.content }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import messageheader from "@/components/messageheader.vue";
import swiper from "@/components/swiper.vue";
import timeLine from "@/components/TimeLine.vue";
import { yanzheng, soushu, dengLu, huoquxinxi } from "@/request/api";
import moment from "moment";
import { register } from "register-service-worker";
import canvanStart from "@/components/canvanStart.vue";
// import state from "../store";
@Component({
  components: {
    messageheader,
    swiper,
    timeLine,
    canvanStart
  }
})
export default class index extends Vue {
  // @Provide("infoDtat")
  public infoDtat: any = {
    authorName: "",
    authorId: "",
    qianMing: "",
    photo: ""
  };
  public visible: Boolean = false;
  public registerData: any = "";
  public iconEditor: String = "bianji";
  public iconHeader: String = "denglu";
  public editor: String = "editor";
  public header: String = "header";
  public index: Number = 0;
  public total: any = 0;
  public current: any = "";
  public articleChage: Boolean = false;
  public newArticleChage: Boolean = false;
  public loading: Boolean = true;
  public searchDate: any = "";
  public pulseShow: Boolean = false;
  public gainData: any[] = [];
  public articleData: any[] = [
    { content: "观放风筝的人观后感" },
    { content: "对于前端的新技术的认知" }
  ];
  mounted() {
    this.searchDate = new Date();
    this.articleChangeColor(0);
    huoquxinxi()
      .then(res => {
        if (res.data.errNo === 0) {
          this.$store.commit("newAuthor", res.data.data);
          this.infoDtat = this.$store.state.info;
        }
      })
      .catch(err => {
        throw err;
      });
    this.loading = false;
  }
  // 点击编辑的图片时跳转到编辑页面
  public editorMethod() {
    yanzheng()
      .then(res => {
        if (res.data.errNo === 1000) {
          this.$router.replace({ path: "/EditorIndex" });
        } else if (res.data.errNo === -1001) {
          this.$message.error("用户未登录,请先登陆");
        } else if (res.data.errNo === 0) {
          this.$router.replace({ path: "/EditorIndex" });
        }
      })
      .catch(err => {
        throw err;
      });
  }
  // 跳转至热门文章
  public hotArticleSkip(content: any) {
    this.$router.push({ path: "/CheckIndex", query: { hotTitle: content } });
  }
  // 月份点击事件
  public showContent(content: any) {
    this.$router.push({ path: "/CheckIndex", query: { hotTitle: content } });
  }
  // 点击变色
  public clickChangeColor(index: Number) {
    this.current = index;
  }
  // 精选文章的点击事件
  public articleChangeColor(index: Number) {
    if (index === 0) {
      this.articleChage = true;
      this.newArticleChage = false;
    } else if (index === 1) {
      this.articleChage = false;
      this.newArticleChage = true;
    }
    let data = {
      request: this.index,
      display: moment(this.searchDate).format("YYYY-MM")
    };
    soushu(data)
      .then(res => {
        console.log(res.data.data);
        if (res.data.errNo === 0) {
          if (res.data.data.total === 0) {
            this.gainData = [
              {
                userInfo: {
                  photo: require("@/assets/img/touxiang1.png")
                },
                createTime: moment(new Date()).format("YYYY-MM hh:ss"),
                title: "没有数据"
              }
            ];
          } else {
            this.total = res.data.data.total;
            this.gainData = res.data.data.article;
          }
        }
      })
      .catch(err => {
        throw err;
      });
    //改
  }
  public pulseShowMethod() {
    this.pulseShow = true;
  }
  //文章分页
  public handleCurrentChange(val: Number) {
    let data = {
      request: this.index,
      display: moment(this.searchDate).format("YYYY-MM"),
      page: val
    };
    soushu(data)
      .then(res => {
        if (res.data.errNo === 0) {
          this.gainData = res.data.data.article;
        }
      })
      .catch(err => {
        throw err;
      });
  }
}
</script>
<style lang="less" scoped>
@color: #42c57a;
.click-color {
  background: @color;
}
.pagination {
  text-align: center;
}
.el-icon-edit-outline {
  font-weight: bold;
}
.content {
  background: #d9d9d9;
  padding: 0 100px;
  .show {
    position: relative;
  }
  .main-swiper {
    padding: 10px;
    min-width: 700px;
    width: 65%;
    // flex:1;
    height: 300px;
  }
  .article {
    display: flex;
    padding: 10px;
    .article-main {
      flex: 1;
      background: #fff;
      margin-right: 60px;
      padding: 20px;
      min-width: 700px;
      max-width: 1059px;
      .general {
        position: relative;
        padding: 0 0 0 40px;
        .winnnow-article {
          position: absolute;
          left: 212px;
          top: 0px;
        }
        .el-date-picker {
          border: 1px solid @color;
        }
        .winnow-day {
          border: none;
          position: absolute;
          left: 382px;
          top: 0px;
          &:hover {
            background: none;
          }
        }
        div {
          width: 150px;
          height: 50px;
          background: #fff;
          border: 2px solid @color;
          border-radius: 5px;
          text-align: center;
          line-height: 50px;
          font-weight: bold;
          cursor: pointer;
          &:hover {
            background: rgba(103, 194, 58, 0.5);
          }
        }
      }
    }
    .article-hot {
      width: 300px;
      background: #fff;
      padding: 20px;
      z-index: 20;
      // position: relative;
      // right: 0px;

      h1 {
        text-align: left;
      }
      ul {
        padding: 10px 0;
        li {
          padding: 5px 0;
          cursor: pointer;
        }
      }
      .hot-content:hover {
        color: @color;
        border-bottom: 1px solid @color;
      }
      .circle {
        width: 25px;
        height: 25px;
        display: inline-block;
        border: 2px solid @color;
        border-radius: 50%;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
      }
    }
  }
}

.detail {
  background: @color;
  height: 260px;
  position: absolute;
  right: 110px;
  top: 95px;
  width: 300px;
  padding: 20px;
  .message {
    display: flex;
    .detail-header {
      width: 100px;
      height: 100px;
      background: #fff;
      border-radius: 50%;
      text-align: center;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      &:hover {
        transform: scale(1.2);
        -webkit-transform: scale(1.2); /* Safari 和 Chrome */
      }
    }
    .message-text {
      flex: 1;
      h2 {
        text-align: center;
      }
    }
  }
}

.editor-main {
  position: absolute;
  bottom: 40px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 10px;
  width: 80%;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
.definite {
  display: flex;
  padding: 10px 0;
  .show {
    flex: 1;
  }
  .month {
    width: 100px;
    li {
      position: relative;
    }
    .character {
      position: absolute;
      top: 0px;
    }
    .click {
      display: inline-block;
      width: 20px;
      height: 60px;
      border: 1px solid @color;
      position: relative;
      left: 40px;
      cursor: pointer;
      &:hover {
        background: rgba(103, 194, 58, 0.5);
      }
    }
  }
}
.definite .show-content {
  li {
    padding: 15px;
    border: 1px solid @color;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
}
.extra {
  height: 40px;
  line-height: 40px;
}
</style>
