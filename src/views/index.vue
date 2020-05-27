<template>
  <div class="index">
    <!-- 顶部 -->
    <div class="header">
      <div class="logo iconfont icon-new"></div>
      <div class="search" @click="$router.push('/search')">
        <van-icon name="search" />搜索新闻
      </div>
      <van-icon name="user-circle-o" class="icon_user" @click="goPersonal" />
    </div>
    <!-- 标签页 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="(value,index) in cateList" :key="index">
          内容{{index}}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/apis/category.js'
export default {
  data () {
    return {
      // 当前标签被激活的索引
      active: localStorage.getItem('news_id') ? 1 : 0,
      // 栏目数据
      cateList: []
    }
  },
  watch: {
    // 监听当前被激活的标签项目
    active () {
      // 获取当前栏目的id
      const id = this.cateList[this.active].id
      console.log(id)
    }
  },
  async mounted () {
    var res = await getCateList()
    // console.log(res)
    if (res.data.data && res.data.data.length > 0) {
      this.cateList = res.data.data
      console.log(this.cateList)
    }
  },
  methods: {
    // 跳转到个人中心页
    goPersonal () {
      const token = localStorage.getItem('news_Authorization')
      if (token) {
        this.$router.push(`/personal/${localStorage.getItem('news_id')}`)
      } else {
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50/360 * 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f00;
    .logo {
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      color: #fff;
      font-size: 60/360 * 100vw;
      line-height: 50/360 * 100vw;
      padding: 0 15/360 * 100vw;
    }
    .search {
      flex: 1;
      height: 36/360 * 100vw;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 18/360 * 100vw;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16/360 * 100vw;
      .van-icon {
        padding: 0px 5/360 * 100vw;
      }
    }
    .icon_user {
      width: 32/360 * 100vw;
      padding: 0 10/360 * 100vw;
      color: #fff;
      font-size: 25/360 * 100vw;
    }
  }
}
</style>
