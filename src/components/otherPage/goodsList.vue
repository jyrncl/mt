<template>
  <div class="m-goodsList">
    <div class="m-crumb">
      <span>
        <router-link :to="{ name: 'main' }">{{ cityName }}美团</router-link>
        <i class="el-icon-arrow-right"></i>
      </span>
      <span>
        <router-link :to="{ name: 'goodsList' }"
          >{{ cityName }}{{searchTag}}</router-link
        >
      </span>
    </div>
    <div class="m-goodsList-nav">
      <dl class="m-goodsList-kind">
        <dt>分类</dt>
        <dt class="m-goodsList-all">全部</dt>
        <dd>
          <span
            >美食
            <i class="el-icon-caret-bottom"></i>
          </span>

          <dl>
            <dt>美食</dt>
            <dd v-for="(item, index) in foodList" :key="item + index">
              {{ item }}
            </dd>
          </dl>
        </dd>
      </dl>
      <dl class="m-goodsList-area">
        <dt>区域</dt>
        <dt class="m-goodsList-all">全部</dt>
        <dd>
          <span v-for="(v, i) in areaList" :key="v + i">{{ v }}</span>
        </dd>
      </dl>
    </div>
    <div class="m-goodList-content">
      <div class="sort">
        <span :class="{ active: isActiveDefault }" @click="defaultSort"
          >智能排序</span
        >
        <span :class="{ active: isActivePrice }" @click="priceSort">{{
          priceSortList[priceSortIndex]
        }}</span>
        <span :class="{ active: isActivePeople }" @click="peopletSort"
          >人气最高</span
        >
        <span :class="{ active: isActiveScore }" @click="scoreSort"
          >评价最高</span
        >
      </div>
      <goodsCard :pageIndex="pageIndex" :goodsList="filterData" />
    </div>
    <div class="m-goodList-changePage">
      <el-pagination
        class="changePage"
        background
        layout="prev, pager, next"
        :total="filterData.length"
        @prev-click="prevPage"
        @next-click="nextPage"
        @current-change="curPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api.js";
import goodsCard from "./goodsCard";
import { mapState } from "vuex";
export default {
  created() {
    api.getGoodsList().then((res) => {
      this.priceSortList = res.data.data.priceSortList;
      this.foodList = res.data.data.foodList;
      this.areaList = res.data.data.areaList;
      this.goodsList = res.data.data.goodsList;
      this.filterValue();
    });
  },
  data() {
    return {
      pageIndex: 0,
      isActiveDefault: true,
      isActivePrice: false,
      isActivePeople: false,
      isActiveScore: false,
      priceSortList: [],
      priceSortIndex: 0,
      foodList: [],
      areaList: [],
      goodsList: [],
      filterData: []
    };
  },
  watch: {
    searchTag() {
      this.filterValue();
    }
  },
  methods: {
    prevPage() {
      if (this.pageIndex > 0) {
        this.pageIndex--;
      }
    },
    nextPage() {
      if (this.pageIndex < 2) {
        this.pageIndex++;
      }
    },
    curPage(index) {
      this.pageIndex = index - 1;
    },
    isActive() {
      this.isActiveDefault = false;
      this.isActivePrice = false;
      this.isActivePeople = false;
      this.isActiveScore = false;
    },
    defaultSort() {
      this.isActive();
      this.priceSortIndex = 0;
      this.isActiveDefault = true;
      this.sort("id", "smallTobig");
    },
    priceSort() {
      this.isActive();
      this.isActivePrice = true;
      if (this.priceSortIndex >= 0 && this.priceSortIndex < 2) {
        this.priceSortIndex++;
      } else {
        this.priceSortIndex = 0;
      }
      if (this.priceSortIndex == 1) {
        this.sort("price", "smallTobig");
      } else if (this.priceSortIndex == 2) {
        this.sort("price", "bigTosmall");
      } else {
        this.sort("id", "smallTobig");
      }
    },
    peopletSort() {
      this.isActive();
      this.priceSortIndex = 0;
      this.isActivePeople = true;
      this.sort("commentNum", "bigTosmall");
    },
    scoreSort() {
      this.isActive();
      this.priceSortIndex = 0;
      this.isActivescore = true;
      this.sort("score", "bigTosmall");
    },
    sort(what, direction) {
      if (direction == "bigTosmall") {
        this.filterData.sort((a, b) => {
          return b[what] - a[what];
        });
      } else if (direction == "smallTobig") {
        this.filterData.sort((a, b) => {
          return a[what] - b[what];
        });
      }
    },
    filterValue() {
      let data = this.goodsList.filter((ele, index) => {
        return ele.title.indexOf(this.searchTag) != -1;
      });
      this.filterData = data;
    },
  },
  computed: {
    ...mapState({
      cityName: (state) => state.cityName,
      searchTag: (state) => state.searchTag
    })
  },
  components: {
    goodsCard,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/goodsList.scss";
</style>