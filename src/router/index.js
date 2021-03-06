import Vue from 'vue';
import VueRouter from 'vue-router';
import tools from '../tools/index';

import login from './login/index';
import main from './main/index';
//路由懒加载 （npm install @babel/plugin-syntax-dynamic-import）

const Test = () => import(/* webpackChunkName: "Test" */ '@/views/test.vue');

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash', //默认是hash值
    routes: [
        ...login,
        ...main,
        {
            path: '/test',
            name: 'test',
            component: Test,
            meta: {
                title: 'test 页面',
                requireAuth: false
            }
        },
    ]
})


router.beforeEach((to, from, next) => {
    if(to.meta) {
        document.title = to.meta.title;
    }
    if(to.meta.requireAuth) {
        //为了避免 'false' 也进入if条件
        if(tools.getCookie('isLogin') === 'true') {
            next();
        }else {
            next({path: '/login'});
        }
    }else {
        next();
    }
})
export default router;