<template>
    <div class="explore-banner" v-if="indexLive.title">
        <div class="title">极客Live</div>
        <div class="banner-box live-box">
            <a class="link-box" target="_blank">
                <img :src="indexLive.web_cover" />
            </a>
            <div class="stitle">{{indexLive.title}}</div>
            <div class="time">时间：{{getLiveTime(indexLive.live_time)}}</div>                            
        </div>
    </div>
</template>
<script>
import { formatLiveTime } from '@/common/util.js';

export default {
    props: {
        indexLive: Object
    },
    setup() {
        const getLiveTime = (time) => {
            return formatLiveTime(time);
        }  
        return {
            getLiveTime
        };
    },
}
</script>
<style lang="scss" scoped>
.banner-box.live-box {
    height: auto;
    .stitle {
        color: #404040;
        font-weight: 400;
        font-size: 14px;
        text-align: left;
        margin-top: 8px;
        padding-left: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .time {
        color: #888;
        font-size: 13px;
        text-align: left;
        padding-left: 8px;
    }
}
</style>