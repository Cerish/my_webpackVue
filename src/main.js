import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import axios from 'axios';
// Vue.prototype.$axios = axios;

import tools from './tools/index';
Vue.prototype.$tools = tools;

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');