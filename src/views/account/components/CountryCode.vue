<template>
    <transition name="fade">
    <div class="country-code" v-if="show">
        <div class="mask" @click="close"></div>
        <div class="dropdown-sec" gkscrollbar-color="base" gk-scrollbar>
            <div class="scrollbar">
                <div class="scrollbar-outer">
                    <div class="scrollbar-wrapper" @scroll="onscroll">
                        <!-- <div class="scrollbar-inner"> -->
                            <ul class="country-list">
                                <li v-for="(item, index) in list" :key="index" @click="choose(item)">
                                    <span class="country-num">+{{item.code}}</span>
                                    <span class="country-label">{{item.cn}}</span>
                                </li>
                            </ul>
                        <!-- </div> -->
                    </div>
                </div>
                <div bar="y" gk-scrollbar-bar="" class="scrollbar-thumb-sec">
                    <div thumb="y" gk-scrollbar-thumb="" class="scrollbar-thumb" :style="{ height: '11px', top: scrollTop + 'px' }"></div>
                </div>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        list: Array,
        show: false
    },
    emits: [
        'choose',
        'close'
    ], 
    setup(props, ctx) {
        const state = reactive({
            scrollTop: 0
        })
        const choose = (item) => {
            ctx.emit('choose', item);
        }
        const close = () => {
            ctx.emit('close');
        }
        const onscroll = (event) => {
            state.scrollTop = event.target.scrollTop * event.target.clientHeight / event.target.scrollHeight
        }
        return {
            ...toRefs(state),
            choose,
            close,
            onscroll
        }
    },
})
</script>
<style lang="scss" scoped>
// .country-code {
//     opacity: 0;
// }
.mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: transparent;
}
.dropdown-sec {
    position: absolute;
    left: -20px;
    top: calc(100% + 10px);
    z-index: 15;
    width: 241px;
    height: 313px;
    padding: 5px 0;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 15px rgb(46 61 72 / 8%);
    .scrollbar {
        position: relative;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        height: 100%;   
        .scrollbar-outer {
            overflow: hidden;
            flex: 1
        }     
    }
}
.scrollbar-wrapper {
    overflow: scroll;
    width: 100%;
    height: 100%;
    margin-bottom: -15px;
    &::-webkit-scrollbar {
        display: none;
    }
}
.country-list {
    li {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        line-height: 1;
        font-size: 15px;
        font-weight: 400;
        color: #4c4c4c;
        cursor: pointer;
        user-select: none;
        .country-num {
            padding-right: 12px;
        }
        .country-label {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
        }
        &:hover {
            .country-num,
            .country-label {
                color: $baseColor;
            }
        }
    }
}
[gkscrollbar-color=base] [bar=y] {
    right: 0;
    top: 5px;
    bottom: 5px;
}
[gkscrollbar-color=base] [thumb=y] {
    right: 0;
    top: 0;
    width: 10px;
}
[gkscrollbar-color=base] [thumb=y]:after {
    width: 4px;
    height: 100%;
    margin: 0 auto;
    border-radius: 4px;
}
[gkscrollbar-color=base] [gk-scrollbar-thumb]:after {
    background: #c9c9c9;
}
.scrollbar-thumb-sec {
    position: absolute;
    z-index: 10;
    .scrollbar-thumb {
        position: absolute;
        opacity: .7;
        cursor: pointer;
        user-select: none;
        &::after {
            content: "";
            display: block;
            pointer-events: none;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
//   transform: scaleY(1);
//   transition: all .5s ease;
}
.fade-enter, .fade-leave-to {
    // transform: scaleY(0);
    opacity: 0;
}
</style>