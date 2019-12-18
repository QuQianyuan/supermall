<!-- 组件化开发 组件封装调用，业务组件 独立组件 -->
<template>
  <div id="app">
    <router-view></router-view>
<!--  业务组件 底部导航栏  -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar'

export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
