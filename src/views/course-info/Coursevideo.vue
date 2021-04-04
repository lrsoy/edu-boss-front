<template>
  <div class="course-video">
     <van-nav-bar
      title="课程播放"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div id="video-container"></div>
 </div>
</template>

<script>
import { videoPlayInfo } from '@/services/course'
export default {
  name: 'Coursevideo',
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await videoPlayInfo(this.lessonId)
      console.log(data)
      const player = new window.Aliplayer({
        id: 'video-container',
        vid: data.content.fileId,
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: true,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created')
      })
      console.log(player)
    }
  }
}
</script>

<style lang='scss' scoped>
.course-video{
  height: 210px;
}
</style>
