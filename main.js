import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import Tabbar from '@/pages/components/tabbar.vue' 

Vue.use(uView)
Vue.component('custom-tabbar', Tabbar)
Vue.config.productionTip = false
// 响应式全局状态
const globalState = Vue.observable({ tabIndex: 0 })
Vue.prototype.$globalState = globalState
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
