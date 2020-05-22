<template>
  <div>
    <!-- <myinput
        placeholder="请输入用户名"
        :value="userobj.username"
        @input="handleruserinput"
    ></myinput> -->
    <myinput
        placeholder="请输入手机号"
        v-model="userobj.username"
        :rules='/^1[3456789]\d{9}$/'
        msg_err='手机号输入错误'
    ></myinput>

    <myinput
        placeholder="输入密码"
        v-model="userobj.password"
    ></myinput>

    <mybutton text="登录" @click="login" type="danger"></mybutton>
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
    login () {
      login(this.userobj)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
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

<style>
</style>
