<template>
  <input
    class="inp"
    type="text"
    :placeholder='placeholder'
    :value="value"
    @input='handlerinput'
    :class="{green:statu==='success',red:statu==='error'}"
    @blur='handlerblur'
  >
</template>

<script>
export default {
  props: ['placeholder', 'value', 'rules', 'msg_err'],
  data () {
    return {
      statu: ''
    }
  },
  methods: {
    // 处理输入
    handlerinput (event) {
      const v = event.target.value
      // console.log(event)
      //   实现子传父
      //   为了在使用封装组件时能够使用双向绑定，这个事件的名称只能叫input
      // this.$emit('aaaa', event.target.value)
      // this.$emit('bbbb', event.target.value)
      this.$emit('input', v)
      if (this.rules) {
        if (this.rules.test(v)) {
          this.statu = 'success'
        } else {
          this.statu = 'error'
        }
      }
    },
    // 处理失焦
    handlerblur (event) {
      // console.log(111)
      if (this.rules) {
        if (!this.rules.test(event.target.value)) {
          this.statu = 'error'
          // 给出提示
          alert(this.msg_err)
        }
      }
    }
  }
}
</script>
<style>
  .inp{
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: 2px #999 solid;
    line-height: 40px;
    font-size: 18px;
    outline: none;
    padding-left: 10px;
    box-sizing: border-box;
}
.red {
  border-color: Red;
}
.green {
  border-color: green;
}
</style>
