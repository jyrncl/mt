<template>
  <div class="m-geo">
    <span>
      <i class="el-icon-location"></i>
      {{cityName || '乐平'}}
    </span>
    <router-link :to="{ name: 'changeCity' }" class="change">切换城市</router-link>
    [ <a href="#">景德镇</a>
    <a href="#">鄱阳</a>
    <a href="#">婺源</a> ]
    <div class="m-geo-login" v-if="isLogin">
      <router-link :to="{ name: 'myself' }">{{account}}</router-link>
      <router-link :to="{ name: 'index' }" @click.native="click">退出</router-link>
    </div>
    <div class="m-geo-login" v-else>
      <router-link :to="{ name: 'login' }">立即登录</router-link>
      <router-link :to="{ name: 'register' }">注册</router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  created() {
    console.log(this.$store.state.isLogin);
  },
  computed: {
    ...mapState({
      cityName: state => state.cityName,
      account: state => state.account,
      isLogin: state => state.isLogin
    })
  },
  methods: {
    click() {
      this.$store.commit('exit',false);
    }
  }
};
</script>

<style>

</style>