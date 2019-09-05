<template>
    <div class="diff-list">
        <div class="search">
            <i class="el-icon-search"></i>
            <el-input v-model="searchValue" placeholder="请输入搜索内容"></el-input>
            <el-button @click="search(searchValue)">搜索</el-button>
        </div>
        <div class="table">
            <ul class="thead">
                <li class="tr">
                    <div class="th">同义词</div>
                    <div class="th">操作</div>
                </li>
            </ul>
            <ul class="tbody">
                <li
                    class="tr"
                    v-for="(item, index) in listData"
                    :key="index"
                    @click="edit(index)">
                    <div class="td" v-html="item.similar_word.join(' | ')">112233</div>
                    <div class="td">
                        <i class="el-icon-edit" @click.stop="edit(index)"></i>
                        <i class="el-icon-delete" @click.stop="deleteData(index)"></i>
                    </div>
                </li>
            </ul>
        </div>
        <editSimilarWord
            :edit_show.sync="editShow"
            :counterfeitID="counterfeitID" />
    </div>
</template>

<script>
import editSimilarWord from './editDialog/edit_similar_word.vue'
import { mapGetters } from 'vuex';
export default {
    name: 'dataList',
    components :{
        editSimilarWord,
    },
    provide() {
        return {
            Father: {
                data: ''
            }
        }
    },
    computed: {
        ...mapGetters([
            'getListData'
        ]),
    },
    data() {
        return {
            searchValue: '',
            listData: this.$store.state.listData,
            editShow: false,
            counterfeitID: -1,
        }
    },
    watch: {
        searchValue: {
            handler(val) {
                this.search(val)
            }
        },
        getListData: {
            handler(val) {
                this.listData = this.$tools.deepCopy(val)
            }
        }
    },
    methods: {
        search(val) {
            let copyListData = this.$tools.deepCopy(this.getListData);
            if(val && val != '|') {
                let changeArr = copyListData.filter((item) => {
                    let str = item.similar_word.join(' | ')
                    let re = new RegExp(`[${val}]`, 'g')
                    let change_str = str.replace(re, `<span style="color: red">${val}</span>`)
                    if(change_str == str) {
                        return false
                    } else {
                        item.similar_word = change_str.split(' | ')
                        return true
                    }
                })
                this.listData = changeArr;
            }else {
                this.listData = copyListData;
            }
        },
        edit(index) {
            this.counterfeitID = index
            this.editShow = true
        },
        deleteData(index) {
            this.listData.splice(index,1)
        },
    },
    created() {
        console.log('created()')
    },
    beforeRouteEnter(to, from, next) {
        console.log('beforeRouteEnter');
        next(vm => {
            console.log(vm)
        });
    },
    beforeRouteLeave(to, from, next) {
        console.log('beforeRouteLeave');
        next();
    }
}
</script>

<style lang="scss">
.diff-list {
    .search {
        height: 50px;
        position: relative;
        .el-icon-search {
            position: absolute;
            left: 0;
            top: 13px;
            font-size: 16px;
        }
        .el-input {
            width: 200px;
            border-bottom: 1px solid #ddd;
            padding-left: 20px;
            .el-input__inner {
                padding: 0;
                border: none;
                border-radius: 0;
            }
        }
        .el-button {
            margin-left: 10px;
            padding: 10px 20px;
            border-radius: 10px;
            background-color: #eee;
        }
    }
    .table {
        li {
            list-style: none;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
        }
        .thead .tr .th:first-child, .tbody .tr .td:first-child {
            width: calc(70% - 20px);
        }
        .thead .tr .th:nth-child(2), .tbody .tr .td:nth-child(2) {
            width: 30%;
        }
        .thead {
            padding-left: 20px;
            width: 100%;
            background-color: #eee;
            box-sizing: border-box;
            li.tr {
                width: 100%;
                display: inline-flex;
            }
        }
        .tbody {
            padding-left: 20px;
            box-sizing: border-box;
            li.tr {
                width: 100%;
                display: inline-flex;
                i.el-icon-edit, i.el-icon-delete {
                    cursor: pointer;
                    font-size: 20px;
                    margin-right: 15px;
                }
            }
        }
    }
}
</style>
