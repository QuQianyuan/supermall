<!-- home子组件 好物推荐  -->
<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    font-size: 12px;
  }
  .recommend-item {
    flex: 1;
    width: 100%;
    text-align: center;

    padding: 15px 0 20px;
    border-bottom: 10px solid #eeeeee;
  }
  .recommend-item img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>
