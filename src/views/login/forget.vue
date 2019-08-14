<template>
    <div class="forget">
        <div class="forget-form">
            <p class="title">欢迎来此找回密码</p>
            <el-form :model="forget" :rules="rules">
                <el-form-item class="redSign" prop="username" label="用户名">
                    <el-input v-model="forget.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item class="redSign count" label="输入正确的值" prop="code">
                    <div class="expression">{{num1}} + {{num2}} =</div>
                    <el-input class="calculated "
                        v-model="forget.code"
                        placeholder="请输入答案"
                        @keyup.enter.native="findPwd"></el-input>
                </el-form-item>
                <el-form-item class="find-pwd">
                    <el-button @click="findPwd">找回密码</el-button>
                </el-form-item>
            </el-form>
            <div class="forgetPwd" v-if="pwdShow">
                <span class="name">{{forget.username}}</span>
                ,您好！您的密码是
                <span class="pwd">{{forgetPwd}}</span>
                <br />
                <router-link :to="{path: '/login'}">返回登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'forget',
    data() {
        return {
            num1: 0,
            num2: 0,
            pwdShow: false,
            forgetPwd: '',
            forget: {
                username: '',
                code: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                code: [
                    {required: true, message: '请输入计算后的值', trigger: 'blur'}
                ]
            },
        }
    },
    methods: {
        randomNum() {
            //parseInt()第二个传进去的是n进制
             this.num1 = parseInt(Math.random()*1000+1, 10)
             this.num2 = parseInt(Math.random()*1000+1, 10)
        },
        findPwd() {
            if(!this.forget.username) {
                this.message('请输入用户名','warning', true);
                return;
            }
            if(!this.forget.code) {
                this.message('请输入计算值','warning', true);
                return;
            } else {
                let total = this.num1 + this.num2;
                if(this.forget.code != total) {
                    this.message('请输入正确的计算值', 'warning', true);
                    this.randomNum();
                    return;
                }
            }
            let isHasUsername = this.$tools.isExist(this.forget.username)
            if(!isHasUsername) {
                this.message('该用户名不存在','warning', true);
                this.randomNum();
                this.forget.code = ''
                return;
            }
            //验证完毕 显示用户名所对应的密码
            this.pwdShow = true;
            this.forgetPwd = isHasUsername.password;
        },
    },
    created() {
        this.randomNum()
    }
}
</script>

<style lang="scss">
.forget {
    display: flex;
    justify-content: center;
    .forget-form {
        margin-top: 100px;
        width: 500px;
        background-color: #eee;
        p.title {
            font-size: 16px;
            font-weight: 600;
            text-align: center;
        }
        .el-form-item {
            display: flex;
            .el-form-item__label {
                width: 120px;
                text-align: center;
                &::before {
                    display: none;
                }
            }
        }
        .el-form-item__content {
            flex: 1;
            margin-right: 20px;
            display: flex;
            .expression {
                display: inline-flex;
                width: 120px;
                font-weight: 600;
                color: #333;
            }
            .calculated  {
                margin-left: 20px;
            }
        }
        .find-pwd .el-form-item__content {
            justify-content: center;
            .el-button {
                border-radius: 10px;
                color: #fff;
                background-color: #409EFF;
            }
        }
        .count .el-form-item__error {
            left: 105px;
        }
        div.forgetPwd {
            text-align: center;
            font-size: 16px;
            padding-bottom: 5px;
            span.name, span.pwd {
                font-weight: 600;
            }
            a {
                text-decoration: none;
                color: #666;
                border-bottom: 1px solid #666;
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
