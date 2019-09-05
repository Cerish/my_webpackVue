<template>
    <div class="main-left">
        <el-menu
            :default-active="$route.path"
            :default-openeds="defaultOpeneds"
            @open="handleOpen"
            router>
            <template v-for="(item, index) in Nav">
                <template v-if="item.show">
                    <el-submenu
                        v-if="item.children"
                        :key="index"
                        :index="item.path">
                        <template slot="title">
                            {{item.meta.menuName}}
                        </template>
                        <template v-for="(itemChild , index) in item.children">
                            <el-menu-item
                                v-if="itemChild.show"
                                :index="itemChild.path" :key="index">
                                <span>{{itemChild.meta.menuName}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <el-menu-item
                        v-else
                        :index="item.path"
                        :key="index">
                        <span>{{item.meta.menuName}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import Nav from '@/router/main/config/index.js'
export default {
    name:'primaryNav',
    computed: {
        defaultOpeneds() {
            return [`/${this.$route.path.split('/')[1]}`];
        }
    },
    data() {
        return {
            Nav: Nav
        };
    },
    methods: {
        handleOpen(index) {
            if(`/${this.$route.path.split('/')[1]}` !== index) {
                this.$router.push({path: index});
            }
        }
    },
    created() {
    
    },
    mounted() {
    },
}
</script>

<style lang='scss'>
</style>