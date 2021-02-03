<template>
  <div class="m-register">
    <div class="header">
      <div class="logo">
        <a href="#"></a>
      </div>
      <div class="login">
        <span>已有账号?</span>
        <router-link :to="{ name: 'login' }" tag="button">登录</router-link>
      </div>
    </div>
    <div class="content">
      <div class="account">
        <label for="account">用户名</label>
        <input type="text" id="account" v-model="account" @blur="accountBlur" />
        <span class="warning" v-if="isAccountWarning">
          <i class="el-icon-warning"></i>
          <span>{{ accountWarning }}</span>
        </span>
      </div>
      <div class="password">
        <label for="password">创建密码</label>
        <input
          type="password"
          id="password"
          v-model="password"
          @keyup="passwordKeyup"
          @blur="passwordBlur"
        />
        <span class="warning" v-if="isPasswordWarning">
          <i class="el-icon-warning"></i>
          <span>{{ passwordWarning }}</span>
        </span>
      </div>
      <div class="background">
        <div :class="strongClass"></div>
        <div class="strength">
          <span>弱</span>
          <span>中</span>
          <span>强</span>
        </div>
      </div>
      <div class="confirm">
        <label for="confirm">确认密码</label>
        <input
          type="password"
          id="confirm"
          v-model="confirm"
          @blur="confirmBlur"
        />
        <span class="warning" v-if="isConfirmWarning">
          <i class="el-icon-warning"></i>
          <span>{{ confirmWarning }}</span>
        </span>
      </div>
      <router-link tag="button" :to="{name: 'register'}" @click.native="submit" class="submit"
        >同意以下协议并注册</router-link
      >
      <p class="agreement">
        <a href="#">《美团用户服务协议》</a>
        <a href="#">《美团隐私政策》</a>
      </p>
    </div>
    <div class="bottom">
      <a href="#">©meituan.com 京ICP证070791号 京公网安备11010502025545号</a>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api.js";
export default {
  created() {},
  data() {
    return {
      strongClass: "nothing",
      account: "",
      password: "",
      confirm: "",
      accountWarning: "",
      passwordWarning: "",
      confirmWarning: "",
      isAccountWarning: false,
      isPasswordWarning: false,
      isConfirmWarning: false,
    };
  },
  methods: {
    accountBlur() {
      let len = this.account.length;
      if (!this.account) {
        this.isAccountWarning = true;
        this.accountWarning = "请输入用户名";
      } else if (!this.account.match(this.usernameReg) || len > 8) {
        this.isAccountWarning = true;
        this.accountWarning = "请输入5~8位字符的用户名";
      } else if (this.account.length <= 8) {
        this.isAccountWarning = false;
      }
    },
    passwordBlur() {
      let len = this.password.length;
      let reg = this.passwordReg;
      if (!this.password) {
        this.isPasswordWarning = true;
        this.passwordWarning = "请填写密码";
      } else if (len < 8) {
        this.isPasswordWarning = true;
        this.passwordWarning = "密码太短，至少8个字符";
      } else {
        this.isPasswordWarning = false;
      }
    },
    confirmBlur() {
      if (!this.confirm) {
        this.isConfirmWarning = true;
        this.confirmWarning = "请再次输入密码";
      } else if (this.password !== this.confirm) {
        this.isConfirmWarning = true;
        this.confirmWarning = "两次输入的密码不一致，请重新输入";
      } else {
        this.isConfirmWarning = false;
      }
    },
    passwordKeyup() {
      let len = this.password.length;
      if (len == 0) {
        this.strongClass = "nothing";
        this.$store.commit("passwordStreng", "");
      } else if (len > 0 && len <= 8) {
        this.strongClass = "weak";
        this.$store.commit("passwordStreng", "弱");
      } else if (len >= 8 && len <= 16 && this.password.match(/[A-z]/g)) {
        this.strongClass = "middle";
        this.$store.commit("passwordStreng", "中");
      } else if (len > 16 && this.password.match(/[A-z]/g)) {
        this.strongClass = "strong";
        this.$store.commit("passwordStreng", "强");
      }
    },
    submit() {
      this.accountBlur();
      this.passwordBlur();
      this.confirmBlur();
      this.$store.commit("register", {
        account: this.account,
        password: this.password,
      });
    },
  },
  computed: {
    usernameReg() {
      let reg = /[0-9A-z]{5,8}/g;
      return reg;
    },
    passwordReg() {
      let reg = /[0-9A-z]{8,}/g;
      return reg;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/register.scss";
</style>