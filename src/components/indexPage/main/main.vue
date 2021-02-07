<template>
  <div class="m-main-next">
    <el-row class="m-row-main">
      <el-col :span="5" class="m-col-main">
        <Fleft />
      </el-col>
      <el-col :span="19">
        <Fcenter />
      </el-col>
    </el-row>
    <div class="m-s-main">
      <Smain />
      <Tmain :index="0" />
      <Tmain :index="1" />
    </div>
  </div>
</template>

<script>
import Fleft from "./f-left.vue";
import Fcenter from "./f-center.vue";
import Smain from "./s-main.vue";
import Tmain from "./t-main.vue";
export default {
  data() {
    return {};
  },
  beforeRouteLeave(to, from, next) {
    if (this.isAllow(to.name)) {
      if (this.$store.state.isLogin) {
        next();
      } else {
        next({ name: "login" });
      }
    } else {
      next();
    }
  },
  methods: {
    isAllow(name) {
      switch (name) {
        case "userInfo":
          return true;
          break;
        case "order":
          return true;
          break;
        case "collect":
          return true;
          break;
        case "ticket":
          return true;
          break;
        case "setting":
          return true;
          break;
        case "goodsList":
          return true;
          break;
      }
    },
  },
  components: {
    Fleft,
    Fcenter,
    Smain,
    Tmain,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/main/main.scss";
</style>