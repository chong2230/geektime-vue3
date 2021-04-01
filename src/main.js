import { createApp } from 'vue'
import { Swipe, SwipeItem, Tab, Tabs, Collapse, CollapseItem } from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'; // 全局引入样式

import api from './common/api'

const app = createApp(App);

// 挂载全局属性和方法 
app.config.globalProperties.$api = api;

app.use(router);
// app.use(api);    // 需要调用use吗？
app.use(Swipe);
app.use(SwipeItem);
app.use(Tab);
app.use(Tabs);
app.use(Collapse);
app.use(CollapseItem);
app.mount('#app')
