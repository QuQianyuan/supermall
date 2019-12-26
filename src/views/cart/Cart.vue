<!-- 购物车组件 里面可以添加另外组件 -->
<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nar-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import {mapGetters} from 'vuex'


  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,CartBottomBar
    },
    computed: {
      // 两种语法
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
        length: 'cartLength',
      })
    }
  }
</script>

<style scoped>
  .nar-bar {
    background: var(--color-tint);
    color: #ffffff;
    font-weight: 700;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
  }
</style>
