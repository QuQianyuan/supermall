<!--  业务组件 ？？流行 -->
<template>
  <div class="tab-control">
    <!--    <slot></slot>&lt;!&ndash;只是文字不一样就不要搞插槽了&ndash;&gt;-->

<!-- :class 动态设置class为下标==变量 点击下标对应的标签 -->
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index   // data里的变量 = 下标
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    line-height: 40px;
    background: #ffffff;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
  }

  .tab-control-item span {
    padding: 5px; /*设置内边距 更加简易增大下边框*/
  }

  .active {
    color: var(--color-high-text); /*css3调用设置的变量*/
  }

  .active span {  /*子标签span设置下边框*/
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
