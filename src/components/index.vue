<template>
  <el-container class="m-container">
    <el-header class="m-header" height="">
      <Top/>
      <Search/>
    </el-header>
    <el-main class="m-main">
      <router-view/>
    </el-main>
    <el-footer class="m-footer" height="">
      <Navfoot/>
      <Foot/>
      <Bottom/>
    </el-footer>
  </el-container>
</template>

<script>
import Top from './indexPage/header/top.vue'
import Foot from './indexPage/footer/foot.vue'
import Search from './indexPage/header/search.vue'
import Bottom from './indexPage/footer/bottom.vue'
import Navfoot from './indexPage/footer/nav-foot.vue'
export default {
  components: {
    Top,
    Foot,
    Search,
    Bottom,
    Navfoot
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/indexPage.scss";
</style>