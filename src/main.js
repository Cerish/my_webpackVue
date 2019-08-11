import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import tools from './tools/index';
Vue.prototype.$tools = tools;

import message from './tools/message';
Vue.prototype.message = message;

import ECharts from '@/components/ECharts.vue';
Vue.component('echarts', ECharts);


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');