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
      <van-tab title="标签 1">
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/apis/category.js'
export default {
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    var res = getCateList()
    console.log(res)
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
