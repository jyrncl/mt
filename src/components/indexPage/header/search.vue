<template>
  <div class="m-search">
    <div class="m-search-content">
      <div class="m-search-icon">
        <a href="//bj.meituan.com"
          ><img
            src="https://s0.meituan.net/bs/fe-web-meituan/10afbf1/img/logo.png"
            alt="美团"
        /></a>
      </div>
      <div class="m-serach-input">
        <input
          v-model="input"
          placeholder="搜索商家或地点"
          type="text"
          @focus="focus"
          @blur="blur"
          @input="search"
          @keyup.enter="enter"
        />
        <button @click="toSearch"><i class="el-icon-search btn-icon"></i></button>
        <div v-if="isfocus" class="searchList">
          <dl>
            <p></p>
          </dl>
        </div>
        <div v-if="issearch" class="searchList">
          <dl v-for="(item,index) in list" :key="index+item">
            <router-link @click.native="filterList(item)" tag="dd" :to="{name:'goodsList'}">{{item}}</router-link>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      isfocus: false,
      list: [],
      searchList: ['火锅','自助','火烧','火锅米线','自助烤肉']
    };
  },
  methods: {
    focus() {
      this.isfocus = true;
    },
    blur() {
      setTimeout(() => {
        this.isfocus = false;
      }, 200);
    },
    search() {
      this.list = this.searchList.filter((ele,index) => {
        return ele.indexOf(this.input) != -1;
      });
    },
    enter() {
      if(this.input) {
        this.changePage();
      }
    },
    changePage() {
      this.$store.commit('searchValue',this.input);
      if(this.$route.path !== '/goodsList'){
        this.$router.push('/goodsList');
      }
    },
    toSearch() {
      if(this.input) {
        this.changePage();
      }
    },
    filterList(item) {
      this.input = item;
      this.$store.commit('searchValue',item);
      if(this.$route.path !== '/goodsList'){
        this.$router.push('/goodsList');
      }
    }
  },
  computed: {
    issearch() {
      return this.isfocus && this.input;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/header/search.scss";
</style>