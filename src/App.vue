<template>
  <div id="app">
    <!-- 头部开始 -->
    <div class="header">
      <div class="icon"></div>
      <h2 class="title">青春博客</h2>
      <!-- <router-link to="/homepage" tag="h4">首页</router-link> -->
      <h4 class="title" id="index" @click="tohomepage">首页</h4>
      <h4 class="title" id="cover" @click="towrite">发表文章</h4>
      <!-- <el-button @click="towrite" class="write">发表文章</el-button> -->

      <input type="text" class="search" v-model="searchtext" />
      <a href="javascript:;" class="searchbtn" @click="tosearch">
        <i class="iconfont icon-RectangleCopy"></i>
      </a>

      <div v-if="userName" class="log-reg-wap">
        <span class="comeback" v-if="this.$route.path == '/pcenter'">{{userName}} 个人中心</span>
        <span class="comeback" @mouseover="menuShow = true" v-else>欢迎回来: {{userName}}</span>
        <!-- 退出登录   @click="topCenter"  个人中心-->
        <!-- <span class="login-out" @click="loginOut">退出</span> -->
        <!-- 这里在写一个div用于包裹用户中心  以及退出登录 -->
        <div class="showpag"  @mouseout="menuShow = false"></div>
          <ul class="menu" @mouseover="menuShow = true" v-show="menuShow">
          <li class="pcenter" @click="topCenter">用户中心</li>
          <li class="plogout" @click="loginOut">退出登录</li>
        </ul>
        
        
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
      pageNum: 1,
      menuShow: false,
    };
  },
  computed: {
    userName() {
      return this.$store.state.userName;
      // return 'haha'
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
      this.menuShow = false;
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
    },
    //点击发表文章
    towrite() {
      if(!this.userName){
        this.$message('请先登录')
        return;
      }
      this.$router.replace("/writearticle");
    },
    //点击退出登陆
    loginOut(){
      //删除vuex中的数据
      this.$store.commit('clearLogin');
      //删除localStorage中的数据
      localStorage.removeItem('nameobj');
      //跳转路由到登录页面
      this.$router.replace('/login');
      this.menuShow = false;
    },
    //鼠标移动到的时候menu显示
    
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
  position: relative;
}
.showpag{
  position: absolute;
  top: 10px;
  /* z-index: 1; */
  

  width: 130px;
  height: 140px;
  /* background-color: rgba(0, 0, 0, .3) */
}
.menu{
  position:absolute;
  top: 50px;
  left: 17px;
  background-color: rgba(64, 72, 91, .8);
  color: #d8dade;
  width: 90px;
  font-size: 13px;
  text-align: center;
  
}
.menu > li:hover{
  background-color: #343b4e;
  color: #fff;
  cursor: pointer;
  transition: all .4s;

}
.comeback,.login-out{
  /* cursor: pointer; */
  margin-right: 20px;
  position: relative;
  z-index: 2;
  cursor: pointer;
 
}
.login-out{
  margin-left: 10px;
  margin-right: 10px;
}
.login-out:hover{
  color:#0000cc;
  cursor: pointer;
  
}
</style>
