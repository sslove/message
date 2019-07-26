<template>
  <div class="register" @click="headerClick">
    <el-dropdown @command="handleCommand">
      <div class="header-photo" >
      <icon :icon-class="iconHeader" :class-name="register"></icon>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in contentData"
          :key="index" :command="item">
          {{item.name}}
          </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- <ul class="content" v-show="contentShow" >
      <li v-for="(item,index) in contentData"
          :key="index"
          @click="contentMethod(item)">{{item.name}}</li>
    </ul> -->

    <!-- 登陆 -->
    <el-dialog title="作业帮账号登陆" :visible.sync="dialogFormVisible">
      <el-form :model="registerData" :label-width="formLabelWidth" :rules="registerRules">
       <el-form-item label="账号:" prop="account">
           <el-input v-model="registerData.account" ></el-input>
           <span>@zuoyebang.com</span>
       </el-form-item>
       <el-form-item label="密码:" prop="password">
            <el-input v-model="registerData.password" ></el-input>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-link style="margin-right:20px;" @click="skipLogin">还没有账号？点击注册</el-link>
       <el-button type="primary" >登录</el-button>
      </div>
    </el-dialog>
    <!-- 注册 -->
    <el-dialog title="作业帮账号注册" :visible.sync="loginDialog">
      <div slot="footer" class="dialog-footer">
         <el-link style="margin-right:20px;" @click="skipRegister">已有账号？点击登陆</el-link>
         <el-button type="primary" >确认注册</el-button>
       </div>
    </el-dialog>
    <!-- 更改信息 -->
     <el-dialog title="信息修改" :visible.sync="changeDialog">
      <el-form :model="changeData" :label-width="formLabelWidth" >
       <el-form-item label="昵称:" >
           <el-input v-model="changeData.name" ></el-input>
       </el-form-item>
       <el-form-item label="签名:" >
            <el-input v-model="changeData.signature" ></el-input>
       </el-form-item>
       <el-form-item label="头像:" >
            <el-image style="width: 100px; height: 100px;border:1px solid #DCDFE6;border-radius:5px;"
                      :src="src"
                      fit="fill"></el-image>
       </el-form-item>
       <el-form-item>
            <el-button type="success" size="mini" round>更多头像</el-button>
            <el-upload :file-list="fileList"
                       :limit="3"
                       action
                       :show-file-list="false"
                       style="display:inline-block"
                       list-type="picture">
                <el-button type="warning" size="mini" round>上传头像</el-button>
            </el-upload>
       </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" size="medium" round>修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
// import register from './register'
export default {
  name: 'drop',
  // components: {
  //   register
  // },
  data () {
    return {
      src: require('../assets/img/touxiang1.png'),
      fileList: [],
      registerRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      iconHeader: 'denglu',
      register: 'register',
      dialogFormVisible: false,
      changeDialog: false,
      loginDialog: false,
      contentShow: false,
      contentData: [{name: '登陆'}, {name: '注册'}, {name: '更改信息'}],
      formLabelWidth: '80px',
      registerData: {
        account: '',
        password: ''
      },
      changeData: {
        name: '',
        signature: '',
        portrait: ''
      }
    }
  },
  methods: {
    headerClick () {
      this.contentShow = !this.contentShow
    },
    handleCommand (content) {
      let method = content.name
      if (method === '登陆') {
        this.dialogFormVisible = true
      } else if (method === '更改信息') {
        this.changeDialog = true
      } else if (method === '注册') {
        this.loginDialog = true
      }
    },
    // 跳转到注册的页面
    skipLogin () {
      this.dialogFormVisible = false
      this.loginDialog = true
    },
    // 跳转到登陆的页面
    skipRegister () {
      this.loginDialog = false
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
// ul{
//   list-style-type: none;
// }
.register{
  // display:inline-block;
//   background:yellow;
  // width:100%;
//   position: relative;
  .header-photo{
    // text-align: center;
    // vertical-align: center;
    background:#fff;
    width:60px;
    height:60px;
    border-radius:50%
  }
  .content{
    position:absolute;
    top:50px;
    background:#fff;
    padding:0 10px;
    width:200px;
    position:absolute;
    left:-100px;
    text-align: center;
    cursor: pointer;
      li:hover{
       border-bottom: 1px solid #42c57a;
       color:#42c57a;
       font-weight:bold;
    }
  }

}
.el-form-item {
  font-weight:bold;
}
</style>
