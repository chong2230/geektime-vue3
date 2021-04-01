<template>
    <div class="ad-dialog" :class="show ? 'show' : 'hide'" v-if="src">
        <div class="ad">
            <img class="img" width="auto" height="auto" :src="src" alt="" 
                @click="goLink" />
            <div class="close-btn" @click="close">
                <img src="@/assets/img/icon/close.png" />
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
    props: {
        src: { 
            type: String,
            default: ''
        },
        link: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const state = reactive({
            show: false
        })
        // return state;
        const close = () => {
            state.show = false;
        }
        const goLink = () => {
            window.open(props.link, '_blank');
        }
        return {
            ...toRefs(state),
            goLink,
            close
        }
    },
}
</script>
<style lang="scss" scoped>
.ad-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    z-index: 10000;   
    &.show {
        display: block;
    } 
    &.hide {
        display: none;
    }
}
.ad {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img {
            cursor: pointer;
            max-width: 610px;
            width: 610px;
            height: 342px;
        }
        .close-btn {
            position: absolute;
            top: -40px;
            right: -40px;
            font-size: 22px;
            color: rgba(255,255,255,0.5);
            text-align: center;
            border-radius: 50%;
            cursor: pointer;
            img {
                width: 38px;
                height: 38px;
            }
        }
    }
</style>