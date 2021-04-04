<template>
  <div class="course-content-list">
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 列表组件 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.id" @click="$router.push({
          name: 'course-info',
          params: {
            courseId: item.id
          }
        })">
          <div>
            <!-- 所有课程和易购课程图片的不同 -->
            <img :src="item.courseListImg || item.image" alt="">
          </div>
          <div class="course-info">
            <h3>{{ item.courseName || item.name }}</h3>
            <p class="course-preview">{{ item.previewSecondField }}</p>
            <!-- 如果是已经购买的课程，就不显示这个价格 -->
            <p class="price" v-if="item.price">
              <span class="course-discontus">￥{{item.discounts}}</span>
              <s class="course-price">￥{{item.price}}</s>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
 </div>
</template>

<script>
// import { getQueryCourses } from '@/services/course'
export default {
  name: 'courseContentList',
  props: {
    fetchData: {
      // 用于请求数据函数
      type: Function,
      required: true
    }
  },
  data () {
    return {
      // 用于存储数据
      list: [],
      // 控制数据的加载 （是否加载数据中）
      loading: false,
      // 控制数据是否加载完成
      finished: false,
      // 存储数据页数
      currentPage: 1,
      // 下拉刷新状态
      isLoading: false
    }
  },
  methods: {
    async onLoad () {
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        // 每一次请求的条数
        pageSize: 10,
        // 代表上架课程
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        // 请求成功将值赋值给data里面的变量，进行遍历
        this.list.push(...data.data.records)
      } else if (data.content && data.content.length !== 0) {
        this.list.push(...data.content)
      }
      // 下一次请求下一页
      this.currentPage++
      // 一次请求成功，将loading关掉
      this.loading = false
      // 数据全部加载完成，取消加载
      if (data.data && data.data.records && data.data.records.length < 10) {
        this.finished = true
      } else if (data.content && data.content.length < 10) {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      // 重置数据页数为最小值 （1）
      this.currentPage = 1
      // 重新请求数据
      const { data } = await this.fetchData({
        currentPage: this.currentPage,
        // 每一次请求的条数
        pageSize: 10,
        // 代表上架课程
        status: 1
      })
      if (data.data && data.data.records && data.data.records.length !== 0) {
        // 将里面的值清空
        this.list = data.data.records
      } else if (data.content && data.content.length !== 0) {
        this.list = data.content
      }
      // 提示
      this.$toast('刷新成功')
    }
  }
}
</script>

<style lang='scss' scoped>
// 列表组件固定设置
.course-content-list {
  position: fixed;
  overflow-y: auto;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
}
.van-cell__value {
  display: flex;
  height: 100px;
  padding: 10px 0;
  img {
    width: 75px;
    height: 100%;
    border-radius: 5px;
  }
}
.course-info{
    flex: 1;
    display: flex;
    flex-direction: column;
    .course-preview {
      flex: 1;
    }
    padding: 0 10px;
    .course-discontus{
      color: #ff7452;
      padding-right: 5px;
    }
}
p,h3 {
  margin:0;
}
</style>
