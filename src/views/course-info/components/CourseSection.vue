<template>
  <div class="section-item">
    <h2 v-text="sectionData.sectionName"></h2>
    <p @click="handleClick(item)" class="lesson" v-for="item in sectionData.courseLessons" :key="item.id">
      <span v-text="item.theme"></span>
      <van-icon v-if="item.canPlay" name="play-circle" size="20px" />
      <van-icon v-else name="lock" size="20px" />
    </p>
 </div>
</template>

<script>
export default {
  name: 'CourseSection',
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleClick (item) {
      if (item.canPlay) {
        this.$router.push({
          name: 'Coursevideo',
          params: {
            lessonId: item.id
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.section-item{
  padding: 0 20px;
  .lesson{
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
}
</style>
