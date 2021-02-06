<template>
  <div class="m-login">
    <div class="header">
      <a class="logo" href="http://www.meituan.com"></a>
    </div>
    <div class="content">
      <img
        src="https://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
        alt=""
      />
      <div class="loginPage">
        <p class="tag" v-show="warning">
          <i class="el-icon-warning"></i>
          <span>{{ tag }}</span>
        </p>
        <p>
          <span @click="verifys">账号登录</span>
        </p>
        <div class="account">
          <span class="account-left">
            <i class="el-icon-user"></i>
          </span>
          <label for="account"></label>
          <input type="account" id="account" v-model="account" />
        </div>
        <div class="password">
          <span class="password-left">
            <i class="el-icon-lock"></i>
          </span>
          <label for="password"></label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p class="forget">忘记密码?</p>
        <router-link class="login-button" tag="button" :to="{ name: 'main' }"
          >登录</router-link
        >
        <p>
          <span>还没有账号?</span>
          <span class="login-reg">
            <router-link :to="{ name: 'register' }">免费注册</router-link>
          </span>
        </p>
      </div>
    </div>
    <div class="bottom">
      <p class="bottom-nav">
        <span v-for="(item, index) in bottomList" :key="item + index">{{
          item
        }}</span>
      </p>
      <p>
        ©2021 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "@/axios/api.js";
export default {
  created() {},
  data() {
    return {
      warning: false,
      tag: "",
      account: null,
      password: null,
      bottomList: [
        "关于美团",
        "加入我们",
        "商家入驻",
        "帮助中心",
        "美团手机版",
      ],
    };
  },
  computed: {
    ...mapState({
      newAccount: (state) => state.newAccount,
      newPassword: (state) => state.newPassword,
    }),
  },
  methods: {
    verify() {
      let Index = null;
      this.newAccount.forEach(function (ele, index) {
        if (this.account == ele) {
          Index = index;
        }
      },this);
      return (
        this.account === this.newAccount[Index] &&
        this.password === this.newPassword[Index]
      );
    },
    verifys() {
      console.log(this.verify());
    }
  },
  beforeRouteLeave(to, from, next) {
    api
      .postUser({
        username: this.account,
        password: this.password,
        isLogin: true,
      })
      .then((res) => {
        if (to.path == "/main") {
          if (res.data.data.login || this.verify()) {
            this.$store.commit("loginAccount", {
              account: this.account,
              isLogin: true,
            });
            next();
          } else {
            this.warning = true;
            if (!this.account || !this.password) {
              this.tag = "账号或密码不能为空";
            } else {
              this.tag = "账号或密码错误";
            }
            next(false);
          }
        } else {
          next();
        }
      });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/login.scss";
</style>