import request from "@/utils/request";
//add
export function add(data) {
  return request({
    url: "/project/norm/add",
    method: "post",
    data: data
  });
}
//edit
export function edit(data) {
  return request({
    url: "/project/norm",
    method: "put",
    data: data
  });
}
// get
export function getDetail(id) {
  return request({
    url: "/project/norm/" + id,
    method: "get"
  });
}
// getList分页
export function getPageList(query) {
  return request({
    url: "/project/norm/getPageList",
    method: "get",
    params: query
  });
}
