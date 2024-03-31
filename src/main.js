import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Container, Header, Main,Message,Loading  } from 'element-ui';  
import 'element-ui/lib/theme-chalk/index.css';
// 注册你需要的组件  
Vue.component('el-container', Container);  
Vue.component('el-header', Header);  
Vue.component('el-main', Main); 
Vue.prototype.$message = Message;  
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
