<!-- home子组件 轮播图  -->
<template>
  <!-- 独立组件 swiper 整个轮播界面 -->
  <swiper>
    <!-- 独立组件 每个轮播图 for循环每个轮播图 -->
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {   //数组的默认值必须是一个函数
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false //在开发中经常用这种属性记录一种状态
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if(!this.isLoad)
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
</script>

<style scoped>

</style>
