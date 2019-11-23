<template>
  <div class="loginc">
    <!-- 这里是登录组件 -->

    <!-- 有邮箱登录和用户名登录两种方式 -->
    <diV class="clearfix">
      <!-- <router-link to="/login/loginname">用户名登录</router-link>
      <router-link to="/login/loginmail">邮箱登录</router-link>
      <router-view></router-view>-->
      <!-- 登录方式写在一起 -->
      <a href="javascript:;" class="login-type" @click="show = true" :class="{on:show}">用户名登录</a>
      <a href="javascript:;" class="login-type-eml" @click="show = false" :class="{on: !show}">邮箱登录</a>
    </diV>

    <div class="noshow" :class="{on:show}">
      <!-- 用户名登录方式的input框 -->
      <el-row>
        <el-col :span="4">
          <label for="userName">用户名</label>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" v-model="userName" id="userName" clearable></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <label for="userPassword">密码</label>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入密码" v-model="userPassword" id="userPassword" show-password></el-input>
        </el-col>
      </el-row>
    </div>

    <div class="noshow" :class="{on: !show}">
      <!-- 邮箱登录方式的input框 -->
      <el-row>
        <el-col :span="4">
          <label for="userEmail">邮箱</label>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入内容" v-model="userEmail" id="userEmail" clearable></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <label for="userPassword">密码</label>
        </el-col>
        <el-col :span="20">
          <el-input placeholder="请输入密码" v-model="userPassword" id="userPassword" show-password></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="log-fog">
      <el-button @click="login" round>登录</el-button>
      <!-- 忘记密码需要跳转到新的页面 -->
      <router-link to="/forgetpsd">忘记密码</router-link>
    </div>

    <!-- <a href="javascript:;" @click="forgetpsd"></a> -->
    <!-- 修改密码需要重新跳转到新的页面 -->
    <!-- <router-link @click='changepsd'>修改密码</router-link> -->
  </div>
</template>

<script>
import qs from "qs";
import { ajax } from "../network/request";

export default {
  name: "login",
  data() {
    return {
      input: "",
      show: true, //true代表用户名登录，false代表邮箱登录
      userName: "",
      userEmail: "",

      userPassword: ""
    };
  },
  methods: {
    login() {
      if (this.show) {
        //用户名登录
        let data = {
          userName: this.userName,
          userPassword: this.userPassword
        };
        ajax({
          url: "/user/login",
          method: "post",
          data: qs.stringify(data)
          // headers:{'token':"aaaaaaaaaa"}
        })
          .then(res => {
            console.log(res);
            // let res = JSON.parse(response);
            if (res.status == 0) {
              //登录成功需要跳转到首页，并且把登录注册换成用户名，还要把用户名和token传给vuex   ?
              this.$store.commit("hasLogin", res.data);
              // alert("登录成功,token为" + res.data);
              this.$message("欢迎回来" + res.data.userName);
              //将数据存储到localStorage中
              let nameobj = JSON.stringify(res.data);//转化为字符串
              localStorage.setItem('nameobj',nameobj);

              //跳转到首页
              this.$router.replace('/homepage');

              //把登录注册替换成用户名(在首页完成)
            }
          })
          .catch(err => {
            alert("登录失败");
            console.log(err);
          });
      } else {
        //邮箱登录
      }
    },
    forgetpsd() {
      this.$router.replace = "/forgetpsd";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  line-height: 40px;
  text-align-last: justify;
  text-align: justify;
}
.loginc {
  font-size: 14px;
  width: 400px;
  height: 200px;
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
.log-fog {
  padding-top: 40px;
}
.log-fog button {
  margin-left: 150px;
  margin-right: 40px;
}
.el-row {
  margin-top: 20px;
}
</style>
