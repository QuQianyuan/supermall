<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item"/><!--把遍历的数据传过去-->
  </div>
</template>

<script>
  import GoodListItem from './GoodsListItem'

  export default {
    name: "GoodList",
    components: {
      GoodListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;/*默认情况下不包裹 全部往一行塞，wrap会根据宽度来分配*/
    /*justify-content: space-around; !* 均等分 左右两边的距离加起来等于中间的距离 *!*/
  }
</style>
