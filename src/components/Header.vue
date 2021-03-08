<template>
    <div class="header">
        <div class="ecv2_hs_logo">
            <div class="ecv2_container clearfix">
                <div class="ecv2_logo fl"></div>
                <div class="ecv2_logo_nav fr">
                    <ul>
                        <li><router-link to="/"><i class="logo_nav_tmall"></i>天猫店</router-link></li>
                        <li><router-link to="/"><i class="logo_nav_jd"></i>京东店</router-link></li>
                        <li><router-link to="/"><i class="logo_nav_book"></i>图书商城</router-link></li>
                        <li><router-link to="/"><i class="logo_nav_video"></i>视频课程</router-link></li>
                        <li><router-link to="/"><i class="logo_nav_live"></i>直播课程</router-link></li>
                        <li><router-link to="/"><i class="logo_nav_study"></i>学习包</router-link></li>
                        <li><router-link to="/"><i class="logo_nav_tiku"></i>题库</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup() {
        
    },
}
</script>
<style>
.ecv2_logo_nav li i[class^="logo_nav_"] {
    display: inline-block;
    width: 20px;
    height: 16px;
    vertical-align: middle;
    top: -2px;
    position: relative;
}
.logo_nav_tmall {
    background: url(../img/index/nav_logo_tmall_n.png) no-repeat;
    background-size: 20px 16px;
    top: -2px;
    position: relative;
}
.logo_nav_jd {
    background: url(../img/index/nav_logo_jd_n.png) no-repeat;
    background-size: 20px 16px;
    /* top: -2px;
    position: relative; */
}
.logo_nav_book {
    background: url(../img/index/nav_logo_book_n.png) no-repeat;
    background-size: 20px 16px;
}
.logo_nav_video {
    background: url(../img/index/nav_logo_video_n.png) no-repeat;
    background-size: 20px 16px;
}
.logo_nav_live {
    background: url(../img/index/nav_logo_live_n.png) no-repeat;
    background-size: 20px 16px;
}
.logo_nav_study {
    background: url(../img/index/nav_logo_study_n.png) no-repeat;
    background-size: 20px 16px;
}
.logo_nav_tiku {
    background: url(../img/index/nav_logo_exercise_n.png) no-repeat;
    background-size: 20px 16px;
}
</style>