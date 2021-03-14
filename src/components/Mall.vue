<template>
    <div class="explore-banner" v-if="mall.block_name">
        <div class="title">{{mall.block_title}}</div>
        <div class="banner-box">
            <van-swipe class="swiper-container explore-banner-swiper" :autoplay="3000" lazy-render>
                <van-swipe-item class="swiper-slide" v-for="item in mall.list" :key="item.id">
                    <a class="link-box" :href="getLink(item.redirect_param)" target="_blank">
                        <img :src="item.cover_web" />
                    </a>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { getLink } from '@/common/util.js';
export default {
    props: {
        mall: Object
    },
    setup() {
        return {
            getLink
        }
    },
}
</script>
<style lang="scss" scoped>

</style>