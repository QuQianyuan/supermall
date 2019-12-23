// 混入？
import {debounce} from "./utils";

export const itmeListenerMiXin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = ()=> {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('我是混入中的内容');
  },
  deactivated() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
