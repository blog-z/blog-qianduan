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
  </div>
</template>
<script>
import qs from "qs";
import { ajax } from "../../network/request";
export default {
  name:'detailData',
  data() {
    return {
      // 初始化detailData
      detailData: null,
      // 初始化定时器
      timerId: ""
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
    }
  },
  created() {
    this.detailData = this.$route.query;
    console.log("detaildata为" + this.$route.query);
    
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
        data: qs.stringify(data),
        //热度加一需不需要发token
        headers: { token: vm.token }
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
</style>