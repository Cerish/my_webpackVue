export default {
    //判断用户登录是否正确
    isCorrect(name, pwd) {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        if(!userInfo) {
            return false;
        }
        let user = userInfo.find(item => {
            if(item.username == name) {
                return item.password == pwd;
            }
            return false;
        })
        if(user) {
            return true;
        }
        return false;
    },

    //判断该用户名是否存在
    isExist(name) {
        let userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        if(!userInfo) {
            return false;
        }
        return userInfo.find(item => {
            return item.username == name;
        });
    }
}