<template>
    <div class="product row" v-for="item in productInfos" :key="item.id" @click="goColumn(item)">
        <div class="p-left">
            <a>
                <img :src="item.cover.rectangle" />
            </a>
        </div>
        <div class="p-right">
            <div class="p-info">
                <div class="title-sec row">
                    <h2 class="p-title">{{item.title}}</h2>
                    <p class="unit-sub">{{item.unit}} <em></em>| {{item.extra.sub.count}} </p>
                </div>
                <div class="intro">{{item.author.name + ' ' + item.author.intro}}</div>
            </div>
            <div class="p-article">
                <ul class="p-ul">
                    <li v-for="sitem in productArticles[item.id]" :key="sitem.id">
                        <a :class="{free: sitem.could_preview}" href="javascript: void(0)" @click="goArticle(sitem)">
                            <span v-if="sitem.could_preview">免费</span>
                            {{sitem.title}}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="p-price row">
                <p class="price-sec">
                    <span>{{getSaleLabel(item.price)}}</span>
                    <s>原价 ¥{{item.price.market/100}}</s>
                </p>
                <div class="handle-box">
                    <button class="handle-btn">立即订阅</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useRouter } from 'vue-router';

export default {
    props: {
        productInfos: Array,
        productArticles: Object
    },
    setup() {
        const router = useRouter();

        const goColumn = (item) => {
            // window.open('https://time.geekbang.org/column/intro/' + item.id, '_blank');
            router.push({ path: `/column/intro/${item.id}` });
        }
        const goArticle = (item) => {
            window.open('https://time.geekbang.org/column/article/' + item.id, '_blank');
        }
        const getSaleLabel = (price) => {
            let type = '';
            switch(price.sale_type) {
                case 1:
                    break;
                case 2:
                    type = '限时';
                    break;    
                case 3:
                    type = '拼团';
                    break; 
                default:
                    break;

            }
            return type + ' ¥' + price.sale/100;
        }
        return {
            goColumn,
            goArticle,
            getSaleLabel
        }
    },
}
</script>
<style lang="scss" scoped>
.product {
    cursor: pointer;
    justify-content: space-between;
    
    .p-right {
        width: calc(100% - 147px);
        padding: 40px 0;
        margin-left: 20px;
        border-bottom: 1px solid rgba(233,233,233,0.6);
        
        .p-article {
            height: 80px;
            box-sizing: border-box;
            padding: 5px 0 16px;
            
        }
        
    }
}
.p-left {
    flex: 0 0 127px;
    width: 127px;
    height: 168px;
    a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        background: #eee;
        border-radius: 5px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
}
.p-info {
    cursor: pointer;
    .title-sec {
        justify-content: space-between;
        padding-top: 3px;
        h2 {
            font-size: 20px;
            color: #404040;
            font-weight: 500;
            line-height: 24px;
            margin-right: 10px;
        }
        p {
            font-size: 14px;
            color: #888;
            font-weight: 300;
            line-height: 24px;
            white-space: nowrap;
            letter-spacing: 1px;
            em {
                font-weight: 300;
            }
        }
    }
    .intro {
        margin-top: 5px;
        max-width: 100%;
        color: #404040;
        font-size: 14px;
        font-weight: 400;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.p-ul {
    display: flex;
    flex-wrap: wrap;
    li {
        width: 50%;
        box-sizing: border-box;
        align-items: center;
        display: flex;
        margin-top: 10px;   
        a {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 20px;
            line-height: 20px;
            color: #404040;
            font-size: 13px;
            font-weight: 400;
            span {
                display: block;
                position: absolute;
                top: 3px;
                left: 0;
                width: 48px;
                height: 26px;
                text-align: center;
                line-height: 26px;
                font-size: 18px;
                font-weight: 400;
                color: #fa8919;
                transform: scale(0.5);
                transform-origin: top left;
                border: 1px solid #fa8919;
                border-radius: 6px;
            }
        }    
        a.free {
            position: relative;
            padding-left: 30px;
        }    
        a:hover {
            text-decoration: underline;
        }                     
    }
    li:nth-child(2n-1) {
        padding-right: 20px;
    }
}
.p-price {
    height: 35px;
    justify-content: space-between;
    p {
        display: flex;
        align-items: center;
        span {
            color: #fa8919;
            font-size: 18px;
            font-weight: 400;
        }
        s {
            font-weight: 400;
            margin-left: 10px;
            font-size: 13px;
            letter-spacing: 1px;
            color: #888;
        }
    }
    .handle-btn {
        border: none;
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 92px;
        height: 33px;
        color: #fff;
        background: #fa8919;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        font-weight: 400;
    }
}
</style>