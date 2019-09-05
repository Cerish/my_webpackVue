const Diff = () => import(/* webpackChunkName: "Diff" */ '@/views/diff/index.vue');
const dataList = () => import(/* webpackChunkName: "dataList" */ '@/views/diff/dataList.vue');
const arrDiff = () => import(/* webpackChunkName: "dataList" */ '@/views/diff/arrDiff.vue');

let diff = [
    {
        path: '/diff',
        name: 'Diff',
        component: Diff,
        redirect: '/diff/dataList',
        show: true,
        meta: {
            title: '对比页面',
            requireAuth: true,
            menuName: '对比页面'
        },
        children: [
            {
                path: '/diff/dataList',
                name: 'dataList',
                component: dataList,
                show: true,
                meta: {
                    title: '数据列表',
                    requireAuth: true,
                    menuName: '数据列表'
                }
            },
            {
                path: '/diff/arrDiff',
                name: 'arrDiff',
                component: arrDiff,
                show: true,
                meta: {
                    title: '数据对比',
                    requireAuth: true,
                    menuName: '数据对比'
                }
            }
        ]
    }
]

export default diff;