<template>
  <div>
    <van-cell-group :style="styleOptions">
      <van-cell class="course-img">
        <img :src="course.courseImgUrl" alt="">
      </van-cell>
      <van-cell class="course-dis">
        <h2 v-text="course.courseName"></h2>
        <p v-text="course.previewSecondField"></p>
        <div class="course-sale-info">
          <p class="course-price">
            <span class="dis">￥{{ course.discounts }}</span>
            <span>￥{{ course.price }}</span>
          </p>
          <span class="tag">{{ course.sales }}人购买</span>
          <span class="tag">每周三、五更新</span>
        </div>
      </van-cell>
      <van-cell class="course-data">
        <van-tabs scrollspy sticky>
          <van-tab title="详情" name="a">
            <!-- 在接口内部，详情是html解构 -->
            <div v-html="course.courseDescription"></div>
          </van-tab>
          <van-tab title="内容" name="b">
            <course-section v-for="item in sections" :key="item.id"
            :section-data="item"
            ></course-section>
          </van-tab>
        </van-tabs>
      </van-cell>
    </van-cell-group>
    <!-- 底部支付功能 -->
    <van-tabbar v-if="!course.isBuy">
      <div class="pricce">
        <span class="fasb" v-text="course.discountsTag"></span>
        <span class="dis">￥{{ course.discounts }}</span>
        <span>￥{{course.price}}</span>
      </div>
      <van-button @click="handPay" type="primary">立即购买</van-button>
    </van-tabbar>
 </div>
</template>

<script>
import CourseSection from './components/CourseSection'
import { getCourseById, getSectionAndLesson } from '@/services/course'
export default {
  name: 'index',
  components: {
    CourseSection
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 课程信息
      course: {},
      // 存储课程章节信息
      sections: {},
      // 处理已经购买内部的空白
      styleOptions: {}
    }
  },
  created () {
    // 加载数据
    this.loadCourseList()
    // 加载章节信息
    this.loadgetSectionAndLesson()
  },
  methods: {
    handPay () {
      // 检测是否登录
      if (this.$store.state.user) {
        this.$router.push({
          name: 'pay',
          params: {
            courseId: this.courseId
          }
        })
      } else {
        this.$router.push({
          name: 'login',
          query: {
            // 记录上一次的路由，登录成功，直接跳转登录的页面
            redirect: this.$route.fullPath
          }
        })
      }
    },
    async loadCourseList () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.content
      if (data.content.isBuy) {
        this.styleOptions.bottom = 0
      }
    },
    // 加载章节信息
    async loadgetSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.content.courseSectionList
    }
  }
}
</script>

<style lang='scss' scoped>
.van-cell{
  padding: 0;
}
.course-img{
  height: 280px;
}
.course-dis{
  padding: 10px 20px;
  height: 150px;
  h2{
    padding: 0;
  }
}
.dis{
      font-weight: 700;
      color: #ff7452;
      font-size: 24px;
}
.course-sale-info{
  display: flex;
  .course-price{
    flex: 1;
    margin: 0;
  }
  .tag{
    background-color: #f8f9fa;
    font-size: 12px;
    font-weight: 700;
    color: #666;
    margin-left: 10px;
    padding: 7px;
    line-height: 15px;
    border-radius: 5px;
  }
}
// 添加导航需要设置
.van-cell-group{
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 50px;
  overflow-y: auto;
}
.van-tabbar {
  line-height: 50px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
span{
  font-size: 14px;
}
.van-button{
  width: 40%;
  height: 80%;
  margin: 0 40px;
}
</style>
