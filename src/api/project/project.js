import request from "@/utils/request";
//获取产业类型字典
export function industryType() {
  return request({
    url: "/project/type/list",
    method: "get"
  });
}
//获取招商区块字典
export function treeselect() {
  return request({
    url: "/system/area/treeselect",
    method: "get"
  });
}
//项目列表
export function getProjectList(query) {
  return request({
    url: "/project/project/list",
    method: "get",
    params: query
  });
}
//add
export function addProject(data) {
  return request({
    url: "/project/project",
    method: "post",
    data: data
  });
}
//edit
export function editProject(data) {
  return request({
    url: "/project/project",
    method: "put",
    data: data
  });
}
// get
export function getDetail(id) {
  return request({
    url: "/project/project/" + id,
    method: "get"
  });
}
