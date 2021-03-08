<template>
    <div class="indexPage">
        <HeaderTools />
        <!-- <Header /> -->
        <div>
            <van-swipe class="banner-swiper" :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import HeaderTools from '../components/HeaderTools.vue'
// import Header from '../components/Header.vue'

export default {
    components: {
        HeaderTools,
        
    },
    setup() {
        const images = [
            'https://img01.yzcdn.cn/vant/apple-1.jpg',
            'https://img01.yzcdn.cn/vant/apple-2.jpg',
            'https://img01.yzcdn.cn/vant/apple-3.jpg',
            'https://img01.yzcdn.cn/vant/apple-4.jpg',
        ];
        return { images };
    },
}
</script>
<style scoped>
.banner-swiper img {
    width: 920px;
    height: 450px;
    object-fit: contain;
}
</style>