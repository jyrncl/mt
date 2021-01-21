<template>
  <div class="m-foot">
    <div
      :class="item.class"
      v-for="(item, index) in footList"
      :key="item + index"
    >
      <dl v-for="(v, i) in footList[index].children" :key="v + i">
        <dt>{{ v.title }}</dt>
        <dd v-for="(m, n) in footList[index].children[i].list" :key="m + n">
          <router-link to="/s">{{ m }}</router-link>
        </dd>
      </dl>
      <p v-show="item.class == 'm-fifth'">
        <router-link to="/s">商家自助入驻美团入口</router-link>
      </p>
      <p v-show="item.class == 'm-fifth'">
        <router-link to="/s">供应商注册入口</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api.js'
export default {
  created() {
    api.getFoot().then((res) => {
      this.footList = res.data.data;
    });
  },
  data() {
    return {
      footList: []
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/footer/foot.scss";
</style>