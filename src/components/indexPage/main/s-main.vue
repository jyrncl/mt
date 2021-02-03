<template>
  <div class="s-main">
    <div class="s-main-header">
      <dt>猫眼电影</dt>
      <dd @mouseenter="changeKind('now')" :class="{active:isactive}">正在热映</dd>
      <dd @mouseenter="changeKind('future')" :class="{active:!isactive}">即将上映</dd>
      <router-link :to="{ name: 's' }" class="s-main-header-all">
        <span>全部</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <div class="s-main-content">
      <div class="card-btn">
        <div class="card-left" @click="leftbtn">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="card-right" @click="rightbtn">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
        <div class="content-card" ref="card">
        <div
          class="s-main-content-card"
          v-for="(item, index) in cardlist[num]"
          :key="item + index"
        >
          <router-link :to="{ name: 's' }">
            <img :src="item.imgurl" alt="" />
            <div class="info">
              <p v-if="item.isfuture">
                <span class="score">{{ item.score }}</span>
                <span class="ping">人想看</span>
              </p>
              <p v-else>
                <span class="ping">观众评</span>
                <span class="score">{{ item.score }}</span>
              </p>
              <p class="name">{{ item.name }}</p>
              <span class="buy" v-if="item.isfuture == false">购票</span>
              <span class="buy" v-else-if="item.isfuture&&item.buy">预售</span>
            </div>
            <span class="tag" v-if="item.tag">{{ item.tag }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api.js'
export default {
  created() {
    api.getMainSCenter().then((res) => {
      this.cardlist = res.data.data;
    });
  },
  data() {
    return {
      num: 0,
      isactive: true,
      leftvalue: 0,
      cardlist: []
    };
  },
  methods: {
    changeKind(kind) {
      if (kind == "now") {
        this.num = 0;
        this.isactive = true;
      } else if (kind == "future") {
        this.num = 1;
        this.isactive = false;
      }
    },
    leftbtn() {
      if (this.leftvalue < 0) {
        this.leftvalue += 1150;
        this.$refs.card.style.left = this.leftvalue + "px";
      }
    },
    rightbtn() {
      if (this.leftvalue >= 0) {
        this.leftvalue -= 1150;
        this.$refs.card.style.left = this.leftvalue + "px";
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/main/Smain.scss";
</style>