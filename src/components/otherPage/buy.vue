<template>
  <div class="m-buy">
    <div class="leftImg">
      <img :src="infoValue.imgurl" alt="">
    </div>
    <div class="goodsInfo">
      <p class="title">{{infoValue.title}}</p>
      <p class="info">{{infoValue.info}}</p>
      <p class="price">
        <span class="span-price">团购价</span>
        <span class="sym">￥</span>
        <span class="showPrice">{{infoValue.price}}</span>
        <span class="sale">已售{{infoValue.sale}}</span>
      </p>
      <p class="item">
        <span class="span-item">套餐</span>
        <span :class="{item1:true,active:isactive}">{{infoValue.price}}元餐</span>
      </p>
      <p class="count">
        <span class="span-count">数量</span>
        <el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
      </p>
      <router-link class="btn" :to="{name: 'pay'}" @click.native="pay">立即抢购</router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  created() {
  },
  data() {
    return {
      num: 1,
      isactive: true
    }
  },
  computed: {
    ...mapState({
      infoValue: state => state.infoValue
    }),
  },
  methods: {
    pay() {
      let allPrice = this.num * this.infoValue.price;
      let onePrice = this.infoValue.price
      let item = this.infoValue.price + '元餐'
      this.$store.commit('payInfo',{_imgurl:this.infoValue.imgurl,_item:item,_onePrice:onePrice,_num:this.num,_allPrice:allPrice});
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/buy.scss";
</style>