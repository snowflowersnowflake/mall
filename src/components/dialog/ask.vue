<template>
    <div class="shadow">
        <div class="wrap">
            <p>{{tip||'确定这么做吗?'}}</p>
            <div class="btns">
                <div @click="enter">{{enterText||'确定'}}</div>
                <div @click="cancel">{{cancelText||'取消'}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['tip','enterText','cancelText'],
        methods: {
            enter(){
                this.$emit('enter')
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>

<style lang='less' scoped>
@import "~@/style/base.less";
.shadow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .wrap {
        width: 810/@r;
        border-radius: 44/@r;
        background-color: #fff;
        p {
            padding: 50/@r;
            font-size: 48/@r;
            line-height: 78/@r;
            color: #000;
            text-align: center;
        }
        .btns {
            border-top: 2/@r solid #dadade;
            display: flex;
            height: 133/@r;
            >div {
                flex:1;
                text-align: center;
                line-height: 131/@r;
                font-size: 49/@r;
                color: #007aff;
                &:nth-of-type(1){
                    border-right:2/@r solid #dadade;
                }
            }
        }
    }
}
</style>