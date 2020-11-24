import request from "@/utils/request";
//获取月度报表List

export function list(query) {
  return request({
    url: "/project/statement/list",
    method: "get",
    params: query
  });
}
