import { createApp } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'; // 全局引入样式

import api from './common/api'

const app = createApp(App);

// 挂载全局属性和方法 
app.config.globalProperties.$api = api;

app.use(router);
app.use(Swipe);
app.use(SwipeItem);
app.mount('#app')
