import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // (一) 用来存储登录用户数据
    user: JSON.parse(window.localStorage.getItem('user') || null)
  },
  mutations: {
    // （二） 用于修改user
    setUser (state, payload) {
      // - payload 是请求的用户数据，json格式不变操作，改变成对象格式
      state.user = JSON.parse(payload)
      // - 对数据进行本地存储
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
