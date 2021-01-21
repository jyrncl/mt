<template>
  <div class="m-city">
    <div class="m-city-top">
      <div class="m-city-select">
        <span>按省份选择:</span>
        <Select title="省份" :areaList="provinceList" @cityIndex="cityIndex" />
        <Select title="城市" :areaList="provinceList[index].children" />
      </div>
      <div class="m-city-search">
        <span>直接搜索:</span>
        <input type="text" placeholder="请输入城市中文" />
      </div>
      <dl class="m-city-hot">
        <dt>热门城市：</dt>
        <dd v-for="(item1, index1) in hotCityList" :key="index1 + item1">
          <router-link @click.native="changeCity(item1)" :to="{ name: 'main' }">{{ item1 }}</router-link>
        </dd>
      </dl>
      <dl class="m-city-recently">
        <dt>最近访问：</dt>
        <dd v-for="(item2, index2) in recentlyList" :key="index2 + item2">
          <router-link @click.native="changeCity(item2)" :to="{ name: 'main' }">{{ item2 }}</router-link>
        </dd>
      </dl>
      <dl class="m-city-letter">
        <dt>按拼音首字母选择：</dt>
        <dd v-for="(item3, index3) in letterList" :key="index3 + item3">
          <a :href="'#city-'+item3">{{ item3 }}</a>
        </dd>
      </dl>
    </div>
    <div class="m-city-content">
      <dl v-for="(v, i) in firstLetterCity" :key="v + i">
        <dt :id="'city-'+v.firstLetter">{{ v.firstLetter }}</dt>
        <dd>
          <span v-for="(m, n) in firstLetterCity[i].city" :key="m + n">
            <router-link @click.native="changeCity(m)" :to="{ name: 'main' }">{{ m }}</router-link>
          </span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api.js'
import Select from "./select.vue";
import {mapState} from 'vuex'
export default {
  created() {
    api.getChangeCity().then((res) => {
      this.provinceList = res.data.data.provinceList;
      this.hotCityList = res.data.data.hotCityList;
      this.recentlyList = res.data.data.recentlyList;
      this.letterList = res.data.data.letterList;
      this.firstLetterCity = res.data.data.firstLetterCity;
    });
  },
  data() {
    return {
      index: 0,
      provinceList: [],
      hotCityList: [],
      recentlyList: [],
      letterList: "",
      firstLetterCity: []
    };
  },
  methods: {
    cityIndex(index) {
      this.index = index;
    },
    changeCity(m) {
      this.$store.commit('changeCity',m);
    }
  },
  computed: {
    ...mapState({
      cityName: state => state.cityName
    })
  },
  components: {
    Select,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/city.scss";
</style>