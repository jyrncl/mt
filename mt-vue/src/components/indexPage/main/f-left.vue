<template>
  <div class="main-f-left">
    <dl>
      <dt class="main-all-left">全部分类</dt>
      <dd v-for="(item0, index0) in navlist" :key="index0 + item0">
        <i :class="navlist[index0].class"></i>
        <router-link :to="{ name: 'food' }">{{ item0.title }}</router-link>
        <i class="el-icon-arrow-right"></i>
        <div class="menu">
          <dl v-for="(tag, num) in navlist[index0].children" :key="tag + num">
            <dt>
              <span>{{ tag.title }}</span>
              <span class="many">
                <span>更多</span>
                <i class="el-icon-arrow-right"></i>
              </span>
            </dt>
            <dd
              v-for="(child, i) in navlist[index0].children[num].data"
              :key="child + i"
            >
              <router-link :to="{ name: 's' }">{{ child }}</router-link>
            </dd>
          </dl>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
import api from '@/axios/api.js'
export default {
  created() {
    api.getMainFLeft().then((res) => {
      this.navlist = res.data.data;
    });
  },
  data() {
    return {
      navlist: []
    };
  },
};
</script>

<style>
</style>