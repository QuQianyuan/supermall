import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url: '/home/data',
    params: {  //路由后面加的参数
      type,
      page
    }
  })
}

// 函数调用 -> 压入到函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数栈（释放函数的所有的临时变量）
// function test() {
//   const name = ['why','aaa']    //这些都是临时变量
// }
// test()


// let totalNums = []
//
// const nums1 = [1,2,3]
// const nums2 = [11,22,33]
//
// for (const n of nums1) {
//   totalNums.push(n)
// }
//
// totalNums.push(...nums1)  //解构语法 将数组解析，将里面的数一个一个取出来
