import { createApp } from 'vue'
import App from './App.vue'
import router from '../router/account.js'
// import 'vant/lib/index.css'; // 全局引入样式

import api from '../common/api'

const app = createApp(App);

// 挂载全局属性和方法 
app.config.globalProperties.$api = api;

app.use(router);
app.mount('#app')
