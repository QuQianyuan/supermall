<!-- 首页组件 里面可以添加另外组件 -->
<template>
  <div id="home">
    <!--  独立组件 顶部标题栏 搜索框 可以重复调用  -->
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!--  home子组件 轮播图  -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/><!--父组件props传值过去-->
      <!--  home子组件 好物推荐  -->
      <recommend-view :recommends="recommends"/>
      <!--  home子组件 本周流行  -->
      <feature-view/>
      <!--  业务组件 控制？ -->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      /><!--子传父传过来的index-->
      <!--  业务组件 商品列表  -->
      <goods-list :goods="showGoods"/><!--需要展示的数据-->
    </scroll>
    <!--  独立组件 返回顶部 默认隐藏 在滚动多少时显示   -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/><!--监听一个组件的原生事件-->

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'  //home子组件轮播图
  import RecommendView from './childComps/RecommendView'  // home子组件好物推荐
  import FeatureView from './childComps/FeatureView'  //home子组件本周流行

  import NavBar from 'components/common/navbar/NavBar'  //独立组件 顶部标题栏
  import TabControl from 'components/content/tabControl/TabControl' //业务组件 控制？
  import GoodsList from 'components/content/goods/GoodsList'  //业务组件 商品列表
  import Scroll from 'components/common/scroll/Scroll'  //独立封装组件 BScroll滚动

  import {getHomeMultidata, getHomeGoods} from 'network/home' // home网络组件方法
  import {itmeListenerMiXin, backTopMixin} from "common/mixin";

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
    },
    mixins: [itmeListenerMiXin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop', // 获取到是哪个流行类型
        tabOffsetTop: 0,  // 距离屏幕顶部的高度
        isTabFixed: false,  // 是否显示上面那个偷天换日的流行
        saveY: 0,   //记录保存？
      }
    },
    computed: {
      showGoods() { //需要展示的数据
        return this.goods[this.currentType].list
      }
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh() //每此调用后刷新一次？
    },
    deactivated() {
      // 1.保存y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 2.取消全局事件的监听
      // this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultiData()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      /*// 1.图片记载完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh) //第一个参数是 fuc 传入的函数
      // 2. 对监听的事件进行保存
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
      // 2.获取tabControl的offsetTop
      // 所有的组件都有一个属性 $el: 用于获取组件当中的元素的*/
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        this.$refs.tabControl1.currentIndex = index //取巧 把两个流行组件同步
        this.$refs.tabControl2.currentIndex = index //取巧 把两个流行组件同步
      },
      contentScroll(position) { //显示返回顶部按钮 默认隐藏
        // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 2.决定TabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {//下拉翻页?加载更多 每次下拉计算滚动
        this.getHomeGoods(this.currentType)
        //   this.$refs.scroll.scroll.refresh()  //调用refresh 会计算所有会滚动区域
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        getHomeGoods(type, page).then(res => {  //箭头函数this向上找
          // res => pop前30条数据 page:1
          //解构语法 将数组解析，将里面的数一个一个取出来     push函数可以传一个可变参数
          this.goods[type].list.push(...res.data.list)  //当前goods的类型的list的末尾添加数
          this.goods[type].page += 1    //当前goods的类型的页码+1 而每次执行后都+1
          this.$refs.scroll.finishPullUp()  //完成了上拉的加载更多    得到scroll对象使用里的下拉方法
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
    /*在使用浏览器原生滚动时，为了让导航不跟着一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
  /*  position: sticky; !* 粘性布局？ 当元素距顶部/底部 多少时 变成fixed？*!*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
