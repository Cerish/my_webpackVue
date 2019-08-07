<template>
    <div>
        test页面
        <slot name="header">
            我是子组件的header slot
        </slot>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'test'
}
</script>

<style>

</style>
