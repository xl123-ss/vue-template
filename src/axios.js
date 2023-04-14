import axios from 'axios';

import { getToken } from '~/composables/token.js'
import { ElNotification } from 'element-plus'
import { toast } from '~/composables/util'

// 创建请求实例
const instance = axios.create({
  baseURL: 'http://127.0.0.1:4523/m1/2571713-0-default/api/',

});

// 前置拦截器（发起请求之前的拦截）
instance.interceptors.request.use(
  (config) => {
    // 从 cookie 中取出 token
    const token = getToken()

    // 如果不为空，向 header 中添加 token
    if (token) {
      config.headers['token'] = token
    }
    return config;
  },
  (error) => {
    //请求出错
    return Promise.reject(error);
  },
);

// 后置拦截器（获取到响应时的拦截）
instance.interceptors.response.use(
  (response) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    // 对于响应数据处理
    return response.data

  },
  (error) => {
    // console.log(error)
    console.log("失败")
    //直接在这里进行错误的处理，不在进行错误的传递
    toast(error.message || '请求失败', 'error')
    // return Promise.reject(error)
  },
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const post = (url, data = {}, params = {}) => {
  return instance({
    method: 'post',
    url,
    data,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const get = (url, params = {}) => {
  return instance({
    method: 'get',
    url,
    params,
  });
};

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export const put = (url, data = {}, params = {}) => {
  return instance({
    method: 'put',
    url,
    params,
    data,
  });
};

/**
 * @param {string} url
 * @param {object} params
 */
export const _delete = (url, params = {}) => {
  return instance({
    method: 'delete',
    url,
    params,
  });
};

export default instance;