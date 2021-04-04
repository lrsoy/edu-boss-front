<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar title="已购课程"/>
    <!-- 内容 -->
    <course-content-list :fetch-data="fetchData"></course-content-list>
    <!-- 底部 -->
    <layout-footer></layout-footer>
 </div>
</template>

<script>
import courseContentList from '@/components/courseContentList'
import LayoutFooter from '@/components/LayoutFooter'
import { getPurchaseCourse } from '@/services/course'
export default {
  name: 'index',
  components: {
    LayoutFooter,
    courseContentList
  },
  data () {
    return {
    }
  },
  created () {
    this.fetchData = getPurchaseCourse
  }
}
</script>

<style lang='scss' scoped>
.course-content-list{
  top: 50px;
  bottom: 50px;
}
</style>
