<template>
  <el-row class="m-row-geo">
    <el-col :span="10" class="m-col-geo">
      <geo />
    </el-col>
    <el-col :span="14" class="m-col-nav">
      <mnav />
    </el-col>
  </el-row>
</template>

<script>
import geo from "./geo.vue";
import mnav from "./mnav.vue";
export default {
  components: {
    geo,
    mnav
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/header/top.scss"
</style>