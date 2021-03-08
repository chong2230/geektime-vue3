import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { Swipe, SwipeItem } from 'vant'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'; // 全局引入样式
// import Home from './views/Home.vue'
// import About from './views/About.vue'

// const Home = { template: '<div>Home</div>' }
// const About = { template: '<div>About</div>' }

// const routes = [
//     { path: '/', component: Home },
//     { path: '/about', component: About }
// ]

// const router = createRouter({
//     history: createWebHistory(),//createWebHashHistory(),
//     routes
// })

const app = createApp(App);
app.use(router);
app.use(Swipe);
app.use(SwipeItem);
app.mount('#app')
