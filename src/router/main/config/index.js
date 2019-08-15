const Index = () => import(/* webpackChunkName: "Index" */ '@/views/index/index.vue');


let mainView = [
    {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
            title: '主页面',
            requireAuth: true
        },
    }
];
export default mainView;