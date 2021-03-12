<template>
    <div class="ecv2_header">
        <div class="ecv2_header_tools ecv2_container clearfix">
            <div class="left fl">
                <ul>
                    <li><router-link to="/">首页</router-link></li>
                    <li><router-link to="/about">学习导航<i></i></router-link></li>
                    <li><router-link to="/about"><img src="../assets/img/index/icon_top_phone.png" alt="">APP</router-link></li>
                    <li><router-link to="/about"><img src="https://lstatic.educity.cn/educity/pc/cmsng/img/index/icon_top_wechat.png" alt="">微信群</router-link></li>
                    <li><router-link to="/about"><img src="https://lstatic.educity.cn/educity/pc/cmsng/img/index/icon_top_QQ.png" alt="">QQ群</router-link></li>
                </ul>
            </div>
            <div class="fr">
                <router-link to="/"><span>培训证书查询</span></router-link>
                <router-link to="/"><span>违法和不良信息举报</span></router-link>
                <span>客服热线：400-111-9811</span>
                <span class="login_res"><router-link class="login" to="/">登录</router-link>|<router-link class="login" to="/">注册</router-link></span>
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
<style scoped>

.ecv2_header {
    height: 40px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #e6e6e6;
}

.ecv2_header_tools {
    color: #666666;
}

.ecv2_container {
    width: 1200px;
    height: 40px;
    margin: 0 auto;
    position: relative;
}

.ecv2_header_tools .fl>ul {
    margin-top: 0;
}

.ecv2_header_tools .fl>ul>li {
    float: left;
    line-height: 20px;
    position: relative;
    padding: 10px 16px;
    font-size: 12px;
    border-right: 1px solid #f6f6f6;
    border-left: 1px solid #f6f6f6;
}

.ecv2_header_tools i {
    display: inline-block;
    width: 12px;
    height: 8px;
    margin-left: 10px;
    background: url(https://static-test.educity.cn/educity/pc/cmsng/img/index/icon_sub_down.png) no-repeat;
}

.ecv2_header ul>li>a {
    text-decoration: none;
    color: #525f66;
}

.ecv2_header_tools img {
    vertical-align: -4px;
}

.ecv2_header_tools .fr {
    line-height: 40px;
}

.ecv2_header_tools .fr span {
    margin-left: 28px;
}

.ecv2_header_tools .fr a {
    color: #666;
    margin: 0;
}

.ecv2_header_tools .fr .login_res a {
    margin: 0 16px;
}

</style>