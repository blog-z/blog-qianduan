<template>
  <div class="clearfix">
    <div class="art-lis" v-for="(art, index) in localData" :key="index">
      <!-- 标题 -->
      <h3 class="art-title" @click="getArticle(index)">{{art.article_title}}</h3>

      <!-- 内容 -->
      <p class="art-content" v-html="art.article_content"></p>

      <!-- 底下的小图标 -->
      <div class="art-icon">
        <span class="heat-icon">
          <i class="iconfont icon-icon" title="热度"></i>
        </span>
        <span class="article-heat">{{art.article_heat}}</span>

        <span class="creat-time">
          <i class="iconfont icon-dingdanxiangqing-chuangjianshijian" title="发表时间"></i>
          {{art.create_time}}
        </span>
        <span class="update-time">
          <i class="iconfont icon-gengxinshijian" title="更新时间"></i>
          {{art.update_time}}
        </span>
      </div>
      <div class="underline"></div>
    </div>

    <!-- <ul class="page clearfix">
      <li v-for="(item, index) in totalPage" :key="index"
       class="pageitem" :class="{curent:curentPage==index+1}"
       @click="toNumpage(index)">
        {{index+1}}
      </li>
      

    </ul> -->
    <ul class="page clearfix">
      <li class="pageitem">1</li>
      <li class="pageitem">1</li>
      <li class="pageitem">1</li>
      <li class="pageitem">1</li>
      <li class="pageitem">1</li>
      
    </ul>
  </div>
</template>
<script>
//引入ajax
import { ajax } from "../../network/request";
import qs from "qs";
export default {
  name: "searchArticle",
  data() {
    return {
      //这里存放请求回来的数据
      localData: [],
      clickIndex: "",
      
      // 页码相关的数据
      totalPage: null,
      curentPage: null,

    };
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    token() {
      return this.$store.state.token;
    },
    searchtext(){
      return this.$store.state.inputText;
    }
  },
  methods: {
    //判断点击的那一篇文章，先获取index通过localdata的index找到这篇文章
    getArticle(index) {
      this.clickIndex = index;
      let id = this.localData[this.clickIndex].article_id;
      let data = {
        articleId: id
      };
      ajax({
        url: "/upload/getArticle",
        method: "post",
        data: qs.stringify(data),
        //点击详细文章需要发token
        headers: { accessToken: this.token }
      })
        .then(res => {
          if (res.status == 0) {
            //获取请求的数据，将数据传给子组件articleDetail
            let query = res.data.result;
            this.$router.push({
              path: "/articledetail",
              query: query
            });
          }
        })
        .catch(err => {
          alert("个人中心文章详情页请求失败");
          console.log(err);
        });

    },
    //判断点击那个页码发送对应的请求，将localData改变成对应的数据
    toNumpage(index){
      this.curentPage = index + 1;
      let data = {
        userName:this.userName,
        userInputText: this.searchtext,
        pageNum: this.curentPage
      }
       ajax({
        url: "/upload/searchArticle",
        method: "post",
        data: qs.stringify(data),
        //搜索发表的文章要发token
        headers: { accessToken: this.token }
      })
        .then(res => {
          if (res.status == 0) {
            //搜索成功，将数据保存到本地
            this.localData = res.data.list;
          }
        })
        .catch(err => {
          alert("搜索失败");
          // console.log(err);
        });



    }

  },

  mounted() {
    // 将首页传过来的数据保存的本地并且渲染一下。
    this.localData = this.$route.query.list;
    this.totalPage = this.$route.query.totalPage;
    this.curentPage = this.$route.query.pageNum;
  }
};
</script>
<style scoped>
.art-lis {
  margin-left: 120px;
  margin-top: 30px;
  width: 730px;

  position: relative;
}
.art-content {
  line-height: 30px;
  color: #999;
  font-size: 13px;
  margin-bottom: 20px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.underline {
  height: 1px;
  background-color: #f0f0f0;
  width: 730px;
  box-shadow: 0px -1px 1px 0px #fbfbfb;
}
.art-title {
  cursor: pointer;
  font-family: -apple-system, SF UI Display, Arial, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
  margin-bottom: 5px;
}
.art-title:hover {
  text-decoration: underline;
}
.art-icon {
  color: #b4b4b4;
  font-size: 12px;
}
.art-icon i {
  margin-left: 8px;
  font-size: 11px;
}
.heat-icon i {
  color: #ea6f5a;
}
.change-art {
  position: absolute;
  right: 100px;
  top: 55px;
}
.delete-art {
  position: absolute;
  right: 20px;
  top: 55px;
}
.write {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
}
.page{
  /* height: 10px; */
  /* background-color: #999; */
  position: absolute;
  top:700px;
  left: 45%;
}
.page .pageitem{
  font-size: 12px;
  cursor: pointer;
  float: left;
  background-color: aliceblue;
  color: #999;
  border-radius: 50%;
  line-height: 20px;
  width: 20px;
  text-align:center;
  margin: 3px;
}

.page .curent{
  background-color: #ea6f5a;
  color:bisque;
}
</style>