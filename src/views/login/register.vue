<template>
    <div class="register">
        <div class="register-form">
            <p class="title">请先注册</p>
            <el-form :model="register" :rules="rules">
                <el-form-item class="redSign" label="用户名" prop="username">
                    <el-input maxlength="10" v-model="register.username" placeholder="用户名最长为10个字符"></el-input>
                </el-form-item>
                <el-form-item class="redSign" label="密码" prop="password">
                    <el-input
                        :class="strengthColor"
                        v-model="register.password"
                        type="password" placeholder="请输入密码（8-16位）"
                        @blur="onPwdBlur(register.password)"
                        @focus="onPwdFocus(register.password)"></el-input>
                    <div class="strength-type"></div>
                </el-form-item>
                <el-form-item class="redSign" label="确认密码" prop="confirmPassword">
                    <el-input
                        v-model="register.confirmPassword"
                        type="password"
                        @blur="onConfirmPwdBlur(register.confirmPassword)"
                        placeholder="请再次输入密码（8-16位）"
                        @keyup.enter.native="onRegister"></el-input>
                        <div class="strength-type"></div>
                </el-form-item>
                <el-form-item size="large" class="submit">
                    <el-button type="primary" @click="onRegister">点击注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// import {validatePwd} from './validator.js'
export default {
    name: 'register',
    data() {
        return {
            strengthColor: '',
            register: {
                username: '',
                password: '',
                confirmPassword: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min:8, max: 16, message: '密码应在8-16个字符之间', trigger: 'blur'}
                ],
                confirmPassword: [
                    {required: true, message: '请再次输入密码', trigger: 'blur'}
                ],
            }
        }
    },
    watch: {
        'register.password': {
            handler(value) {
                this.setType(value);
            }
        }
    },
    methods: {
        //设置密码框右侧精灵图盒子的样式
        setObjStyle(obj, styles) {
            for(let key in styles) {
                obj.style[key] = styles[key]
            }
        },
        //根据密码的强度类型，设置不同的position
        setType(value) {
            let type = this.check(value)
            let obj = document.querySelector('.strength-type')

            if(!type) {
                this.strengthColor = 'origin'
                this.setObjStyle(obj, {backgroundPosition: '-15px -72px'})
                // obj.style.backgroundPosition = '-15px -72px'
            } else {
                if(type == 'weak') {
                    this.strengthColor = 'weak'
                    this.setObjStyle(obj, {backgroundPosition: '0 118px'})
                }else if (type == 'strong') {
                    this.strengthColor = 'strong'
                    this.setObjStyle(obj, {backgroundPosition: '-32px 118px'})
                } else {
                    this.strengthColor = 'middle'
                    this.setObjStyle(obj, {backgroundPosition: '-16px 118px'})
                }
            }
        },
        //判断密码的强度类型
        check(value) {
            if(!value || value.length < 8 || value.length > 16) return false;
            let regNum = /^\d+$/;  //纯数字
            let regLetter = /^[a-zA-Z]+$/  //纯字母
            let regSpe = /^[!@#%^&_]+$/;  //特殊字符
            //包含数字、字母、 特殊字符
            let _regNum = /\d+/;  
            let _regLetter = /[a-zA-Z]+/
            let _regSpe = /[!@#%^&_]+/;
            if(regNum.test(value) || regLetter.test(value) || regSpe.test(value)){ //弱
                return 'weak'
            }else if(_regNum.test(value) && _regLetter.test(value) && _regSpe.test(value)){ //强
                return 'strong'
            }else{ //中
                return 'middle'
            }
        },
        onPwdBlur(value) {
            if(this.check(value)) {
                this.strengthColor = 'origin'
                let obj = document.querySelector('.strength-type')
                this.setObjStyle(obj, {backgroundPosition: '0 -72px'})
            }
        },
        onPwdFocus(value) {
            this.setType(value)
        },
        onConfirmPwdBlur(value) {
            let obj = document.querySelectorAll('.strength-type')[1]
            if(value != this.register.password) {
                this.setObjStyle(obj, {backgroundPosition: '-15px -72px'})
                return;
            }
            this.setObjStyle(obj, {backgroundPosition: '0'})
        },
        registerCheck() {
            if(!this.register.username) {
                this.message('请输入用户名','warning',true)
                return false;
            }
            if(!this.check(this.register.password)) {
                this.message('请正确输入密码', 'warning',true)
                return false;
            }
            if(this.register.password != this.register.confirmPassword) {
                this.message('两次密码不相同','warning', true)
                return false;
            }
            return true;
        },
        onRegister() {
            if(!this.registerCheck()) return;
            let isHasUsername = this.$tools.isExist(this.register.username);
            if(isHasUsername) {
                this.message(`用户 ${this.register.username} 已存在`);
                return;
            }
            let userInfo = {
                username: this.register.username,
                password: this.register.password
            }
            let arr_userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || [];
            arr_userInfo.push(userInfo);
            window.localStorage.setItem('userInfo', JSON.stringify(arr_userInfo));
            this.message( '注册成功','success');
            this.$router.push('./login');
        }
    },
    created() {
    }
}
</script>

<style lang="scss">
.register {
    display: flex;
    justify-content: center;
    padding-top: 100px;
    p.title {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
    }
    .register-form {
        background-color: #eee;
        border-radius: 20px;
        width: 500px;
        .el-form {
            padding: 0 50px;
            .el-form-item {
                display: flex;
                .el-form-item__label {
                    width: 100px;
                    text-align: center;
                    padding: 0;
                    &::before {
                        display: none;
                    }
                }
            }
            .el-form-item__content {
                flex: 1;
                position: relative;
                //背景颜色 
                .origin .el-input__inner {
                    background-color: #fff;
                }
                .weak .el-input__inner{
                    background-color: #FF5D53;
                }
                .middle .el-input__inner{
                    background-color: #FFA853;
                }
                .strong .el-input__inner{
                    background-color: #6DB76D;
                }
                .el-input__inner {
                    padding-right: 50px;
                }
                .strength-type {
                    width: 15px;
                    height: 31px;
                    background-image: url(../../assets/img/icons-ico.png);
                    background-position: 0;
                    position: absolute;
                    top: 4px;
                    right: 10px;
                }
            }
            .el-form-item__content {
                text-align: center;;
            }
        }
    }
    .redSign label{
        position: relative;
        &::after {
            content: '*';
            position: relative;
            top: 0;
            right: -4px;
            color: red;
        }
    }
}
</style>
