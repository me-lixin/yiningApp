import { request } from '@/api/request.js';


export function add(bill) {
  return request({
    url: '/bill/add',
    method: 'POST',
    data: bill
  });
}

export function update(bill) {
  return request({
    url: '/bill/update',
    method: 'POST',
    data: bill
  });
}

export function deleteB(billId) {
  return request({
    url: '/bill/delete',
    method: 'DELETE',
    data: {billId: billId}
  });
}

export function findByMonth(param) {
  return request({
    url: '/bill/findByMonth',
    method: 'GET',
    data: param
  });
}