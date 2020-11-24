import request from "@/utils/request";

// getList分页
export function getPageList(query) {
  return request({
    url: "/project/assignment/getPageList",
    method: "get",
    params: query
  });
}
// get
export function getDetail(id) {
  return request({
    url: "/project/assignment/" + id,
    method: "get"
  });
}
export function firstApprove(data) {
  return request({
    url: "/project/assignment/firstApprove",
    method: "post",
    data: data
  });
}
export function secondApprove(data) {
  return request({
    url: "/project/assignment/secondApprove",
    method: "post",
    data: data
  });
}
