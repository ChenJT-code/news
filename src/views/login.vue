<template>
  <div>
    <myinput
        placeholder="请输入用户名"
        :value="userobj.username"
        @aaaa="handleruserinput"
    ></myinput>

    <myinput
        placeholder="输入密码"
        :value="userobj.password"
        @bbbb="cccc"
    ></myinput>

    <mybutton text="登录" @click="login" type="danger"></mybutton>
  </div>
</template>

<script>
import Mybutton from '@/components/mybutton'
import Myinput from '@/components/myinput'
export default {
  components: {
    Mybutton,
    Myinput
  },
  data () {
    return {
      userobj: {
        username: 'ccc',
        password: '123'
      }
    }
  },
  methods: {
    login () {
      console.log(this.userobj)
    },
    // 接收子组件中传递的数据，获取用户输入
    handleruserinput (data) {
      this.userobj.username = data
    },
    cccc (data) {
      this.userobj.password = data
    }
  }
}
</script>

<style>
</style>
