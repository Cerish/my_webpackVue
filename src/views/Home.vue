<template>
    <div class="home">
        <div class="home-header">
            <div class="header-left">
                欢迎您， <span class="username">{{username}}</span>
                您所在的位置是： <span class="location">{{Location}}</span>
            </div>
            <div class="header-right" @click="logout">
                <i class="iconfont icon-zhuxiao"></i>
                注销
            </div>
        </div>
        <div class="home-main">
            <primaryNav />
            <div class="main-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import primaryNav from '@/components/primaryNav.vue'
export default {
    name: 'Home',
    components: {
        primaryNav
    },
    computed: {
        defaultOpeneds() {
            return [`/${this.$route.path.split('/')[1]}`];
        }
    },
    data() {
        return {
            username: window.localStorage.nowLogin,
            Location: '正在定位',
        }
    },
    methods: {
        logout() {
            window.localStorage.removeItem('nowLogin');
            this.$tools.setCookie('isLogin', 'true', -1);
            this.$router.push({path: '/login'});
        },
        getCity() {
            let that = this;
            const geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(
                // 获取定位成功的回调函数
                function getPoint(res){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS) {
                        let point = new BMap.Point(res.point.lng,res.point.lat);
                        let geocoder = new BMap.Geocoder();
                        geocoder.getLocation(point, (res) => {
                            let info = res.addressComponents;
                            that.address = res.address;
                            that.Location = `${info.province}${info.city}${info.district}`
                        })
                    }
                },
                // 获取定位失败的回调函数
                function getPointErr(err) {
                    // 获取定位失败
                    console.log(err);
                },
                {
                    enableHighAccuracy: true,
                    SDKLocation: true,
                }
            );
        },
        test(path) {
            this.$router.push({path: path});
        }
    },
    created() {
    },
    mounted() {
        this.getCity();
    }
}
</script>

<style lang="scss">
.home {
    background-color: #fff;
    position: relative;
    overflow: hidden;
    .home-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        height: 50px;
        background-color: #eee;
        .header-left {
            font-size: 16px;
            span.username, span.location~ {
                font-weight: 600;
            }
        }
        .header-right {
            font-size: 16px;
            cursor: pointer;
            .el-icon-switch-button {
                font-size: 18px;
                margin-right: 5px;
            }
        }
    }
    .home-main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 50px);
        .main-left {
            background-color: red;
            width: 200px;
            height: 100%;
        }
        .main-right {
            margin-left: 20px;
            flex: 1;
            height: 100%;
        }
    }
}
</style>
