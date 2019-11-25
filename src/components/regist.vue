<template>
  <div class="registc">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      size="small"
    >
      <!-- 这里的代码需要修改 -->
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="userName">
        <el-input type="userName" ref="onfocus" @blur="checkHas" v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="userPassword">
        <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item label="确认密码" prop="surePassword">
        <el-input type="password" v-model="ruleForm.surePassword" autocomplete="off"></el-input>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item label="邮箱" prop="userEmail">
        <el-input type="email" v-model="ruleForm.userEmail"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model.number="ruleForm.userPhone"></el-input>
      </el-form-item>
      <!-- 密保 -->
      <el-form-item label="密保问题" prop="userQuestion">
        <el-select v-model="ruleForm.userQuestion" placeholder="请选择" class="select-psd">
          <el-option
            v-for="item in questionObj"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 密保答案 -->
      <el-form-item label="密保答案" prop="userAnswer">
        <el-input v-model="ruleForm.userAnswer" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submit(ruleForm)" class="regist-btn">注册</el-button>
      <el-button @click="resetForm">清空</el-button>

      <!-- <el-button @click="submit" class="regist-btn" round>注册</el-button> -->
    </el-form>

    <!-- 这里的代码修改结束 -->

    <!-- <el-col>
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
    </el-form>-->
  </div>
</template>

<script>
// import axios from 'axios'
import { ajax } from "../network/request";
import qs from "qs";

export default {
  name: "HelloWorld",
  data() {
    // 用于验证的代码
    // 用户名的规则用户名正则，4到16位（字母，数字，下划线，减号） var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    var rcheckUser = (rule, value, callback) => {
      //  /^[a-zA-Z].{15}$/
      var regUser = /^[a-zA-Z0-9_-]{4,16}$/;

      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (regUser.test(value)) {
          callback();
        } else {
          callback(new Error("4到16位字符"));
        }
      }, 500);
    };
    //密码的规则//密码强度正则，最少6位， var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    // 包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    var rcheckPass = (rule, value, callback) => {
      //  /^[a-zA-Z].{15}$/
      var regPass = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      // var regPass = /.{3,}/;
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(() => {
        if (regPass.test(value)) {
          callback();
        } else {
          callback(new Error("包括至少大写字母、小写字母、数字和特殊字符"));
        }
      }, 500);
    };
    //重复密码的规则
    var rcheckRePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //邮箱的规则
    var rcheckEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };

    //手机号的规则
    var rcheckPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("手机号码格式错误"));
          }
        }
      }, 100);
    };
    //密保答案规则
    var rcheckAnswer = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("答案不能为空"));
      }
      // callback();
      setTimeout(() => {
        callback();
      }, 100);
    };

    //用于验证的代码结束

    return {
      // 用于验证的代码开始
      rules: {
        // 用户名
        userName: [{ validator: rcheckUser, trigger: "blur" }],
        // 密码
        userPassword: [{ validator: rcheckPass, trigger: "blur" }],
        // 确认密码
        surePassword: [{ validator: rcheckRePass, trigger: "blur" }],
        // 邮箱
        userEmail: [{ validator: rcheckEmail, trigger: "blur" }],
        // 手机号
        userPhone: [{ validator: rcheckPhone, trigger: "blur" }],
        // 密保答案
        userAnswer: [{ validator: rcheckAnswer, trigger: "blur" }]

        // buyerPhone: [{ validator: checkPhone, trigger: "blur" }],
        // buyerEmail: [{ validator: checkEmail, trigger: "blur" }]
        // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
      },

      // 用于验证的代码结束

      ruleForm: {
        userName: "",
        userPassword: "",
        surePassword: "",
        userEmail: "",
        userPhone: "",
        userQuestion: "",
        userAnswer: ""
      },

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
    submit(formName) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // console.log(valid)
          // 通过了验证
          let data = {
            userName: this.ruleForm.userName,
            userPassword: this.ruleForm.userPassword,
            userEmail: this.ruleForm.userEmail,
            userPhone: this.ruleForm.userPhone,
            userQuestion: this.ruleForm.userQuestion,
            userAnswer: this.ruleForm.userAnswer
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    //提交到服务器进行注册

    rsubmit() {
      let data = {
        userName: this.ruleForm.userName,
        userPassword: this.ruleForm.userPassword,
        userEmail: this.ruleForm.userEmail,
        userPhone: this.ruleForm.userPhone,
        userQuestion: this.ruleForm.userQuestion,
        userAnswer: this.ruleForm.userAnswer
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
        userName: this.ruleForm.userName
      };
      // console.log(JSON.parse(JSON.stringify(data)))
      ajax({
        url: "/user/checkRegisterUserName",
        method: "post",
        data: qs.stringify(data)
      }).then(res => {
        if (res.status == 1) {
          //提示用户名已被占用
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
  margin-left: 100px;
  width: 180px;
}
.select-psd {
  width: 100%;
}
</style>
