<!-- 业务组件： 本项目中可以重复调用的组件 改其中的参数即可 -->
<template>
<!-- tabbar组件 底部整个导航栏 -->
  <tab-bar class="tab-bar">
<!-- tabbaritem组件 底部每个小导航 首页 .. .. ..  设置不同内容可以重复调用  -->
    <tab-bar-item path="/home" activeColor="deeppink">
<!-- 第一个img是没高亮时的图片 没选中时显示  slot绑定具名插槽 往插槽里插入想要的内容 -->
      <img slot="item-icon" src="~assets/images/tabbar/home.svg" alt=""><!--在dom里使用别名路径需要加~ -->
<!-- 第一个img是高亮时的图片 选中时显示     -->
      <img slot="item-active" src="~assets/images/tabbar/home_active.svg" alt="">
<!--  底部单个导航的名称 -->
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/images/tabbar/category.svg" alt="">
      <img slot="item-active" src="~/assets/images/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/images/tabbar/shopcart.svg" alt="">
      <img slot="item-active" src="~/assets/images/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="~/assets/images/tabbar/profile.svg" alt="">
      <img slot="item-active" src="~/assets/images/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>
  .tab-bar {
    z-index: 99;
  }
</style>
