<template>
  <div class="m-myself">
    <div class="leftNav">
      <dl v-for="(item, index) in leftNavList" :key="item + index">
        <dt @click="initIndex(index)">
          <router-link :to="{ name: item.link }">{{ item.title }}</router-link>
        </dt>
        <dd
          v-for="(v, i) in leftNavList[index].children"
          :key="v + i"
          @click="passIndex(i, index)"
        >
          <span>
            <router-link :to="{ name: item.link }">{{ v }}</router-link>
          </span>
          <i class="el-icon-arrow-right"></i>
        </dd>
      </dl>
    </div>
    <div class="rightContent">
      <router-view :Index="selfIndex" :list="list" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    let self = this;
    setTimeout(function() {
      self.orderList[0].children.push(self.orderValue)
      self.list = self.orderList;
    }, 50);
  },
  data() {
    return {
      Index: 0,
      list: [],
      leftNavList: [
        {
          title: "我的美团",
          link: "userInfo",
          children: [],
        },
        {
          title: "我的订单",
          link: "order",
          children: ["全部订单", "待付款", "待使用", "待评价", "退款/售后"],
        },
        {
          title: "我的收藏",
          link: "collect",
          children: ["收藏的商家", "收藏的团购"],
        },
        {
          title: "抵用券",
          link: "ticket",
          children: ["可用券", "失效券"],
        },
        {
          title: "个人信息",
          link: "setting",
          children: ["账户设置"],
        },
      ],
      orderList: [
        {
          label: "全部订单",
          name: "first",
          notItem: "对不起，没有订单",
          children: [],
        },
        {
          label: "待付款",
          name: "second",
          notItem: "对不起，没有需要付款的订单",
          children: [],
        },
        {
          label: "待使用",
          name: "third",
          notItem: "对不起，没有可以使用的订单",
          children: [],
        },
        {
          label: "待评价",
          name: "fourth",
          notItem: "对不起，没有需要评价的订单",
          children: [],
        },
        {
          label: "退款/售后",
          notItem: "对不起，没有可以退款的订单",
          name: "fifth",
          children: [],
        },
      ],
      collectList: [
        {
          label: "收藏的商家",
          name: "first",
          notItem: "您还没有收藏",
          children: [],
        },
        {
          label: "收藏的团购",
          name: "second",
          notItem: "您还没有收藏",
          children: [],
        },
      ],
      ticketList: [
        {
          label: "可用券",
          name: "first",
          notItem: "暂无可用券",
          children: [],
        },
        {
          label: "失效券",
          name: "second",
          notItem: "暂无失效券",
          children: [],
        },
      ],
    };
  },
  watch: {
    myselfIndex() {
      if (this.myselfIndex == 1) {
        this.list = this.orderList;
      } else if (this.myselfIndex == 2) {
        this.list = this.collectList;
      } else if (this.myselfIndex == 3) {
        this.list = this.ticketList;
      }
    },
  },
  methods: {
    passIndex(index, num) {
      this.initIndex(num);
      this.$store.commit("myselfPageIndex", index);
    },
    initIndex(num) {
      this.$store.commit("myselfPageIndex", 0);
      this.$store.commit("myselfPage", num);
    },
  },
  computed: {
    ...mapState({
      selfIndex: (state) => state.selfIndex,
      myselfIndex: (state) => state.myselfIndex,
      isLogin: (state) => state.isLogin,
      orderValue: (state) => state.orderValue,
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/myself.scss";
</style>