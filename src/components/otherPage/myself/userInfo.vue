<template>
  <div class="userInfo">
    <div class="topInfo">
      <div class="img">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png"
          alt=""
        />
      </div>
      <p class="username">
        {{ account }}
      </p>
      <p class="setting">
        <router-link :to="{ name: 'setting' }">
          <span>个人信息设置</span>
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </p>
    </div>
    <div class="footInfo">
      <ul>
        <li v-for="(item, index) in settingList" :key="item + index">
          <router-link :to="{ name: 'order' }" @click.native="toOrder(index)">
            <i :class="item.class"></i>
            <span>{{ item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api.js'
import { mapState } from "vuex";
export default {
  created() {
    api.getUserInfo().then(res => {
      this.settingList = res.data.data.settingList;
    });
  },
  data() {
    return {
      settingList: [],
    };
  },
  methods: {
    toOrder(index) {
      this.$store.commit('myselfPageIndex',index);
    }
  },
  computed: {
    ...mapState({
      account: (state) => state.account
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/myself/userInfo.scss";
</style>