<!-- 首页组件 里面可以添加另外组件 -->
<template>
  <div id="home">
    <!--  独立组件 顶部标题栏 搜索框 可以重复调用  -->
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true" @pullingUp="loadMore">
      <!--  home子组件 轮播图  -->
      <home-swiper :banners="banners"/><!--父组件props传值过去-->
      <!--  home子组件 好物推荐  -->
      <recommend-view :recommends="recommends"/>
      <!--  home子组件 本周流行  -->
      <feature-view/>
      <!--  业务组件 ？？流行 -->
      <tab-control class="tab-control"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/><!--子传父传过来的index-->
      <!--  业务组件 商品列表  -->
      <goods-list :goods="showGoods"/><!--需要展示的数据-->
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/><!--监听一个组件的原生事件-->

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home'


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() { //需要展示的数据
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      // 事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2: //穿透？
            this.currentType = 'sell'
            // break
        }
      },
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)  //先要拿到scroll这个组件再去拿里面某一个属性
        this.$refs.scroll.scrollTo(0, 0, 500)  //虽然只少了一个单词 但是体现了封装的方法
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) >1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()  //调用refresh 会计算所有会滚动区域
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultiData() {
        getHomeMultidata().then(res => {
          // this.result = res //箭头函数的this是向上找的   只回收了变量的名字 对象在result里
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1  //变量 当前goods的类型的页码+1
        getHomeGoods(type, page).then(res => {
          // res => pop前30条数据 page:1
          //解构语法 将数组解析，将里面的数一个一个取出来     push函数可以传一个可变参数
          this.goods[type].list.push(...res.data.list)  //当前goods的类型的list的末尾添加数
          this.goods[type].page += 1    //当前goods的类型的页码+1 而每次执行后都+1
          this.$refs.scroll.finishPullUp()
        })
      },
    }
  }
</script>

<!--scoped作用域-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh; /* vh:视口高度 */
    position: relative;
  }

  .home-bar {
    background: var(--color-tint);
    color: #FFFFFF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky; /* 粘性布局？ 当元素距顶部/底部 多少时 变成fixed？*/
    top: 44px;
    z-index: 9;
  }

  /*.content {*/
  /*  overflow: hidden;*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>
