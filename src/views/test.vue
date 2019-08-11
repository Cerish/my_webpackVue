<template>
    <div>
        <span>test 页面</span>
        <span>{{counter}}</span>
        <el-button @click="add(10)">点击添加</el-button>
    </div>
</template>

<script>
import bus from '../test';
import {mapMutations} from 'vuex'
export default {
    name: 'test',
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        // ...mapMutations([
        //     'add'
        // ]),
        add() {
            this.counter += 1;
            bus.$emit('add', this.counter)
        },
        // add() {
        //     this.$store.dispatch('add', 10);
        //     // this.$store.commit('add', 10);
        //     console.log(this.$store.state.counter);
        // }
    }
}
</script>

<style>

</style>
