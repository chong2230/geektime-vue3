<template>
    <div class="common-header-container">
        <div class="common-header white fixed">
            <div class="common-header-wrapper">
                <router-link class="common-logo" to="/"></router-link>
                <div class="info">
                    <div class="menu">
                        <!-- <router-link class="menu-item" :class="{ active: index==0 }" to="/horde" v-for="(item, index) in menus" :key="index">{{item.name}}</router-link> -->
                        <a class="menu-item" :class="{ on: index==0 }" :href="item.link" v-for="(item, index) in menus" :key="index">{{item.name}}</a>
                        <!-- <router-link class="menu-item on" to="/horde">部落</router-link>
                        <router-link class="menu-item" to="/university">极客大学</router-link>
                        <router-link class="menu-item" to="/">Go进阶训练营</router-link>
                        <router-link class="menu-item" to="/">架构实战营</router-link>
                        <router-link class="menu-item" to="/enterprise">企业版</router-link>
                        <router-link class="menu-item" to="/mall">极客商城</router-link>
                        <router-link class="menu-item" to="/exchange">兑换中心</router-link>
                        <router-link class="menu-item" to="/download">App下载</router-link> -->
                    </div>
                </div>
            </div>
            <div class="fixed-rect"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        menus: Array
    },
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>

.common-header-container {
    min-width: inherit;
}

.common-header {
    height: 65px;
    background: #fff;
    font-family: Avenir,Helvetica,Arial,sans-serif!important;
    border-bottom: 1px solid #eaeaea;
    min-width: inherit;

    .common-header-wrapper {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        .common-logo {
            width: 120px;
            height: 65px;
            background-image: url(https://static001.geekbang.org/static/time/img/geek_elements/logo-wap.png);
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }
        
    }
}
.common-header.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
}
.info {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .menu {
        opacity: 1;
        transition: opacity .3s ease-out;
        white-space: nowrap;

        a {
            font-size: 16px;
            position: relative;
            padding: 8px 12px;
            font-weight: 400;
            transition: color .2s ease;
            white-space: nowrap;
        }
        a:link, a:visited {
            color: #353535;
        }
        a.on {
            color: #fa8919;
        }
    }
}
</style>