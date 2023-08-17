/*
 * @Author: AlierQ 1029369938@qq.com
 * @Date: 2023-08-17 09:36:38
 * @LastEditors: AlierQ 1029369938@qq.com
 * @LastEditTime: 2023-08-17 16:23:00
 * @FilePath: \axios-practice\src\helpers\request.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 引入axios
import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

// 设置开发、测试、生产环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "https://www.development.com"
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = "https://www.test.com"
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = "https://www.production.com"
}

export const request = (config?: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    // 设置请求超时时间
    timeout: 10000,
    // 设置跨域携带cookie
    withCredentials: true,
    // 设置请求头
    headers: {
      post: {
        "Content-Type": "application/json/x-www-form-urlencoded;charset=UTF-8;",
      },
    },
    // 定义成功状态码
    validateStatus: (status: number) => {
      return (status >= 200 && status < 300) || status === 304 || status === 401
    },
    // 自定义配置覆盖
    ...config,
  })
  // 请求拦截
  instance.interceptors.request.use(
    // 请求发送前的处理
    (config) => {
      // 在此处可以进行设置请求头携带当前用户身份等操作
      // config.headers.Authorization = 身份信息/token
      console.log(config)
      return config
    },
    // 请求错误处理
    (error) => {
      return Promise.reject(error)
    }
  )
  // 响应拦截
  instance.interceptors.response.use(
    // 收到响应后的处理
    (response) => {
      console.log(response)
      const { statusCode, data, message } = response.data
      // 根据状态码进行处理
      if (statusCode === 200) {
        // 返回值自动会被作为Promise的resolve
        return data
      } else if (statusCode === 401) {
        // jump -> login
      } else {
        console.log(message)
        return Promise.reject(message)
      }
    },
    // 响应错误处理
    (error) => {
      // 处理响应错误
      console.log("error-response:", error.response)
      console.log("error-config:", error.config)
      console.log("error-request:", error.request)
      if (error.response) {
        if (error.response.status === 401) {
          // jump -> login
        }
      }
      console.log(error?.response?.data?.message || "服务端异常")
      return Promise.reject(error)
    }
  )
  return instance
}
