<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active"></slot>
    </div>
    <div :style="styleColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
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
      itemClick() {
        if (this.$route.path !== this.path) {
          this.$router.replace(this.path)
          console.log(1);
        }
      }
    },
    computed: {
      isActive() {
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
    flex: 1;
    text-align: center;
    height: 49px;
    background-color: #F6F6F6;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  .active {
    color: #EE7F27;
  }
</style>
