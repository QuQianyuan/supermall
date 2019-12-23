<template>
<!-- 独立组件 单个小导航 -->
  <div class="tab-bar-item" @click="itemClick"><!--点击路由跳转相应页面-->
<!-- 第一张图片 不高亮时显示 -->
    <div v-if="!isActive"><!--在外面包一层div可以避免bug 插槽里的内容替换过来 有可能无法使用v-if-->
<!-- 具名插槽 可以指定添加内容 -->
      <slot name="item-icon"></slot>
    </div>
<!-- 第二张图片 高亮时显示 -->
    <div v-else>
      <slot name="item-active"></slot>
    </div>
<!-- 第三个是底部单个导航的名称  -->
    <div :style="styleColor"><!--动态绑定style 调用计算属性styleColor-->
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {  //从父组件传过来的数据
      path: String, //父组件里传过来的路径
      activeColor: {
        type: String,
        default: 'deeppink'
      }
    },
    // data() {
    //   return {
    //     isActive: true
    //   }
    // },
    methods: {
      // 点击路由跳转界面
      itemClick() {
        // 如果当前活跃的路径 不等于 现在的路径的话
        if (this.$route.path !== this.path) {
          // 把路由替换成 现在点击的路径
          this.$router.replace(this.path)
        }
      }
    },
    computed: {
      isActive() {
        // 活跃的路由的路径 判断是否等于当前path  是的话返回true
        return this.$route.path === this.path
      },
      styleColor() {
        //  判断isActive是否为真，为真返回color
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;  /*父标签设置弹性布局，子标签设置每份占多少*/
    text-align: center;
    height: 49px;
    /*background-color: #F6F6F6;*/
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;/*设置元素的垂直对齐方式：放置在父元素的中部*/
  }
</style>
