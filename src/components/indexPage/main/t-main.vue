<template>
  <div class="t-main" v-if="classList">
    <div :class="classList[index].headerClass">
      <dt>{{ cardinfo[index].title }}</dt>
      <dd
        :class="{ active: kind == item.tag || item.tag == 'like' }"
        v-for="(item, i) in cardinfo[index].children"
        :key="item + i"
        :data-tag="item.tag"
        @mouseenter="enter(i)"
        @mouseover="over"
      >
        {{ item.title }}
      </dd>
      <router-link :to="{ name: 's' }">
        <span>全部</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
    <div :class="classList[index].contentClass">
      <router-link :to="{ name: 's' }">
        <div
          :class="classList[index].cardClass"
          v-for="(m, n) in cardinfo[index].children[num].children"
          :key="m + n"
        >
          <img :src="m.imgurl" alt="" :class="classList[index].cardImgClass"/>
          <div class="info" v-if="cardinfo[index].title == '推荐民宿'">
            <p class="msg">{{ m.msg }}</p>
            <p class="address">{{m.address}}</p>
            <p class="price">￥{{m.price}}</p>
          </div>
          <div class="info" v-else>
            <p class="msg">{{ m.msg }}</p>
            <el-rate
              class="score"
              v-model="m.score"
              disabled
              disabled-void-color="#999"
              text-color="#ff9900"
              score-template="{m.score}"
            >
            </el-rate>
            <span class="evaluate">{{m.evaluatenum}}个评价</span>
            <p class="address">{{m.address}}</p>
            <p class="price">
              ￥{{m.price}}
              <span>起</span>
            </p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api.js'
export default {
  created() {
    api.getMainTCenter().then((res) => {
      this.cardinfo = res.data.data.cardinfo;
      this.classList = res.data.data.classList;
    });
  },
  props: ["index"],
  data() {
    return {
      num: 0,
      kind: "tj",
      cardinfo: [],
      classList: ''
    };
  },
  methods: {
    enter(i, e) {
      this.num = i;
    },
    over(e) {
      if (e.target.tagName == "DD") {
        this.kind = e.target.getAttribute("data-tag");
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss">
@import "@/assets/scss/indexPage/main/Tmain.scss";
</style>