const constcode = {
  0: '操作成功',
  400: '请求错误',
  401: '未授权, 请登录',
  403: '没有操作权限',
  404: '被请求的资源不存在',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP 版本不受支持'
}

export const getResult = (code, response) => {
  let result = {
    success: false,
    code,
    msg: constcode[code] || '未知错误',
    data: {}
  }

  if (response.status == 200) {
    let res = response.data
    if (res.code == 0) {
      result.success = true
    }
    result.msg = res.msg ? res.msg : constcode[code]
    result.data = res.data
  }

  return result
}
