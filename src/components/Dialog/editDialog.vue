<template>
    <div class="edit-dialog" :class="currentValue ? '' : 'dialog-show'">
        <span class="close" @click="close"><i class="el-icon-close"></i></span>
        <slot name="header"></slot>
        <slot name="middle"></slot>
        <slot name="footer"></slot>
    </div>
</template>

<script>
export default {
    name: 'editDialog',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentValue: {
            set(val) {
                this.$emit('input', val)
            },
            get() {
                return this.value
            }
        }
    },
    data() {
        return {
        }
    },
    methods: {
        close() {
            this.currentValue = false
        }
    },
    created() {
    }
}
</script>

<style lang="scss">
.edit-dialog {
    width: 600px;
    height: 100vh;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 15px;
    box-sizing: border-box;
    transition: all ease 0.8s;
    z-index: 999;
    box-shadow: 10px 10px 15px #333;
    span.close {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: -16px;
        border: 1px solid #ccc;
        i.el-icon-close {
            font-weight: 600;
        }
    }
    .header {
        padding-left: 20px;
        height: 25px;
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        div.line {
            width: 4px;
            height: 16px;
            background-color: #000;
            margin-right: 10px;
        }
        div.title {
            font-size: 16px;
            font-weight: 600;
        }

    }
    .middle {
        padding: 20px 0 0 20px;
        box-sizing: border-box;
        height: calc(100vh - 120px);
    }
    .footer {
        height: 80px;
        box-shadow: 0 -2px 5px #ccc;
        position: relative;
    }
}
.dialog-show {
    right: -620px;
    transition: all ease 0.8s;
}
</style>
