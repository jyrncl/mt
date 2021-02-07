<template>
  <div class="m-goodsList-goodsCard">
    <div
      class="card"
      v-for="(item, index) in changePage[pageIndex]"
      :key="item + index"
    >
      <img :src="item.imgurl" alt="" />
      <div class="info">
        <p class="title">{{ item.title }}</p>
        <div class="rate">
          <el-rate
            class="stars"
            v-model="item.score"
            disabled
            text-color="#ff9900"
            score-template="{item.score}"
          >
          </el-rate>
          <span>
            <span v-if="item.score >= 4">很好</span>
            <span v-else-if="item.score >= 3">不错</span>
            <span v-else-if="item.score >= 2">一般</span>
            <span v-else-if="item.score >= 1">很差</span>
            <span v-else>极差</span>
            <span class="score">{{ item.score }}分</span>
          </span>
          <span class="comment">{{ item.commentNum }}人评论</span>
          <p class="address">{{ item.address }}</p>
          <p class="price">人均￥{{ item.price }}</p>
        </div>
        <div class="privilege">
          <div
            v-for="(v, i) in changePage[pageIndex][index].privilege"
            :key="v + i"
          >
            <p class="privilege-info">
              <router-link :to="{name: 'buy'}" @click.native="goodsInfo(item.imgurl,item.title,v.info,v.price,v.sale,i)">{{ v.info }}</router-link>
            </p>
            <span class="privilege-price">￥{{ v.price }}</span>
            <span class="privilege-cost">门市价￥{{ v.cost }}</span>
            <span class="privilege-sale">已售{{ v.sale }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
  },
  props: ["pageIndex",'goodsList'],
  data() {
    return {

    };
  },
  computed: {
    changePage() {
      let len = this.goodsList.length;
      let num = Math.ceil(len / 10);
      let pageDate = [];
      for (let i = 0; i < num; i++) {
        let data = this.goodsList.slice(i * 10, 10 + i * 10);
        pageDate.push(data);
      }
      return pageDate;
    },
  },
  methods: {
    goodsInfo(imgurl,title,info,price,sale,i) {
      this.$store.commit('goodsInfo',{_imgurl:imgurl,_title:title,_info:info,_price:price,_sale:sale,_index:i});
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/goodsCard.scss";
</style>