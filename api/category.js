import { request } from '@/api/request.js';


export function add(category) {
  return request({
    url: '/category',
    method: 'POST',
    data: category
  });
}
export function sort(categorys) {
  return request({
    url: '/category/sort',
    method: 'POST',
    data: categorys
  });
}
export function update(category) {
  return request({
    url: '/category',
    method: 'PUT',
    data: category
  });
}

export function deleteC(id) {
  return request({
    url: `/category/${id}`,
    method: 'DELETE'
  });
}

export function list(userId) {
  return request({
    url: `/category/list/${userId}`,
    method: 'GET'
  });
}

// export function get(id) {
//   return request({
//     url: '/category/get',
//     method: 'GET',
//     data: {id: id}
//   });
// }


// export function findByMonth(param) {
//   return request({
//     url: '/category/findByMonth',
//     method: 'GET',
//     data: param
//   });
// }