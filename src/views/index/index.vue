<template>
    <div class='index'>
        <div class="index-header">
            <p class="header-left">欢迎您， <span class="username">沙地和掉</span></p>
            <div class="header-right" >
                <i class="el-icon-switch-button"></i>
                注销
            </div>
        </div>
        <div>{{LocationCity}}</div>
        <button @click="getCity">点击获取城市</button>
    </div>
</template>

<script>
import BMap from 'BMap';
export default {
    name:'index',
    data() {
        return {
            LocationCity: '正在定位',
            options: {
                color: ['#f44'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {
                        type : 'shadow'
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'每月花费',
                        type:'bar',
                        barWidth: '60%',
                        data:[995,666,444,858,654,236,645,546,846,225,547,356]
                    }
                ]
            },
        };
    },
    methods: {
        getCity() {
            const geolocation = new BMap.Geolocation();
            var _this = this
            geolocation.getCurrentPosition(function getinfo(position){
                let city = position.address.city;             //获取城市信息
                let province = position.address.province;    //获取省份信息
                _this.LocationCity = city
                console.log(position);
            }, function(e) {
                _this.LocationCity = "定位失败"
            }, {provider: 'baidu'});
        }
    },
    created() {
    
    },
}
</script>

<style lang='scss'>
.index {
    .index-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 50px;
        height: 50px;
        background-color: #fff;
        .header-left {
            font-size: 16px;
            span.username {
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
}
</style>