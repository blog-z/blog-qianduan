<template>
  <div class="registc">
    <el-row>
      <el-col :span="4">
        <label for="userName">用户名</label>
      </el-col>
      <el-col :span="20">
        <el-input
          placeholder="请输入内容"
          v-model="userName"
          id="userName"
          ref="onfocus"
          @blur="checkHas"
          clearable
        ></el-input>
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
    <el-row>
      <el-col :span="4">
        <label for="surePassword">确认密码</label>
      </el-col>
      <el-col :span="20" id="surepsd">
        <el-input placeholder="确认密码" v-model="surePassword" id="surePassword" show-password></el-input>
        <span id="errWarn" v-show="iserr"></span>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4">
        <label for="userEmail">邮箱</label>
      </el-col>
      <el-col :span="20">
        <el-input placeholder="请输入邮箱" v-model="userEmail" id="userEmail" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <label for="userPhone">手机号</label>
      </el-col>
      <el-col :span="20">
        <el-input placeholder="请输入手机号" v-model="userPhone" id="userPhone" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <label for="userQuestion">密保问题</label>
      </el-col>
      <el-col :span="20">
        <el-select v-model="userQuestion" placeholder="请选择" class="select-psd">
          <el-option
            v-for="item in questionObj"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <label for="userAnswer">密保答案</label>
      </el-col>
      <el-col :span="20">
        <el-input placeholder="请输入内容" v-model="userAnswer" id="userAnswer" clearable></el-input>
      </el-col>
    </el-row>
    <el-button @click="submit" class="regist-btn" round>注册</el-button>
  </div>
</template>

<script>
// import axios from 'axios'
import { ajax } from "../network/request";
import qs from "qs";

export default {
  name: "HelloWorld",
  data() {
    return {
      userName: "",
      userPassword: "",
      surePassword: "",
      userEmail: "",
      userPhone: "",
      userQuestion: "",
      userAnswer: "",
      questionObj: [
        {
          value: "0",
          label: "我的出生地"
        },
        {
          value: "1",
          label: "我的出生年月"
        },
        {
          value: "2",
          label: "我的母校名称"
        },
        {
          value: "3",
          label: "我的班主任名称"
        },
        {
          value: "4",
          label: "我的宠物名称"
        }
      ],
      value: ""
    };
  },
  methods: {
    //提交到服务器进行注册
    submit() {
      let data = {
        userName: this.userName,
        userPassword: this.userPassword,
        userEmail: this.userEmail,
        userPhone: this.userPhone,
        userQuestion: this.userQuestion,
        userAnswer: this.userAnswer
      };
      // console.log(JSON.parse(JSON.stringify(data)))

      ajax({
        url: "/user/register",

        method: "post",
        data: qs.stringify(data)
      })
        .then(res => {
          if (res.status == 0) {
            //提示注册成功并返回到登录页面
            this.$message("注册成功");
            this.$router.replace("/login");
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //检查用户名是否被注册
    checkHas() {
      // console.log(this.$refs.onfocus.$el.getElementsByTagName('input')[0])

      //发送请求
      // console.log('离开焦点')
      let data = {
        userName: this.userName
      };
      // console.log(JSON.parse(JSON.stringify(data)))

      ajax({
        url: "/user/checkRegisterUserName",
        method: "post",
        data: qs.stringify(data)
      }).then(res => {
        if (res.status == 1) {
          //提示注册成功并返回到登录页面
          this.$message("用户名已被占用");
          // this.$router.replace('/login');
          this.$refs.onfocus.$el.getElementsByTagName("input")[0].focus();
        }
        // console.log(res);
      });
    }
  },
  computed: {
    //监视确认密码是否一致
    iserr() {
      if (this.userPassword === this.surePassword) {
        return false;
      } else {
        return true;
      }
    },
    submitobj() {
      return {
        userName: this.userName,
        userPassword: this.userPassword,
        userEmail: this.userEmail,
        userPhone: this.userPhone,
        userQuestion: this.userQuestion,
        userAnswer: this.userAnswer
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registc {
  font-size: 14px;
  width: 400px;
  margin: 150px auto;
}
label {
  line-height: 40px;
  text-align: justify;
  text-align-last: justify;
  padding-left: 5px;
}
#surepsd {
  position: relative;
}
#errWarn {
  position: absolute;
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
  box-shadow: 0px 0px 2px red;

  top: 17px;
  left: 190px;
}
.el-row {
  margin: 10px 0;
}
.regist-btn {
  margin-top: 20px;
  margin-left: 130px;
  width: 180px;
}
.select-psd {
  width: 100%;
}
</style>
