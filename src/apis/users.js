// 1 引入axios
import axios from '@/utils/myaxios.js'

// 2 添加方法实现登录业务
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
