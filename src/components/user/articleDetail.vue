<template>
  <div>
    <div class="art-lis">
      <!-- 标题 -->
      <h2 class="art-title">{{detailData.article_title}}</h2>
      <!-- 内容 -->
      <p class="art-content" v-html="detailData.article_content"></p>
      <!-- 底下的小图标 -->
      <div class="art-icon">
        <span class="heat-icon">
          <i class="iconfont icon-icon" title="热度"></i>
        </span>
        <span class="article-heat">{{articleHeat}}</span>
        <span class="creat-time">
          <i class="iconfont icon-dingdanxiangqing-chuangjianshijian" title="发表时间"></i>
          {{detailData.create_time}}
        </span>
        <span class="update-time">
          <i class="iconfont icon-gengxinshijian" title="更新时间"></i>
          {{detailData.update_time}}
        </span>
      </div>
    </div>
    <!-- 评论模块 -->
    <h3 class="text-title">发表评论</h3>
    <el-input
      type="textarea"
      :rows="4"
      placeholder="请输入内容"
      v-model="commentText"
      resize="none"
      class="textacer"
    ></el-input>
    <el-button type="info" @click="textsubmit" class="submitArt" plain>发表</el-button>
    <!-- 查看评论模块 -->
    <h3 class="counttitle">{{tSlip}}条评论</h3>
    <div class="commentItem" v-for="(item, index) in commentItem" :key="index">
      <!-- 评论的内容 -->
      <p>{{item.commentContent}}</p>
      <div class="art-icon">
        <span class="creat-time">
          <i class="iconfont icon-dingdanxiangqing-chuangjianshijian" title="发表时间"></i>
          {{item.createTime}}
        </span>
        <span class="update-time">
          <i class="iconfont icon-gengxinshijian" title="更新时间"></i>
          {{item.updateTime}}
        </span>
        <span class="reply">0 回复</span>
        <div class="underline"></div>
      </div>
    </div>

    <div class="commentItem">
      <!-- 评论的内容 -->

      <p ref="maxheight">
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论
        的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论
        的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论
        的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
        我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论
        的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈我是评论的内容哈哈哈哈哈
      </p>
      <div class="art-icon">
        <span class="creat-time">
          <i class="iconfont icon-dingdanxiangqing-chuangjianshijian" title="发表时间"></i>
          2019-11-2
        </span>
        <span class="update-time">
          <i class="iconfont icon-gengxinshijian" title="更新时间"></i>
          2020-11-3
        </span>
        <span class="reply">0 回复</span>
        <div class="underline"></div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { ajax } from "../../network/request";
export default {
  name: "detailData",
  data() {
    return {
      // 初始化detailData
      detailData: null,
      // 初始化定时器
      timerId: "",
      //初始化文章的评论内容
      commentText: "",

      //初始化每条评论的数据，保存服务器请求回来的数据
      commentItem: [],

    };
  },
  computed: {
    //初始化热度
    articleHeat() {
      return this.detailData.article_heat;
    },
    //初始化articleId
    articleId() {
      return this.detailData.article_id;
    },
    userName() {
      return this.$store.state.userName;
    },
    token() {
      return this.$store.state.token;
    },
    //总条数
    tSlip(){
      return this.commentItem.length;
    }
  },
  methods: {
    textsubmit() {
      //发表评论的按钮，向服务器发送请求
      let data = {
        commentFarther: 0,
        commentContent: this.commentText,
        userName: this.userName,
        commentArticleId: this.articleId
      };
      ajax({
        url: "/comment/insertComment",
        method: "post",
        data: qs.stringify(data),
        //热度加一需不需要发token
        headers: { accessToken: this.token }
      }).then(res => {
        if (res.status == 0) {
          //发表成功
          this.$message("评论成功");
          this.commentText = "";
        }
      });
    },
    // 点击回复按钮，回复对应的评论
    reply() {
      //设置最大宽度增大
      this.$refs.maxheight.style.maxHeight = "300px";
      //显示
      alert("sssss");
    }
  },
  created() {
    this.detailData = this.$route.query;
    // console.log("detaildata为" + this.$route.query);
  },
  mounted() {
    //发送请求请求回来
    let data = {
      articleId: this.articleId,
      userName: this.userName
    };
    ajax({
      url: "/comment/selectComment",
      method: "post",
      data: qs.stringify(data),
      //发token
      headers: { accessToken: this.token }
    }).then(res => {
      if (res.status == 0) {
        //发表成功
        this.commentItem = res.data;
        // 渲染到页面上
        // TODO:这里开始
      }
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      //开启一个定时器，如果超过了1分钟就发送请求把articleHeat加一传过去
      vm.timerId = setTimeout(() => {
        let data = {
          articleId: vm.articleId,
          articleHeat: vm.articleHeat++
        };
        ajax({
          url: "/upload/updateArticleHeat",
          method: "post",
          data: qs.stringify(data)
          //热度加一需不需要发token
          //headers: { token: vm.token }
        }).then(res => {
          if (res.status == 0) {
            //热度增加成功
            vm.$message("文章热度增加成功");
            //销毁定时器
            clearTimeout(vm.timerId);
          }
        });
      }, 10000);
    });
  }
};

//取出homepage传进来的数据
</script>
<style scoped>
.art-lis {
  margin-left: 120px;
  margin-top: 30px;
  width: 730px;
  background-color: #f9f9f9;
  padding: 25px 25px;
}
.art-content {
  color: #404040;
  margin-top: 20px;
  margin-bottom: 20px;
}
.counttitle {
  margin-top: 100px;
}
.commentItem p {
  margin-bottom: 30px;
  max-width: 900px;
  max-height: 85px;
  overflow: hidden;
  text-indent: 1em;
}

.art-title {
  font-family: -apple-system, BlinkMacSystemFont, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  margin-bottom: 5px;
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
.text-title {
  margin-top: 30px;
  color: #0090ff;
}
.textacer {
  width: 90%;
  margin: 20px auto;
}
.underline {
  height: 1px;
  background-color: #f0f0f0;
  width: 900px;
  box-shadow: 0px -1px 1px 0px #fbfbfb;
}
.submitArt {
  position: relative;
  top: 30px;
  right: 100px;
}
.reply {
  color: #2f93ff;
  margin-left: 20px;
  cursor: pointer;
}
.commentItem {
  margin-top: 40px;
}
</style>