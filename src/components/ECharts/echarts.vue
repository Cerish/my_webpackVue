<template>
    <div class="echarts" ref="echarts">
    </div>
</template>

<script>
import Echarts from 'echarts';
export default {
    name: 'ECharts',
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
            myChart: null
        }
    },
    created() {
    },
    mounted() {
        this.setECharts()
    },
    methods: {
        setECharts() {
            this.myChart = Echarts.init(this.$refs.echarts);
            let option = this.option;
            this.myChart.setOption(option);
 
            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            if(this.resize) {
                window.addEventListener('resize', () => this.myChart.resize());
            }
        }
    },
    watch: {
        option: {
            handler(newValue) {
                this.myChart.setOption(newValue);
            },
            deep: true
        }
    }
}
</script>

<style lang="scss">
.echarts{
  width: 100%;
  height: 100%;
}
</style>
