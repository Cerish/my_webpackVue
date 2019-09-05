<template>
    <div class="edit-similar-word">
        <editDialog
            class="similar-word-dialog"
            v-model="editShow">
            <div slot="header" class="header">
                <div class="line"></div>
                <div class="title">修改同义词</div>
            </div>
            <div slot="middle" class="middle">
                <div class="add">
                    <el-input
                        v-model="addSimilarWord"
                        placeholder="按下回车键添加"
                        @keyup.enter.native="addWords">
                    </el-input>
                    <el-button @click="addWords">添加</el-button>
                </div>
                <div class="data-list">
                    <ul>
                        <li v-for="(item, index) in similar_list" :key="index">
                            <span>{{item}}</span>
                            <i class="el-icon-remove" @click="remove(index)"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div slot="footer" class="footer">
                <div class="footer-btn">
                    <el-button type="primary" @click="confirm">确定</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </div>
            </div>
        </editDialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'edit_similar_word',
    props: {
        edit_show: {
            type: Boolean,
            default: false
        },
        counterfeitID: {
            type: Number,
            default: -1
        }
    },
    computed: {
        editShow: {
            set(val) {
                return this.$emit('update:edit_show', val)
            },
            get() {
                return this.edit_show
            }
        },
        ...mapGetters([
            'getListData'
        ]),
    },
    watch: {
        edit_show: {
            handler(val) {
                if(val){
                    this.similar_list = this.$tools.deepCopy(this.getListData[this.counterfeitID].similar_word);
                }
            }
        },
        counterfeitID: {
            handler() {
                this.similar_list = this.$tools.deepCopy(this.getListData[this.counterfeitID].similar_word);
            }
        }
    },
    data() {
        return {
            addSimilarWord: '',
            similar_list: []
        }
    },
    methods: {
        confirm() {
            let listData = this.$tools.deepCopy(this.getListData)
            listData[this.counterfeitID].similar_word = this.similar_list
            this.$store.commit('setListData', listData)
            this.editShow = false
        },
        cancel() {
            this.editShow = false
        },
        addWords() {
            this.similar_list.unshift(this.addSimilarWord);
            this.addSimilarWord = ''
        },
        remove(index) {
            this.similar_list.splice(index, 1)
        }
    },
    created() {
    }
}
</script>

<style lang="scss">
.edit-similar-word {
    .similar-word-dialog {
        .middle {
            .add {
                display: flex;
                .el-input {
                    width: 250px;
                    margin-right: 20px;
                }
                .el-button {
                    border-radius: 10px;
                }
            }
            .data-list {
                li {
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px dashed #ccc;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    i.el-icon-remove {
                        margin-right: 10px;
                        font-size: 16px;
                    }
                }
            }
        }
        .footer-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            .el-button {
                border-radius: 10px;
            }
        }
    }
}
</style>
