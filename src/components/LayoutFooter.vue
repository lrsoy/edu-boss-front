<template>
  <div class="tabbar">
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">选课</van-tabbar-item>
      <van-tabbar-item replace to="/learn" icon="label-o">学习</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我</van-tabbar-item>
    </van-tabbar>
 </div>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
