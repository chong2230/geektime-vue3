import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '../views/account/Login.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login }
]

const router = createRouter({
    // history: createWebHistory(),//createWebHashHistory(),
    history: createWebHashHistory(),
    routes
})

export default router;