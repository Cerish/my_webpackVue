<template>
    <div class="echarts-map">
        <echarts-map :option="mapOption" resize></echarts-map>
    </div>
</template>

<script>

export default {
    name:'chinaMap',
    data() {
        return {
            mapOption: {
                title: {
                    text: "全国省市区三级下钻地理图",
                    left: 'center',
                    top: '20px'
                },
                dataRange: {
                    show: true,
                    min: 0,
                    max: 1000,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    color: ['orangered', 'yellow', 'lightskyblue']
                },
                series: [
                    {
                        type: "map",
                        mapType: "china",
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        // 是否可以缩放
                        roam: false,
                        data: [{
                            "name": "北京",
                            "value": 599
                        }, {
                            "name": "上海",
                            "value": 142
                        }, {
                            "name": "黑龙江",
                            "value": 44
                        }, {
                            "name": "深圳市",
                            "value": 92
                        }, {
                            "name": "湖北",
                            "value": 810
                        }, {
                            "name": "四川",
                            "value": 453
                        }, {
                            "name": "汕头市",
                            "value": 453
                        }]
                    }
                ]
            }
        };
    },
    methods: {
    },
    created() {
    },
    mounted() {
    }
}
</script>

<style lang='scss'>
.echarts-map{
    position: relative;
    width: 100%;
    height: 100%;
}
</style>