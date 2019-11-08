<template>
  <div id="app">
    <!-- 头部开始 -->
    <div class="header">
      <div class="icon"></div>
      <h2 class="title">青春博客</h2>
      <!-- <router-link to="/homepage" tag="h4">首页</router-link> -->
      <h4 class="title" id="index" @click="tohomepage">首页</h4>
      <h4 class="title" id="cover" @click="tocover">发现</h4>

      <input type="text" class="search" />
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

    <keep-alive exclude="detailData,login,pcenter,homepage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    tohomepage() {
      this.$router.replace("/homepage");
    },
    tocover() {
      // this.$router.replace('/articledetail');
      this.$router.replace("/homepage");
    },
    topCenter(){
      console.log(this.$route.path)
      this.$router.replace("/pcenter");
    }
  },
  computed: {
    userName() {
      return this.$store.state.userName;
      // return "zhangsan"
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
}
.log-reg-wap{
  float: right;
  line-height:40px;
  font-size: 12px;
  color: #666C7A;
}
.comeback{
  cursor: pointer;
  margin-right: 20px;
}
</style>
