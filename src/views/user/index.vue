<template>
  <div>
    <!-- 用户信息 -->
    <van-cell-group>
      <van-cell :border="false" class="user-info">
        <van-image
        width="50px"
        height="50px"
        round
        :src="form.portrait"
        ></van-image>
        <!-- 用户信息 -->
        <div class="user-inner">
          <h3>{{ form.weixinNickName }}</h3>
          <span><van-icon name="edit" /> 编辑个人资料</span>
        </div>
      </van-cell>
      <van-cell class="account">
        <van-grid :border="false">
          <van-grid-item >
            <span class="grit-item-value">14.05</span>
            <span>学习时长</span>
          </van-grid-item>
          <van-grid-item >
            <span class="grit-item-value">200</span>
            <span>钱包/勾豆</span>
          </van-grid-item>
          <van-grid-item >
            <span class="grit-item-value">1</span>
            <span>优惠券</span>
          </van-grid-item>
          <van-grid-item >
            <span class="grit-item-value">213</span>
            <span>学分</span>
          </van-grid-item>
      </van-grid>
      </van-cell>
      <van-cell>
        <van-cell title="分销中心" icon="user-o" is-link value="收益200" />
        <van-cell title="个性化设置" icon="setting-o" is-link />
        <van-cell title="我的下载" icon="down" is-link  />
        <van-cell title="帮助与反馈" icon="question-o" is-link />
        <van-cell title="关于拉钩教育" icon="info-o" is-link value="v2.0.0" />
        <van-cell title="设置" icon="setting-o"  @click="$router.push({
          name: 'UserSetting'
        })" is-link />
      </van-cell>
    </van-cell-group>
    <!-- 底部 -->
    <layout-footer></layout-footer>
 </div>
</template>

<script>
import LayoutFooter from '@/components/LayoutFooter'
import { getInfo } from '@/services/user'
export default {
  name: 'index',
  components: {
    LayoutFooter
  },
  data () {
    return {
      // 储存用户信息
      form: {}
    }
  },
  created () {
    // 加载用户信息
    this.loadUserMessage()
  },
  methods: {
    async loadUserMessage () {
      const { data } = await getInfo()
      this.form = data.content
    }
  }
}
</script>

<style lang='scss' scoped>
.user-info .van-cell__value {
  display: flex;
}
.user-info {
  padding: 30px 20px 0;
  background-color: rgb(248, 150, 3);
}
.user-inner{
  padding-left: 15px;
  h3{
    margin: 2px 0px;
    font-size: 15px;
  }
  span{
    font-size: 15px;
  }
}
.account{
  background-color: rgb(248, 150, 3);
  .van-grid{
    border-radius: 10px;
    overflow: hidden;
    .grit-item-value {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
