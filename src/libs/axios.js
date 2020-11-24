import axios from "axios";
import { getToken } from "@/libs/util";
import { getResult } from "@/libs/response.config";

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }
  create(headers) {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    };
    if (headers) conf.headers = headers;
    return axios.create(config);
  }
  interceptors(instance, anonymous) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        if (anonymous) return config;
        let token = getToken();
        if (token) {
          config.headers["Authorization"] = token;
          config.headers["token"] = token;
          config.headers["Accept-Language"] = "zh-CN";
        }
        return config;
      },
      error => {
        // 错误提示
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        // 200
        return Promise.resolve(getResult(res.data.code, res));
      },
      error => {
        // 非200
        return Promise.reject(getResult(error.response.status, error.response));
      }
    );
  }
  request(options) {
    const instance = this.create(options.headers);
    this.interceptors(instance);
    return instance(options);
  }
  anonymousRequest(options) {
    let instance = this.create(options.headers);
    this.interceptors(instance, true);
    return instance(options);
  }
}

export default HttpRequest;
