import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

// 引入 iconfont
// import './assets/iconfont/iconfont.css';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import tools from './tools/index';
Vue.prototype.$tools = tools;

import message from './tools/message';
Vue.prototype.message = message;

// echarts 地图 类型
import EChartsMap from '@/components/ECharts/echarts-map';
Vue.component('echarts-map', EChartsMap);

// echarts 图标类型
import ECharts from '@/components/ECharts/echarts';
Vue.component('echarts', ECharts);


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');