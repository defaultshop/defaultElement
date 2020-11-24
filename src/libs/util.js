import Cookies from "js-cookie";

export const TOKEN_KEY = "token";

export const setToken = token => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 });
};
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  else return false;
};

export const getBaseUrl = () => {
  return process.env.VUE_APP_BASE_API;
};
/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Cookies.remove("token");
  localStorage.clear();
  sessionStorage.clear();
}
/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split("?")[1].split("&");
  let paramObj = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split("=");
    paramObj[keyValue[0]] = keyValue[1];
  });
  return paramObj;
};
export const localSave = (key, value) => {
  localStorage.setItem(key, value);
};

export const localRead = key => {
  return localStorage.getItem(key) || "";
};
