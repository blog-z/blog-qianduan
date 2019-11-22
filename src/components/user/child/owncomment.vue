<template>
  <div>
    <div class="swap" v-for="(item,index) in localdata" :key="index">
      <div class="own">
        <span class="me">我</span>
        <span class="has-com">发表了评论</span>
        <span class="time">{{item.createTime}}</span>
        <span class="dele" @click="delecom(index)">
          <i class="iconfont icon-shanchu"></i> 删除
        </span>
      </div>
      <p class="content">{{item.commentContent}}</p>
      <div class="blog-title">
        评论与
        <span class="oneline">{{item.articleTitle}}</span> 的博文
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      localdata: []
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
    //点击删除评论
    delecom(index) {
      //先在本地数据把这个对象根据id过滤掉
      //1、先找到这个对象，根据index
      let itemobj = this.localdata[index];
      let commentid = itemobj.commentId;
      //在发请求删除这个id
      let data = {
        userName: this.userName,
        commentId:commentid
      };
      ajax({
        url: "/comment/deleteComment",
        method: "post",
        data: qs.stringify(data),
        //
        headers: { accessToken: this.token }
      }).then(res => {
        if (res.status == 0) {
          //首页数据请求成功
          //将数据保存到本地
          this.$message('删除成功')
        }
      });

      //在本地过滤掉
      this.localdata = this.localdata.filter(item => {
        return item.commentId != commentid;
      });
    }
  },
  mounted() {
    //发送请求把个人评论的数据请求回来
    let data = {
      userName: userName
    };
    ajax({
      url: "/comment/getOwnComments",
      method: "post",
      data: qs.stringify(data),
      //
      headers: { accessToken: this.token }
    }).then(res => {
      if (res.status == 0) {
        //首页数据请求成功
        //将数据保存到本地
        this.localdata = res.data;
      }
    });
  }
};
</script>
<style lang="" scoped>
.swap {
  width: 980px;
  height: 250px;
}
.own {
  height: 70px;
  line-height: 70px;
  font-size: 14px;
}
.me {
  color: #128bf0;
  margin-left: 10px;
  margin-right: 5px;
}
.has-com {
  color: #999999;
  margin-right: 5px;
}
.time {
  color: #999999;
}
.dele {
  float: right;
  color: #f83f66;
  cursor: pointer;
}
.content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.blog-title {
  width: 800px;
  height: 50px;
  background-color: #f9f9f9;
  line-height: 50px;
  border-left: 6px solid #cce9fb;
  border-radius: 2px;
  color: #999999;
  margin-top: 10px;
  padding-left: 10px;
}
.oneline {
  max-width: 650px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>