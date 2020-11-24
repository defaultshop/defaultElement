import request from "@/utils/request";

// 查询数据列表
export function list(query) {
  return request({
    url: "/project/type/getPageList",
    method: "get",
    params: query
  });
}

// 查询详细
export function get(id) {
  return request({
    url: "/project/type/" + id,
    method: "get"
  });
}

// 新增类型
export function add(data) {
  return request({
    url: "/project/type/add",
    method: "post",
    data: data
  });
}

// 修改类型
export function update(data) {
  return request({
    url: "/project/type/edit",
    method: "post",
    data: data
  });
}

// 删除字典类型
export function del(ids) {
  return request({
    url: "/project/type/" + ids,
    method: "delete"
  });
}
