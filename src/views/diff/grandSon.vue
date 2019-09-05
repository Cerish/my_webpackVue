<template>
    <div>我是孙子标签</div>
</template>

<script>
export default {
    name: 'grandSon',
    inject: ['getFather', 'getFatherData'],
    created() {
        this.getFather();
        console.log(this.getFatherData)
    }
}
</script>

<style>

</style>
