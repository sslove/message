<template>
  <div>
    <messageheader></messageheader>
    <div class="content">
      <div calss="show">
        <!-- 轮播图 -->

        <swiper class="main-swiper"></swiper>

        <div class="detail">
          <div class="message">
            <!-- 头像 -->
            <div class="detail-header">
              <icon :icon-class="iconHeader" :class-name="header"></icon>
            </div>
            <!-- 信息 -->
            <div class="message-text">
              <h1>用户名</h1>
            </div>
          </div>
          <div class="editor-main" @click="editorMethod">
            <icon :icon-class="iconEditor" :class-name="editor"></icon>
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
              @click="articleChangeColor(0)"
              :style="{ background: articleChage ? '#42c57a' : '' }"
            >
              最新文章
            </div>
            <div
              class="winnnow-article"
              @click="articleChangeColor(1)"
              :style="{ background: newArticleChage ? '#42c57a' : '' }"
            >
              精选文章
            </div>
          </div>
          <div class="definite">
            <ul class="month">
              <li v-for="(item, index) in monthData" :key="item">
                <span class="character">{{ item }}</span>
                <span
                  :class="{ click: true, 'click-color': index === current }"
                  @click="clickChangeColor(index)"
                ></span>
              </li>
            </ul>
            <ul class="show-content">
              <li
                v-for="(item, index) in showData"
                :key="index"
                @click="showContent(item.content)"
              >
                <div class="header-article">
                  <img :src="item.url" :style="item.style" />
                  <div class="header-content">
                    <p class="content-title">{{ item.content }}</p>
                    <p class="content-data">{{ item.data }}</p>
                  </div>
                  <ul>
                    <li v-for="(item, index) in classifyData" :key="index">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 热门部分 -->
        <div class="article-hot">
          <h1>本周热门</h1>
          <ul>
            <li
              v-for="(item, index) in articleData"
              :key="index"
              @click="hotArticleSkip(item.content)"
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

<script>
import messageheader from "@/components/messageheader";
import swiper from "@/components/swiper";
// import { api } from '@/request/api'
export default {
  components: {
    messageheader,
    swiper
  },
  data() {
    return {
      iconEditor: "bianji",
      iconHeader: "denglu",
      editor: "editor",
      header: "header",
      current: "",
      articleChage: false,
      newArticleChage: false,
      articleData: [
        { content: "观放风筝的人观后感" },
        { content: "对于前端的新技术的认知" }
      ],
      monthData: [],
      showData: [
        {
          url: require("../assets/img/touxiang1.png"),
          content: "石莎发布了文章关于文章的内容结构",
          data: "12月11号 23：00"
        },
        {
          url: require("../assets/img/touxiang2.png"),
          content: "你好大学生发布了你是一个好人的介绍文章内容为你好",
          data: "12月11号 23：00"
        },
        {
          url: require("../assets/img/touxiang2.png"),
          content: "你好大学生发布了你是一个好人的介绍文章内容为你好",
          data: "12月11号 23：00"
        },
        {
          url: require("../assets/img/touxiang2.png"),
          content: "你好大学生发布了你是一个好人的介绍文章内容为你好",
          data: "12月11号 23：00"
        }
      ],
      classifyData: ["后台", "流媒体", "分布式"]
    };
  },
  mounted() {
    // api().then(res => {
    //   console.log(res)
    // })
    // console.log(this.$store.state.user)
    let month = new Date().getMonth() + 1;
    for (var i = 0; i < month; i++) {
      this.monthData.push(i + 1);
    }
    this.monthData.push("最近");
    this.monthData.reverse();
  },
  methods: {
    // 点击编辑的图片时跳转到编辑页面
    editorMethod() {
      this.$router.replace({ path: "/EditorIndex" });
    },
    // 跳转至热门文章
    hotArticleSkip(content) {
      this.$router.push({ path: "/CheckIndex", query: { hotTitle: content } });
    },
    // 月份点击事件
    showContent(content) {
      this.$router.push({ path: "/CheckIndex", query: { hotTitle: content } });
    },
    // 点击变色
    clickChangeColor(index) {
      this.current = index;
    },
    // 精选文章的点击事件
    articleChangeColor(index) {
      if (index === 0) {
        this.articleChage = true;
        this.newArticleChage = false;
      } else {
        this.articleChage = false;
        this.newArticleChage = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.click-color {
  background: #42c57a;
}
.content {
  background: #d9d9d9;
  padding: 0 100px;
}
.show {
  position: relative;
  // display:flex;
}
.main-swiper {
  padding: 10px;
  width: 65%;
  // flex:1;
  height: 300px;
}
.detail {
  background: #42c57a;
  height: 260px;
  position: absolute;
  right: 110px;
  top: 95px;
  width: 300px;
  padding: 20px 20px;
}
.message {
  // position:relative;
  display: flex;
}
.detail-header {
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 50%;
  text-align: center;
}
.message-text {
  flex: 1;
}
h1 {
  text-align: center;
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
.article {
  // position:relative;
  display: flex;
  padding: 10px;
}
.article-main {
  flex: 1;
  background: #fff;
  margin-right: 60px;
  padding: 20px;
}
.general {
  position: relative;
  padding: 0 0 0 40px;
}
.general div {
  width: 150px;
  height: 50px;
  background: #fff;
  border: 2px solid #42c57a;
  border-radius: 5px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  cursor: pointer;
}
.general div:hover {
  background: rgba(103, 194, 58, 0.5);
}
.general .winnnow-article {
  position: absolute;
  left: 212px;
  top: 0px;
}
.article-hot {
  width: 300px;
  background: #fff;
  padding: 20px;
}
.article-hot h1 {
  text-align: left;
}
.article-hot ul {
  padding: 10px 0;
}
.article-hot ul li {
  padding: 5px 0;
  cursor: pointer;
}
.article-hot .hot-content:hover {
  color: #42c57a;
  border-bottom: 1px solid #42c57a;
}
.article-hot .circle {
  width: 25px;
  height: 25px;
  display: inline-block;
  border: 2px solid #42c57a;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
  // background:#fff;
}
.definite {
  display: flex;
  padding: 10px 0;
}
.definite .month {
  width: 100px;
}
.definite .month li {
  position: relative;
}
.definite .month .character {
  position: absolute;
  top: 0px;
}
.definite .month .click {
  display: inline-block;
  width: 20px;
  height: 60px;
  border: 1px solid #42c57a;
  position: relative;
  left: 40px;
  cursor: pointer;
}
.definite .month .click:hover {
  background: rgba(103, 194, 58, 0.5);
}
.definite .show {
  flex: 1;
}
.show-content li {
  padding: 15px;
  border: 1px solid #42c57a;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  // position:relative;
}

.show-content .header-article {
  // position:relative;
  display: flex;
}
.show-content .header-article img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #42c57a;
}
.header-article ul {
  display: flex;
  align-items: flex-end;
}
.header-article li {
  padding: 5px;
  width: 60px;
  height: 20px;
  border: 1px solid #42c57a;
  border-radius: 5px;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
}
.header-article li:last-child {
  margin-right: 0;
}
.header-content {
  flex: 1;
  padding: 0 10px;
}
.header-content p {
  height: 20px;
  line-height: 20px;
}
.header-content .content-title {
  width: 289px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.header-content .content-title:hover {
  color: #42c57a;
}
.header-content .content-data {
  color: rgba(0, 0, 0, 0.5);
}
</style>
