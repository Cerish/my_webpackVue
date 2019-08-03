import Vue from 'vue';
import VueRouter from 'vue-router';

//路由懒加载 （npm install @babel/plugin-syntax-dynamic-import）
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home.vue');
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue');
const Test = () => import(/* webpackChunkName: "Test" */ '../views/test.vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash', //默认是hash值
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/test',
            component: Test
        },
    ]
})
export default router;