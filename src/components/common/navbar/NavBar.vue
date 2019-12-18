<!-- 独立组件：可以抽离出去，无限使用 多个后，可以整理为一个库？ -->
<template>
<!-- 独立组件 顶部标签栏 搜索栏 -->
  <div class="nav-bar">
<!-- 最左边标签 返回按钮 分类按钮？个人首页跳转？ 固定大小 -->
    <div class="left">
<!-- 具名插槽 可以在另一边调用时 往里面加不同的内容 -->
      <slot name="left"></slot>
    </div>
<!-- 中间标签 标题.搜索框.或者其他业务  -->
    <div class="center">
      <slot name="center"></slot>
    </div>
<!-- 右边标签 消息，返回首页  -->
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {  /* 设置整个标签栏的样式 */
    display: flex;
    line-height: 44px;  /* 有了内容 可以直接用行高 撑起标签高度 */
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }

  .left, .right {  /* 并集子选择器 可以一起设置 */
    width: 60px;
  }

  .center {
    flex: 1;
  }
</style>
