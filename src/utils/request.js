/* eslint-disable prefer-const */
/* eslint-disable no-useless-return */
// 引入axios
import axios from 'axios'
// （二） 添加vuex文件，获取内部的touken
import store from '@/store'
// 跳转处理
import router from '@/router'
// -使用axios.create创建一个自定义配置的axios实例
const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// （一） 设置请求拦截器，对接口进行鉴权
request.interceptors.request.use(config => {
  const { user } = store.state
  // (三) 检测这个user是否存在,并且内部是不是存在touken，如果存在在进行发送请求
  if (user && user.access_token) {
    // - 将值赋值给请求头信息
    config.headers.Authorization = user.access_token
  }
  // - 处理结束后将值返回出去，值是必须返回的
  return config
})

// （十） 封装跳转处理，用于跳转登录页面
function redirrctLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// (六) 设置变量 标记token的刷新状况
let isReFreshing = false
// 存储刷新是等待的请求
let requests = []

// （四） 设置请求拦截器 刷新touken
request.interceptors.response.use(response => {
  return response
}, async error => {
  // - 失败处理 判断存在响应内容，但是处理错误
  if (error.response) {
    // - 检测状态码是不是401
    if (error.response.status === 401) {
      // - 检测是否存在用户的登录的信息
      if (!store.state.user) {
        redirrctLogin()
        // - 如果不存在，结束就可以了
        return Promise.reject(error)
      }
      // (七) 发送请求前进行检测，是否已经存在刷新token请求
      if (isReFreshing) {
        return requests.push(() => {
          // - 指的事失败请求对象
          request(error.config)
        })
      }
      // （八）
      isReFreshing = true
      // (五) 发送请求， 尝试刷新touken
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      // -判断是否成功
      if (data.state !== 1) {
        // - 刷新token失败
        store.commit('setUser', null)
        redirrctLogin()
        return Promise.reject(error)
      } else {
        // - 刷新数据成功
        store.commit('setUser', data.content)

        // (九) 对requests里面的请求重新发送
        requests.forEach(callback => callback())
        requests = []
        isReFreshing = false
        return request(error.config)
      }
    }
  }
})

// 将他进行默认导出
export default request
