<template>
  <div class="order">
    <el-tabs v-model="activeName[Index]">
      <el-tab-pane :label="item.label" :name="item.name" v-for="(item,index) in list" :key="item+index">
        <div class="cardList" v-if="list[index].children.length">
          <div class="card" v-for="(v,i) in list[index].children" :key="i+v">
            <img
              :src="v.imgurl"
              alt=""
            />
            <div class="cardInfo">
              <p class="title">{{v.title}}</p>
              <p class="num">数量: {{v.num}}</p>
            </div>
            <p class="price">总价：￥{{v.price}}</p>
            <p class="state">{{v.state}}</p>
          </div>
        </div>
        <div class="cardList" v-else>
          <div class="noCard">{{item.notItem}}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: ['Index','list'],
  data() {
    return {
      activeName: ["first",'second','third','fourth','fifth'],
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/otherPage/myself/order.scss";
</style>