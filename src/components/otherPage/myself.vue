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
import api from "@/axios/api.js";
import { mapState } from "vuex";
export default {
  created() {
    api.getMyselfList().then((res) => {
      this.leftNavList = res.data.data.leftNavList;
      this.orderList = res.data.data.orderList;
      this.collectList = res.data.data.collectList;
      this.ticketList = res.data.data.ticketList;
      this.orderList[0].children = this.userOrderInfo;
      this.list = this.orderList;
    });
  },
  data() {
    return {
      Index: 0,
      list: [],
      leftNavList: [],
      orderList: [],
      collectList: [],
      ticketList: [],
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
      account: state => state.account,
      selfIndex: (state) => state.selfIndex,
      myselfIndex: (state) => state.myselfIndex,
      isLogin: (state) => state.isLogin,
      userInfo: (state) => state.userInfo,
    }),
    userOrderInfo() {
      let arr = [];
      this.userInfo.forEach(ele => {
        if(ele.account == this.account) {
          arr = ele.orderList;
        }
      });
      return arr;
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/myself.scss";
</style>