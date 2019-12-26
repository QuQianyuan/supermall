<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" @click.native="checkClick" class="check-button"/>
      <span>全选</span>
    </div>
    <div class="check-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      去结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return "￥" + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false // 如果数组的长度等于0 没有商品时默认返回false
        // 1.使用filter  先从数组里找下有没有不被选中的，如果有长度 ， 选中返回！长度  false
        // return !(this.cartList.filter(item => !item.checked).length) //不是很好理解 代码性能差
        // 2.使用find   在数组里找到不是checked的 返回false
        return !this.cartList.find(item => !item.checked)
        // 3.使用for of遍历
        // for (let item of this.cartList) {
        //   if(!item.checked) return false
        // } return true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll)  // 全部选中
          this.cartList.forEach(item => item.checked = false)
        else  // 部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        // 这里不能简化？ 因为foreach影响着上面的计算属性 乱套？
        // this.cartList.forEach(item => item.checked = !this.isSelectAll)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    bottom: 49px;
    right: 0;
    left: 0;
    z-index: 99;
    height: 40px;
    line-height: 40px;
    background-color: #eeeeee;
    display: flex;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }
  .check-price {
    margin-left: 25px;
    flex: 1;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .calculate {
    width: 90px;
    background: #ff7d90;
    color: #ffffff;
    text-align: center;
  }
</style>
