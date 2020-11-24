import request from "@/utils/request";

export function list(data) {
  return request({
    url: "/project/process/getInfoByIndustry",
    method: "post",
    data: data
  });
}
export function save(data) {
  return request({
    url: "/project/process/save",
    method: "post",
    data: data
  });
}
export function del(ids) {
  return request({
    url: "/process/" + ids,
    method: "delete"
  });
}
