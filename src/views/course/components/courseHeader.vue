<template>
  <div class="images">
    <van-image :src="require('@/assets/logo.png')"/>
 </div>
</template>

<script>
export default {
  name: 'course-header',
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
.images{
  height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
  .van-image{
    width: 180px;
  }
}
</style>
