<template>
  <div class="m-nav">
    <ul class="m-nav-ul">
      <li
        height=""
        :class="item.class"
        v-for="(item, index) in listdata"
        :key="item + index"
      >
        <router-link :to="{ name: 'myself' }">{{ item.title }}</router-link>
        <dl v-show="item.class != 'list5'">
          <dd v-for="(v, i) in listdata[index].children" :key="v + i">
            <router-link @click.native="myselfPage(i)" :to="{ name: v.link }">{{ v.title }}</router-link>
          </dd>
        </dl>
        <el-row class="m-row-nav" v-show="item.class == 'list5'">
          <el-col
            :span="m.width"
            class="m-nav-dl"
            v-for="(m, n) in listdata[index].children"
            :key="m + n"
          >
            <dl :class="m.class" v-show="m.class != 'app'">
              <dt>{{ m.title }}</dt>
              <dd
                v-for="(x, y) in listdata[index].children[n].children"
                :key="x + y"
              >
                <router-link to="/">{{ x.title }}</router-link>
              </dd>
            </dl>
            <dl class="app" v-show="m.class == 'app'">
              <dt>手机应用</dt>
              <dd
                v-for="(a, b) in listdata[index].children[n].children"
                :key="a + b"
              >
                <a :href="a.link" target="_blank"><img :src="a.imgurl" /></a>
              </dd>
            </dl>
          </el-col>
        </el-row>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/axios/api.js";
export default {
  created() {
    api.getHeaderMnav().then((res) => {
      this.listdata = res.data.data;
    });
  },
  data() {
    return {
      listdata: []
    };
  },
  methods: {
    myselfPage(index) {
      this.$store.commit('myselfPage',index+1);
    }
  },
};
</script>

<style>
</style>