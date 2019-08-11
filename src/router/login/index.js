const login = () => import(/* webpackChunkName: "Login" */ '../../views/login/Login.vue');
const register = () => import(/* webpackChunkName: "Login" */ '../../views/login/register.vue');
const forget = () => import(/* webpackChunkName: "Login" */ '../../views/login/forget.vue');

let logins = [
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录页面'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
            title: '注册页面'
        }
    },
    {
        path: '/forget',
        name: 'forget',
        component: forget,
        meta: {
            title: '找回密码'
        }
    },
]

export default logins;