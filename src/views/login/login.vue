<template>
  <div class="login">
    <div class="login-con">
      <div class="login-logo animate__animated animate__slideInDown">
        <img src="@/assets/img/login-logo.png" alt />
      </div>
      <el-form
        ref="loginForm"
        :model="form"
        @keydown.enter.native="handleSubmit"
        class="animate__animated animate__slideInUp"
      >
        <!--账号密码登录-->
        <div class="animate__animated animate__fadeIn" v-if="accountLogin">
          <div class="title">账号密码登录</div>
          <el-form-item prop="userName" class="mt20">
            <el-input
              v-model="form.userName"
              placeholder="请输入账号"
              size="large"
            >
              <span slot="prepend">
                <i class="iconfont iconzhanghao"></i>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              size="large"
            >
              <span slot="prepend">
                <i class="iconfont iconmima"></i>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item class="confirm">
            <el-button @click="handleSubmit" type="primary" size="large" long
              >登录</el-button
            >
          </el-form-item>
          <div class="link-text" @click="showDDLogin">钉钉扫码登录</div>
        </div>

        <!--钉钉扫码登录-->
        <div class="animate__animated animate__fadeIn" v-if="ddLogin">
          <div class="title">钉钉扫码登录</div>
          <div class="code" id="dd-login-container"></div>
          <div class="link-text" @click="showAccountLogin">账号密码登录</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setToken } from "@/utils/auth";
import { getUrlParams } from "@/utils/util";
import { ddLoginRefers } from "@/api/login";
let appid = "dingoa0co1bqr0qdkvmdit";
let redirectUrl = "http://192.168.1.138:8090/login";
let goto = encodeURIComponent(
  `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUrl}`
);
export default {
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      accountLogin: true,
      ddLogin: false,
    };
  },
  mounted() {
    let code = getUrlParams(decodeURIComponent(window.location.href)).code;
    if (code) {
      // let url = "/test/login/loginByCode";
      // url.get({ data: { code } }).then(res => {
      //   debugger;
      // });
      ddLoginRefers(code).then((res) => {
        if (res.success) {
        }
      });
    }
    let authUrl = decodeURIComponent(window.location.href);
    console.log(getUrlParams(authUrl));
    let token = getUrlParams(authUrl).token;
    if (token) {
      setToken(token);
    }
    var hanndleMessage = function (event) {
      var origin = event.origin;
      console.log("origin", event.origin);
      if (origin == "https://login.dingtalk.com") {
        let loginTmpCode = event.data;
        window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUrl}&loginTmpCode=${loginTmpCode}`;
      }
    };
    if (typeof window.addEventListener != "undefined") {
      window.addEventListener("message", hanndleMessage, false);
    } else if (typeof window.attachEvent != "undefined") {
      window.attachEvent("onmessage", hanndleMessage);
    }
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    // 账号密码
    showAccountLogin() {
      this.accountLogin = true;
      this.ddLogin = false;
    },
    // 钉钉扫码
    showDDLogin() {
      this.accountLogin = false;
      this.ddLogin = true;
      this.$nextTick(() => {
        DDLogin({
          id: "dd-login-container",
          goto: goto,
          style: "border:none;background-color:transparent;margin-top:-40px;",
          width: "240",
          height: "260",
        });
      });
    },
    //账号密码登录
    handleSubmit() {
      if (!this.form.userName) return this.$Message.error("请输入账号");
      if (!this.form.password) return this.$Message.error("请输入密码");
    },
  },
};
</script>
<style lang="less" src="./login.less"></style>
