<template>
    <div class="login">
        <div class="form">
            <p class="title">您好，请先登录</p>
            <el-form :model="form" :rules="rules">
                <el-form-item class="redSign" label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item class="redSign" label="密码" prop="password">
                    <el-input
                    v-model="form.password"
                    type="password"
                    placeholder="请输入密码"
                    @keyup.enter.native="onSubmit"></el-input>
                </el-form-item>
                <el-form-item size="large" class="submit">
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    <div class="forget" >
                        <router-link :to="{path: '/forget'}">
                            忘记密码？
                        </router-link>
                    </div>
                </el-form-item>
            </el-form>
            <div class="login-register">
                <router-link :to="{path: '/register'}">没有账号？ 去注册一个吧</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { isContext } from 'vm';
export default {
    name:  'login',
    components: {
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur'},
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur'}
                ]
            },
        }
    },
    methods: {
        onSubmit() {
            let username = this.form.username;
            let password = this.form.password;
            if(!username || !password) {
                return ;
            }
            let isCorrect = this.$tools.isCorrect(username, password);
            console.log(isCorrect);
            if(!isCorrect) {
                this.message('用户名或密码错误', 'warning', true);
                return;
            }
            this.$router.push({path: '/'});
        },
    },
    created() {
    }
}
</script>

<style lang="scss">
.login {
    height: calc(100vh);
    background: url(../../assets/img/gate.jpg) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 100px 100px 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    .form{
        width: 360px;
        background-color: #fff;
        opacity: 0.9;
        box-sizing: border-box;
        padding: 50px 50px 35px;
        p.title {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
        }
        .el-form-item {
            display: flex;
            justify-content: space-between;
            line-height: 40px;
            margin-bottom: 10px;
        }
        label {
            font-size: 16px;
            font-weight: 600;
            flex: 3;
            text-align: center;
            &::before {
                display: none;
            }
        }
        .el-form-item__content {
            flex: 7;
            position: relative;
            .el-input__inner {
                font-size: 14px;
                height: 25px;
                border-radius: 5px;
                background-color: #fff;
            }
            .el-form-item__error {
                position: absolute;
                top: 30px;
                left: 0;
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                color: red;
            }
        }
        .submit .el-form-item__content {
            text-align: right;
            .el-button {
                margin-right: 20px;
                padding: 5px 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-weight: 600;
            }
            .forget {
                display: inline-flex;
                cursor: pointer;
                a {
                    text-decoration: none;
                    color: #333;
                }
            }
        }
        .login-register {
            text-align: center;
            font-size: 12px;
            a {
                color: #999;
                cursor: pointer;
                text-decoration: none;
                border-bottom: 2px solid #ccc;
                &:hover {
                    color: #409EFF;
                    border-bottom-color: #409EFF;
                }
            }
        }
    }
    // 必填项 * 样式
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
