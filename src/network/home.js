import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}


// 函数调用 -> 压入到函数栈（保存函数调用过程中所有变量）
// 函数调用结束 -> 弹出函数栈（释放函数的所有的临时变量）
// function test() {
//   const name = ['why','aaa']    //这些都是临时变量
// }
// test()
