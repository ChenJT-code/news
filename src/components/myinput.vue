<template>
  <input
    class="inp"
    type="text"
    :placeholder='placeholder'
    :value="value"
    @input='handlerinput'
  >
</template>

<script>
export default {
  props: ['placeholder', 'value'],

  methods: {
    handlerinput (event) {
      // console.log(event)
      //   实现子传父
      //   为了在使用封装组件时能够使用双向绑定，这个事件的名称只能叫input
      this.$emit('aaaa', event.target.value)
      this.$emit('bbbb', event.target.value)
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
</style>
