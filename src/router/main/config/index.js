const Index = () => import(/* webpackChunkName: "Index" */ '@/views/index/index.vue');


let mainView = [
    {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
            title: '主页面',
            requireAuth: true,
            menuName: '地理图'
        }
    },
    {
        path: '/1',
        name: 'Index',
        component: Index,
        meta: {
            title: '主页面',
            requireAuth: true,
            menuName: '主页面1'
        },
    },
];
export default mainView;