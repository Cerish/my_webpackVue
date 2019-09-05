const Chart = () => import(/* webpackChunkName: "chart" */ '@/views/chart/index.vue');
const chinaMap = () => import(/* webpackChunkName: "echartsMap" */ '@/views/chart/chinaMap.vue');
const temperature = () => import(/* webpackChunkName: "temperature" */ '@/views/chart/temperature.vue');


let charts = [
    {
        path: '/chart',
        name: 'Chart',
        component: Chart,
        show: true,
        redirect: '/chart/map',
        meta: {
            title: '图表页面',
            requireAuth: true,
            menuName: '图表页面'
        },
        children: [
            {
                path: '/chart/map',
                name: 'chinaMap',
                component: chinaMap,
                show: true,
                meta: {
                    title: '图表页面-中国地理图',
                    requireAuth: true,
                    menuName: '中国地理图'
                }
            },
            {
                path: '/chart/temperature',
                name: 'temperature',
                component: temperature,
                show: true,
                meta: {
                    title: '图表页面-气温变化图',
                    requireAuth: true,
                    menuName: '气温变化图'
                }
            }
        ]
    },
]
export default charts;