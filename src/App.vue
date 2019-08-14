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
        // 配置页面刷新或者串口关闭时，将登陆的状态（cookie）的有效时间延续为接下来的24小时
        window.addEventListener('beforeunload', this.$tools.setCookie('isLogin', 'true', 1000 * 60 * 60 * 24));
    },
    destroyed() {
        window.addEventListener('beforeunload', this.$tools.setCookie('isLogin', 'true', 1000 * 60 * 60 * 24));
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
</style>
