<template>
    <div class="explore-banner" v-if="lectureAd.block_name">
        <div class="title">{{lectureAd.block_title}}</div>
        <div class="banner-box">
            <van-swipe class="swiper-container explore-banner-swiper" :autoplay="3000" lazy-render>
                <van-swipe-item class="swiper-slide" v-for="item in lectureAd.list" :key="item.id">
                    <a class="link-box">
                        <img :src="item.cover_web" />
                    </a>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        lectureAd: Object
    },
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>

</style>