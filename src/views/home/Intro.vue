<template>
    <div class="intro-page page">
        <Header :menus="menus" />
        <div class="top">
            <div class="info-box">
                <div class="info">
                    <section class="row">
                        <div class="left">
                            <img class="lecture-img" :src="detail.lecture_url" />
                        </div>
                        <div class="right">
                            <div class="title">{{detail.column_title}}</div>
                            <div class="subtitle">{{detail.column_subtitle}}</div>
                            <div class="author-name">{{detail.author_name}}</div>
                            <div class="author-intro">{{detail.author_intro}}</div>
                            <div class="sale-sec">
                                <div class="sale-box row">
                                    <button class="sale-btn">{{getSaleLabel({sale_type: detail.sale_type, sale: detail.column_price})}}</button>
                                    <s class="market-price">原价 ¥{{detail.column_price_market / 100}}</s>
                                </div>
                                <div class="sub-label"> {{detail.sub_count}} 人已学习<span>{{getUpdateLabel()}}</span></div>
                            </div>
                            <div class="collect" :class="isCollect ? 'has-collect' : ''" @click="collect">
                                <span>
                                    <img class="collect-icon" src="@/assets/img/icon/collect.png" v-if="!isCollect" />
                                    <img class="collect-icon" src="@/assets/img/icon/has_collect.png" v-if="isCollect" />
                                </span>{{isCollect ? '已收藏' : '收藏'}}
                            </div>
                        </div>
                    </section>
                </div>
                <div class="download-sec">
                    <h3>下载 APP <span>随时随地学习</span></h3>
                    <div class="download-box">
                        <div class="download-btns">
                            <a @click="goStore(1)">
                                <p>App Store 下载</p>
                            </a>
                            <a class="android-btn" @click="goStore(2)">
                                <p>Android 下载</p>
                            </a>
                            <span class="download-label">
                                扫描二维码下载客户端
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAABlUlEQVQ4T7WUv0sbcRjGn+fuGtJBgtDZwcGpY/FHmkEXbRc3IQ3egRrr0P9AxGoduombRO60TQiUZiiKkMGxkCgGHHRzLDgInSI2er08csWWtl7scn3Hl4cP3+d93vfLumuvdl21Fh+/qlzgnqq5zloiSM4/mdu47CRjzbOPAVoWzdH+6a0vnYR11z4V0WrDH8vMfDiL0rHu2gsgVwB8bRvB86dT5cMoYd21V0AuCDqH+CydLx79rWPYqHmTDmW4oCRhMp0vVSKBnj0rYB2gbxDZweni9u+6H7Cw9j070xZ2SHZLepvOl+ajgPueMyLpE8gUgOWhmeLST90vWNg43Mz1+jL3CPZK2k4ED3NRAz/YcPoCQ3skeyRVrkzTGZl61/oDFgI/l3PdVsvcAZgRdNJp4I3Ci0e+Ze0CHJBwZCSD4TuwENgovHxwbX1zCTqU3gzmS6+jLJ98nEg0m8n3ALOQxv8vrFGYSPlWMnz+vTZvx1HtaDMM4HvbqoLo+2cApqq3Qd0NILbViG1pYz2nuA89ti/oBt+wE+SqS1akAAAAAElFTkSuQmCC" alt="" class="icon-arrow">
                            </span>
                        </div>
                        <div class="qrcode-box">
                            <img src="data:image/png;base64,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" />
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        <div class="center">
            <div class="course-sec">
                <van-tabs v-model:active="active">
                    <van-tab title="课程介绍">
                        <div class="column-intro" v-html="detail.column_intro"></div>
                    </van-tab>
                    <van-tab title="课程目录">
                        <div class="column-chapters">
                            <van-collapse v-model="activeNames">
                                <van-collapse-item :title="item.title + '（' + chapterNums[index] + '讲）'" :name="index+1" v-for="(item, index) in chapters" :key="item.id">
                                    <div class="article" :class="{disable: !sitem.article_could_preview}" v-for="sitem in articles.filter((val)=>val.chapter_id == item.id)" :key="sitem.id">
                                        <a :href="getArticleLink(sitem.id)" :title="sitem.article_title">{{sitem.article_title}}</a>
                                        <span class="lock-box" v-if="!sitem.article_could_preview"><img class="lock-icon" src="@/assets/img/icon/lock.png" /></span>
                                        <span class="free" v-else>免费</span>
                                    </div>
                                </van-collapse-item>
                            </van-collapse>
                        </div>
                    </van-tab>
                </van-tabs>
            </div> 
            <div class="more-sec">
                <h3>看过的人还看了</h3>   
                <section class="course-item" v-for="item in recommendProduct" :key="item.id">
                    <div class="left" @click="goColumn(item.id)">
                        <img :src="item.author.avatar" alt="">
                    </div>
                    <div class="right">
                        <a href="javascript:;" :title="item.title" class="course-title" @click="goColumn(item.id)">{{item.title}}</a>
                        <div class="course-info">
                            <p class="author" :title="item.author.name + '  ' + item.author.intro">
                                {{item.author.name + '  ' + item.author.intro}}
                            </p>
                            <p class="chapter-count">
                                {{item.unit}}&nbsp;|&nbsp;{{item.extra.sub.count}} 人已学习
                            </p>
                        </div>
                        <div class="sale">
                            <span class="type" :class="'type-' + item.price.sale_type">{{getSaleType(item.price.sale_type)}}</span> 
                            <span class="price">¥{{item.price.sale / 100}}</span> <s class="market-price">原价 ¥{{item.price.market / 100}}</s>
                        </div>
                    </div>
                </section> 
            </div>           
        </div>
    </div>
</template>
<script>
import { getCurrentInstance, reactive, onMounted, toRefs } from '@vue/runtime-core';
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import { getSaleType, getSaleLabel } from '@/common/util.js'
import intro from '@/mock/home/intro.js';

export default {
    components: {
        Header
    },
    setup() {
        const { ctx } = getCurrentInstance();
        const route = useRoute();;

        const state = reactive({
            menus: [],
            detail: {},
            articles: [],
            chapters: [],
            chapterNums: [],
            recommendProduct: [],
            active: 0,
            activeNames: [1],
            isCollect: false
        });

        onMounted(()=>{
            loadData();
        })

        async function loadData() {
            getMenus();
            getDetail();
            getChapters();
            getRecommend();
        }

        async function getMenus() {
            const menus = await ctx.$api.getMenuData({v: 26939623});
            state.menus = menus;
        }

        async function getDetail() {
            const { id } = route.params;
            const res = await ctx.$api.getColumnIntro({ cid: id, with_groupbuy: true });
            // 无效的专栏ID
            if (res.code == 0) {
                state.detail = res.data;
            } else {
                state.detail = intro['/serv/v1/column/intro'].data;
            }
        }

        async function getChapters() {
            const { id } = route.params;
            const res = await ctx.$api.getColumnChapters({ cid: id });
            if (res.code == 0 && res.data.length > 0) {
                state.chapters = res.data;
            } else {
                state.chapters = intro['/serv/v1/chapters'].data;                
            }
            getArticles();
        }

        async function getArticles() {
            const { id } = route.params;
            const res = await ctx.$api.getColumnArticles({ cid: id, order: 'earliest', prev: 0, sample: false, size: 500 });
            // 无效的专栏ID
            if (res.code == 0) {
                state.articles = res.data.list;
            } else {
                state.articles = intro['/serv/v1/column/articles'].data.list;
            }
            let arr = new Array(state.chapters.length).fill(0);
            state.chapters.forEach((val, index)=>{
                for (let article of state.articles) {
                    if (article.chapter_id == val.id) arr[index]++;
                }
            });
            state.chapterNums = arr;
        }

        async function getRecommend() {
            const { id } = route.params;
            const res = await ctx.$api.getColumnRecommend({product_id: parseInt(id)});
            if (res.code == 0) {
                state.recommendProduct = res.data.products.slice(0, 4);
            }
        }

        const getUpdateLabel = () => {
            let detail = state.detail;
            if (detail.is_finish) {
                return '· 已完结';
            }
            return ` · 共${detail.article_total_count}讲 · ${detail.update_frequency}`;
        }

        const collect = () => {
            state.isCollect = !state.isCollect;
        }

        const getArticleLink = (id) => {
            return 'https://time.geekbang.org/column/article/' + id;
        }

        const goStore = (type) => {
            let url = 'https://apps.apple.com/cn/app/id1280245865';
            if (type == 2) {
                url = 'https://time.geekbang.org/download/android/latest';
            }
            window.open(url, '_blank');
        }

        const goColumn = (id) => {
            window.open('https://time.geekbang.org/column/intro/' + id, '_blank');
        }

        // watch监听route.params
        // watch(() => route.params, async newParams => {
        //     console.log(newParams)
        // })

        return {
            ...toRefs(state),
            getSaleType,
            getSaleLabel,
            getUpdateLabel,
            collect,
            getArticleLink,
            goStore,
            goColumn
        }
    },
}
</script>
<style lang="scss" scoped>
.top {
    padding: 54px 0 60px;
    .info-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        max-width: 1080px;
        margin: 0 auto;
        .info {
            // width: 100%;
            flex: 1;
        }
    }  
    .left {
        position: relative;
        margin-right: 25px;
        font-size: 0;
        img {
            width: 148px;
            height: 195px;
            border-radius: 5px;
            background: #eee;
        }
    }  
    .right {
        position: relative;
        flex: 1;
        widows: 733px;
        height: 195px;
        .title {
            display: flex;
            max-width: 460px;
            font-size: 24px;
            line-height: 25px;
            color: #404040;
            font-weight: 500;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .subtitle {
            margin-top: 10px;
            font-size: 18px;
            color: #404040;
            font-weight: 400;
            line-height: 20px;
        }
        .author-name {
            font-size: 16px;
            margin-top: 20px;
            color: #404040;
            line-height: 16px;
            font-weight: 400;
        }
        .author-intro {
            margin-top: 7px;
            font-size: 14px;
            color: #404040;
            line-height: 20px;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            height: 40px;
        }
    }
}
.sale-sec {
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .sale-box {
        .sale-btn {
            display: inline-block;
            cursor: pointer;
            border: none;
            outline: none;
            width: 110px;
            height: 34px;
            border-radius: 5px;
            line-height: 34px;
            // background: #fa8919;
            background: $baseColor;
            color: #fff;
            font-weight: 400;
            font-size: 14px;
        }
        .market-price {
            color: #888;
            font-size: 12px;
            font-weight: 400;
            margin-left: 10px;
        }
    }
    .sub-label {
        color: #888;
        font-size: 13px;
        font-weight: 300;
        line-height: 34px;
    }
}

.collect {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    width: 67px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    font-weight: 400;
    color: #b2b2b2;
    background: #fff;
    border: 1px solid #b2b2b2;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    span {
        margin-right: 4px;
        font-size: 12px;
    }
    img {
        width: 16px;
        height: 16px;
        margin-top: 6px;
        opacity: .6;
    }
    &.has-collect {
        color: $baseColor;
        border: 1px solid $baseColor;
    }
}

.center {
    width: 100%;
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding-bottom: 50px;
    padding-top: 20px;
    min-height: 700px;
    .course-sec {
        width: 712px;
    }
}
.van-tabs {
    // width: 300px;
    .van-tabs__line {
        background-color: #000000;  // scope中不生效
    }
}


.column-intro {
    padding: 22px 0 100px 21px;
    min-height: 738px;
    box-sizing: border-box;
    padding-left: 0;
    font-size: 15px;
    
}
.column-chapters {
    .article {
        font-size: 14px;
        color: #4c4c4c;
        font-weight: 400;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-radius: 5px;
        padding-left: 31px;
        a {
            color: #4c4c4c;
            white-space: nowrap;
            max-width: 85%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        &.disable a {
            color: #b2b2b2;
        }
        .lock-box {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #dfdfdf;
            font-size: 13px;
            width: 38px;
        }
        .lock-icon {
            width: 20px;
            height: 20px;
            opacity: .4;
        }
        .free {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 15px;
            font-size: 12px;
            color: #fa8919;
            border: 1px solid #fa8919;
            border-radius: 4px;
            transform: translateX(-1px);
        }
    }
}

.download-sec {
    margin-left: 63px;
    background: #fafafa;
    width: 305px;
    height: 196px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 25px 20px 31px 24px;
    border: 1px solid #fcfdfc;
    h3 {
        font-size: 16px;
        font-weight: 500;
        color: #404040;
        margin-bottom: 18px;
        span {
            color: #fa8919;
        }
    }
    .download-box {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .download-btns {
        a {
            cursor: pointer;
            font-size: 12px;
            display: flex;
            color: #fff;
            width: 134px;
            height: 35px;
            line-height: 35px;
            border-radius: 6px;
            background: #404040;
            margin-bottom: 10px;
            box-sizing: border-box;
            padding-left: 12px;
            font-weight: 400;
            &.android-btn {
                background: #6ab344;
                margin-bottom: 0;
            }
        }
        .download-label {
            margin-top: 15px;
            display: block;
            padding-left: 2px;
            color: #c79d5e;
            font-size: 12px;
            font-weight: 300;
            line-height: 1em;
        }
        .icon-arrow {
            height: 9px;
            margin-left: 3px;
        }
    }
    .qrcode-box {
        position: relative;
        top: -1px;
        padding: 9px;
        border-radius: 6px;
        background: #fff;
        font-size: 0;
        border: 1px solid #ddd;
        img {
            width: 88px;
            height: 88px;
        }
    }
}

.more-sec {
    background: #fff;
    width: 305px;
    h3 {
        color: #404040;
        font-weight: 500;
        font-size: 16px;
        height: 46px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e9e9e9;
    }
    .course-item {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
    }
    .left {
        width: 88px;
        height: 111px;
        border-radius: 5px;
        overflow: hidden;
        background: #eee;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .right {
        width: 203px;
        margin-left: 14px;
        .course-title {
            display: block;
            cursor: pointer;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
            font-size: 16px;
            color: #404040;
            line-height: 20px;
            &:hover {
                text-decoration: underline;
            }
        }
        
    }
    .course-info {
        margin-top: 8px;
        color: #888;
        p {
            font-weight: 400;
            line-height: 20px;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
        }
        .chapter-count {
            font-size: 12px;
            line-height: 20px;
            margin-top: 2px;
        }
    }
    .sale {
        display: flex;
        align-items: center;
        margin-top: 17px;
        .type {
            height: auto;
            padding: 3px 5px;
            color: #fff;
            font-size: 12px;
            font-weight: 400;
            line-height: 1.2em;
            white-space: nowrap;
            border-radius: 2px;
            margin-right: 8px;
            background: #f9c300;
            &.type-2 {
                background: #fa8919;
            }
        }
        .price {
            font-size: 16px;
            color: #fa8919;
            font-weight: 400;
            margin-right: 8px;
            white-space: nowrap;
        }
        .market-price {
            font-size: 13px;
            color: #888;
            font-weight: 400;
            white-space: nowrap;
        }
    }
}

@media screen and (min-width: 860px) and (max-width: 1079px) {
    .top {
        .info-box {
            padding: 0 40px;
            box-sizing: border-box;
        }
    }   
    .center {
        padding: 0 40px;
        box-sizing: border-box;
        .course-sec {
            width: 100%;
        }
    } 
}

</style>
<style lang="scss">
.page {
    margin-top: 60px;
}
.course-sec {
    .van-tabs {
        .van-tabs__wrap {
            // display: flex;
            // align-items: center;
            border-bottom: 1px solid #e9e9e9;
            // height: 50px;
        }
        .van-tabs__line {
            background-color: $baseColor;
        }
    }
}
.column-intro {
    h2 {
        font-size: 20px;
    }
    p, ul li {
        margin-top: 0;
        margin-bottom: 20px;
        font-size: 15px;
        font-weight: 400;
        color: #353535;
        white-space: normal;
        word-break: break-word;
        line-height: 28px;
        overflow: hidden;
        max-height: none;
    }
    ol li {
        line-height: 28px;
        font-size: 15px;
        font-weight: 400;
        color: #353535;
        word-break: break-word;
        white-space: normal;
        a {
            color: #fa8919;
            word-wrap: break-word;
            text-decoration: none;
            border-bottom: 1px solid #fa8919;
        }
    }
    img {
        max-width: 100%;
        background-color: #eee;
        border: 0;
        display: block;
        width: 100%;
        border-radius: 6px;
    }
}
.column-chapters {
    .van-cell__title {
        font-size: 18px;
        font-weight: 500;
        padding-right: 10px;
        height: 50px;
        color: #4c4c4c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
    }
    .van-collapse-item__title--expanded::after {
        display: none;
    }
    .van-collapse-item__content {
        padding-top: 0;
    }
}

</style>