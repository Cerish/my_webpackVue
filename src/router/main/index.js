const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue');

import mainView from './config/index';
let main = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/chart',
        meta: {
            title: 'Home页面',
            requireAuth: true
        },
        children: [
            ...mainView
        ]
    },
]
export default main;