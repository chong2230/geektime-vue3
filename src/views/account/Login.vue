<template>
    <div class="login-page page">
        <div class="home-bg"></div>
        <div class="sms-login">
            <div class="card">
                <div class="quick-operation" @click="switchMode">
                    <div class="operation-icon" :class="'mode-'+mode"></div>
                    <div class="operation-tips">
                         {{ mode == 2 ? ' 返回登录/注册 ' : ' 下载 App 学习 '}}
                        <div class="arrow"></div> 
                    </div>
                </div>
                <div class="login-form" v-if="mode == 1 && type == 1 && step == 1">
                    <h1 class="title">登录/注册</h1>
                    <div class="sub-title">新人注册可得 88 元礼券</div>
                    <div class="cellphone-item">
                        <div gk-form="" data-size="" data-color="common" class="cellphone-sec gkui-form-element gkui-form-element-text" gktext-color="common" gktext-size="" gk-text="true" invalid="true">
                            <div class="country-sec" @click="showCountryCode">+{{countryCode}}</div>
                            <input name="cellphone" autocomplete="off" placeholder="手机号" maxlength="11" gktext-input="" type="text" class="phone-input gkui-form-text" v-model="phone">
                            <CountryCode :list="cellphoneList" :show="showCellPhone" @choose="chooseCountryCode" @close="showCountryCode(false)"></CountryCode>
                            <span gk-form-element-error="" class="gkui-form-error" v-if="isPhoneError">请输入正确的手机号</span>
                        </div>
                    </div>
                    <div class="button-wrap">
                        <div gk-button="" gkbtn-color="login" gkbtn-size="" class="captcha-btn" @click="getCaptcha"> 获取验证码 </div>
                    </div>
                </div>
                <div class="verification-code login-form" v-else-if="mode == 1 && type == 1 && step == 2">
                    <h1 class="title">输入验证码</h1>
                    <div class="sub-title">验证码已发送至 +{{countryCode}} {{phone}}</div>
                    <div class="gkui-form account-form">
                        <div class="captcha-wrapper" type="number">
                            <div gk-form="" data-size="" data-color="common" class="gkui-form-element gkui-form-element-text" gktext-color="common" gktext-size="" gk-text="true" invalid="true">
                                <input name="code" autocomplete="off" placeholder="" maxlength="6" gktext-input="" type="text" class="gkui-form-text" value="">
                                <div gk-button="" gkbtn-color="" gkbtn-size="" class="btn-container send-button" @click="getCaptcha"> 获取验证码 </div><!---->
                                <span gk-form-element-error="" class="gkui-form-error" v-if="isVerifyCodeError">请输入正确的短信验证码</span>
                            </div>
                        </div>
                    </div>
                    <div class="button-wrapper">
                        <div gk-button="" gkbtn-color="login" gkbtn-size="" class="btn-container login-btn" @click="login"> 登录 </div>
                    </div>
                </div>
                <div class="down-panel" v-else-if="mode == 2">
                    <img src="data:image/png;base64,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">
                    <p>
                        扫码下载
                        <span>极客时间 App </span>
                        学习
                    </p>
                </div>
                <div class="login-form password-form" v-else-if="type == 2">
                    <h1 class="title">密码登录</h1>
                    <div class="sub-title">新人注册可得 88 元礼券</div>
                    <div class="gkui-form account-form cellphone-item">
                        <div gk-form="" data-size="" data-color="common" class="gkui-form-element gkui-form-element-text" gktext-color="common" gktext-size="" gk-text="true">
                            <div gk-form-custom-group="" class="country-sec" @click="showCountryCode">
                                <input type="hidden" :value="countryCode">
                                <span>+{{countryCode}}</span>
                                <i class="iconfont Cellphone_arrow"></i>
                            </div>
                            <input name="cellphone" autocomplete="off" placeholder="手机号" maxlength="11" gktext-input="" type="text" class="gkui-form-text" value="13552774423">
                            <CountryCode :list="cellphoneList" :show="showCellPhone" @choose="chooseCountryCode" @close="showCountryCode(false)"></CountryCode>
                        <div>
                    </div>
                </div>
                <div gk-form="" data-size="" data-color="common" class="gkui-form-element gkui-form-element-text" gktext-color="common" gktext-size="" valid="true">
                <input name="password" autocomplete="off" placeholder="密码" maxlength="24" gktext-input="" type="password" class="gkui-form-text" value="">
                <div class="action-icon">
                    <i class="iconfont operation-icon Password_show"></i>
                    </div>
                    </div>
                </div>
                <div class="forgot">
                    <a href="/forgot" class="">忘记密码</a>
                    </div><div class="button-wrapper">
                        <div gk-button="" gkbtn-color="login" gkbtn-size="" class="btn-container"> 登录 </div>
                    </div>
                </div>
                <a class="change-login" v-if="mode == 1 && type == 1" @click="switchType(2)">密码登录</a>
                <a class="change-login" v-if="mode == 1 && type == 2" @click="switchType(1)">验证码登录</a>
                <div class="placeholder"></div>
                <div class="third-party-sec">
                    <ul class="third-operation">
                        <li>
                            <i class="iconfont icon-wechat"></i>
                        </li>
                        <li>
                            <i class="iconfont icon-qq"></i>
                        </li>
                        <li>
                            <i class="iconfont icon-weibo"></i>
                        </li>
                    </ul>
                    <div class="agree">
                        <span>登录即表示同意极客邦</span>
                        <a href="https://time.geekbang.org/agreement" target="_black">《用户协议》</a>
                        <span>和</span>
                        <a href="https://time.geekbang.org/private" target="_black">《隐私政策》</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import api from '@/services/account.js'
import CountryCode from './components/CountryCode.vue'
import accountData from '@/mock/account/index.js'

export default {
    components: {
        CountryCode
    },
    setup() {
        const state = reactive({
            cellphoneList: [],
            countryCode: 86,
            phone: '',
            verifyCode: '',
            step: 1,    // 登录步骤
            mode: 1,    // 登录模式，1: pc 2: app qrcode 
            type: 1,    // 登录类型，1: 手机验证码登录 2: 密码登录 
            showCellPhone: false,
            isPhoneError: false,
            isVerifyCodeError: false
        })

        onMounted(()=>{
            loadData();
        })

        function loadData() {
            getCellphoneList();
        }

        async function getCellphoneList() {
            /*
            const res = await api.getCellphoneList({v_t: new Date().getTime()})
            // 451 Unavailable For Legal Reasons
            if (res.code == 0) {
                state.cellphoneList = res.data
            }
            */
           state.cellphoneList = accountData['/account/cellphone/list'].data
        }

        const showCountryCode = (bool) => {
            state.showCellPhone = bool ? bool : !state.showCellPhone;
        }

        const chooseCountryCode = (item) => {
            console.log(item);
            state.countryCode = item.code
            showCountryCode(false)
        }

        const switchMode = () => {
            state.mode = 3 - state.mode
        }

        const switchType = (type) => {
            state.type = type;
        }

        const getCaptcha = () => {
            if (!state.phone) {
                state.isPhoneError = true;
                return;
            }
            state.step = 2;
        }

        const login = () => {
            if (!state.verifyCode) {
                state.isVerifyCodeError = true;
                return;
            }
            // TODO: send login request
        }

        return {
            ...toRefs(state),
            showCountryCode,
            chooseCountryCode,
            switchMode,
            switchType,
            getCaptcha,
            login
        }
    },
}
</script>
<style lang="scss" scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // height: 100vh;
    min-height: 100vh;
}
.home-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-image: url(https://static001.geekbang.org/static/account/img/home-time-bg-day.a873036f.png);
    background-repeat: no-repeat;
    background-size: 1920px 1080px;
    background-position: 50%;
}
.card {
    position: relative;
    box-sizing: border-box;
    width: 420px;
    padding: 41px 40px 0;
    // margin: 160px auto 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 14px 2px hsl(0deg 0% 87% / 46%);
    margin: -65px 0 0 480px;
    .quick-operation {
        position: absolute;
        right: 0;
        top: 0;
        user-select: none;
        .operation-icon {
            overflow: hidden;
            position: relative;
            width: 56px;
            height: 56px;
            border-radius: 0 8px 0 0;
            background: url(https://static001.geekbang.org/static/account/img/app-code.affbaea0.png) no-repeat;
            background-size: contain;
            cursor: pointer;
            &:after {
                content: "";
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 80px;
                height: 50px;
                background: #fff;
                transform: rotate(45deg);
                transform-origin: left top;
                transition: transform .3s ease;
                pointer-events: none;
            }
            &.mode-2 {
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAYAAADG4PRLAAABz0lEQVR4nO3bMc9LYRzG4ZuIxVCrScQnYDAZTFZmBvEFJCar1eQLGEx2g8Vi8gneVSLexSYMFgt5E4P0kVa1x+mt15V0+Z82Pef8kqdPkzYAcKBOTXXZ355cuJTk6XCAbTw8++jj+19ff2bC27lIcmuYso3Hy6897XZ2E7CcgOUELDflJmadL2uOH6rFJtc9Z8Dzw4QT3ze5C5bQcgKWE7CcgOXm3MT8zodNd2HFTnbhF7c9/X0LuDiggDthCS0nYDkBywlYTsByApYTsJyA5QQsJ2A5AcsJWE7AcgKWE7CcgOUELCdgOQHLCVhOwHIClhOwnIDlBCwnYDkBywlYTsByApYTsJyA5QQst2//0H2V5Nww/T993cVV7VvAu8OElSyh5QQsJ2C5OT8DbwwTNjZnwDfDhI1ZQssJWE7AcgKWE7DclLvQ4yT3h+m8HiS58odn8DbJs2E6r+Pld58y4Kckz4fpvG5vEPDdHp7/wBJaTsByApYTsJyA5QQst28/qVjnTpKba56zytUVx5Zd3/JrxOskL4bpjrUFvJbk3jCdxuWfj7/1+V8EtISWE7Bc2xJ6lOTlMN1PRyXnCQAAAAAAAAAAAAAAAAAAANNL8gMqAB1Mwik2uwAAAABJRU5ErkJggg==);
            }
        }
        .operation-tips {
            position: absolute;
            right: 61px;
            top: 8px;
            padding: 4px 5px;
            border: 1px solid #e5aa42;
            line-height: 1;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            color: #e5aa42;
            .arrow {
                display: block;
                position: absolute;
                z-index: 1;
                width: 0;
                height: 0;
                border-style: solid;
                border-color: transparent;

                // position: absolute;
                right: -5px;
                top: 5px;
                border-width: 5px 0 5px 5px;
                border-left-color: #e5aa42;
                &::after {
                    display: block;
                    position: absolute;
                    z-index: 1;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-color: transparent;

                    right: 1px;
                    margin-top: -5px;
                    border-width: inherit;
                    border-left-color: #fff;
                    content: ""
                }
            }
            .arrow, .arrow::after {
                
            }
        }
    }
}
.login-form {
    .title {
        line-height: 1;
        font-size: 28px;
        font-weight: 500;
        color: #4c4c4c;
    }
    .sub-title {
        position: relative;
        padding-left: 28px;
        margin-top: 13px;
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        color: $baseColor;
        &::before {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 22px;
            height: 18px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAiCAYAAAAkjjtxAAADmklEQVRYhdWYW0gUURjH/3NmzVIwISwskaKbab5UXrCElCWkeqh8CEREBSujHnoxfA9Eg3qw7EYPFW0+lD0UFOHlwTtiFywJumJWD1tZQpa6MxPfmZl1LzO6s7Pp+odl3Dnf5/n5ne985zsKU/XJALATQAOAHAAioksSgH4ANQC6HQB2AWgHEBNloLoogHkAOgAUMi2y0QrrK2JsYFoaLBblEDBbRMBsMcFyhQ8clwqWVQvReTFoyHHsBRwlTyCkFPm9F4tbwPLruG+4shVhMa8SbNtBCBtKvO/oZyEhCULKViijj/3es/W5YBl7gYmRBQCeGIH09K4Knl0+A5acyZ+K+6OfuZh/gj/lweawp4TdCMuDl4DJ3+oXbZmFlZv5U/n0zGunR10ZfQl5oM4WMJ10ilWnmJovtiYlEbzHtceyH0X4m+3Z509uivARAJcp2ramjUuFo+wBX3qpo9H20htIBlBOEb4KIFtrMMIW217NYSmn5Ve3Iw37XGvQbundGmkJgDsADpl5Ud1lGwsMx4SkdUBsPAdW3B9CJgkhj68DOKp1bXD4DEwBqKCOCECioevSBF5fZ1Vs/Nw2oYsKdrUOGwhMGgfQBqDY6Fcqwy3wfB3yfheWJUIsPOWNrNR+Hsqfn0F+VIOFpLW8NkudF6wAU5pO+74IBCZNmnkr3wcA+kDdZOLhZi+s595Jv5PNV9LYGzhKXRyapRVBelhmBdpPgQcHVYqsuZzoIIipauMAc8HqfyjZkC1Ld8JR0RPUZ5goN7BX99100PKlyRR0RRbY7lreE0RC8nAr5N5GdeXMdc03j/UIp2m70RSW19lSlxdWftcH6dEZy9jkQ6ccnzzdCSHdtCjpqgLQp5VeHuF9AO6Hck1imcfBdpTyjaO8dfmNUZtJnRtFzShH9ePc46rk6UNtprB8jZV89gAooU13NtQ7nTzUxD9Bot44Q62n8mvzXAbvIdRxubM2VFBdxHqOUmKLVc9AiXmnebVQxt1BkYeW+xFSiu0rEi0tpQJJ7r5iaCOs1oD1VtSGjOpwSAqsGHzHG6UL2W5yqjajQ5bmMFJYwOL+m3yH65J6b3hzkm/MzAMzxgmr1KaI8ndk1vL1/4CVX5/V57gbUmu9X94qY+8Ne4lI3DYQ7o0DWiRNU8DnUsr198esJ6EVhQ28UGJaJ79YJDO7N415Vj/T/u86HVVYxiLGGgLuAkD3nh7fzj6KREzEVgCg6x+8JCqTdxNCmwAAAABJRU5ErkJggg==) 0 0 no-repeat;
            background-size: 22px 17px;
        }
    }
    .cellphone-item {
        padding-top: 33px;
        
    }
    .country-sec {
        display: flex;
        align-items: center;
        width: 69px;
        height: 49px;
        line-height: 1;
        font-size: 18px;
        font-weight: 500;
        color: #4c4c4c;
        user-select: none;
        cursor: pointer;
        position: relative;
    }
    .btn-container {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1;
        transition: all .3s ease;
        user-select: none;
        touch-action: manipulation;
        cursor: pointer;
    }
}

[gktext-color=common][invalid] {
    margin-bottom: 31px;
    border-color: #ff3b30;
}
[gktext-color=common] {
    border-bottom: 1px solid #e8e8e8;
    color: #4c4c4c;
    height: 50px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
}
.gkui-form-element {
    position: relative;
    box-sizing: border-box;
    display: flex;
    transition: all .3s ease;
}
.gkui-form-element .gkui-form-text, .gkui-form-element .gkui-form-textarea {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
}
.gkui-form-text, .gkui-form-textarea {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    background-color: transparent;
    border: 0;
    outline: none;
    -webkit-appearance: textfield;
}
[gktext-color=common] .gkui-form-error {
    left: 0;
    bottom: -21px;
    height: 14px;
    padding-left: 17px;
    line-height: 17px;
    font-size: 14px;
    font-weight: 400;
    word-break: keep-all;
    white-space: nowrap;
    pointer-events: none;
    color: #ff3b30;
}
[gktext-color=common] .gkui-form-error:before {
    content: "\e665";
    display: block;
    position: absolute;
    left: 0;
    top: 2px;
    font-family: iconfont;
    line-height: 1;
    font-size: 13px;
    font-weight: 400;
}
[gkbtn-color=login] {
    height: 44px;
    background: #fa8919;
    border-radius: 8px;
    line-height: 1;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
}
.gkui-form-error, .gkui-form-tips {
    position: absolute;
}
.button-wrap {
    padding-top: 18px;
    .captcha-btn {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1;
        transition: all .3s ease;
        user-select: none;
        touch-action: manipulation;
        cursor: pointer;
    }
}
.change-login {
    display: block;
    width: 100px;
    margin: 17px auto 29px;
    text-align: center;
    line-height: 1;
    font-size: 16px;
    font-weight: 400;
    color: #888;
    cursor: pointer;
    user-select: none;
}
.third-party-sec {
    margin-top: 45px;
    ul {
        display: flex;
        justify-content: space-between;
        width: 262px;
        height: 38px;
        margin: 0 auto;
        li {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 38px;
            height: 38px;
            background: #f6f7fb;
            border-radius: 50%;
            cursor: pointer;
            user-select: none;
        }
    }
    .agree {
        padding: 23px 0 37px;
        text-align: center;
        line-height: 1;
        font-size: 12px;
        font-weight: 400;
        color: #b2b2b2;
        a {
            color: inherit;
        }
    }
}
.iconfont {
    line-height: 1;
    font-size: 24px;
    font-weight: 400;
}
.icon-wechat {
    color: #46bb36;
    &:after {
        display: flex;
        align-items: center;
        justify-content: center;
        content: "推荐登录";
        position: absolute;
        left: 14px;
        top: -10px;
        width: 104px;
        height: 32px;
        background: #fff;
        border: 2px solid #dcdcdc;
        border-radius: 32px;
        line-height: 1;
        font-size: 22px;
        font-weight: 400;
        color: #767676;
        transform: scale(.5);
        transform-origin: left top;
    }
}
.icon-qq {
    font-size: 26px;
    color: #378afe;
}
.icon-weibo {
    color: #e52541;
}

.verification-code {
    margin: 0 auto;
    h1 {
        line-height: 1;
        font-size: 28px;
        font-weight: 500;
    }
    .sub-title {
        margin-top: 13px;
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        color: #888;
        padding-left: 0;
        &::before {
            width: 0;            
        }
    }
    .account-form {
        padding-top: 33px;
        .captcha-wrapper {
            position: relative;
        }
    }
    .send-button {
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        color: #fa8919;
    }    
}
.down-panel {
    padding: 27px 0 36px;
    border-bottom: 1px solid #e8e8e8;
    img {
        display: block;
        width: 160px;
        height: 160px;
        padding: 8px;
        margin: 0 auto;
        border: 1px solid #e8e8e8;
    }
    p {
        padding-top: 17px;
        text-align: center;
        line-height: 1;
        font-size: 15px;
        font-weight: 400;
        color: #888;
        span {
            color: $baseColor;
        }
    }
}
.forgot {
    display: flex;
    justify-content: flex-end;
    padding: 5px 0 10px;
    a {
        display: block;
        line-height: 1;
        font-size: 16px;
        font-weight: 400;
        color: #888;
        cursor: pointer;
    }
}
.button-wrapper {
    padding-top: 18px;
}

</style>