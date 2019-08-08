<template>
  <div class="register">
    <el-dropdown @command="handleCommand">
      <div class="header-photo">
        <img :src="changeUrlImg" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in contentData"
          :key="index"
          :command="item"
        >
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 登陆 -->
    <el-dialog
      title="作业帮账号登陆"
      :visible.sync="dialogFormVisible"
      @closed="resetForm('registerData')"
    >
      <el-form
        :model="registerData"
        :label-width="formLabelWidth"
        :rules="registerRules"
        ref="registerData"
      >
        <el-form-item label="账号:" prop="authorId">
          <el-input v-model="registerData.authorId"></el-input>
          <span>@zuoyebang.com</span>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="registerData.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-link style="margin-right:20px;" @click="skipLogin"
          >还没有账号？点击注册</el-link
        >
        <el-button type="primary" @click="registerMethod('registerData')"
          >登录</el-button
        >
      </div>
    </el-dialog>
    <!-- 注册 -->
    <el-dialog
      title="作业帮账号注册"
      :visible.sync="loginDialog"
      @closed="loginRest('loginData')"
    >
      <el-form
        :model="loginData"
        :label-width="formLabelWidth"
        :rules="loginRules"
        ref="loginData"
      >
        <el-form-item label="账号:" prop="authorId">
          <el-input v-model="loginData.authorId"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="loginData.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称:" prop="authorName">
          <el-input v-model="loginData.authorName"></el-input>
        </el-form-item>
        <el-form-item label="签名:" prop="qianMing">
          <el-input v-model="loginData.qianMing"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <el-image :src="urlImg" fit="fill"></el-image>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="success" size="mini" round>更多头像</el-button> -->
          <el-upload
            :file-list="fileList"
            :limit="1"
            action=""
            :on-change="handlePreview"
            :on-exceed="handleExceed"
            :show-file-list="false"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button type="success" size="mini" round>上传头像</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-link style="margin-right:20px;" @click="skipRegister"
          >已有账号？点击登陆</el-link
        >
        <el-button type="primary" @click="loginMethod('loginData')"
          >确认注册</el-button
        >
      </div>
    </el-dialog>
    <!-- 更改信息 -->
    <el-dialog
      title="信息修改"
      :visible.sync="changeDialog"
      @closed="changeRest('changeData')"
    >
      <el-form
        :model="changeData"
        :label-width="formLabelWidth"
        :rules="changeRules"
        ref="changeData"
      >
        <el-form-item label="昵称:" prop="authorName">
          <el-input v-model="changeData.authorName"></el-input>
        </el-form-item>
        <el-form-item label="签名:" prop="qianMing">
          <el-input v-model="changeData.qianMing"></el-input>
        </el-form-item>
        <el-form-item label="头像:">
          <el-image :src="urlImg" fit="fill"></el-image>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="success" size="mini" round>更多头像</el-button> -->
          <el-upload
            :file-list="changefileList"
            :limit="1"
            action=""
            :on-change="changeHandlePreview"
            :on-exceed="handleExceed"
            :show-file-list="false"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button type="success" size="mini" round>上传头像</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          size="medium"
          round
          @click="changeMethod('changeData')"
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop, Inject } from "vue-property-decorator";
import { zhuce } from "@/request/api";
import {
  dengLu,
  xiugai,
  shangchaun,
  yanzheng,
  huoquxinxi
} from "@/request/api";
import axios from "axios";
// import * as qs from "qs";
@Component
export default class drop extends Vue {
  mounted() {
    huoquxinxi()
      .then(res => {
        if (res.data.errNo === 0) {
          this.$store.commit("newAuthor", res.data.data);
          this.changeUrlImg = res.data.data.photo;
        }
      })
      .catch(err => {
        throw err;
      });
  }
  public changesrc: any = require("../assets/img/touxiang1.png");
  public fileList: any[] = [];
  public changefileList: any[] = [];
  public registerRules: any = {
    authorId: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  };
  public loginRules: any = {
    authorId: [{ required: true, message: "账号不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    authorName: [
      { required: true, message: "昵称不能为空", trigger: "blur" }
      // { validator: validatePass, trigger: "blur" }
    ],
    qianMing: [{ required: true, message: "签名不能为空", trigger: "blur" }]
  };
  public changeRules: any = {
    authorName: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
    qianMing: [{ required: true, message: "签名不能为空", trigger: "blur" }]
  };
  public iconHeader: String = "denglu";
  public register: String = "register";
  public dialogFormVisible: Boolean = false;
  public changeDialog: Boolean = false;
  public loginDialog: Boolean = false;
  public urlImg: any = require("../assets/img/touxiang1.png");
  public changeUrlImg: any = require("../assets/img/touxiang1.png");
  public contentData: any[] = [
    { name: "登陆" },
    { name: "注册" },
    { name: "更改信息" },
    { name: "我的文章" }
  ];
  public formLabelWidth: String = "80px";
  public registerData: Object = {
    authorId: "",
    password: ""
  };
  public changeData: any = {
    authorName: "",
    qianMing: "",
    photo: ""
  };
  public loginData: any = {
    authorId: "",
    authorName: "",
    password: "",
    qianMing: "",
    photo: ""
  };
  public handlePreview(files: any, fileList: any) {
    let data = new FormData();
    data.append("file", files.raw);
    shangchaun(data).then(res => {
      if (res.errNo === 0) {
        this.urlImg = res.data.url;
        this.changeUrlImg = res.data.url;
      } else {
        this.$message.error("上传图片失败");
      }
    });
    this.fileList = [];
    // this.loginsrc = files.url;
  }
  //图片上传的按钮
  public changeHandlePreview(files: any) {
    let data = new FormData();
    data.append("file", files.raw);
    // console.log(files.raw);
    shangchaun(data).then(res => {
      if (res.errNo === 0) {
        this.urlImg = res.data.url;
        this.changeUrlImg = res.data.url;
        console.log(this.urlImg);
      } else {
        this.$message.error("上传图片失败");
      }
    });
    this.changefileList = [];
    this.changesrc = files.url;
  }
  //超出限制的时候
  public handleExceed(files: any) {
    this.$message.warning(
      `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`
    );
  }
  //下拉选框判断是哪一个
  public handleCommand(content: any) {
    let method = content.name;
    if (method === "登陆") {
      yanzheng()
        .then(res => {
          if (res.data.errNo === 0) {
            this.$notify({
              title: "失败",
              message: "已经登陆",
              type: "warning"
            });
          } else {
            this.dialogFormVisible = true;
          }
        })
        .catch(err => {
          throw err;
        });
      // this.dialogFormVisible = true;
    } else if (method === "更改信息") {
      this.changeDialog = true;
    } else if (method === "注册") {
      this.loginDialog = true;
    } else if (method === "我的文章") {
      yanzheng()
        .then(res => {
          if (res.data.errNo === 0) {
            console.log("进入我的文章页面");
          } else {
            console.log("进入我的文章页面");
            this.$notify({
              title: "失败",
              message: "未登录请先登陆",
              type: "warning"
            });
          }
        })
        .catch(err => {
          throw err;
        });
    }
  }
  //跳转至注册页
  public skipLogin() {
    this.dialogFormVisible = false;
    this.loginDialog = true;
  }
  //跳转至登陆页
  public skipRegister() {
    this.loginDialog = false;
    this.dialogFormVisible = true;
  }
  //点击登陆的方法
  public registerMethod(formName: any) {
    (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
      if (valid) {
        dengLu(this.registerData)
          .then(res => {
            if (res.data.errNo === 0) {
              this.registerData = res.data.data;
              this.urlImg = res.data.data.photo;
              this.changeUrlImg = res.data.data.photo;
              console.log(this.registerData);
              this.$emit("register", this.registerData);
              this.$alert("登陆成功", "", {
                confirmButtonText: "确定",
                type: "success",
                center: true
              });
              this.dialogFormVisible = false;
            } else if (res.data.errNo === 4002) {
              this.$alert("账号未找到", "", {
                confirmButtonText: "确定",
                type: "success",
                center: true
              });
            } else if (res.data.errNo === 1001) {
              this.$alert("账号密码不配", "", {
                confirmButtonText: "确定",
                type: "success",
                center: true
              });
            }
          })
          .catch(err => {
            throw err;
          });
        // this.dialogFormVisible = false;
      } else {
        return false;
      }
    });
  }
  //点击注册的方法
  public loginMethod(formName: any) {
    (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
      if (valid) {
        this.loginData.photo = this.urlImg || "";
        console.log(this.loginData);
        zhuce(this.loginData)
          .then(res => {
            if (res.data.errNo === 0) {
              this.loginData = res.data.data;
              this.$alert("注册成功", "", {
                confirmButtonText: "确定",
                type: "success",
                center: true
              });
              this.loginDialog = false;
            } else if (res.data.errNo === 1000) {
              // this.loginData = res.data.data;
              this.$alert("创建的用户已经存在", "", {
                confirmButtonText: "确定",
                type: "success",
                center: true
              });
            }
          })
          .catch(err => {
            throw err;
          });
      } else {
        return false;
      }
    });
  }
  //点击修改信息的方法
  public changeMethod(formName: any) {
    (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
      if (valid) {
        // console.log(this.changeData);
        this.changeData.photo = this.urlImg;
        xiugai(this.changeData)
          .then(res => {
            if (res.data.errNo === 0) {
              console.log(res.data.data);
              this.registerData = res.data.data;
              this.$emit("register", this.registerData);
              this.$alert("信息成功", "", {
                confirmButtonText: "确定",
                type: "success",
                center: true
              });
              this.changeDialog = false;
            }
          })
          .catch(err => {
            throw err;
          });
      } else {
        return false;
      }
    });
  }
  //登陆页重置
  public resetForm(formName: any) {
    (this.$refs[formName] as HTMLFormElement).resetFields();
    this.registerData = {
      authorId: "",
      password: ""
    };
  }
  //注册页重置
  public loginRest(formName: any) {
    (this.$refs[formName] as HTMLFormElement).resetFields();
    this.loginData = {
      authorId: "",
      authorName: "",
      password: "",
      qianMing: "",
      photo: ""
    };
    this.urlImg = require("../assets/img/touxiang1.png");
  }
  //信息修改页重置
  public changeRest(formName: any) {
    (this.$refs[formName] as HTMLFormElement).resetFields();
    this.changeData = {
      authorName: "",
      qianMing: "",
      photo: ""
    };
    this.urlImg = require("../assets/img/touxiang1.png");
  }
  // imgChange() {
  //   this.urlImg = require("../assets/img/touxiang1.png");
  // }
}
</script>
<style lang="less" scoped>
// ul{
//   list-style-type: none;
// }
.register {
  .header-photo {
    background: #fff;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    &:hover {
      transform: scale(1.2);
      -webkit-transform: scale(1.2); /* Safari 和 Chrome */
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.el-form-item {
  font-weight: bold;
}
.el-upload {
  display: inline-block;
}
.el-image {
  width: 100px;
  height: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
}
</style>
