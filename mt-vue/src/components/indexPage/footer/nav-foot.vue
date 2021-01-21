<template>
  <div class="nav-foot">
    <p>美团导航</p>
    <div class="nav-foot-content">
      <dl v-for="(item, index) in citylist" :key="item + index">
        <dt>{{ item.title }}</dt>
        <dd v-for="(v, i) in citylist[index].list" :key="v + i">
          <router-link :to="{ name: 's' }">{{ v }}</router-link>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api.js'
export default {
  created() {
    api.getFootNav().then((res) => {
      this.citylist = res.data.data;
    });
  },
  data () {
    return {
      citylist: []
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/footer/Navfoot.scss";
</style>