<template>
  <div class="main-f-center">
    <div id="hotlink">
      <router-link
        to="/s"
        v-for="(m ,n) in hotlink"
        :key="m+n"
        :class="m.class"
        >{{ m.title }}</router-link
      >
    </div>
    <el-row class="main-f-center-row">
      <el-col :span="14" id="main-f-center-col">
        <div class="block">
          <el-carousel height="240px" class="main-f-center-carousel">
            <el-carousel-item
              v-for="(item, index) in imglist"
              :key="item + index"
              class="main-f-center-carouselitem"
            >
              <a href="http://hotel.meituan.com/">
                <img id="main-f-center-img1" :src="item" alt="" />
              </a>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="3">
        <router-link :to="{ name: 's' }">
          <img
            id="main-f-center-img2"
            src="http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg"
            alt=""
          />
        </router-link>
      </el-col>
      <el-col :span="4">
        <div id="login" v-if="isLogin">
          <p class="setting">
            <router-link :to="{ name: 'setting' }"
              ><i class="el-icon-setting"></i
            ></router-link>
          </p>
          <img
          @click="changePage(0)"
            src="http://s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png"
            alt=""
          />
          <p @click="changePage(0)">{{account}}</p>
          <div class="self">
            <div class="box" v-for="(v, i) in selflist" :key="v + i">
              <router-link :to="{ name: v.link }" @click.native="changePage(i+1)">
                <i :class="v.class"></i>
                <p>{{ v.title }}</p>
              </router-link>
            </div>
          </div>
        </div>
        <div id="notlogin" v-else>
          <img
            src="https://s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg"
            alt=""
          />
          <p>hi!你好</p>
          <router-link :to="{ name: 'register' }">注册</router-link>
          <router-link :to="{ name: 'login' }">立即登录</router-link>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <router-link :to="{ name: 's' }" id="main-f-imghotel">
          <img
            src="http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png"
            alt=""
          />
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link :to="{ name: 's' }" id="main-f-imgzs">
          <img
            src="http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg"
            alt=""
          />
        </router-link>
      </el-col>
      <el-col :span="3">
        <router-link :to="{ name: 's' }" id="main-f-imgsj">
          <img
            src="http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg"
            alt=""
          />
        </router-link>
      </el-col>
      <el-col :span="5">
        <div id="main-f-code">
          <img
            src="https://s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png"
            alt="下载APP"
          />
          <p>美团APP手机版</p>
          <p class="play">
            <span class="yuan">1元起</span>
            <span>吃喝玩乐</span>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/axios/api.js'
import {mapState} from 'vuex'
export default {
  created() {
    api.getMainFCenter().then((res) => {
      this.imglist = res.data.data.imglist;
      this.selflist = res.data.data.selflist;
      this.hotlink = res.data.data.hotlink;
    });
  },
  data() {
    return {
      imglist: [],
      selflist: [],
      hotlink: []
    }
  },
  methods: {
    changePage(i) {
      if(i == 0){
        this.$router.push('/myself');
      }else{
        this.$store.commit('myselfPage',i);
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      account: state => state.account
    })
  }
};
</script>

<style>
</style>