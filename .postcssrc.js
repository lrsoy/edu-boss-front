module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      // px与rem转换的插件 默认值
      rootValue: 37.5,
      // 要进行处理的属性列表
      propList: ['*']
    }
  }
}
