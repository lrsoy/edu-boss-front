<template>
  <div>
     <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="$router.push({
        name: 'user'
      })"
    />
    <van-cell-group>
      <van-cell><van-button @click="quit">退出登录</van-button></van-cell>
      <van-cell><van-button>切换账号</van-button></van-cell>
    </van-cell-group>
 </div>
</template>

<script>
export default {
  name: 'UserSetting',
  data () {
    return {
    }
  },
  methods: {
    quit () {
      this.$store.commit('setUser', null)
      this.$toast.success('退出成功')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.van-button{
  width: 100%;
}
</style>
