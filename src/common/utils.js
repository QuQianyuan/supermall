// 抽取一些公共的方法？
export function debounce(func, delay) {  //防抖函数
  let timer = null    // 第一次这里是空的
  return function (...args) {  // ...可以放入多个函数在数组里排列
    // 如果他请求太快的话 上一次还没完成，在排列中，那么会将这次请求清除掉
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
