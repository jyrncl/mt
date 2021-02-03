<template>
  <div class="m-city" v-if="provinceList">
    <div class="m-city-top">
      <div class="m-city-select">
        <span>按省份选择:</span>
        <Select
          title="省份"
          :areaList="provinceList"
          @cityIndex="cityIndex"
          @notShow="notShow"
          @click.native.capture="isShowProvince"
          :showList="provinceFlag"
        />
        <Select
          title="城市"
          :areaList="provinceList[index].children"
          @notShow="notShow"
          @click.native.capture="isShowCity"
          :showList="cityFlag"
        />
      </div>
      <div class="m-city-search">
        <span>直接搜索:</span>
        <input
          type="text"
          placeholder="请输入城市中文"
          v-model="inputVal"
          @input="input"
          @focus="focus"
          @blur="blur"
        />
        <div v-if="isfocus" class="searchList">
          <dl>
            <p></p>
          </dl>
        </div>
        <div v-if="issearch" class="searchList">
          <dl v-for="(item, index) in filterCityList" :key="item + index">
            <router-link
              tag="dd"
              :to="{ name: 'main' }"
              @click.native="changeCity(item)"
              >{{ item }}</router-link
            >
          </dl>
        </div>
      </div>
      <dl class="m-city-hot">
        <dt>热门城市：</dt>
        <dd v-for="(item1, index1) in hotCityList" :key="index1 + item1">
          <router-link
            @click.native="changeCity(item1)"
            :to="{ name: 'main' }"
            >{{ item1 }}</router-link
          >
        </dd>
      </dl>
      <dl class="m-city-recently">
        <dt>最近访问：</dt>
        <dd v-for="(item2, index2) in recentlyList" :key="index2 + item2">
          <router-link
            @click.native="changeCity(item2)"
            :to="{ name: 'main' }"
            >{{ item2 }}</router-link
          >
        </dd>
      </dl>
      <dl class="m-city-letter">
        <dt>按拼音首字母选择：</dt>
        <dd v-for="(item3, index3) in letterList" :key="index3 + item3">
          <a :href="'#city-' + item3">{{ item3 }}</a>
        </dd>
      </dl>
    </div>
    <div class="m-city-content">
      <dl v-for="(v, i) in firstLetterCity" :key="v + i">
        <dt :id="'city-' + v.firstLetter">{{ v.firstLetter }}</dt>
        <dd>
          <span v-for="(m, n) in firstLetterCity[i].city" :key="m + n">
            <router-link @click.native="changeCity(m)" :to="{ name: 'main' }">{{
              m
            }}</router-link>
          </span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import api from "@/axios/api.js";
import Select from "./select.vue";
import { mapState } from "vuex";
export default {
  created() {
    api.getChangeCity().then((res) => {
      this.provinceList = res.data.data.provinceList;
      this.hotCityList = res.data.data.hotCityList;
      this.recentlyList = res.data.data.recentlyList;
      this.letterList = res.data.data.letterList;
      this.firstLetterCity = res.data.data.firstLetterCity;
      res.data.data.firstLetterCity.forEach((ele) => {
        this.cityList.push(...ele.city);
      });
    });
  },
  data() {
    return {
      index: 0,
      isfocus: false,
      provinceFlag: false,
      cityFlag: false,
      provinceList: "",
      inputVal: "",
      hotCityList: [],
      recentlyList: [],
      letterList: "",
      firstLetterCity: [],
      cityList: [],
      filterCityList: [],
      filterTag: "",
    };
  },
  methods: {
    cityIndex(index) {
      this.index = index;
    },
    changeCity(m) {
      console.log(1);
      this.$store.commit("changeCity", m);
    },
    notShow(val) {
      this.provinceFlag = val;
      this.cityFlag = val;
    },
    isShowProvince() {
      this.provinceFlag = true;
      this.cityFlag = false;
    },
    isShowCity() {
      this.provinceFlag = false;
      this.cityFlag = true;
    },
    input() {
      let arr = [];
      arr = this.cityList.filter((ele) => {
        return ele.indexOf(this.inputVal) !== -1;
      });
      this.filterCityList = arr.slice(0, 5);
    },
    focus() {
      this.isfocus = true;
    },
    blur() {
      setTimeout(() => {
        this.isfocus = false;
      },200);
    },
  },
  computed: {
    ...mapState({
      cityName: (state) => state.cityName,
    }),
    issearch() {
      return this.isfocus && this.inputVal;
    },
  },
  components: {
    Select,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/city.scss";
</style>