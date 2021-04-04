<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' },
        { validator: phoneCheck,
          message: '格式错误'
        }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },
        {
          pattern: /^[a-zA-Z0-9]{6,12}$/,
          message: '密码格式错误'
        }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" :loading="isloading">登录</van-button>
      </div>
    </van-form>
 </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: 'index',
  data () {
    return {
      form: {
        // 手机号
        phone: '',
        // 密码
        password: ''
      },
      // 用来控制登录按钮的状态
      isloading: false
    }
  },
  methods: {
    onClickLeft () {
      // 点击按钮后退到上一个组件
      this.$router.go(-1)
    },
    // 提交
    async onSubmit () {
      this.isloading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$toast.success('登陆成功')
        // 将用户信息存储到state中
        this.$store.commit('setUser', data.content)
        // 登录成功跳转页面
        this.$router.push(this.$route.query.redirect || '/')
      } else {
        this.$toast.fail('登录失败')
      }
      this.isloading = false
    },
    // 校验手机号
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
