import request from "@/utils/request";

const client_id = "web1";
const client_secret = "123456";
const grant_type = "password";
const scope = "server";

// 登录方法
export function login(username, password, code, uuid) {
  return request({
    url: "/auth/oauth/token",
    method: "post",
    params: {
      username,
      password,
      code,
      uuid,
      client_id,
      client_secret,
      grant_type,
      scope
    }
  });
}

export function codeLogin(code) {
  return request({
    url: "/auth/oauth/token",
    method: "post",
    params: {
      code,
      client_id,
      client_secret,
      grant_type:"authorization_code",
      scope,
      redirect_uri:"http://localhost:3000/auth/login"
    }
  });
}
export function ddLoginRefers(code) {
  return request({
    url: "/test/login/loginByCode" + code,
    method: "get"
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/system/user/getInfo",
    method: "get"
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/auth/token/logout",
    method: "delete"
  });
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: "/code",
    method: "get"
  });
}
