<template>
  <div id="app">
    <!-- 头部开始 -->
    <div class="header">
      <div class="icon"></div>
      <h2 class="title">青春博客</h2>
      <!-- <router-link to="/homepage" tag="h4">首页</router-link> -->
      <h4 class="title" id="index" @click="tohomepage">首页</h4>
      <h4 class="title" id="cover" @click="tocover">发现</h4>

      <input type="text" class="search" v-model="searchtext" />
      <a href="javascript:;" class="searchbtn" @click="tosearch">
        <i class="iconfont icon-RectangleCopy"></i>
      </a>

      <div v-if="userName" class="log-reg-wap">
        <span class="comeback" v-if="this.$route.path == '/pcenter'">{{userName}} 个人中心</span>
        <span @click="topCenter" class="comeback" v-else>欢迎回来: {{userName}}</span>
      </div>
      <div class="log-reg-wap" v-else>
        <div class="regist">
          <router-link to="/regist">注册</router-link>
        </div>

        <div class="login">
          <router-link to="/login">登录</router-link>
          <span>/</span>
        </div>
      </div>
    </div>

    <!-- 头部结束 -->

    <router-view />
  </div>
</template>

<script>
//准备发送请求
import { ajax } from "./network/request";
import qs from "qs";

export default {
  name: "App",
  data() {
    return {
      //用户输入搜索的文本
      searchtext: "",
      //初始化pageNum
      pageNum: 1
    };
  },
  computed: {
    userName() {
      return this.$store.state.userName;
      // return "zhangsan"
    },
    token() {
      return this.$store.state.token;
    }
  },

  methods: {
    tohomepage() {
      this.$router.replace("/homepage");
    },
    tocover() {
      // this.$router.replace('/articledetail');
      this.$router.replace("/homepage");
    },
    topCenter() {
      // console.log(this.$route.path);
      this.$router.replace("/pcenter");
    },
    //点击搜索
    tosearch() {
      //将搜索文本添加到vuex中
      this.$store.commit("inputChange", this.searchtext);
      //发送请求，得到数据将数据传给搜索页面，搜索页面可以点击
      //初始化data，准备发送搜索的ajax。
      //先跳转到首页，在跳转到搜索页面
      this.$router.replace("/homepage");

      let data = {
        userName: this.userName,
        userInputText: this.searchtext,
        pageNum: this.pageNum
      };
      ajax({
        url: "/upload/searchArticle",
        method: "post",
        data: qs.stringify(data),
        //搜索发表的文章要发token
        headers: { accessToken: this.token }
      })
        .then(res => {
          if (res.status == 0) {
            //搜索成功，跳转路由到searchArticle，将数据传输给这个路由
            this.$router.replace({
              path: "searchArticle",
              query: res.data
            });
          }
        })
        .catch(err => {
          alert("搜索失败");
          // console.log(err);
        });
    }
  },
  mounted() {
    //先读取localStorage中是否有数据，如果有，就调用vuex中的方法，把数据保存到vuex中
    let nameobj = localStorage.getItem("nameobj");
    if (nameobj) {
      let nameZ = JSON.parse(nameobj);
      this.$store.commit("hasLogin", nameZ);
      this.$message("欢迎回来" + nameZ.userName);
    }
  }
};
</script>

<style scoped>
#app {
  width: 100%;
  min-width: 960px;
  max-width: 1300px;
  margin: 0 auto;
}
.header {
  width: 100%;
  height: 60px;
  padding: 10px 0;
  background-color: #f6f6f6;
}
.icon {
  width: 80px;
  height: 50px;
  background: url(./assets/icon.jpg);
  background-size: 80px 50px;
  background-repeat: no-repeat;
  float: left;
}
.title {
  float: left;
  line-height: 50px;
  margin-left: 20px;
  color: #2f2f2f;
  cursor: pointer;
}

.regist {
  float: right;
  line-height: 40px;
  margin-left: 5px;
  margin-right: 10px;
}
.login {
  float: right;
  line-height: 40px;
}

.search {
  outline: none;
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 15px;
  margin-top: 10px;
  margin-left: 30px;
  padding-left: 10px;
  vertical-align: top;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 12px;
  color: #666c7a;
}
.searchbtn {
  display: inline-block;
  height: 30px;
  width: 30px;
  margin-top: 10px;
  border-radius: 15px;
  background-color: #fff;
  font-weight: bolder;
  text-align: center;
  line-height: 30px;
  transition: all 0.3s;
}
.searchbtn:hover {
  width: 50px;
}

.log-reg-wap {
  float: right;
  line-height: 40px;
  font-size: 12px;
  color: #666c7a;
}
.comeback {
  cursor: pointer;
  margin-right: 20px;
}
</style>
