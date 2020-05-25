<template>
  <div class="edit">
    <myheader title="修改信息">
      <span slot="left" class="iconfont icon-fanhui" @click="$router.back()"></span>
    </myheader>

    <div class="info">
      <div class="userimg">
        <img :src="userobj.head_img" alt />
        <van-uploader :after-read="afterRead" />
      </div>
      <Mycell title="昵称" :desc="userobj.nickname"></Mycell>
      <Mycell title="密码" :desc="userobj.password" type="password"></Mycell>
      <Mycell title="性别" :desc="userobj.gender===1?'男':'女'"></Mycell>
    </div>
  </div>
</template>

<script>
import Mycell from '@/components/mycell.vue'
import { getUserInfoById, updateUserInfo } from '@/apis/users.js'
import Myheader from '@/components/myheader'
import { uploadFile } from '@/apis/upload.js'

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

  methods: {
    // 文件读取之前触发
    // 这里面我们可以判断文件的类型或大小等相关信息，决定是否允许用户上传文件
    beforeRead (file) {
      console.log(file)
    },
    // 当用户选择完文件之后，触发这个事件
    // file就是你当前所选择的文件对象
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      var formdata = new FormData()
      formdata.append('file', file.file)
      // 发起请求
      const res = await uploadFile(formdata)
      // console.log(res)
      // 做预览刷新
      if (res.data.message === '文件上传成功') {
        this.userobj.head_img =
          localStorage.getItem('new_baseurl') + res.data.data.url
        // 实现数据的更新
        const res2 = await updateUserInfo(this.id, {
          head_img: res.data.data.url
        })
        console.log(res2)
        if (res2.data.message === '修改成功') {
          this.$toast.success('修改成功')
        } else {
          this.$toast.fail('修改失败')
        }
      }
    }
  },

  async mounted () {
    this.id = this.$route.params.id
    const res = await getUserInfoById(this.id)
    // console.log(this.$route.params.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.userobj = res.data.data
      this.userobj.head_img = this.userobj.head_img
        ? localStorage.getItem('new_baseurl') + this.userobj.head_img
        : '../../public/touxiang.jpg'
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
