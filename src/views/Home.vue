<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import bus from '../test';
export default {
    name: 'Home',
    computed: {
        ...mapState({
            counter: 'counter'
        })
    },
    data() {
        return {
            num: -1,
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
            }
        }
    },
    created() {
        bus.$on('add', data => {
            console.log(data);
            this.num = data;
        })
    }
}
</script>

<style lang="scss">
.echarts {
    height: 500px;
}
</style>
