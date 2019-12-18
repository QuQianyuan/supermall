<template>
<!-- 独立组件 整个底部导航栏 -->
  <div id="tab-bar">
<!-- 插槽 在另一边插入内容-->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 1px rgba(100,100,100,.1);
  }
</style>
