import Vue from 'vue';
import VueRouter from 'vue-router';

import login from './login/index';
//路由懒加载 （npm install @babel/plugin-syntax-dynamic-import）
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue');

const Test = () => import(/* webpackChunkName: "Test" */ '../views/test.vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash', //默认是hash值
    routes: [
        ...login,
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        },
    ]
})
export default router;