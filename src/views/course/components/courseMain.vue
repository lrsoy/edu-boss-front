<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in activeAdList" :key="item.id">
        <img :src="item.img" alt="">
      </van-swipe-item>
    </van-swipe>
    <!-- 课程列表 -->
    <course-content-list  :fetch-data="fetchData"></course-content-list>
 </div>
</template>

<script>
import courseContentList from '@/components/courseContentList'
import { getAllAds, getQueryCourses } from '@/services/course'
export default {
  name: 'course-min',
  components: {
    courseContentList
  },
  data () {
    return {
      // 存储获取到的图
      adList: []
    }
  },
  created () {
    // （一） 获取首页轮播图
    this.loadAllAds()
    // 通过钩子函数将接口设置给fetchData
    // this.fetchData = getQueryCourses
  },
  methods: {
    async loadAllAds () {
      // 999代表首页轮播图
      const { data } = await getAllAds({
        spaceKeys: '999'
      })
      // 将数据存储到数组内部进行遍历
      this.adList = data.content[0].adDTOList
    },
    // 请求课程信息函数，需要父子之间传递，将函数传递过去
    fetchData (options) {
      return getQueryCourses(options)
    }
  },
  // 计算属性，计算属性里面的数据会被缓存，除非数据更改
  computed: {
    activeAdList () {
      return this.adList.filter(item => item.status === 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.my-swipe {
  width: 100%;
  .van-swipe-item {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  img {
    height: 170px;
    width: 100%;
  }
}
.course-content-list {
  top: 220px;
  bottom: 50px;
}
</style>
