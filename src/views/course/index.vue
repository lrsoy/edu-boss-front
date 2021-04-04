<template>
  <div>
    <course-header></course-header>
    <course-main></course-main>
    <layout-footer></layout-footer>
 </div>
</template>

<script>
// 引入组件
import courseHeader from './components/courseHeader'
import courseMain from './components/courseMain'
import LayoutFooter from '@/components/LayoutFooter'
export default {
  name: 'index',
  components: {
    courseHeader,
    courseMain,
    LayoutFooter
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
