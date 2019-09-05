<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
        }
    },
    mounted() {
        // 配置页面刷新或者窗口关闭时，若登录状态存在（cookie），将其有效时间延续为接下来的24小时
        window.addEventListener('beforeunload', function() {
            if(this.$tools.getCookie('isLogin')) {
                this.$tools.setCookie('isLogin', 'true', 1000 * 60 * 60 * 24)
            }
        });
    },
    destroyed() {
        window.removeEventListener('beforeunload', function() {
            if(this.$tools.getCookie('isLogin')) {
                this.$tools.setCookie('isLogin', 'true', 1000 * 60 * 60 * 24)
            }
        });
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 14px;
}
ul {
    margin: 0;
    padding: 0;
    li {
        list-style: none;
    }
}
</style>
