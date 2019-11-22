import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import regist from '@/components/regist'
//首页路由
import homepage from '@/components/homepage'
//忘记密码路由
import forgetpsd from "../components/user/forgetpsd.vue"
// 文章详情路由
import articledetail from "../components/user/articleDetail.vue"
//个人中心路由
import pcenter from "../components/user/pcenter.vue"
//发表文章路由
import writearticle from '../components/user/writeArticle.vue'
//修改文章路由
import changearticle from '../components/user/changeArticle.vue'
//搜索的路由
import searchArticle from '../components/user/searchArticle'
//获取自己评论的路由
import owncomment from '../components/user/child/owncomment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homepage'
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/forgetpsd',
      name: 'forgetpsd',
      component: forgetpsd
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/articledetail',
      name: 'articledetail',
      component: articledetail
    },
    {
      path: '/pcenter',
      name: 'pcenter',
      component: pcenter
    },
    {
      path: '/writearticle',
      name: 'writearticle',
      component: writearticle
    },
    {
      path: '/changearticle',
      name: 'changearticle',
      component: changearticle
    },
    // 搜索的路由
    {
      path: '/searchArticle',
      name: 'searchArticle',
      component: searchArticle
    },
    // 自己评论内容的路由
    {
      path: '/owncomment',
      name: 'owncomment',
      component: owncomment
    },
    

  ]
})
