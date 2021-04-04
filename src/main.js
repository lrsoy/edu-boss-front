import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// (一)引入vant组件库
import Vant from 'vant'
// （一）引入Vant组件库所需要的的css样式
import 'vant/lib/index.css'

// （二）引入lib-flexible插件处理rem单位
import 'amfe-flexible'

// （一）将Vant注册成vue的插件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
