import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    cityName: '乐平',
    searchTag: '',
    selfIndex: 0,
    infoValue: {
      imgurl: '',
      title: '',
      info: '',
      price: 0,
      sale: 0,
      index: 0
    },
    payValue: {
      imgurl: '',
      item: '',
      onePrice: 0,
      num: 0,
      allPrice: 0
    },
    orderValue: [],
    myselfIndex: 0,
    account: '',
    tag: '弱',
    isLogin: false,
    newAccount: [],
    newPassword: []
  },
  getters: {},
  mutations: {
    changeCity (state, name) {
      state.cityName = name
    },
    loginAccount (state, { account, isLogin }) {
      state.account = account
      state.isLogin = isLogin
    },
    exit (state, isLogin) {
      state.isLogin = isLogin
    },
    register (state, { account, password }) {
      state.newAccount.push(account)
      state.newPassword.push(password)
    },
    searchValue (state, value) {
      state.searchTag = value
    },
    myselfPageIndex (state, value) {
      state.selfIndex = value
    },
    myselfPage (state, value) {
      state.myselfIndex = value
    },
    passwordStreng (state, value) {
      state.tag = value
    },
    goodsInfo (state, { _imgurl, _title, _info, _price, _sale, _index }) {
      state.infoValue.imgurl = _imgurl
      state.infoValue.title = _title
      state.infoValue.info = _info
      state.infoValue.price = _price
      state.infoValue.sale = _sale
      state.infoValue.index = _index
    },
    payInfo (state, { _imgurl, _item, _onePrice, _num, _allPrice }) {
      state.payValue.imgurl = _imgurl
      state.payValue.item = _item
      state.payValue.onePrice = _onePrice
      state.payValue.num = _num
      state.payValue.allPrice = _allPrice
    },
    orderInfo (state, value) {
      let obj = {
        imgurl: value.imgurl,
        title: value.title,
        num: value.num,
        price: value.price,
        state: value.state
      }
      state.orderValue.push(obj)
    },
    changeAccount (state, { val, index }) {
      state.newAccount[index] = val
      state.account = val
    },
    changePassword (state, { val, index }) {
      state.newPassword[index] = val
    }
  },
  actions: {

  },
  modules: {}
})
