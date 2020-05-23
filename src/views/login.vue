<template>
  <div>
    <div class="container">
      <div class="close">
        <span class="iconfont icon-guanbi"></span>
      </div>
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <div class="inputs">
      <!-- <myinput
        placeholder="请输入用户名"
        :value="userobj.username"
        @input="handleruserinput"
      ></myinput>-->
      <myinput
        placeholder="请输入手机号"
        v-model="userobj.username"
        :rules="/^1[3456789]\d{9}$/"
        msg_err="手机号输入错误"
      ></myinput>

      <myinput placeholder="输入密码" v-model="userobj.password" type='password'></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register">去注册</a>
      </p>
      <mybutton text="登录" @click="login" type="danger"></mybutton>
    </div>
  </div>
</template>

<script>
import Mybutton from '@/components/mybutton'
import Myinput from '@/components/myinput'
import { login } from '@/apis/users'

export default {
  components: {
    Mybutton,
    Myinput
  },
  data () {
    return {
      userobj: {
        username: '123456',
        password: '123456'
      }
    }
  },
  methods: {
    async login () {
      var res = await login(this.userobj)
      console.log(res)
      if (res.data.message === '登录成功') {
        this.$toast.fail('登陆成功')
      } else {
        this.$toast.fail('登录失败')
      }
    }
    // login () {
    //   login(this.userobj)
    //     .then(res => {
    //       console.log(res)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
    // 接收子组件中传递的数据，获取用户输入
    // handleruserinput (data) {
    //   this.userobj.username = data
    // }
    // cccc (data) {
    //   this.userobj.password = data
    // }
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

.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 240px;
    height: 150px;

  }
}

// .logo {
//   width: 200px;
//   height: 130px;
//   display: flex;
//   justify-content: center;

//   span {
//     display: block;
//     font-size: 126 / 360 * 100vw;
//     color: #d81e06;
//   }
// }

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
