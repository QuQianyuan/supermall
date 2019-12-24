// 混入？
import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'

export const itmeListenerMiXin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = ()=> {
      this.refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
  deactivated() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,  // 判断是否返回顶部
    }
  },
  methods: {
    backClick() { //返回顶部
      // this.$refs.scroll.scroll.scrollTo(0, 0, 500)  //先要拿到scroll这个组件再去拿里面某一个属性
      // 拿到这个scroll组件用这个方法 返回到0，0 500ms
      this.$refs.scroll.scrollTo(0, 0, 500)  //虽然只少了一个单词 但是体现了封装的方法
    },
  }
}
