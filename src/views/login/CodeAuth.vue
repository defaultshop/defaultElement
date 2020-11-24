<template>
  <div class="login">
    <span>登录中..........................</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { setToken } from "@/utils/auth";
import { codeLogin } from "@/api/login";
export default {
  data() {
    return {
      code: "",
      accountLogin: true,
      ddLogin: false
    };
  },
  mounted() {
    let code = this.$route.query.code;
    if (code) {
      this.$store
        .dispatch("CodeLogin", code)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
        })
        .catch(() => {
          this.loading = false;
          this.getCode();
        });
      return;
    }
    this.authLogin();
  },
  methods: {
    // 账号密码
    authLogin() {
      window.location.href =
        "http://192.168.1.153:9200/oauth/authorize?client_id=web1&client_secret=123456&response_type=code&scope=server&redirect_uri=http://localhost:3000/auth/login";
    }
  }
};
</script>
<style lang="less" src="./login.less"></style>
