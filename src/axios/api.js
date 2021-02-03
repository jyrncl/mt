import axios from '@/axios/axios.js'
var api = {
  getHeaderMnav () {
    return axios.get('/headerNav')
  },
  getMainFCenter () {
    return axios.get('/mainFCenter')
  },
  getMainFLeft () {
    return axios.get('/mainFLeft')
  },
  getMainSCenter () {
    return axios.get('/mainSCenter')
  },
  getMainTCenter () {
    return axios.get('/mainTCenter')
  },
  getFoot () {
    return axios.get('/foot')
  },
  getFootNav () {
    return axios.get('/footNav')
  },
  getChangeCity () {
    return axios.get('/changeCity')
  },
  getGoodsList () {
    return axios.get('/goodsList')
  },
  postUser (params) {
    return axios.post('/userLogin', params)
  },
  getMyselfList () {
    return axios.get('/myselfList')
  }
}

export default api
