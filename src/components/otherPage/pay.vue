<template>
  <div class="m-pay">
    <table>
      <tbody>
        <tr class="title">
          <th class="item">项目</th>
          <th class="onePrice">单价</th>
          <th class="num">数量</th>
          <th class="allPrice">总价</th>
        </tr>
        <tr class="info">
          <td>{{payValue.item}}</td>
          <td>￥{{payValue.onePrice}}</td>
          <td>{{payValue.num}}</td>
          <td>￥{{payValue.allPrice}}</td>
        </tr>
      </tbody>
    </table>
    <p>
      <span>应付金额：￥{{payValue.allPrice}}</span>
    </p>
    <button @click="pay">确认付款</button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  methods: {
    pay() {
      let obj = {
              imgurl: this.payValue.imgurl,
              title: this.payValue.item,
              num: this.payValue.num,
              price: this.payValue.allPrice,
              state: '已完成'
            }
      this.$store.commit('orderInfo',obj);
      alert('付款成功，前往订单查看');
    }
  },
  computed: {
    ...mapState({
      payValue: state => state.payValue
    })
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/pay.scss";
</style>