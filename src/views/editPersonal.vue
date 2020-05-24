<template>
  <div class="edit">
  <myheader title="修改信息">
      <span slot="left" class="iconfont icon-fanhui" @click="$router.back()"></span>
  </myheader>

 <Mycell title="昵称" desc=''></Mycell>
 <Mycell title="密码" desc=''></Mycell>
 <Mycell title="性别" desc=''></Mycell>
  </div>
</template>

<script>
import Mycell from '@/components/mycell.vue'
import { getUserInfoById } from '@/apis/users.js'
import Myheader from '@/components/myheader'

export default {
  components: {
    Mycell,
    Myheader
  },
  async mounted () {
    const res = await getUserInfoById(this.$route.params.id)
    console.log(res)
  }
}
</script>

<style>

</style>
