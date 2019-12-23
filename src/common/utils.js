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

// 正则表达式是干嘛的？ 字符串匹配利器
export function formatDate(data, fmt) {
  // 1.获取年份
  if(/(y+)/.test(fmt)) {
    // 年份 =  替换     yyyy        2019 + ''         截取   4 - 4 截取0位 就是把2019替换到yyyy
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 2.获取
  // M+ 正则中的一种规则 一个或多个
  let o = {
    "M+": data.getMonth() + 1,
    "d+": data.getDate(),
    "H+": data.getHours(),
    "m+": data.getMinutes(),
    "s+": data.getSeconds()
  }
  for (let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
// 4：4：4  04：04:04

function padLeftZero(str) {
  // 这里不足两位的话 用0补齐两位  截取传过来的长度
  return ('00' + str).substr(str.length)
}
