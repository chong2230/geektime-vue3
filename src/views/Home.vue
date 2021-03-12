<template>
    <div class="indexPage">
        <!-- <HeaderTools /> -->
        <Header :menus="menus" />
        <div class="center row">
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
                            <img :src="item.icon" />
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right">
                <div class="content">
                    <div class="my-course">
                        <button class="course-btn btn">我的课程</button>
                    </div>
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
                </div>
            </div>
        </div>
        
        <div>
            <van-swipe class="banner-swiper" :autoplay="3000" lazy-render>
                <van-swipe-item class="swiper-slide" v-for="image in images" :key="image">
                    <img :src="image" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted, onUpdated, onUnmounted } from 'vue'
import HeaderTools from '../components/HeaderTools.vue'
import Header from '../components/Header.vue'
import { getCurrentInstance } from '@vue/runtime-core'
import Mock from '@/mock/index.js';

export default {
    components: {
        // HeaderTools,
        Header
    },
    setup() {
        const { ctx } = getCurrentInstance();

        const images = [
            // 'https://img01.yzcdn.cn/vant/apple-1.jpg',
            // 'https://img01.yzcdn.cn/vant/apple-2.jpg',
            // 'https://img01.yzcdn.cn/vant/apple-3.jpg',
            // 'https://img01.yzcdn.cn/vant/apple-4.jpg',
        ];

        const state = reactive({
            menus: [],
            images,
            // explores: [],
            lecturePath: {},    // 学习路径
            lectureTag: {},     // 课程方向
            exploreBanner: {},   // 热门推荐
            lectureAd: {},      // 活动推荐
            hotLive: {},        // 极客Live
            mall: {},           // 商城上新
            adBottom: {},       // 底栏
            lecture: {}
        });
        
        onMounted(async () => {
            loadData();                        
        })

        function loadData() {
            getMenus();
            getExploreAll();        
            getLectureList();
        }

        async function getMenus() {
            const menus = await ctx.$api.getMenuData({v: 26921181});
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
                // state.explores = explores;
                for (let item of explores) {
                    console.log(item.block_name)
                    if (item.block_name == 'lecture_path') state.lecturePath = item;
                    else if(item.block_name == 'cm_lecture_tag') state.lectureTag = item;
                    else if(item.block_name == 'explore_banner') state.exploreBanner = item;
                    else if(item.block_name == 'cm_web_lecture_ad001') state.lectureAd = item;
                    else if(item.block_name == 'hot_live') state.hotLive = item;
                    else if(item.block_name == 'cm_web_lecture_ad002') state.mall = item;
                    else if(item.block_name == 'ad_bottom') state.adBottom = item;
                }
                // state.lecturePath = explores[0];
            }
        }
        
        async function getLectureList() {
            const res = await ctx.$api.getLectureList({label_id: 0, type: 0});
            // console.log(res);
            if (res.code == 0) {
                state.lecture = res.data;
            }
        }        

        onUpdated(() => {
            console.log('onUpdated')
        })

        onUnmounted(() => {
            console.log('onUnmounted')
        })
        

        return {
            ...toRefs(state)
        };
    },
}
</script>
<style lang="scss" scoped>
.banner-swiper img {
    width: 920px;
    height: 450px;
    object-fit: contain;
}
.center {
    justify-content: space-between;
    width: 1080px;
    margin: 0 auto 60px;
    padding-top: 50px;
    .left {
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
                    img {
                        position: relative;
                        z-index: 10;
                        width: 36px;
                        height: 36px;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
    .right {
        width: 305px;
        padding-bottom: 50px;
        .content {
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
            }
        }
    }
}
</style>