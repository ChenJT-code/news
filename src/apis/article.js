// 引入axios
import axios from '@/utils/myaxios.js'

// 获取当前栏目的新闻数据
export const getArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
