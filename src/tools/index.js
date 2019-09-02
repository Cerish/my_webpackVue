import axios from './http.js';

import login from './login.js'

export default {
    //api访问封装
    ajax(uri, type, params) {
        if(type === 'get' && params) {
            if(uri.indexOf('?') === -1) {
                uri = uri + '?'
            } else if(uri.lastIndexOf('&') !== uri.length -1) {
                uri = uri + '&'
            }
            for(let k in params) {
                uri = uri + k + '=' + window.encodeURIComponent(params[k]) + '&';
            }
        }
        return axios[type](uri, params)
    },
    //数据深度复制
    deepCopy(obj) {
        let result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key]!==null) {
                    result[key] = this.deepCopy(obj[key]);   //递归复制
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    },
    // 设置cookie与存回时间
    setCookie(name, value, time) {
        var date = new Date();
        date.setTime(date.getTime() + time);
        document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
    },
    // 获取对应 name 的cookie值
    getCookie(name) {
        let arrCookie = document.cookie.split('; ');
        let result = arrCookie.find(item => {
            return item.split('=')[0] == name;
        })
        return result && result.split('=')[1];
    },
    ...login


    //数据对比
    // diff(before=[], after=[]) {
    //     let diff = require('array-diff')({unique: true, compress: true})
    //     let result = diff(before, after)
    //     let origin_arr = [...before]
    //     let new_arr = [...after]
    //     result.forEach( item => {
    //         if(item[0] == '-' || item[0] == 'x') {
    //             let index = origin_arr.indexOf(item[1][0])
    //             for(let i = 0,length = item[1].length; i < length; i++) {
    //             new_arr.splice(index, 0, '')
    //             }
    //         } else if (item[0] == '+' || item[0] == 'p') {
    //             let index = new_arr.indexOf(item[1][0])
    //             for(let i = 0,length = item[1].length; i < length; i++) {
    //             origin_arr.splice(index, 0, '')
    //             }
    //         }
    //     })
    //     return {origin_arr, new_arr}
    // },
    
}