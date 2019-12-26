<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
  import {itmeListenerMiXin, backTopMixin} from "common/mixin";
  import {debounce} from "../../common/utils";

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      DetailNavBar, DetailSwiper, DetailBaseInfo, DetailShopInfo, DetailGoodsInfo,
      DetailParamInfo, DetailCommentInfo, DetailBottomBar,

      GoodsList, Scroll, Toast,

      GoodsParam, getRecommend, getDetail, Goods, Shop,
    },
    mixins: [itmeListenerMiXin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopY: [],
        getThemeTopY: null,
        currentIndex: 0,
        message: '',
        show: false,
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求详情
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        // 1.获取顶部的轮播数据
        this.topImages = data.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // 4.保存商品详情数据
        this.detailInfo = data.detailInfo
        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 6.取出评论的信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        /*
        // 第一次获取 值不对
        // 原因：this.$refs.params.$el压根就没有渲染
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopY);*/

        /*//等到渲染完 会回调一次函数 有值
        this.$nextTick(() => {
          //     第二次获取，值不对  原因：图片没有计算在内
          // 根据最新的数据，对应的DOM是已经被渲染了
          // 但图片依然没有加载完(目前获取到的offsetTop不包含其中的图片)
          // 一般情况下offsetTop值不对的时候，都是因为图片的问题
            this.themeTopY = []
            this.themeTopY.push(0)
            this.themeTopY.push(this.$refs.params.$el.offsetTop)
            this.themeTopY.push(this.$refs.comment.$el.offsetTop)
            this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopY);
        })*/
      })
      // 3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
      // 4.getThemeTopY赋值(对给this.getThemeTopY赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.params.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)
        // console.log(this.themeTopY);
      }, 100)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
      },
      contentScroll(position) {
        // 1.获取y值
        const positionY = -position.y
        // 2.positionY和主题中值进行对比
        // [0, 5494, 6303, 6534]
        // positionY 在 0 和 5494 之间，index=0
        // positionY 在 5494 和 6303 之间，index=1
        // positionY 在 6303 和 6534 之间，index=2
        // positionY 超过6534值，index=3   在6534和非常大的值之间 index=3
        let length = this.themeTopY.length
        for (let i = 0; i < length; i++) { // str i + 1
          /*if (positionY > this.themeTopY[i] && positionY < this.themeTopY[i + 1]) {
            console.log(i);  //这样if的话 3找不到 undefined
          }*/

          /*if (this.currentIndex !== i && (i < length - 1
             // 如果现在已经等于i了 就不要判断了
              && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])
              || (i === length - 1 && positionY > this.themeTopY[i])) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }*/
          // 判断条件少很多的话 性能会提高
          if (this.currentIndex !== i && (positionY > this.themeTopY[i]
              && positionY < this.themeTopY[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        // 3.是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品加入到购物车里 (1.promise 2.mapActions)
        // this.$store.cartList.push(product)  //不要这样做 绕过了vuex的监听 非法
        // this.$store.commit('addCart', product) // mutations
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        this.addCart(product).then(res => { // 本质上会调用actions里的函数 和上面一样
          // this.show = true
          // this.message = res
          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // }, 1500)

          this.$toast.show('成功加入购物车')
        })
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 999;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 999;
  }

  .content {
    height: calc(100% - 44px - 58px);
  }
</style>
