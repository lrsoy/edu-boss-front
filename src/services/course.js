// 引入封装的请求
import request from '@/utils/request'

// （一） 获取首页轮播图
export const getAllAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}

// 请求课程列表信息
export const getQueryCourses = data => {
  return request({
    method: 'post',
    url: 'http://eduboss.lagou.com/boss/course/getQueryCourses',
    data
  })
}

// 获取已购课程信息
export const getPurchaseCourse = data => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse',
    data
  })
}

// 通过id获取内部的课程数据
export const getCourseById = courseId => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params: {
      courseId
    }
  })
}

// 获取课程章节
export const getSectionAndLesson = courseId => {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
// 视频播放
export const videoPlayInfo = lessonId => {
  return request({
    method: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params: {
      lessonId
    }
  })
}
