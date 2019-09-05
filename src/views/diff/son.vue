<template>
    <div>
        <span>我是儿子标签</span>
        <grandSon></grandSon>
    </div>
</template>

<script>
import grandSon from './grandSon'
export default {
    name: 'son',
    provide: {
        getFather() {
            console.log('我是Son组件')
        },
        getFatherData: '我是Son组件'
    },
    inject: ['Father'],
    components: {
        grandSon
    },
    created() {
        console.log(this.Father)
    }
}
</script>

<style>

</style>
