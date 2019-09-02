<template>
    <div class="container">
        <div class="echarts-map" ref="echartsMap"></div>
        <button
            v-if="mapLevel != 1"
            @click="backPrevLevel(mapType, mapLevel)"
            class="backPrevLevel">
            <i class="iconfont icon-arrow-go-back-line"></i> 返回上一级
        </button>
    </div>
</template>

<script>
import Echarts from 'echarts';
import '../../../node_modules/echarts/map/js/china.js';
import CityMap from "@/assets/map/city-map";
import provinceMap from "@/assets/map/province-map";

export default {
    name: 'echarts-map',
    props: {
        option: {
            type: Object,
            default: () => {
                return {}
            }
        },
        resize: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            myChart: null,
            mapType: 'china',
            mapLevel: 1,
        }
    },
    methods: {
        setECharts() {
            this.myChart = Echarts.init(this.$refs.echartsMap);
            let option = this.option;
            this.myChart.setOption(option);
            if(this.resize) {
                window.addEventListener('resize', () => this.myChart.resize());
            }
            this.myChart.on('click', this.provinceClick);
        },
        // 省级点击进入市级事件
        async provinceClick(params, place) {
            if(place) {
                var name = place;
            } else {
                this.mapType = params.name;
                var name = params.name;
            }
            // 南海诸岛没有下钻的省市区
            if(name == '南海诸岛') return;
            this.mapLevel = 2;
            this.myChart.showLoading();
            let provinceName = provinceMap[name];
            // let mapJson = await this.$tools.ajax(
                //     `https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/province/${provinceName}.json`,
            //     'get'
            // );
            let mapJson = require(`@/assets/map/province/${provinceName}.json`);
            Echarts.registerMap(provinceName, mapJson);
            this.option.series[0].mapType = provinceName;
            this.myChart.setOption(this.option);
            this.myChart.off("click", this.provinceClick);
            // 香港 澳门
            this.myChart.hideLoading();
            if(name === '香港' || name === '澳门') {
                return;
            }
            this.myChart.on("click", this.cityClick);
        },
        // 城市点击进入区级事件
        async cityClick(params) {
            let name = params.name;
            // 一些市级没有下一级的区县
            // 新疆省
            if(name === '北屯市' || name === '阿拉尔市' || name === '图木舒克市') {
                return;
            }

            this.mapLevel = 3;
            this.myChart.showLoading();
            let cityName = CityMap[name];
            // let mapJson = await this.$tools.ajax(
            //     `https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/citys/${cityName}.json`,
            //     'get'
            // );
            let mapJson = require(`@/assets/map/citys/${cityName}.json`);
            Echarts.registerMap(cityName, mapJson);
            this.option.series[0].mapType = cityName;
            this.myChart.setOption(this.option);
            this.myChart.off("click", this.cityClick);
            this.myChart.hideLoading();
        },
        backPrevLevel(place, level) {
            if(level === 2) {
                this.mapLevel = 1;
                this.option.series[0].mapType = 'china';
                this.myChart.setOption(this.option);
                this.myChart.off("click", this.cityClick);
                this.myChart.on('click', this.provinceClick);
            }else if(level === 3) {
                this.provinceClick(null, this.mapType);
            }
        }
    },
    mounted() {
        this.setECharts();
    }
}
</script>

<style lang="scss">
.container{
    height: 100%;
    .echarts-map {
        height: 100%;
    }
    .backPrevLevel {
        position: absolute;
        left: 10px;
        top: 20px;
    }
}
</style>
