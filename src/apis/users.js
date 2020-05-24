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

// 3 注册业务
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

// 4 根据id获取用户数据
export const getUserInfoById = (id) => {
  return axios({
    // headers: {
    //   Authorization: localStorage.getItem('news_Authorization')
    // },
    // method: 'get',
    url: `/user/${id}`
  })
}

// 5. 编辑用户信息，这里注意的是，并不是统一的一起修改所有信息，而只是修改特定的信息
export const updateUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
