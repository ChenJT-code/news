<template>
  <div class="edit">
    <myheader title="修改信息">
      <span slot="left" class="iconfont icon-fanhui" @click="$router.back()"></span>
    </myheader>

    <div class="info">
        <div class="userimg">
            <img :src="userobj.head_img" alt="">
        </div>
      <Mycell title="昵称" :desc='userobj.nickname'></Mycell>
      <Mycell title="密码" :desc='userobj.password' type='password'></Mycell>
      <Mycell title="性别" :desc='userobj.gender===1?"男":"女"'></Mycell>
    </div>
  </div>
</template>

<script>
import Mycell from '@/components/mycell.vue'
import { getUserInfoById } from '@/apis/users.js'
import Myheader from '@/components/myheader'

export default {
  data () {
    return {
      userobj: {}
    }
  },
  components: {
    Mycell,
    Myheader
  },
  async mounted () {
    const res = await getUserInfoById(this.$route.params.id)
    console.log(res)
    if (res.data.message === '获取成功') {
      this.userobj = res.data.data
      this.userobj.head_img = this.userobj.head_img ? localStorage.getItem('new_baseurl') + this.userobj.head_img : '../../public/touxiang.jpg'
    }
  }
}
</script>

<style scoped lang='less'>
.info {
  background-color: #fff;
  .userimg {
    height: 80px;
    padding: 30px 0;
    text-align: center;
    position: relative;
    > img {
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .van-uploader {
      width: 70px;
      height: 70px;
      position: relative;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
}
</style>
