<template>
    <div id="echarts"></div>
</template>

<script>
import echarts from 'echarts'
export default {
    name: 'Echarts',
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
    methods: {
        setECharts() {
            let myChart = echarts.init(document.getElementById('echarts'));
            let option = this.option;
            myChart.setOption(option);
            if(this.resize) {
                window.addEventListener('resize', () => myChart.resize());
            }
        }
    },
    mounted() {
        this.setECharts();
    }
}
</script>

<style>
#echarts{
  width: 100%;
  height: 100%;
}
</style>
