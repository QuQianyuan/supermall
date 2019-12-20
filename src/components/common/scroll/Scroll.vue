<template>
  <div class="wrapper" ref="wrapper"> <!--ref/children-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
      // pullUpLoad: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //  1.创建BScroll对象
      // 通过querySelect获取到的不知道是哪个标签 所以尽量不要用
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //  2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {  //这样写更严谨 代码更高效
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
      // console.log(this.scroll);

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) { //这个默认只能加载一次
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
      // //  3.监听上拉事件
      // this.scroll.on('pullingUp', () => {
      //   this.$emit('pullingUp')
      // })
    },
    methods: {
      scrollTo(x, y, time = 300) {  //方法都是放在组件里，方便引用
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll.y ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
