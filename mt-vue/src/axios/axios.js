import axios from 'axios'
axios.defaults.baseURL = 'https://www.fastmock.site/mock/806f763c57dc60af253b3945945a5adc/jyrncl/api'
axios.interceptors.request.use(function (config) {
  config.params = {
    ...config.params
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default axios
