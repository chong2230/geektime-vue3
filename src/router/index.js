import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import Horde from '../views/Horde.vue'
import University from '../views/University.vue'
import Enterprise from '../views/Enterprise.vue'
import Mall from '../views/Mall.vue'
import Exchange from '../views/Exchange.vue'
import Download from '../views/Download.vue'
import About from '../views/About.vue'
import Intro from '../views/home/Intro.vue'
import Login from '../views/account/Login.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/horde', component: Horde },   // 部落
    { path: '/university', component: University },
    { path: '/horde', component: Horde },
    { path: '/enterprise', component: Enterprise },
    { path: '/mall', component: Mall },
    { path: '/exchange', component: Exchange },
    { path: '/download', component: Download },
    { path: '/about', component: About },
    { path: '/column/intro/:id', component: Intro },
    { path: '/login', component: Login }
]

const router = createRouter({
    // history: createWebHistory(),//createWebHashHistory(),
    history: createWebHashHistory(),
    routes
})

export default router;