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
      <!-- 修改昵称 -->
      <Mycell title="昵称" :desc="userobj.nickname" @click="nickshow=true;nickname=userobj.nickname"></Mycell>
      <van-dialog
        v-model="nickshow"
        title="修改昵称"
        show-cancel-button
        :close-on-click-overlay="true"
        @confirm="updatenick"
      >
        <van-cell-group>
          <van-field required clearable v-model="nickname" label="昵称" placeholder="请输入昵称" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改密码 -->
      <Mycell title="密码" :desc="userobj.password" type="password" @click="passshow=true;"></Mycell>
      <van-dialog
        v-model="passshow"
        title="修改密码"
        show-cancel-button
        :close-on-click-overlay="true"
        @confirm="updatepass"
        :before-close="beforeClose"
      >
        <van-cell-group>
          <van-field required label="原密码" clearable v-model="password" placeholder="请输入原密码" />
          <!-- <van-field required label="新密码" placeholder="请输入新密码" ref="userpwd" /> -->
          <van-field required label="新密码" clearable v-model="new_password" placeholder="请输入新密码" />
        </van-cell-group>
      </van-dialog>
      <!-- 修改性别 -->
      <Mycell title="性别" :desc="userobj.gender===1?'男':'女'" @click="gendershow=true;" :defaultIndex='userobj.gender'></Mycell>
      <van-dialog
        v-model="gendershow"
        title="修改性别"
        show-cancel-button
        :close-on-click-overlay="true"
        @confirm="updategender"
      >
<van-picker
  :columns="['女','男']"
  @change="onChange"
  :default-index="userobj.gender"
/>
      </van-dialog>
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
      genderindex: '',
      new_password: '',
      nickshow: false,
      passshow: false,
      gendershow: false,
      nickname: '',
      password: '',
      id: '',
      userobj: {}
    }
  },
  components: {
    Mycell,
    Myheader
  },

  methods: {
    onChange (picker, value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      // 因为gender在数据库中存储就是0和1，类似于索引
      // 为了之后能够使用到这个索引，将索引存储到data中
      this.genderindex = index
    },
    // 修改性别
    async updategender () {
      const res = await updateUserInfo(this.id, { gender: this.genderindex })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改成功')
        this.userobj.gender = this.genderindex
      }
    },
    // 关闭弹窗前触发
    // action:当前操作的类型：cancel  comfirm
    // done:关闭时所执行的操作：done():关闭 done(false):不关闭
    beforeClose (action, done) {
      // 如果密码输入不匹配，则给出提示，并中止本次请求
      // 只有单击确认的时候，才需要进行原密码是否匹配的验证
      if (action === 'confirm' && this.password !== this.userobj.password) {
        this.$toast.success('原密码输入不正确')
        done(false)
      } else {
        done()
      }
    },
    // 修改密码
    // async updatepass () {
    //   if (this.password === this.userobj.password) {
    //     // console.log(this.$refs.userpwd.$refs.input.value)
    //     const pwd = this.$refs.userpwd.$refs.input.value
    //     const res = await updateUserInfo(this.id, { password: pwd })
    //     if (res.data.message === '修改成功') {
    //       this.$toast.success('修改成功')
    //       this.userobj.password = pwd
    //     }
    //   }
    // },
    async updatepass () {
      if (this.password === this.userobj.password) {
        const res = await updateUserInfo(this.id, {
          password: this.new_password
        })
        if (res.data.message === '修改成功') {
          this.$toast.success('修改成功')
          this.userobj.password = this.new_password
          this.password = ''
          this.new_password = ''
        }
      }
    },
    // 修改昵称
    async updatenick () {
      const res = await updateUserInfo(this.id, { nickname: this.nickname })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改成功')
        this.userobj.nickname = this.nickname
      }
    },
    // 文件读取之前触发
    // 这里面我们可以判断文件的类型或大小等相关信息，决定是否允许用户上传文件
    beforeRead (file) {
      // console.log(file)
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
