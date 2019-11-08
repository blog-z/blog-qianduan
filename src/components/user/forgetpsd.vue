<template>
  <div class="for-psd">
    <!-- 这里是登录组件 -->

    <!-- 有邮箱登录和用户名登录两种方式 -->
    <diV class="clearfix">
      <!-- <router-link to="/login/loginname">用户名登录</router-link>
      <router-link to="/login/loginmail">邮箱登录</router-link>
      <router-view></router-view>-->
      <!-- 登录方式写在一起 -->
      <a href="javascript:;" class="login-type" @click="show = true" :class="{on:show}">通过密保找回</a>
      <a
        href="javascript:;"
        class="login-type-eml"
        @click="show = false"
        :class="{on: !show}"
      >通过邮箱找回</a>
    </diV>

    <div class="noshow" :class="{on:show}">
      <!-- 用密保找回方式的input框 -->
      <el-row>
        <el-col :span="4">
          <label for="userName">用户名</label>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入用户名" v-model="userName" id="userName" clearable></el-input>
        </el-col>
      </el-row>

      <el-row v-if="nextmsg == '验证'">
        <el-col :span="8">
          <label for="userPassword">{{resmsg}}</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入密保答案" v-model="userAnswer" id="userAnswer" clearable></el-input>
        </el-col>
      </el-row>
      <el-row v-if="nextmsg == '重置密码'">
        <el-col :span="8">
          <label for="userPassword">请输入新密码</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="重制密码" v-model="userPassword" id="userPassword" clearable></el-input>
        </el-col>
        <el-col :span="8">
          <label for="userPassword">确认新密码</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="确认重制密码" v-model="sureUserPassward" id="sureUserPassward" clearable></el-input>
        </el-col>
      </el-row>
      <el-button @click="nextstep" class="nextmsg" round>{{nextmsg}}</el-button>
    </div>
    <!-- 以上是密保找回 -->

    <!-- 以下是通过邮箱找回 -->
    <div class="noshow" :class="{on: !show}">
      <!-- 邮箱找回方式的input框 -->
      <el-row>
        <el-col :span="4">
          <label for="userEmail">邮箱</label>
        </el-col>
        <el-col :span="15">
          <el-input placeholder="请输入内容" v-model="userEmail" id="userEmail" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <el-button @click.prevent="getcode">获取验证码</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <label for="passwordNumber">验证码</label>
        </el-col>
        <el-col :span="20">
          <el-input v-model="passwordNumber" id="passwordNumber"></el-input>
        </el-col>
        
      </el-row>
      <!-- 密码找回重复的代码 -->
      <!-- 做一个重置密码的组件 -->

      <el-row v-if="emailmsg == '重置密码'">
        <el-col :span="8">
          <label for="userPassword">请输入新密码</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="重制密码" v-model="userPassword" id="userPassword" clearable></el-input>
        </el-col>
        <el-col :span="8">
          <label for="userPassword">确认新密码</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="确认重制密码" v-model="sureUserPassward" id="sureUserPassward" clearable></el-input>
        </el-col>
      </el-row>
      <el-button @click="emailmsg" v-if="nextmsg == '重置密码'" round>{{emailmsg}}</el-button>

      <!-- <el-row>
        <el-col :span="8">
          <label for="userPassword">密码</label>
        </el-col>
        <el-col :span="16">
          <el-input placeholder="请输入密码" v-model="userPassword" id="userPassword" clearable></el-input>
        </el-col>
      </el-row>-->
    </div>
    <!-- 通过邮箱验证结束 -->

    <!-- <a href="javascript:;" @click="forgetpsd">忘记密码</a> -->
    <!-- 修改密码需要重新跳转到新的页面 -->
    <!-- <router-link @click='changepsd'>修改密码</router-link> -->
  </div>
</template>
<script>
import { ajax } from "../../network/request";
import qs from "qs";
export default {
  data() {
    return {
      input: "",
      show: true, //true代表密保找回，false代表邮箱找回
      userName: "", //初始化用户名
      userEmail: "", //初始化邮箱
      //
      nextmsg: "下一步", //显示 下一步 或者是 验证 或者是 重置密码
      userPassword: "", //初始化用户密码
      sureUserPassward: "",
      resmsg: "", //初始化从后台回来的问题
      userAnswer: "", //初始化验证答案
      token: "", //从服务器取得token
      passwordNumber: "", //从服务器获取验证码
      emailmsg: "" //重置email显示的msg
    };
  },
  methods: {
    //通过用户名获取问题、验证问题、修改密码
    nextstep() {
      //下一步

      //如果是下一步发送请求获取请求问题
      if (this.nextmsg == "下一步") {
        let data = {
          userName: this.userName
        };
        ajax({
          url: "/user/getQuestion",
          method: "post",
          data: qs.stringify(data)
        })
          .then(res => {
            // let res = JSON.parse(response);
            //发生请求获取密保问题
            console.log("成功获取密保问题" + res);
            if (res.status == 0) {
              this.nextmsg = "验证";
              switch (res.msg) {
                case "0":
                  this.resmsg = "我的出生地";
                  break;
                case "1":
                  this.resmsg = "我的出生年月";
                  break;
                case "2":
                  this.resmsg = "我的母校名称";
                  break;
                case "3":
                  this.resmsg = "我的班主任名称";
                  break;
                case "4":
                  this.resmsg = "我的宠物名称";
                  break;
              }
            } else if (res.status == 1) {
              //没有这个用户
              this.$message("没有此用户");
            }
          })
          .catch(err => {
            alert("网络错误");
          });
      }
      //如果是验证发送请求验证问题和答案、
      else if (this.nextmsg == "验证") {
        let data = {
          userName: this.userName,
          userAnswer: this.userAnswer
        };
        ajax({
          url: "/user/setAnswer",
          method: "post",
          data: qs.stringify(data)
        })
          .then(res => {
            console.log("返回的数据为" + res);
            // let res = JSON.parse(response);
            //发生请求获取密保问题
            if (res.status == 0) {
              //验证通过
              this.token = res.msg;
              alert("验证通过" + res.msg);
              this.nextmsg = "重置密码";
            } else if (res.status == 1) {
              //没有这个用户
              alert("msg为" + res.msg);
              //this.$message("问题的答案错误");
            }
          })
          .catch(err => {
            alert("网络错误");
          });
      } else if (this.nextmsg == "重置密码") {
        //如果是重置密码，发送重置密码的请求
        let data = {
          userName: this.userName,
          password: this.userPassword,
          token: this.token
        };
        if (this.userPassword != this.sureUserPassward) {
          // this.$message("")
          this.$message({
            message: "两次输入的密码不一致"
          });
          // alert("")
          return;
        }

        //最好在这里设置一个延时操作避免用户重复点击？
        ajax({
          url: "/user/setPassword",
          method: "post",
          data: qs.stringify(data)
          // headers: { token: this.token }
        })
          .then(res => {
            console.log("返回的数据为" + res);
            // let res = JSON.parse(response);
            //发生请求获取密保问题
            if (res.status == 0) {
              //验证通过
              alert("success" + res.msg);
            } else if (res.status == 1) {
              //没有这个用户
              alert("false" + res.msg);
              //this.$message("问题的答案错误");
            }
          })
          .catch(err => {
            alert("网络错误");
          });
      }
    },
    //点击获取验证码
    getcode() {
      let data = {
        userEmail: this.userEmail
      };

      ajax({
        url: "/user/getEmailCheck",
        method: "post",
        data: qs.stringify(data)
      })
        .then(res => {
          if (res.status == 0) {
            this.$message("发送邮箱成功");
            this.emailmsg = "重置密码";
          } else if (res.status == 1) {
            this.$message("邮箱未注册");
          }
        })
        .catch(err => {
          alert("网络错误");
        });
    },
    //通过邮箱修改密码
    emailtext() {
      let data = {
        userEmail: this.userEmail,
        passwordNumber: this.passwordNumber,
        password: this.userPassword
      };
      ajax({
        url: "/user/setPasswordByEmail",
        method: "post",
        data: qs.stringify(data)
      })
        .then(res => {
          if (res.status == 0) {
            this.$message("修改密码成功");
          } else if (res.status == 1) {
            this.$message("请求超时，请重新发送");
            this.passwordNumber = "";
          }
        })
        .catch(err => {
          alert("网络错误");
        });
    }
  }
};
</script>
<style scoped>
label {
  line-height: 40px;
  text-align-last: justify;
  text-align: justify;
}
.for-psd {
  font-size: 14px;
  width: 400px;
  margin: 150px auto;
}
.login-type {
  float: left;
  /* margin: 5px 5px; */
  margin-left: 120px;
}
.login-type-eml {
  float: right;
  margin-right: 120px;
}
.noshow {
  display: none;
}
.on {
  display: block;
}
.el-row {
  margin-top: 20px;
}
.nextmsg {
  margin: 30px 0 0 80px;
  width: 100px;
}

.login-type {
  float: left;
  /* margin: 5px 5px; */
  margin-left: 120px;
}
.login-type-eml {
  float: right;
  margin-right: 120px;
}
</style>