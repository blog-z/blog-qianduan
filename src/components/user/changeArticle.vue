<template>
  <div>
    <h4>标题</h4>
    <el-input type="textarea" placeholder="请输入内容" v-model="title" resize='none' maxlength="40" show-word-limit></el-input>
    <h4>内容</h4>
    <editor-bar v-model="content" :isClear="isClear" @change="change"></editor-bar>
    <el-button class="submit" @click="bchange">提交修改</el-button>

  </div>
</template>
<script>
import EditorBar from "../wangEditor/wangeditor";
import { ajax } from "../../network/request";
import qs from "qs";
export default {
  components: { EditorBar },
  data() {
    return {
      isClear: false,
      value: "", //内容
    };
  },
  computed: {
    userName(){
      return this.$store.state.userName
    },
    token(){
      return this.$store.state.token
    },
    articleId(){
      return this.$route.query.articleId
    },
    title(){
      //标题
      return this.$route.query.articleTitle
    },
    content(){
      //内容
      return this.$route.query.articleContent
    }

  },
  methods: {
    change(val) {
      //这里每次输入都会触发
      // console.log(val);
      this.value = val;
      console.log(this.value);
    },
    bchange() {
      //提交到服务器       http://localhost:8080/upload/updateArticle
      let data = {
        articleId: this.articleId,
        userName: this.userName,
        articleTitle: this.title,
        articleContent: this.value
      }
      ajax({
        url: "/upload/updateArticle",
        method: "post",
        data: qs.stringify(data),
        //发表文章发表的文章需不需要发token
        headers: { accessToken: this.token }
      })
        .then(res => {
          if (res.status == 0) {
            //发表成功
            this.$message('修改成功')
            this.content = ''
            this.title = ''
          }
        })
        .catch(err => {
          alert("发表文章失败");
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
h4 {
  margin: 20px 10px;
}
.submit {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
}
</style>
