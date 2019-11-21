<template>
  <div class="child-content"  v-show="datacom">
    <div v-for='(item,index) in datacom'>
      <p class="com-name">{{item.commentUser}}</p>
      <p style="color:#666;font-size:13px;margin-left:20px;">{{item.commentContent}}</p>
      <div class="art-icon">
        <span class="creat-time">
          <i class="iconfont icon-dingdanxiangqing-chuangjianshijian" title="发表时间"></i>
          {{item.createTime}}
        </span>
        <span class="update-time">
          <i class="iconfont icon-gengxinshijian" title="更新时间"></i>
          {{item.updateTime}}
        </span>
        <div class="underline"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    datacom:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>
<style scoped>
.child-content {
  width: 800px;
  background-color: rgb(250, 250, 250);
  margin-left: 30px;
  margin-bottom: 10px;
  border-radius: 3px;

  padding-bottom: 2px;
  padding-top: 20px;
}
.com-name {
  color: #0090ff;
  margin-bottom: 10px;
  font-weight: normal;
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
  margin-bottom: 5px;
}
</style>