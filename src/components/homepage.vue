<template>
  <div>
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
    <p class="load-more" @click="loadmore" v-if="!loadOver">加载更多</p>
    <p class="load-over" v-else>已加载全部</p>
  </div>
</template>
<script>
//引入ajax
import { ajax } from "../network/request";
import qs from "qs";
export default {
  name: "homepage",
  data() {
    return {
      //请求第一页的数据
      pageNum: 1,
      //这里存放请求回来的数据
      localData: [],
      //存放点击的index
      clickIndex: 0,
      totalPage: null,
      loadOver: false
    };
  },
  computed: {
    userName() {
      return this.$store.state.userName;
    },
    token() {
      return this.$store.state.token;
    }
  },
  methods: {
    //点击加载更多
    loadmore() {
      this.pageNum++;
      if (this.pageNum > this.totalPage) {
        //服务器的数据请求完毕
        this.loadOver = true;
        return;
      }
      let data = {
        pageNum: this.pageNum
      };
      //console.log("首页创建了")
      ajax({
        url: "/upload/homeArticle",
        method: "post",
        data: qs.stringify(data),
        //token
        headers: { token: this.token }
      })
        .then(res => {
          if (res.status == 0) {
            //将请求的数据保存到本地
            this.localData.push(...res.data.list);
          }
        })
        .catch(err => {
          this.$message("加载更多失败");
          console.log(err);
        });
    },
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
        //点击详细文章需不需要发token
        headers: { token: this.token }
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
          this.$message("详情页请求失败");
          console.log(err);
        });
    }
  },
  mounted() {
    let data = {
      pageNum: this.pageNum
    };
    //console.log("首页创建了")
    ajax({
      url: "/upload/homeArticle",
      method: "post",
      data: qs.stringify(data),
      //第一次请求需不需要发token
      headers: { token: this.token }
    })
      .then(res => {
        if (res.status == 0) {
          //将请求的数据保存到本地
          this.localData = res.data.list;
          this.totalPage = res.data.totalPage;
        }
      })
      .catch(err => {
        this.$message("首页数据请求失败");
        console.log(err);
      });
      
      
  }
};
</script>
<style scoped>
.art-lis {
  margin-left: 120px;
  margin-top: 30px;
  width: 730px;
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
.load-more,
.load-over {
  font-size: 12px;
  color: #666;
  margin-left: 120px;
  margin-top: 8px;

  
}
.load-more {
  cursor: pointer;
}
.load-more:hover {
  text-decoration: underline;
  color: #252526;
}
</style>