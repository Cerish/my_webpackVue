<template>
    <div>
        <span>test1 页面</span>
        <span>test1 {{counter}}</span>
    </div>
</template>

<script>
import bus from '../test';
import {mapState} from 'vuex';
export default {
    name: 'test1',
    data() {
        return {
            // counter: -1
        }
    },
    computed: {
        ...mapState({
            counter: 'counter'
        })
    },
    created() {
        bus.$on('add', data => {
            console.log(data);
            this.counter = data;
        })
    }
}
</script>

<style>

</style>
