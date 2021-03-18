<template>
    <div class="ad-bottom" :style="{'background-image': 'url(' + adBottom.cover_web_bg + ')'}" :class="{show: show}">
        <div class="img-sec" :style="{'background-image': 'url(' + adBottom.cover_web + ')'}"></div>
        <div class="pointer-sec" @click="openLink"></div>
        <span class="iconfont icon-close" @click="close">X</span>
    </div>
</template>
<script>
import { onMounted, onUpdated, reactive, toRefs } from '@vue/runtime-core'
export default {
    props: {
        adBottom: Object
    },
    setup(props) {
        const state = reactive({
            show: true
        })   
        
        const openLink = () => {
            window.open(props.adBottom.redirect_param, '_blank');;
        }

        const close = () => {
            state.show = false;
        }

        return {
            ...toRefs(state),
            openLink,
            close
        };
    },
}
</script>
<style lang="scss" scoped>
.ad-bottom {
    position: fixed;
    z-index: 10;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    transform: translate3d(0, 200px, 0);
    transition: all 0.3s ease;
    &.show {
        transform: translate3d(0, 0, 0);
    }
    &.hide {
        transform: translate3d(0, 200px, 0);
    }
    .img-sec {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate3d(-50%, 0, 0);
        width: 1080px;
        height: 120px;
        background-position: bottom center;
        background-repeat: no-repeat;
        background-size: contain;
    }
    .pointer-sec {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: pointer;
    }
    .icon-close {
        position: absolute;
        top: 5px;
        right: 35px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 20px;
        color: #fff6ea;
        transform: scale(0.8);
        cursor: pointer;
    }
}
</style>