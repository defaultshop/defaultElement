import HttpRequest from "@/libs/axios";
import { Message } from "view-design";
import { clearLoginInfo, setToken, getBaseUrl } from "@/libs/util";
import router from "@/router";

const baseUrl = getBaseUrl();
const axios = new HttpRequest(baseUrl);

const request = async (url, method, options, repeat) => {
  let conf = { url, method };
  let isCustomFail;
  if (Object.prototype.toString.call(options) === "[object Object]") {
    if (method === "get") {
      conf.params = options.data;
    } else {
      conf.data = options.data;
    }
    isCustomFail = options.isCustomFail;
  }

  let anonymous = (options || false) && options.anonymous;
  if (options && options.headers) {
    conf.headers = options.headers;
  }

  let res = anonymous
    ? await axios.anonymousRequest(conf)
    : await axios.request(conf);

  //

  // 成功
  if (res.code == 0) {
    return Promise.resolve(res);
  }

  if (res.code == 401) {
    clearLoginInfo();
    Message.warning("登录过期了");
    router.push({
      name: "login"
    });
    return;
  }

  if (res.code == 10001 && !isCustomFail) {
    Message.warning(res.msg);
    return Promise.resolve(res);
  }
  // 提示

  if (!isCustomFail) {
    Message.error(res.msg);
    return Promise.resolve(res);
  }

  return Promise.resolve(res);
};

String.prototype.get = async function(options) {
  return await request(this, "get", options);
};

String.prototype.post = async function(options) {
  return await request(this, "post", options);
};

String.prototype.put = async function(options) {
  return await request(this, "put", options);
};

String.prototype.del = async function(options) {
  return await request(this, "delete", options);
};

export default axios;
