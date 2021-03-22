<template>
    <div class="page index-page">
        <Header :menus="menus" />
        <div class="main row">
            <div class="left column">
                <div class="explore">
                    <div class="top row">
                        <div class="title">{{lecturePath.block_title}}</div>
                        <div class="view-all">查看全部</div>
                    </div>
                    <ul class="row">
                        <li class="row" v-for="item in lecturePath.list" :key="item.id">
                            <div class="lecture-info">
                                <div class="name">{{item.name}}</div>
                                <div class="desc">{{item.product_count}}门课程</div>
                            </div>
                            <img class="lecture-img" :src="item.icon" />
                        </li>
                    </ul>
                </div>
                <div class="products">
                    <div class="products-info row">
                        <div class="conditions row">
                            <a :class="{active: index == order - 1}" href="javascript:void(0)" v-for="(item, index) in conditions" :key="index" @click="changeSku(index)">{{item}}</a>
                            <!-- <a href="javascript:void(0)">最新上架</a>
                            <a href="javascript:void(0)">订阅数</a>
                            <a href="javascript:void(0)">
                                价格
                                <span></span>
                            </a>
                            <a href="javascript:void(0)">活动</a> -->
                        </div>
                        <span class="count">184个课程</span>
                    </div>
                    <Product :productInfos="productInfos" :productArticles="productArticles"></Product>
                </div>
            </div>
            <div class="right">
                <div class="content">
                    <div class="my-course">
                        <button class="course-btn btn">我的课程</button>
                    </div>
                    <ExploreBanner :exploreBanner="exploreBanner"></ExploreBanner>
                    <LectureAd :lectureAd="lectureAd"></LectureAd>                    
                    <IndexLive :indexLive="indexLive"></IndexLive>
                    <AdMall :mall="mall"></AdMall>                    
                    <AttentionUs></AttentionUs>
                </div>
            </div>
        </div>   
        <AdBottom :adBottom="adBottom"></AdBottom>    
        <ad-dialog ref="adDialog" :src="ad.image_url" :link="ad.target_url"></ad-dialog>         
    </div>
</template>
<script>
import { reactive, ref, onMounted, onUpdated, onUnmounted } from 'vue'
import { getCurrentInstance, toRefs } from '@vue/runtime-core'
import Header from '@/components/Header.vue';
import Product from '@/components/Product.vue';
import ExploreBanner from '@/components/ExploreBanner.vue';
import LectureAd from '@/components/LectureAd.vue';
import IndexLive from '@/components/IndexLive.vue';
import AdMall from '@/components/AdMall.vue';
import AttentionUs from '@/components/AttentionUs.vue';
import AdBottom from '@/components/AdBottom.vue';
import Mock from '@/mock/index.js';
import AdDialog from '../components/AdDialog.vue';
// import skus from '@/mock/labelSkus.js';

export default {
    components: {
        Header,
        Product,
        ExploreBanner,
        LectureAd,
        IndexLive,
        AdMall,
        AttentionUs,
        AdBottom,
        AdDialog
    },
    setup() {
        const { ctx } = getCurrentInstance();
        const state = reactive({
            menus: [],
            lecturePath: {},    // 学习路径
            lectureTag: {},     // 课程方向
            exploreBanner: {},   // 热门推荐
            lectureAd: {},      // 活动推荐
            hotLive: {},        // 极客Live
            indexLive: {},      // 当前Live
            mall: {},           // 商城上新
            adBottom: {},       // 底栏
            lecture: {},
            productInfos: [],
            productArticles: {},
            skusData: {},
            conditions: ['综合', '最新上架', '订阅数', '价格', '活动'],
            order: 1,            // 排序 1：综合 2：最新上架 3：订阅数 4：价格 5：活动
            asc: 1,               // 1：升序 0：降序 用于价格排序
            ad: {},              // 广告弹窗
        });
        let levelSkus, newsSkus, subSkus, priceSkus, spuSkus;
        
        onMounted(async () => {
            loadData();     
        })

        function loadData() {
            getMenus();
            getExploreAll();        
            getLabelSkus();
            getLectureList();
            getIndexLive(); 
            getPcInterstitial();
        }        

        async function getMenus() {
            const menus = await ctx.$api.getMenuData({v: 26939623});
            state.menus = menus;
        }

        async function getExploreAll() {
            let res = await ctx.$api.getExploreAll({page: "lecturev2_web"});
            // use mock data, why no data?
            if (res.data && res.data.length == 0) {
                res = Mock['/serv/v2/explore/all'];
            }
            if (res.code == 0) {                
                let explores = res.data;
                for (let item of explores) {
                    if (item.block_name == 'lecture_path') {item.list = item.list.slice(0, 4);state.lecturePath = item;}
                    else if(item.block_name == 'cm_lecture_tag') state.lectureTag = item;
                    else if(item.block_name == 'explore_banner') state.exploreBanner = item;
                    else if(item.block_name == 'cm_web_lecture_ad001') state.lectureAd = item;
                    else if(item.block_name == 'hot_live') state.hotLive = item;
                    else if(item.block_name == 'cm_web_lecture_ad002') state.mall = item;
                    else if(item.block_name == 'ad_bottom') {state.adBottom = item.list[0];}
                }
            }
        }

        // TODO: save skus data, if exist, don't request again
        async function getLabelSkus() {
            const res = await ctx.$api.getLabelSkus({label_id: 0, type: 0});
            if (res.code == 0) {
                state.skusData = res.data;
                getSkusByOrder();                
                getProductInfos();
            }
        }

        function getSkusByOrder() {
                switch (state.order) {
                    case 1:
                        ctx.skus = getLevelSkus(state.skusData); // 默认按综合排序
                        break;
                    case 2:
                        ctx.skus = getNewsSkus(state.skusData); // 默认按综合排序
                        break;
                    case 3:
                        ctx.skus = getSubSkus(state.skusData);    // 按订阅数排序
                        break;
                    case 4:
                        ctx.skus = getPriceSkus(state.skusData);    // 按价格排序
                        break;
                    case 5:
                        ctx.skus = getSpuSkus(state.skusData);    // 按活动排序
                        break;    
                    default:
                        break;            
                }
        }
        
        async function getLectureList() {
            const res = await ctx.$api.getLectureList({label_id: 0, type: 0});
            if (res.code == 0) {
                state.lecture = res.data;
            }
        }    
        
        async function getIndexLive() {
            const res = await ctx.$api.getIndexLive({});
            if (res.code == 0) {
                state.indexLive = res.data;                
            }
        }

        async function getProductInfos() {
            let ids = getSkuIds();
            const params = {
                ids: ids,//[100015201, 100052401, 100073301, 100073201, 100003101, 100002201, 100001901, 100007001, 100003901, 100006201],
                with_first_articles: true

            }
            const res = await ctx.$api.getProductInfos(params);
            if (res.code == 0) {
                let data = res.data;
                let articles = {};
                for (let article of res.data.articles) {
                    articles[article.pid] = articles[article.pid] || [];
                    articles[article.pid].push(article);
                }
                state.productInfos = data.infos;
                state.productArticles = articles;
            }
        }

        async function getPcInterstitial() {
            const res = await ctx.$api.getPcInterstitial({v: 26939623});
            const ads = res.default || [];
            let time = parseInt(new Date().getTime()/1000);
            let ad = {};
            for (let item of ads) {
                if (time >= item.start_time_timestamp && time <= item.end_time_timestamp) {
                    ad = item;
                    break;
                }
            }
            state.ad = ad;
        }

        function getSkuIds() {
            // TODO: 按分页获取数据
            let arr = ctx.skus.slice(0, 10);
            let ids = [];
            for (let item of arr) {
                ids.push(item.column_sku);
            }
            return ids;
        }
        
        // all the top_level's value is zero???
        function getLevelSkus(skus) {
            if (levelSkus) return levelSkus;
            let skuList = [...skus.list];
            function levelSort(a, b) {
                return a.top_level < b.top_level ? 1 : -1;
            }
            levelSkus = skuList.sort(levelSort);
            return levelSkus;
        }

        function getNewsSkus(skus) {
            if (newsSkus) return newsSkus;
            let skuList = [...skus.list];
            function newsSort(a, b) {
                return a.column_ctime < b.column_ctime ? 1 : -1;
            }
            newsSkus = skuList.sort(newsSort);
            return newsSkus;
        }

        function getPriceSkus(skus) {
            // if (priceSkus) return priceSkus;
            let skuList = [...skus.list];
            function priceSort(a, b) {
                if (state.asc) return a.column_price < b.column_price ? -1 : 1;
                else return a.column_price < b.column_price ? 1 : -1;
            }
            priceSkus = skuList.sort(priceSort);
            return priceSkus;
        }

        function getSpuSkus(skus) {
            if (spuSkus) return spuSkus;
            let skuList = [...skus.list];
            function spuSort(a, b) {
                return a.column_sku < b.column_sku ? 1 : -1;
            }
            spuSkus = skuList.sort(spuSort);
            return spuSkus;
        }

        function getSubSkus(skus) {
            if (subSkus) return subSkus;
            let skuList = [...skus.list];
            function subSort(a, b) {
                return a.sub_count < b.sub_count ? 1 : -1;
            }
            subSkus = skuList.sort(subSort);
            return subSkus;
        }

        const changeSku = (index) => {
            if (state.order == 4 && index == 3) state.asc = 1 - state.asc;  // 重复点击价格，切换升序和降序
            state.order = index + 1;
            getSkusByOrder();                
            getProductInfos();
        }

        onUpdated(() => {
            console.log('onUpdated')
        })

        onUnmounted(() => {
            console.log('onUnmounted')
        })
        
        return {
            ...toRefs(state),
            changeSku
        };
    },
}
</script>
<style lang="scss">
.explore-banner {
    .title {
        height: 50px;
        line-height: 50px;
        font-weight: 500;
        color: #404040;
        text-align: left;
    }
    .banner-box {
        position: relative;
        width: 100%;
        height: 129px;
        border-radius: 5px;
        overflow: hidden;
        
        .explore-banner-swiper {
            height: 129px;
            border-radius: 5px;
            
        }

        .link-box {
            display: block;
            width: 305px;
            height: 100%;
            position: relative;
            overflow: hidden;
            cursor: pointer;

            img {
                width: 100%;
                position: relative;
            }
        }
    }
    
}
</style>
<style lang="scss" scoped>
.page {
    min-width: 1200px;
}
.main {
    justify-content: space-between;
    align-items: flex-start;
    text-align: left;
    width: 1080px;
    margin: 0 auto 60px;
    padding-top: 50px;
    .left {
        
        .products {
            margin-top: 30px;
            width: 711px;
            
        }
    }
    .right {
        width: 305px;
        padding-bottom: 50px;        
    }
}
.explore {
    .top {
        justify-content: space-between;
        padding-right: 8px;
        .title {
            font-size: 16px;
            font-weight: 500;
            color: #353535;
        }
        .view-all {
            font-size: 13px;
            font-weight: 400;
            color: #888;
            cursor: pointer;
        }
    }
    ul {
        margin-top: 12px;
        li {
            position: relative;
            justify-content: space-between;
            width: 171px;
            height: 56px;
            padding: 0 13px 0 10px;
            margin-right: 9px;
            vertical-align: top;
            background: #f6f7fa;
            border-radius: 5px;
            box-sizing: border-box;
            cursor: pointer;            
        }
    }
}
.lecture-info {
    height: 32px;
    .name {
        width: 112px;
        line-height: 18px;
        font-size: 14px;
        font-weight: 500;
        color: #353535;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        transition: color 0.2s ease;
    }
    .desc {
        margin-top: -3px;
        margin-left: -11px;
        font-size: 13px;
        font-weight: 400;
        color: #888;
        transform: scale(0.8);
    }
}
.lecture-img {
    position: relative;
    z-index: 10;
    width: 36px;
    height: 36px;
    border-radius: 5px;
    object-fit: cover;
}
.my-course {
    display: flex;
    flex: 0 0 110px;
    justify-content: flex-end;
    margin-bottom: 20px;
    .course-btn {
        margin-right: 12px;
        width: 120px;
    }                    
}
.products-info {
    justify-content: space-between;
    height: 50px;
    border-bottom: 1px solid rgba(233,233,233,0.6);
    .conditions {
        display: flex;
        a.active {
            font-weight: 500;
            color: #666565;

        }
        a {
            color: #888;
            padding-right: 20px;
            font-size: 13px;
            font-weight: 400;
            margin-right: 20px;
            position: relative;
        }
    }
    .count {
        font-size: 12px;
        color: #888;
        font-weight: 400;
    }
}

</style>