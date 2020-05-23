<template>
  <div>
    <div class="container">
      <div class="close">
        <span class="iconfont icon-guanbi"></span>
      </div>
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="inputs">
        <myinput
          placeholder="请输入手机号"
          v-model="userobj.username"
          :rules="/^1[3456789]\d{9}$/"
          msg_err="手机号输入错误"
        ></myinput>
        <myinput
          laceholder="请输入昵称"
          v-model="userobj.nickname"
          :rules='/^\w+$/'
          msg_err="昵称不能为空"
        ></myinput>
        <myinput
          placeholder="请输入密码"
          v-model="userobj.password"
          :rules="/^\w{3,16}$/"
          msg_err="请输入3-16位的密码"
        ></myinput>
      </div>
      <p class="tips">
        已有账号？
        <a href="#/login">去登录</a>
      </p>
      <mybutton text="注册" @click="register" type="danger"></mybutton>
    </div>
  </div>
</template>

<script>
import Mybutton from '@/components/mybutton'
import Myinput from '@/components/myinput'
import { register } from '@/apis/users'

export default {
  components: {
    Mybutton,
    Myinput
  },
  data () {
    return {
      userobj: {
        username: '13723688890',
        password: '123456',
        nickname: '小陈'
      }
    }
  },
  methods: {
    // register () {
    //   register(this.userobj)
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
    async register () {
      var res = await register(this.userobj)
      console.log(res)
      if (res.data.message === '注册成功') {
        this.$toast.fail('注册成功,请进行登陆')
        this.$router.push({ name: 'Login' })
      } else if (res.data.message === '用户名已经存在') {
        this.$toast.fail('该账户已注册,请进行登陆')
        this.$router.push({ name: 'Login' })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 240px;
    height: 150px;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
