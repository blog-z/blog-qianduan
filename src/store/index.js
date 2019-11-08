import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  userName: '',
  token: ''
}
const mutations ={
  hasLogin(state,obj){
    state.userName = obj.userName;
    state.token = obj.token;

  }

}
const getters = {

}
const actions = {

}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions

})