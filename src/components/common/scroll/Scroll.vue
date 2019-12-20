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
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // console.log(this.scroll);

      // //  3.监听上拉事件
      // this.scroll.on('pullingUp', () => {
      //   this.$emit('pullingUp')
      // })
    },
    methods: {
      scrollTo(x, y, time = 300) {  //方法都是放在组件里，方便引用
       this.Scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        console.log('1111');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
