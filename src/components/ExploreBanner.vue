<template>
    <div class="explore-banner" v-if="exploreBanner.block_name">
        <div class="title">{{exploreBanner.block_title}}</div>
        <div class="banner-box">
            <van-swipe class="swiper-container explore-banner-swiper" :autoplay="3000" lazy-render>
                <van-swipe-item class="swiper-slide" v-for="item in exploreBanner.list" :key="item.id">
                    <a class="link-box">
                        <img :src="item.banner_cover" />
                    </a>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        exploreBanner: Object
    },
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>

</style>