import request from '@/utils/request'

// 登录请求封装
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: new URLSearchParams(data).toString()
  })
}

export const getInfo = data => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo',
    data
  })
}
