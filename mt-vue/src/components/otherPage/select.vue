<template>
  <div class="m-select">
    <div class="choose" @click.self="click" v-document-click="showSelect">
      <span class="title">{{ city ? city : title }}</span>
      <i class="el-icon-caret-bottom"></i>
      <dl class="cities" v-show="isshow">
        <dt>{{ title }}</dt>
        <dd class="city" v-for="(v, i) in renderList" :key="i + v">
          <p v-if="v[i].province">
            <span
              v-for="(item, index) in renderList[i]"
              :key="item + index"
              :class="{ active: item.isactive, notactive: !item.isactive }"
              @click="isActive(item, index, i)"
              >{{ item.province }}</span
            >
          </p>
          <p v-else>
            <span
              v-for="(item, index) in renderList[i]"
              :key="item + index"
              :class="{ active: item.isactive, notactive: !item.isactive }"
              @click="isActive(item, index, i)"
              ><router-link @click.native="changeCity(item.city)" :to="{ name: 'main' }">{{
                item.city
              }}</router-link></span
            >
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "areaList"],
  data() {
    return {
      isshow: false,
      selectCity: false,
      city: "",
      prevIndex: [],
    };
  },
  methods: {
    click(e) {
      e.stopPropagation();
      this.isshow = true;
    },
    isActive(item, index, i) {
      let num = index + i * 12;
      this.prevIndex.push(num);
      const len = this.prevIndex.length;
      const prev = this.prevIndex[len - 2];
      this.areaList[0].isactive = false;
      if (prev) {
        this.areaList[prev].isactive = false;
      }
      item.isactive = !item.isactive;
      if (item.province) {
        this.city = item.province;
      } else {
        this.city = item.city;
      }
      this.isshow = false;
      this.$emit("cityIndex", num);
    },
    showSelect() {
      this.isshow = false;
    },
    changeCity(m) {
      this.$store.commit('changeCity',m);
    }
  },
  computed: {
    renderList() {
      let num = Math.ceil(this.areaList.length / 12);
      let dataList = [];
      for (let i = 0; i < num; i++) {
        let data = this.areaList.slice(i * 12, i * 12 + 12);
        dataList.push(data);
      }
      return dataList;
    },
  },
};
</script>

<style>
</style>