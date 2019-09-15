<template>
    <div class="container">
        <div class="echarts-map" ref="echartsMap"></div>
        <div class="selection">
            <h3 class="selection-title">行政区域查询</h3>
            <div class="provinceSelect inline-flex">
                <div class="description">
                    <span>省市区</span>
                </div>
                <el-select v-model="provinceValue" placeholder="请选择">
                    <el-option
                        v-for="item in provinceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="citySelect inline-flex">
                <div class="description">
                    <span>地级市</span>
                </div>
                <el-select v-model="cityValue" placeholder="">
                    <el-option
                        v-for="item in cityOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="districtSelect inline-flex">
                <div class="description">
                    <span>区县</span>
                </div>
                <el-select v-model="districtValue" placeholder="">
                    <el-option
                        v-for="item in districtOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <button
            v-if="mapLevel != 1"
            @click="backPrevLevel(mapLevel)"
            class="backPrevLevel">
            <i class="iconfont icon-arrow-go-back-line"></i> 返回上一级
        </button>
    </div>
</template>

<script>
import Echarts from 'echarts';

// 引入地图的json文件名称
// import '../../../node_modules/echarts/map/js/china.js';
import CityMap from "@/assets/map/city-map.js";
import provinceMap from "@/assets/map/province-map.js";

// 引入三级行政地区
import district from "@/assets/district/all_district.js";

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
    watch: {
        provinceValue: {
            handler(newValue) {
                if(newValue) {
                    this.cityOptions = [{value: '', label: '-- 请选择 --'}];
                    this.cityValue = '';
                    this.getcityOptions(newValue);
                    this.provinceClick(null, newValue);
                } else {
                    this.cityOptions = [];
                    this.cityValue = '';
                }
            }
        },
        cityValue: {
            handler(newValue) {
                if(newValue) {
                    this.districtOptions = [{value: '', label: '-- 请选择 --'}];
                    this.districtValue = '';
                    this.getdistrictOptions(newValue);
                    this.cityClick(null, newValue);
                }else {
                    this.districtOptions = [];
                    this.districtValue = '';
                }
            }
        },
        districtValue: {
            handler(newValue) {
                if(newValue) {
                    this.countyClick(null, newValue);
                }
            }
        }
    },
    data() {
        return {
            myChart: null,
            prevProvinceName: '',
            prevCityName: '',
            mapLevel: 1,
            provinceOptions: [
                {
                    value: '',
                    label: '-- 请选择 --'
                }
            ],
            provinceValue: '',
            cityOptions: [],
            cityValue: '',
            districtOptions: [],
            districtValue: '',
            nowCityInfo: [],
            countyMapJson: {}
        }
    },
    methods: {
        setECharts() {
            this.myChart = Echarts.init(this.$refs.echartsMap);
            let mapJson = require(`@/assets/map/china.json`);
            Echarts.registerMap('china', mapJson);
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
                var name = params.name;
            }
            // 南海诸岛没有下钻的省市区
            if(name == '南海诸岛') return;
            this.mapLevel = 2;
            this.provinceValue = name;
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
            this.myChart.hideLoading();
            // 香港 澳门
            // 北京 天津 上海 重庆
            if( name === '香港' || name === '澳门' ||
                name === '北京市' || name === '天津市'
                || name == '上海市' || name == '重庆市'){
                this.countyMapJson = this.$tools.deepCopy(mapJson);
                this.cityValue = name;
                this.myChart.on("click", this.countyClick);
                return;
            }
            this.myChart.on("click", this.cityClick);
        },
        // 城市点击进入区级事件
        async cityClick(params, cityDistrict) {
            if(cityDistrict) {
                var name = cityDistrict;
            }else {
                var name = params.name;
            }
            // 一些市级没有下一级的区县
            // 新疆省
            if(name === '北屯市' || name === '阿拉尔市' || name === '图木舒克市') {
                return;
            };

            this.mapLevel = 3;
            this.cityValue = name;
            this.myChart.showLoading();
            let cityName = CityMap[name];
            // let mapJson = await this.$tools.ajax(
            //     `https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/citys/${cityName}.json`,
            //     'get'
            // );
            let mapJson = require(`@/assets/map/citys/${cityName}.json`);
            
            let arr = mapJson.features.map(item => {
                return item.properties.name
            })
            // 存储当前城市的json数据
            this.countyMapJson = this.$tools.deepCopy(mapJson);

            Echarts.registerMap(cityName, mapJson);
            this.option.series[0].mapType = cityName;
            this.myChart.setOption(this.option);
            this.myChart.off("click", this.cityClick);
            this.myChart.hideLoading();
            this.myChart.on("click", this.countyClick);
        },
        countyClick(params, countyDistrict) {
            if(countyDistrict) {
                var countyName = countyDistrict;
            } else {
                var countyName = params.name;
            }
            this.districtValue = countyName;
            this.mapLevel = 4;
            let countyIndex = -1;
            // 复制区级地图
            let copyCountyMapJson = this.$tools.deepCopy(this.countyMapJson);
            let countyInfo = copyCountyMapJson.features.find((item, index) => {
                if(item.properties.name == countyName) {
                    countyIndex = index;
                    return true;
                }
                return false;
            });
            copyCountyMapJson.features = [copyCountyMapJson.features[countyIndex]];
            Echarts.registerMap(countyName, copyCountyMapJson);
            this.option.series[0].mapType = countyName;
            this.myChart.setOption(this.option);
            this.myChart.off("click", this.countyClick);
        },
        // 返回上一级事件
        backPrevLevel(level) {
            if(level === 2) {
                this.mapLevel = 1;
                // 返回到中国地图的时候，当前省级名称为空
                this.provinceValue = '';
                this.option.series[0].mapType = 'china';
                this.myChart.setOption(this.option);
                this.myChart.off("click", this.cityClick);
                this.myChart.on('click', this.provinceClick);
                if(this.cityValue === '北京市' || this.cityValue === '天津市'
                    || this.cityValue == '上海市' || this.cityValue == '重庆市') {
                    this.myChart.off('click', this.countyClick);
                    return;
                }
            }else if(level === 3) {
                this.provinceClick(null, this.provinceValue);
                this.cityValue = '';
                this.myChart.on('click', this.cityClick);
                this.myChart.off('click', this.countyClick);
            } else if(level === 4) {
                this.districtValue = '';
                if(this.cityValue === '北京市' || this.cityValue === '天津市'
                    || this.cityValue == '上海市' || this.cityValue == '重庆市') {
                    this.provinceClick(null, this.cityValue);
                    return;
                }
                this.myChart.on('click', this.countyClick);
                this.cityClick(null, this.cityValue);
            }
        },
        // 进入页面获取省级列表
        getprovinceOptions() {
            let provinceList = district.map(item => {
                return {value: item.name,name: item.name}
            });
            this.provinceOptions.push(...provinceList);
        },
        // 根据省级列表的变化获取不同的市级列表
        getcityOptions(provinceName) {
            let cityInfo = district.find(item => {
                return item.name == provinceName;
            });
            // 复制当前省份信息
            this.nowCityInfo = this.$tools.deepCopy(cityInfo.children);
            let cityList = cityInfo.children.map(item => {
                return {value: item.name,name: item.name}
            });
            this.cityOptions.push(...cityList);
        },
        // 根据市级列表的变化获取不同的区级列表
        getdistrictOptions(cityName) {
            let districtInfo = this.nowCityInfo.find(item => {
                return item.name == cityName;
            });
            let districtList = districtInfo.children.map(item => {
                return {value: item.name,name: item.name}
            });
            this.districtOptions.push(...districtList);
        }
    },
    mounted() {
        this.setECharts();
        this.getprovinceOptions();
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
        right: 50px;
        top: 20px;
    }
    .selection {
        width: 250px;
        height: 180px;
        padding: 20px;
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 0;
        &-title {
            padding: 0;
        }
        .inline-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        div.description {
            width: 100px;
            height: 40px;
            padding: 0 5px;
            box-sizing: border-box;
            background-color: #eee;
            text-align-last: justify;
            line-height: 40px;
            border: 1px solid #ccc;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            
        }
        .el-select {
            .el-input__suffix {
                display: none;
            }
            .el-input__inner {
                border-radius: 0;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                border: 1px solid #ccc;
            }
        }
    }
}
</style>
