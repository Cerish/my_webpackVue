import axios from 'axios';

//设置访问超时时间
axios.defaults.timeout = 5000;

//设置访问地址，不设置或者不是绝对地址（可访问的http），则将默认为当前域名地址
// axios.defaults.baseURL = 'https://api.github.com:443';

// http request拦截器
axios.interceptors.request.use(
    config => {
        if(window.localStorage.getItem('token')) {
            config.headers.Authorization = `token ${window.localStorage.getItem('token')}`;
        }
        return config;
    },
    err => {
        console.log('request err', err);
        return Promise.reject(err);
    }
)

// http response拦截器
axios.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if(error.response) {
            console.log('response error', error);
        }
        return Promise.reject(error);
    }
)

export default axios;