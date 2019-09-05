<template>
    <div class="arr-diff">
        <div class="diff-data">
            <div class="origin-data">
                <p>原数据</p>
                <el-input
                    placeholder="按下回车键继续添加"
                    @keyup.enter.native="addWord(0)"
                    v-model="add_origin_data"></el-input>
                <ul>
                    <li v-for="(item, index) in origin_data" :key="index">
                        <span>{{item}}</span>
                        <i class="el-icon-remove" @click="remove(index, 0)"></i>
                    </li>
                </ul>
            </div>
            <div class="new-data">
                <p>新数据</p>
                <el-input
                    placeholder="按下回车键继续添加"
                    @keyup.enter.native="addWord(1)"
                    v-model="add_new_data"></el-input>
                <ul>
                    <li v-for="(item, index) in new_data" :key="index">
                        <span>{{item}}</span>
                        <i class="el-icon-remove" @click="remove(index, 1)"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div>
            <p>结果对比图</p>
            <div class="diff-result">
                <div class="left">
                    <ul>
                        <li
                            v-for="(item, index) in diff_result_origin"
                            :key="index"
                            :class="diff_result_new[index] == '' ? 'delete line' : ''">
                            <span>{{item}}</span>
                            <span v-if="diff_result_new[index] == ''" class="disparity">删除</span>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <li
                            v-for="(item, index) in diff_result_new"
                            :key="index"
                            :class="diff_result_origin [index] == '' ? 'add line' : ''">
                            <span>{{item}}</span>
                            <span v-if="diff_result_origin[index] == ''" class="disparity">新增</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'arrDiff',
    data() {
        return {
            origin_data: ['同义词1','同义词2'],
            new_data: ['同义词6','同义词3'],
            diff_result_origin: [],
            diff_result_new: [],
            add_origin_data: '',
            add_new_data: ''
        }
    },
    watch: {
        origin_data: {
            handler() {
                this.init()
            },
            deep: true
        },
        new_data: {
            handler() {
                this.init()
            },
            deep: true
        }
    },
    methods: {
        addWord(num) {
            //0为旧数据添加，1为新数据添加
            if(num == 0) {
                let isHasData = this.origin_data.find((item) => {
                    return item == this.add_origin_data
                })
                if(isHasData) {
                    this.message(`同义词 '${this.add_origin_data}' 已存在`, 'warning', true)
                } else {
                    this.origin_data.unshift(this.add_origin_data)
                }
                this.add_origin_data = ''
            } else if(num == 1) {
                let isHasData = this.new_data.find((item) => {
                    return item == this.add_new_data
                })
                if(isHasData) {
                    this.message(`同义词 '${this.add_new_data}' 已存在`, 'warning', true)
                } else {
                    this.new_data.unshift(this.add_new_data)
                }
                this.add_new_data = ''
            }
        },
        init() {
            let before = this.origin_data
            let after = this.new_data
            let data = this.$tools.diff(before, after)
            this.diff_result_origin = data.origin_arr
            this.diff_result_new = data.new_arr
        },
        remove(index, num) {
            //0为旧数据删除，1为新数据删除
            if(num === 0) {
                this.origin_data.splice(index, 1);
            } else if(num === 1) {
                this.new_data.splice(index, 1);
            }
        }
    },
    created() {
        this.init()
    }
}
</script>

<style lang="scss">
.arr-diff {
    .diff-data {
        display: flex;
        p {
            text-align: center;
        }
        ul li {
            line-height: 30px;
            border-bottom: 1px dashed #000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &:last-child {
                margin-bottom: 5px;
            }
            i.el-icon-remove {
                margin-right: 10px;
                font-size: 16px;
            }
        }
        .origin-data {
            padding:0 10px;
            flex: 1;
            background-color: #eee;
        }
        .new-data {
            padding:0 10px;
            flex: 1;
            margin-left: 20px;
            background-color: #e2e1ed;
        }
    }
    .diff-result {
        padding: 10px;
        display: flex;
        border: 1px solid #333;
        ul li {
            height: 30px;
            line-height: 30px;
            padding-right: 30px;
            border: 1px dotted #333;
            margin-bottom: 5px;
            text-align: center;
            position: relative;
            &:last-child {
                margin-bottom: 0;
            }
            span.disparity {
                position: absolute;
                top: 0;
                right: 10px;
            }
            &.add {
                border: 1px solid #00ff7f;
                span.disparity {
                    color: #00ff7f;
                }
            }
            &.delete {
                border: 1px solid #ff8c00;
                span.disparity {
                    color: #ff8c00;
                }
            }
            &.line {
                position: relative;
                &::after {
                    content: '';
                    width: 30px;
                    border-top: 1px dashed #000;
                    position: absolute;
                }
            }
            &.line.add::after {
                left: -25px;
                top: 50%;
            }
            &.line.delete::after {
                right: -25px;
                top: 50%;
            }
        }
        .left {
            flex: 1;
            margin-right: 20px;
        }
        .right {
            flex: 1;
        }
    }
}
</style>
