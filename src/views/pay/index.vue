<template>
  <div class="pay">
    <van-cell-group>
      <van-cell class="cs1">
        <img :src="course.courseImgUrl" alt="">
        <div class="item">
          <div v-text="course.courseName">课程名称</div>
          <div>￥{{course.discounts}}</div>
        </div>
      </van-cell>
      <van-cell class="cs2">
        <div>购买信息</div>
        <div>购买课程</div>
        <div class="username">当前账号：{{ username }}</div>
      </van-cell>
      <van-cell class="cs3">
        <div class="title">支付方式</div>
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell @click="radio = '1'">
              <template #title>
                <img src="" alt="">
                <span>微信支付</span>
              </template>
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell clickable @click="radio = '2'">
               <template #title>
                <img src="" alt="">
                <span>支付宝支付</span>
              </template>
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-button @click="onSubmit">￥{{ course.discounts }}立即支付</van-button>
      </van-cell>
    </van-cell-group>
 </div>
</template>

<script>
import { createOrder, initPayment, getPayResult } from '@/services/pay'
import { getCourseById } from '@/services/course'
export default {
  name: 'index',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      // 保存课程信息
      course: {},
      radio: '1',
      // 存储订单更好
      orderNo: null
    }
  },
  created () {
    this.loadCourseList()
    // 获取订单号
    this.loadOrder()
  },
  methods: {
    async loadCourseList () {
      const { data } = await getCourseById(this.courseId)
      this.course = data.content
    },
    async loadOrder () {
      const { data } = await createOrder({
        goodsId: this.courseId
      })
      this.orderNo = data.content.orderNo
      console.log(data)
    },
    // 发送支付请求
    async onSubmit () {
      const { data } = await initPayment({
        goodsOrderNo: this.orderNo,
        channel: this.radio === '1' ? 'weChat' : 'aliPay',
        returnUrl: 'http://edufront.logou.com'
      })
      // 接收响应地址，进行跳转
      window.location.href = data.content.payUrl
      // 检测，支付后进行跳转
      const timer = setInterval(async () => {
        const { data: payResult } = await getPayResult({
          orderNo: data.content.orderMo
        })
        if (payResult.content && payResult.content.status === 2) {
          clearInterval(timer)
          this.$router.push({
            name: 'learn'
          })
        }
      }, 1000)
    }
  },
  // 处理手机号
  computed: {
    username () {
      return this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  }
}
</script>

<style lang='scss' scoped>
.pay{
  position: absolute;
  width: 100%;
  height: 100%;
}
.van-cell-group{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .cs1{
    height: 170px;
    padding: 40px 20px 0;
    margin-bottom: 10px;
    img{
      border-radius: 5px;
      width: 80px;
      height: 107px;
    }
    .van-cell__value{
        display: flex;
      }
    .item{
      height: 107px;
      padding: 5px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      div:nth-of-type(1) {
        font-size: 16px;
      }
      div:nth-of-type(2) {
        font-size: 22px;
        font-weight: 700;
        color: #ff7452;
      }
    }
  }
  .cs2{
    height: 120px;
    margin-bottom: 10px;
    div:nth-of-type(2){
      font-size: 12px;
      color: #999;
    }
    .username{
      margin: 20px 0 10px;
      font-size: 16px;
    }
  }
  .cs3{
    flex: 1;
    .van-cell__value {
      display: flex;
      flex-direction: column;
      .van-radio-group{
        flex: 1;
      }
    }
    .van-button{
      background: linear-gradient(270deg,#faa83e,#fbc546);
      border-radius: 20px;
    }
  }
}

</style>
