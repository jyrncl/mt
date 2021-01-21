<template>
  <div class="m-setting">
    <p class="info">个人信息</p>
    <p class="userSetting">账户设置</p>
    <p class="username">
      <span class="title">昵称</span>
      <span class="value">{{account}}</span>
      <button>修改</button>
    </p>
    <p class="password">
      <span class="title">登录密码</span>
      <span class="value">安全强度：{{tag}}</span>
      <button @click="click">修改</button>
    </p>
    <div class="change"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      account: state => state.account,
      tag: state => state.tag
    })
  },
  methods: {
    click() {
      console.log(this.tag,this.$store.state.tag);
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/myself/setting.scss";
</style>