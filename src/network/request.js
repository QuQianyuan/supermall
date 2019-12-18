import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL : "http://106.54.54.237:8000/api/v1",
    //http://106.54.54.237:8000/api/v1/home/data?type=sell&page=1
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2响应拦截
  instance.interceptors.response.use(res => { //服务器已经响应，拿到结果
    return res.data
  }, err => {   //这两个函数是互斥的
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}
