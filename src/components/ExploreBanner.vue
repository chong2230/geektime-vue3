<template>
    <div class="explore-banner" v-if="exploreBanner.block_name">
        <div class="title">{{exploreBanner.block_title}}</div>
        <div class="banner-box">
            <van-swipe class="swiper-container explore-banner-swiper" :autoplay="3000" lazy-render>
                <van-swipe-item class="swiper-slide" v-for="item in exploreBanner.list" :key="item.id" @click="goColumn(item)">
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
        const goColumn = (item) => {
            let url = '';
            switch (item.banner_redirect_type) {
                case 'product':
                    url = 'https://time.geekbang.org/column/intro/' + item.extra.column_id;
                    break;
                case 'article':
                    url = 'https://time.geekbang.org/column/article/353846' + item.banner_redirect_param;
                    break;
                case 'url':
                    url = item.banner_redirect_param;
                    break;
            }
            console.log(url);
            window.open(url, '_blank');
        }
        return {
            goColumn
        }
    },
}
</script>
<style lang="scss" scoped>

</style>