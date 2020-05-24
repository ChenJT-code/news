<template>
  <div class="cell">
    <span>{{title}}</span>
    <div>
      <span>{{type==='password'?'******':desc}}</span>
      <span class="iconfont icon-jiantou"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc', 'type']
}
</script>

<style lang='less' scoped>
   .cell{
     display: flex;
     justify-content: space-between;
     padding: 20px;
     align-items: center;
     border-bottom: 1px solid #333;
     >span{
        color: #333;
     }
     >div{
       font-size: 14px;
       color: #999;
     }
   }
</style>
